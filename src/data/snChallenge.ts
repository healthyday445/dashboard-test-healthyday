export interface SnChallengeDay {
  dayNumber: number;
  snCount: number;
  youtubeLink: string;
}

/** English-only, 6/12-month-only "108 Surya Namaskar Challenge" — 2026-08-06 through 2026-08-09.
 *  Purely date-gated: once real "today" moves past 2026-08-09, getSnChallengeDay returns null for
 *  every date and the dashboard reverts to its normal look with no further code changes needed.
 *  TODO: swap the remaining placeholder youtubeLink values for the real per-day links before launch. */
export const SN_CHALLENGE_DAYS: Record<string, SnChallengeDay> = {
  "2026-08-06": { dayNumber: 1, snCount: 24, youtubeLink: "https://www.youtube.com/live/-pcE8cxjmPY" },
  "2026-08-07": { dayNumber: 2, snCount: 48, youtubeLink: "https://youtube.com/live/N6XDoq_WsNo?feature=share" },
  "2026-08-08": { dayNumber: 3, snCount: 72, youtubeLink: "https://www.youtube.com/c/Healthyday" /* TODO_SN_DAY3_LINK */ },
  "2026-08-09": { dayNumber: 4, snCount: 108, youtubeLink: "https://www.youtube.com/c/Healthyday" /* TODO_SN_DAY4_LINK */ },
};

/** Prefers the real link from `/session-links` (session_code `108sn_day{N}`, language
 *  "english" — confirmed live in the API as of 2026-08-06, e.g. Day 1's real link differs from
 *  the placeholder above) over `day.youtubeLink`, mirroring the `getApiLink` fallback pattern
 *  already used for Face Yoga/Diet/B2H in paidBonusSessions.ts. */
export function getSnChallengeYoutubeLink(day: SnChallengeDay, sessionLinks: any[]): string {
  const match = sessionLinks.find((s: any) => s.session_code === `108sn_day${day.dayNumber}` && s.language === "english");
  return match?.link || day.youtubeLink;
}

/** Returns today's SN Challenge config, or null if `isoDateKey` (a "YYYY-MM-DD" IST calendar
 *  date, e.g. from `toIstIsoDateKey` or a `?previewSnDate=` override) falls outside the campaign
 *  window. Takes the key directly rather than a Date so callers control timezone handling
 *  themselves — IndexPaid.tsx already computes IST "now" via UTC-getter arithmetic (not the
 *  browser's local timezone), and this must stay consistent with that. */
export function getSnChallengeDay(isoDateKey: string): SnChallengeDay | null {
  return SN_CHALLENGE_DAYS[isoDateKey] ?? null;
}

/** "YYYY-MM-DD" for the given already-IST-shifted Date, read via UTC getters — mirrors the
 *  `nowIST = new Date(Date.now() + 5.5h)` + `getUTCDay()`/`getUTCHours()` idiom IndexPaid.tsx
 *  already uses, so this is correct regardless of the browser's local timezone. */
export function toIstIsoDateKey(nowIST: Date): string {
  const yyyy = nowIST.getUTCFullYear();
  const mm = String(nowIST.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(nowIST.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** English-language paid students, any plan type (3/6/12 months, incl. `_upgrade` variants) —
 *  widened from an earlier 6/12-month-only restriction per explicit product correction; every
 *  paid English student sees the same SN Challenge dashboard now. */
export function isSnChallengeEligible(studentData: any): boolean {
  return studentData?.language === "English";
}

/** 4:30 AM - 9:29 AM IST — the SN session's real live/redirect window. Exported (rather than
 *  living only inside SnChallengeCard) so IndexPaid.tsx can compute the same boolean once and
 *  use it to decide section order, instead of re-deriving it a second time and risking drift. */
export const SN_LIVE_START_MIN = 4 * 60 + 30;
export const SN_LIVE_END_MIN = 9 * 60 + 30; // exclusive bound — "< 570" already covers up to 9:29:59 AM

export function isSnLive(totalMin: number): boolean {
  return totalMin >= SN_LIVE_START_MIN && totalMin < SN_LIVE_END_MIN;
}

/** During the SN Challenge campaign only, the "Regular Session" block's live windows start 15
 *  minutes earlier than the year-round isRegularSessionLive (4:30 AM / 3:30 PM instead of 4:45
 *  AM / 3:45 PM — explicit product correction, "morning session should also start at 4:30 am"
 *  / "evening session should start from 3:30 pm"), so it lines up with the SN card's own start
 *  time and the campaign's earlier-starting broadcast. End times are unchanged (9:30 AM / 7:30
 *  PM). Only ever used when snDay is truthy — non-campaign days keep the real isRegularSessionLive. */
const SN_REGULAR_MORNING_START_MIN = 4 * 60 + 30; // 4:30 AM
const SN_REGULAR_MORNING_END_MIN = 9 * 60 + 30; // 9:30 AM
const SN_REGULAR_EVENING_START_MIN = 15 * 60 + 30; // 3:30 PM
const SN_REGULAR_EVENING_END_MIN = 19 * 60 + 30; // 7:30 PM

export function isRegularSessionLiveDuringSn(totalMin: number): boolean {
  return (
    (totalMin >= SN_REGULAR_MORNING_START_MIN && totalMin < SN_REGULAR_MORNING_END_MIN) ||
    (totalMin >= SN_REGULAR_EVENING_START_MIN && totalMin < SN_REGULAR_EVENING_END_MIN)
  );
}
