# Graph Report - dashboard-test-healthyday  (2026-07-07)

## Corpus Check
- 139 files · ~297,713 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 879 nodes · 1112 edges · 85 communities (70 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8ae4405d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_dependencies  class-variance-authority|dependencies / class-variance-authority]]
- [[_COMMUNITY_useIsMobile()  input.tsx|useIsMobile() / input.tsx]]
- [[_COMMUNITY_NoSessionsCard()  NoSessionsCardProps|NoSessionsCard() / NoSessionsCardProps]]
- [[_COMMUNITY_devDependencies  autoprefixer|devDependencies / autoprefixer]]
- [[_COMMUNITY_AttendancePage()  DAY_ABBR_TO_DOW|AttendancePage() / DAY_ABBR_TO_DOW]]
- [[_COMMUNITY_Action  ActionType|Action / ActionType]]
- [[_COMMUNITY_compilerOptions  allowImportingTsExtensions|compilerOptions / allowImportingTsExtensions]]
- [[_COMMUNITY_clsx  cn()|clsx / cn()]]
- [[_COMMUNITY_NavLink  NavLinkCompatProps|NavLink / NavLinkCompatProps]]
- [[_COMMUNITY_command.tsx  dialog.tsx|command.tsx / dialog.tsx]]
- [[_COMMUNITY_components.json  aliases|components.json / aliases]]
- [[_COMMUNITY_compilerOptions  allowImportingTsExtensions|compilerOptions / allowImportingTsExtensions]]
- [[_COMMUNITY_form.tsx  label.tsx|form.tsx / label.tsx]]
- [[_COMMUNITY_carousel.tsx  Carousel|carousel.tsx / Carousel]]
- [[_COMMUNITY_compilerOptions  allowJs|compilerOptions / allowJs]]
- [[_COMMUNITY_menubar.tsx  Menubar|menubar.tsx / Menubar]]
- [[_COMMUNITY_AllRecordings()  cleanSessionName()|AllRecordings() / cleanSessionName()]]
- [[_COMMUNITY_chart.tsx  ChartConfig|chart.tsx / ChartConfig]]
- [[_COMMUNITY_dropdown-menu.tsx  DropdownMenuCheckboxItem|dropdown-menu.tsx / DropdownMenuCheckboxItem]]
- [[_COMMUNITY_context-menu.tsx  ContextMenuCheckboxItem|context-menu.tsx / ContextMenuCheckboxItem]]
- [[_COMMUNITY_table.tsx  Table|table.tsx / Table]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_navigation-menu.tsx  NavigationMenu|navigation-menu.tsx / NavigationMenu]]
- [[_COMMUNITY_select.tsx  SelectContent|select.tsx / SelectContent]]
- [[_COMMUNITY_breadcrumb.tsx  Breadcrumb|breadcrumb.tsx / Breadcrumb]]
- [[_COMMUNITY_drawer.tsx  Drawer()|drawer.tsx / Drawer()]]
- [[_COMMUNITY_card.tsx  Card|card.tsx / Card]]
- [[_COMMUNITY_toggle-group.tsx  toggle.tsx|toggle-group.tsx / toggle.tsx]]
- [[_COMMUNITY_alert.tsx  Alert|alert.tsx / Alert]]
- [[_COMMUNITY_input-otp.tsx  InputOTP|input-otp.tsx / InputOTP]]
- [[_COMMUNITY_settings.json  permissions|settings.json / permissions]]
- [[_COMMUNITY_db  handler()|db / handler()]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_tabs.tsx  TabsContent|tabs.tsx / TabsContent]]
- [[_COMMUNITY_avatar.tsx  Avatar|avatar.tsx / Avatar]]
- [[_COMMUNITY_badge.tsx  Badge()|badge.tsx / Badge()]]
- [[_COMMUNITY_fs  replacer.js|fs / replacer.js]]
- [[_COMMUNITY_textarea.tsx  Textarea|textarea.tsx / Textarea]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_env  vite.config.ts|env / vite.config.ts]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 71 edges
2. `compilerOptions` - 20 edges
3. `compilerOptions` - 14 edges
4. `Healthyday Project Memory` - 13 edges
5. `scripts` - 9 edges
6. `compilerOptions` - 9 edges
7. `safeSessionStorage` - 9 edges
8. `2. Test Scenarios` - 9 edges
9. `safeLocalStorage` - 7 edges
10. `trackSessionClick()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `cn()` --calls--> `clsx`  [INFERRED]
  src/lib/utils.ts → package.json
- `Index()` --calls--> `getBonusInfo()`  [INFERRED]
  src/pages/Index.tsx → src/components/FourteenDayBonusSessionCard.tsx
- `IndexTwentyOneDay()` --calls--> `getBonusInfo()`  [INFERRED]
  src/pages/IndexTwentyOneDay.tsx → src/components/FourteenDayBonusSessionCard.tsx
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Communities (85 total, 15 thin omitted)

### Community 0 - "dependencies / class-variance-authority"
Cohesion: 0.04
Nodes (52): dependencies, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, firebase-admin, @fontsource/outfit (+44 more)

### Community 1 - "useIsMobile() / input.tsx"
Cohesion: 0.05
Nodes (38): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader() (+30 more)

### Community 2 - "NoSessionsCard() / NoSessionsCardProps"
Cohesion: 0.13
Nodes (9): Milestone, ReferralMilestonesCard(), ReferralMilestonesCardProps, ApiReferral, getDisplayName(), MILESTONES, ReferralRow(), ReferralsApiData (+1 more)

### Community 3 - "devDependencies / autoprefixer"
Cohesion: 0.05
Nodes (38): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, jsdom (+30 more)

### Community 4 - "AttendancePage() / DAY_ABBR_TO_DOW"
Cohesion: 0.24
Nodes (9): AttendanceGrid(), AttendanceGridProps, DayStatus, DayStatusBox(), DayStatusBoxProps, WeeklyAttendanceCard(), WeeklyAttendanceCardProps, WEEK_DAY_LABELS (+1 more)

### Community 5 - "Action / ActionType"
Cohesion: 0.11
Nodes (24): Action, ActionType, actionTypes, addToRemoveQueue(), dispatch(), genId(), listeners, memoryState (+16 more)

### Community 6 - "compilerOptions / allowImportingTsExtensions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleDetection (+14 more)

### Community 7 - "clsx / cn()"
Cohesion: 0.19
Nodes (15): cn(), ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination(), PaginationContent, PaginationEllipsis() (+7 more)

### Community 8 - "NavLink / NavLinkCompatProps"
Cohesion: 0.09
Nodes (14): NavLink, NavLinkCompatProps, getCurrentMinutesIST(), parseTimeStringToMinutes(), Checkbox, HoverCardContent, PopoverContent, Progress (+6 more)

### Community 9 - "command.tsx / dialog.tsx"
Cohesion: 0.12
Nodes (15): Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+7 more)

### Community 10 - "components.json / aliases"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 11 - "compilerOptions / allowImportingTsExtensions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+7 more)

### Community 12 - "form.tsx / label.tsx"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 13 - "carousel.tsx / Carousel"
Cohesion: 0.13
Nodes (13): Button, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext (+5 more)

### Community 14 - "compilerOptions / allowJs"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, baseUrl, noImplicitAny, noUnusedLocals, noUnusedParameters, paths, skipLibCheck (+4 more)

### Community 15 - "menubar.tsx / Menubar"
Cohesion: 0.17
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 16 - "AllRecordings() / cleanSessionName()"
Cohesion: 0.21
Nodes (7): AllRecordings(), cleanSessionName(), englishVideos, extractYouTubeId(), findSessionLink(), SessionLink, teluguVideos

### Community 17 - "chart.tsx / ChartConfig"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 18 - "dropdown-menu.tsx / DropdownMenuCheckboxItem"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 19 - "context-menu.tsx / ContextMenuCheckboxItem"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 20 - "table.tsx / Table"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 21 - "Community 21"
Cohesion: 0.27
Nodes (6): englishFaqs, generalFaqs, teluguFaqs, AccordionContent, AccordionItem, AccordionTrigger

### Community 22 - "navigation-menu.tsx / NavigationMenu"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 23 - "select.tsx / SelectContent"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 24 - "breadcrumb.tsx / Breadcrumb"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 25 - "drawer.tsx / Drawer()"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 26 - "card.tsx / Card"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 27 - "toggle-group.tsx / toggle.tsx"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 28 - "alert.tsx / Alert"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 29 - "input-otp.tsx / InputOTP"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 30 - "settings.json / permissions"
Cohesion: 0.40
Nodes (4): permissions, additionalDirectories, allow, defaultMode

### Community 33 - "tabs.tsx / TabsContent"
Cohesion: 0.07
Nodes (27): ALL_SLOTS, EVENING_SLOTS, FourteenDaySessionCard(), FourteenDaySessionCardProps, getCurrentTotalMin(), MORNING_SLOTS, parseTimeParam(), NoSessionsCardProps (+19 more)

### Community 34 - "avatar.tsx / Avatar"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 35 - "badge.tsx / Badge()"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 37 - "textarea.tsx / Textarea"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 38 - "Community 38"
Cohesion: 0.40
Nodes (4): BatchProgressSection(), BatchProgressSectionProps, ReferAndWinTeaser(), ReferAndWinTeaserProps

### Community 53 - "Community 53"
Cohesion: 0.12
Nodes (15): BONUS_DAYS_ENGLISH, BONUS_DAYS_TELUGU, BonusInfo, BonusThumbnails, FourteenDayBonusSessionCard(), FourteenDayBonusSessionCardProps, getBonusInfo(), englishVideos (+7 more)

### Community 54 - "Community 54"
Cohesion: 0.06
Nodes (13): DAY_ABBR_TO_DOW, fmt(), getWeekMonday(), mergePaidDataToStorage(), MONTH_NAMES, WEEK_HEADERS, DIET_PDF_URL, LeaderboardEntry (+5 more)

### Community 55 - "Community 55"
Cohesion: 0.11
Nodes (11): getOrdinalSuffix(), HeroBannerWithTabs(), HeroBannerWithTabsProps, MONTHS, SPECIAL_DAY_MESSAGES, BADGE_CARD_DATA, BADGE_SUBTEXT_COMPLETED, BADGE_SUBTEXT_INPROGRESS (+3 more)

### Community 56 - "Community 56"
Cohesion: 0.13
Nodes (11): LEVEL_CARD_DATA, LEVEL_REWARDS, LevelCard(), englishVideos, getNextMonday(), getOrdinalSuffix(), Index(), IndexProps (+3 more)

### Community 57 - "Community 57"
Cohesion: 0.11
Nodes (17): 14-day `IndexFourteenDays.tsx` — `forceDay` and `time` only, 21-day `IndexTwentyOneDay.tsx` — full preview param set (unchanged), Attendance page (`/:mobile/attendance`, `/attendance-page`), Examples, Fine-tuning params (work standalone or on top of `preview_dashboard`), Live Sessions tab (`/`, `/:mobile`), Paid dashboard `IndexPaid.tsx` — `forcePaidDay` and `time`, `?preview_dashboard=<key>` (+9 more)

### Community 58 - "Community 58"
Cohesion: 0.12
Nodes (15): Backend/API Shape, code:text (src/), Core Product Logic, Dev Server and Build, Healthyday Project Memory, How To Use This Note, Important Files, Main Structure (+7 more)

### Community 59 - "Community 59"
Cohesion: 0.16
Nodes (10): buildPreviewDashboardData(), englishVideos, getNextMonday(), getOrdinalSuffix(), IndexTwentyOneDay(), IndexTwentyOneDayProps, START_DATE_MONTHS, StartDateLabel() (+2 more)

### Community 60 - "Community 60"
Cohesion: 0.13
Nodes (7): ErrorBoundary, Props, State, c, queryClient, renderPreview(), text

### Community 61 - "Community 61"
Cohesion: 0.14
Nodes (13): 1. Structural Map (Paid User), 2. Test Scenarios, A. General & Initialization, B. Regular Yoga Session, C. Bonus Special Sessions, D. Class Recordings (`/all-recordings`), E. Grocery List (12-Month Plan Feature), F. Weekly Attendance (+5 more)

### Community 62 - "Community 62"
Cohesion: 0.15
Nodes (12): 📅 1. Regular Live Yoga Sessions, 🎁 2. Special Bonus Sessions (Day 3, 5, 7, 10, 14), 🗺️ 3. Day-by-Day Dashboard Structure Map, 🛠️ 4. Attendance Day Box Status Logic, 🎁 5. Referral Milestone Rewards, 📋 Bonus Sessions Table, code:typescript (const dayStatus = Array.from({ length: 14 }, (_, i) => {), ⏰ Daily Timings (IST) (+4 more)

### Community 63 - "Community 63"
Cohesion: 0.21
Nodes (6): safeLocalStorage, safeSessionStorage, getTrackedKey(), trackVisit(), COUNTRIES, COUNTRIES

### Community 64 - "Community 64"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 65 - "Community 65"
Cohesion: 0.18
Nodes (10): ✅ All Paid Users (Telugu + English), code:block1 (status === "paid"), Diet Session (12-Month users only), 🇬🇧 English (4 Videos), Logic Summary, 📹 Paid User — Recordings Reference, Quick Reference: All Session Links, Section 1: Most Recent Session Recordings (+2 more)

### Community 66 - "Community 66"
Cohesion: 0.20
Nodes (7): PlanRenewalSection(), PlanRenewalSectionProps, features, ongoingPlans, paidPlans, plans, PricingAndComparisonSection()

### Community 69 - "Community 69"
Cohesion: 0.29
Nodes (5): ALL_REF_MILESTONES, getRefWindow(), ReferralProgressBar(), ReferWinPopup(), ReferWinPopupProps

### Community 70 - "Community 70"
Cohesion: 0.29
Nodes (6): 🆓 1. Free Student Schedule (21-Day Journey), 👑 2. Paid Student Schedule (14-Day Journey), Bonus Sessions Documentation, 🔵 English Schedule, How to Test Locally, 🟢 Telugu Schedule

### Community 72 - "Community 72"
Cohesion: 0.40
Nodes (4): { container }, dayBoxes, queryClient, statusDiv

## Knowledge Gaps
- **481 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+476 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `clsx / cn()` to `dependencies / class-variance-authority`, `useIsMobile() / input.tsx`, `Action / ActionType`, `NavLink / NavLinkCompatProps`, `command.tsx / dialog.tsx`, `form.tsx / label.tsx`, `carousel.tsx / Carousel`, `menubar.tsx / Menubar`, `chart.tsx / ChartConfig`, `dropdown-menu.tsx / DropdownMenuCheckboxItem`, `context-menu.tsx / ContextMenuCheckboxItem`, `table.tsx / Table`, `Community 21`, `navigation-menu.tsx / NavigationMenu`, `select.tsx / SelectContent`, `breadcrumb.tsx / Breadcrumb`, `drawer.tsx / Drawer()`, `card.tsx / Card`, `toggle-group.tsx / toggle.tsx`, `alert.tsx / Alert`, `input-otp.tsx / InputOTP`, `avatar.tsx / Avatar`, `badge.tsx / Badge()`, `textarea.tsx / Textarea`, `Community 64`, `Community 67`?**
  _High betweenness centrality (0.246) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies / class-variance-authority` to `devDependencies / autoprefixer`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `clsx` connect `dependencies / class-variance-authority` to `clsx / cn()`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _481 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies / class-variance-authority` be split into smaller, more focused modules?**
  _Cohesion score 0.038461538461538464 - nodes in this community are weakly interconnected._
- **Should `useIsMobile() / input.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.04927536231884058 - nodes in this community are weakly interconnected._
- **Should `NoSessionsCard() / NoSessionsCardProps` be split into smaller, more focused modules?**
  _Cohesion score 0.1323529411764706 - nodes in this community are weakly interconnected._