import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// Covers getEffectiveStatus (src/lib/studentStatus.ts) — once a student's free batch is over
// (7:30 PM IST on free_batch_end_date), the effective status resolves to:
//   - "14DaysCompleted" for free/unpaid students -> "TRIAL ENDED" / completed upsell screen.
//   - "14DaysOngoing" (unchanged) while the free batch is still on, even for a paid-in-advance
//     student -> ongoing dashboard, but WITHOUT the "buy now" countdown banner (already-paid).
//   - "paidPendingStart" for paid-in-advance students once the batch is over -> "Starts from
//     TOMORROW" interstitial, no tabs, no banner.
// This is cohort-agnostic (src/pages/IndexTwentyOneDay.tsx, IndexFourteenDaysV2.tsx,
// IndexFourteenDays.tsx all share the same resolver), but only the 21-day cohort has a real
// paid-pending-start test account today (917678140328) — the 14-day-v2 side of that specific
// persona isn't covered here; flagged in the report as a gap needing a real account.

const freeStudent = findAccount("21day", "Telugu", "2026-06-21");
const paidPendingStudent = findAccount("21day", "English", "2026-06-21", "paid-pending-start");
if (!freeStudent || !paidPendingStudent) {
  throw new Error("Missing 21-day free or paid-pending-start account(s) in e2e/fixtures/test-accounts.ts");
}

// This cohort's actual last day is day 22 (free_batch_start_date 2026-06-21 + 21 days =
// free_batch_end_date 2026-07-12) — day 21 is the day BEFORE the cutoff, an important distinction
// confirmed against real data this session (forceDay=21 must NOT trigger the transition).
//
// UPDATE 2026-07-21: freeStudent's real batch has since genuinely ended (confirmed by the user:
// raw backend status is now "14DaysCompleted") — getEffectiveStatus (src/lib/studentStatus.ts:22-23)
// short-circuits to that raw status regardless of forceDay, so this account can no longer simulate
// "day 21, not yet over" at all; it now shows the completed screen for every forceDay value. The
// "day 21" test below was altered to assert the (now permanent) completed state instead of deleting
// it, per the user's direction.
test.describe("21-day cohort — batch-over status resolver", () => {
  test.describe("Free/unpaid student", () => {
    test("day 21 — real account has genuinely completed, shows TRIAL ENDED regardless of forceDay", async ({ page }) => {
      await page.goto(`/${freeStudent.mobile}?forceDay=21&time=8.00pm`);
      await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    });

    test("day 22 before 7:30 PM — real account has genuinely completed, shows TRIAL ENDED regardless of forceDay", async ({ page }) => {
      await page.goto(`/${freeStudent.mobile}?forceDay=22&time=6.00pm`);
      await expect(page.getByText("TRIAL ENDED")).toBeVisible();
    });

    test("day 22 at 8:00 PM (after the 7:30 PM cutoff) — completed/upsell screen", async ({ page }) => {
      await page.goto(`/${freeStudent.mobile}?forceDay=22&time=8.00pm`);
      await expect(page.getByText("TRIAL ENDED")).toBeVisible();
      await expect(page.getByText(/Classes are completed/)).toBeVisible();
      await expect(page.getByText("JOIN 1 YEAR PLAN")).toBeVisible();
    });
  });

  test.describe("Paid-in-advance student (subscription starts the day after free_batch_end_date)", () => {
    test("day 21 — ongoing dashboard with tabs, but no \"buy now\" banner (already paid)", async ({ page }) => {
      await page.goto(`/${paidPendingStudent.mobile}?forceDay=21&time=8.00pm`);
      await expect(page.getByText("Live sessions")).toBeVisible();
      await expect(page.getByText("Your Yoga Journey")).toBeVisible();
      await expect(page.getByText("Join Daily Yoga Classes")).not.toBeVisible();
    });

    test("day 22 before 7:30 PM — still the ongoing dashboard (batch not over yet)", async ({ page }) => {
      await page.goto(`/${paidPendingStudent.mobile}?forceDay=22&time=6.00pm`);
      await expect(page.getByText("Starts from TOMORROW")).not.toBeVisible();
      await expect(page.getByText("Live sessions")).toBeVisible();
    });

    test("day 22 at 8:00 PM (after cutoff) — \"Starts from TOMORROW\" interstitial, no tabs", async ({ page }) => {
      await page.goto(`/${paidPendingStudent.mobile}?forceDay=22&time=8.00pm`);
      await expect(page.getByText("YOUR DAILY YOGA CLASSES")).toBeVisible();
      await expect(page.getByText("Starts from TOMORROW")).toBeVisible();
      await expect(page.getByText("Live sessions")).not.toBeVisible();
      await expect(page.getByText("Your Yoga Journey")).not.toBeVisible();
    });
  });
});

// The same resolver drives IndexFourteenDaysV2.tsx — this was a real bug fix this session (the
// old ?forceDay= override hardcoded a day-22 threshold, which would have mis-evaluated a 14-day
// cohort's actual last day, day 14). Only the free/unpaid side has a real account today; the
// paid-pending-start persona for this cohort needs a real test account before it can be covered
// the same way as the 21-day side above (see report).
test.describe("14-day-v2 cohort — batch-over status resolver (free/unpaid side only)", () => {
  const freeStudent14 = findAccount("14day", "Telugu", "2026-07-13");
  if (!freeStudent14) {
    throw new Error("Missing 14-day (2026-07-13 cohort) account in e2e/fixtures/test-accounts.ts");
  }

  test("day 13 (before the last day) — still the ongoing dashboard", async ({ page }) => {
    await page.goto(`/${freeStudent14.mobile}?forceDay=13&time=8.00pm`);
    await expect(page.getByText("TRIAL ENDED")).not.toBeVisible();
  });

  test("day 14 before 7:30 PM — still ongoing, not yet completed", async ({ page }) => {
    await page.goto(`/${freeStudent14.mobile}?forceDay=14&time=6.00pm`);
    await expect(page.getByText("TRIAL ENDED")).not.toBeVisible();
  });

  test("day 14 at 8:00 PM (after the 7:30 PM cutoff) — completed/upsell screen", async ({ page }) => {
    await page.goto(`/${freeStudent14.mobile}?forceDay=14&time=8.00pm`);
    await expect(page.getByText("TRIAL ENDED")).toBeVisible();
  });
});
