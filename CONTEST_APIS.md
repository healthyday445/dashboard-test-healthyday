# Referral Contest APIs

Notes from auditing the current (June 2026, one-off) referral contest implementation
and planning the move to regular, recurring contests.

## Current state — `/leaderboard` page

Route: `/:mobile/leaderboard` → `src/pages/Leaderboard.tsx` (lazy-loaded, registered in `src/App.tsx`).

Contest window is hardcoded:

```ts
// src/pages/Leaderboard.tsx:48-50
const CONTEST_START = "2026-06-01";
const CONTEST_END = "2026-06-30";
const isContestOver = new Date().toISOString().slice(0, 10) >= CONTEST_END;
```

This single flag gates almost the whole page: live contest banner / prize tiers / refer
button vs. post-contest winner / reward cards.

### Existing APIs (all Netlify functions proxying `healthyday-backend-v2-...run.app`, header `X-API-KEY`)

| Function | Upstream | Params | Called from |
|---|---|---|---|
| `netlify/functions/leaderboard.js` | `GET /api/internal/referrals/leaderboard` | `start_date`, `end_date`, `page`, `page_size`, `include_contest` | `Leaderboard.tsx:172` |
| `netlify/functions/leaderboard-rank.js` | `GET /api/internal/referrals/leaderboard/rank` | `mobile`, `start_date`, `end_date`, `include_contest` | `Leaderboard.tsx:197` |
| `netlify/functions/student.js` | `GET /api/internal/student` | `mobile` | via `useStudentData`, `Leaderboard.tsx:210` |
| `netlify/functions/referrals.js` | `GET /api/internal/student/referrals` | `mobile`, `include_contest`, `start_date`, `end_date` | via `useReferrals`, `Leaderboard.tsx:140-145` |

`include_contest` is already accepted by the referrals/leaderboard endpoints, so the
backend has *some* internal contest concept — but nothing today exposes contest
metadata (id, dates, status) directly.

### Hardcoded pieces tied to the June contest (need to become dynamic)

- `CONTEST_START` / `CONTEST_END` — `Leaderboard.tsx:48-50`
- Prize tier copy ("TOP 500 WINNERS", Top 1-25 / 25-100 / 100-500 bundles) — `Leaderboard.tsx:411-438`
- Banner text "1st JUNE to 30th JUNE" — `Leaderboard.tsx:395-408`
- Drawer header "Your Referrals from June 1st – June 30th" — `Leaderboard.tsx:672-674`
- Post-contest eligibility (`isTop500`, `hasRefs`) — `Leaderboard.tsx:503-531`
- T&Cs link `yoga.healthyday.co.in/referral-tnc` — `Leaderboard.tsx:791`
- Contest-themed assets — `src/assets/leaderboard/*`

## Batch identification today

There's no dedicated `batch_id`. A student's batch is inferred from the student record
(`student.js` → `/api/internal/student`, consumed via `useStudentData`):

- `language` (`"English" | "Telugu"`)
- `free_batch_start_date`
- `free_batches: [{ batch_start_date, attendance_tracker }]`

## Business rule for regular contests

- One free batch ↔ one contest.
- One contest ↔ two batches (English + Telugu) sharing the same start/end date.

## Proposed new APIs

### 1. `GET /api/internal/contest/active` → `netlify/functions/contest.js`

Resolves "which contest is this student's batch part of."

- **Params**: `language` + `batch_start_date` (available today), ideally `batch_id` if the
  backend adds one
- **Returns**: `{ contest_id, start_date, end_date, batches: [{ batch_id, language }], status: "upcoming" | "live" | "ended" }`
- Replaces `CONTEST_START` / `CONTEST_END` constants entirely.

### 2. `GET /api/internal/contest/{contest_id}`

Full contest details.

- **Returns**: dates, status, prize tiers, T&Cs link — replaces hardcoded banner/prize
  copy if the backend is willing to serve contest config, not just dates. At minimum:
  dates + id + status; copy can stay client-side keyed by `contest_id`.

### 3. Param change on existing endpoints

`leaderboard`, `leaderboard-rank`, `referrals` currently take raw `start_date`/`end_date`.
For regular contests, they should accept `contest_id` (instead of, or in addition to,
dates) — with recurring contests, two students could legitimately be querying two
different active contests at once (e.g. one batch just started, another mid-contest),
so `contest_id` is the correct scoping key rather than raw dates.

## Open question

Does the backend already attach a `contest_id` to the student record (or batch data),
or does that need to be a new field the backend team adds? That decides whether
endpoint #1 above is a real lookup-by-batch call, or whether the frontend can just read
`contest_id` straight off the existing `student.js` response.

## Conventions to follow (per `src/data/diet/api.ts` + `types.ts`)

- One `api.ts` per feature folder (e.g. `src/data/contest/api.ts`), separate `types.ts`
  for domain types.
- Fetch functions build `URLSearchParams`, call `/.netlify/functions/<name>?...`, throw
  a plain/typed `Error` embedding function name + status on non-ok response.
- Raw API response declared as a local `ApiXxxResponse` (snake_case, matches upstream)
  right above the fetch function; resolved/camelCase domain type lives in `types.ts` and
  is what components consume — snake_case never leaks past the `api.ts` boundary.
- Data-fetching hooks needing caching/sharing across pages live in `src/hooks/use-*.ts`
  via `@tanstack/react-query`, with a descriptive `queryKey`, `enabled` flag, and tuned
  `staleTime`.
