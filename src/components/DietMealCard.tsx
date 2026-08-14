import { useEffect, useRef, useState } from "react";
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
    className="flex flex-shrink-0 items-center justify-center rounded-full bg-[#8CBF00]"
    style={{ width: `${ARROW_SIZE}px`, height: `${ARROW_SIZE}px` }}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Chip color scheme alternates by item index, matching the Figma card (890:8424) where the
// first ("2 Walnuts") is orange and the second ("2 Dates") is blue.
const CHIP_SCHEMES = [
  { className: "border-[#FE961B] bg-[#FFF4E7] text-[#FE961B]" },
  { className: "border-[#4F8ABF] bg-[#EBF7FF] text-[#0A386F]" },
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
    // Top-left corner stays square so the overlapping circle tucks into the corner cleanly.
    className="box-border flex w-full items-center rounded-bl-[3px] rounded-tl-[3px] rounded-br-xl rounded-tr-xl border border-[rgba(69,130,185,0.35)] bg-white shadow-[0_2px_8px_0_rgba(5,62,4,0.14)]"
    style={{ minHeight: `${THUMB_SIZE}px`, padding: `10px ${ARROW_SIZE + ARROW_INSET + 8}px 10px ${THUMB_INSIDE + THUMB_TEXT_GAP}px` }}
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
  // Blur-up loading state: the photo renders blurred/scaled-up from the moment its `src`
  // starts fetching, then sharpens with a fade once it finishes — a loading affordance that
  // doesn't need a separate low-res placeholder asset per meal.
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // Cards are keyed by slotId (e.g. "breakfast"), which is the same across every date tab —
  // so switching tabs re-uses this same component instance and just changes `meal.imageUrl`
  // rather than mounting a fresh card. Without this, `imageLoaded` would stay stuck `true`
  // from whichever day's photo loaded first, and the blur-up never replays for the new photo.
  useEffect(() => {
    setImageLoaded(false);
    // Covers the case where the browser already has this image cached — e.g. navigating
    // back to this list after having opened the meal detail page for it. Cached images can
    // report `complete` (and thus never fire `load`) before React finishes attaching the
    // onLoad handler below, which would otherwise leave the blur-up state stuck forever.
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, [meal.imageUrl]);

  return (
    <div className="px-5 pb-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-extrabold text-[#085E00]">{meal.slotLabel}</span>
        <span className="flex items-center gap-1 text-xs font-bold text-[#085E00]">
          <img src={clockIcon} alt="" className="h-3.5 w-3.5" />
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
        className="relative cursor-pointer"
        style={{ marginLeft: `${THUMB_OUTSIDE}px`, width: `calc(100% - ${THUMB_OUTSIDE}px)` }}
      >
        {/* White "coin" backing behind the photo (Figma "Ellipse 61") — a ring peeks out
            around the photo's edge, plus a soft shadow lifting the whole thumbnail. */}
        <div
          className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[1px_1px_4px_0_rgba(0,0,0,0.15),-1px_-1px_4px_0_rgba(0,0,0,0.15)]"
          style={{
            left: `-${THUMB_OUTSIDE + THUMB_RING_WIDTH}px`,
            width: `${THUMB_SIZE + THUMB_RING_WIDTH * 2}px`,
            height: `${THUMB_SIZE + THUMB_RING_WIDTH * 2}px`,
          }}
        >
          <div
            className="flex items-center justify-center overflow-hidden rounded-full"
            style={{ width: `${THUMB_SIZE}px`, height: `${THUMB_SIZE}px`, background }}
          >
            {meal.imageUrl ? (
              <img
                ref={imgRef}
                src={meal.imageUrl}
                alt={meal.name}
                onLoad={() => setImageLoaded(true)}
                className={`h-full w-full object-cover transition-all duration-500 ease-out ${
                  imageLoaded ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-60 blur-md"
                }`}
              />
            ) : (
              icon
            )}
          </div>
        </div>

        <DietMealCardRectangle>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="text-[15px] font-bold text-[#003677]">{meal.name}</span>
            {meal.items?.length ? (
              <div className="flex flex-nowrap gap-1">
                {meal.items.map((item, idx) => {
                  const scheme = CHIP_SCHEMES[idx % CHIP_SCHEMES.length];
                  return (
                    <span
                      key={idx}
                      className={`whitespace-nowrap rounded-[3px] border-[0.5px] px-1 py-0.5 text-[9px] font-medium ${scheme.className}`}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        </DietMealCardRectangle>

        <div className="absolute top-1/2 -translate-y-1/2" style={{ right: `${ARROW_INSET}px` }}>
          <NavArrowButton />
        </div>
      </div>
    </div>
  );
};

/** Skeleton-shaped placeholder for one meal row, shown while student/plan data loads. */
export const DietMealCardSkeleton: React.FC = () => (
  <div className="px-5 pb-4">
    <Skeleton className="mb-2 h-3 w-[120px] rounded" />
    <div className="relative" style={{ marginLeft: `${THUMB_OUTSIDE}px`, width: `calc(100% - ${THUMB_OUTSIDE}px)` }}>
      <Skeleton
        className="absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{ left: `-${THUMB_OUTSIDE}px`, width: `${THUMB_SIZE}px`, height: `${THUMB_SIZE}px` }}
      />
      <div
        className="box-border flex items-center rounded-bl-[3px] rounded-tl-[3px] rounded-br-xl rounded-tr-xl border border-[rgba(69,130,185,0.35)]"
        style={{ minHeight: `${THUMB_SIZE}px`, padding: `10px ${ARROW_SIZE + ARROW_INSET + 8}px 10px ${THUMB_INSIDE + THUMB_TEXT_GAP}px` }}
      >
        <Skeleton className="h-4 flex-1 rounded" />
      </div>
    </div>
  </div>
);
