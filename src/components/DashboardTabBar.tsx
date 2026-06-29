import tabYoutubeLive from "@/assets/tab_youtube_live.webp";
import tabGuru from "@/assets/tab_guru.webp";

interface DashboardTabBarProps {
  active: "dashboard" | "journey";
  onTabChange: (tab: "dashboard" | "journey") => void;
}

const DashboardTabBar = ({ active, onTabChange }: DashboardTabBarProps) => {
  const isLeftActive = active === "dashboard";

  return (
    <div style={{ width: "90%", margin: "0 auto", height: "4.25rem", display: "flex" }}>
      {/* Left tab — Live sessions */}
      <div
        onClick={() => onTabChange("dashboard")}
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer",
          paddingTop: "1rem",
        }}
      >
        <img src={tabYoutubeLive} alt="" style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
        <span style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          fontFamily: "Outfit, sans-serif",
          color: isLeftActive ? "#000000" : "#0a386f",
          whiteSpace: "nowrap",
        }}>
          Live sessions
        </span>
      </div>

      {/* Right tab — Your Yoga Journey */}
      <div
        onClick={() => onTabChange("journey")}
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer",
          paddingTop: "1rem",
        }}
      >
        <img src={tabGuru} alt="" style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
        <span style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          fontFamily: "Outfit, sans-serif",
          color: !isLeftActive ? "#000000" : "#0a386f",
          whiteSpace: "nowrap",
        }}>
          Your Yoga Journey
        </span>
      </div>
    </div>
  );
};

export default DashboardTabBar;
