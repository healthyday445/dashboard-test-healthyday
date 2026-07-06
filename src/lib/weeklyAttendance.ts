import type { DayStatus } from "@/components/DayStatusBox";

export const WEEK_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export interface WeeklyAttendance {
  weekLabel: string;
  weekStatus: DayStatus[];
}

/** Mon-Sun attendance for the current week, from either paid_attendance_tracker (day abbreviations) or attendance_tracker (full dates). */
export function getWeeklyAttendance(studentData: any): WeeklyAttendance {
  const today = new Date();
  const todayDow = today.getDay();
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - (todayDow === 0 ? 6 : todayDow - 1));
  mondayDate.setHours(0, 0, 0, 0);
  const sundayDate = new Date(mondayDate);
  sundayDate.setDate(mondayDate.getDate() + 6);

  const DN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtD = (d: Date) => `${DN[d.getDay()]}, ${MN[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
  const weekLabel = `${fmtD(mondayDate)} — ${fmtD(sundayDate)}`;

  const paidAttDates = new Set<string>(studentData?.attendance_tracker ?? []);
  // paid_attendance_tracker uses day abbreviations: "mon","tue","wed","thu","fri","sat","sun"
  const WEEK_DAY_ABBRS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const paidDayAbbrs = new Set<string>((studentData?.paid_attendance_tracker ?? []).map((d: string) => d.toLowerCase()));
  const todayIdx = todayDow === 0 ? 6 : todayDow - 1;

  const weekStatus: DayStatus[] = WEEK_DAY_LABELS.map((_, i) => {
    if (i > todayIdx) return "future";
    const d = new Date(mondayDate);
    d.setDate(mondayDate.getDate() + i);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    // Paid users: check paid_attendance_tracker day abbreviations first
    if (paidDayAbbrs.size > 0 && paidDayAbbrs.has(WEEK_DAY_ABBRS[i])) return "green";
    // Fallback: check full date strings in attendance_tracker
    if (paidAttDates.has(ds)) return "green";
    return "yellow";
  });

  return { weekLabel, weekStatus };
}
