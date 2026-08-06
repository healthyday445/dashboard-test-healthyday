import { describe, it, expect } from "vitest";
import { getSnChallengeDay, isRegularSessionLiveDuringSn, isSnChallengeEligible, toIstIsoDateKey } from "@/data/snChallenge";

describe("snChallenge", () => {
  it("resolves each campaign day to its dayNumber/snCount", () => {
    expect(getSnChallengeDay("2026-08-06")).toEqual(expect.objectContaining({ dayNumber: 1, snCount: 24 }));
    expect(getSnChallengeDay("2026-08-07")).toEqual(expect.objectContaining({ dayNumber: 2, snCount: 48 }));
    expect(getSnChallengeDay("2026-08-08")).toEqual(expect.objectContaining({ dayNumber: 3, snCount: 72 }));
    expect(getSnChallengeDay("2026-08-09")).toEqual(expect.objectContaining({ dayNumber: 4, snCount: 108 }));
  });

  it("returns null just before the campaign window", () => {
    expect(getSnChallengeDay("2026-08-05")).toBeNull();
  });

  it("returns null just after the campaign window (auto-revert)", () => {
    expect(getSnChallengeDay("2026-08-10")).toBeNull();
  });

  it("is eligible for English 6-month and 12-month accounts, including upgrade variants", () => {
    expect(isSnChallengeEligible({ language: "English" }, true, false)).toBe(true);
    expect(isSnChallengeEligible({ language: "English" }, false, true)).toBe(true);
  });

  it("is not eligible for Telugu or 3-month-only accounts", () => {
    expect(isSnChallengeEligible({ language: "Telugu" }, true, false)).toBe(false);
    expect(isSnChallengeEligible({ language: "English" }, false, false)).toBe(false);
  });

  it("converts an IST-shifted Date to its calendar-date key via UTC getters", () => {
    const istShifted = new Date(Date.UTC(2026, 7, 6, 0, 15)); // simulates nowIST just after midnight IST
    expect(toIstIsoDateKey(istShifted)).toBe("2026-08-06");
  });

  it("widens the regular-session live window to 4:30 AM / 3:30 PM during the campaign", () => {
    expect(isRegularSessionLiveDuringSn(4 * 60 + 29)).toBe(false); // 4:29 AM
    expect(isRegularSessionLiveDuringSn(4 * 60 + 30)).toBe(true); // 4:30 AM
    expect(isRegularSessionLiveDuringSn(9 * 60 + 29)).toBe(true); // 9:29 AM
    expect(isRegularSessionLiveDuringSn(9 * 60 + 30)).toBe(false); // 9:30 AM (end unchanged)
    expect(isRegularSessionLiveDuringSn(15 * 60 + 29)).toBe(false); // 3:29 PM
    expect(isRegularSessionLiveDuringSn(15 * 60 + 30)).toBe(true); // 3:30 PM
    expect(isRegularSessionLiveDuringSn(19 * 60 + 30)).toBe(false); // 7:30 PM (end unchanged)
  });
});
