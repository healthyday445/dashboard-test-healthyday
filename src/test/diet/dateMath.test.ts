import { describe, it, expect } from "vitest";
import { getEffectiveToday, getTabDates, formatDateDDMMYYYY, toIsoDateKey, isDateDisabled } from "@/data/diet/dateMath";

describe("diet dateMath", () => {
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

  it("disables tabs from 2026-09-25 onward, keeps 2026-09-24 and earlier enabled", () => {
    expect(isDateDisabled("2026-09-24")).toBe(false);
    expect(isDateDisabled("2026-09-25")).toBe(true);
    expect(isDateDisabled("2026-09-28")).toBe(true);
  });
});
