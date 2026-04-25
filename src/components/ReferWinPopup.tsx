import React from "react";
import { useNavigate } from "react-router-dom";

// ─── Dynamic Milestone Window System ───────────────────────────────────────────
// Shows only 2 milestones at a time and clamps indicator position to guarantee
// minimum spacing between labels. Prevents all text/icon collisions.
const ALL_REF_MILESTONES = [
  { count: 5, label: "+10 FREE Classes", lines: ["+10 FREE", "Classes"] },
  { count: 10, label: "+20 FREE Classes", lines: ["+20 FREE", "Classes"] },
  { count: 20, label: "Healthyday T-shirt", lines: ["Healthyday", "T-shirt"] },
  { count: 40, label: "Water Bottle", lines: ["Water", "Bottle"] },
  { count: 60, label: "Yoga Mat", lines: ["Yoga Mat"] },
];

export function getRefWindow(refCount: number) {
  const nextIdx = ALL_REF_MILESTONES.findIndex(m => refCount < m.count);

  let milestones: typeof ALL_REF_MILESTONES;
  let windowEnd: number;

  if (nextIdx === -1) {
    // All milestones completed — show last two
    milestones = ALL_REF_MILESTONES.slice(-2);
    windowEnd = 65;
  } else if (nextIdx <= 1) {
    // Early stage (0–12 referrals): show [5, 10]
    milestones = ALL_REF_MILESTONES.slice(0, 2);
    windowEnd = 13;
  } else {
    // Show next + one future milestone (max 2 for clean spacing)
    const end = Math.min(nextIdx + 2, ALL_REF_MILESTONES.length);
    milestones = ALL_REF_MILESTONES.slice(nextIdx, end);
    const last = milestones[milestones.length - 1];
    windowEnd = Math.round(last.count * 1.1);
  }

  // --- Indicator position with minimum-gap enforcement ---
  const reachedMs = milestones.filter(m => refCount >= m.count);
  const mergedMs = reachedMs.length > 0 ? reachedMs[reachedMs.length - 1] : null;
  const showStandalone = !mergedMs;

  const naturalPos = refCount === 0 ? 9 : Math.max(9, (refCount / windowEnd) * 100);
  const nextMs = milestones.find(m => refCount < m.count);
  const nextMsPos = nextMs ? (nextMs.count / windowEnd) * 100 : 100;
  const MIN_GAP = 25; // 25% of track width — guarantees ~85px on a 340px track

  let indicatorPos = naturalPos;
  if (showStandalone && nextMs && (nextMsPos - naturalPos) < MIN_GAP) {
    indicatorPos = Math.max(9, nextMsPos - MIN_GAP);
  }

  return {
    milestones,
    windowEnd,
    indicatorPos,
    progressPct: Math.min(100, indicatorPos),
    mergedMs,
    showStandalone,
    indicatorColor: refCount === 0 ? "#FF0000" : "#FEAB27",
  };
}
// ────────────────────────────────────────────────────────────────────────────────

// ── Pin SVG used for "You are here" indicator ─────────────────────────────────
const PinSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 21 24" fill="none">
    <path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" fill="white" />
    <path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" fill="white" />
    <path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Refer Now icon ────────────────────────────────────────────────────────────
const ReferNowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
    <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Progress bar sub-component (exported for reuse in 14DaysCompleted popup) ──
export const ReferralProgressBar: React.FC<{ refCount: number }> = ({ refCount }) => {
  const { milestones: allMilestones, windowEnd, indicatorPos, progressPct, mergedMs, showStandalone, indicatorColor } = getRefWindow(refCount);

  return (
    <div style={{ position: "relative", marginTop: "60px", marginBottom: "40px" }}>
      {/* Grey track */}
      <div style={{ height: "6px", background: "#AAA", borderRadius: "3px", marginLeft: "9%" }}>
        <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
      </div>
      {/* Standalone indicator */}
      {showStandalone && (
        <div style={{ position: "absolute", left: `${indicatorPos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="9.5" fill={indicatorColor} /></svg>
          <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4px" }}>
            <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "6px", whiteSpace: "nowrap" }}>You are here</div>
            <PinSvg />
          </div>
          <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px", textAlign: "center", whiteSpace: "nowrap" }}>
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{refCount} Referrals</span>
          </div>
        </div>
      )}
      {/* Milestone dots */}
      {allMilestones.map((m) => {
        const pos = (m.count / windowEnd) * 100;
        const reached = refCount >= m.count;
        const isMerged = mergedMs?.count === m.count;
        return (
          <div key={m.count} style={{ position: "absolute", left: `${pos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
            {isMerged ? (
              <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "2px" }}>You are here</div>
                <PinSvg />
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, marginTop: "2px", whiteSpace: "nowrap" }}>{m.label}</span>
              </div>
            ) : (
              <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>{m.label}</span>
              </div>
            )}
            {reached ? (
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#DDDEDE" />
                <path d="M10.4243 11.1512V9.21185C10.4243 8.6975 10.6286 8.2042 10.9923 7.8405C11.356 7.47679 11.8493 7.27246 12.3637 7.27246C12.878 7.27246 13.3713 7.47679 13.735 7.8405C14.0987 8.2042 14.3031 8.6975 14.3031 9.21185V11.1512M8.96973 12.1209C8.96973 11.8638 9.07189 11.6171 9.25374 11.4353C9.4356 11.2534 9.68224 11.1512 9.93942 11.1512H14.7879C15.0451 11.1512 15.2917 11.2534 15.4736 11.4353C15.6554 11.6171 15.7576 11.8638 15.7576 12.1209V15.03C15.7576 15.2872 15.6554 15.5339 15.4736 15.7157C15.2917 15.8976 15.0451 15.9997 14.7879 15.9997H9.93942C9.68224 15.9997 9.4356 15.8976 9.25374 15.7157C9.07189 15.5339 8.96973 15.2872 8.96973 15.03V12.1209ZM11.8788 13.5755C11.8788 13.7041 11.9299 13.8274 12.0208 13.9183C12.1118 14.0093 12.2351 14.0603 12.3637 14.0603C12.4923 14.0603 12.6156 14.0093 12.7065 13.9183C12.7974 13.8274 12.8485 13.7041 12.8485 13.5755C12.8485 13.4469 12.7974 13.3236 12.7065 13.2327C12.6156 13.1417 12.4923 13.0906 12.3637 13.0906C12.2351 13.0906 12.1118 13.1417 12.0208 13.2327C11.9299 13.3236 11.8788 13.4469 11.8788 13.5755Z" stroke="#A2A2A2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <div style={{ position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{m.count} Referrals</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Main popup component ──────────────────────────────────────────────────────

interface ReferWinPopupProps {
  refCount: number;
  onClose: () => void;
  referNowUrl: string;
}

export const ReferWinPopup: React.FC<ReferWinPopupProps> = ({ refCount, onClose, referNowUrl }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div className="hd-popup-content" style={{ height: "200px", pointerEvents: "auto" }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>REFER & WIN</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ aspectRatio: "1/1" }}>
              <path d="M11 1L1 11M1 1L11 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <ReferralProgressBar refCount={refCount} />

        {/* Refer Now Button */}
        <button
          onClick={() => navigate(referNowUrl)}
          style={{ width: "100%", height: "43px", borderRadius: "14px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }}
        >
          <ReferNowIcon />
          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>Refer Now</span>
        </button>
      </div>
    </div>
  );
};

export default ReferWinPopup;
