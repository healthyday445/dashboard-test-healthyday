import heroBanner from "@/assets/diet/diet-hero-banner.webp";

export interface DietDateTab {
  dateKey: string;
  label: string; // "Today" | "Tomorrow" | weekday abbreviation
  dayOfMonth: string; // "03"
}

interface DietDateTabBarProps {
  tabs: DietDateTab[];
  activeIdx: number;
  onChange: (idx: number) => void;
  disabled?: boolean;
}

/**
 * Bespoke 5-pill date strip for the diet page — kept separate from ui/tabs.tsx and from
 * FourteenDaysV2TabBar/CompletedBatchTabs (this app's convention is one small per-feature
 * tab component rather than a shared abstraction, and this pill visual — a white card only
 * behind the active tab, plain muted text otherwise, over an illustrated banner — doesn't
 * match either existing option). Background is the actual Figma banner artwork (leaves,
 * wavy hills, food icons baked into the image) rather than a CSS gradient recreation.
 */
export const DietDateTabBar: React.FC<DietDateTabBarProps> = ({ tabs, activeIdx, onChange, disabled = false }) => (
  <div
    style={{
      backgroundImage: `url(${heroBanner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: "16px 16px 12px",
    }}
  >
    <p style={{ margin: "0 0 16px", color: "#0D468B", fontFamily: "Outfit", fontSize: "17px", fontWeight: 700, textAlign: "center" }}>
      Your Daily Diet Routine
    </p>
    <div style={{ display: "flex", justifyContent: "space-between", gap: "2px" }}>
      {tabs.map((tab, idx) => {
        const active = idx === activeIdx;
        return (
          <button
            key={tab.dateKey}
            type="button"
            disabled={disabled}
            onClick={() => onChange(idx)}
            style={{
              flex: active ? "1.15" : "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: active ? "8px 6px 9px" : "8px 4px",
              border: "none",
              borderRadius: "12px",
              background: active ? "#FFF" : "transparent",
              boxShadow: active ? "0 2px 6px 0 rgba(0,0,0,0.18)" : "none",
              cursor: disabled ? "default" : "pointer",
            }}
          >
            <span style={{ fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, color: active ? "#202020" : "#8B8B8B" }}>
              {tab.label}
            </span>
            <span style={{ fontFamily: "Outfit", fontSize: "15px", fontWeight: 700, color: active ? "#202020" : "#8B8B8B" }}>
              {tab.dayOfMonth}
            </span>
            {active && <span style={{ width: "22px", height: "3px", background: "#FEAB27", borderRadius: "2px" }} />}
          </button>
        );
      })}
    </div>
  </div>
);
