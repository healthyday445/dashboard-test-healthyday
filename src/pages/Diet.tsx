import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import logo from "@/assets/Primary_logo.svg";
import { safeSessionStorage } from "@/lib/storage";
import { useStudentData } from "@/hooks/use-student-data";
import { DietDateTabBar, type DietDateTab } from "@/components/DietDateTabBar";
import { DietMealCard, DietMealCardSkeleton } from "@/components/DietMealCard";
import { DietMealFiller } from "@/components/DietMealFiller";
import { GroceryListButton } from "@/components/GroceryListButton";
import {
  fetchDietPlan,
  getTabDates,
  toIsoDateKey,
  isDateDisabled,
  parseIsoDateKey,
  MEAL_FILLERS_AFTER_SLOT,
  type Language,
} from "@/data/diet";

const WEEKDAY_ABBR = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Stable object identity (not an inline literal) so the redirect useEffect below doesn't
// see a "new" studentData on every render while in preview mode.
const PREVIEW_STUDENT_DATA = { language: "Telugu", status: "paid" };

/** Paid-students-only diet page: 5 date tabs (Today/Tomorrow/+3), each a scrollable list of meals. */
const Diet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile: urlMobile } = useParams<{ mobile: string }>();
  const searchParams = new URLSearchParams(location.search);
  const mobile = urlMobile || searchParams.get("mobile") || safeSessionStorage.getItem("referrer_mobile") || "";

  const forceDay = searchParams.get("forceDay");
  const previewDate = searchParams.get("previewDate");
  const timeOverride = searchParams.get("time");
  const languageOverride = searchParams.get("language");
  const previewMode = searchParams.get("preview");
  const dateParam = searchParams.get("date");
  const initialTab = parseInt(searchParams.get("tab") ?? "0", 10);

  // Same `?preview=paid` canned-data idiom as AttendancePageWeekly.tsx — lets QA (and this
  // page itself) be previewed without a live backend/paid account, and skips the network
  // call entirely (`enabled: !isPreview` below).
  const isPreview = previewMode === "paid";
  const studentQuery = useStudentData(mobile, !isPreview);
  const studentData = isPreview ? PREVIEW_STUDENT_DATA : studentQuery.data;
  const loading = !isPreview && studentQuery.isLoading;
  const error = !isPreview && !mobile
    ? "No mobile number provided."
    : studentQuery.error instanceof Error ? studentQuery.error.message : null;

  useEffect(() => {
    if (!isPreview && studentData && studentData.status !== "paid") {
      navigate(`/${mobile}`);
    }
  }, [isPreview, studentData, mobile, navigate]);

  // `previewDate` sets "today" directly to a specific calendar date (e.g. ?previewDate=2026-08-08)
  // — the most direct way to preview a specific day. `forceDay` simulates "today" as a day
  // offset from the diet launch date instead (same QA-preview idiom as ?forceDay= elsewhere in
  // this app, e.g. Grace.tsx). previewDate wins when both are present, since it's unambiguous.
  const todayOverride = (() => {
    if (previewDate !== null) {
      const parsed = parseIsoDateKey(previewDate);
      return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    }
    if (forceDay === null) return undefined;
    const offset = parseInt(forceDay, 10);
    if (!Number.isFinite(offset)) return undefined;
    const d = new Date(2026, 7, 3);
    d.setDate(d.getDate() + offset);
    return d;
  })();
  void timeOverride; // reserved for future time-of-day-aware diet logic; not needed yet

  // Matches the language resolution already used elsewhere for this student (e.g. IndexPaid.tsx),
  // with a `?language=English|Telugu` QA-preview override that wins regardless of the real
  // student record — lets QA check both languages without needing two different test accounts.
  const language: Language =
    languageOverride === "English" || languageOverride === "Telugu"
      ? languageOverride
      : studentData?.language === "English" ? "English" : "Telugu";

  const showSkeleton = loading || !studentData;

  // Tab metadata (date/label/disabled) is derived purely locally — `DIET_DISABLED_FROM_DATE`
  // is a manually-maintained constant, not live API data — so the tab strip itself never
  // waits on a network call. Only each tab's meal list is fetched, lazily per date.
  const tabDates = getTabDates(todayOverride, 5);
  const tabDateKeys = tabDates.map(toIsoDateKey);
  const tabs: DietDateTab[] = tabDates.map((date, idx) => {
    const dateKey = tabDateKeys[idx];
    const label = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : WEEKDAY_ABBR[(date.getDay() + 6) % 7];
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    return { dateKey, label, dayOfMonth, disabled: isDateDisabled(dateKey) };
  });

  // `?date=DD` (2-digit day-of-month, e.g. "?date=11") targets an absolute calendar date rather
  // than a sliding-window tab index — meant for links (e.g. WhatsApp reminders) sent one day and
  // opened another. Day-of-month alone is unambiguous here since the visible window is only 5
  // consecutive days, so no two tabs ever share the same day-of-month. Wins over `tab` when both
  // are present. If the target date has scrolled out of the window (link opened too late), falls
  // straight through to the `tab` param / "Today" like a normal visit.
  const dayParam = dateParam !== null ? parseInt(dateParam, 10) : NaN;
  const dateTabIdx = Number.isFinite(dayParam) ? tabs.findIndex((t) => Number(t.dayOfMonth) === dayParam) : -1;

  const [activeTabIdx, setActiveTabIdx] = useState(() => {
    if (dateTabIdx !== -1) return dateTabIdx;
    return Number.isFinite(initialTab) && initialTab >= 0 && initialTab <= 4 ? initialTab : 0;
  });

  const activeDateKey = tabDateKeys[activeTabIdx] ?? tabDateKeys[0];

  // Only the active tab's date is ever fetched — switching tabs changes the query key,
  // which react-query fetches lazily and then caches, so flipping back to a date already
  // visited this session is instant with no refetch.
  const planQuery = useQuery({
    queryKey: ["diet-plan", activeDateKey, language],
    queryFn: () => fetchDietPlan(activeDateKey, language),
    enabled: !showSkeleton,
    // Without this, React Query's default staleTime (0) marks the data stale the instant
    // it lands, so flipping back to an already-visited tab still fires a background
    // refetch — defeating the point of caching per date. The nutrition sheet doesn't
    // change mid-session, so 5 minutes of staleness is a safe tradeoff.
    staleTime: 5 * 60 * 1000,
  });
  const activeMeals = planQuery.data?.meals ?? [];
  const showMealSkeleton = showSkeleton || planQuery.isLoading;

  // Keeps the URL's `tab` param in sync with the selected date tab via `replace` (never a new
  // history entry just for switching tabs). Without this, the history entry for this page keeps
  // whatever `tab` value it had when first pushed (e.g. "today"), so returning here via the native
  // back button after opening a meal detail would drop the user back on the wrong date tab.
  const handleTabChange = (idx: number) => {
    setActiveTabIdx(idx);
    const params = new URLSearchParams(location.search);
    params.set("tab", String(idx));
    params.delete("date"); // manual tab switch supersedes the one-shot `?date=` link target
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  };

  const buildDetailUrl = (slotId: string) => {
    const params = new URLSearchParams();
    params.set("tab", String(activeTabIdx));
    if (previewDate !== null) params.set("previewDate", previewDate);
    if (forceDay !== null) params.set("forceDay", forceDay);
    if (timeOverride !== null) params.set("time", timeOverride);
    if (languageOverride !== null) params.set("language", languageOverride);
    return `/${mobile}/diet/${activeDateKey}/${slotId}?${params.toString()}`;
  };

  if (error) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center font-['Outfit']">
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="max-w-[340px] rounded-xl border border-[#FFD4D4] bg-[#FFF3F3] p-6 text-center">
          <p className="mb-2 text-base font-bold text-[#D32F2F]">Oops!</p>
          <p className="text-sm font-normal text-[#666]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hd-page bg-white font-['Outfit']">
      <header className="hd-header fixed left-0 right-0 top-0 z-20 mx-auto max-w-[412px] bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>
      {/* Spacer for the fixed header above, so content doesn't start underneath it. */}
      <div className="h-[68px]" />

      <DietDateTabBar tabs={tabs} activeIdx={activeTabIdx} onChange={handleTabChange} disabled={showSkeleton} />

      <div className={`pt-5 ${showMealSkeleton ? "pb-6" : "pb-[90px]"}`}>
        {showMealSkeleton
          ? Array.from({ length: 8 }, (_, i) => <DietMealCardSkeleton key={i} />)
          : activeMeals.map((meal) => {
              const filler = MEAL_FILLERS_AFTER_SLOT[meal.slotId];
              return (
                <Fragment key={meal.slotId}>
                  <DietMealCard meal={meal} onClick={() => navigate(buildDetailUrl(meal.slotId))} />
                  {filler && <DietMealFiller filler={filler} language={language} />}
                </Fragment>
              );
            })}
      </div>

      {!showMealSkeleton && <GroceryListButton />}
    </div>
  );
};

export default Diet;
