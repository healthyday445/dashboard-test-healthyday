import { describe, it, expect } from "vitest";
import { getPreviousIstIsoDateKey, getSnChallengeDay, isRegularSessionLiveDuringSn, toIstIsoDateKey } from "@/data/snChallenge";

describe("snChallenge", () => {
  it("resolves the day/link for a matching date + language from the hardcoded table", () => {
    expect(getSnChallengeDay([], "2026-08-13", "telugu")).toEqual({ dayNumber: 1, youtubeLink: "https://www.youtube.com/watch?v=3NMJ9zkgG70" });
    expect(getSnChallengeDay([], "2026-08-14", "telugu")).toEqual({ dayNumber: 2, youtubeLink: "https://www.youtube.com/watch?v=5xLa643YoVM" });
    expect(getSnChallengeDay([], "2026-08-15", "telugu")).toEqual({ dayNumber: 3, youtubeLink: "https://www.youtube.com/watch?v=Yd2fEu9QWNQ" });
    expect(getSnChallengeDay([], "2026-08-16", "telugu")).toEqual({ dayNumber: 4, youtubeLink: "https://www.youtube.com/watch?v=K9SlPKo7qb0" });
  });

  it("ignores the sessionLinks argument entirely (fallback no longer reads the API)", () => {
    const apiLinks = [{ session_date: "2026-08-13", language: "telugu", session_code: "108sn_day1", link: "https://youtube.com/should-be-ignored" }];
    expect(getSnChallengeDay(apiLinks, "2026-08-13", "telugu")).toEqual({ dayNumber: 1, youtubeLink: "https://www.youtube.com/watch?v=3NMJ9zkgG70" });
  });

  it("returns null when there's no hardcoded entry for that date", () => {
    expect(getSnChallengeDay([], "2026-08-17", "telugu")).toBeNull();
  });

  it("returns null when there's no hardcoded entry for that language on an otherwise-live date", () => {
    expect(getSnChallengeDay([], "2026-08-13", "english")).toBeNull();
  });

  it("computes the previous calendar day, including across a month boundary", () => {
    expect(getPreviousIstIsoDateKey("2026-08-07")).toBe("2026-08-06");
    expect(getPreviousIstIsoDateKey("2026-08-01")).toBe("2026-07-31");
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
