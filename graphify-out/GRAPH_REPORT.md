# Graph Report - .  (2026-05-23)

## Corpus Check
- 137 files · ~218,270 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 571 nodes · 686 edges · 53 communities (48 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_alert-dialog.tsx  AlertDialogAction|alert-dialog.tsx / AlertDialogAction]]
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
- [[_COMMUNITY_accordion.tsx  AccordionContent|accordion.tsx / AccordionContent]]
- [[_COMMUNITY_tabs.tsx  TabsContent|tabs.tsx / TabsContent]]
- [[_COMMUNITY_avatar.tsx  Avatar|avatar.tsx / Avatar]]
- [[_COMMUNITY_badge.tsx  Badge()|badge.tsx / Badge()]]
- [[_COMMUNITY_fs  replacer.js|fs / replacer.js]]
- [[_COMMUNITY_textarea.tsx  Textarea|textarea.tsx / Textarea]]
- [[_COMMUNITY_radio-group.tsx  RadioGroup|radio-group.tsx / RadioGroup]]
- [[_COMMUNITY_env  vite.config.ts|env / vite.config.ts]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 71 edges
2. `compilerOptions` - 20 edges
3. `compilerOptions` - 14 edges
4. `compilerOptions` - 9 edges
5. `scripts` - 8 edges
6. `tailwind` - 6 edges
7. `aliases` - 6 edges
8. `buttonVariants` - 6 edges
9. `Toast` - 4 edges
10. `useToast()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `cn()` --calls--> `clsx`  [INFERRED]
  src/lib/utils.ts → package.json
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `BreadcrumbSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts

## Communities (53 total, 5 thin omitted)

### Community 0 - "dependencies / class-variance-authority"
Cohesion: 0.04
Nodes (51): dependencies, class-variance-authority, cmdk, date-fns, embla-carousel-react, firebase-admin, @fontsource/outfit, @hookform/resolvers (+43 more)

### Community 1 - "useIsMobile() / input.tsx"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader() (+29 more)

### Community 2 - "NoSessionsCard() / NoSessionsCardProps"
Cohesion: 0.06
Nodes (20): NoSessionsCardProps, features, plans, PricingAndComparisonSection(), Milestone, ReferralMilestonesCard(), ReferralMilestonesCardProps, ReferWinCardProps (+12 more)

### Community 3 - "devDependencies / autoprefixer"
Cohesion: 0.06
Nodes (34): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, jsdom (+26 more)

### Community 4 - "AttendancePage() / DAY_ABBR_TO_DOW"
Cohesion: 0.06
Nodes (17): DAY_ABBR_TO_DOW, fmt(), getWeekMonday(), mergePaidDataToStorage(), MONTH_NAMES, WEEK_HEADERS, queryClient, c (+9 more)

### Community 5 - "Action / ActionType"
Cohesion: 0.11
Nodes (24): Action, ActionType, actionTypes, addToRemoveQueue(), dispatch(), genId(), listeners, memoryState (+16 more)

### Community 6 - "compilerOptions / allowImportingTsExtensions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleDetection (+14 more)

### Community 7 - "clsx / cn()"
Cohesion: 0.17
Nodes (17): clsx, cn(), Button, ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination() (+9 more)

### Community 8 - "NavLink / NavLinkCompatProps"
Cohesion: 0.11
Nodes (10): NavLink, NavLinkCompatProps, Checkbox, HoverCardContent, PopoverContent, Progress, ScrollArea, ScrollBar (+2 more)

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
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

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

### Community 21 - "alert-dialog.tsx / AlertDialogAction"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

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
Cohesion: 0.50
Nodes (3): permissions, additionalDirectories, allow

### Community 32 - "accordion.tsx / AccordionContent"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 33 - "tabs.tsx / TabsContent"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 34 - "avatar.tsx / Avatar"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 35 - "badge.tsx / Badge()"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

## Knowledge Gaps
- **364 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+359 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `clsx / cn()` to `useIsMobile() / input.tsx`, `AttendancePage() / DAY_ABBR_TO_DOW`, `Action / ActionType`, `NavLink / NavLinkCompatProps`, `command.tsx / dialog.tsx`, `form.tsx / label.tsx`, `carousel.tsx / Carousel`, `menubar.tsx / Menubar`, `chart.tsx / ChartConfig`, `dropdown-menu.tsx / DropdownMenuCheckboxItem`, `context-menu.tsx / ContextMenuCheckboxItem`, `table.tsx / Table`, `alert-dialog.tsx / AlertDialogAction`, `navigation-menu.tsx / NavigationMenu`, `select.tsx / SelectContent`, `breadcrumb.tsx / Breadcrumb`, `drawer.tsx / Drawer()`, `card.tsx / Card`, `toggle-group.tsx / toggle.tsx`, `alert.tsx / Alert`, `input-otp.tsx / InputOTP`, `accordion.tsx / AccordionContent`, `tabs.tsx / TabsContent`, `avatar.tsx / Avatar`, `badge.tsx / Badge()`, `textarea.tsx / Textarea`, `radio-group.tsx / RadioGroup`?**
  _High betweenness centrality (0.422) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies / class-variance-authority` to `devDependencies / autoprefixer`, `clsx / cn()`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Why does `clsx` connect `clsx / cn()` to `dependencies / class-variance-authority`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _364 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies / class-variance-authority` be split into smaller, more focused modules?**
  _Cohesion score 0.0392156862745098 - nodes in this community are weakly interconnected._
- **Should `useIsMobile() / input.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0507399577167019 - nodes in this community are weakly interconnected._
- **Should `NoSessionsCard() / NoSessionsCardProps` be split into smaller, more focused modules?**
  _Cohesion score 0.05758582502768549 - nodes in this community are weakly interconnected._