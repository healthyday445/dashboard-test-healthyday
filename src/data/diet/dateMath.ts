import type { WeekBlockId } from "./types";

/** The diet feature never shows a date before this — the plan starts here regardless
 *  of the real calendar date. 2026-08-03 is a Monday, cycle week M2W2. */
export const DIET_LAUNCH_DATE = new Date(2026, 7, 3);

/** Curated data only exists through the day before this date so far — any date from here
 *  onward is disabled (grayed out, unclickable) in the tab strip until the nutrition team
 *  preps more. Push this forward as new dates get curated. */
export const DIET_DISABLED_FROM_DATE = "2026-08-31";

/** Whether a given "YYYY-MM-DD" date key falls on/after `DIET_DISABLED_FROM_DATE` — plain
 *  string comparison works because ISO date keys sort lexicographically. */
export function isDateDisabled(dateKey: string): boolean {
  return dateKey >= DIET_DISABLED_FROM_DATE;
}

/** The 6 week-blocks in fixed cycle order — the cycle repeats every 42 days. */
const WEEK_BLOCK_ORDER: WeekBlockId[] = ["M1W1", "M1W2", "M1W3", "M1W4", "M2W1", "M2W2"];

/** DIET_LAUNCH_DATE (2026-08-03) falls on this index into WEEK_BLOCK_ORDER (M2W2). */
const LAUNCH_WEEK_BLOCK_INDEX = 5;

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / 86_400_000);
}

/** Modulo that stays non-negative for any sign of n (JS `%` can return negative). */
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/** "Today" clamped so the diet page never shows a date before launch. Pass `today` to
 *  simulate a specific day (e.g. from a `?forceDay=`/`?time=` QA-preview override) instead
 *  of the real clock — mirrors this codebase's existing `getSimulatedBatchDate` idiom. */
export function getEffectiveToday(today: Date = new Date()): Date {
  const t = startOfDay(today);
  return t.getTime() < DIET_LAUNCH_DATE.getTime() ? new Date(DIET_LAUNCH_DATE) : t;
}

/** Maps a date (must be >= DIET_LAUNCH_DATE) to its cycle position. Callers should
 *  always route through `getEffectiveToday` first so this never sees a pre-launch date. */
export function getCyclePosition(date: Date): { weekBlockId: WeekBlockId; weekdayIndex: number } {
  const d = startOfDay(date);
  if (d.getTime() < DIET_LAUNCH_DATE.getTime()) {
    throw new Error("getCyclePosition: date precedes DIET_LAUNCH_DATE — clamp with getEffectiveToday first");
  }
  const daysSinceLaunch = daysBetween(DIET_LAUNCH_DATE, d);
  const weekBlockIndex = mod(LAUNCH_WEEK_BLOCK_INDEX + Math.floor(daysSinceLaunch / 7), WEEK_BLOCK_ORDER.length);
  const weekdayIndex = mod(daysSinceLaunch, 7); // 0=Monday .. 6=Sunday
  return { weekBlockId: WEEK_BLOCK_ORDER[weekBlockIndex], weekdayIndex };
}

/** The `count` consecutive dates starting at effective-today, for the tab strip. */
export function getTabDates(today: Date = new Date(), count = 5): Date[] {
  const start = getEffectiveToday(today);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

/** "03-08-2026" style display format. */
export function formatDateDDMMYYYY(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${date.getFullYear()}`;
}

/** "2026-08-03" — internal lookup key for curated content / route params, never shown to users. */
export function toIsoDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Parses an ISO "YYYY-MM-DD" route param back into a local Date at midnight. */
export function parseIsoDateKey(isoDateKey: string): Date {
  const [yyyy, mm, dd] = isoDateKey.split("-").map((s) => parseInt(s, 10));
  return new Date(yyyy, mm - 1, dd);
}
