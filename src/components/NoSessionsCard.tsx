import React from "react";

/**
 * Session-info card shown on the paid dashboard when no sessions are currently live.
 *
 * Two states based on time of day:
 * 1. After all classes are done (≥ 7:30 PM / 1170 min until midnight)
 *    → "Next Session is Tomorrow"
 * 2. After midnight (< 5:30 AM / 330 min) OR between morning/evening blocks
 *    → "Session Live at <next time>"
 */

interface NoSessionsCardProps {
  /** Current time of day in minutes since midnight (IST) */
  totalMin: number;
}

const NoSessionsCard: React.FC<NoSessionsCardProps> = ({ totalMin }) => {
  // After evening sessions end (7:30 PM = 1170 min) until midnight → "Tomorrow"
  const isTomorrow = totalMin >= 1170;

  // Find the next session label to show as the highlighted time
  // Morning: 330, 390, 450, 510  Evening: 990, 1050, 1110
  let nextSessionLabel = "5:30 AM";
  if (totalMin >= 570 && totalMin < 990) {
    nextSessionLabel = "4:30 PM";
  }

  const title = isTomorrow
    ? "Next Session is Tomorrow"
    : `Session Live at ${nextSessionLabel}`;

  // Session times row — always show morning times for "tomorrow" and "before morning"
  // Show evening times for the midday gap
  const isMidDayGap = totalMin >= 570 && totalMin < 990;
  const sessionTimes = isMidDayGap
    ? ["4:30 PM", "5:30 PM", "6:30 PM"]
    : ["5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM"];

  return (
    <div
      style={{
        width: "358px",
        height: "146px",
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
          gap: "12px",
        }}
      >
        {/* Badge illustration */}
        <div
          style={{
            width: "82px",
            height: "81px",
            aspectRatio: "82/81",
            background:
              'url("/8ea326ab563adb61ccb99b953865cb3132c173ab.png") lightgray -5.311px -5.747px / 112.404% 113.525% no-repeat',
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />

        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span
            style={{
              width: "244px",
              color: "#0D468B",
              fontFamily: "Outfit",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            {title}
          </span>
          <span
            style={{
              width: "244px",
              color: "#7990AC",
              fontFamily: "Outfit",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px",
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
          gap: "6px",
        }}
      >
        {sessionTimes.map((time, idx) => (
          <React.Fragment key={time}>
            {idx > 0 && (
              <span
                style={{
                  color: "#CCCBCB",
                  fontFamily: "Outfit",
                  fontSize: "17px",
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
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
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
