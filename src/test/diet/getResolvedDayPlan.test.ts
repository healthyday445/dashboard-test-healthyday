import { describe, it, expect } from "vitest";
import { getResolvedDayPlan, getResolvedTabPlans } from "@/data/diet/getResolvedDayPlan";
import { DIET_SLOTS_ORDERED } from "@/data/diet/slots";

describe("getResolvedDayPlan", () => {
  it("returns 8 meals in slot order for a curated launch date", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 3));
    expect(plan.dateKey).toBe("2026-08-03");
    expect(plan.displayDate).toBe("03-08-2026");
    expect(plan.weekBlockId).toBe("M2W2");
    expect(plan.meals).toHaveLength(8);
    expect(plan.meals.map((m) => m.slotId)).toEqual(DIET_SLOTS_ORDERED.map((s) => s.id));
  });

  it("curated field wins over generic sheet content when present", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 3));
    const earlyMorning = plan.meals.find((m) => m.slotId === "earlyMorning")!;
    expect(earlyMorning.isCurated).toBe(true);
    expect(earlyMorning.name).toBe("Walnuts & Dates");
    expect(earlyMorning.category).toBe("Nuts"); // generic layer still carried through
    expect(earlyMorning.detail).toBe("2 Walnuts + 2 Dates");
    expect(earlyMorning.tips).toBe("Soak overnight and eat in the morning.");
    expect(earlyMorning.groceryListAvailable).toBe(true);
  });

  it("leaves absent optional curated fields undefined, never '' or []", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 3));
    const postYogaDrink = plan.meals.find((m) => m.slotId === "postYogaDrink")!;
    expect(postYogaDrink.precautions).toBeUndefined();
    expect(postYogaDrink.items).toBeUndefined();
    expect(postYogaDrink.recommendedQuantity).toBeUndefined();
  });

  it("falls back entirely to generic sheet content for an uncurated date", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 10)); // a week after launch, uncurated
    for (const meal of plan.meals) {
      expect(meal.isCurated).toBe(false);
      expect(meal.name).toBe(meal.detail);
      expect(meal.tips).toBeUndefined();
      expect(meal.precautions).toBeUndefined();
      expect(meal.nutritionalBenefits).toBeUndefined();
      expect(meal.recommendedQuantity).toBeUndefined();
      expect(meal.groceryListAvailable).toBe(false);
    }
  });

  it("never resolves a date earlier than the launch date, even if asked to", () => {
    const plan = getResolvedDayPlan(new Date(2026, 6, 1));
    expect(plan.dateKey).toBe("2026-08-03");
  });

  it("resolves curated text in Telugu when requested", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 3), "Telugu");
    const earlyMorning = plan.meals.find((m) => m.slotId === "earlyMorning")!;
    expect(earlyMorning.name).toBe("Walnuts & ఖర్జూరాలు");
    expect(earlyMorning.tips).toBe("రాత్రంతా నానబెట్టి, ఉదయం తినండి.");
    expect(earlyMorning.items).toEqual([{ label: "2 Walnuts" }, { label: "2 ఖర్జూరాలు" }]);
  });

  it("defaults to English when no language is passed", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 3));
    const earlyMorning = plan.meals.find((m) => m.slotId === "earlyMorning")!;
    expect(earlyMorning.name).toBe("Walnuts & Dates");
  });

  it.each([
    [2026, 7, 5, "Warm Water", 8],
    [2026, 7, 6, "Sesame & Flax Seeds", 8],
    [2026, 7, 7, "Soaked Almonds & Black Raisins", 8],
    [2026, 7, 8, "Soaked Chia & Flax Seeds", 8],
    [2026, 7, 9, "Soaked Pistachios & Gold Raisins", 7], // postYogaDrink omitted this date
  ])("resolves curated earlyMorning for %i-%i-%i (%s)", (y, m, d, expectedName, expectedMealCount) => {
    const plan = getResolvedDayPlan(new Date(y, m, d));
    const earlyMorning = plan.meals.find((meal) => meal.slotId === "earlyMorning")!;
    expect(earlyMorning.isCurated).toBe(true);
    expect(earlyMorning.name).toBe(expectedName);
    expect(plan.meals).toHaveLength(expectedMealCount);
  });

  it("groups the two newly-added benefit icons (brain-health, healthy-skin) under one Almonds card for 2026-08-07", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 7));
    const earlyMorning = plan.meals.find((meal) => meal.slotId === "earlyMorning")!;
    const almonds = earlyMorning.nutritionalBenefits?.find((b) => b.ingredient === "Almonds");
    const iconKeys = almonds?.benefits.map((item) => item.iconKey);
    expect(iconKeys).toContain("brain-health");
    expect(iconKeys).toContain("healthy-skin");
  });

  it("groups Cucumber's Hydration and Cooling benefits into one card for 2026-08-03 breakfast", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 3));
    const breakfast = plan.meals.find((meal) => meal.slotId === "breakfast")!;
    const cucumberCards = breakfast.nutritionalBenefits?.filter((b) => b.ingredient === "Cucumber");
    expect(cucumberCards).toHaveLength(1);
    expect(cucumberCards?.[0].benefits.map((item) => item.iconKey)).toEqual(["water", "snowflake"]);
  });

  it("omits 2026-08-09 postYogaDrink entirely — Figma has no card for it that day", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 9));
    expect(plan.meals).toHaveLength(7);
    expect(plan.meals.map((meal) => meal.slotId)).not.toContain("postYogaDrink");
    const breakfast = plan.meals.find((meal) => meal.slotId === "breakfast")!;
    expect(breakfast.isCurated).toBe(true);
    expect(breakfast.name).toBe("Ragi Malt with Nuts & Seeds"); // curated, distinct capitalization
  });

  it("overrides 2026-08-09 breakfast's time range since that date has no Post Yoga Drink card", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 9));
    const breakfast = plan.meals.find((meal) => meal.slotId === "breakfast")!;
    expect(breakfast.timeRangeLabel).toBe("06:30AM - 09:30AM");
    expect(breakfast.nutritionalBenefits?.map((b) => b.ingredient)).toEqual(["Ragi", "Nuts & Seeds"]);
    const lunch = plan.meals.find((meal) => meal.slotId === "lunch")!;
    expect(lunch.timeRangeLabel).toBe("01:00PM - 01:30PM"); // unaffected slot keeps the default
  });

  it("resolves 2026-08-09 morningSnack's Pineapple items/recommendedQuantity/precautions", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 9));
    const morningSnack = plan.meals.find((meal) => meal.slotId === "morningSnack")!;
    expect(morningSnack.items).toEqual([{ label: "1 small cup (100gms)" }]);
    expect(morningSnack.recommendedQuantity).toEqual([{ ingredient: "Pineapple", qty: "1 small cup (100gms)" }]);
    expect(morningSnack.precautions).toBe("For people with Diabetes, limit the quantity to 60 - 70 gms per serving");
  });

  it("reflects the corrected 2026-08-08 eveningSnack sheet data (Corn Pakoda, not Sweet Potato)", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 8));
    const eveningSnack = plan.meals.find((meal) => meal.slotId === "eveningSnack")!;
    expect(eveningSnack.category).toBe("Fried Snack");
    expect(eveningSnack.detail).toBe("Corn Pakoda");
    expect(eveningSnack.name).toBe("Corn Pakoda"); // curated name matches the corrected generic detail
  });

  it("drops English-only nutritional-benefit rows when resolving Telugu (visibleLanguages)", () => {
    const englishPlan = getResolvedDayPlan(new Date(2026, 7, 3), "English");
    const teluguPlan = getResolvedDayPlan(new Date(2026, 7, 3), "Telugu");
    const englishGuava = englishPlan.meals.find((m) => m.slotId === "morningSnack")!.nutritionalBenefits!.find((b) => b.ingredient === "Guava")!;
    const teluguGuava = teluguPlan.meals.find((m) => m.slotId === "morningSnack")!.nutritionalBenefits!.find((b) => b.ingredient === "జామపండు")!;
    // English design (924:21411) has 5 benefit rows; the Telugu design (970:32655) only
    // shows 3 of them — Healthy Blood Sugar and Antioxidant Protection are English-only.
    expect(englishGuava.benefits).toHaveLength(5);
    expect(teluguGuava.benefits).toHaveLength(3);
    expect(teluguGuava.benefits.map((b) => b.iconKey)).toEqual(["shield", "stomach", "happy"]);
  });

  it("keeps loanword ingredient names in English on the Telugu screen (2026-08-03)", () => {
    // Figma's Telugu design (970:32655) leaves "Walnuts" and "Turmeric" untranslated
    // wherever they appear as a standalone ingredient/qty label.
    const plan = getResolvedDayPlan(new Date(2026, 7, 3), "Telugu");
    const earlyMorning = plan.meals.find((m) => m.slotId === "earlyMorning")!;
    expect(earlyMorning.nutritionalBenefits?.find((b) => b.ingredient === "Walnuts")).toBeTruthy();
    const nightDrink = plan.meals.find((m) => m.slotId === "nightDrink")!;
    expect(nightDrink.nutritionalBenefits?.find((b) => b.ingredient === "Turmeric")).toBeTruthy();
  });

  it("keeps Warm Water's quantity in English on the Telugu screen (2026-08-05)", () => {
    // Figma node 970:33879 shows the qty chip as "1 Glass" even on the Telugu screen.
    const plan = getResolvedDayPlan(new Date(2026, 7, 5), "Telugu");
    const earlyMorning = plan.meals.find((m) => m.slotId === "earlyMorning")!;
    expect(earlyMorning.items).toEqual([{ label: "1 Glass" }]);
    expect(earlyMorning.recommendedQuantity).toEqual([{ ingredient: "గోరువెచ్చని నీరు", qty: "1 Glass" }]);
  });

  it("orders Sprouts Chaat's Telugu-visible benefits to match Figma (2026-08-04)", () => {
    // Figma node 970:33289 orders eveningSnack's benefits Protein-Rich, Keeps You Full
    // Longer, Better Digestion (Supports Metabolism is an English-only row in between).
    const plan = getResolvedDayPlan(new Date(2026, 7, 4), "Telugu");
    const eveningSnack = plan.meals.find((m) => m.slotId === "eveningSnack")!;
    const sprouts = eveningSnack.nutritionalBenefits?.find((b) => b.ingredient === "Sprouts");
    expect(sprouts?.benefits.map((b) => b.iconKey)).toEqual(["muscle-health", "happy", "stomach"]);
    expect(eveningSnack.precautions).not.toContain("Thyroidడ");
  });

  it("uses the 'ని' particle in the Energy benefit label (2026-08-07)", () => {
    // Figma node 970:35060 consistently reads "Energy ని ఇస్తుంది" across all four
    // slots that carry this benefit that day.
    const plan = getResolvedDayPlan(new Date(2026, 7, 7), "Telugu");
    const slotsWithEnergy = ["earlyMorning", "postYogaDrink", "breakfast", "lunch"];
    for (const slotId of slotsWithEnergy) {
      const meal = plan.meals.find((m) => m.slotId === slotId)!;
      const energyBenefit = meal.nutritionalBenefits
        ?.flatMap((b) => b.benefits)
        .find((b) => b.iconKey === "lightning-bolt");
      expect(energyBenefit?.benefitLabel).toContain("Energy ని ఇస్తుంది");
    }
  });

  it("drops an English-only nutritional-benefit card entirely when resolving Telugu", () => {
    const englishPlan = getResolvedDayPlan(new Date(2026, 7, 6), "English");
    const teluguPlan = getResolvedDayPlan(new Date(2026, 7, 6), "Telugu");
    const englishDinner = englishPlan.meals.find((m) => m.slotId === "dinner")!;
    const teluguDinner = teluguPlan.meals.find((m) => m.slotId === "dinner")!;
    // The Telugu design (970:34451) has no Capsicum card for this dish at all.
    expect(englishDinner.nutritionalBenefits?.some((b) => b.ingredient === "Capsicum")).toBe(true);
    expect(teluguDinner.nutritionalBenefits?.some((b) => b.ingredient === "క్యాప్సికం")).toBe(false);
  });
});

describe("getResolvedTabPlans", () => {
  it("returns 5 day plans starting at effective-today", () => {
    const plans = getResolvedTabPlans(new Date(2026, 6, 1));
    expect(plans).toHaveLength(5);
    expect(plans.map((p) => p.dateKey)).toEqual(["2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07"]);
  });
});
