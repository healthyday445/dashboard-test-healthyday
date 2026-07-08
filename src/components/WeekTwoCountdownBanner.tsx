import { useNavigate } from "react-router-dom";
import { formatBatchStartLabel, getNextMonday } from "@/lib/utils";

interface WeekTwoCountdownBannerProps {
  daysLeft: number;
  // When false, the banner paints no background of its own (the parent supplies one instead)
  // — used by the 14-day-v2 tab experience so the banner blends into the shared Journey-tab
  // background instead of covering it with its own orange gradient. Defaults to true so the
  // original 14-day flow (no tab concept) is unaffected.
  showBackground?: boolean;
}

/** Week-2 upsell banner — replaces the plain "X Days Left" text block with a countdown + single CTA to /pricing. */
export const WeekTwoCountdownBanner: React.FC<WeekTwoCountdownBannerProps> = ({ daysLeft, showBackground = true }) => {
  const navigate = useNavigate();
  const nextBatchLabel = formatBatchStartLabel(getNextMonday());

  return (
    <div
      style={{
        width: "100%",
        padding: "24px 20px 28px",
        marginBottom: "-34px",
        boxSizing: "border-box",
        textAlign: "center",
        ...(showBackground ? { background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 226, 192) 25.005%, rgb(255, 226, 192) 50.01%, rgb(255, 148, 22) 100%)" } : {}),
      }}
    >
      <p style={{
        margin: 0,
        color: "#002B5E",
        fontFamily: "Poppins, Outfit, sans-serif",
        fontWeight: 800,
        fontSize: "28px",
        lineHeight: "normal",
        textAlign: "center",
        textTransform: "uppercase",
        textShadow: "0px 2px 4px rgba(0,0,0,0.25)",
      }}>
        Only {daysLeft} Days Left!
      </p>
      <p style={{ margin: "8px 0 16px", color: "#171717", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>
        Daily Yoga Batch starts on{" "}
        <span style={{ color: "#0D468B", fontWeight: 800 }}>{nextBatchLabel}</span>
      </p>
      <button
        onClick={() => navigate("/pricing")}
        style={{
          width: "246px",
          maxWidth: "100%",
          height: "40px",
          borderRadius: "30px",
          background: "#0A386F",
          border: "none",
          cursor: "pointer",
          boxShadow: "0px 4px 2px 0px rgba(0,0,0,0.25)",
        }}
      >
        <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, textTransform: "uppercase" }}>
          Join Daily Yoga Classes
        </span>
      </button>
    </div>
  );
};
