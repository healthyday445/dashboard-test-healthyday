// Real backend test accounts used as the primary way to reach each program/state in E2E specs.
// Update the mobile numbers here when the user provides new ones — don't hardcode numbers inline in specs.
// If a needed persona/state isn't listed here, prompt the user for a test account before inventing one.

export type TestAccount = {
  mobile: string;
  program: "21day" | "14day" | "paid";
  language: "Telugu" | "English";
  batchStartDate: string; // ISO date the batch/cohort started (or starts, if future)
  variant?: string; // disambiguates accounts that would otherwise collide on program+language+batchStartDate
  note: string;
};

export const TEST_ACCOUNTS: TestAccount[] = [
  {
    mobile: "918179205854",
    program: "21day",
    language: "Telugu",
    batchStartDate: "2026-06-21",
    note: "21-day program cohort. Free batch's real completion cutoff is 7:30 PM IST on 2026-07-12 (day 22) — as of 2026-07-13 this account's *unforced* status is already \"14DaysCompleted\", not ongoing. IMPORTANT: forceDay can no longer simulate an earlier day for this account either — getEffectiveStatus (src/lib/studentStatus.ts:22-23) short-circuits to the raw backend status once it's really \"14DaysCompleted\", ignoring forceDay entirely. This breaks batch-over-resolver.spec.ts's \"day 21 — still ongoing\" test specifically (confirmed failing 2026-07-21); left as a known gap (user chose not to fix this session — see memory).",
  },
  {
    mobile: "919399788611",
    program: "21day",
    language: "English",
    batchStartDate: "2026-06-21",
    note: "21-day program cohort. Free batch's real completion cutoff is 7:30 PM IST on 2026-07-12 (day 22) — as of 2026-07-13 this account's *unforced* status is already \"14DaysCompleted\", not ongoing. IMPORTANT: forceDay can no longer simulate an earlier day for this account either — getEffectiveStatus (src/lib/studentStatus.ts:22-23) short-circuits to the raw backend status once it's really \"14DaysCompleted\", ignoring forceDay entirely. This breaks batch-over-resolver.spec.ts's \"day 21 — still ongoing\" test specifically (confirmed failing 2026-07-21); left as a known gap (user chose not to fix this session — see memory).",
  },
  {
    mobile: "917678140328",
    program: "21day",
    language: "English",
    batchStartDate: "2026-06-21",
    variant: "paid-pending-start",
    note: "21-day cohort, already PAID in advance (sub_start_date 2026-07-13, the day after free_batch_end_date 2026-07-12) — getEffectiveStatus resolves this to \"14DaysOngoing\" while the free batch is still on, then \"paidPendingStart\" once it's over (7:30 PM IST on the last day)",
  },
  {
    mobile: "911234567891",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-06",
    note: "14-day cohort, free_batch_end_date 2026-07-19 — confirmed by the user directly (2026-07-21): this batch is over, real status is \"14DaysCompleted\". forceDay can no longer simulate an earlier day for this account — getEffectiveStatus (src/lib/studentStatus.ts:22-23) short-circuits to the raw backend status once it's really \"14DaysCompleted\", ignoring forceDay entirely. e2e/free-batch-14day-jul6-special.spec.ts (forceDay-based ongoing/bonus/countdown tests) was deleted for this reason (2026-07-21) and replaced by e2e/free-batch-14day-jul6-completed.spec.ts, which uses this account's real (unforced) completed state instead — renders via the OLDER IndexFourteenDays.tsx flow (no tab bar, no Journey tab), unlike the 2026-07-13+ cohorts.",
  },
  {
    mobile: "911234567892",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-06",
    note: "14-day cohort, free_batch_end_date 2026-07-19 — confirmed by the user directly (2026-07-21): this batch is over, real status is \"14DaysCompleted\". forceDay can no longer simulate an earlier day for this account — getEffectiveStatus (src/lib/studentStatus.ts:22-23) short-circuits to the raw backend status once it's really \"14DaysCompleted\", ignoring forceDay entirely. e2e/free-batch-14day-jul6-special.spec.ts (forceDay-based ongoing/bonus/countdown tests) was deleted for this reason (2026-07-21) and replaced by e2e/free-batch-14day-jul6-completed.spec.ts, which uses this account's real (unforced) completed state instead — renders via the OLDER IndexFourteenDays.tsx flow (no tab bar, no Journey tab), unlike the 2026-07-13+ cohorts.",
  },
  {
    mobile: "911234567811",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-13",
    note: "14-day cohort, batch started 2026-07-13, free_batch_end_date 2026-07-26 — as of 2026-07-21 this batch is ongoing and in week 2 (day 9 of 14, confirmed by the user), real status still \"14DaysOngoing\" (not completed yet, so forceDay simulation still works fine — unlike the 07-06 cohort above). Used day-by-day via ?forceDay= in free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts. For the pre-batch/\"registered, not started\" onboarding state, use the registered-not-started accounts below instead.",
  },
  {
    mobile: "911234567812",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-13",
    note: "14-day cohort, batch started 2026-07-13, free_batch_end_date 2026-07-26 — as of 2026-07-21 this batch is ongoing and in week 2 (day 9 of 14, confirmed by the user), real status still \"14DaysOngoing\" (not completed yet, so forceDay simulation still works fine — unlike the 07-06 cohort above). Used day-by-day via ?forceDay= in free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts. For the pre-batch/\"registered, not started\" onboarding state, use the registered-not-started accounts below instead.",
  },
  {
    mobile: "911234567821",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-20",
    note: "14-day cohort, batch started 2026-07-20, free_batch_end_date 2026-08-02 — as predicted, this flipped from \"registered\" to \"14DaysOngoing\" once the real calendar date reached the batch start; as of 2026-07-21 it's in week 1 (day 2 of 14, confirmed by the user). No longer usable for the FAQs Registered bucket — see the registered-not-started accounts below (911234567831/911234567832) instead.",
  },
  {
    mobile: "911234567822",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-20",
    note: "14-day cohort, batch started 2026-07-20, free_batch_end_date 2026-08-02 — presumed flipped from \"registered\" to \"14DaysOngoing\" same as the Telugu sibling above (unconfirmed directly, but same cohort/mechanism — user confirmed the 07-20 cohort overall is in week 1 as of 2026-07-21). No longer usable for the FAQs Registered bucket — see the registered-not-started accounts below (911234567831/911234567832) instead.",
  },
  {
    mobile: "911234567831",
    program: "14day",
    language: "English",
    batchStartDate: "",
    variant: "registered-not-started",
    note: "Registered (not yet assigned a batch — free_batch_start_date is null), resolves to \"registered\" status; used for the FAQs Registered bucket (e2e/faqs.spec.ts). Deliberately left with no batchStartDate (unlike the 911234567822 account it replaces) since it has no batch to expire against — should stay in the \"registered\" state indefinitely until actually enrolled in a batch.",
  },
  {
    mobile: "911234567832",
    program: "14day",
    language: "Telugu",
    batchStartDate: "",
    variant: "registered-not-started",
    note: "Registered (not yet assigned a batch — free_batch_start_date is null), resolves to \"registered\" status; used for the FAQs Registered bucket (e2e/faqs.spec.ts). Deliberately left with no batchStartDate (unlike the 911234567821 account it replaces) since it has no batch to expire against — should stay in the \"registered\" state indefinitely until actually enrolled in a batch.",
  },
  {
    mobile: "918109216433",
    program: "paid",
    language: "English",
    batchStartDate: "",
    note: "Paid dashboard",
  },
  {
    mobile: "917780729046",
    program: "paid",
    language: "Telugu",
    batchStartDate: "",
    note: "Paid dashboard",
  },
];

// batchStartDate disambiguates when multiple accounts share a program+language (e.g. two 14day
// Telugu cohorts at different start dates); variant disambiguates further when even that collides
// (e.g. the 21-day English cohort has both a plain ongoing account and a paid-pending-start one at
// the same batchStartDate) — omit either to get the first match.
export function findAccount(
  program: TestAccount["program"],
  language: TestAccount["language"],
  batchStartDate?: string,
  variant?: string
) {
  return TEST_ACCOUNTS.find(
    (a) =>
      a.program === program &&
      a.language === language &&
      (batchStartDate === undefined || a.batchStartDate === batchStartDate) &&
      (variant === undefined || a.variant === variant)
  );
}
