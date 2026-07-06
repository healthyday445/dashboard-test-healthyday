import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
  const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
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
