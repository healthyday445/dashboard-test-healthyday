import React from "react";

/**
 * Session-info card shown on the paid dashboard when no sessions are currently live.
 *
 * Two states based on time of day:
 * 1. After all classes are done (≥ 7:30 PM / 1170 min until midnight)
 *    → "Next Session is Tomorrow"
 * 2. After midnight (< 5:30 AM / 330 min) OR between morning/evening blocks
 *    → "Next Live at <next time>"
 */

interface NoSessionsCardProps {
  /** Current time of day in minutes since midnight (IST) */
  totalMin: number;
  /** Whether this is for the 14-days free batch (changes title & adds note) */
  isFreeBatch?: boolean;
}

const NoSessionsCard: React.FC<NoSessionsCardProps> = ({ totalMin, isFreeBatch }) => {
  // After evening sessions end (7:30 PM = 1170 min) until midnight → "Tomorrow"
  const isTomorrow = totalMin >= 1170;

  // Find the next session label to show as the highlighted time
  let nextSessionLabel = "5:30 AM";
  if (totalMin >= 570 && totalMin < 945) {
    nextSessionLabel = "4:30 PM";
  }

  let title = isTomorrow
    ? "Next Session is Tomorrow"
    : `Next Live at ${nextSessionLabel}`;
    
  if (isFreeBatch) {
    title = isTomorrow
      ? `Next Yoga session is Tomorrow at 5:30AM`
      : `Next Yoga session is at ${nextSessionLabel.replace(" ", "")}`;
  }

  // Session times row — always show morning times for "tomorrow" and "before morning"
  // Show evening times for the midday gap
  const isMidDayGap = totalMin >= 570 && totalMin < 945;
  const sessionTimes = isMidDayGap
    ? ["4:30 PM", "5:30 PM", "6:30 PM"]
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

      {isFreeBatch && (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
            <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
            <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
            <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
            <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: "#747474", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "20px", textAlign: "center" }}>
            Note: No recordings are available for FREE batch
          </span>
        </div>
      )}
    </div>
  );
};

export default NoSessionsCard;
