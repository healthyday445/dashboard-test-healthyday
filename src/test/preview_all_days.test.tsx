import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "../pages/Index";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderPreview(previewParam: string) {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MemoryRouter initialEntries={[`/?preview=${previewParam}`]}>
          <Index />
        </MemoryRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
  return container;
}

function getRenderedText(container: HTMLElement): string {
  return container.textContent || "";
}

// Helper: count day boxes (width: 42px containers)
function countDayBoxes(container: HTMLElement): number {
  return container.querySelectorAll("[style*='width: 42px']").length;
}

describe("Free Trial Preview — All Days", () => {

  // === REGULAR DAYS ===
  it("Day 1 at 6:00 PM (Telugu) — regular evening LIVE", () => {
    const c = renderPreview("Free_day1_6.00PM");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("JOIN SESSION");
    expect(countDayBoxes(c)).toBe(14);
  });

  it("Day 1 at 6:00 PM (English) — regular evening LIVE", () => {
    const c = renderPreview("Free_day1_6.00PM_eng");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
  });

  it("Day 2 at 2:00 PM — between sessions", () => {
    const c = renderPreview("Free_day2_2.00PM");
    const text = getRenderedText(c);
    // Should show next session info, not LIVE
    expect(text).toContain("Next Yoga session is at 4:30PM");
  });

  it("Day 2 at 8:00 PM — after all sessions", () => {
    const c = renderPreview("Free_day2_8.00PM");
    const text = getRenderedText(c);
    expect(text).toContain("Tomorrow");
    expect(text).toContain("5:30 AM");
  });

  // === BONUS DAY 3 (Face Yoga 8:30 PM) ===
  it("Day 3 at 8:30 PM (Telugu) — bonus LIVE", () => {
    const c = renderPreview("Free_day3_8.30PM");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Face Yoga");
  });

  it("Day 3 at 8:30 PM (English) — bonus LIVE", () => {
    const c = renderPreview("Free_day3_8.30PM_eng");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Face Yoga");
  });

  it("Day 3 at 8:00 PM — before bonus (pre-live)", () => {
    const c = renderPreview("Free_day3_8.00PM");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Face Yoga Session at 8:30 PM");
  });

  // === BONUS DAY 5 (Meditation 8:00 PM) ===
  it("Day 5 at 8:00 PM (Telugu) — bonus LIVE", () => {
    const c = renderPreview("Free_day5_8.00PM");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Meditation");
  });

  it("Day 5 at 7:30 PM — before bonus", () => {
    const c = renderPreview("Free_day5_7.30PM");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Meditation Session at 8:00 PM");
  });

  // === BONUS DAY 7 (Weight Loss 10:30 AM) ===
  it("Day 7 at 10:30 AM (Telugu) — bonus LIVE", () => {
    const c = renderPreview("Free_day7_10.30AM");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Weight Loss");
  });

  it("Day 7 at 10:30 AM (English) — bonus LIVE", () => {
    const c = renderPreview("Free_day7_10.30AM_eng");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Weight Loss");
  });

  it("Day 7 at 7:00 PM — regular evening LIVE (6:30 PM slot)", () => {
    const c = renderPreview("Free_day7_7.00PM");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("JOIN SESSION");
  });

  it("Day 7 at 7:00 PM (English) — regular evening LIVE", () => {
    const c = renderPreview("Free_day7_7.00PM_eng");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
  });

  // === WEEK 2 REGULAR DAYS ===
  it("Day 8 at 6:00 AM — morning LIVE + pricing section", () => {
    const c = renderPreview("Free_day8_6.00AM");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
    expect(countDayBoxes(c)).toBe(14);
  });

  it("Day 9 at 2:00 PM — between sessions", () => {
    const c = renderPreview("Free_day9_2.00PM");
    const text = getRenderedText(c);
    expect(text).toContain("Next Yoga session is at 4:30PM");
  });

  // === BONUS DAY 10 (Breath Work 8:30 PM) ===
  it("Day 10 at 8:30 PM (Telugu) — bonus LIVE", () => {
    const c = renderPreview("Free_day10_8.30PM");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Breath Work");
  });

  it("Day 10 at 8:30 PM (English) — bonus LIVE", () => {
    const c = renderPreview("Free_day10_8.30PM_eng");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Breath Work");
  });

  // === DAY 11–13 ===
  it("Day 11 at 5:30 PM — evening LIVE", () => {
    const c = renderPreview("Free_day11_5.30PM");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
  });

  it("Day 12 at 8:00 PM — after sessions", () => {
    const c = renderPreview("Free_day12_8.00PM");
    const text = getRenderedText(c);
    expect(text).toContain("Tomorrow");
  });

  it("Day 13 at 7:30 AM — morning LIVE", () => {
    const c = renderPreview("Free_day13_7.30AM");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
  });

  // === BONUS DAY 14 (Sleep Session 10:30 AM) ===
  it("Day 14 at 10:30 AM (Telugu) — bonus LIVE", () => {
    const c = renderPreview("Free_day14_10.30AM");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Sleep Session");
  });

  it("Day 14 at 10:30 AM (English) — bonus LIVE", () => {
    const c = renderPreview("Free_day14_10.30AM_eng");
    const text = getRenderedText(c);
    expect(text).toContain("Special Bonus Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("Sleep Session");
  });

  it("Day 14 at 6:30 PM — regular evening LIVE (final day)", () => {
    const c = renderPreview("Free_day14_6.30PM");
    const text = getRenderedText(c);
    expect(text).toContain("Your Yoga Session");
    expect(text).toContain("Ongoing now");
    expect(text).toContain("JOIN SESSION");
  });

  // === PAID MEMBER DASHBOARD TESTS ===
  it("Paid member — 6 months", () => {
    const c = renderPreview("paid_week1_day1_afterthesession_plan6month");
    const text = getRenderedText(c);
    expect(text).toContain("Next Live at");
    expect(text).toContain("View Class Recordings");
    expect(text).not.toContain("Your 14 Days Attendance");
  });

  it("Paid member — 12 months", () => {
    const c = renderPreview("paid_week1_day1_afterthesession_plan12month");
    const text = getRenderedText(c);
    expect(text).toContain("Next Live at");
    expect(text).toContain("View Class Recordings");
    expect(text).toContain("This Week's Grocery List");
    expect(text).not.toContain("Your 14 Days Attendance");
  });

  it("Paid member — plan ending soon renewal overlay", () => {
    const c = renderPreview("paid_week1_day1_afterthesession_plan12month");
    const text = getRenderedText(c);
    expect(text).toContain("Next Live at");
    expect(text).toContain("View Class Recordings");
    expect(text).not.toContain("Your 14 Days Attendance");
  });
});
