import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { safeSessionStorage } from "@/lib/storage";
import { DietDateTabBar, type DietDateTab } from "@/components/DietDateTabBar";
import { DietMealCard, DietMealCardSkeleton } from "@/components/DietMealCard";
import { GroceryListButton } from "@/components/GroceryListButton";
import { getResolvedTabPlans, parseIsoDateKey, type Language } from "@/data/diet";

const WEEKDAY_ABBR = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    // Same `?preview=paid` canned-data idiom as AttendancePageWeekly.tsx — lets QA (and this
    // page itself) be previewed without a live backend/paid account.
    if (previewMode === "paid") {
      setStudentData({ language: "Telugu", status: "paid" });
      setLoading(false);
      return;
    }

    if (!mobile) {
      setLoading(false);
      setError("No mobile number provided.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiMobile = `+${mobile}`;
        const response = await fetch(`/.netlify/functions/student?mobile=${encodeURIComponent(apiMobile)}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();

        if (data.status !== "paid") {
          navigate(`/${mobile}`);
          return;
        }

        setStudentData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mobile, previewMode, navigate]);

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

  const dayPlans = getResolvedTabPlans(todayOverride, language);
  const tabs: DietDateTab[] = dayPlans.map((plan, idx) => {
    const [dd, mm, yyyy] = plan.displayDate.split("-");
    const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    const label = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : WEEKDAY_ABBR[(date.getDay() + 6) % 7];
    return { dateKey: plan.dateKey, label, dayOfMonth: dd, disabled: plan.disabled };
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

  const activePlan = dayPlans[activeTabIdx] ?? dayPlans[0];

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
    return `/${mobile}/diet/${activePlan.dateKey}/${slotId}?${params.toString()}`;
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

  const showSkeleton = loading || !studentData;

  return (
    <div className="hd-page bg-white font-['Outfit']">
      <header className="hd-header fixed left-0 right-0 top-0 z-20 mx-auto max-w-[412px] bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>
      {/* Spacer for the fixed header above, so content doesn't start underneath it. */}
      <div className="h-[68px]" />

      <DietDateTabBar tabs={tabs} activeIdx={activeTabIdx} onChange={handleTabChange} disabled={showSkeleton} />

      <div className={`pt-5 ${showSkeleton ? "pb-6" : "pb-[90px]"}`}>
        {showSkeleton
          ? Array.from({ length: 8 }, (_, i) => <DietMealCardSkeleton key={i} />)
          : activePlan.meals.map((meal) => (
              <DietMealCard key={meal.slotId} meal={meal} onClick={() => navigate(buildDetailUrl(meal.slotId))} />
            ))}
      </div>

      {!showSkeleton && activePlan.meals.some((meal) => meal.groceryListAvailable) && <GroceryListButton />}
    </div>
  );
};

export default Diet;
