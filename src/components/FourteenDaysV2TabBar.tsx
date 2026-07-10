import tabYoutubeLive from "@/assets/tab_youtube_live.webp";
import tabGuru from "@/assets/tab_guru.webp";
import tabPillUnion from "@/assets/tabs/tab_pill_union.svg";
import tabPillSubtract from "@/assets/tabs/tab_pill_subtract.svg";

export type FourteenDaysV2Tab = "live" | "journey";

interface FourteenDaysV2TabBarProps {
  activeTab: FourteenDaysV2Tab;
  onChange: (tab: FourteenDaysV2Tab) => void;
  // Week-2 variant: Figma's week-2 "Tabs" frame fills this band with a near-transparent
  // rgba(255,255,255,0.01) + inset shadow instead of a flat #E2EFFF, so it blends into
  // whichever background the parent wrapper supplies (countdown-banner gradient, or the
  // scenic Journey-tab image) rather than covering it with its own flat color.
  blendWithParentBackground?: boolean;
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
// Week-2's own Journey-active Tabs frame (Figma node 359-26532) never uses the Subtract
// notch at all — it reuses the same raised Union pill as the Live-active state, just slid
// over to sit under "Your Yoga Journey" instead (left: calc(37.5% + 29.5px) of a 412-wide bar).
const WEEK2_JOURNEY_UNION_LEFT_PCT = ((0.375 * 412 + 29.5) / 412) * 100;

const LIVE_POS = { left: `${UNION_LEFT_PCT}%`, width: `${UNION_WIDTH_PCT}%` };
const JOURNEY_POS = { left: `${NOTCH_LEFT_PCT}%`, width: `${NOTCH_WIDTH_PCT}%` };

/**
 * "Live sessions" / "Your Yoga Journey" pill tab switcher for the 14-day-v2 batch experience
 * (both the ongoing tabs Dashboard.tsx renders, and the completed-state tabs
 * IndexFourteenDaysV2.tsx renders on its own). Deliberately its own module rather than
 * reusing CompletedBatchTabs.tsx (the 21-day cohort's equivalent) — the two cohorts' tab
 * bars need to evolve independently (e.g. blending with the Week-2 countdown banner here)
 * without risking regressions in the other's styling.
 */
export const FourteenDaysV2TabBar: React.FC<FourteenDaysV2TabBarProps> = ({ activeTab, onChange, blendWithParentBackground = false }) => {
  const isLive = activeTab === "live";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "68px",
        ...(blendWithParentBackground
          ? { background: "rgba(255,255,255,0.01)", boxShadow: "inset 0px -1px 1px 0px rgba(0,0,0,0.2)" }
          : { background: isLive ? "#E2EFFF" : "transparent" }),
      }}
    >
      {blendWithParentBackground ? (
        // Week-2: always the raised (white) Union pill, never the recessed Subtract notch —
        // just repositioned under whichever tab is active.
        <img
          src={tabPillUnion}
          alt=""
          style={{ position: "absolute", left: isLive ? "0%" : `${WEEK2_JOURNEY_UNION_LEFT_PCT}%`, bottom: -1, width: "55%", height: "58px" }}
        />
      ) : isLive ? (
        <img src={tabPillUnion} alt="" style={{ position: "absolute", left: 0, bottom: -1, width: "55%", height: "58px" }} />
      ) : (
        <img src={tabPillSubtract} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      )}
      <TabButton icon={tabYoutubeLive} label="Live sessions" labelColor="#000" left={LIVE_POS.left} width={LIVE_POS.width} onClick={() => onChange("live")} />
      <TabButton icon={tabGuru} label="Your Yoga Journey" labelColor="#0A386F" left={JOURNEY_POS.left} width={JOURNEY_POS.width} onClick={() => onChange("journey")} />
    </div>
  );
};
