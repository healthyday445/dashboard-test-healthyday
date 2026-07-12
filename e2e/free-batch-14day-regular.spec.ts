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
  // Grouped to mirror free-batch-14day-jul6-special.spec.ts's tree shape ("Live sessions" /
  // "Special bonus sessions" / "Week-2 countdown banner") so the two cohorts sit side by side and
  // diff easily in the Playwright HTML report's test tree.
  test.describe("Live sessions (day-by-day)", () => {
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
  });

  // Confirmed by reading source (src/pages/IndexFourteenDaysV2.tsx): this batch renders via
  // IndexFourteenDaysV2, which imports the exact same FourteenDayBonusSessionCard/getBonusInfo/
  // BONUS_DAYS as the July-6 special batch's IndexFourteenDays.tsx — the "Special Live" schedule
  // (Face Yoga/Weight Loss/Breath Work/Meditation/Sleep) is a plain day-of-batch rule with no
  // per-cohort condition, so it applies here too, not just July 6.
  //
  // NOTE on the reference schedule this was written against: it lists Day 10 "Breathwork @ 8:30 PM"
  // and calls Day 14 "Sleep Masterclass" — neither matches current code (Day 10's actual live start
  // is 9:00 PM, 8:30 PM is only when the waiting screen opens; Day 14's rendered name is "Sleep
  // Session"). Same discrepancy as the July-6 file — see free-batch-14day-jul6-special.spec.ts.
  test.describe("Special bonus sessions (same shared component as the July 6 batch)", () => {
    test("Day 3 Face Yoga — live at 8:45 PM (Telugu)", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=3&time=8.45pm`);
      await expect(page.getByText("Face Yoga Session")).toBeVisible();
      await expect(page.getByText("JOIN NOW")).toBeVisible();
    });

    test("Day 7 Weight Loss — live at 11:20 AM (English — \"Weight Loss Orientation\")", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=7&time=11.20am`);
      await expect(page.getByText("Weight Loss Orientation")).toBeVisible();
      await expect(page.getByText("JOIN NOW")).toBeVisible();
    });

    test("Day 10 Breath Work — live at 9:20 PM (Telugu)", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=10&time=9.20pm`);
      await expect(page.getByText("Breath Work Session")).toBeVisible();
      await expect(page.getByText("JOIN NOW")).toBeVisible();
    });

    test("Day 12 Meditation — live at 8:50 PM (English)", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=12&time=8.50pm`);
      await expect(page.getByText("Meditation Session")).toBeVisible();
      await expect(page.getByText("JOIN NOW")).toBeVisible();
    });

    test("Day 14 Sleep — live at 11:20 AM (Telugu)", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=14&time=11.20am`);
      await expect(page.getByText("Sleep Session")).toBeVisible();
      await expect(page.getByText("JOIN NOW")).toBeVisible();
    });
  });

  // Regression coverage for getBonusWindowStart (src/lib/utils.ts): the bonus waiting-screen
  // window used to open at a fixed 30 min before the bonus start, leaving a gap right after the
  // preceding regular session block ended (7:30 PM evening / 9:30 AM morning) where the UI fell
  // back to "Next Session is Tomorrow" or the plain "next session" card instead of the upcoming
  // bonus session. Same fix and same bonus schedule as the July-6 cohort (shared component), so
  // mirrored here for the regular/default flow.
  test.describe("Bonus window opens right when the prior regular session block ends", () => {
    test("Day 3 Face Yoga — waiting at 7:35 PM, not \"Tomorrow\"", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=3&time=7.35pm`);
      await expect(page.getByText("Face Yoga Session at 8:30 PM")).toBeVisible();
      await expect(page.getByText("Next Yoga session is Tomorrow at 5:30AM")).not.toBeVisible();
    });

    test("Day 7 Weight Loss — waiting at 9:35 AM (English)", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=7&time=9.35am`);
      await expect(page.getByText("Weight Loss Orientation at 11:00 AM")).toBeVisible();
    });

    test("Day 10 Breath Work — waiting at 7:35 PM, not \"Tomorrow\"", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=10&time=7.35pm`);
      await expect(page.getByText("Breath Work Session at 9:00 PM")).toBeVisible();
      await expect(page.getByText("Next Yoga session is Tomorrow at 5:30AM")).not.toBeVisible();
    });

    test("Day 12 Meditation — waiting at 7:35 PM, not \"Tomorrow\"", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=12&time=7.35pm`);
      await expect(page.getByText("Meditation Session at 8:30 PM")).toBeVisible();
      await expect(page.getByText("Next Yoga session is Tomorrow at 5:30AM")).not.toBeVisible();
    });

    test("Day 14 Sleep — waiting at 9:35 AM (Telugu)", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=14&time=9.35am`);
      await expect(page.getByText("Sleep Session at 11:00 AM")).toBeVisible();
    });
  });

  // Level Bonus schedule (new — only exists for this V2 flow, not the July-6 special batch).
  // Implemented in src/components/FourteenDaysV2LevelCard.tsx / src/pages/FourteenDaysV2Program.tsx:
  // LEVEL_UNLOCK_DAYS_V2 = [3, 6, 9, 12, 14] → Detox / Breakfast / Lunch / Dinner / Certificate.
  // This is driven by real attendance count (freeDaysAttended), NOT forceDay — the Journey tab
  // supports a dedicated ?preview_levels=<n> override (documented in PREVIEWS.md for the 21-day
  // journey; confirmed FourteenDaysV2Program.tsx reads the same param) that forces the tab open
  // and sets daysAttended directly, bypassing the real account fetch entirely.
  //
  // NOT covered here: FourteenDaysV2LevelCard, the smaller summary widget shown on the Live
  // Sessions tab itself (below the session/bonus card) — it reads real attendance_tracker data
  // only and has no preview override, so its exact state can't be pinned deterministically with
  // a real account. Flagging as a gap rather than asserting on data that could change.
  test.describe("Journey — Level bonus schedule (via ?preview_levels)", () => {
    test("in progress toward Level 1 (1 day attended)", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?preview_levels=1`);
      await expect(page.getByText("Attend 2 more classes to unlock Level 2 & 3-Days Detox Programme")).toBeVisible();
    });

    test("Day 3 milestone — Level 1 unlocked, 3-Days Detox Programme", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?preview_levels=3`);
      await expect(page.getByText("CONGRATULATIONS!")).toBeVisible();
      await expect(page.getByText("You have completed Level 1 & unlocked the 3-Days Detox Programme!")).toBeVisible();
    });

    test("Day 6 milestone — Level 2 unlocked, Breakfast Diet", async ({ page }) => {
      await page.goto(`/${english.mobile}?preview_levels=6`);
      await expect(page.getByText("You have completed Level 2 & unlocked the 3-Days Breakfast Diet!")).toBeVisible();
    });

    test("Day 9 milestone — Level 3 unlocked, Lunch Diet", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?preview_levels=9`);
      await expect(page.getByText("You have completed Level 3 & unlocked the 3-Days Lunch Diet!")).toBeVisible();
    });

    test("Day 12 milestone — Level 4 unlocked, Dinner Diet", async ({ page }) => {
      await page.goto(`/${english.mobile}?preview_levels=12`);
      await expect(page.getByText("You have completed Level 4 & unlocked the 3-Days Dinner Diet!")).toBeVisible();
    });

    test("Day 14 milestone — all levels complete, Certificate earned", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?preview_levels=14`);
      await expect(page.getByText("You have completed all the Levels & earned the 14-Days Yoga Certificate")).toBeVisible();
    });
  });

  // WeekTwoCountdownBanner (src/components/WeekTwoCountdownBanner.tsx), rendered above the tab
  // bar by Dashboard.tsx's tabbed shell for this cohort (newBatchWeek.week === 2). Formula:
  // daysLeft = Math.max(0, 14 - currentDay) — day 14 is the last day of the free batch, so it
  // reads 0 ("Ends Today") rather than counting itself as "1 day left".
  test.describe("Week-2 countdown banner (Dashboard.tsx tabbed shell)", () => {
    test("Day 7 (still week 1) — no countdown banner shown", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=7&time=2.00am`);
      await expect(page.getByText(/Days Left|Day Left|Ends Today/)).not.toBeVisible();
    });

    test("Day 8 (first day of week 2) — \"Only 6 Days Left!\"", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=8&time=2.00am`);
      await expect(page.getByText("Only 6 Days Left!")).toBeVisible();
    });

    test("Day 12 — \"Only 2 Days Left!\" (plural)", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=12&time=2.00am`);
      await expect(page.getByText("Only 2 Days Left!")).toBeVisible();
    });

    test("Day 13 — \"Only 1 Day Left!\" (singular)", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=13&time=2.00am`);
      await expect(page.getByText("Only 1 Day Left!")).toBeVisible();
    });

    test("Day 14 (last day) — \"Free Yoga Ends Today!\", not \"Only 1 Day Left!\"", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=14&time=2.00am`);
      await expect(page.getByText("Free Yoga Ends Today!")).toBeVisible();
      await expect(page.getByText(/Day.*Left/)).not.toBeVisible();
    });
  });
});
