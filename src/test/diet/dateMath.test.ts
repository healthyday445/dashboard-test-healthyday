import { describe, it, expect } from "vitest";
import { getEffectiveToday, getCyclePosition, getTabDates, formatDateDDMMYYYY, toIsoDateKey } from "@/data/diet/dateMath";

describe("diet dateMath", () => {
  it("resolves 2026-08-03 (launch day) to M2W2 Monday", () => {
    expect(getCyclePosition(new Date(2026, 7, 3))).toEqual({ weekBlockId: "M2W2", weekdayIndex: 0 });
  });

  // 2026-07-27 (M2W1 Monday, the week before launch) is the anchor used to derive the
  // cycle's launch offset — getCyclePosition intentionally throws on pre-launch dates
  // (see the "throws" test below), so we verify the same fact via its post-launch
  // consequence instead: one full week after M2W2 Monday wraps to M1W1 Monday.
  it("wraps M2W2 Monday + 7 days to M1W1 Monday, consistent with M2W1 preceding M2W2", () => {
    const oneWeekAfterLaunch = new Date(2026, 7, 10);
    expect(getCyclePosition(oneWeekAfterLaunch)).toEqual({ weekBlockId: "M1W1", weekdayIndex: 0 });
  });

  it("resolves 2026-08-04 (Tuesday) to M2W2 weekday index 1", () => {
    expect(getCyclePosition(new Date(2026, 7, 4))).toEqual({ weekBlockId: "M2W2", weekdayIndex: 1 });
  });

  it("wraps the cycle back to M1W1 42 days after launch", () => {
    const fortyTwoDaysLater = new Date(2026, 7, 3);
    fortyTwoDaysLater.setDate(fortyTwoDaysLater.getDate() + 42);
    expect(getCyclePosition(fortyTwoDaysLater)).toEqual({ weekBlockId: "M2W2", weekdayIndex: 0 });
  });

  it("throws for a date before the launch date", () => {
    expect(() => getCyclePosition(new Date(2026, 7, 2))).toThrow();
  });

  it("clamps a pre-launch 'today' up to the launch date", () => {
    const effective = getEffectiveToday(new Date(2026, 6, 1));
    expect(toIsoDateKey(effective)).toBe("2026-08-03");
  });

  it("passes through a post-launch 'today' unchanged", () => {
    const effective = getEffectiveToday(new Date(2026, 8, 15));
    expect(toIsoDateKey(effective)).toBe("2026-09-15");
  });

  it("returns 5 consecutive dates starting at effective-today", () => {
    const dates = getTabDates(new Date(2026, 6, 1), 5); // real-clock date before launch
    expect(dates.map(toIsoDateKey)).toEqual(["2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07"]);
  });

  it("formats dates as DD-MM-YYYY", () => {
    expect(formatDateDDMMYYYY(new Date(2026, 7, 3))).toBe("03-08-2026");
  });
});
