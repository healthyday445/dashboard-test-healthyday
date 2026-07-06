export interface PlanRenewalInfo {
  daysUntilPlanEnds: number | null;
  showPlanRenewal: boolean;
}

/** A paid student sees the renewal upsell starting 7 days before their plan's end date. */
export function getPlanRenewalInfo(studentData: any): PlanRenewalInfo {
  const planEndDateStr = studentData?.sub_end_date || studentData?.plan_end_date || studentData?.plan_expired_date;
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

  return { daysUntilPlanEnds, showPlanRenewal };
}
