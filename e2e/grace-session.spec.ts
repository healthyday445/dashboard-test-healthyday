import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// Covers src/pages/Grace.tsx (/:mobile/grace) — a grace-period upsell page shown ONLY to students
// whose raw backend status is "14DaysCompleted" and whose day-since-free_batch_start_date is in
// [15, 17] (three bonus days after the 14-day free batch, previewing the actual PAID daily class
// to nudge a conversion before the window closes). Every other case redirects (replace) to /:mobile.
//
// As of today (2026-07-27), the 2026-07-13 cohort (911234567811 Telugu, 911234567812 English,
// free_batch_end_date 2026-07-26) has genuinely completed and sits at real day 15 — a live,
// unforced example of the exact state this page targets. Unlike the batch-over-resolver.spec.ts
// gotcha with getEffectiveStatus, Grace.tsx reads the RAW status field directly (not the
// forceDay-blind effective-status resolver), and its day-number calc is computed independently of
// status — so forceDay reliably shifts the day count on these accounts for boundary testing even
// though they're already really completed.
const completedStudent = findAccount("14day", "English", "2026-07-13");
const registeredStudent = findAccount("14day", "English", "", "registered-not-started");
if (!completedStudent || !registeredStudent) {
  throw new Error("Missing required test account(s) in e2e/fixtures/test-accounts.ts for grace-session.spec.ts");
}

test.describe("Grace page (/:mobile/grace) — gating", () => {
  test("real day-15 14DaysCompleted account stays on /grace (no redirect)", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace`);
    await expect(page).toHaveURL(new RegExp(`/${completedStudent.mobile}/grace`));
    await expect(page.getByText("Your 14-Days FREE Classes are completed")).toBeVisible();
  });

  test("registered (non-completed) account redirects to /:mobile", async ({ page }) => {
    await page.goto(`/${registeredStudent.mobile}/grace`);
    await expect(page).toHaveURL(new RegExp(`/${registeredStudent.mobile}$`));
    await expect(page.getByText("Your 14-Days FREE Classes are completed")).not.toBeVisible();
  });

  test("forceDay=14 (still within the free batch, below the grace window) redirects to /:mobile", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=14`);
    await expect(page).toHaveURL(new RegExp(`/${completedStudent.mobile}$`));
  });

  test("forceDay=15 stays on /grace (start of window)", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=15`);
    await expect(page).toHaveURL(new RegExp(`/${completedStudent.mobile}/grace`));
    await expect(page.getByText("Your 14-Days FREE Classes are completed")).toBeVisible();
  });

  test("forceDay=16 stays on /grace", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=16`);
    await expect(page).toHaveURL(new RegExp(`/${completedStudent.mobile}/grace`));
  });

  test("forceDay=17 stays on /grace (end of window)", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=17`);
    await expect(page).toHaveURL(new RegExp(`/${completedStudent.mobile}/grace`));
  });

  test("forceDay=18 (past the grace window) redirects to /:mobile", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=18`);
    await expect(page).toHaveURL(new RegExp(`/${completedStudent.mobile}$`));
  });
});

test.describe("Grace page (/:mobile/grace) — content", () => {
  test("shows the exact grace-period title copy and ongoing-pricing plans", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=15`);
    await expect(page.getByText("Your 14-Days FREE Classes are completed")).toBeVisible();
    await expect(page.getByText("Today is ONE Extra Bonus Session.")).toBeVisible();
    await expect(page.getByText("Join our community for")).toBeVisible();
    await expect(page.getByText("DAILY YOGA SESSIONS")).toBeVisible();

    // Scoped to the heading role — plain getByText("6 Months Plan")/("3 Months Plan") also
    // case-insensitively match their own "JOIN X PLAN" buttons and hit Playwright's strict-mode
    // multiple-match error (confirmed 2026-07-27).
    await expect(page.getByText("1 Year Including Diet Plan")).toBeVisible();
    await expect(page.getByText("₹2399/-")).toBeVisible();
    await expect(page.getByRole("heading", { name: "6 Months Plan" })).toBeVisible();
    await expect(page.getByText("₹1899/-")).toBeVisible();
    await expect(page.getByRole("heading", { name: "3 Months Plan" })).toBeVisible();
    await expect(page.getByText("₹1399/-")).toBeVisible();
  });

  test("?previewVideo=1 forces an iframe with the preview video id embedded, plus the fixed session title", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=15&previewVideo=1`);
    const iframe = page.locator("iframe");
    await expect(iframe).toHaveAttribute("src", /youtube\.com\/embed\/SPSwmydulxo/);
    // Session title under the video is a fixed string (src/pages/Grace.tsx SESSION_TITLE),
    // not the real YouTube video's own (day-varying) title fetched via oEmbed.
    await expect(page.getByText("One Extra Bonus Session | FREE Yoga with Healthyday")).toBeVisible();
  });

  test("outside real class hours (no previewVideo) shows the no-session fallback, not an iframe", async ({ page }) => {
    await page.goto(`/${completedStudent.mobile}/grace?forceDay=15&time=2.00am`);
    await expect(page.locator("iframe")).toHaveCount(0);
    // NoSessionsCard is rendered with isFreeBatch={false} on this page (it's previewing the PAID
    // daily class), so its title reads "Next Live at X" / "Next Session is Tomorrow" — not the
    // "Next Yoga session..." copy used on the free-batch-facing pages.
    await expect(page.getByText(/Next (Session is Tomorrow|Live at)/)).toBeVisible();
  });
});
