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
  <div style={{ position: "fixed", bottom: "24px", left: 0, right: 0, maxWidth: "412px", margin: "0 auto", zIndex: 20, pointerEvents: "none" }}>
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
      <button
        onClick={() => window.open(GROCERY_LIST_URL, "_blank")}
        style={{
          pointerEvents: "auto",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "154px",
          height: "44px",
          borderRadius: "40px",
          border: "none",
          background: "#FEAB27",
          backdropFilter: "blur(2px)",
          boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
      >
        <img src={buyingIcon} alt="" style={{ width: "21px", height: "21px" }} />
        <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, color: "#FFF", whiteSpace: "nowrap" }}>Grocery List</span>
      </button>
    </div>
  </div>
);
