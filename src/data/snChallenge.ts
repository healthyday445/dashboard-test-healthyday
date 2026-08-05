export interface SnChallengeDay {
  dayNumber: number;
  snCount: number;
  youtubeLink: string;
}

/** English-only, 6/12-month-only "108 Surya Namaskar Challenge" — 2026-08-06 through 2026-08-09.
 *  Purely date-gated: once real "today" moves past 2026-08-09, getSnChallengeDay returns null for
 *  every date and the dashboard reverts to its normal look with no further code changes needed.
 *  TODO: swap the placeholder youtubeLink values for the real per-day links before launch. */
export const SN_CHALLENGE_DAYS: Record<string, SnChallengeDay> = {
  "2026-08-06": { dayNumber: 1, snCount: 27, youtubeLink: "https://www.youtube.com/c/Healthyday" /* TODO_SN_DAY1_LINK */ },
  "2026-08-07": { dayNumber: 2, snCount: 54, youtubeLink: "https://www.youtube.com/c/Healthyday" /* TODO_SN_DAY2_LINK */ },
  "2026-08-08": { dayNumber: 3, snCount: 81, youtubeLink: "https://www.youtube.com/c/Healthyday" /* TODO_SN_DAY3_LINK */ },
  "2026-08-09": { dayNumber: 4, snCount: 108, youtubeLink: "https://www.youtube.com/c/Healthyday" /* TODO_SN_DAY4_LINK */ },
};

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

/** English + (6-month or 12-month, upgrade variants included) — same eligibility shape as the
 *  existing B2H/Diet bonus-session checks in IndexPaid.tsx. */
export function isSnChallengeEligible(studentData: any, is6Month: boolean, is12Month: boolean): boolean {
  return studentData?.language === "English" && (is6Month || is12Month);
}
