import { Skeleton } from "@/components/ui/skeleton";
import { getMealPlaceholderIcon } from "@/lib/dietCategoryIcon";
import type { ResolvedMeal } from "@/data/diet";
import clockIcon from "@/assets/diet/icons/clock.webp";

// Real pixel values from the Figma card (890:8424 / 890:8443, both on a 412px mobile frame):
// a 100px circle, 32px of it floating outside the rectangle's left edge (68px overlapping
// in), and a fixed 20px gap from the circle's right edge to the text — constant across both
// reference cards even though their rectangles start at different x positions, so deriving
// paddingLeft from THUMB_INSIDE + GAP holds regardless of which card it is.
const THUMB_SIZE = 100;
const THUMB_OUTSIDE = 32;
const THUMB_INSIDE = THUMB_SIZE - THUMB_OUTSIDE;
const THUMB_TEXT_GAP = 20;
// The photo sits on a white "coin" backing (Figma "Ellipse 61", node 890:8429) — a 4px white
// ring peeking out around the photo's edge, plus a soft shadow. Ring width is symmetric, so
// it extends THUMB_OUTSIDE further left and THUMB_INSIDE further right by the same amount.
const THUMB_RING_WIDTH = 4;
const ARROW_SIZE = 34;
const ARROW_INSET = 12; // distance from the rectangle's right edge to the arrow — arrow sits inside, not overlapping past it

/** Green circular "go to details" affordance (Figma node 890:8431 — a left-arrow asset
 *  mirrored to point right; recreated as an inline SVG pointing right directly). */
