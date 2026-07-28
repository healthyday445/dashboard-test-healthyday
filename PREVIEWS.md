# Preview Params

Every user-facing page can be forced into a specific visual state via query params, without needing real API data. This lets you check UI states directly in a browser.

None of these params affect production behavior for real users — they're only read when present.

## Live Sessions tab (`/`, `/:mobile`)

`IndexFourteenDays.tsx` (14-day general public — delegates to `IndexPaid.tsx` once a student's status is `paid`) or `IndexTwentyOneDay.tsx` (21-day/22-day June-21-2026 cohort) — `Dashboard.tsx` picks between them based on batch type. Rendered standalone at `/` or embedded as the default tab of `Dashboard.tsx` at `/:mobile`.

`forceDay` and `time` are reserved for this tab only — they control the day-of-batch and time-of-day shown here. They do not affect the Journey tab (see below), even though both tabs are mounted against the same URL.

### 14-day `IndexFourteenDays.tsx` — `forceDay` and `time` only

The 14-day page needs a real account (registered/active) to preview against — it no longer seeds mock data, so `forceDay`/`time` only reshape a real student's real data.

| Param | Value | Effect |
|---|---|---|
| `forceDay` | integer | Simulated day-of-batch, counted from `free_batch_start_date`. `1` = batch start date, `2` = start date + 1 day, etc. `0` = the day *before* the batch starts — forces the pre-batch onboarding screen regardless of the account's real status (bypasses the active/paid/pastdue/14-day-completed branches, **including a real paid account** — see `forcePaidDay` below if you need to preview the paid dashboard itself). |
| `time` | `"7.00PM"`, `"5.30AM"` | Overrides current time-of-day (session live/upcoming logic, bonus windows, the day-before-batch intro session card) |

Examples:

| URL | What it shows |
|---|---|
| `/9999999999?forceDay=0&time=9.30am` | Onboarding screen, intro session card in "upcoming" state — "Session Starts at 11:00 AM", no LIVE badge (9:00–10:29 AM window) |
| `/9999999999?forceDay=0&time=11.00am` | Onboarding screen, intro session card live — LIVE badge + JOIN SESSION NOW (10:30 AM–11:59 PM window) |
| `/9999999999?forceDay=1&time=4.30am` | Active batch, day 1, 5:30 AM session live (window opens 1hr early) |
| `/9999999999?forceDay=7&time=7.00PM` | Active batch, day 7, 7:00 PM (evening session live) |
| `/9999999999?forceDay=14` | Active batch, last day, current real time |

### Paid dashboard `IndexPaid.tsx` — `forcePaidDay` and `time`

Reached automatically once a real account's status is `paid` (via `IndexFourteenDays.tsx`). Uses `time` the same way as above, but day-of-week overrides use their own **`forcePaidDay`** param (0=Sun … 6=Sat) instead of `forceDay` — `forceDay=0` is reserved as the onboarding-preview sentinel above, so reusing it here would force the onboarding screen instead of the paid dashboard, even for a real paid account.

| Param | Value | Effect |
|---|---|---|
| `forcePaidDay` | integer (0=Sun … 6=Sat) | Overrides current day-of-week — needed for Face Yoga, which only shows on Sundays |
| `time` | `"11.40AM"`, `"8.15PM"` | Overrides current time-of-day (regular session + bonus session windows: Face Yoga 11:30 AM Sun, Diet 8:00 PM, Breath to Heal 9:00 PM) |

Examples:

| URL | What it shows |
|---|---|
| `/9999999999?time=8.15pm` | Diet Session live (12-month plan) |
| `/9999999999?time=9.10pm` | Breath to Heal live (6 or 12-month plan) |
| `/9999999999?forcePaidDay=0&time=11.40am` | Face Yoga live (12-month plan, Sunday only) |

### 21-day `IndexTwentyOneDay.tsx` — full preview param set (unchanged)

This page still supports mock data since real June-21-2026 accounts are scarce.

#### `?preview_dashboard=<key>`

Seeds mock student data so a given render state shows immediately, skipping the API fetch entirely.

| Key | State |
|---|---|
| `coming_soon` | "English is Coming Soon!" modal (unsupported language) |
| `onboarding` | Batch-not-started screen (registered, no active batch yet) |
| `free_active` | Active free batch, day 1 |
| `paid` | Paid member dashboard — **always renders via `IndexPaid.tsx`** (see below), regardless of `preview_programme` |
| `pastdue` | Subscription expired screen |
| `14day_completed` | "Trial ended" screen |

Example: `/9999999999?preview_dashboard=onboarding&preview_programme=21day`

**`preview_dashboard=paid` note:** `Dashboard.tsx` checks real/mock `status === "paid"` *before* any cohort/`preview_programme` branching — an already-paid student always renders `IndexFourteenDaysV2` → `IndexPaid.tsx`, never the 21-day-specific paid view (that separate inline paid dashboard in `IndexTwentyOneDay.tsx` was removed and consolidated into `IndexPaid.tsx` this session). So `preview_dashboard=paid&preview_programme=21day` renders the exact same `IndexPaid.tsx` as plain `preview_dashboard=paid` — `preview_programme=21day` has no effect once status is paid. Use the **paid dashboard's own `time`/`forcePaidDay` params** (documented under "Paid dashboard `IndexPaid.tsx`" above), not `forceTime`/`forceDay`/`forceLang`/`forceWeek` (those only ever applied to the now-removed 21-day-specific paid view). Prefer a real paid account from `e2e/fixtures/test-accounts.ts` (which now has one per plan type — 3/6/6-upgrade/12/12-upgrade months) over this mock-seeded path when testing plan-type-specific behavior.

#### `?preview_programme=21day`

`preview_dashboard` seeds mock data but doesn't set a real `free_batch_start_date`, so `Dashboard.tsx` has nothing to read the batch type from and defaults to the 14-day `Index`. Add `preview_programme=21day` to force it to render `IndexTwentyOneDay` instead.

Example: `/anything?preview_dashboard=free_active&preview_programme=21day&forceDay=15&time=8.45pm`

#### Fine-tuning params (work standalone or on top of `preview_dashboard`, free-batch states only)

| Param | Applies to | Value | Effect |
|---|---|---|---|
| `forceDay` | Free batch | integer | Overrides current day-of-batch (1–22) |
| `time` | Free batch | `"7.00PM"`, `"5.30AM"` | Overrides current time-of-day (session live/upcoming logic, bonus windows) |

For `preview_dashboard=paid`, use `time`/`forcePaidDay` instead (see the note above and the "Paid dashboard `IndexPaid.tsx`" section) — `forceTime`/`forceDay`(as day-of-week)/`forceLang`/`forceWeek` no longer apply to any live code path.

#### Examples

| URL | What it shows |
|---|---|
| `/9999999999?preview_dashboard=coming_soon&preview_programme=21day` | "English is Coming Soon!" modal |
| `/9999999999?preview_dashboard=onboarding&preview_programme=21day` | Batch-not-started screen |
| `/9999999999?preview_dashboard=free_active&preview_programme=21day` | Free batch, day 1, current real time |
| `/9999999999?preview_dashboard=free_active&preview_programme=21day&forceDay=15&time=8.45pm` | Free batch, day 15, 8:45 PM |
| `/9999999999?preview_dashboard=paid` | Paid dashboard (`IndexPaid.tsx`), Telugu, 12-month plan — `preview_programme=21day` is a no-op here, see note above |
| `/9999999999?preview_dashboard=paid&time=8.15pm` | Paid, 8:00 PM → Diet Session bonus card |
| `/9999999999?preview_dashboard=paid&forcePaidDay=0&time=11.40am` | Paid, Sunday 11:30 AM → Face Yoga bonus card |
| `/9999999999?preview_dashboard=pastdue&preview_programme=21day` | Subscription expired screen |

## Your Yoga Journey tab (`/:mobile`, journey tab)

`TwentyOneDaysProgram.tsx`, the second tab inside `Dashboard.tsx`.

### `?preview_levels=<days>`

Forces `daysAttended` (0–21), which drives which of the 7 levels is unlocked/in-progress. Also forces the journey tab open directly, bypassing the real eligibility check (batch date + status) that normally gates it.

Example: `/9999999999?preview_levels=9`

`forceDay`/`time` do **not** affect this tab — they're reserved for the Live Sessions tab (below). Since `Dashboard.tsx` mounts both tabs against the same URL, `preview_levels` is kept as a distinct param specifically so a Live Sessions preview URL can't accidentally also force the Journey tab's day, and vice versa.

## Referrals page (`/:mobile/referrals`, `/referral-status`)

`ReferralStatus.tsx`.

### `?preview_referrals=<count>`

Generates `<count>` mock verified referrals, so the milestone card and referral list can be checked at any count without a real referrer. Free students unlock Free Diet PDF at 1 referral and Healthyday T-shirt at 20; paid students see 10 FREE Classes at 5 referrals instead of the PDF (T-shirt at 20 is the same for both) — see `preview_paid` below for forcing which variant renders.

Example: `/9999999999/referrals?preview_referrals=25`

### `?preview_paid=1|0`

Overrides whether the milestone card and Rewards grid render the paid or free variant. Without this param, paid/free status is looked up for real via `/.netlify/functions/student` for whatever mobile number is in the URL — this override exists for previewing either variant deterministically, without needing a matching real account.

Example: `/9999999999/referrals?preview_referrals=3&preview_paid=1` (paid variant, 3 referrals — the "You are here" pending state ahead of the 5-referral first milestone)

## Attendance page (`/attendance-page`)

`AttendancePage.tsx` — monthly "Consistency Tracker" calendar.

### `?preview=paid`

Simulates a paid student with a Thu/Fri/Sat class schedule and some attendance history.

Example: `/attendance-page?preview=paid`

## Weekly attendance tracker (`/:mobile/attendance`)

`AttendancePageWeekly.tsx` — editable Mon-Sun checkbox tracker reached via the "Update Attendance"
button under the Weekly Attendance card on the paid dashboard (`WeeklyAttendanceCard.tsx`). Paid
students only — redirects away if the fetched student isn't paid.

### `?preview=paid`

Seeds a fixed mock week (`paid_attendance_tracker: ["mon", "wed"]`) and skips the network fetch
entirely — used since a real account's actual attendance for "this week" can't be pinned down
deterministically day-to-day.

Example: `/9999999999/attendance?preview=paid`

## Recordings page (`/:mobile/recordings`)

`AllRecordings.tsx`.

### `?preview=<key>`

| Key | State |
|---|---|
| `paid` | Paid student, Telugu |
| `english` | Paid student, English |
| `3month` | Paid student, Telugu, 3-month plan |

Example: `/9999999999/recordings?preview=english`
