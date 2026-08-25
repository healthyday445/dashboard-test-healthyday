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

/** The 6 repeating week-blocks that make up the 42-day cycle, in fixed cycle order. */
export type WeekBlockId = "M1W1" | "M1W2" | "M1W3" | "M1W4" | "M2W1" | "M2W2";

/** The sheet's raw cell for one (week-block, weekday, slot). `detail` is an opaque
 *  freeform string written by the nutrition team — never parsed/split by rendering code. */
export interface GenericMealContent {
  category: string;
  detail: string;
}

/** weekdayIndex: 0=Monday .. 6=Sunday */
export type GenericDayContent = Record<MealSlotId, GenericMealContent>;
export type GenericWeekBlockContent = Record<number, GenericDayContent>;
export type GenericCycleContent = Record<WeekBlockId, GenericWeekBlockContent>;

/** Student-facing language. Matches the values already used elsewhere in this app
 *  (e.g. `studentData.language` in IndexPaid.tsx) — not every value in every field
 *  actually differs by language (the Figma Telugu screens leave some words, like slot
 *  labels and numeric quantities, in English), but every curated text field is stored
 *  per-language so the data can be edited independently without code changes. */
export type Language = "English" | "Telugu";

/** A piece of user-facing text with one value per supported language. Resolved down to
 *  a plain string by `getResolvedDayPlan`'s `language` argument — components never see
 *  a LocalizedText, only the already-resolved string. */
export type LocalizedText = Record<Language, string>;

export interface CuratedItem {
  /** Full chip text, e.g. {English:"2 Walnuts", Telugu:"2 ఆక్రోట్లు"} — stored as one
   *  complete phrase (not split into a separate qty/name) because the two languages
   *  don't always decompose the same way (e.g. "1 medium fruit" has no separate qty). */
  label: LocalizedText;
}

export interface NutritionalBenefitItem {
  benefitLabel: LocalizedText;
  /** Loose lookup key into the category-icon/benefit-icon set — an unrecognized key
   *  must fall back to a generic icon, never throw or leave a gap. */
  iconKey: string;
  /** Restricts this single benefit row to a subset of languages, e.g. `["English"]`
   *  means this row exists only in the English Figma design and must be dropped when
   *  rendering Telugu (the two languages' designs don't always show the same set of
   *  benefit rows for an ingredient). Omit entirely (the default — true for almost every
   *  entry) to mean "shown in every language." Never write the full language list
   *  explicitly — omit the field instead of listing all languages. */
  visibleLanguages?: Language[];
}

/** One ingredient card in the Nutritional Benefits section (Figma 890:8577) — an ingredient
 *  can have MULTIPLE benefits (e.g. Cucumber → Hydration + Cooling), and the design renders
 *  all of them stacked inside a single card with a divider between rows, not one card per
 *  benefit. Never split one ingredient's benefits across multiple `NutritionalBenefit`
 *  entries — group them all into one `benefits` array instead. */
export interface NutritionalBenefit {
  ingredient: LocalizedText;
  benefits: NutritionalBenefitItem[];
  /** Same meaning as `NutritionalBenefitItem.visibleLanguages`, but for the whole card —
   *  an ingredient with no card at all in one language's Figma design (e.g. Capsicum
   *  missing from the Telugu screen for a dish that has it in English). Omit for "shown
   *  in every language." */
  visibleLanguages?: Language[];
}

export interface RecommendedQuantity {
  ingredient: LocalizedText;
  /** The quantity chip (e.g. "2 pcs") — LocalizedText for future flexibility, though in
   *  every curated meal today this value happens to be identical across languages. */
  qty: LocalizedText;
  /** Same meaning as `NutritionalBenefit.visibleLanguages`. Added for consistency; no
   *  real-world mismatch has been found here yet. */
  visibleLanguages?: Language[];
}

/**
 * Hand-authored override for one slot on one specific date, matching the Figma detail
 * screens. Every field past `name` is independently optional — omit the key entirely
 * (never `""` / `[]`) to mean "not curated for this meal"; the merge layer falls back
 * to the generic sheet content for any omitted field.
 */
export interface CuratedMealContent {
  name: LocalizedText;
  imageUrl?: string;
  /** Overrides the slot's default `timeRangeLabel` from `DIET_SLOTS` for this date+slot
   *  only — e.g. 2026-08-09's Breakfast shows "06:30AM - 09:30AM" instead of the usual
   *  "07:30AM - 09:30AM" because that date has no separate Post Yoga Drink card. A plain
   *  `string`, not `LocalizedText`, since time ranges aren't translated. Omit to use the
   *  slot's normal global time range (true for almost every curated meal). */
  timeRangeLabel?: string;
  items?: CuratedItem[];
  tips?: LocalizedText;
  precautions?: LocalizedText;
  nutritionalBenefits?: NutritionalBenefit[];
  recommendedQuantity?: RecommendedQuantity[];
  groceryListAvailable?: boolean;
}

/** Keyed by ISO date ("YYYY-MM-DD") then slot id. A date with no entry means zero
 *  curation — every slot for that date falls back entirely to generic content. */
export type CuratedContentByDate = Record<string, Partial<Record<MealSlotId, CuratedMealContent>>>;

export interface ResolvedItem {
  label: string;
}

export interface ResolvedNutritionalBenefitItem {
  benefitLabel: string;
  iconKey: string;
}

export interface ResolvedNutritionalBenefit {
  ingredient: string;
  benefits: ResolvedNutritionalBenefitItem[];
}

export interface ResolvedRecommendedQuantity {
  ingredient: string;
  qty: string;
}

/** Fully-resolved, render-ready meal for one language — the only shape component code
 *  needs to know about. Every LocalizedText field has already been resolved to a plain
 *  string by `getResolvedDayPlan`'s `language` argument. */
export interface ResolvedMeal {
  slotId: MealSlotId;
  slotLabel: string;
  timeRangeLabel: string;
  order: number;
  category: string;
  detail: string;
  isCurated: boolean;
  /** curated.name if curated, else the raw sheet detail string. Never blank. */
  name: string;
  imageUrl?: string;
  items?: ResolvedItem[];
  tips?: string;
  precautions?: string;
  nutritionalBenefits?: ResolvedNutritionalBenefit[];
  recommendedQuantity?: ResolvedRecommendedQuantity[];
  groceryListAvailable: boolean;
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
 *  `MEAL_FILLERS_AFTER_SLOT` in `mealFillers.ts`. Same every day, independent of
 *  `CuratedContentByDate` (and unaffected by that data eventually moving to an API). */
export interface MealFillerDef {
  items: FillerItem[];
}

export interface ResolvedDayPlan {
  /** "YYYY-MM-DD" — internal lookup key, never shown to users. */
  dateKey: string;
  /** "DD-MM-YYYY" — the display format. */
  displayDate: string;
  weekBlockId: WeekBlockId;
  weekdayIndex: number;
  meals: ResolvedMeal[];
  /** True once `dateKey` is on/after `DIET_DISABLED_FROM_DATE` — the tab strip should
   *  render this date's tab blurred and unclickable instead of navigating to it. */
  disabled: boolean;
}
