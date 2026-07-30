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
  benefits: { label: "Nutritional Benefits", icon: riceBowlIcon, iconBackdrop: "#8CBF00" },
  quantity: { label: "Recommended Quantity", icon: mealIcon, iconBackdrop: null },
} as const;

/**
 * The two very differently-shaped list sections from Figma 890:8563:
 * - "quantity" rows are a single line — ingredient name left, a green qty pill right.
 * - "benefits" rows are two lines — ingredient name on top (in green), the benefit's
 *   icon + label below it — inside a taller white card.
 */
export const DietIngredientList: React.FC<DietIngredientListProps> = ({ variant, rows }) => {
  const { label, icon, iconBackdrop } = HEADER_CONFIG[variant];

  return (
    <div style={{ margin: "0 20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        {iconBackdrop ? (
          <div
            style={{
              flexShrink: 0,
              width: "23px",
              height: "23px",
              borderRadius: "50%",
              background: iconBackdrop,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={icon} alt="" style={{ width: "13.6px", height: "13.6px" }} />
          </div>
        ) : (
          <img src={icon} alt="" style={{ width: "25px", height: "25px" }} />
        )}
        <span style={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#000" }}>{label}</span>
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
                {row.benefits.map((benefit, benefitIdx) => (
                  <div
                    key={benefitIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      paddingTop: benefitIdx > 0 ? "10px" : undefined,
                      marginTop: benefitIdx > 0 ? "10px" : undefined,
                      borderTop: benefitIdx > 0 ? "1px solid #EEE" : undefined,
                    }}
                  >
                    <img src={getBenefitIcon(benefit.iconKey)} alt="" style={{ width: "20px", height: "20px" }} />
                    <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#000" }}>{benefit.benefitLabel}</span>
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};
