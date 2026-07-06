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
| `time` | `"7.00PM"`, `"5.30AM"` | Overrides current time-of-day (session live/upcoming logic, bonus windows, the July 5 2026 intro session card) |

Examples:

| URL | What it shows |
|---|---|
| `/9999999999?forceDay=0&time=11.00am` | Onboarding screen, intro session card live (10:30 AM–12:00 PM window) |
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
| `paid` | Paid member dashboard (12-month plan) |
| `pastdue` | Subscription expired screen |
| `14day_completed` | "Trial ended" screen |

Example: `/9999999999?preview_dashboard=onboarding&preview_programme=21day`

#### `?preview_programme=21day`

`preview_dashboard` seeds mock data but doesn't set a real `free_batch_start_date`, so `Dashboard.tsx` has nothing to read the batch type from and defaults to the 14-day `Index`. Add `preview_programme=21day` to force it to render `IndexTwentyOneDay` instead.

Example: `/anything?preview_dashboard=free_active&preview_programme=21day&forceDay=15&time=8.45pm`

#### Fine-tuning params (work standalone or on top of `preview_dashboard`)

| Param | Applies to | Value | Effect |
|---|---|---|---|
| `forceDay` | Free batch | integer | Overrides current day-of-batch (1–22) |
| `time` | Free batch | `"7.00PM"`, `"5.30AM"` | Overrides current time-of-day (session live/upcoming logic, bonus windows) |
| `forceTime` | Paid dashboard | integer (minutes since midnight IST) | Overrides current time-of-day |
| `forceDay` | Paid dashboard | integer (0=Sun … 6=Sat) | Overrides current day-of-week |
| `forceLang` | Paid dashboard | `"Telugu"` \| `"English"` | Overrides language |
| `forceWeek` | Paid dashboard | integer | Overrides week number (Telugu/English Face Yoga alternation) |

`forceDay` means different things on the free vs. paid path — read as day-of-batch on `free_active`, day-of-week on `paid`.

#### Examples

| URL | What it shows |
|---|---|
| `/9999999999?preview_dashboard=coming_soon&preview_programme=21day` | "English is Coming Soon!" modal |
| `/9999999999?preview_dashboard=onboarding&preview_programme=21day` | Batch-not-started screen |
| `/9999999999?preview_dashboard=free_active&preview_programme=21day` | Free batch, day 1, current real time |
| `/9999999999?preview_dashboard=free_active&preview_programme=21day&forceDay=15&time=8.45pm` | Free batch, day 15, 8:45 PM |
| `/9999999999?preview_dashboard=paid&preview_programme=21day` | Paid dashboard, Telugu, 12-month plan |
| `/9999999999?preview_dashboard=paid&preview_programme=21day&forceLang=English` | Paid dashboard, English |
| `/9999999999?preview_dashboard=paid&preview_programme=21day&forceDay=0&forceTime=690&forceWeek=0` | Paid, Sunday 11:30 AM, Telugu Face Yoga week → Face Yoga bonus card |
| `/9999999999?preview_dashboard=paid&preview_programme=21day&forceTime=1200` | Paid, 8:00 PM → Diet Session bonus card |
| `/9999999999?preview_dashboard=pastdue&preview_programme=21day` | Subscription expired screen |

`forceWeek` matters for Face Yoga since it alternates Telugu/English by week (`diffWeeks % 2 === 0` → Telugu week); pin it so the bonus card shows deterministically instead of depending on today's real date.

## Your Yoga Journey tab (`/:mobile`, journey tab)

`TwentyOneDaysProgram.tsx`, the second tab inside `Dashboard.tsx`.

### `?preview_levels=<days>`

Forces `daysAttended` (0–21), which drives which of the 7 levels is unlocked/in-progress. Also forces the journey tab open directly, bypassing the real eligibility check (batch date + status) that normally gates it.

Example: `/9999999999?preview_levels=9`

`forceDay`/`time` do **not** affect this tab — they're reserved for the Live Sessions tab (below). Since `Dashboard.tsx` mounts both tabs against the same URL, `preview_levels` is kept as a distinct param specifically so a Live Sessions preview URL can't accidentally also force the Journey tab's day, and vice versa.

## Referrals page (`/:mobile/referrals`, `/referral-status`)

`ReferralStatus.tsx`.

### `?preview_referrals=<count>`

Generates `<count>` mock verified referrals, so the milestone card (Free Diet PDF at 1, Healthyday T-shirt at 20) and referral list can be checked at any count without a real referrer.

Example: `/9999999999/referrals?preview_referrals=25`

## Attendance page (`/:mobile/attendance`, `/attendance-page`)

`AttendancePage.tsx`.

### `?preview=paid`

Simulates a paid student with a Thu/Fri/Sat class schedule and some attendance history.

Example: `/attendance-page?preview=paid`

## Recordings page (`/:mobile/recordings`)

`AllRecordings.tsx`.

### `?preview=<key>`

| Key | State |
|---|---|
| `paid` | Paid student, Telugu |
| `english` | Paid student, English |
| `3month` | Paid student, Telugu, 3-month plan |

Example: `/9999999999/recordings?preview=english`
