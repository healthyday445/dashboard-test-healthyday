import buyingIcon from "@/assets/diet/icons/buying.webp";

const GROCERY_LIST_URL = "https://dailyyogawithjagan.com/grocery-list";

/**
 * A genuinely floating button (Figma node 890:8661 — its y-position is identical across
 * every "Diet detailed N" frame regardless of that meal's total content height, and it has
 * a `backdrop-blur`, both of which only make sense for something that stays fixed on screen
 * while content scrolls underneath it — not an inline element next to a heading). Pinned to
 * the bottom-right of the same max-412px column the rest of the diet pages use, matching the
 * design's ~20px right margin.
 */
export const GroceryListButton = () => (
  <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-20 mx-auto max-w-[412px]">
    <div className="flex justify-end pr-5">
      <button
        onClick={() => window.open(GROCERY_LIST_URL, "_blank")}
        className="pointer-events-auto flex h-11 w-[154px] flex-shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[40px] border-none bg-[#FEAB27] shadow-[0_0_10px_1px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
      >
        <img src={buyingIcon} alt="" className="h-[21px] w-[21px]" />
        <span className="whitespace-nowrap text-base font-bold text-white">Grocery List</span>
      </button>
    </div>
  </div>
);
