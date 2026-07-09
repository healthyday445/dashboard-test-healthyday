---
name: playwright-tester
description: >
  Automated E2E-only UI testing using Playwright's native test runner. Writes persistent .spec.ts test
  files under e2e/, runs them for free via `npx playwright test`, and reports failures — it does NOT
  auto-fix app or test code. Use this skill whenever the user wants to test this dashboard, check if a
  frontend flow works, run UI tests, verify form submissions, test browser interactions, do end-to-end
  testing, or validate that recent changes didn't break anything. Also triggers for "run my tests",
  "check the app in a browser", "does this page work", "test the happy path", or "find UI bugs". Prefer
  this over manually driving a browser and writing up a one-off Markdown report for anything that should
  stay regression-tested.
---

# Playwright Tester

Write Playwright test files, run them natively (zero AI tokens), and report what's broken. This skill
is **E2E only** — it does not write unit tests, and it does not auto-fix failures. When a test fails,
categorize it in the report and stop; the user decides what to fix.

## Why This Approach

There are three ways to do browser testing with AI:

1. **AI drives the browser live** — burns tokens on every click, every page load, every assertion
2. **Screenshot-based** (chrome-devtools MCP) — even worse, images are token-heavy and single-threaded.
   This repo's `*.local/report.md` + `screenshots/` folders (e.g. `paid-dashboard.local/`) are exactly
   this pattern — good for one-off exploratory verification, but they expire the moment the next
   feature ships since nothing is re-run automatically.
3. **AI writes tests, Playwright runs them** — tokens spent once on authoring, execution is free forever

This skill uses approach 3. The test files persist, grow over time into a regression suite, and run
in parallel via Playwright's native worker system.

## Project Setup (already done — don't redo)

- `@playwright/test` and `playwright` are installed (`^1.61.1`), Chromium browser binary installed.
- Config lives at `playwright.config.ts` (repo root): `testDir: "./e2e"`, `webServer` auto-boots
  `npm run dev` on `http://localhost:8080` (reuses the existing Vite proxy to the backend), a screenshot
  on every test (pass or fail — `screenshot: "on"`, intentionally not "only-on-failure", so a report
  gives full visual coverage like the old `*.local/report.md` screenshot folders did), trace on first retry.
- Two projects are configured: `mobile` (Galaxy S8+ emulation — 412x846, DPR 3.5 — matching the real
  device used for manual mobile testing) and `desktop` (Desktop Chrome, matching web/desktop testing).
  Both run in parallel by default whenever `npm run test:e2e` is invoked; this app is mobile-first
  (`/:mobile` routes), so new specs should pass on `mobile` at minimum. Use `--project=mobile` or
  `--project=desktop` to isolate one dimension while iterating.
- npm scripts: `npm run test:e2e`, `test:e2e:ui`, `test:e2e:report`, `test:e2e:update-snapshots`.
- **Local vs prod vs testprod target:** the same specs run against any of three targets from one
  config, switched by the `E2E_TARGET` env var — no separate config file per target.
  | Command | E2E_TARGET | baseURL | local dev server started? |
  |---|---|---|---|
  | `npm run test:e2e` | (unset) | `http://localhost:8080` | yes, auto-booted |
  | `npm run test:e2e:prod` | `prod` | `https://class.healthyday.co.in` | no |
  | `npm run test:e2e:testprod` | `testprod` | `https://test-portal-healthyday.netlify.app` | no |

  Reports/artifacts land in separate folders per target so one run never overwrites another's:
  `e2e-results.local/local/`, `e2e-results.local/prod/`, `e2e-results.local/testprod/` — open with
  `test:e2e:report`, `test:e2e:prod:report`, `test:e2e:testprod:report` respectively. Both remote
  targets get 1 retry by default (real network blips there shouldn't read as a failure the way they
  would against local dev).
