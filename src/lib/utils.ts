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
