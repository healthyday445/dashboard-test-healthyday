import tabSubtract from "@/assets/tab_subtract.svg";
import tabYoutubeLive from "@/assets/tab_youtube_live.webp";
import tabGuru from "@/assets/tab_guru.webp";

interface DashboardTabBarProps {
  active: "dashboard" | "journey";
  onTabChange: (tab: "dashboard" | "journey") => void;
}

const DashboardTabBar = ({ active, onTabChange }: DashboardTabBarProps) => {
  const isLeftActive = active === "dashboard";

  return (
    <div style={{ width: "100%", height: "68px", position: "relative" }}>
      {/* Full-width Subtract background — mirrored when right (journey) tab is active */}
      <img
        src={tabSubtract}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transform: isLeftActive ? "none" : "scaleX(-1)",
          pointerEvents: "none",
        }}
      />

      {/* Left half click area */}
      <div
        onClick={() => onTabChange("dashboard")}
        style={{
          position: "absolute",
          left: 0, top: 0,
          width: "50%", height: "100%",
          cursor: isLeftActive ? "default" : "pointer",
          zIndex: 2,
        }}
      />

      {/* Right half click area */}
      <div
        onClick={() => onTabChange("journey")}
        style={{
          position: "absolute",
          right: 0, top: 0,
          width: "50%", height: "100%",
          cursor: !isLeftActive ? "default" : "pointer",
          zIndex: 2,
        }}
      />

      {/* Live sessions — left tab */}
      <div style={{
        position: "absolute",
        left: "53px",
        top: 0,
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        pointerEvents: "none",
        zIndex: 3,
      }}>
        <img src={tabYoutubeLive} alt="" style={{ width: "20px", height: "20px" }} />
        <span style={{
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "Outfit, sans-serif",
          color: isLeftActive ? "#000000" : "#0a386f",
          whiteSpace: "nowrap",
        }}>
          Live sessions
        </span>
      </div>

      {/* Jagan's Yoga Journey — right tab */}
      <div style={{
        position: "absolute",
        left: "calc(50% + 11px)",
        top: 0,
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        pointerEvents: "none",
        zIndex: 3,
      }}>
        <img src={tabGuru} alt="" style={{ width: "20px", height: "20px" }} />
        <span style={{
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "Outfit, sans-serif",
          color: !isLeftActive ? "#000000" : "#0a386f",
          whiteSpace: "nowrap",
        }}>
          Jagan's Yoga Journey
        </span>
      </div>
    </div>
  );
};

export default DashboardTabBar;
