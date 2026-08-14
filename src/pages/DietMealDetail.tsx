import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { safeSessionStorage } from "@/lib/storage";
import { getMealPlaceholderIcon } from "@/lib/dietCategoryIcon";
import { DietInfoCallout } from "@/components/DietInfoCallout";
import { DietIngredientList } from "@/components/DietIngredientList";
import { GroceryListButton } from "@/components/GroceryListButton";
import { getResolvedDayPlan, parseIsoDateKey } from "@/data/diet";
import type { MealSlotId, Language } from "@/data/diet";

const BackChevronIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M10.5 12.6 6.5 8.4l4-4.2" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Paid-students-only per-meal detail screen — hero + name, then whichever of
 *  Tips/Precautions/Recommended-Quantity/Nutritional-Benefits sections are curated
 *  for this meal (all four are independently optional). */
const DietMealDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile: urlMobile, date, slotId } = useParams<{ mobile: string; date: string; slotId: string }>();
  const searchParams = new URLSearchParams(location.search);
  const mobile = urlMobile || searchParams.get("mobile") || safeSessionStorage.getItem("referrer_mobile") || "";

  const previewMode = searchParams.get("preview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  // Parallax drift for the hero photo: it's `position: fixed` (see the render below) so
  // scrolling alone leaves it perfectly static, which reads as too rigid. Nudging it
  // upward at a fraction of the real scroll speed — via a ref + direct style mutation,
  // not React state, so this runs every scroll tick without re-rendering — gives it a
  // sense of depth while the content panel still catches up and covers it.
  const heroRef = useRef<HTMLDivElement>(null);
  const HERO_HEIGHT = 300;
  const PARALLAX_FACTOR = 0.50;

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!heroRef.current) return;
        const offset = Math.min(window.scrollY * PARALLAX_FACTOR, HERO_HEIGHT);
        heroRef.current.style.transform = `translate3d(0, ${-offset}px, 0)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

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

  const backUrl = (() => {
    const params = new URLSearchParams();
    if (searchParams.get("tab") !== null) params.set("tab", searchParams.get("tab")!);
    if (searchParams.get("previewDate") !== null) params.set("previewDate", searchParams.get("previewDate")!);
    if (searchParams.get("forceDay") !== null) params.set("forceDay", searchParams.get("forceDay")!);
    if (searchParams.get("time") !== null) params.set("time", searchParams.get("time")!);
    if (searchParams.get("language") !== null) params.set("language", searchParams.get("language")!);
    const qs = params.toString();
    return `/${mobile}/diet${qs ? `?${qs}` : ""}`;
  })();

  // Diet.tsx pushes exactly one history entry when opening a meal (see buildDetailUrl there),
  // so going "back" here must pop that same entry (navigate(-1)) rather than push a new one —
  // otherwise every meal opened piles up its own extra entry, and the native back button ends
  // up walking through every previously-viewed meal instead of going straight home. `location.key`
  // is `"default"` only when this page was the very first entry (direct link/refresh, no Diet
  // page to pop back into) — in that case there's nothing to pop, so replace instead.
  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(backUrl, { replace: true });
    }
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

  if (showSkeleton) {
    return (
      <div className="hd-page bg-white font-['Outfit']">
        <header className="hd-header fixed left-0 right-0 top-0 z-20 mx-auto max-w-[412px] bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>
        <div className="h-[68px]" />
        <Skeleton className="h-[300px] w-full rounded-none" />
        <div className="p-5">
          <Skeleton className="mx-auto mb-4 h-[22px] w-[60%] rounded" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  // Matches the language resolution already used elsewhere for this student (e.g. IndexPaid.tsx),
  // with a `?language=English|Telugu` QA-preview override that wins regardless of the real
  // student record — lets QA check both languages without needing two different test accounts.
  const languageOverride = searchParams.get("language");
  const language: Language =
    languageOverride === "English" || languageOverride === "Telugu"
      ? languageOverride
      : studentData?.language === "English" ? "English" : "Telugu";

  const plan = getResolvedDayPlan(parseIsoDateKey(date ?? ""), language);
  const meal = plan.meals.find((m) => m.slotId === (slotId as MealSlotId));

  if (!meal) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center font-['Outfit']">
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="max-w-[340px] rounded-xl border border-[#FFD4D4] bg-[#FFF3F3] p-6 text-center">
          <p className="mb-2 text-base font-bold text-[#D32F2F]">Oops!</p>
          <p className="text-sm font-normal text-[#666]">We couldn't find that meal. It may have moved.</p>
        </div>
        <button onClick={handleBack} className="mt-4 cursor-pointer border-none bg-none text-sm font-semibold text-[#0D468B]">
          Back to Diet Plan
        </button>
      </div>
    );
  }

  const { background, icon } = getMealPlaceholderIcon(meal.category, meal.detail);

  return (
    <div className="hd-page bg-white font-['Outfit']">
      <header className="hd-header fixed left-0 right-0 top-0 z-20 mx-auto max-w-[412px] bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {/* Hero photo is pinned to the viewport (not the document) so it reads as a fixed
          background: it stays put while the page scrolls, and the content panel below —
          an ordinary in-flow, opaque element — scrolls up and over it. A white-to-transparent
          fade at the top keeps the back button legible regardless of the photo underneath
          (Figma 890:8570/890:8572). */}
      <div
        ref={heroRef}
        className="fixed left-0 right-0 top-[68px] z-0 mx-auto h-[300px] w-full max-w-[412px] overflow-hidden will-change-transform"
        style={{ background }}
      >
        {meal.imageUrl ? (
          <img src={meal.imageUrl} alt={meal.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="scale-[3]">{icon}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_35%)] pointer-events-none" />
      </div>

      {/* Back button floats independently of the hero photo — it's fixed to the viewport
          on its own (not a child of the parallaxing hero div, and above the content panel's
          z-index) so it stays put on screen the whole time, through the parallax drift and
          through the panel scrolling over the hero beneath it. */}
      <div className="pointer-events-none fixed left-0 right-0 top-[68px] z-30 mx-auto h-0 w-full max-w-[412px]">
        <button
          onClick={handleBack}
          aria-label="Back to Diet Plan"
          className="pointer-events-auto absolute left-4 top-5 flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-none bg-white shadow-[-1px_-1px_4px_0_rgba(0,0,0,0.15),1px_1px_4px_0_rgba(0,0,0,0.15)]"
        >
          <BackChevronIcon />
        </button>
      </div>

      {/* Reserves the fixed header + hero's on-screen space in normal document flow (minus
          the panel's overlap below) so the content panel starts scrolling from the right
          position instead of stacking under the fixed elements. */}
      <div className="h-[336px]" />

      {/* Content panel overlaps the bottom of the hero photo (bottom-sheet style) and, being
          a normal in-flow element with an opaque background, progressively covers the fixed
          hero image as it scrolls up over it — matching Figma's rounded-top white panel
          (890:8573). */}
      <div className="relative z-10 -mt-8 rounded-t-[32px] bg-white pt-3 shadow-[0_-8px_24px_0_rgba(0,0,0,0.06)]">
        <div className="mx-auto mb-4 h-[5px] w-[50px] rounded-2xl bg-[#E3EBEC]" />

        <div className="px-5">
          <h1 className="mb-5 text-center text-xl font-bold text-[#0A386F]">{meal.name}</h1>
          {!meal.isCurated && (
            <p className="-mt-2 mb-4 text-center text-[13px] font-normal leading-[1.5] text-[#4A4A4A]">
              {meal.category} — {meal.detail}
            </p>
          )}
        </div>

        {/* Extra bottom padding clears the fixed Grocery List button so it never overlaps
            the last card when scrolled all the way down. */}
        <div className="pb-[90px]">
          {meal.tips && <DietInfoCallout variant="tips" text={meal.tips} language={language} />}
          {meal.precautions && <DietInfoCallout variant="precautions" text={meal.precautions} language={language} />}
          {meal.recommendedQuantity?.length ? <DietIngredientList variant="quantity" rows={meal.recommendedQuantity} /> : null}
          {meal.nutritionalBenefits?.length ? <DietIngredientList variant="benefits" rows={meal.nutritionalBenefits} /> : null}
        </div>
      </div>

      {meal.groceryListAvailable && <GroceryListButton />}
    </div>
  );
};

export default DietMealDetail;
