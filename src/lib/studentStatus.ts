import { isFreeBatchOver, getSimulatedBatchDate } from "./utils";

/**
 * Resolves a student's raw backend `status` into the status the UI should actually treat
 * them as, once their free batch's last evening session has ended (7:30 PM IST on
 * free_batch_end_date) — cohort-agnostic, driven purely by each student's own
 * free_batch_start_date/free_batch_end_date/sub_start_date:
 *
 * - Free/registered/ongoing students whose free batch is over → "14DaysCompleted".
 * - Paid students (raw status "paid") whose plan hasn't started yet (sub_start_date in the
 *   future): "14DaysOngoing" while their free batch is still ongoing, "paidPendingStart" once
 *   it's over — so they see a "your classes start tomorrow" interstitial instead of either the
 *   free dashboard or the full paid dashboard.
 *
 * `preview` lets ?forceDay=/?time= QA overrides simulate a specific day/time instead of the
 * real clock (see getSimulatedBatchDate/isFreeBatchOver).
 */
export function getEffectiveStatus(
  studentData: any,
  preview?: { forceDay?: string | null; timeOverride?: string | null }
): string | undefined {
  const status = studentData?.status;
  if (status === "14DaysCompleted" || status === "14 day completed") return status;

  const effectiveToday = preview?.forceDay != null && studentData?.free_batch_start_date
    ? getSimulatedBatchDate(studentData.free_batch_start_date, parseInt(preview.forceDay, 10))
    : (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();

  const freeBatchStart = studentData?.free_batch_start_date ? new Date(studentData.free_batch_start_date) : null;
  if (freeBatchStart) freeBatchStart.setHours(0, 0, 0, 0);
  const subStart = studentData?.sub_start_date ? new Date(studentData.sub_start_date) : null;
  if (subStart) subStart.setHours(0, 0, 0, 0);

  const batchOver = isFreeBatchOver(studentData?.free_batch_end_date, { today: effectiveToday, timeOverride: preview?.timeOverride });
  const freeBatchOngoing = !!freeBatchStart && effectiveToday >= freeBatchStart && !batchOver;

  if (status === "paid") {
    const paidNotStartedYet = !!subStart && effectiveToday < subStart;
    if (!paidNotStartedYet) return status;
    if (freeBatchOngoing) return "14DaysOngoing";
    if (batchOver) return "paidPendingStart";
    return status;
  }

  if (!!freeBatchStart && effectiveToday >= freeBatchStart && batchOver) return "14DaysCompleted";
  return status;
}
