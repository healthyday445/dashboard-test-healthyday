import { test, expect } from "./fixtures/test";
import { findAccount } from "./fixtures/test-accounts";

// Weekly attendance self-correction feature — PAID STUDENTS ONLY.
//   - Home dashboard: src/components/WeeklyAttendanceCard.tsx (rendered from src/pages/IndexPaid.tsx)
//     shows an "Update Attendance" button under the weekly tracker, linking to /:mobile/attendance.
//   - src/App.tsx routes /:mobile/attendance to src/pages/AttendancePageWeekly.tsx — NOT the older
//     src/pages/AttendancePage.tsx, which is a separate, unrelated monthly calendar still served at
//     /attendance-page.
//   - AttendancePageWeekly.tsx redirects away if the fetched student isn't paid, and the backend
//     PATCH endpoint (proxied via netlify/functions/update-attendance.js) 403s server-side too — so
//     this whole flow is only ever reachable/testable against a paid account.
//
// `?preview=paid` seeds deterministic mock data (paid_attendance_tracker: ["mon", "wed"]) and skips
// the network fetch entirely — used here for the checkbox/dirty-state tests, since a real account's
// actual attendance for "this week" isn't something we can pin down or control day-to-day. The real
// paid accounts from test-accounts.ts are used instead for the home-dashboard nav link and the
// redirect-away-from-non-attendance-page smoke check, where the real fetch path matters.
//
// The update PATCH is a real, state-mutating backend call (netlify/functions/update-attendance.js
// proxies to the live backend with a server-side API key) — every test that clicks "Update
// Attendance" on this page intercepts that route so no test run ever actually mutates a real
// student's attendance record, regardless of which account/mode is in view.

const STUB_MOBILE = "919999999900";

const paidAccount = findAccount("paid", "English");
if (!paidAccount) {
  throw new Error("No paid English account found in e2e/fixtures/test-accounts.ts");
}

// Mirrors the page's own Mon=0…Sun=6 "day of week" index math (AttendancePageWeekly.tsx todayIdx).
function todayIdx(): number {
  const dow = new Date().getDay();
  return dow === 0 ? 6 : dow - 1;
}

const WEEK_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

test.describe("Home dashboard — Update Attendance button (paid account)", () => {
  test(`shows "Update Attendance" under the weekly tracker and navigates to /:mobile/attendance`, async ({ page }) => {
    await page.goto(`/${paidAccount.mobile}`);

    await expect(page.getByText("Your Weekly Attendance")).toBeVisible();
    const updateButton = page.getByRole("button", { name: "Update Attendance" });
    await expect(updateButton).toBeVisible();

    await updateButton.click();
    await expect(page).toHaveURL(new RegExp(`/${paidAccount.mobile}/attendance`));
  });
});

test.describe("Attendance page — redirect for non-paid path (real account, no preview)", () => {
  test("real paid account's attendance page loads the weekly tracker (not the old monthly calendar)", async ({ page }) => {
    await page.goto(`/${paidAccount.mobile}/attendance`);

    // The weekly tracker's Update button ("Update Attendance") is unique to AttendancePageWeekly —
    // the old AttendancePage.tsx (monthly calendar, still at /attendance-page) has no such button,
    // just a "Your Consistency Tracker" heading and a legend, so this also confirms routing didn't
    // regress back to the old page.
    await expect(page.getByRole("button", { name: /Update Attendance|Updating/ })).toBeVisible();
    await expect(page.getByText("Your Consistency Tracker")).toHaveCount(0);
  });
});

