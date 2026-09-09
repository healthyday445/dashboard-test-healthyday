# Contest APIs — Requirements for Backend

## Context

We currently run a referral leaderboard/contest feature (`/leaderboard` page) with a
**single, hardcoded contest window** (June 1 – June 30). We're moving to **regular,
recurring contests**, one per free batch cohort.

## Business rules

1. One free batch is linked to **exactly one contest**.
2. One contest is linked to **exactly two batches** — an English batch and a Telugu
   batch — that share the same start date and end date.
3. Contests should be resolvable per-student/per-batch, since multiple contests will be
   running concurrently for different cohorts (e.g. one batch's contest ending while
   another's is just starting).

## What we already have (for reference)

These endpoints exist today and already accept an `include_contest` flag, so there may
be an internal contest concept on your side already:

- `GET /api/internal/referrals/leaderboard` — params: `start_date`, `end_date`, `page`, `page_size`, `include_contest`
- `GET /api/internal/referrals/leaderboard/rank` — params: `mobile`, `start_date`, `end_date`, `include_contest`
- `GET /api/internal/student/referrals` — params: `mobile`, `start_date`, `end_date`, `include_contest`
- `GET /api/internal/student` — params: `mobile` — returns `language`, `free_batch_start_date`, `free_batches: [{batch_start_date, attendance_tracker}]`

Currently there is **no `contest_id` or `batch_id`** field anywhere — batch is only
identifiable today as the pair `(language, batch_start_date)`.

## New APIs needed

### 1. Resolve the active contest for a student/batch

```
GET /api/internal/contest/active
```

**Params** (please confirm which key you can support):
- `mobile` (preferred — simplest for us), or
- `language` + `batch_start_date`

**Response**
```json
{
  "contest_id": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "status": "upcoming | live | ended",
  "batches": [
    { "batch_id": "string", "language": "English" },
    { "batch_id": "string", "language": "Telugu" }
  ]
}
```

### 2. Get contest details by ID

```
GET /api/internal/contest/{contest_id}
```

**Response** — same shape as above, plus (if feasible) any contest config that
currently lives as hardcoded copy on our side, e.g.:
```json
{
  "contest_id": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "status": "upcoming | live | ended",
  "prize_tiers": [
    { "rank_from": 1, "rank_to": 25, "prize": "..." },
    { "rank_from": 26, "rank_to": 100, "prize": "..." },
    { "rank_from": 101, "rank_to": 500, "prize": "..." }
  ],
  "tnc_url": "string"
}
```
If prize tiers/copy are hard to model generically right now, `contest_id` + dates +
`status` alone unblocks us — copy can stay client-side keyed by `contest_id` for now.

### 3. Add `contest_id` scoping to existing referral/leaderboard endpoints

Please add an optional `contest_id` param (in place of, or alongside, `start_date`/
`end_date`) to:

- `GET /api/internal/referrals/leaderboard`
- `GET /api/internal/referrals/leaderboard/rank`
- `GET /api/internal/student/referrals`

Reason: with concurrent recurring contests, two students may need to query two
different active contests at the same time. Scoping by `contest_id` is safer and
clearer than us recomputing/passing raw dates on the frontend.

### 4. (Nice to have) `contest_id` on the student record

If `GET /api/internal/student` could return the student's current `contest_id` and
`batch_id` directly, we could skip the separate lookup in #1 and read it straight off
the student payload we already fetch.

## Open questions for backend

1. Can `/api/internal/student` be extended with `batch_id` / `contest_id`, or do we need
   a separate lookup call?
2. Is `mobile` enough to resolve the active contest, or do you need `language` +
   `batch_start_date` as well?
3. Can contest config (prize tiers, T&Cs) be served from your side, or should that stay
   hardcoded on our frontend per `contest_id`?
4. What should `/contest/active` return for a student who isn't in a batch tied to any
   active contest (404, or `status: "none"`)?
