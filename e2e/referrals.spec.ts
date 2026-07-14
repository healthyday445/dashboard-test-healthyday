import { test, expect, type Page } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// Referrals page: src/pages/ReferralStatus.tsx, route /:mobile/referrals.
//
// Renders two things that both depend on verifiedRefs + isPaid:
//   - ReferralRewardsCard ("Your Referral Rewards") — the milestone tracker
//   - a static 2-card "Rewards" grid further down the page
//
// Free students: "Free Diet PDF" unlocks at 1 referral (Download button), "Healthyday T-shirt"
// at 20. Paid students: "10 FREE Classes" unlocks at 5 referrals instead (no download — a
// "Claimed" pill appears in the Rewards grid card once unlocked), T-shirt at 20 unchanged.
//
// `?preview_referrals=<n>` seeds a mock referral count without a real account. Paid/free status
// is looked up for real via /.netlify/functions/student UNLESS `?preview_paid=1|0` is given, which
// overrides it deterministically — the state-matrix tests below all pin preview_paid so they run
// fully offline; a couple of smoke tests at the bottom cover the real auto-detection path.

const STUB_MOBILE = "919999999900";

test.describe("Referrals page — free-student milestones (preview_paid=0)", () => {
  test("0 referrals: You are here + both milestones locked", async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=0&preview_paid=0`);

    await expect(page.getByText("Your Referral Rewards")).toBeVisible();
    await expect(page.getByText("0 Referrals", { exact: true })).toBeVisible();
    await expect(page.getByText("You are here")).toBeVisible();
    await expect(page.getByText("Free Diet PDF").first()).toBeVisible();
    await expect(page.getByText("Healthyday T-shirt").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Download" })).toHaveCount(0);
  });

  test("15 referrals: Free Diet PDF unlocked with Download, T-shirt still locked", async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=15&preview_paid=0`);

    await expect(page.getByText("Free Diet PDF").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Download" })).toBeVisible();
    await expect(page.getByText("You are here")).toBeVisible();
    await expect(page.getByText("15 Referrals").first()).toBeVisible();
    // Reward grid: unlocked free reward shows "UNLOCKED", never "Claimed" (that's paid-only).
    await expect(page.getByText("UNLOCKED")).toBeVisible();
    await expect(page.getByText("Claimed")).toHaveCount(0);
  });

  test("20 referrals: both milestones unlocked, grid shows UNLOCKED twice and never Claimed", async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=20&preview_paid=0`);

    await expect(page.getByText("You are here")).toHaveCount(0);
    await expect(page.getByText("UNLOCKED")).toHaveCount(2);
    await expect(page.getByText("Claimed")).toHaveCount(0);
  });
});

test.describe("Referrals page — paid-student milestones (preview_paid=1)", () => {
  test("0 referrals: You are here + both milestones locked, paid labels shown", async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=0&preview_paid=1`);

    await expect(page.getByText("0 Referrals", { exact: true })).toBeVisible();
    await expect(page.getByText("You are here")).toBeVisible();
    await expect(page.getByText("10 FREE Classes").first()).toBeVisible();
    await expect(page.getByText("Healthyday T-shirt").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Download" })).toHaveCount(0);
  });

  test("3 referrals (1-4 range): You are here pill renders ahead of the still-locked first milestone", async ({ page }) => {
    // Regression test for a bug where paid students at 1-4 referrals (below their 5-referral
    // first milestone) saw no "You are here" indicator at all — the free-student equivalent of
    // this gap (0 refs) was handled, but paid's first milestone sitting above 1 left a silent hole.
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=3&preview_paid=1`);

    await expect(page.getByText("You are here")).toBeVisible();
    await expect(page.getByText("3 Referrals").first()).toBeVisible();
    await expect(page.getByText("10 FREE Classes").first()).toBeVisible();
    // Not yet unlocked at 3 refs — no Claimed pill in the grid yet.
    await expect(page.getByText("Claimed")).toHaveCount(0);
  });

  test("5 referrals: first milestone unlocks (no Download), You are here moves between milestones", async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=5&preview_paid=1`);

    await expect(page.getByText("You are here")).toBeVisible();
    await expect(page.getByRole("button", { name: "Download" })).toHaveCount(0);
    // Reward grid: the now-unlocked "10 FREE Classes" reward shows a Claimed pill (paid-only UI).
    await expect(page.getByText("Claimed")).toBeVisible();
  });

  test("19 referrals: still one You are here row, T-shirt not yet unlocked", async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=19&preview_paid=1`);

    await expect(page.getByText("You are here")).toBeVisible();
    await expect(page.getByText("19 Referrals").first()).toBeVisible();
    await expect(page.getByText("Claimed")).toHaveCount(1);
  });

  test("20 referrals: both milestones unlocked, no You are here, grid shows Claimed twice", async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/referrals?preview_referrals=20&preview_paid=1`);

    await expect(page.getByText("You are here")).toHaveCount(0);
    await expect(page.getByText("Claimed")).toHaveCount(2);
    await expect(page.getByText("UNLOCKED")).toHaveCount(2);
  });
});