const NavArrowButton = () => (
  <div
    style={{
      flexShrink: 0,
      width: `${ARROW_SIZE}px`,
      height: `${ARROW_SIZE}px`,
      borderRadius: "50%",
      background: "#8CBF00",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Chip color scheme alternates by item index, matching the Figma card (890:8424) where the
// first ("2 Walnuts") is orange and the second ("2 Dates") is blue.
const CHIP_SCHEMES = [
  { background: "#FFF4E7", border: "#FE961B", color: "#FE961B" },
  { background: "#EBF7FF", border: "#4F8ABF", color: "#0A386F" },
];

interface DietMealCardRectangleProps {
  children: React.ReactNode;
}

/**
 * The visual white card (Figma node 890:8446) as its own child component — a plain box
 * with a guaranteed minimum height (~100px, matching the design) that grows to fit a
 * two-line dish name instead of clipping it. The circular photo and arrow affordance are
 * NOT part of this component: they're positioned by the parent wrapper so they can overlap
 * this rectangle's edges without it needing to know about them.
 */
const DietMealCardRectangle: React.FC<DietMealCardRectangleProps> = ({ children }) => (
  <div
    style={{
      boxSizing: "border-box",
      width: "100%",
      minHeight: `${THUMB_SIZE}px`,
      display: "flex",
      alignItems: "center",
      padding: `10px ${ARROW_SIZE + ARROW_INSET + 8}px 10px ${THUMB_INSIDE + THUMB_TEXT_GAP}px`,
      border: "1px solid rgba(69,130,185,0.35)",
      // Top-left corner stays square so the overlapping circle tucks into the corner cleanly.
      borderRadius: "3px 12px 12px 3px",
      background: "#FFF",
      boxShadow: "0 2px 8px 0 rgba(5,62,4,0.14)",
    }}
  >
    {children}
  </div>
);

interface DietMealCardProps {
  meal: ResolvedMeal;
  onClick?: () => void;
}

/** One row in the diet page's meal list — green slot label + time above a card whose
 *  circular photo overlaps its left edge, with a green arrow affordance on the right.
 *  The parent wrapper owns the overlapping circle/arrow positioning; `DietMealCardRectangle`
 *  is a plain child that only knows how to lay out its own text content. */
export const DietMealCard: React.FC<DietMealCardProps> = ({ meal, onClick }) => {
  const { background, icon } = getMealPlaceholderIcon(meal.category, meal.detail);

  return (
    <div style={{ padding: "0 20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 800, color: "#085E00" }}>{meal.slotLabel}</span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, color: "#085E00" }}>
          <img src={clockIcon} alt="" style={{ width: "14px", height: "14px" }} />
          {meal.timeRangeLabel}
        </span>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick?.();
        }}
        style={{
          position: "relative",
          marginLeft: `${THUMB_OUTSIDE}px`,
          width: `calc(100% - ${THUMB_OUTSIDE}px)`,
          cursor: "pointer",
        }}
      >
        {/* White "coin" backing behind the photo (Figma "Ellipse 61") — a ring peeks out
            around the photo's edge, plus a soft shadow lifting the whole thumbnail. */}
        <div
          style={{
            position: "absolute",
            left: `-${THUMB_OUTSIDE + THUMB_RING_WIDTH}px`,
            top: "50%",
            transform: "translateY(-50%)",
            width: `${THUMB_SIZE + THUMB_RING_WIDTH * 2}px`,
            height: `${THUMB_SIZE + THUMB_RING_WIDTH * 2}px`,
            borderRadius: "50%",
            background: "#FFF",
            boxShadow: "1px 1px 4px 0 rgba(0,0,0,0.15), -1px -1px 4px 0 rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: `${THUMB_SIZE}px`,
              height: `${THUMB_SIZE}px`,
              borderRadius: "50%",
              background,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {meal.imageUrl ? (
              <img src={meal.imageUrl} alt={meal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              icon
            )}
          </div>
        </div>

        <DietMealCardRectangle>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 }}>
            <span style={{ fontFamily: "Outfit", fontSize: "15px", fontWeight: 700, color: "#003677" }}>{meal.name}</span>
            {meal.items?.length ? (
              <div style={{ display: "flex", gap: "4px", flexWrap: "nowrap" }}>
                {meal.items.map((item, idx) => {
                  const scheme = CHIP_SCHEMES[idx % CHIP_SCHEMES.length];
                  return (
                    <span
                      key={idx}
                      style={{
                        fontFamily: "Outfit",
                        fontSize: "9px",
                        fontWeight: 500,
                        textWrap: "nowrap",
                        color: scheme.color,
                        background: scheme.background,
                        border: `0.5px solid ${scheme.border}`,
                        borderRadius: "3px",
                        padding: "2px 4px",
                      }}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        </DietMealCardRectangle>

        <div style={{ position: "absolute", right: `${ARROW_INSET}px`, top: "50%", transform: "translateY(-50%)" }}>
          <NavArrowButton />
        </div>
      </div>
    </div>
  );
};

/** Skeleton-shaped placeholder for one meal row, shown while student/plan data loads. */
export const DietMealCardSkeleton: React.FC = () => (
  <div style={{ padding: "0 20px 16px" }}>
    <Skeleton style={{ width: "120px", height: "12px", borderRadius: "4px", marginBottom: "8px" }} />
    <div style={{ position: "relative", marginLeft: `${THUMB_OUTSIDE}px`, width: `calc(100% - ${THUMB_OUTSIDE}px)` }}>
      <Skeleton
        style={{
          position: "absolute",
          left: `-${THUMB_OUTSIDE}px`,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${THUMB_SIZE}px`,
          height: `${THUMB_SIZE}px`,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          boxSizing: "border-box",
          minHeight: `${THUMB_SIZE}px`,
          display: "flex",
          alignItems: "center",
          padding: `10px ${ARROW_SIZE + ARROW_INSET + 8}px 10px ${THUMB_INSIDE + THUMB_TEXT_GAP}px`,
          border: "1px solid rgba(69,130,185,0.35)",
          borderRadius: "3px 12px 12px 3px",
        }}
      >
        <Skeleton style={{ flex: 1, height: "16px", borderRadius: "4px" }} />
      </div>
    </div>
  </div>
);
