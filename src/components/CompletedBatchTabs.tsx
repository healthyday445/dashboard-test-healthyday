import tabYoutubeLive from "@/assets/tab_youtube_live.webp";
import tabGuru from "@/assets/tab_guru.webp";
import tabPillUnion from "@/assets/tabs/tab_pill_union.svg";
import tabPillSubtract from "@/assets/tabs/tab_pill_subtract.svg";

export type CompletedBatchTab = "live" | "journey";

interface CompletedBatchTabsProps {
  activeTab: CompletedBatchTab;
  onChange: (tab: CompletedBatchTab) => void;
}

const TabButton = ({ icon, label, labelColor, onClick }: { icon: string; label: string; labelColor: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      position: "relative",
      zIndex: 1,
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      height: "48px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
    }}
  >
    <img src={icon} alt="" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
    <span style={{ color: labelColor, fontFamily: "Outfit", fontSize: "14px", fontWeight: 700 }}>{label}</span>
  </button>
);

/**
 * Tab switcher between "Live sessions" (plans/upsell) and "Jagan's Yoga Journey" (rewards) on the
 * completed-batch page — uses the exact Figma "Union" (raised pill, Live sessions active) and
 * "Subtract" (inset notch, Yoga Journey active) background shapes for each state.
 */
export const CompletedBatchTabs: React.FC<CompletedBatchTabsProps> = ({ activeTab, onChange }) => (
  <div style={{ position: "relative", width: "100%", height: "68px", background: activeTab === "live" ? "#E2EFFF" : "#FFF" }}>
    {activeTab === "live" ? (
      <img src={tabPillUnion} alt="" style={{ position: "absolute", left: 0, top: "8px", width: "55%", height: "58px" }} />
    ) : (
      <img src={tabPillSubtract} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    )}
    <div style={{ position: "relative", display: "flex", alignItems: "center", height: "100%", padding: "0 4px" }}>
      <TabButton icon={tabYoutubeLive} label="Live sessions" labelColor="#000" onClick={() => onChange("live")} />
      <TabButton icon={tabGuru} label="Jagan's Yoga Journey" labelColor="#0A386F" onClick={() => onChange("journey")} />
    </div>
  </div>
);