- **Prod and testprod are real, live, shared deployments — be deliberate about what a spec actually
  does there.** Everything written so far only navigates and asserts visibility (read-only GETs) —
  safe to run against either freely. Before adding a spec that *clicks* something (join-session
  links, referral share buttons, PDF downloads, anything that calls `trackSessionClick`-style
  analytics), stop and flag it — that action would really happen against the live account when the
  prod/testprod command runs, not just in a local sandbox.
- Tests live in `e2e/*.spec.ts` (not `tests/e2e/`).

Only touch `playwright.config.ts` if a new requirement genuinely needs it (e.g. adding `webkit` for a
Safari-specific bug) — don't regenerate it from scratch.

## Real accounts first, preview params only for narrow overrides

**Default to real test accounts, not `preview_dashboard` mock-seeding.** This app has real backend
test accounts covering every program/state we need. They're maintained in
`e2e/fixtures/test-accounts.ts` — import from there, never hardcode a mobile number inline in a spec.
If a persona/state isn't in that file yet, **prompt the user for a test account** rather than
inventing one or falling back to mock data.

| program | language | example use |
|---|---|---|
| `21day` | Telugu / English | ongoing 21-day cohort (started 2026-06-21) |
| `14day` | Telugu / English | ongoing 14-day cohort, plus a future-start cohort for the pre-batch onboarding screen |
| `paid` | Telugu / English | paid dashboard (`IndexPaid.tsx`) |

On top of a real account, layer **preview params from `PREVIEWS.md`** only for the specific
thing under test that a real account can't pin down deterministically on its own — day-of-batch and
time-of-day (`forceDay`, `forcePaidDay`, `time`), journey levels (`preview_levels`), referral counts
(`preview_referrals`), or attendance state (`preview`). Don't reach for `preview_dashboard=...`
mock-seeding just to avoid using a real account — that param exists for states with genuinely no
matching real account (e.g. `pastdue`, `14day_completed`, `coming_soon`), not as the default entry
point. Example: `/{account.mobile}?forcePaidDay=0&time=11.45am` (real paid account + narrow day/time
override), not `/9999999999?preview_dashboard=paid&preview_programme=21day`.

## Workflow

### Phase 1: Assess

1. Check `e2e/fixtures/test-accounts.ts` for a real account matching the program/language under test.
   If none exists, ask the user for a mobile number before writing the spec — don't substitute
   `preview_dashboard` mock data for a missing real account without asking.
2. Check `PREVIEWS.md` for narrow override params relevant to the specific state being tested
   (day/time, levels, referral count, attendance).
3. Check `e2e/` for existing specs covering the same page — extend, don't duplicate.
4. Check `*.local/report.md` files (e.g. `paid-dashboard.local/report.md`) for already-verified manual
   test passes — these are ready-made scenario tables (state → expected result) that can be transcribed
   directly into a spec with zero new test design. Re-point them at a real account from the fixtures
   file if the original manual pass used a placeholder number.
5. If the user's ask is vague, prioritize pages with a `*.local` report first (highest confidence the
   assertions are correct), then pages with a real test account but no spec yet.

### Phase 2: Author Tests

Write `.spec.ts` files under `e2e/`, one file per page/flow:

```
e2e/
  smoke.spec.ts
  paid-dashboard.spec.ts        — IndexPaid.tsx, real paid account + forcePaidDay/time
  fourteen-day.spec.ts          — IndexFourteenDays.tsx, real 14day account + forceDay/time
  twenty-one-day.spec.ts        — IndexTwentyOneDay.tsx, real 21day account + forceDay/time
                                   (preview_dashboard/preview_programme only for states with no
                                   matching real account, e.g. pastdue, 14day_completed)
  journey-levels.spec.ts        — TwentyOneDaysProgram.tsx via preview_levels
  referrals.spec.ts             — ReferralStatus.tsx via preview_referrals
  attendance.spec.ts            — AttendancePage.tsx via preview
  recordings.spec.ts            — AllRecordings.tsx via preview
```

**Writing good tests:**

- Use Playwright's locator API — prefer `getByRole()`, `getByLabel()`, `getByText()` over CSS selectors,
  since they're resilient to markup/copy changes and match how a user actually finds elements.
