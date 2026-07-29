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
  test.describe("Live sessions", () => {
    test("no session live at 2:00 PM shows NoSessionsCard", async ({ page }) => {
      await page.goto(`/${account.mobile}?time=2.00pm`);
      await expect(page.getByText("Next Live at 4:30 PM")).toBeVisible();
    });
  });

  test.describe("Bonus session cards", () => {
    test.describe("Diet Session bonus card", () => {
      // Diet starts at 8:00 PM, 30 min after the 7:30 PM evening-session-end (which is also when
      // this card's eligibility window opens, per getActivePaidBonusSession/getBonusWindowStart).
      // Live now opens 30 min before the actual start too (PaidBonusSessionCard's isLive), so both
      // land on the same 7:30 PM instant — there's no separate "upcoming" state left for this one,
      // it goes straight from not-shown to "Live Now" the moment it becomes eligible.
      test("live immediately at 7:35 PM (30 min before the actual 8:00 PM start)", async ({ page }) => {
        await page.goto(`/${account.mobile}?time=7.35pm`);
        await expect(page.getByRole("heading", { name: "Diet Session - Live Now" })).toBeVisible();
      });

      test("live at 8:40 PM", async ({ page }) => {
        await page.goto(`/${account.mobile}?time=8.40pm`);
        await expect(page.getByRole("heading", { name: "Diet Session - Live Now" })).toBeVisible();
      });
    });

    test.describe("Breath to Heal bonus card", () => {
      // forcePaidDay=1 (Monday) — B2H is explicitly excluded for English on Sundays, so pin a
      // non-Sunday day to keep this deterministic regardless of which real day tests run on.
      //
      // Diet (8:00 PM) and B2H (9:00 PM) eligibility windows overlap (both open at 7:30 PM per
      // getBonusWindowStart/getActivePaidBonusSession), and getActivePaidBonusSession's .find()
      // returns Diet first since it's pushed into the eligible array before B2H — so B2H is only
      // ever the *selected* card from 8:45 PM onward (once Diet's own window, which now also
      // extends to +45 min, has closed). B2H's own Live Now window now starts at 8:30 PM (30 min
      // before its 9:00 PM start) per PaidBonusSessionCard's isLive shift, which is entirely inside
      // that Diet-masked period — so there's no longer an observable "upcoming" (non-live) state
      // for B2H at all: the first moment it can appear (8:45 PM) it's already live. This masking is
      // a pre-existing quirk of the fixed eligible-array ordering, not something this fix changed.
      test("takes over from Diet at 8:45 PM, already Live Now", async ({ page }) => {
        await page.goto(`/${account.mobile}?forcePaidDay=1&time=8.45pm`);
        await expect(page.getByRole("heading", { name: "Breath to Heal Session - Live Now" })).toBeVisible();
      });

      test("live at 9:30 PM", async ({ page }) => {
        await page.goto(`/${account.mobile}?forcePaidDay=1&time=9.30pm`);
        await expect(page.getByRole("heading", { name: "Breath to Heal Session - Live Now" })).toBeVisible();
      });
    });

    test.describe("Face Yoga bonus card (English weeks only, forced Sunday)", () => {
      test("upcoming at 10:45 AM", async ({ page }) => {
        test.skip(!isEnglishFaceYogaWeek, "Real calendar is on the Telugu Face Yoga week right now — not forceable for this English account");
        await page.goto(`/${account.mobile}?forcePaidDay=0&time=10.45am`);
        await expect(page.getByRole("heading", { name: "Next Session - Face Yoga Session" })).toBeVisible();
        await expect(page.getByText("Session Starts at 11:30 AM")).toBeVisible();
      });

      // Live Now opens 30 min before the actual 11:30 AM start.
      test("live at 11:05 AM (30 min before the actual 11:30 AM start)", async ({ page }) => {
        test.skip(!isEnglishFaceYogaWeek, "Real calendar is on the Telugu Face Yoga week right now — not forceable for this English account");
        await page.goto(`/${account.mobile}?forcePaidDay=0&time=11.05am`);
        await expect(page.getByRole("heading", { name: "Face Yoga Session - Live Now" })).toBeVisible();
      });

      test("live at 11:45 AM", async ({ page }) => {
        test.skip(!isEnglishFaceYogaWeek, "Real calendar is on the Telugu Face Yoga week right now — not forceable for this English account");
        await page.goto(`/${account.mobile}?forcePaidDay=0&time=11.45am`);
        await expect(page.getByRole("heading", { name: "Face Yoga Session - Live Now" })).toBeVisible();
      });
    });
  });

  test.describe("Referrals", () => {
    test("referral milestone card renders the paid variant", async ({ page }) => {
      // verifiedRefs comes from real, mutable account data — assert structure (always-rendered
      // labels), not a specific referral count, so this doesn't false-alarm when the real count changes.
      // Paid students see "10 FREE Classes" (5 referrals) instead of free students' "Free Diet PDF"
      // (1 referral) — see e2e/referrals.spec.ts for the full free/paid milestone state matrix.
      await page.goto(`/${account.mobile}`);
      await expect(page.getByRole("heading", { name: "Your Referral Rewards" })).toBeVisible();
      await expect(page.getByText("10 FREE Classes")).toBeVisible();
      await expect(page.getByText("Healthyday T-shirt")).toBeVisible();
    });
  });

  test.describe("Grocery List card (12-month plan only)", () => {
    test("shows for this 12-month account", async ({ page }) => {
      await page.goto(`/${account.mobile}`);
      await expect(page.getByText("This Week's Grocery List")).toBeVisible();
    });
  });
});

