import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { safeSessionStorage } from "@/lib/storage";
import { getMealPlaceholderIcon } from "@/lib/dietCategoryIcon";
import { DietInfoCallout } from "@/components/DietInfoCallout";
import { DietIngredientList } from "@/components/DietIngredientList";
import { getResolvedDayPlan, parseIsoDateKey } from "@/data/diet";
import type { MealSlotId, Language } from "@/data/diet";
import buyingIcon from "@/assets/diet/icons/buying.webp";

const GROCERY_LIST_URL = "https://dailyyogawithjagan.com/grocery-list";

const BackChevronIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M10.5 12.6 6.5 8.4l4-4.2" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * A genuinely floating button (Figma node 890:8661 — its y-position is identical across
 * every "Diet detailed N" frame regardless of that meal's total content height, and it has
 * a `backdrop-blur`, both of which only make sense for something that stays fixed on screen
 * while content scrolls underneath it — not an inline element next to a heading). Pinned to
 * the bottom-right of the same max-412px column the rest of the page uses, matching the
 * design's ~20px right margin.
 */
const GroceryListButton = () => (
  <div style={{ position: "fixed", bottom: "24px", left: 0, right: 0, maxWidth: "412px", margin: "0 auto", zIndex: 20, pointerEvents: "none" }}>
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
      <button
        onClick={() => window.open(GROCERY_LIST_URL, "_blank")}
        style={{
          pointerEvents: "auto",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "154px",
          height: "44px",
          borderRadius: "40px",
          border: "none",
          background: "#FEAB27",
          backdropFilter: "blur(2px)",
          boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
      >
        <img src={buyingIcon} alt="" style={{ width: "21px", height: "21px" }} />
        <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, color: "#FFF", whiteSpace: "nowrap" }}>Grocery List</span>
      </button>
    </div>
  </div>
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

  if (error) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div style={{ background: "#FFF3F3", border: "1px solid #FFD4D4", borderRadius: "12px", padding: "24px", textAlign: "center", maxWidth: "340px" }}>
          <p style={{ color: "#D32F2F", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Oops!</p>
          <p style={{ color: "#666", fontSize: "14px", fontWeight: 400 }}>{error}</p>
        </div>
      </div>
    );
  }

  const showSkeleton = loading || !studentData;

  if (showSkeleton) {
    return (
      <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
        <header className="hd-header bg-white" style={{ position: "fixed", top: 0, left: 0, right: 0, maxWidth: "412px", margin: "0 auto", zIndex: 20 }}>
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>
        <div style={{ height: "68px" }} />
        <Skeleton style={{ width: "100%", height: "300px", borderRadius: 0 }} />
        <div style={{ padding: "20px" }}>
          <Skeleton style={{ width: "60%", height: "22px", borderRadius: "4px", margin: "0 auto 16px" }} />
          <Skeleton style={{ width: "100%", height: "80px", borderRadius: "8px" }} />
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
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div style={{ background: "#FFF3F3", border: "1px solid #FFD4D4", borderRadius: "12px", padding: "24px", textAlign: "center", maxWidth: "340px" }}>
          <p style={{ color: "#D32F2F", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Oops!</p>
          <p style={{ color: "#666", fontSize: "14px", fontWeight: 400 }}>We couldn't find that meal. It may have moved.</p>
        </div>
        <button
          onClick={() => navigate(backUrl)}
          style={{ marginTop: "16px", background: "none", border: "none", color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
        >
          Back to Diet Plan
        </button>
      </div>
    );
  }

  const { background, icon } = getMealPlaceholderIcon(meal.category, meal.detail);

  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white" style={{ position: "fixed", top: 0, left: 0, right: 0, maxWidth: "412px", margin: "0 auto", zIndex: 20 }}>
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>
      <div style={{ height: "68px" }} />

      {/* Hero photo, with a white-to-transparent fade at the top so the back button reads
          clearly regardless of the photo underneath (Figma 890:8570/890:8572). */}
      <div style={{ position: "relative", width: "100%", height: "300px", background, overflow: "hidden" }}>
        {meal.imageUrl ? (
          <img src={meal.imageUrl} alt={meal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "scale(3)" }}>{icon}</div>
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 35%)", pointerEvents: "none" }} />
        <button
          onClick={() => navigate(backUrl)}
          aria-label="Back to Diet Plan"
          style={{
            position: "absolute", top: "20px", left: "16px", width: "34px", height: "34px", borderRadius: "10px",
            background: "#FFF", border: "none", boxShadow: "-1px -1px 4px 0 rgba(0,0,0,0.15), 1px 1px 4px 0 rgba(0,0,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}
        >
          <BackChevronIcon />
        </button>
      </div>

      {/* Content panel overlaps the bottom of the hero photo (bottom-sheet style), matching
          Figma's rounded-top white panel (890:8573). */}
      <div style={{ position: "relative", marginTop: "-32px", background: "#FFF", borderRadius: "32px 32px 0 0", boxShadow: "0 -8px 24px 0 rgba(0,0,0,0.06)", paddingTop: "12px" }}>
        <div style={{ width: "50px", height: "5px", borderRadius: "16px", background: "#E3EBEC", margin: "0 auto 16px" }} />

        <div style={{ padding: "0 20px" }}>
          <h1 style={{ margin: "0 0 20px", textAlign: "center", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, color: "#0A386F" }}>{meal.name}</h1>
          {!meal.isCurated && (
            <p style={{ margin: "-8px 0 16px", fontFamily: "Outfit", fontSize: "13px", fontWeight: 400, color: "#4A4A4A", lineHeight: 1.5, textAlign: "center" }}>
              {meal.category} — {meal.detail}
            </p>
          )}
        </div>

        {/* Extra bottom padding clears the fixed Grocery List button so it never overlaps
            the last card when scrolled all the way down. */}
        <div style={{ paddingBottom: "90px" }}>
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
