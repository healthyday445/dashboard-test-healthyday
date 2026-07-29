import { getBenefitIcon } from "@/lib/dietCategoryIcon";
import type { ResolvedNutritionalBenefit, ResolvedRecommendedQuantity } from "@/data/diet";
import mealIcon from "@/assets/diet/icons/meal.webp";
import riceBowlIcon from "@/assets/diet/icons/rice-bowl.webp";

type DietIngredientListProps =
  | { variant: "benefits"; rows: ResolvedNutritionalBenefit[]; trailing?: React.ReactNode }
  | { variant: "quantity"; rows: ResolvedRecommendedQuantity[]; trailing?: React.ReactNode };

// Labels/icons from Figma node 890:8563 (RECOMMENDED QTY / BENEFITS section headers).
const HEADER_CONFIG = {
  benefits: { label: "Nutritional Benefits", icon: riceBowlIcon },
  quantity: { label: "Recommended Quantity", icon: mealIcon },
} as const;

/**
 * The two very differently-shaped list sections from Figma 890:8563:
 * - "quantity" rows are a single line — ingredient name left, a green qty pill right.
 * - "benefits" rows are two lines — ingredient name on top (in green), the benefit's
 *   icon + label below it — inside a taller white card.
 * `trailing` renders inline in the header row (used to place the Grocery List button
 * next to "Nutritional Benefits" instead of floating it elsewhere on the page).
 */
export const DietIngredientList: React.FC<DietIngredientListProps> = ({ variant, rows, trailing }) => {
  const { label, icon } = HEADER_CONFIG[variant];

  return (
    <div style={{ margin: "0 20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={icon} alt="" style={{ width: "23px", height: "23px" }} />
          <span style={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>{label}</span>
        </div>
        {trailing}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {variant === "quantity"
          ? rows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  boxSizing: "border-box",
                  minHeight: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 16px",
                  background: "#FCFFEF",
                  border: "0.5px solid #D0D0D0",
                  borderRadius: "8px",
                  boxShadow: "inset -0.5px -0.5px 1px 0 rgba(8,94,0,0.25), inset 0.5px 0.5px 1px 0 rgba(8,94,0,0.25)",
                }}
              >
                <span style={{ fontFamily: "Outfit", fontSize: "15px", fontWeight: 700, color: "#003677" }}>{row.ingredient}</span>
                <span
                  style={{
                    minWidth: "48px",
                    textAlign: "center",
                    fontFamily: "Outfit",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FFF",
                    background: "#8CBF00",
                    borderRadius: "8px",
                    padding: "5px 12px",
                  }}
                >
                  {row.qty}
                </span>
              </div>
            ))
          : rows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  boxSizing: "border-box",
                  padding: "14px 16px",
                  background: "#FFF",
                  border: "1px solid #D4D4D4",
                  borderRadius: "12px",
                  boxShadow: "-1px -1px 4px 0 rgba(6,69,0,0.05), 1px 1px 4px 0 rgba(6,69,0,0.05)",
                }}
              >
                <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, color: "#8CBF00", marginBottom: "10px" }}>{row.ingredient}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img src={getBenefitIcon(row.iconKey)} alt="" style={{ width: "20px", height: "20px" }} />
                  <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#202020" }}>{row.benefitLabel}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
