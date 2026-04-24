import React from "react";

/**
 * "No Yoga Sessions Right Now" card shown on the paid dashboard
 * when no regular yoga slots or bonus sessions are currently active.
 */
const NoSessionsCard: React.FC = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    }}
  >
    {/* Illustration */}
    <div
      style={{
        width: "329px",
        height: "248px",
        aspectRatio: "65/49",
        background:
          'url("/Sunday Session Update 1 (1).png") lightgray 0px -35px / 100% 132.661% no-repeat',
        borderRadius: "12px",
        flexShrink: 0,
      }}
    />

    {/* Title */}
    <span
      style={{
        width: "328px",
        color: "#0D468B",
        textAlign: "center",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
        fontFamily: "Outfit",
        fontSize: "25px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "normal",
      }}
    >
      No Yoga Sessions Right Now
    </span>

    {/* Subtitle */}
    <span
      style={{
        width: "341px",
        color: "#7C7A7A",
        textAlign: "center",
        fontFamily: "Outfit",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "24px",
      }}
    >
      Check back during session timings
    </span>
  </div>
);

export default NoSessionsCard;
