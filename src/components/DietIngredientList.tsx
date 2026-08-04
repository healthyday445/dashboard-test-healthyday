import { getBenefitIcon } from "@/lib/dietCategoryIcon";
import type { ResolvedNutritionalBenefit, ResolvedRecommendedQuantity } from "@/data/diet";
import mealIcon from "@/assets/diet/icons/meal.webp";
import riceBowlIcon from "@/assets/diet/icons/rice-bowl.webp";

type DietIngredientListProps =
  | { variant: "benefits"; rows: ResolvedNutritionalBenefit[] }
  | { variant: "quantity"; rows: ResolvedRecommendedQuantity[] };

// Labels/icons from Figma node 890:8577 (BENEFITS) / 890:8639 (RECOMMENDED QTY) headers.
// "Meal" (quantity) is a self-contained icon — the green circle is already baked into the
// asset. "Rice Bowl" (benefits) is a bare white glyph that needs its own circular backdrop
// (Figma "Ellipse 70", solid #8CBF00) — that backdrop was missing before, which is why the
// icon looked absent.
const HEADER_CONFIG = {
  benefits: { label: "Nutritional Benefits", icon: riceBowlIcon, iconBackdropClass: "bg-[#8CBF00]" },
  quantity: { label: "Recommended Quantity", icon: mealIcon, iconBackdropClass: null },
} as const;

/**
 * The two very differently-shaped list sections from Figma 890:8563:
 * - "quantity" rows are a single line — ingredient name left, a green qty pill right.
 * - "benefits" rows are two lines — ingredient name on top (in green), the benefit's
 *   icon + label below it — inside a taller white card.
 */
export const DietIngredientList: React.FC<DietIngredientListProps> = ({ variant, rows }) => {
  const { label, icon, iconBackdropClass } = HEADER_CONFIG[variant];

  return (
    <div className="mx-5 mb-4">
      <div className="mb-3.5 flex items-center gap-2">
        {iconBackdropClass ? (
          <div className={`flex h-[23px] w-[23px] flex-shrink-0 items-center justify-center rounded-full ${iconBackdropClass}`}>
            <img src={icon} alt="" className="h-[13.6px] w-[13.6px]" />
          </div>
        ) : (
          <img src={icon} alt="" className="h-[25px] w-[25px]" />
        )}
        <span className="text-lg font-semibold text-black">{label}</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {variant === "quantity"
          ? rows.map((row, idx) => (
              <div
                key={idx}
                className="box-border flex min-h-[45px] items-center justify-between rounded-lg border-[0.5px] border-[#D0D0D0] bg-[#FCFFEF] px-4 shadow-[inset_-0.5px_-0.5px_1px_0_rgba(8,94,0,0.25),inset_0.5px_0.5px_1px_0_rgba(8,94,0,0.25)]"
              >
                <span className="text-[15px] font-bold text-[#003677]">{row.ingredient}</span>
                <span className="min-w-[48px] rounded-lg bg-[#8CBF00] px-3 py-[5px] text-center text-[13px] font-semibold text-white">
                  {row.qty}
                </span>
              </div>
            ))
          : rows.map((row, idx) => (
              <div
                key={idx}
                className="box-border rounded-xl border border-[#D4D4D4] bg-white px-4 py-3.5 shadow-[-1px_-1px_4px_0_rgba(6,69,0,0.05),1px_1px_4px_0_rgba(6,69,0,0.05)]"
              >
                <div className="mb-2.5 text-base font-bold text-[#8CBF00]">{row.ingredient}</div>
                {row.benefits.map((benefit, benefitIdx) => (
                  <div
                    key={benefitIdx}
                    className={`flex items-center gap-2 ${benefitIdx > 0 ? "mt-2.5 border-t border-t-[#EEE] pt-2.5" : ""}`}
                  >
                    <img src={getBenefitIcon(benefit.iconKey)} alt="" className="h-5 w-5" />
                    <span className="text-sm font-semibold text-black">{benefit.benefitLabel}</span>
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};
