import type { MealFillerDef, MealSlotId } from "./types";
import { same } from "./localizedText";

/**
 * Static reminder strips (hydration/activity/sleep) rendered between meal cards on the
 * diet page — Figma node 1569:19620 ("Hydration+Movement"). Unlike `curatedContent.ts`,
 * this content is the same for every date and every student, so it's kept as its own
 * table keyed by "which slot does this strip follow" rather than folded into per-date
 * meal data — that stays true even once `curatedContent.ts` is eventually replaced by an
 * API response.
 *
 * No Telugu Figma frame exists for this node yet, so every label uses `same(...)` (English
 * duplicated into the Telugu slot) — swap for real `t(...)` translations once available.
 */
export const MEAL_FILLERS_AFTER_SLOT: Partial<Record<MealSlotId, MealFillerDef>> = {
  breakfast: {
    items: [{ kind: "hydration", glasses: 2, label: same("2 Glasses of Water") }],
  },
  morningSnack: {
    items: [{ kind: "hydration", glasses: 1, label: same("1 Glass of water") }],
  },
  lunch: {
    items: [
      { kind: "activity", icon: "walking", label: same("Slow Walk (15 mins)") },
      { kind: "activity", icon: "nap", label: same("Power Nap (20 mins)") },
      { kind: "hydration", glasses: 2, label: same("2 Glasses of water") },
    ],
  },
  eveningSnack: {
    items: [
      { kind: "activity", icon: "yoga", label: same("Light Yoga") },
      { kind: "hydration", glasses: 2, label: same("2 Glasses of water") },
    ],
  },
  dinner: {
    items: [
      { kind: "activity", icon: "walking", label: same("Slow Walk (15 mins)") },
      { kind: "hydration", glasses: 1, label: same("1 Glass of water") },
      { kind: "activity", icon: "breathing", label: same("Breathing session 9:00 PM") },
    ],
  },
  nightDrink: {
    items: [{ kind: "activity", icon: "sleep", label: same("Sleep at 10:30 PM") }],
  },
};
