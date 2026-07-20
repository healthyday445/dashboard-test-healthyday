import { test, expect, type Page } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// FAQs page: src/pages/Faqs.tsx, route /:mobile/faqs.
//
// The page is driven entirely by the /.netlify/functions/student response — `status` decides which
// FAQ bucket renders, and `free_batch_start_date` decides week 1 vs week 2 for ongoing students.
//
// Registered and paid states have real backend test accounts, so those tests use them directly.
// The ongoing-week-1/week-2 split and the "14DaysCompleted" state can't be pinned deterministically
// with a real account (week depends on today's date vs batch start, and there's no stable completed
// account), so those tests stub the student endpoint.

const registeredTelugu = findAccount("14day", "Telugu", undefined, "registered-not-started");
const registeredEnglish = findAccount("14day", "English", undefined, "registered-not-started");
const paidEnglish = findAccount("paid", "English");

if (!registeredTelugu || !registeredEnglish || !paidEnglish) {
  throw new Error("Missing a required FAQs test account in e2e/fixtures/test-accounts.ts");
}

const STUB_MOBILE = "919999999999";

type StudentStub = {
  name?: string;
  status?: string;
  language?: "Telugu" | "English";
  free_batch_start_date?: string;
};

/** ISO date for a batch that started `daysAgo` days ago (day-of-batch = daysAgo + 1). */
function batchStartedDaysAgo(daysAgo: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

/** Intercept the student fetch (and the language-update POST) so the page renders deterministically. */
async function stubStudent(page: Page, data: StudentStub) {
  await page.route("**/.netlify/functions/student**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  });
  await page.route("**/.netlify/functions/update-language**", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
}

/** Text of every accordion trigger currently in the DOM, in document order. */
async function accordionQuestions(page: Page): Promise<string[]> {
  const texts = await page.locator("[data-radix-collection-item]").allInnerTexts();
  return texts.map((t) => t.trim()).filter(Boolean);
}

test.describe("FAQs page", () => {
  test.describe("Registered (real accounts)", () => {
    test(`Telugu registered student sees the Registered FAQs (${registeredTelugu.mobile})`, async ({ page }) => {
      await page.goto(`/${registeredTelugu.mobile}/faqs`);

      await expect(page.getByText("Classes ఎప్పుడు start అవుతాయి?")).toBeVisible();
      await expect(page.getByText("Fees ఏమైనా కట్టాలా?")).toBeVisible();
      // Week-2-only question must not leak into the Registered bucket.
      await expect(page.getByText("Yoga Kit ఎలా గెలవాలి?")).toHaveCount(0);
    });

    test(`English registered FAQs render in the source-sheet order (${registeredEnglish.mobile})`, async ({ page }) => {
      await page.goto(`/${registeredEnglish.mobile}/faqs`);

      const expectedOrder = [
        "When will classes start?",
        "What are the timings?",
        "How to join? When will I get the class link",
        "Can I join during periods?",
        "Do we need to pay any fee?",
        "How to win a Yoga Kit?",
        "How to join the Introduction Session?",
        "I have health issues, will they be cured with yoga?",
      ];

      await expect(page.getByText(expectedOrder[0])).toBeVisible();
      expect(await accordionQuestions(page)).toEqual(expectedOrder);
    });

    test(`the 'change language' FAQ reveals the language-switch action (${registeredTelugu.mobile})`, async ({ page }) => {
      await page.goto(`/${registeredTelugu.mobile}/faqs`);
      // Stub the POST so a real language flip isn't triggered against the shared account.
      await page.route("**/.netlify/functions/update-language**", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: "{}" })
      );

      await page.getByText("Change my language to English").click();

      await expect(
        page.getByText("Do you want to change your class language to English? Just click the button below")
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "Change to English" })).toBeVisible();
    });
  });

  test.describe("Ongoing / completed (stubbed student endpoint)", () => {
    test("14DaysOngoing student in first 7 days sees Ongoing Week 1 FAQs", async ({ page }) => {
      await stubStudent(page, {
        name: "Asha",
        status: "14DaysOngoing",
        language: "Telugu",
        free_batch_start_date: batchStartedDaysAgo(2), // day 3 -> week 1
      });
      await page.goto(`/${STUB_MOBILE}/faqs`);

      await expect(page.getByText("Class link open కావటం లేదు")).toBeVisible();
      await expect(page.getByText("Yoga చేశాను కానీ Body Pains వస్తున్నాయి")).toBeVisible();
      // Referral/payment questions belong to Week 2, not Week 1.
      await expect(page.getByText("Yoga Kit ఎలా గెలవాలి?")).toHaveCount(0);
      await expect(page.getByText("Classes ఎప్పుడు start అవుతాయి?")).toHaveCount(0);
    });

    test("14DaysOngoing student past day 7 sees Ongoing Week 2 FAQs", async ({ page }) => {
      await stubStudent(page, {
        name: "Asha",
        status: "14DaysOngoing",
        language: "Telugu",
        free_batch_start_date: batchStartedDaysAgo(9), // day 10 -> week 2
      });
      await page.goto(`/${STUB_MOBILE}/faqs`);

      await expect(page.getByText("Yoga Kit ఎలా గెలవాలి?")).toBeVisible();
      await expect(page.getByText("నా Referral Count తప్పు చూపిస్తోంది")).toBeVisible();
      await expect(page.getByText("Classes ఎప్పుడు start అవుతాయి?")).toHaveCount(0);
    });

    test("14DaysCompleted student uses the Ongoing Week 2 FAQs regardless of batch date", async ({ page }) => {
      await stubStudent(page, {
        name: "Asha",
        status: "14DaysCompleted",
        language: "Telugu",
        // If this were treated as "ongoing" the date would resolve to week 1 — proves the completed
        // status maps straight to week 2 rather than going through week detection.
        free_batch_start_date: batchStartedDaysAgo(1),
      });
      await page.goto(`/${STUB_MOBILE}/faqs`);

      await expect(page.getByText("Yoga Kit ఎలా గెలవాలి?")).toBeVisible();
      await expect(page.getByText("నా Referral Count తప్పు చూపిస్తోంది")).toBeVisible();
    });
  });

  test.describe("Paid", () => {
    test(`paid student sees no FAQ accordions (${paidEnglish.mobile})`, async ({ page }) => {
      await page.goto(`/${paidEnglish.mobile}/faqs`);

      // Greeting still renders so we know the page loaded (and didn't redirect to /leaderboard).
      await expect(page.getByRole("heading", { name: /^Hi / })).toBeVisible();
      // No FAQ questions from any bucket, and no contact button.
      await expect(page.getByText("When will classes start?")).toHaveCount(0);
      await expect(page.getByText("Class Link is not opening")).toHaveCount(0);
      await expect(page.getByRole("button", { name: /Contact Us/i })).toHaveCount(0);
    });
  });
});
