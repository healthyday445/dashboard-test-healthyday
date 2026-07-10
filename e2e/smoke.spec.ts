import { test, expect } from "./fixtures/test";

test.describe("Smoke", () => {
  test("dev server serves the app shell", async ({ page }) => {
    await page.goto("/9999999999?forceDay=1&time=4.30am");
    await expect(page.locator("body")).not.toBeEmpty();
  });
});
