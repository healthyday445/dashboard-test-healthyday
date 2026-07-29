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
    expect(earlyMorning.name).toBe("ఆక్రోట్లు & ఖర్జూరాలు");
    expect(earlyMorning.tips).toBe("రాత్రంతా నానబెట్టి, ఉదయం తినండి.");
    expect(earlyMorning.items).toEqual([{ label: "2 ఆక్రోట్లు" }, { label: "2 ఖర్జూరాలు" }]);
  });

  it("defaults to English when no language is passed", () => {
    const plan = getResolvedDayPlan(new Date(2026, 7, 3));
    const earlyMorning = plan.meals.find((m) => m.slotId === "earlyMorning")!;
    expect(earlyMorning.name).toBe("Walnuts & Dates");
  });
});

describe("getResolvedTabPlans", () => {
  it("returns 5 day plans starting at effective-today", () => {
    const plans = getResolvedTabPlans(new Date(2026, 6, 1));
    expect(plans).toHaveLength(5);
    expect(plans.map((p) => p.dateKey)).toEqual(["2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07"]);
  });
});
