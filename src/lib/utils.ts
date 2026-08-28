import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getNowIST } from "@/lib/serverTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Parses a "7.00PM" / "5.30am" style time string into minutes since midnight. */
export function parseTimeStringToMinutes(time: string): number {
  const isPM = time.toLowerCase().endsWith("pm");
  const s = time.toLowerCase().replace("am", "").replace("pm", "");
  const [hStr, mStr] = s.split(".");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr ?? "0", 10);
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h * 60 + m;
}

/** Current time-of-day in IST, as minutes since midnight — or the `?time=` override when present. */
export function getCurrentMinutesIST(timeOverride?: string | null): number {
  if (timeOverride) return parseTimeStringToMinutes(timeOverride);
  const nowIST = getNowIST();
  return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
}

/** Regular-session block end times (IST minutes-since-midnight), same across all tracks. */
const MORNING_SESSION_END_MIN = 9 * 60 + 30; // 9:30 AM
const EVENING_SESSION_END_MIN = 19 * 60 + 30; // 7:30 PM

/** When a bonus session's card should start showing.
 *  If the bonus falls after today's morning or evening regular-session block has ended,
 *  the card opens right when that block ends (no gap where "next session" text shows
 *  instead) — otherwise it keeps the standard 30-minutes-before-start lead-in. */
export function getBonusWindowStart(bonusStartMin: number): number {
  if (bonusStartMin >= EVENING_SESSION_END_MIN) return EVENING_SESSION_END_MIN;
  if (bonusStartMin >= MORNING_SESSION_END_MIN) return MORNING_SESSION_END_MIN;
  return bonusStartMin - 30;
}

/** True once free_batch_end_date's last evening session (7:30 PM IST) has ended.
 *  Pass `overrides.today` (e.g. from getSimulatedBatchDate) to simulate a specific day
 *  instead of the real clock, for ?forceDay=/?time= QA previews. */
export function isFreeBatchOver(
  freeBatchEndDateStr?: string | null,
  overrides?: { today?: Date; timeOverride?: string | null }
): boolean {
  if (!freeBatchEndDateStr) return false;
  const end = new Date(freeBatchEndDateStr);
  end.setHours(0, 0, 0, 0);
  const today = overrides?.today ? new Date(overrides.today) : new Date();
  today.setHours(0, 0, 0, 0);
  if (today.getTime() > end.getTime()) return true;
  if (today.getTime() < end.getTime()) return false;
  return getCurrentMinutesIST(overrides?.timeOverride) >= 1170; // 7:30 PM IST
}

/** Simulates "today" as batchStart + (forceDay - 1) days, for ?forceDay= QA previews. */
export function getSimulatedBatchDate(batchStartDateStr: string, forceDay: number): Date {
  const d = new Date(batchStartDateStr);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + (forceDay - 1));
  return d;
}

export const START_DATE_MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
export const getOrdinalSuffix = (day: number) => (day >= 11 && day <= 13 ? "TH" : ({ 1: "ST", 2: "ND", 3: "RD" } as Record<number, string>)[day % 10] ?? "TH");

/** New batches always start on a Monday — the next upcoming one, never today even if today is Monday. */
export const getNextMonday = (from: Date = new Date()): Date => {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  const daysToAdd = dow === 0 ? 1 : dow === 1 ? 7 : 8 - dow;
  d.setDate(d.getDate() + daysToAdd);
  return d;
};

/** Plain-text "13th JULY" style label, matching the app's existing date-badge convention. */
export function formatBatchStartLabel(date: Date): string {
  return `${date.getDate()}${getOrdinalSuffix(date.getDate()).toLowerCase()} ${START_DATE_MONTHS[date.getMonth()]}`;
}
