import { trackSessionClick } from "@/lib/trackSessionClick";
import type { PaidBonusCard } from "@/lib/paidBonusSessions";

const PlayButton = () => (
  <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68" height="48" rx="14" fill="#FF0000" fillOpacity="0.95" />
    <path d="M45 24L28 34V14L45 24Z" fill="white" />
  </svg>
);

interface PaidBonusSessionCardProps {
  bonusCard: PaidBonusCard;
  totalMin: number;
  mobile?: string;
}

/** "Face Yoga" / "Diet" / "Breath to Heal" bonus card shown to eligible paid plans near the session's start time. */
export const PaidBonusSessionCard: React.FC<PaidBonusSessionCardProps> = ({ bonusCard, totalMin, mobile }) => {
  // Extended from 30 to 45 min so "live" runs through the full eligibility window
  // (startMin-30 to startMin+45) — otherwise the last 15 min fell back to the
  // non-live "Session Starts at X" copy, showing an already-past start time.
  const isLive = totalMin >= bonusCard.startMin && totalMin < bonusCard.startMin + 45;
  const timeLabel = bonusCard.fullName.replace(/^.*at\s+/, "");
  const handleClick = () => trackSessionClick(mobile, bonusCard.code);

  return (
    <div style={{ padding: "24px 20px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>
          {isLive ? `${bonusCard.name} - Live Now` : `Next Session - ${bonusCard.name}`}
        </h2>
        {isLive && (
          <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
            <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>LIVE</span>
          </div>
        )}
      </div>

      <div style={{ width: "100%" }}>
        <a href={bonusCard.sessionLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px 12px 0 0", overflow: "hidden", background: "#000", position: "relative" }}>
          <img
            src={bonusCard.thumbnail}
            alt={bonusCard.name}
            style={{ width: "100%", height: "auto", aspectRatio: "372/204", objectFit: "cover", opacity: 0.85, display: "block" }}
          />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PlayButton />
          </div>
        </a>
        <div style={{
          width: "100%", height: "67px",
          borderRadius: "0 0 12px 12px",
          border: "1.5px solid #E9E9E9", background: "#FFF",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box",
        }}>
          {isLive ? (
            <a href={bonusCard.sessionLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{
              width: "300px", height: "40px", borderRadius: "10px", background: "#FEAB27",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none",
              boxShadow: "0 2px 8px rgba(254,171,39,0.35)",
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN NOW</span>
            </a>
          ) : (
            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>
              Session Starts at {timeLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
