/**
 * The backend can report status:"paid" even when the purchased plan hasn't started yet
 * (e.g. a referral-reward or renewal subscription scheduled for a future date) while the
 * student is still inside their free-batch window. Until the paid plan actually starts,
 * the frontend should keep showing the ongoing free-batch experience.
 */
export function getEffectiveStatus(studentData: any): string | undefined {
  const status = studentData?.status;
  if (status !== "paid") return status;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const subStart = studentData?.sub_start_date ? new Date(studentData.sub_start_date) : null;
  const freeBatchStart = studentData?.free_batch_start_date ? new Date(studentData.free_batch_start_date) : null;
  const freeBatchEnd = studentData?.free_batch_end_date ? new Date(studentData.free_batch_end_date) : null;
  if (subStart) subStart.setHours(0, 0, 0, 0);
  if (freeBatchStart) freeBatchStart.setHours(0, 0, 0, 0);
  if (freeBatchEnd) freeBatchEnd.setHours(0, 0, 0, 0);

  const paidNotStartedYet = !!subStart && today < subStart;
  const freeBatchOngoing = !!freeBatchStart && !!freeBatchEnd && today >= freeBatchStart && today <= freeBatchEnd;

  return paidNotStartedYet && freeBatchOngoing ? "14DaysOngoing" : status;
}
