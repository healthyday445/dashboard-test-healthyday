/** The 8 fixed meal-time slots in a diet day, in nutritionist-defined order. */
export type MealSlotId =
  | "earlyMorning"
  | "postYogaDrink"
  | "breakfast"
  | "morningSnack"
  | "lunch"
  | "eveningSnack"
  | "dinner"
  | "nightDrink";

/**
 * Data-driven description of one slot. Rendering code must iterate `DIET_SLOTS`
 * (sorted by `order`) rather than hardcoding slot ids/labels/count/time — slots can be
 * added, removed, relabeled, retimed, or reordered purely by editing slots.ts.
 */
export interface MealSlotDef {
  id: MealSlotId;
  /** Display label, matches the Figma screens' slot text (e.g. "Early Morning"). */
  label: string;
  /** Original sheet header text(s) this slot was sourced from — traceability only, not read by logic. */
  sheetAliases: string[];
  /** Display time range, e.g. "5:00 – 7:00 AM". */
  timeRangeLabel: string;
  order: number;
}

/** Student-facing language. Matches the values already used elsewhere in this app
 *  (e.g. `studentData.language` in IndexPaid.tsx). */
export type Language = "English" | "Telugu";

/** A piece of user-facing text with one value per supported language — used only by the
 *  static filler-strip content (`mealFillers.ts`), which has no Telugu source yet. Real
 *  meal content comes from the Diet Plan API already resolved to one language per call,
 *  so it never needs this type. */
export type LocalizedText = Record<Language, string>;

/** One ingredient row in the "Recommended Quantity" section (Figma 890:8639) — sourced
 *  from `GET /diet-meal`'s `quantity_detailed` object, converted to an array (object key
 *  order is preserved from the API response). */
export interface ResolvedRecommendedQuantity {
  ingredient: string;
  qty: string;
}

export interface ResolvedNutritionalBenefitItem {
  benefitLabel: string;
  iconKey: string;
}

/** One ingredient card in the "Nutritional Benefits" section (Figma 890:8577) — sourced
 *  from `GET /diet-meal`'s `items_benefits` array. */
export interface ResolvedNutritionalBenefit {
  ingredient: string;
  benefits: ResolvedNutritionalBenefitItem[];
}

/** Lightweight per-slot summary for the meal LIST page — from `GET /diet-plan`. Omits
 *  everything only the detail page needs (tips/precautions/benefits/quantity_detailed). */
export interface ResolvedMealSummary {
  slotId: MealSlotId;
  slotLabel: string;
  timeRangeLabel: string;
  order: number;
  /** `diet_meals.id` — pass to `fetchDietMeal` for the full detail. */
  mealId: string;
  name: string;
  /** Free-text quantity phrases (display-only chips), e.g. ["4 Almonds", "1 tbsp Pumpkin Seeds"]. */
  quantity: string[];
  /** Resolved through `MEAL_IMAGE_BY_ID[image_id]?.sm`. Undefined if no image is set. */
  imageUrl?: string;
}

/** One resolved day's meal list — from `GET /diet-plan`. A slot with no meal assigned
 *  that day is simply absent from `meals` (the API returns `meal: null` for it). */
export interface ResolvedDaySummary {
  /** "YYYY-MM-DD" — internal lookup key, never shown to users. */
  dateKey: string;
  /** "DD-MM-YYYY" — the display format. */
  displayDate: string;
  meals: ResolvedMealSummary[];
  /** True once `dateKey` is on/after `DIET_DISABLED_FROM_DATE` — the tab strip should
   *  render this date's tab blurred and unclickable instead of navigating to it. */
  disabled: boolean;
}

/** Full per-meal detail for the meal DETAIL page — from `GET /diet-meal`. */
export interface ResolvedMealDetail {
  name: string;
  quantity: string[];
  quantityDetailed: ResolvedRecommendedQuantity[];
  itemsBenefits: ResolvedNutritionalBenefit[];
  tips?: string;
  precautions?: string;
  /** Resolved through `MEAL_IMAGE_BY_ID[image_id]?.lg`. Undefined if no image is set. */
  imageUrl?: string;
}

/** Icon glyph keys for the static activity fillers between meal cards — see
 *  `mealFillers.ts`. "nap" and "sleep" intentionally share one glyph asset (the
 *  Figma design reuses the same "Sleeping in Bed" icon for both). */
export type FillerIconKey = "walking" | "nap" | "yoga" | "breathing" | "sleep";

/** One "N glasses of water" reminder item inside a filler strip. */
export interface HydrationFillerItem {
  kind: "hydration";
  glasses: 1 | 2;
  label: LocalizedText;
}

/** One activity-reminder item (walk/nap/yoga/breathing/sleep) inside a filler strip. */
export interface ActivityFillerItem {
  kind: "activity";
  icon: FillerIconKey;
  label: LocalizedText;
}

export type FillerItem = HydrationFillerItem | ActivityFillerItem;

/** A static strip of 1-3 reminder items rendered between two meal cards — see
 *  `MEAL_FILLERS_AFTER_SLOT` in `mealFillers.ts`. Same every day, independent of the
 *  Diet Plan API. */
export interface MealFillerDef {
  items: FillerItem[];
}
