import type { Language } from "@/data/diet";
import type { FillerItem, MealFillerDef } from "@/data/diet/types";
import {
  getFillerIconAsset,
  getFillerStyle,
  HYDRATION_GLASS_ICON,
  HYDRATION_GLASS_ICON_DARK,
} from "@/lib/dietFillerIcon";

interface DietMealFillerProps {
  filler: MealFillerDef;
  language?: Language;
}

/** Fixed per-item column width shared by the icon row and the label row below it, so the
 *  two rows' items line up despite being separate flex rows (see `DietMealFiller`). */
const ITEM_COLUMN_WIDTH = "w-[52px]";

/** An item's glyph — an activity icon, or 1-2 hydration glasses. A hydration item that's
 *  the ONLY item in its filler (the standalone "after breakfast"/"after morning snack"
 *  rows) renders its glass(es) bare, with no circle behind them — per the Figma design,
 *  only hydration items paired with an activity in a combo row get the colored circle
 *  backdrop. */
const FillerIcon: React.FC<{ item: FillerItem; bare: boolean }> = ({ item, bare }) => {
  const { circleBg } = getFillerStyle(item.kind === "hydration" ? "hydration" : item.icon);
  const glasses =
    item.kind === "hydration" ? (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: item.glasses }, (_, i) => (
          <img
            key={i}
            src={bare ? HYDRATION_GLASS_ICON : HYDRATION_GLASS_ICON_DARK}
            alt=""
            className={bare ? "h-5 w-5" : "h-3.5 w-3.5"}
          />
        ))}
      </div>
    ) : (
      <img src={getFillerIconAsset(item.icon)} alt="" className="h-[25px] w-[25px]" />
    );
  return (
    <div className={`flex ${ITEM_COLUMN_WIDTH} flex-shrink-0 items-center justify-center`}>
      {bare ? (
        glasses
      ) : (
        <div
          className="flex size-[35px] flex-shrink-0 items-center justify-center gap-0.5 rounded-full"
          style={{ backgroundColor: circleBg }}
        >
          {glasses}
        </div>
      )}
    </div>
  );
};

/** Static reminder strip (hydration/activity/sleep) rendered between two meal cards on
 *  the diet page (Figma node 1569:19620, "Hydration+Movement"). Content is the same
 *  every day — see `MEAL_FILLERS_AFTER_SLOT` in `data/diet/mealFillers.ts`.
 *
 *  The connector lines sit in their own row with just the icons, vertically centered
 *  against icon height alone (not the icon+label block) — labels render in a second row
 *  below, sharing the same column widths/gaps so everything still lines up. */
export const DietMealFiller: React.FC<DietMealFillerProps> = ({ filler, language = "English" }) => {
  const isBareHydration = filler.items.length === 1 && filler.items[0].kind === "hydration";
  return (
    <div className="px-5 py-3">
      <div className="flex items-center">
        <div className="h-px min-w-4 flex-1 bg-[#D0D0D0]" />
        <div className="flex items-center justify-center gap-4 px-3">
          {filler.items.map((item, idx) => (
            <FillerIcon key={idx} item={item} bare={isBareHydration} />
          ))}
        </div>
        <div className="h-px min-w-4 flex-1 bg-[#D0D0D0]" />
      </div>
      <div className="mt-1.5 flex justify-center gap-4 px-3">
        {filler.items.map((item, idx) => {
          const { textColor } = getFillerStyle(item.kind === "hydration" ? "hydration" : item.icon);
          return (
            <p
              key={idx}
              className={`${ITEM_COLUMN_WIDTH} text-center text-[8px] font-semibold leading-tight`}
              style={{ color: textColor }}
            >
              {item.label[language]}
            </p>
          );
        })}
      </div>
    </div>
  );
};
