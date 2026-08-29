import { DIET_SLOTS } from "./slots";
import { MEAL_IMAGE_BY_ID } from "./mealImageAssets";
import { formatDateDDMMYYYY, isDateDisabled, parseIsoDateKey } from "./dateMath";
import type { Language, MealSlotId, ResolvedDaySummary, ResolvedMealDetail, ResolvedMealSummary } from "./types";

/** The Diet Plan API's snake_case slot keys, mapped to this app's existing `MealSlotId`
 *  values — a different mapping from `DIET_SLOTS[].sheetAliases` (which is free-text
 *  sheet-header traceability, not a machine key). */
const API_SLOT_TO_SLOT_ID: Record<string, MealSlotId> = {
  early_morning: "earlyMorning",
  post_yoga_drink: "postYogaDrink",
  breakfast: "breakfast",
  morning_snack: "morningSnack",
  lunch: "lunch",
  evening_snack: "eveningSnack",
  dinner: "dinner",
  night_drink: "nightDrink",
};

const SLOT_DEF_BY_ID = new Map(DIET_SLOTS.map((slot) => [slot.id, slot]));

interface ApiDietPlanMeal {
  meal_id: string;
  name: string;
  quantity: string[];
  image_id: string | null;
}

interface ApiDietPlanResponse {
  status: string;
  message: string;
  data: {
    date: string;
    language: string;
    plan: { slot: string; meal: ApiDietPlanMeal | null }[];
  };
}

interface ApiDietMealResponse {
  status: string;
  message: string;
  data: {
    name: string;
    quantity: string[];
    quantity_detailed: Record<string, string>;
    items_benefits: { item_name: string; benefits: { name: string; icon_id: string }[] }[];
    tips: string | null;
    precautions: string | null;
    image_id: string | null;
  };
}

/** Fetches one day's meal plan (all slots that have a meal assigned) for the given
 *  language, via the `diet-plan` Netlify function proxy. */
export async function fetchDietPlan(dateKey: string, language: Language): Promise<ResolvedDaySummary> {
  const params = new URLSearchParams({ date: dateKey, language: language.toLowerCase() });
  const res = await fetch(`/.netlify/functions/diet-plan?${params.toString()}`);
  if (!res.ok) throw new Error(`diet-plan API error: ${res.status}`);
  const body: ApiDietPlanResponse = await res.json();

  const meals: ResolvedMealSummary[] = body.data.plan
    .filter((entry): entry is { slot: string; meal: ApiDietPlanMeal } => entry.meal !== null)
    .map((entry) => {
      const slotId = API_SLOT_TO_SLOT_ID[entry.slot];
      const slotDef = SLOT_DEF_BY_ID.get(slotId);
      return {
        slotId,
        slotLabel: slotDef?.label ?? entry.slot,
        timeRangeLabel: slotDef?.timeRangeLabel ?? "",
        order: slotDef?.order ?? 0,
        mealId: entry.meal.meal_id,
        name: entry.meal.name,
        quantity: entry.meal.quantity,
        imageUrl: entry.meal.image_id ? MEAL_IMAGE_BY_ID[entry.meal.image_id]?.sm : undefined,
      };
    })
    .sort((a, b) => a.order - b.order);

  return {
    dateKey,
    displayDate: formatDateDDMMYYYY(parseIsoDateKey(dateKey)),
    meals,
    disabled: isDateDisabled(dateKey),
  };
}

/** Fetches one meal's full detail by `mealId` (from a `fetchDietPlan` result's `meals[].mealId`),
 *  via the `diet-meal` Netlify function proxy. */
export async function fetchDietMeal(mealId: string): Promise<ResolvedMealDetail> {
  const params = new URLSearchParams({ meal_id: mealId });
  const res = await fetch(`/.netlify/functions/diet-meal?${params.toString()}`);
  if (!res.ok) throw new Error(`diet-meal API error: ${res.status}`);
  const body: ApiDietMealResponse = await res.json();
  const data = body.data;

  return {
    name: data.name,
    quantity: data.quantity,
    quantityDetailed: Object.entries(data.quantity_detailed).map(([ingredient, qty]) => ({ ingredient, qty })),
    itemsBenefits: data.items_benefits.map((item) => ({
      ingredient: item.item_name,
      benefits: item.benefits.map((b) => ({ benefitLabel: b.name, iconKey: b.icon_id })),
    })),
    tips: data.tips ?? undefined,
    precautions: data.precautions ?? undefined,
    imageUrl: data.image_id ? MEAL_IMAGE_BY_ID[data.image_id]?.lg : undefined,
  };
}
