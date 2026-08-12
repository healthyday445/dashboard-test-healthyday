export interface SnChallengeDay {
  dayNumber: number;
  youtubeLink: string;
}

const SN_SESSION_CODE_RE = /^108sn_day(\d+)$/;

/** Fallback branch: `/session-links` is not reliable enough for the SN Challenge campaign, so
 *  this table is hardcoded on the frontend instead of read from the API. Keep `session_date` in
 *  "YYYY-MM-DD" (IST calendar date) and `language` lowercase ("english"/"telugu") to match the
 *  keys `getSnChallengeDay` is called with. Add/update rows here for future days. */
const HARDCODED_SN_SESSIONS: { session_date: string; language: string; session_code: string; link: string }[] = [
  { session_date: "2026-08-13", language: "telugu", session_code: "108sn_day1", link: "https://www.youtube.com/watch?v=3NMJ9zkgG70" },
  { session_date: "2026-08-14", language: "telugu", session_code: "108sn_day2", link: "https://www.youtube.com/watch?v=5xLa643YoVM" },
  { session_date: "2026-08-15", language: "telugu", session_code: "108sn_day3", link: "https://www.youtube.com/watch?v=Yd2fEu9QWNQ" },
  { session_date: "2026-08-16", language: "telugu", session_code: "108sn_day4", link: "https://www.youtube.com/watch?v=K9SlPKo7qb0" },
];

/** Looks up today's "108 Surya Namaskar Challenge" session from the hardcoded table above
 *  (fallback for backend/API issues on `/session-links`) — `sessionLinks` is accepted for
 *  call-site compatibility but no longer consulted. Matches on `session_date` (IST calendar
 *  date, e.g. from `toIstIsoDateKey` or a `?previewSnDate=` override) and `language`
 *  ("english"/"telugu"), among entries whose `session_code` looks like `108sn_day{N}`. Returns
 *  null whenever no hardcoded session exists for that date/language, which is what makes this
 *  feature auto-revert once the campaign's hardcoded rows run out. */
export function getSnChallengeDay(_sessionLinks: any[], dateKey: string, langKey: string): SnChallengeDay | null {
  const match = HARDCODED_SN_SESSIONS.find(
    (s) => s.session_date === dateKey && s.language === langKey && SN_SESSION_CODE_RE.test(s.session_code)
  );
  if (!match) return null;
  const dayNumber = parseInt(match.session_code.match(SN_SESSION_CODE_RE)![1], 10);
  return { dayNumber, youtubeLink: match.link };
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

/** Returns the calendar day immediately before `dateKey` ("YYYY-MM-DD"), for looking up
 *  yesterday's SN session before today's 4:30 AM start time. */
export function getPreviousIstIsoDateKey(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return toIstIsoDateKey(new Date(Date.UTC(y, m - 1, d - 1)));
}

/** 4:30 AM - 9:29 AM IST — the SN session's real live/redirect window. Exported (rather than
 *  living only inside SnChallengeCard) so IndexPaid.tsx can compute the same boolean once and
 *  use it to decide section order, instead of re-deriving it a second time and risking drift. */
export const SN_LIVE_START_MIN = 4 * 60 + 30;
export const SN_LIVE_END_MIN = 9 * 60 + 30; // exclusive bound — "< 570" already covers up to 9:29:59 AM

export function isSnLive(totalMin: number): boolean {
  return totalMin >= SN_LIVE_START_MIN && totalMin < SN_LIVE_END_MIN;
}

/** Whenever a "108 Surya Namaskar Challenge" session is live for today, the "Regular Session"
 *  block's live windows start 15 minutes earlier than the year-round isRegularSessionLive (4:30
 *  AM / 3:30 PM instead of 4:45 AM / 3:45 PM — explicit product correction, "morning session
 *  should also start at 4:30 am" / "evening session should start from 3:30 pm"), so it lines up
 *  with the SN card's own start time and the campaign's earlier-starting broadcast. End times are
 *  unchanged (9:30 AM / 7:30 PM). Only ever used when an SN day is present — otherwise callers
 *  keep the real isRegularSessionLive. */
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
