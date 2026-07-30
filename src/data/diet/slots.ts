import type { MealSlotDef } from "./types";

/**
 * The 8 meal slots in a diet day. Order, labels, and time ranges are data — add, remove,
 * relabel, retime, or reorder a slot here and every page that iterates `DIET_SLOTS`
 * (sorted by `order`) picks it up automatically.
 *
 * `timeRangeLabel` values are transcribed verbatim from the Figma cards (e.g. node
 * 977:44992), not the Google Sheet's broader row windows — the sheet gave "Early Morning"
 * as a 2-hour window ("5:00 – 7:00 AM") but every Figma card consistently shows the
 * narrower "05:00AM - 05:30AM". Always zero-padded, AM/PM stated on both sides, hyphen
 * with spaces — never abbreviate to a single trailing AM/PM.
 */
export const DIET_SLOTS: MealSlotDef[] = [
  { id: "earlyMorning", label: "Early Morning", sheetAliases: ["Wake up meal", "5 AM Drink"], timeRangeLabel: "05:00AM - 05:30AM", order: 1 },
  { id: "postYogaDrink", label: "Post Yoga Drink", sheetAliases: ["Post Yoga Drink"], timeRangeLabel: "06:30AM - 07:30AM", order: 2 },
  { id: "breakfast", label: "Breakfast", sheetAliases: ["BF"], timeRangeLabel: "07:30AM - 09:30AM", order: 3 },
  { id: "morningSnack", label: "Morning Snack", sheetAliases: ["Morning Snack"], timeRangeLabel: "11:00AM - 11:30AM", order: 4 },
  { id: "lunch", label: "Lunch", sheetAliases: ["Lunch"], timeRangeLabel: "01:00PM - 01:30PM", order: 5 },
  { id: "eveningSnack", label: "Evening Snack", sheetAliases: ["Evening Snack"], timeRangeLabel: "04:00PM - 04:30PM", order: 6 },
  { id: "dinner", label: "Dinner", sheetAliases: ["Dinner"], timeRangeLabel: "07:30PM - 08:00PM", order: 7 },
  { id: "nightDrink", label: "Night Drink", sheetAliases: ["Night Drink"], timeRangeLabel: "09:30PM - 10:00PM", order: 8 },
];

export const DIET_SLOTS_ORDERED = [...DIET_SLOTS].sort((a, b) => a.order - b.order);
