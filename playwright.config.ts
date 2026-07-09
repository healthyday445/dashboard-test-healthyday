import { defineConfig, devices } from "@playwright/test";

// Playwright ships no "Galaxy S8+" preset (only "Galaxy S8" and "Galaxy S9+", whose bundled
// viewport/DPR values don't match real S8+ hardware) — defined manually to mirror the device
// actually used for manual mobile testing: 412x846 CSS px, DPR 3.5, Android Chrome.
const galaxyS8Plus = {
  userAgent:
    "Mozilla/5.0 (Linux; Android 9; SM-G955U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
  viewport: { width: 412, height: 846 },
  deviceScaleFactor: 3.5,
  isMobile: true,
  hasTouch: true,
  defaultBrowserType: "chromium" as const,
};

// All generated reports/artifacts live under one gitignored directory (matches the repo's
// existing *.local convention — see .gitignore) instead of scattering playwright-report/ and
// test-results/ at the repo root. local/prod/testprod runs write to separate subfolders so one
// target's run never overwrites another's report.
const REMOTE_URLS = {
  prod: "https://class.healthyday.co.in",
  testprod: "https://test-portal-healthyday.netlify.app",
};
const target = process.env.E2E_TARGET as keyof typeof REMOTE_URLS | undefined;
const isRemote = target !== undefined;
const RESULTS_DIR = `./e2e-results.local/${target ?? "local"}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // Remote deployments (prod/testprod) — allow a retry there to absorb network blips that
  // wouldn't count as an app bug. Local dev server has no such excuse.
  retries: process.env.CI || isRemote ? 2 : 0,
  outputDir: `${RESULTS_DIR}/test-results`,
  reporter: process.env.CI
    ? [["github"], ["html", { outputFolder: `${RESULTS_DIR}/html-report`, open: "never" }]]
    : [["html", { outputFolder: `${RESULTS_DIR}/html-report`, open: "never" }]],
  use: {
    baseURL: target ? REMOTE_URLS[target] : "http://localhost:8080",
    trace: "on-first-retry",
    screenshot: { mode: "on", fullPage: true },
  },
  // Only boot the local dev server when actually testing against it — prod/testprod are already live.
  webServer: isRemote
    ? undefined
    : {
        command: "npm run dev",
        url: "http://localhost:8080",
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: "mobile", use: { ...galaxyS8Plus } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
});