test.describe("Attendance page — checkbox tracker (?preview=paid)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${STUB_MOBILE}/attendance?preview=paid`);
    await expect(page.getByRole("checkbox", { name: "Mon attendance" })).toBeVisible();
  });

  test("renders all 7 day checkboxes and a disabled Update button by default", async ({ page }) => {
    for (const label of WEEK_DAY_LABELS) {
      await expect(page.getByRole("checkbox", { name: `${label} attendance` })).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Update Attendance" })).toBeDisabled();
  });

  test("Monday (seeded attended) starts checked", async ({ page }) => {
    const monday = page.getByRole("checkbox", { name: "Mon attendance" });
    await expect(monday).toHaveAttribute("aria-checked", "true");
    await expect(monday).toHaveCSS("background-color", "rgb(13, 148, 0)"); // #0D9400
  });

  test("days after today this week are disabled and greyed out", async ({ page }) => {
    const idx = todayIdx();
    test.skip(idx >= 6, "Today is Sunday — no future day left in this week to check");

    const futureLabel = WEEK_DAY_LABELS[idx + 1];
    const futureBox = page.getByRole("checkbox", { name: `${futureLabel} attendance` });
    await expect(futureBox).toBeDisabled();
    await expect(futureBox).toHaveCSS("background-color", "rgb(239, 239, 239)"); // #EFEFEF
  });

  test("toggling an editable day flips its look and enables Update; toggling back disables it again", async ({ page }) => {
    const monday = page.getByRole("checkbox", { name: "Mon attendance" });
    const updateButton = page.getByRole("button", { name: "Update Attendance" });

    // Seeded attended (green, checkmark) -> uncheck -> white with orange border, no checkmark.
    await expect(monday).toHaveAttribute("aria-checked", "true");
    await monday.click();
    await expect(monday).toHaveAttribute("aria-checked", "false");
    await expect(monday).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(updateButton).toBeEnabled();

    // Toggling back to the original seeded state must re-disable Update (isDirty compares
    // against the original fetched array, not just "was anything clicked").
    await monday.click();
    await expect(monday).toHaveAttribute("aria-checked", "true");
    await expect(updateButton).toBeDisabled();
  });
});

test.describe("Attendance page — update submission (network mocked)", () => {
  test("success: shows Updating…, keeps the toggled day's own look during the request (no future-grey flash), then resyncs and disables Update", async ({ page }) => {
    await page.route("**/.netlify/functions/update-attendance", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "success", paid_attendance_tracker: ["wed"] }),
      });
    });

    await page.goto(`/${STUB_MOBILE}/attendance?preview=paid`);
    const monday = page.getByRole("checkbox", { name: "Mon attendance" });
    const updateButton = page.getByRole("button", { name: "Update Attendance" });

    await expect(monday).toHaveAttribute("aria-checked", "true");
    await monday.click(); // uncheck Monday — dirty
    await expect(monday).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(updateButton).toBeEnabled();

    await updateButton.click();

    // Regression check: while the PATCH is in flight, Monday must keep its just-toggled
    // white/unchecked look, not flash into the disabled/future grey (#EFEFEF) style.
    await expect(page.getByRole("button", { name: "Updating…" }).or(page.getByRole("button", { name: "Updating..." }))).toBeVisible();
    await expect(monday).toBeDisabled(); // non-interactive while submitting
    await expect(monday).toHaveCSS("background-color", "rgb(255, 255, 255)"); // still white, NOT rgb(239,239,239)

    await expect(page.getByText("Attendance updated successfully!")).toBeVisible();
    await expect(page.getByRole("button", { name: "Update Attendance" })).toBeDisabled();
    // Server response's paid_attendance_tracker (["wed"]) no longer includes "mon" — matches
    // the toggled-off state, so isDirty is false again against the new original.
    await expect(monday).toHaveAttribute("aria-checked", "false");
  });

  test("failure: shows the backend's error via toast and keeps Update enabled for retry", async ({ page }) => {
    await page.route("**/.netlify/functions/update-attendance", async (route) => {
      await route.fulfill({
        status: 409,
        contentType: "application/json",
        body: JSON.stringify({ detail: "week_start does not match the current attendance week; refresh and try again" }),
      });
    });

    await page.goto(`/${STUB_MOBILE}/attendance?preview=paid`);
    const monday = page.getByRole("checkbox", { name: "Mon attendance" });
    const updateButton = page.getByRole("button", { name: "Update Attendance" });

    await monday.click();
    await updateButton.click();

    await expect(page.getByText("week_start does not match the current attendance week; refresh and try again")).toBeVisible();
    await expect(updateButton).toBeEnabled();
    await expect(monday).toHaveAttribute("aria-checked", "false");
  });
});
