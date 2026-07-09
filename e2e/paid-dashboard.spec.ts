import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

const account = findAccount("paid", "English");
if (!account) {
  throw new Error("No paid English account found in e2e/fixtures/test-accounts.ts");
}

// Face Yoga alternates Telugu/English by week from a real calendar anchor (2026-04-05) and is
// NOT overridable via any query param on the real paid dashboard (see PREVIEWS.md) — only
// forcePaidDay (day-of-week) is. Mirror the app's own week calc so the Face Yoga tests below can
// skip themselves with a clear reason on weeks where this English account has no Face Yoga card,
// instead of failing on something we can't control.
const ANCHOR_UTC = Date.UTC(2026, 3, 5);
const nowIST = Date.now() + 5.5 * 60 * 60 * 1000;
const diffWeeks = Math.floor((nowIST - ANCHOR_UTC) / (1000 * 60 * 60 * 24 * 7));
const isEnglishFaceYogaWeek = diffWeeks % 2 !== 0;

test.describe(`Paid dashboard — English account (${account.mobile})`, () => {
  test("no session live at 2:00 PM shows NoSessionsCard", async ({ page }) => {
    await page.goto(`/${account.mobile}?time=2.00pm`);
    await expect(page.getByText("Next Live at 4:30 PM")).toBeVisible();
  });

  test.describe("Diet Session bonus card", () => {
    test("upcoming at 7:40 PM", async ({ page }) => {
      await page.goto(`/${account.mobile}?time=7.40pm`);
      await expect(page.getByRole("heading", { name: "Next Session - Diet Session" })).toBeVisible();
      await expect(page.getByText("Session Starts at 8:00 PM")).toBeVisible();
    });

    test("live at 8:40 PM", async ({ page }) => {
      await page.goto(`/${account.mobile}?time=8.40pm`);
      await expect(page.getByRole("heading", { name: "Diet Session - Live Now" })).toBeVisible();
    });
  });

  test.describe("Breath to Heal bonus card", () => {
    // forcePaidDay=1 (Monday) — B2H is explicitly excluded for English on Sundays, so pin a
    // non-Sunday day to keep this deterministic regardless of which real day tests run on.
    test("upcoming at 8:45 PM", async ({ page }) => {
      await page.goto(`/${account.mobile}?forcePaidDay=1&time=8.45pm`);
      await expect(page.getByRole("heading", { name: "Next Session - Breath to Heal Session" })).toBeVisible();
      await expect(page.getByText("Session Starts at 9:00 PM")).toBeVisible();
    });

    test("live at 9:30 PM", async ({ page }) => {
      await page.goto(`/${account.mobile}?forcePaidDay=1&time=9.30pm`);
      await expect(page.getByRole("heading", { name: "Breath to Heal Session - Live Now" })).toBeVisible();
    });
  });

  test.describe("Face Yoga bonus card (English weeks only, forced Sunday)", () => {
    test("upcoming at 11:20 AM", async ({ page }) => {
      test.skip(!isEnglishFaceYogaWeek, "Real calendar is on the Telugu Face Yoga week right now — not forceable for this English account");
      await page.goto(`/${account.mobile}?forcePaidDay=0&time=11.20am`);
      await expect(page.getByRole("heading", { name: "Next Session - Face Yoga Session" })).toBeVisible();
      await expect(page.getByText("Session Starts at 11:30 AM")).toBeVisible();
    });

    test("live at 11:45 AM", async ({ page }) => {
      test.skip(!isEnglishFaceYogaWeek, "Real calendar is on the Telugu Face Yoga week right now — not forceable for this English account");
      await page.goto(`/${account.mobile}?forcePaidDay=0&time=11.45am`);
      await expect(page.getByRole("heading", { name: "Face Yoga Session - Live Now" })).toBeVisible();
    });
  });

  test("referral milestone card renders", async ({ page }) => {
    // verifiedRefs comes from real, mutable account data — assert structure (always-rendered
    // labels), not a specific referral count, so this doesn't false-alarm when the real count changes.
    await page.goto(`/${account.mobile}`);
    await expect(page.getByRole("heading", { name: "Your Referral Rewards" })).toBeVisible();
    await expect(page.getByText("Free Diet PDF")).toBeVisible();
    await expect(page.getByText("Healthyday T-shirt")).toBeVisible();
  });
});
