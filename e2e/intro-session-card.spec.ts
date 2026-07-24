import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// Introductory Session card on the pre-batch onboarding screen (IndexFourteenDaysV2.tsx,
// reached via ?forceDay=0 — the reserved sentinel that forces the "batch not started" state
// regardless of the account's real status/batch date). Three time-of-day states, all IST:
//   < 9:00 AM            → hidden entirely
//   9:00 AM – 10:29 AM    → "upcoming": title only, no LIVE badge, "Session Starts at 11:00 AM"
//   10:30 AM – 11:59 PM   → "live": LIVE badge + JOIN SESSION NOW link
// Using the registered-not-started accounts (no batchStartDate) since forceDay=0 bypasses the
// date check anyway and these are the accounts reserved for pre-batch-onboarding preview.
const telugu = findAccount("14day", "Telugu", "", "registered-not-started");
const english = findAccount("14day", "English", "", "registered-not-started");
if (!telugu || !english) {
  throw new Error("Missing registered-not-started 14-day account(s) in e2e/fixtures/test-accounts.ts");
}

test.describe("Introductory Session card (onboarding screen, forceDay=0)", () => {
  test("before 9:00 AM (8:59 AM) — card hidden entirely", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=0&time=8.59am`);
    await expect(page.getByText("Introductory Session")).not.toBeVisible();
  });

  test("9:00 AM — upcoming state, no LIVE badge, no join button", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=0&time=9.00am`);
    await expect(page.getByText("Introductory Session")).toBeVisible();
    await expect(page.getByText("Session Starts at 11:00 AM")).toBeVisible();
    await expect(page.getByText("LIVE", { exact: true })).not.toBeVisible();
    await expect(page.getByText("JOIN SESSION NOW")).not.toBeVisible();
  });

  test("10:29 AM — still upcoming, one minute before the live window opens", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=0&time=10.29am`);
    await expect(page.getByText("Session Starts at 11:00 AM")).toBeVisible();
    await expect(page.getByText("LIVE", { exact: true })).not.toBeVisible();
  });

  test("10:30 AM — flips to live, LIVE badge and join button shown", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=0&time=10.30am`);
    await expect(page.getByText("Introductory Session")).toBeVisible();
    await expect(page.getByText("LIVE", { exact: true })).toBeVisible();
    await expect(page.getByText("JOIN SESSION NOW")).toBeVisible();
    await expect(page.getByText("Session Starts at 11:00 AM")).not.toBeVisible();
  });

  test("11:59 PM — still live, right up to end of day", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=0&time=11.59pm`);
    await expect(page.getByText("LIVE", { exact: true })).toBeVisible();
    await expect(page.getByText("JOIN SESSION NOW")).toBeVisible();
  });

  test("English account shows the same live state at 11:00 AM", async ({ page }) => {
    await page.goto(`/${english.mobile}?forceDay=0&time=11.00am`);
    await expect(page.getByText("Introductory Session")).toBeVisible();
    await expect(page.getByText("LIVE", { exact: true })).toBeVisible();
    await expect(page.getByText("JOIN SESSION NOW")).toBeVisible();
  });

  test("thumbnail is served from the bundled asset, not img.youtube.com", async ({ page }) => {
    await page.goto(`/${telugu.mobile}?forceDay=0&time=10.30am`);
    const thumbnail = page.locator('img[alt="Introductory Session"]');
    await expect(thumbnail).toBeVisible();
    const src = await thumbnail.getAttribute("src");
    expect(src).toBeTruthy();
    expect(src).not.toContain("youtube.com");
    expect(src).toContain("intro_tel");
  });
});
