import React from "react";

export interface Milestone {
  label: string;
  reward: string | null;
  refs: number;
}

interface ReferralMilestonesCardProps {
  refCount: number;
  milestones: Milestone[];
  /** Label shown on the right of the "next" milestone row. Defaults to "IN PROGRESS". */
  nextLabel?: string;
}

// ── Sub-component: lock icon shown on unclaimed milestones ────────────────────
const LockIcon = ({ color = "#A2A2A2" }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────────

export const ReferralMilestonesCard: React.FC<ReferralMilestonesCardProps> = ({
  refCount,
  milestones,
  nextLabel = "IN PROGRESS",
}) => {
  // Find the first unclaimed milestone index
  const nextIdx = milestones.findIndex((m) => refCount < m.refs);

  // Build rows: insert "You are here" before first unclaimed milestone
  type MRow = { type: "milestone"; m: Milestone; claimed: boolean; isNext: boolean };
  type HRow = { type: "here" };
  type Row = MRow | HRow;

  const rows: Row[] = [];
  let hereInserted = false;
  milestones.forEach((m, idx) => {
    const claimed = refCount >= m.refs;
    const isNext = idx === nextIdx;
    if (idx === nextIdx && !hereInserted) {
      rows.push({ type: "here" });
      hereInserted = true;
    }
    rows.push({ type: "milestone", m, claimed, isNext });
  });
  if (!hereInserted) rows.push({ type: "here" }); // all claimed

  return (
    <div style={{ position: "relative" }}>
      {/* Vertical connecting line */}
      <div
        style={{
          position: "absolute",
          left: "15px",
          top: "16px",
          bottom: "16px",
          width: "3px",
          background: "#DDDEDE",
          borderRadius: "2px",
          zIndex: 0,
        }}
      />

      {rows.map((row, ri) => {
        if (row.type === "here") {
          if (refCount === 0) {
            return (
              <div
                key="here"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "33px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="11" fill="#FF0000" />
                  </svg>
                </div>
                <span
                  style={{
                    color: "#F00",
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}
                >
                  0 Referrals
                </span>
                <div
                  style={{
                    width: "106px",
                    height: "28px",
                    borderRadius: "20px",
                    border: "1px solid #F00",
                    background: "rgba(254, 171, 39, 0.20)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#F00",
                      textAlign: "center",
                      fontFamily: "Outfit",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                    }}
                  >
                    You are here
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div
              key="here"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "33px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#FEAB27",
                    boxShadow: "0 0 0 4px rgba(254,171,39,0.25)",
                  }}
                />
              </div>
              <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600 }}>
                {refCount} Referrals
              </span>
              <div
                style={{
                  height: "21px",
                  borderRadius: "20px",
                  border: "1px solid #FEAB27",
                  background: "rgba(254,171,39,0.20)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                }}
              >
                <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600 }}>
                  You are here
                </span>
              </div>
            </div>
          );
        }

        const { m, claimed, isNext } = row as MRow;
        const isLastRow = ri === rows.length - 1;
        return (
          <div
            key={m.refs}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: isLastRow ? 0 : "14px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {claimed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E" />
                  {m.reward ? (
                    <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">
                      {m.reward}
                    </text>
                  ) : (
                    <path
                      d="M10 16.5L14.5 21L23 12"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              ) : (
                <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                    {isNext ? (
                      <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" />
                    ) : (
                      <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />
                    )}
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <LockIcon color={isNext ? "#FEAB27" : "#A2A2A2"} />
                  </div>
                </div>
              )}
              <div>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "normal",
                    color: claimed ? "#377456" : isNext ? "#FEAB27" : "#9A9797",
                  }}
                >
                  {claimed && m.reward ? (
                    <>
                      <span style={{ color: "#377456" }}>{m.reward}</span> Free Classes
                    </>
                  ) : (
                    m.label
                  )}
                </div>
                <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>
                  {m.refs} Referrals
                </div>
              </div>
            </div>
            {claimed && (
              <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>
                CLAIMED 🎁
              </span>
            )}
            {isNext && (
              <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>
                {nextLabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReferralMilestonesCard;
