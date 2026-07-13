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
    note: "21-day program cohort. Free batch's real completion cutoff is 7:30 PM IST on 2026-07-12 (day 22) — as of 2026-07-13 this account's *unforced* status is already \"14DaysCompleted\", not ongoing. Always drive it via ?forceDay=/&time= (see batch-over-resolver.spec.ts) rather than relying on the real calendar date.",
  },
  {
    mobile: "919399788611",
    program: "21day",
    language: "English",
    batchStartDate: "2026-06-21",
    note: "21-day program cohort. Free batch's real completion cutoff is 7:30 PM IST on 2026-07-12 (day 22) — as of 2026-07-13 this account's *unforced* status is already \"14DaysCompleted\", not ongoing. Always drive it via ?forceDay=/&time= (see batch-over-resolver.spec.ts) rather than relying on the real calendar date.",
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
    note: "14-day ongoing",
  },
  {
    mobile: "911234567892",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-06",
    note: "14-day ongoing",
  },
  {
    mobile: "911234567811",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-13",
    note: "14-day cohort, batch started 2026-07-13 (today, as of this note) — no longer pre-batch; used day-by-day via ?forceDay= in free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts, so it's unaffected by the real calendar date. For the pre-batch/\"registered, not started\" onboarding state, use the registered-not-started accounts below (2026-07-20) instead.",
  },
  {
    mobile: "911234567812",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-13",
    note: "14-day cohort, batch started 2026-07-13 (today, as of this note) — no longer pre-batch; used day-by-day via ?forceDay= in free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts, so it's unaffected by the real calendar date. For the pre-batch/\"registered, not started\" onboarding state, use the registered-not-started accounts below (2026-07-20) instead.",
  },
  {
    mobile: "911234567821",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-20",
    variant: "registered-not-started",
    note: "Registered (not yet started) — batch starts 2026-07-20, resolves to \"registered\" status; used for the FAQs Registered bucket (e2e/faqs.spec.ts). As of 2026-07-13 this is 7 days out; once the real calendar date reaches 2026-07-20 the backend will flip this account to an ongoing status and faqs.spec.ts's Registered-bucket assertions will start failing — refresh batchStartDate (and note) to a later date before then.",
  },
  {
    mobile: "911234567822",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-20",
    variant: "registered-not-started",
    note: "Registered (not yet started) — batch starts 2026-07-20, resolves to \"registered\" status; used for the FAQs Registered bucket (e2e/faqs.spec.ts). As of 2026-07-13 this is 7 days out; once the real calendar date reaches 2026-07-20 the backend will flip this account to an ongoing status and faqs.spec.ts's Registered-bucket assertions will start failing — refresh batchStartDate (and note) to a later date before then.",
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
