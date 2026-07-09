import { test as base, expect } from "@playwright/test";

// Wraps page.goto so every navigation is recorded as a clickable annotation in the HTML report
// (Playwright auto-linkifies http(s) URLs inside annotation descriptions) — lets you open the
// exact state a test checked directly from the report, as long as `npm run dev` is still running.
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const originalGoto = page.goto.bind(page);
    page.goto = (async (url, options) => {
      const response = await originalGoto(url, options);
      testInfo.annotations.push({ type: "url", description: page.url() });
      return response;
    }) as typeof page.goto;
    await use(page);
  },
});

export { expect };
