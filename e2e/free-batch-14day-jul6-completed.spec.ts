import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// The 2026-07-06 cohort's free batch genuinely ended (free_batch_end_date 2026-07-19, confirmed by
// the user 2026-07-21) — real backend status for these accounts is now "14DaysCompleted", with no
// query-param overrides needed. This replaces free-batch-14day-jul6-special.spec.ts (deleted
// 2026-07-21), whose forceDay-based ongoing/bonus/countdown tests can no longer run against this
// cohort: getEffectiveStatus (src/lib/studentStatus.ts:22-23) short-circuits to the raw backend
// status once it's really "14DaysCompleted", ignoring forceDay entirely.
//
// This cohort renders via the OLDER IndexFourteenDays.tsx flow (not IndexFourteenDaysV2), reached
// standalone with no header/tab-bar wrapper — there is no "Journey" tab for this batch, unlike the
// newer 2026-07-13+ cohorts.
const telugu = findAccount("14day", "Telugu", "2026-07-06");
const english = findAccount("14day", "English", "2026-07-06");
if (!telugu || !english) {
  throw new Error("Missing 14-day (2026-07-06 cohort) account(s) in e2e/fixtures/test-accounts.ts");
}

test.describe("14-day free batch (2026-07-06 cohort) — real 14DaysCompleted state", () => {
  test(`Telugu student sees the TRIAL ENDED / completed upsell screen (${telugu.mobile})`, async ({ page }) => {
    await page.goto(`/${telugu.mobile}`);

    await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    await expect(page.getByText(/Classes are completed/)).toBeVisible();
    await expect(page.getByText("JOIN 1 YEAR PLAN")).toBeVisible();
    await expect(page.getByText("Want More FREE Classes?")).toBeVisible();
  });

  test(`English student sees the TRIAL ENDED / completed upsell screen (${english.mobile})`, async ({ page }) => {
    await page.goto(`/${english.mobile}`);

    await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    await expect(page.getByText(/Classes are completed/)).toBeVisible();
    await expect(page.getByText("JOIN 1 YEAR PLAN")).toBeVisible();
    await expect(page.getByText("Want More FREE Classes?")).toBeVisible();
  });

  test(`no tab bar or Journey tab — this cohort predates the tabbed flow (${telugu.mobile})`, async ({ page }) => {
    await page.goto(`/${telugu.mobile}`);

    await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    await expect(page.getByRole("tab", { name: /Journey/i })).toHaveCount(0);
    await expect(page.getByRole("tab", { name: /Live sessions/i })).toHaveCount(0);
  });
});
