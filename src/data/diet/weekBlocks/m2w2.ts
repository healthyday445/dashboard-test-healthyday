import type { GenericWeekBlockContent } from "../types";

/** Week-block M2W2 — transcribed from the nutrition team's Google Sheet, Monday–Sunday (0–6).
 *  Live from 2026-08-03 (launch day). Monday/Tuesday here are cross-checked against the
 *  curated Figma content in curatedContent.ts (e.g. "2 Walnuts + 2 Dates" -> "Walnuts & Dates"). */
export const M2W2: GenericWeekBlockContent = {
  0: {
    earlyMorning: { category: "Nuts", detail: "2 Walnuts + 2 Dates" },
    postYogaDrink: { category: "Green Juice", detail: "Cucumber + Lemon Detox Juice" },
    breakfast: { category: "Salad BF", detail: "Cucumber + Palakura (Spinach lightly steamed) + Paneer Salad" },
    morningSnack: { category: "Regular Fruit", detail: "Guava" },
    lunch: { category: "Rice, Dal, Veg Curry, Curd", detail: "Steamed Rice + Spinach Pappu + Beans Carrot Curry + Curd" },
    eveningSnack: { category: "Soup Snack", detail: "Mushroom soup" },
    dinner: { category: "Idly, Dosa Regular, Utappam", detail: "Ragi Dosa + Curry Leaves Chutney + 2 tsp Ghee" },
    nightDrink: { category: "Milk", detail: "Turmeric Milk" },
  },
  1: {
    earlyMorning: { category: "Seeds", detail: "Pumpkin + Sunflower Seeds" },
    postYogaDrink: { category: "Vegetable Juice", detail: "Munagaku + Mint Vegetable Juice" },
    breakfast: { category: "Idly, Dosa Regular, Utappam", detail: "Adai Dosa + Coconut Chutney" },
    morningSnack: { category: "Fruit+", detail: "Apple" },
    lunch: { category: "Rice Bowl", detail: "Pudina Rice Bowl + Carrot Beet Raita" },
    eveningSnack: { category: "Protein Snack", detail: "Sprouts Chaat (Lightly Steamed)" },
    dinner: { category: "Millets Dinner", detail: "Jowar Appam + Coconut Chutney" },
    nightDrink: { category: "Herbal teas", detail: "Tulasi (Basil) Tea" },
  },
  2: {
    earlyMorning: { category: "Warm Water Only", detail: "Warm Water Only" },
    postYogaDrink: { category: "Milk", detail: "Cinnamon Milk" },
    breakfast: { category: "Protein BF", detail: "Pesarattu + Peanut chutney" },
    morningSnack: { category: "Regular Fruit", detail: "Apple" },
    lunch: { category: "Chapati + Protein Curry", detail: "Chapati + Palak Paneer" },
    eveningSnack: { category: "Complex Carbs", detail: "Sweet potato - Boiled" },
    dinner: { category: "Rolls", detail: "Mushroom + peas Roll" },
    nightDrink: { category: "Herbal teas", detail: "Ginger Jeera Tea" },
  },
  3: {
    earlyMorning: { category: "Seeds", detail: "Sesame + Flax Seeds" },
    postYogaDrink: { category: "Chia Seeds", detail: "1 tbsp Soaked Chia Seeds + Amla Water" },
    breakfast: { category: "Protein BF", detail: "Paneer dosa + vegetable sambhar" },
    morningSnack: { category: "Regular Fruit", detail: "Guava" },
    lunch: { category: "Millet Lunch", detail: "Ragi Mudda + Vegetable Sambar (with drumstick leaves / greens)" },
    eveningSnack: { category: "Protein Snack", detail: "Peanut chikki" },
    dinner: { category: "Rice Bowl", detail: "Coconut Rice Bowl + Capsicum Raita" },
    nightDrink: { category: "Herbal teas", detail: "Fennel (Saunf / Sompu) Tea" },
  },
  4: {
    earlyMorning: { category: "Nuts", detail: "4 Almonds + 4 Black Raisins" },
    postYogaDrink: { category: "Coconut Water", detail: "Tender Coconut Water" },
    breakfast: { category: "Upma, Poha", detail: "Godhuma ravva upma with peanuts" },
    morningSnack: { category: "Fruit+", detail: "Guava" },
    lunch: { category: "Rice, Dal, Veg Curry, Curd", detail: "Steamed Rice + Gongura Pappu + Dondkai curry + Curd" },
    eveningSnack: { category: "Protein Snack", detail: "Paneer Cubes + Pepper" },
    dinner: { category: "Salad Dinner", detail: "Cucumber + capsicum curd bowl (with pepper)" },
    nightDrink: { category: "Herbal teas", detail: "Coriander Seed Tea" },
  },
  5: {
    earlyMorning: { category: "Seeds", detail: "Chia + Flax Seeds" },
    // NOTE: sheet category says "Chia Seeds" for this cell but the detail is plain tender coconut water — carried through as-authored.
    postYogaDrink: { category: "Chia Seeds", detail: "Tender Coconut Water" },
    breakfast: { category: "Protein BF", detail: "Poha" },
    morningSnack: { category: "Regular Fruit", detail: "Apple" },
    lunch: { category: "Protein Lunch", detail: "Rice + Mixed Dal Curry + Cucumber Boiled Peanut Salad" },
    // Updated from the sheet's "Sweet Potato (Boiled) + Pepper" per the newer 2026-08-08 Figma
    // design (node 964:30250), which shows a different dish for this slot — design is the
    // more current source of truth here.
    eveningSnack: { category: "Fried Snack", detail: "Corn Pakoda" },
    // NOTE: sheet category is literally "Dinner" (not a real category label) — carried through as-authored.
    dinner: { category: "Dinner", detail: "Spinach cheela (alternative green leafy vegetable can be the option) + tomato chutney" },
    nightDrink: { category: "Herbal Teas", detail: "Ajwain (Vamu) Tea" },
  },
  6: {
    earlyMorning: { category: "Raisins", detail: "3 Pistachios + 5 Gold Raisins" },
    postYogaDrink: { category: "Malts BF", detail: "Ragi Malt with nuts and seeds" },
    breakfast: { category: "Malts BF", detail: "Ragi Malt with nuts and seeds" },
    morningSnack: { category: "Regular Fruit", detail: "Pineapple" },
    lunch: { category: "Rice + Rasam + Protein Curry", detail: "Rice + Carrot Tomato Rasam + French Beans Coconut Curry" },
    eveningSnack: { category: "Dessert Snack", detail: "Makhana Kaju + nuts Icecream (Home made)" },
    dinner: { category: "Idly, Dosa Regular, Utappam", detail: "Mixed Vegetable Uttappam + Tomato Chutney (with curry leaves)" },
    nightDrink: { category: "Herbal tea", detail: "Tulasi tea" },
  },
};
