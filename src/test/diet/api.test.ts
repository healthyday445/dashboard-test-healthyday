import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchDietPlan, fetchDietMeal } from "@/data/diet/api";

function mockFetchOnce(body: unknown, ok = true) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 500, json: () => Promise.resolve(body) })
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchDietPlan", () => {
  it("maps snake_case slots to MealSlotId, drops null slots, sorts by order", () => {
    mockFetchOnce({
      status: "success",
      message: "ok",
      data: {
        date: "2026-08-27",
        language: "english",
        plan: [
          { slot: "early_morning", meal: null },
          {
            slot: "breakfast",
            meal: {
              meal_id: "1",
              name: "Upma",
              quantity: ["1 bowl"],
              image_id: "img_1",
              tips_tag: "Soak Overnight",
              precautions_tag: "Control rice for diabetes",
            },
          },
          { slot: "lunch", meal: { meal_id: "2", name: "Rice", quantity: [], image_id: null, tips_tag: null, precautions_tag: null } },
        ],
      },
    });

    return fetchDietPlan("2026-08-27", "English").then((result) => {
      expect(result.dateKey).toBe("2026-08-27");
      expect(result.meals.map((m) => m.slotId)).toEqual(["breakfast", "lunch"]);
      expect(result.meals[0].mealId).toBe("1");
      expect(result.meals[0].tipsTag).toBe("Soak Overnight");
      expect(result.meals[0].precautionsTag).toBe("Control rice for diabetes");
      expect(result.meals[1].imageUrl).toBeUndefined();
      expect(result.meals[1].tipsTag).toBe("Soak chia overnight");
      expect(result.meals[1].precautionsTag).toBe("Avoid extra handfuls");
    });
  });
});

describe("fetchDietMeal", () => {
  it("converts quantity_detailed object to an array and items_benefits to the shared shape", () => {
    mockFetchOnce({
      status: "success",
      message: "ok",
      data: {
        name: "Upma",
        quantity: ["1 bowl"],
        quantity_detailed: { rava: "1 cup", vegetables: "1/2 cup" },
        items_benefits: [{ item_name: "Rava", benefits: [{ name: "Energy", icon_id: "lightning-bolt" }] }],
        tips: "Take warm.",
        precautions: null,
        image_id: null,
      },
    });

    return fetchDietMeal("1").then((result) => {
      expect(result.quantityDetailed).toEqual([
        { ingredient: "rava", qty: "1 cup" },
        { ingredient: "vegetables", qty: "1/2 cup" },
      ]);
      expect(result.itemsBenefits).toEqual([
        { ingredient: "Rava", benefits: [{ benefitLabel: "Energy", iconKey: "lightning-bolt" }] },
      ]);
      expect(result.precautions).toBeUndefined();
    });
  });
});
