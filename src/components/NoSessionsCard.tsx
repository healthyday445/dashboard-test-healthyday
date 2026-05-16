import React from "react";

/**
 * Session-info card shown on the paid dashboard when no sessions are currently live.
 *
 * Two states based on time of day:
 * 1. After all classes are done (≥ 8:30 PM / 1230 min until midnight)
 *    → "Next Session is Tomorrow"
 * 2. After midnight (< 5:30 AM / 330 min) OR between morning/evening blocks
 *    → "Next Live at <next time>"
 */

interface NoSessionsCardProps {
  /** Current time of day in minutes since midnight (IST) */
  totalMin: number;
}

const NoSessionsCard: React.FC<NoSessionsCardProps> = ({ totalMin }) => {
  // After evening sessions end (8:30 PM = 1230 min) until midnight → "Tomorrow"
  const isTomorrow = totalMin >= 1230;

  // Find the next session label to show as the highlighted time
  // Morning begins at 330 (5:30 AM), Evening begins at 1050 (5:30 PM)
  let nextSessionLabel = "5:30 AM";
  if (totalMin >= 570 && totalMin < 1050) {
    nextSessionLabel = "5:30 PM";
  }

  const title = isTomorrow
    ? "Next Session is Tomorrow"
    : `Next Live at ${nextSessionLabel}`;

  // Session times row — always show morning times for "tomorrow" and "before morning"
  // Show evening times for the midday gap
  const isMidDayGap = totalMin >= 570 && totalMin < 1050;
  const sessionTimes = isMidDayGap
    ? ["5:30 PM", "6:30 PM", "7:30 PM"]
    : ["5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM"];

  return (
    <div
      style={{
        width: "358px",
        height: "auto",
        minHeight: "146px",
        maxWidth: "100%",
        borderRadius: "12px",
        border: "1.5px solid #D2D2D2",
        background: "#FFF",
        boxShadow:
          "-1px -1px 4px 0 rgba(0, 0, 0, 0.10), 1px 1px 4px 0 rgba(0, 0, 0, 0.10)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        gap: "12px",
      }}
    >
      {/* Top row: badge image + text */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px, 3vw, 12px)",
        }}
      >
        {/* Badge illustration */}
        <div
          style={{
            width: "clamp(64px, 20vw, 82px)",
            height: "auto",
            aspectRatio: "82/81",
            background:
              'url("/8ea326ab563adb61ccb99b953865cb3132c173ab.png") lightgray -5.311px -5.747px / 112.404% 113.525% no-repeat',
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />

        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
          <span
            style={{
              color: "#0D468B",
              fontFamily: "Outfit",
              fontSize: "clamp(17px, 5vw, 20px)",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "1.2",
            }}
          >
            {title}
          </span>
          <span
            style={{
              color: "#7990AC",
              fontFamily: "Outfit",
              fontSize: "clamp(13px, 4vw, 15px)",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.4",
            }}
          >
            Open the link during live timings
          </span>
        </div>
      </div>

      {/* Session times row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(4px, 1.5vw, 6px)",
          flexWrap: "wrap",
        }}
      >
        {sessionTimes.map((time, idx) => (
          <React.Fragment key={time}>
            {idx > 0 && (
              <span
                style={{
                  color: "#CCCBCB",
                  fontFamily: "Outfit",
                  fontSize: "clamp(14px, 4vw, 17px)",
                  fontStyle: "normal",
                  fontWeight: 800,
                  lineHeight: "normal",
                }}
              >
                |
              </span>
            )}
            <span
              style={{
                color: "#FEAB27",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "clamp(14px, 4vw, 17px)",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
                whiteSpace: "nowrap",
              }}
            >
              {time}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NoSessionsCard;