- Each test should be independent — no shared state between tests, use `beforeEach` for setup.
- Name tests like requirements, mirroring the scenario tables in `*.local/report.md`, e.g.
  `test("Face Yoga live at 11:45 AM on forced Sunday shows Live Now")`.
- Assert on outcomes (visible text, navigation, network requests), not implementation details.
- One behavior per test; group related states for one page/component into one `describe` block.
- Run new specs against both `mobile` and `desktop` projects before considering them done.
- Import mobile numbers from `e2e/fixtures/test-accounts.ts` (e.g. `findAccount("paid", "English")`),
  never inline a raw number.
- Import `test`/`expect` from `./fixtures/test` (not `@playwright/test` directly) — this wraps
  `page.goto` so every navigation is recorded as a clickable URL annotation in the HTML report
  (visible per test, opens the exact state that was checked — dev server must be running to load it).

**When existing specs are found:**
- Read them first to understand coverage and patterns before adding to a file.
- Add new tests for uncovered states rather than rewriting what exists.
- Update broken tests only if the breakage is due to an intentional code change.

### Phase 3: Execute

```bash
npm run test:e2e -- --reporter=line
```

Useful flags:
- `--project=mobile` / `--project=desktop` — target one project during iteration.
- `--headed` — only if the user specifically wants to watch it run.
- `--trace on` — if a failure is confusing, rerun with a full trace for debugging.
- `npm run test:e2e:report` — opens the last HTML report; every test (pass or fail) has a screenshot
  attached, expand the test row to view it. Traces are attached on retry-after-failure only.

### Phase 4: Diagnose (no fixing — report only)

**Do not enter a fix loop. Do not edit app code or spec files to make a failing test pass.** Read each
failure and record it in the report:

1. **Read the failure output** — expected vs actual, the selector that failed, page state snippet.
2. **Categorize each failure** so the user can triage quickly:
   - **Test bug (suspected)** — wrong selector, timing issue, wrong preview param, incorrect expected
     value. Say why you think so, but leave the spec as-is.
   - **App bug (suspected)** — actual broken behavior in the application.
3. Do not rerun tests trying different fixes. One run, one report. The user reviews the report and
   tells you which failures to act on, if any, in a separate follow-up.

### Phase 5: Report

1. Summarize results in a table (pass/fail/skipped per project).
2. For every failure: test name, page/account/params used, expected vs actual, and your suspected
   category (test bug vs app bug) with a one-line reason — this is the list of "things breaking" the
   user asked for, not a to-do list you've already acted on.
3. Suggest the next highest-value page/flow to cover (cross-reference `PREVIEWS.md` and
   `e2e/fixtures/test-accounts.ts` for pages/personas without a spec yet).
4. Note any flaky tests (failed once, passed on a manual rerun) without rerunning automatically.

## Swarm Mode

For comprehensive coverage of a large page (e.g. porting all of `paid-dashboard.local/report.md`'s 17
scenarios) or covering several pages at once, spawn sub-agents to **write** specs in parallel, then run
the full suite once natively:

- One sub-agent per page/flow (e.g. paid dashboard, 21-day program, referrals) writing to its own file
  under `e2e/`.
- Once all agents finish, run `npm run test:e2e` once for the combined suite — Playwright's worker
  system parallelizes execution regardless of how many files were written.

Sub-agents spend tokens on test *design*; execution is free either way.

## Tips

- **Start from what's already verified.** A `*.local/report.md` scenario table is a pre-verified test
  plan — transcribing it is lower-risk than designing new assertions from scratch.
- **Don't over-test.** A focused suite per page beats testing every param combination in `PREVIEWS.md`.
- **The webServer config handles dev server startup** — never start `npm run dev` manually before running tests.
- **CI-ready.** These specs run in any CI pipeline with zero modification once one is added (there is
  currently no CI in this repo — see `testing-research.local/report.md` for the proposed GitHub Actions setup).
