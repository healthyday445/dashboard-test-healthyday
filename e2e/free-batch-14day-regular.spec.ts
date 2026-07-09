import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// This covers batches AFTER the 2026-07-06 cohort, which is a special one-off batch (see
// free-batch-14day-jul6-special.spec.ts) — kept in its own file so a future change to the special
// batch's bonus-session schedule doesn't silently affect coverage of the regular/default flow, and
// vice versa. Uses the 2026-07-13 cohort as the "next/regular batch" stand-in.
const telugu = findAccount("14day", "Telugu", "2026-07-13");
const english = findAccount("14day", "English", "2026-07-13");
if (!telugu || !english) {
  throw new Error("Missing 14-day (2026-07-13 cohort) account(s) in e2e/fixtures/test-accounts.ts");
}

test.describe(`14-day free batch — regular/default flow (2026-07-13 cohort)`, () => {
  test("day 1, before any session slot opens, shows the pre-batch hero", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=1&time=2.00am`);
    await expect(page.getByText("14-DAYS ONLINE FREE YOGA")).toBeVisible();
  });

  test("day 2, live in the 5:30 AM slot, shows Your Yoga Session as ongoing", async ({ page }) => {
    await page.goto(`/${english.mobile}?forceDay=2&time=5.00am`);
    await expect(page.getByRole("heading", { name: "Your Yoga Session" })).toBeVisible();
    await expect(page.getByText("Ongoing now")).toBeVisible();
  });

  test("day 2, no session live mid-morning, shows the free-batch NoSessionsCard note", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=2&time=10.00am`);
    await expect(page.getByText("Note: No recordings are available for FREE batch")).toBeVisible();
  });

  test("day 5, live in the 4:30 PM slot, shows Your Yoga Session as ongoing", async ({ page }) => {
    await page.goto(`/${english.mobile}?forceDay=5&time=4.45pm`);
    await expect(page.getByRole("heading", { name: "Your Yoga Session" })).toBeVisible();
    await expect(page.getByText("Ongoing now")).toBeVisible();
  });

  // Observational, not a pass/fail assumption either way: BONUS_DAYS in
  // FourteenDayBonusSessionCard.tsx is a plain day-of-batch rule (3/7/10/12/14), applied via
  // forceDay regardless of which account/batch it is — the code has no per-batch condition tying
  // the bonus schedule to the 2026-07-06 cohort specifically. This checks what actually happens
  // today for a *different* batch's day 3 — result is worth reading either way: if the bonus card
  // shows here too, "special" isn't yet enforced in code (it's special by convention/schedule
  // only); if it doesn't, something else differentiates batches that wasn't found while reading
  // the source for this test file.
  test("day 3 bonus window (8:45 PM) — does the July 6 special bonus schedule also apply here?", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=3&time=8.45pm`);
    // Wait for whichever card actually renders before reading state — the fetch is async, so
    // checking .isVisible() immediately would race the loading spinner and always read "false".
    await Promise.race([
      page.getByRole("heading", { name: "Special Bonus Session" }).waitFor({ state: "visible", timeout: 10000 }).catch(() => {}),
      page.getByRole("heading", { name: "Your Yoga Session" }).waitFor({ state: "visible", timeout: 10000 }).catch(() => {}),
    ]);
    const bonusCardShown = await page.getByRole("heading", { name: "Special Bonus Session" }).isVisible();
    test.info().annotations.push({
      type: "observation",
      description: bonusCardShown
        ? "Special Bonus Session card IS shown for this non-July-6 batch too — bonus days are not currently batch-specific in code."
        : "Special Bonus Session card is NOT shown here — some other condition is gating it that this test didn't identify.",
    });
    expect(typeof bonusCardShown).toBe("boolean");
  });
});
