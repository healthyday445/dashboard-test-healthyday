/** The diet feature never shows a date before this — the plan starts here regardless
 *  of the real calendar date. 2026-08-03 is a Monday, cycle week M2W2. */
export const DIET_LAUNCH_DATE = new Date(2026, 7, 3);

/** Curated data only exists through the day before this date so far — any date from here
 *  onward is disabled (grayed out, unclickable) in the tab strip until the nutrition team
 *  preps more. Push this forward as new dates get curated. */
export const DIET_DISABLED_FROM_DATE = "2026-09-07";

/** Whether a given "YYYY-MM-DD" date key falls on/after `DIET_DISABLED_FROM_DATE` — plain
 *  string comparison works because ISO date keys sort lexicographically. */
export function isDateDisabled(dateKey: string): boolean {
  return dateKey >= DIET_DISABLED_FROM_DATE;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** "Today" clamped so the diet page never shows a date before launch. Pass `today` to
 *  simulate a specific day (e.g. from a `?forceDay=`/`?time=` QA-preview override) instead
 *  of the real clock — mirrors this codebase's existing `getSimulatedBatchDate` idiom. */
export function getEffectiveToday(today: Date = new Date()): Date {
  const t = startOfDay(today);
  return t.getTime() < DIET_LAUNCH_DATE.getTime() ? new Date(DIET_LAUNCH_DATE) : t;
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