// Plan-type eligibility matrix for the three recurring bonus cards + the Grocery List card, per
// getActivePaidBonusSession (src/lib/paidBonusSessions.ts) and IndexPaid.tsx's is12Month check:
//   - Face Yoga: 12-month only, Sundays only (not covered per-plan below — already covered for the
//     base 12_months account above; day-of-week/Telugu-English-week alternation makes it the
//     flakiest of the three to pin down per extra account, so it's intentionally not repeated here).
//   - Diet Session: 12-month only (base AND _upgrade), any day.
//   - Breath to Heal: 6-and-12-month (base AND _upgrade), any day except English-language Sundays.
//   - Grocery List card: 12-month only (base AND _upgrade), always visible (not time-gated).
// The "_upgrade" suffix must behave identically to its base plan — this was a real bug fixed this
// session (planType comparisons previously mis-picked a stale entry from subscriptions[] instead of
// reading studentData.current_plan directly), so the *_upgrade accounts below aren't just filler,
// they're regression coverage for that exact fix.
test.describe("Paid dashboard — plan-type bonus-session eligibility matrix", () => {
  const sixMonth = findAccount("paid", "Telugu", undefined, "6_months");
  const sixMonthUpgrade = findAccount("paid", "English", undefined, "6_months_upgrade");
  const threeMonth = findAccount("paid", "Telugu", undefined, "3_months");
  const twelveMonthUpgrade = findAccount("paid", "Telugu", undefined, "12_months_upgrade");
  if (!sixMonth || !sixMonthUpgrade || !threeMonth || !twelveMonthUpgrade) {
    throw new Error("Missing a required plan-type paid account in e2e/fixtures/test-accounts.ts");
  }

  test.describe(`6_months (${sixMonth.mobile})`, () => {
    test("Breath to Heal live at 9:10 PM (forced non-Sunday)", async ({ page }) => {
      await page.goto(`/${sixMonth.mobile}?forcePaidDay=1&time=9.10pm`);
      await expect(page.getByRole("heading", { name: "Breath to Heal Session - Live Now" })).toBeVisible();
    });

    test("Diet Session never shows (12-month-only)", async ({ page }) => {
      await page.goto(`/${sixMonth.mobile}?time=8.15pm`);
      await expect(page.getByRole("heading", { name: "Diet Session - Live Now" })).toHaveCount(0);
    });

    test("no Grocery List card (12-month-only)", async ({ page }) => {
      await page.goto(`/${sixMonth.mobile}`);
      await expect(page.getByText("This Week's Grocery List")).toHaveCount(0);
    });
  });

  test.describe(`6_months_upgrade (${sixMonthUpgrade.mobile}) — must behave identically to plain 6_months`, () => {
    test("Breath to Heal live at 9:10 PM (forced non-Sunday)", async ({ page }) => {
      await page.goto(`/${sixMonthUpgrade.mobile}?forcePaidDay=1&time=9.10pm`);
      await expect(page.getByRole("heading", { name: "Breath to Heal Session - Live Now" })).toBeVisible();
    });

    test("Diet Session never shows (12-month-only)", async ({ page }) => {
      await page.goto(`/${sixMonthUpgrade.mobile}?time=8.15pm`);
      await expect(page.getByRole("heading", { name: "Diet Session - Live Now" })).toHaveCount(0);
    });

    test("no Grocery List card (12-month-only)", async ({ page }) => {
      await page.goto(`/${sixMonthUpgrade.mobile}`);
      await expect(page.getByText("This Week's Grocery List")).toHaveCount(0);
    });
  });

  test.describe(`3_months (${threeMonth.mobile}) — none of the bonus cards or Grocery List`, () => {
    test("Diet Session never shows", async ({ page }) => {
      await page.goto(`/${threeMonth.mobile}?time=8.15pm`);
      await expect(page.getByRole("heading", { name: "Diet Session - Live Now" })).toHaveCount(0);
    });

    test("Breath to Heal never shows", async ({ page }) => {
      await page.goto(`/${threeMonth.mobile}?forcePaidDay=1&time=9.10pm`);
      await expect(page.getByRole("heading", { name: "Breath to Heal Session - Live Now" })).toHaveCount(0);
    });

    test("no Grocery List card", async ({ page }) => {
      await page.goto(`/${threeMonth.mobile}`);
      await expect(page.getByText("This Week's Grocery List")).toHaveCount(0);
    });
  });

  test.describe(`12_months_upgrade (${twelveMonthUpgrade.mobile}) — must behave identically to plain 12_months`, () => {
    test("Diet Session live at 8:40 PM", async ({ page }) => {
      await page.goto(`/${twelveMonthUpgrade.mobile}?time=8.40pm`);
      await expect(page.getByRole("heading", { name: "Diet Session - Live Now" })).toBeVisible();
    });

    test("Breath to Heal live at 9:30 PM (forced non-Sunday)", async ({ page }) => {
      await page.goto(`/${twelveMonthUpgrade.mobile}?forcePaidDay=1&time=9.30pm`);
      await expect(page.getByRole("heading", { name: "Breath to Heal Session - Live Now" })).toBeVisible();
    });

    test("Grocery List card shows", async ({ page }) => {
      await page.goto(`/${twelveMonthUpgrade.mobile}`);
      await expect(page.getByText("This Week's Grocery List")).toBeVisible();
    });
  });
});
