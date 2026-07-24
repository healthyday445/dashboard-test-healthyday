import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

const englishAccount = findAccount("paid", "English");
const teluguAccount = findAccount("paid", "Telugu");
if (!englishAccount) {
  throw new Error("No paid English account found in e2e/fixtures/test-accounts.ts");
}
if (!teluguAccount) {
  throw new Error("No paid Telugu account found in e2e/fixtures/test-accounts.ts");
}

test.describe("Recordings page — View all videos button", () => {
  test("is visible at the bottom of the Youtube Videos section", async ({ page }) => {
    await page.goto(`/${teluguAccount.mobile}/recordings`);
    await expect(page.getByRole("heading", { name: "Youtube Videos" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View all videos" })).toBeVisible();
  });

  test("links to the Telugu Healthyday YouTube channel for a Telugu account", async ({ page }) => {
    await page.goto(`/${teluguAccount.mobile}/recordings`);
    const button = page.getByRole("link", { name: "View all videos" });
    await expect(button).toHaveAttribute("href", "https://www.youtube.com/@healthydayyoga");
    await expect(button).toHaveAttribute("target", "_blank");
  });

  test("links to the English Healthyday YouTube channel for an English account", async ({ page }) => {
    await page.goto(`/${englishAccount.mobile}/recordings`);
    const button = page.getByRole("link", { name: "View all videos" });
    await expect(button).toHaveAttribute("href", "https://www.youtube.com/@HealthydayEnglish");
    await expect(button).toHaveAttribute("target", "_blank");
  });
});
