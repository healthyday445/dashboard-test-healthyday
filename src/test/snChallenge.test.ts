import { describe, it, expect } from "vitest";
import { getSnChallengeDay, isRegularSessionLiveDuringSn, toIstIsoDateKey } from "@/data/snChallenge";

const sessionLinks = [
  { session_date: "2026-08-06", language: "english", session_code: "108sn_day1", link: "https://youtube.com/day1-en" },
  { session_date: "2026-08-06", language: "telugu", session_code: "108sn_day1", link: "https://youtube.com/day1-te" },
  { session_date: "2026-08-07", language: "english", session_code: "108sn_day2", link: "https://youtube.com/day2-en" },
  { session_date: "2026-08-07", language: "telugu", session_code: "108sn_day2", link: "https://youtube.com/day2-te" },
];

describe("snChallenge", () => {
  it("resolves the day/link for a matching date + language from /session-links", () => {
    expect(getSnChallengeDay(sessionLinks, "2026-08-06", "english")).toEqual({ dayNumber: 1, youtubeLink: "https://youtube.com/day1-en" });
    expect(getSnChallengeDay(sessionLinks, "2026-08-07", "telugu")).toEqual({ dayNumber: 2, youtubeLink: "https://youtube.com/day2-te" });
  });

  it("returns null when the API has no entry for that date", () => {
    expect(getSnChallengeDay(sessionLinks, "2026-08-08", "english")).toBeNull();
  });

  it("returns null when the API has no entry for that language on an otherwise-live date", () => {
    expect(getSnChallengeDay([{ session_date: "2026-08-06", language: "telugu", session_code: "108sn_day1", link: "x" }], "2026-08-06", "english")).toBeNull();
  });

  it("ignores non-SN session codes", () => {
    const links = [{ session_date: "2026-08-06", language: "english", session_code: "daily_morning", link: "x" }];
    expect(getSnChallengeDay(links, "2026-08-06", "english")).toBeNull();
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