test.describe("Referrals page — real-account paid/free auto-detection (no preview_paid)", () => {
  // These hit the real backend via the vite dev proxy (read-only GETs), so keep this to a
  // couple of smoke tests rather than the full state matrix above.
  const paidAccount = findAccount("paid", "English");
  const freeAccount = findAccount("14day", "Telugu", "2026-07-06");

  if (!paidAccount || !freeAccount) {
    throw new Error("Missing a required referrals test account in e2e/fixtures/test-accounts.ts");
  }

  test(`real paid account auto-selects the paid milestone variant (${paidAccount.mobile})`, async ({ page }) => {
    await page.goto(`/${paidAccount.mobile}/referrals?preview_referrals=1`);

    await expect(page.getByText("10 FREE Classes").first()).toBeVisible();
    await expect(page.getByText("You are here")).toBeVisible();
  });

  test(`real free-batch account auto-selects the free milestone variant (${freeAccount.mobile})`, async ({ page }) => {
    await page.goto(`/${freeAccount.mobile}/referrals?preview_referrals=2`);

    await expect(page.getByText("Free Diet PDF").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Download" })).toBeVisible();
  });
});

test.describe("Referrals page — loading skeleton", () => {
  /** Stubs both data fetches the page depends on, with an optional artificial delay. */
  async function stubReferralsAndStudent(
    page: Page,
    opts: { verifiedReferrals: number; status: string; delayMs?: number }
  ) {
    const { verifiedReferrals, status, delayMs = 0 } = opts;
    await page.route("**/.netlify/functions/referrals**", async (route) => {
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          total_referrals: verifiedReferrals,
          pending_referrals: 0,
          verified_referrals: verifiedReferrals,
          referrals_required_for_next_free_classes: 5,
          referrals_required_for_next_gift: 20,
          language: "English",
          referrals: [],
        }),
      });
    });
    await page.route("**/.netlify/functions/student**", async (route) => {
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ status }) });
    });
  }

  test("shows shimmer skeletons while data is in flight, then swaps to real paid content", async ({ page }) => {
    await stubReferralsAndStudent(page, { verifiedReferrals: 15, status: "paid", delayMs: 1200 });

    await page.goto(`/${STUB_MOBILE}/referrals`);

    // Skeleton class is an implementation detail, but there's no accessible text/role on a
    // shimmer placeholder to key off instead — see ReferralRewardsCardSkeleton / RewardCardSkeleton.
    await expect(page.locator(".referral-rewards-skeleton").first()).toBeVisible();
    await expect(page.getByText("10 FREE Classes")).toHaveCount(0);

    await expect(page.getByText("10 FREE Classes").first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(".referral-rewards-skeleton")).toHaveCount(0);
  });
});
