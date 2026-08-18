export interface PlanRenewalInfo {
  daysUntilPlanEnds: number | null;
  showPlanRenewal: boolean;
  planEndDate: Date | null;
}

/**
 * A paid student sees the renewal upsell starting 7 days before their plan's end date.
 *
 * `payment_due_date` is preferred over `sub_end_date` because renewing (another payment)
 * appends a new entry to `subscriptions` instead of updating the original one — so
 * `sub_end_date` stays pinned to the first-ever subscription and never reflects a renewal,
 * which would otherwise keep showing the "plan expiring" upsell to someone who already paid again.
 */
export function getPlanRenewalInfo(studentData: any): PlanRenewalInfo {
  const planEndDateStr = studentData?.payment_due_date || studentData?.sub_end_date || studentData?.plan_end_date || studentData?.plan_expired_date;
  const planEndDate = planEndDateStr ? (() => {
    const parts = planEndDateStr.split("T")[0].split("-");
    if (parts.length === 3) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
    return new Date(planEndDateStr);
  })() : null;

  const daysUntilPlanEnds = (() => {
    if (!planEndDate) return null;
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    planEndDate.setHours(0, 0, 0, 0);
    return Math.ceil((planEndDate.getTime() - todayDate.getTime()) / 86400000) + 1;
  })();

  const showPlanRenewal = daysUntilPlanEnds !== null && daysUntilPlanEnds <= 7 && daysUntilPlanEnds >= 1;

  return { daysUntilPlanEnds, showPlanRenewal, planEndDate };
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Formats a "YYYY-MM-DD" (or ISO) date string as an ordinal date, e.g. "29th September". */
export function formatOrdinalDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("T")[0].split("-");
  const d = parts.length === 3
    ? new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
    : new Date(dateStr);
  const day = d.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
  return `${day}${suffix} ${MONTH_NAMES[d.getMonth()]}`;
}

/** Days remaining from today until `dateStr` (0 if today, negative if in the past). */
export function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  const parts = dateStr.split("T")[0].split("-");
  const target = parts.length === 3
    ? new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
    : new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}
