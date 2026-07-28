import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// The 2026-07-13 cohort's free batch genuinely ended (free_batch_end_date 2026-07-26, confirmed
// 2026-07-28) — real backend status for these accounts is now "14DaysCompleted", with no
// query-param overrides needed (forceDay can no longer simulate an earlier ongoing day once the
// real status is genuinely completed — see e2e/fixtures/test-accounts.ts).
//
// This cohort renders via IndexFourteenDaysV2.tsx (the 2026-07-13+ tabbed flow), which is a
// DIFFERENT completed-state screen from the older 2026-07-06 cohort's IndexFourteenDays.tsx (see
// e2e/free-batch-14day-jul6-completed.spec.ts): IndexFourteenDaysV2 keeps its own internal "Live
// sessions" / "Your Yoga Journey" tab bar even once completed (a `completedTab` state, independent
// of Dashboard.tsx's own tab gating) — the older Jul-6 flow has no tab bar at all once completed.
// (Both flows DO show the same "JOIN 1 YEAR PLAN" pricing-card CTA on their completed screen —
// verified live 2026-07-28 after an initial incorrect assumption otherwise, so that's not a
// distinguishing feature between the two and isn't asserted on here.)
const telugu = findAccount("14day", "Telugu", "2026-07-13");
const english = findAccount("14day", "English", "2026-07-13");
if (!telugu || !english) {
  throw new Error("Missing 14-day (2026-07-13 cohort) account(s) in e2e/fixtures/test-accounts.ts");
}

test.describe("14-day free batch (2026-07-13 cohort) — real 14DaysCompleted state (V2 flow)", () => {
  test(`Telugu student sees the TRIAL ENDED / completed upsell screen (${telugu.mobile})`, async ({ page }) => {
    await page.goto(`/${telugu.mobile}`);

    await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    await expect(page.getByText(/Classes are completed/)).toBeVisible();
    await expect(page.getByText("Want More FREE Classes?")).toBeVisible();
  });

  test(`English student sees the TRIAL ENDED / completed upsell screen (${english.mobile})`, async ({ page }) => {
    await page.goto(`/${english.mobile}`);

    await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    await expect(page.getByText(/Classes are completed/)).toBeVisible();
    await expect(page.getByText("Want More FREE Classes?")).toBeVisible();
  });

  test(`keeps its own Live sessions / Your Yoga Journey tab bar even when completed, unlike the older Jul-6 cohort (${telugu.mobile})`, async ({ page }) => {
    await page.goto(`/${telugu.mobile}`);

    await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    await expect(page.getByText("Live sessions")).toBeVisible();
    await expect(page.getByText("Your Yoga Journey")).toBeVisible();
  });
});
