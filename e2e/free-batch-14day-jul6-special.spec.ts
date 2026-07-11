import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// Both accounts share the same real cohort: free_batch_start_date = 2026-07-06 (Monday).
const telugu = findAccount("14day", "Telugu", "2026-07-06");
const english = findAccount("14day", "English", "2026-07-06");
if (!telugu || !english) {
  throw new Error("Missing 14-day (2026-07-06 cohort) account(s) in e2e/fixtures/test-accounts.ts");
}

// Day → bonus session mapping, from src/components/FourteenDayBonusSessionCard.tsx's getBonusInfo
// (same 5 days for both languages; names differ by language only for day 7):
//   Day 3  Face Yoga             — waiting from 8:00 PM, live 8:30–8:59 PM
//   Day 7  Weight Loss           — waiting from 10:30 AM, live 11:00–11:59 AM (English: "Weight Loss Orientation")
//   Day 10 Breath Work           — waiting from 8:30 PM, live 9:00–9:29 PM
//   Day 12 Meditation            — waiting from 8:00 PM, live 8:30–8:59 PM
//   Day 14 Sleep                 — waiting from 10:30 AM, live 11:00–11:44 AM
//
// NOTE on the reference schedule this was written against: it lists Day 10 "Breathwork @ 8:30 PM"
// and calls Day 14 "Sleep Masterclass" — neither matches current code (Day 10's actual live start
// is 9:00 PM, 8:30 PM is only when the waiting screen opens; Day 14's rendered name is "Sleep
// Session"). Tests below assert what the app actually does today, per getBonusInfo.

test.describe(`14-day free batch (2026-07-06 cohort)`, () => {
  // Grouped to mirror free-batch-14day-regular.spec.ts's tree shape ("Live sessions" / "Special
  // bonus sessions" / "Week-2 countdown banner") so the two cohorts sit side by side and diff
  // easily in the Playwright HTML report's test tree.
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
  });

  test.describe("Special bonus sessions (FourteenDayBonusSessionCard)", () => {
    test.describe("Day 3 — Face Yoga", () => {
      test("waiting at 8:15 PM (Telugu)", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=3&time=8.15pm`);
        await expect(page.getByRole("heading", { name: "Special Bonus Session" })).toBeVisible();
        await expect(page.getByText("Face Yoga Session at 8:30 PM")).toBeVisible();
      });

      test("live at 8:45 PM (Telugu)", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=3&time=8.45pm`);
        await expect(page.getByText("Face Yoga Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });

      test("live at 8:45 PM (English, cross-language check)", async ({ page }) => {
        await page.goto(`/${english.mobile}?forceDay=3&time=8.45pm`);
        await expect(page.getByText("Face Yoga Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });

      test("after live ends at 10:05 PM, falls back to the regular card", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=3&time=10.05pm`);
        await expect(page.getByRole("heading", { name: "Special Bonus Session" })).not.toBeVisible();
        await expect(page.getByText("Next Yoga session is Tomorrow at 5:30AM")).toBeVisible();
      });
    });

    test.describe("Day 7 — Weight Loss", () => {
      test("waiting at 10:45 AM (English — \"Weight Loss Orientation\")", async ({ page }) => {
        await page.goto(`/${english.mobile}?forceDay=7&time=10.45am`);
        await expect(page.getByText("Weight Loss Orientation at 11:00 AM")).toBeVisible();
      });

      test("live at 11:20 AM (English)", async ({ page }) => {
        await page.goto(`/${english.mobile}?forceDay=7&time=11.20am`);
        await expect(page.getByText("Weight Loss Orientation")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });

      test("live at 11:20 AM (Telugu — \"Weight Loss Session\")", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=7&time=11.20am`);
        await expect(page.getByText("Weight Loss Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });
    });

    test.describe("Day 10 — Breath Work", () => {
      test("waiting at 8:45 PM (Telugu)", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=10&time=8.45pm`);
        await expect(page.getByText("Breath Work Session at 9:00 PM")).toBeVisible();
      });

      test("live at 9:20 PM (Telugu)", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=10&time=9.20pm`);
        await expect(page.getByText("Breath Work Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });

      test("live at 9:20 PM (English, cross-language check)", async ({ page }) => {
        await page.goto(`/${english.mobile}?forceDay=10&time=9.20pm`);
        await expect(page.getByText("Breath Work Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });
    });

    test.describe("Day 12 — Meditation", () => {
      test("waiting at 8:15 PM (English)", async ({ page }) => {
        await page.goto(`/${english.mobile}?forceDay=12&time=8.15pm`);
        await expect(page.getByText("Meditation Session at 8:30 PM")).toBeVisible();
      });

      test("live at 8:50 PM (English)", async ({ page }) => {
        await page.goto(`/${english.mobile}?forceDay=12&time=8.50pm`);
        await expect(page.getByText("Meditation Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });

      test("live at 8:50 PM (Telugu, cross-language check)", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=12&time=8.50pm`);
        await expect(page.getByText("Meditation Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });
    });

    test.describe("Day 14 — Sleep", () => {
      test("waiting at 10:45 AM (Telugu)", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=14&time=10.45am`);
        await expect(page.getByText("Sleep Session at 11:00 AM")).toBeVisible();
      });

      test("live at 11:20 AM (Telugu)", async ({ page }) => {
        await page.goto(`/${telugu.mobile}?forceDay=14&time=11.20am`);
        await expect(page.getByText("Sleep Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });

      test("live at 11:20 AM (English, cross-language check)", async ({ page }) => {
        await page.goto(`/${english.mobile}?forceDay=14&time=11.20am`);
        await expect(page.getByText("Sleep Session")).toBeVisible();
        await expect(page.getByText("JOIN NOW")).toBeVisible();
      });
    });
  });

  // WeekTwoCountdownBanner (src/components/WeekTwoCountdownBanner.tsx), rendered directly by
  // IndexFourteenDays.tsx (week === 2, no tab bar for this legacy cohort). Same formula as the
  // regular/2026-07-13 cohort's tabbed flow: daysLeft = Math.max(0, 14 - currentDay) — day 14 is
  // the last day of the free batch, so it reads 0 ("Ends Today") instead of "1 day left".
  test.describe("Week-2 countdown banner", () => {
    test("Day 7 (still week 1) — no countdown banner shown", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=7&time=2.00am`);
      await expect(page.getByText(/Days Left|Day Left|Ends Today/)).not.toBeVisible();
    });

    test("Day 8 (first day of week 2) — \"Only 6 Days Left!\"", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=8&time=2.00am`);
      await expect(page.getByText("Only 6 Days Left!")).toBeVisible();
    });

    test("Day 12 — \"Only 2 Days Left!\" (plural)", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=12&time=2.00am`);
      await expect(page.getByText("Only 2 Days Left!")).toBeVisible();
    });

    test("Day 13 — \"Only 1 Day Left!\" (singular)", async ({ page }) => {
      await page.goto(`/${english.mobile}?forceDay=13&time=2.00am`);
      await expect(page.getByText("Only 1 Day Left!")).toBeVisible();
    });

    test("Day 14 (last day) — \"Free Yoga Ends Today!\", not \"Only 1 Day Left!\"", async ({ page }) => {
      await page.goto(`/${telugu.mobile}?forceDay=14&time=2.00am`);
      await expect(page.getByText("Free Yoga Ends Today!")).toBeVisible();
      await expect(page.getByText(/Day.*Left/)).not.toBeVisible();
    });
  });
});
