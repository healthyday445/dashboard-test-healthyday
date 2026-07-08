import tabYoutubeLive from "@/assets/tab_youtube_live.webp";
import tabGuru from "@/assets/tab_guru.webp";
import tabPillUnion from "@/assets/tabs/tab_pill_union.svg";
import tabPillSubtract from "@/assets/tabs/tab_pill_subtract.svg";

export type CompletedBatchTab = "live" | "journey";

interface CompletedBatchTabsProps {
  activeTab: CompletedBatchTab;
  onChange: (tab: CompletedBatchTab) => void;
}

const TabButton = ({ icon, label, labelColor, left, width, onClick }: { icon: string; label: string; labelColor: string; left: string; width: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      top: 6,
      left,
      width,
      height: "100%",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
    }}
  >
    <img src={icon} alt="" style={{ width: "20px", height: "20px", objectFit: "contain", flexShrink: 0 }} />
    <span style={{ color: labelColor, fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, whiteSpace: "nowrap" }}>{label}</span>
  </button>
);

// tab_pill_union.svg is rendered at left:0/width:55% of the bar — matches its own raised pill exactly.
const UNION_LEFT_PCT = 0;
const UNION_WIDTH_PCT = 55;
// tab_pill_subtract.svg's recessed notch sits at x 206.5–390.5 of its 412-wide viewBox — matches its own path data exactly.
const NOTCH_LEFT_PCT = (206.5 / 412) * 100;
const NOTCH_WIDTH_PCT = (184 / 412) * 100;

// Each label keeps ONE fixed position regardless of which tab is active — matched to the
// Subtract notch (the more visually precise, bordered shape) so text never jumps on switch.
// Live sessions ends up ~2pt off the Union pill's own center when journey is active, and Your
// Yoga Journey ends up ~5pt off the flat right region's center when live is active — both are
// imperceptible without a competing shape to line up against, and far less jarring than a jump.
const LIVE_POS = { left: `${UNION_LEFT_PCT}%`, width: `${UNION_WIDTH_PCT}%` };
const JOURNEY_POS = { left: `${NOTCH_LEFT_PCT}%`, width: `${NOTCH_WIDTH_PCT}%` };

/**
 * Tab switcher between "Live sessions" (plans/upsell) and "Jagan's Yoga Journey" (rewards) on the
 * completed-batch page — uses the exact Figma "Union" (raised pill, Live sessions active) and
 * "Subtract" (inset notch, Yoga Journey active) background shapes for each state.
 */
export const CompletedBatchTabs: React.FC<CompletedBatchTabsProps> = ({ activeTab, onChange }) => {
  const isLive = activeTab === "live";

  return (
    <div style={{ position: "relative", width: "100%", height: "68px", background: isLive ? "#E2EFFF" : "transparent" }}>
      {isLive ? (
        <img src={tabPillUnion} alt="" style={{ position: "absolute", left: 0, bottom: -1, width: "55%", height: "58px" }} />
      ) : (
        <img src={tabPillSubtract} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      )}
      <TabButton icon={tabYoutubeLive} label="Live sessions" labelColor="#000" left={LIVE_POS.left} width={LIVE_POS.width} onClick={() => onChange("live")} />
      <TabButton icon={tabGuru} label="Your Yoga Journey" labelColor="#0A386F" left={JOURNEY_POS.left} width={JOURNEY_POS.width} onClick={() => onChange("journey")} />
    </div>
  );
};
