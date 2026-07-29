import type { MealSlotDef } from "./types";

/**
 * The 8 meal slots in a diet day. Order, labels, and time ranges are data — add, remove,
 * relabel, retime, or reorder a slot here and every page that iterates `DIET_SLOTS`
 * (sorted by `order`) picks it up automatically.
 */
export const DIET_SLOTS: MealSlotDef[] = [
  { id: "earlyMorning", label: "Early Morning", sheetAliases: ["Wake up meal", "5 AM Drink"], timeRangeLabel: "5:00 – 7:00 AM", order: 1 },
  { id: "postYogaDrink", label: "Post Yoga Drink", sheetAliases: ["Post Yoga Drink"], timeRangeLabel: "6:30 – 7:30 AM", order: 2 },
  { id: "breakfast", label: "Breakfast", sheetAliases: ["BF"], timeRangeLabel: "7:30 – 9:30 AM", order: 3 },
  { id: "morningSnack", label: "Morning Snack", sheetAliases: ["Morning Snack"], timeRangeLabel: "11:00 – 11:30 AM", order: 4 },
  { id: "lunch", label: "Lunch", sheetAliases: ["Lunch"], timeRangeLabel: "1:00 – 1:30 PM", order: 5 },
  { id: "eveningSnack", label: "Evening Snack", sheetAliases: ["Evening Snack"], timeRangeLabel: "4:00 – 4:30 PM", order: 6 },
  { id: "dinner", label: "Dinner", sheetAliases: ["Dinner"], timeRangeLabel: "7:30 – 8:00 PM", order: 7 },
  { id: "nightDrink", label: "Night Drink", sheetAliases: ["Night Drink"], timeRangeLabel: "9:30 – 10:00 PM", order: 8 },
];

export const DIET_SLOTS_ORDERED = [...DIET_SLOTS].sort((a, b) => a.order - b.order);
