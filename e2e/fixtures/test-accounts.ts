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
    note: "21-day program cohort, ongoing",
  },
  {
    mobile: "919399788611",
    program: "21day",
    language: "English",
    batchStartDate: "2026-06-21",
    note: "21-day program cohort, ongoing",
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
    note: "14-day, batch start is in the future relative to most test runs — useful for the pre-batch onboarding screen",
  },
  {
    mobile: "911234567812",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-13",
    note: "14-day, batch start is in the future relative to most test runs — useful for the pre-batch onboarding screen",
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
