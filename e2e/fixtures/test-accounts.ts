// Real backend test accounts used as the primary way to reach each program/state in E2E specs.
// Update the mobile numbers here when the user provides new ones — don't hardcode numbers inline in specs.
// If a needed persona/state isn't listed here, prompt the user for a test account before inventing one.

export type TestAccount = {
  mobile: string;
  program: "21day" | "14day" | "paid";
  language: "Telugu" | "English";
  batchStartDate: string; // ISO date the batch/cohort started (or starts, if future)
  variant?: string; // disambiguates accounts that would otherwise collide on program+language+batchStartDate.
                     // For program:"paid" accounts, doubles as the plan type ("3_months" | "6_months" |
                     // "6_months_upgrade" | "12_months" | "12_months_upgrade") so findAccount("paid", language,
                     // undefined, planType) can select a specific plan — batchStartDate is irrelevant there.
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
    note: "21-day cohort, PAID in advance (sub_start_date 2026-07-13, the day after free_batch_end_date 2026-07-12). STALE as of 2026-07-28: sub_start_date is now 15 days in the past, so the subscription has genuinely started — real backend status is plain \"paid\", not \"paidPendingStart\". This account no longer exercises the paid-pending-start persona at all (same aging-out pattern as the 14DaysCompleted accounts below); batch-over-resolver.spec.ts's \"Paid-in-advance student\" describe block will fail against it now. Needs a fresh 21-day account with a future sub_start_date to keep covering this state — flagged as a gap, not fixed (no replacement account available this session).",
  },
  {
    mobile: "911234567891",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-06",
    note: "STALE as of 2026-07-28: this account has been RE-ENROLLED into a brand-new batch (free_batch_start_date is now 2026-07-27, status \"14DaysOngoing\", day 2 of 14) — it is no longer on the 2026-07-06 cohort and no longer \"14DaysCompleted\". This breaks the Telugu leg of e2e/free-batch-14day-jul6-completed.spec.ts (its English sibling, 911234567892, is unaffected — this drift is asymmetric, not cohort-wide). Left in place with batchStartDate still labeled \"2026-07-06\" since findAccount() is just a static lookup key, not a live re-verification — the spec using this account for the Jul-6-completed Telugu case will now fail against the real backend. Needs a fresh Telugu account still on a genuinely completed OLD-format (pre-2026-07-13) 14-day batch; flagged as a gap, not fixed (no replacement available this session).",
  },
  {
    mobile: "911234567892",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-06",
    note: "14-day cohort, free_batch_end_date 2026-07-19 — confirmed by the user directly (2026-07-21): this batch is over, real status is \"14DaysCompleted\". Re-confirmed still accurate as of 2026-07-28 (unlike its Telugu sibling above, this account has NOT been re-enrolled). forceDay can no longer simulate an earlier day for this account — getEffectiveStatus (src/lib/studentStatus.ts:22-23) short-circuits to the raw backend status once it's really \"14DaysCompleted\", ignoring forceDay entirely. e2e/free-batch-14day-jul6-special.spec.ts (forceDay-based ongoing/bonus/countdown tests) was deleted for this reason (2026-07-21) and replaced by e2e/free-batch-14day-jul6-completed.spec.ts, which uses this account's real (unforced) completed state instead — renders via the OLDER IndexFourteenDays.tsx flow (no tab bar, no Journey tab), unlike the 2026-07-13+ cohorts.",
  },
  {
    mobile: "911234567811",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-13",
    note: "STALE as of 2026-07-28: free_batch_end_date was 2026-07-26 (2 days ago) — real status is now \"14DaysCompleted\", no longer \"14DaysOngoing\". forceDay can no longer simulate an earlier ongoing day for this account (same short-circuit as the other completed accounts in this file). free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts's \"14-day-v2 cohort\" block were repointed to the 07-20 cohort below (911234567821/911234567822), which is still genuinely ongoing — this account is kept here as a candidate for a future 07-13-cohort-completed spec (mirroring free-batch-14day-jul6-completed.spec.ts) but isn't used by any spec right now.",
  },
  {
    mobile: "911234567812",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-13",
    note: "STALE as of 2026-07-28: free_batch_end_date was 2026-07-26 (2 days ago) — real status is now \"14DaysCompleted\", no longer \"14DaysOngoing\". forceDay can no longer simulate an earlier ongoing day for this account (same short-circuit as the other completed accounts in this file). free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts's \"14-day-v2 cohort\" block were repointed to the 07-20 cohort below (911234567821/911234567822), which is still genuinely ongoing — used instead by e2e/free-batch-14day-jul13-completed.spec.ts, which covers this cohort's real completed state (notably DIFFERENT from the older 07-06 cohort's completed screen: this one renders via IndexFourteenDaysV2, which keeps its own internal Live/Journey tab bar even when completed and has no \"JOIN 1 YEAR PLAN\" button — it shows a PricingAndComparisonSection plan-picker instead).",
  },
  {
    mobile: "911234567821",
    program: "14day",
    language: "Telugu",
    batchStartDate: "2026-07-20",
    note: "14-day cohort, batch started 2026-07-20, free_batch_end_date 2026-08-02 — genuinely still \"14DaysOngoing\" as of 2026-07-28 (day 9 of 14). PROMOTED (2026-07-28) to the \"regular/default flow\" day-by-day stand-in for free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts's 14-day-v2 block, replacing the now-completed 911234567811/911234567812 (07-13 cohort) above — this account will itself complete around 2026-08-02 7:30 PM IST, so re-verify before then. No longer usable for the FAQs Registered bucket — see the registered-not-started accounts below (911234567831/911234567832), though note those have ALSO drifted (see their entries).",
  },
  {
    mobile: "911234567822",
    program: "14day",
    language: "English",
    batchStartDate: "2026-07-20",
    note: "14-day cohort, batch started 2026-07-20, free_batch_end_date 2026-08-02 — genuinely still \"14DaysOngoing\" as of 2026-07-28 (day 9 of 14). PROMOTED (2026-07-28) to the \"regular/default flow\" day-by-day stand-in for free-batch-14day-regular.spec.ts and batch-over-resolver.spec.ts's 14-day-v2 block, replacing the now-completed 911234567811/911234567812 (07-13 cohort) above — this account will itself complete around 2026-08-02 7:30 PM IST, so re-verify before then. No longer usable for the FAQs Registered bucket — see the registered-not-started accounts below (911234567831/911234567832), though note those have ALSO drifted (see their entries).",
  },
  {
    mobile: "911234567831",
    program: "14day",
    language: "English",
    batchStartDate: "",
    variant: "registered-not-started",
    note: "STALE as of 2026-07-28: this account has been AUTO-ENROLLED into a real batch (free_batch_start_date is now 2026-07-27, status \"14DaysOngoing\", day 2 of 14) — it no longer has free_batch_start_date: null and no longer resolves to \"registered\". It appears the backend eventually assigns every registered student to a batch (both this and its Telugu sibling drifted the same way), so a \"registered, no batch\" persona may not stay stable on any given account indefinitely. e2e/faqs.spec.ts's Registered-bucket tests will fail against this account now — needs a freshly-registered real account with no batch yet; flagged as a gap, not fixed (no replacement available this session).",
  },
  {
    mobile: "911234567832",
    program: "14day",
    language: "Telugu",
    batchStartDate: "",
    variant: "registered-not-started",
    note: "STALE as of 2026-07-28: this account has ALSO been auto-enrolled into a real batch (free_batch_start_date is now 2026-07-27, status \"14DaysOngoing\", day 2 of 14) — same drift as its English sibling above, same fix needed (a fresh real \"registered, no batch\" account).",
  },
  {
    mobile: "918109216433",
    program: "paid",
    language: "English",
    batchStartDate: "",
    variant: "12_months",
    note: "Paid dashboard, plan 12_months (current_plan confirmed via /student API 2026-07-28, sub_end_date 2027-02-01). Used in e2e/paid-dashboard.spec.ts for the general live-session + 12-month-exclusive bonus-card (Face Yoga, Diet) + Grocery List coverage.",
  },
  {
    mobile: "917780729046",
    program: "paid",
    language: "Telugu",
    batchStartDate: "",
    variant: "12_months",
    note: "Paid dashboard, plan 12_months (current_plan confirmed via /student API 2026-07-28, sub_end_date 2027-05-13). Telugu 12-month account — not currently exercised by any plan-specific test (paid-dashboard.spec.ts's plan-type suite uses the English 918109216433 above for 12_months to keep one canonical account per assertion); kept as a spare/Telugu-language stand-in.",
  },
  {
    mobile: "918919927638",
    program: "paid",
    language: "Telugu",
    batchStartDate: "",
    variant: "6_months",
    note: "Paid dashboard, plan 6_months (current_plan confirmed via /student API 2026-07-28, sub_start_date 2026-07-13, sub_end_date 2027-01-08). Added 2026-07-28 for plan-type bonus-session coverage: 6-month gets Breath to Heal but NOT Face Yoga/Diet/Grocery List (those are 12-month-only per src/lib/paidBonusSessions.ts).",
  },
  {
    mobile: "917503804259",
    program: "paid",
    language: "English",
    batchStartDate: "",
    variant: "6_months_upgrade",
    note: "Paid dashboard, plan 6_months_upgrade (current_plan confirmed via /student API 2026-07-28, sub_start_date 2026-07-13, sub_end_date 2027-01-08). Added 2026-07-28 specifically to cover the \"_upgrade\" suffix bug fixed this session (planType comparisons must treat 6_months_upgrade identically to 6_months) — same eligibility as 918919927638 (B2H only, no Face Yoga/Diet/Grocery List).",
  },
  {
    mobile: "919553666646",
    program: "paid",
    language: "Telugu",
    batchStartDate: "",
    variant: "3_months",
    note: "Paid dashboard, plan 3_months (current_plan confirmed via /student API 2026-07-28, sub_start_date 2026-07-14, sub_end_date 2026-10-11). Added 2026-07-28: 3-month plan is not is6Month or is12Month for any of getActivePaidBonusSession's rules, so it should get NONE of Face Yoga/Diet/Breath to Heal/Grocery List at any forced time — used to assert bonus-card absence.",
  },
  {
    mobile: "919666163585",
    program: "paid",
    language: "Telugu",
    batchStartDate: "2026-06-21",
    variant: "12_months_upgrade",
    note: "Paid dashboard, plan 12_months_upgrade (current_plan confirmed via /student API 2026-07-28, sub_start_date 2026-07-13, sub_end_date 2027-07-12). Also happens to be from the June-21-2026 free-batch cohort (batchStartDate kept here for that reason, though it's irrelevant to the paid dashboard itself — Dashboard.tsx's alreadyPaid check now routes every paid student through IndexFourteenDaysV2 -> IndexPaid regardless of which free cohort they originally joined, a fix made this session). Added 2026-07-28 to cover the \"_upgrade\" suffix bug fix: same eligibility as a plain 12_months account (Face Yoga, Diet, B2H, Grocery List all show).",
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
