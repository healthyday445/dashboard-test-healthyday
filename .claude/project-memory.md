# Healthyday Project Memory

This file is a working memory note for the `dashboard-test-healthyday` repo so future work can start from context instead of re-discovering the app structure.

## Project Type

- Vite + React + TypeScript app
- Tailwind CSS + shadcn/Radix UI primitives
- Mobile-first dashboard for Healthyday users
- Netlify deployment with Netlify Functions acting as API proxies

## Main Structure

```text
src/
  main.tsx                React entry point
  App.tsx                 providers + route table
  index.css               global styles and mobile layout helpers
  assets/                 imported app assets
  pages/                  main app screens
  components/             business components + ui primitives
  hooks/                  shared hooks
  lib/                    shared utilities
  test/                   Vitest setup/example test

public/                   static images and redirects
netlify/functions/        serverless proxy endpoints
dist/                     build output
```

## Routing

Defined in `src/App.tsx`.

- `/` -> `Index`
- `/:mobile` -> `Index`
- `/referral` -> `Referral`
- `/referral-status` -> `ReferralStatus`
- `/attendance-page` -> `AttendancePage`
- `/all-recordings` -> `AllRecordings`
- `*` -> `NotFound`

## Important Files

- `src/main.tsx`: mounts the app and loads Outfit font + global CSS
- `src/App.tsx`: wraps app with `QueryClientProvider`, tooltip/toast providers, and `BrowserRouter`
- `src/pages/Index.tsx`: biggest and most important screen; contains most dashboard logic
- `src/pages/Referral.tsx`: referral link sharing page
- `src/pages/ReferralStatus.tsx`: referral progress, rewards, recent referrals
- `src/pages/AttendancePage.tsx`: paid-user attendance calendar and session timings
- `src/pages/AllRecordings.tsx`: recordings and YouTube links
- `src/components/PricingAndComparisonSection.tsx`: pricing cards and comparison table
- `src/components/ReferralMilestonesCard.tsx`: referral milestone list UI
- `src/components/ReferWinPopup.tsx`: referral popup and progress bar
- `src/components/ShareReferralActions.tsx`: copy/share referral actions

## Core Product Logic

`src/pages/Index.tsx` is the primary dashboard and contains:

- mobile number lookup from route param
- `preview` query-param modes for local/demo rendering
- student fetch from `/.netlify/functions/student`
- `sessionStorage` use for referral state
- `localStorage` use for join-day tracking
- status-based UI branching

Key statuses used in the app:

- `registered`
- `14DaysOngoing`
- `14daysongoing`
- `paid`
- `pastdue`
- `14 day completed`

## Preview Modes

Handled in `src/pages/Index.tsx`.

- `batch`
- `sunday`
- `completed`
- `onboarding`
- `paid`
- `paidendsoon`
- `pastdue`
- `elapsed`
- `day1` through `day14`
- `w1pms` — Week 1, Post Morning Session, non-bonus day (Day 2 @ 10:00 AM)
- `w1pmsbonus` — Week 1, Post Morning Session, bonus day (Day 3 @ 10:00 AM)
- `w1pes` — Week 1, Post Evening Session, non-bonus day (Day 4 @ 8:00 PM)
- `w1pesbonus` — Week 1, Post Evening Session, bonus LIVE (Day 3 @ 8:40 PM)
- `w2pms` — Week 2, Post Morning Session, non-bonus day (Day 9 @ 10:00 AM)
- `w2pmsbonus` — Week 2, Post Morning Session, bonus day (Day 10 @ 10:00 AM)
- `w2pes` — Week 2, Post Evening Session, non-bonus day (Day 11 @ 8:00 PM)
- `w2pesbonus` — Week 2, Post Evening Session, bonus LIVE (Day 10 @ 8:40 PM)

## Styling Notes

- Mobile-first layout
- Main container uses `.hd-page` with max width around `412px`
- A lot of UI is built with inline styles rather than extracted reusable CSS
- Global app styles and design tokens live in `src/index.css`
- Tailwind config is in `tailwind.config.ts`

## UI Inventory

- `src/components/ui/` contains shadcn-style UI primitives
- At the time of mapping, there were 49 files in `src/components/ui`
- Custom business components live directly under `src/components/`

## Backend/API Shape

This repo does not contain the core backend. It talks to an external Healthyday backend through Netlify Functions.

### Netlify function endpoints

- `netlify/functions/student.js`
  - expects `mobile`
  - proxies to `/api/internal/student`

- `netlify/functions/referrals.js`
  - expects `mobile`
  - proxies to `/api/internal/student/referrals`

## Dev Server and Build

`package.json` scripts:

- `npm run dev`
- `npm run build`
- `npm run build:dev`
- `npm run lint`
- `npm run preview`
- `npm run test`
- `npm run test:watch`

`vite.config.ts`:

- dev server port `8080`
- alias `@` -> `./src`
- proxies the two Netlify function paths in local dev

`netlify.toml`:

- publish dir: `dist`
- functions dir: `netlify/functions`
- SPA redirect to `index.html`

## Maintenance Notes

- `src/pages/Index.tsx` is very large and should be treated as the highest-context file when changing dashboard behavior
- There are some text encoding artifacts in the codebase (for example mojibake like `â...`) that are not structural but are worth remembering during cleanup
- Tests are minimal right now; there is only a basic example test in `src/test/example.test.ts`

## How To Use This Note

Before re-exploring the whole repo, read this file first. Then only inspect the specific page/component/function relevant to the new task.
