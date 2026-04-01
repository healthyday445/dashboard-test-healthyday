import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

// ── API types ─────────────────────────────────────────────────────────────────

interface ApiReferral {
  referred_mobile: string;
  referral_date: string;
  is_redeemed_for_free_classes: boolean;
  is_redeemed_for_gift: boolean;
}

interface ReferralsApiData {
  total_referrals: number;
  referrals_required_for_next_free_classes: number;
  referrals_required_for_next_gift: number;
  referrals: ApiReferral[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MILESTONES = [
  { label: "10 Free Classes", reward: "+10", refs: 5 },
  { label: "20 Free Classes", reward: "+20", refs: 10 },
  { label: "Healthyday T-shirt", reward: null, refs: 20 },
  { label: "Special Gift", reward: null, refs: 40 },
  { label: "Yoga Mat", reward: null, refs: 60 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** "+919876543210" → "+91 98 ******10" */
const maskMobile = (raw: string): string => {
  const digits = raw.replace(/\D/g, ""); // strip non-digits
  const local = digits.startsWith("91") ? digits.slice(2) : digits;
  if (local.length < 4) return raw;
  return `+91 ${local.slice(0, 2)} ******${local.slice(-2)}`;
};

/** "2026-01-15" → "Jan 15" */
const formatDate = (iso: string): string => {
  const [, mm, dd] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(mm) - 1]} ${Number(dd)}`;
};

// ── Sub-components ────────────────────────────────────────────────────────────

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

const PersonIcon = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
    <path
      d="M5 7C6.657 7 8 5.657 8 4C8 2.343 6.657 1 5 1C3.343 1 2 2.343 2 4C2 5.657 3.343 7 5 7ZM5 8.5C2.493 8.5 0 9.75 0 11.5V13H10V11.5C10 9.75 7.507 8.5 5 8.5Z"
      fill="#A2A2A2"
    />
  </svg>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const ReferralStatus = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Use URL param as optimistic initial value; API response will override
  const initialCount =
    Number(searchParams.get("count")) ||
    Number(sessionStorage.getItem("total_referral_count")) ||
    0;
  const mobile =
    searchParams.get("mobile") ||
    sessionStorage.getItem("referrer_mobile") ||
    "";

  const [apiData, setApiData] = useState<ReferralsApiData | null>(null);
  const [loading, setLoading] = useState(true);

  const shareLink = mobile
    ? `https://healthyday.co.in/free-programmes?ref=91${mobile}`
    : "healthyday.app/ref=ggtujev58";

  useEffect(() => {
    if (!mobile) { setLoading(false); return; }
    const encodedMobile = encodeURIComponent(`+91${mobile}`);
    fetch(`/.netlify/functions/referrals?mobile=${encodedMobile}`)
      .then((r) => r.json())
      .then((data: ReferralsApiData) => setApiData(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [mobile]);

  // Live count from API; fall back to URL param while loading
  const totalRefs = apiData?.total_referrals ?? initialCount;
  const referrals: ApiReferral[] = apiData?.referrals ?? [];
  const refsForNextClasses = apiData?.referrals_required_for_next_free_classes ?? null;
  const refsForNextGift = apiData?.referrals_required_for_next_gift ?? null;

  const handleReferNow = () => {
    const msg = encodeURIComponent(`Join me on Healthyday! ${shareLink}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  // Build milestone rows — insert "You are here" before first unclaimed milestone
  const nextIdx = MILESTONES.findIndex((m) => totalRefs < m.refs);
  type MRow = { type: "milestone"; m: (typeof MILESTONES)[0]; claimed: boolean; isNext: boolean };
  type HRow = { type: "here" };
  type Row = MRow | HRow;

  const rows: Row[] = [];
  let hereInserted = false;
  MILESTONES.forEach((m, idx) => {
    const claimed = totalRefs >= m.refs;
    const isNext = idx === nextIdx;
    if (idx === nextIdx && !hereInserted && totalRefs > 0) {
      rows.push({ type: "here" });
      hereInserted = true;
    }
    rows.push({ type: "milestone", m, claimed, isNext });
  });
  if (!hereInserted && totalRefs > 0) rows.push({ type: "here" }); // all claimed

  return (
    <div
      className="mx-auto w-[412px] min-h-screen"
      style={{ fontFamily: "Outfit, sans-serif", background: "#FFF", overflowX: "hidden" }}
    >
      {/* ── Header ── */}
      <header
        style={{
          width: "412px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          background: "#FFF",
          boxShadow: "0 4px 30px rgba(0,0,0,0.10)",
          padding: "20px",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <img src={logo} alt="Healthyday" style={{ height: "28px", width: "144px" }} />
      </header>

      {/* ── Score Card ── */}
      <div style={{ padding: "0 26px 9px" }}>
        <div
          style={{
            borderRadius: "12px",
            background: "#FEAB27",
            boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
            padding: "18px 32px 17px 31px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "20px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingTop: "3px" }}>
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>
              REFERRAL STATUS
            </span>
            <h2 style={{ margin: 0, fontFamily: "Outfit", fontSize: "25px", fontWeight: 800, color: "#FFF" }}>
              Your Referrals
            </h2>
          </div>
          <div
            style={{
              borderRadius: "12px",
              background: "#FFF",
              padding: "5px 15px 6px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Outfit",
                fontSize: "35px",
                fontWeight: 700,
                background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {loading ? "—" : totalRefs}
            </span>
          </div>
        </div>
      </div>

      {/* ── Referral Milestones ── */}
      <div style={{ padding: "22px 26px 9px" }}>
        <h3 style={{ margin: "0 0 24px", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
          Referral Milestones
        </h3>
        <div
          style={{
            background: "#FFF",
            borderRadius: "16px",
            boxShadow: "0 0 10px rgba(0,0,0,0.25)",
            padding: "20px 16px",
            boxSizing: "border-box",
          }}
        >
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
                      {totalRefs} Referrals
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E" />
                        {m.reward ? (
                          <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>
                        ) : (
                          <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                    ) : (
                      <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                          {isNext
                            ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" />
                            : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />
                          }
                        </svg>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                          <LockIcon color={isNext ? "#FEAB27" : "#A2A2A2"} />
                        </div>
                      </div>
                    )}
                    <div>
                      <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#377456" : isNext ? "#FEAB27" : "#9A9797" }}>
                        {claimed && m.reward
                          ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</>
                          : m.label}
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
                      NEXT GOAL
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Recent Referrals ── */}
      <div style={{ background: "#FFF9EF", padding: "32px 26px 80px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
            Your Recent Referrals
          </h3>
        </div>

        {!loading && referrals.length === 0 && (
          <p style={{ color: "#ADADAD", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500, textAlign: "center", margin: "0 0 20px" }}>
            No referrals yet. Share your link to get started!
          </p>
        )}

        {referrals.length > 0 && (
          <div
            style={{
              borderRadius: "20px",
              border: "1px solid #FEAB27",
              background: "#FFF",
              overflow: "hidden",
              marginBottom: "16px",
            }}
          >
            {referrals.slice(0, 4).map((ref, idx) => (
              <div key={idx}>
                {idx > 0 && (
                  <div style={{ height: "0.5px", background: "#FEAB27", margin: "0 21px" }} />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 24px 10px 21px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "17px" }}>
                    {/* Avatar */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#F3F4F7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <PersonIcon />
                    </div>
                    <div>
                      {/* Masked mobile as primary identifier */}
                      <div
                        style={{
                          fontFamily: "Outfit",
                          fontSize: "15px",
                          fontWeight: 600,
                          background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {maskMobile(ref.referred_mobile)}
                      </div>
                      {/* Referral date */}
                      <div style={{ color: "#A2A2A2", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, marginTop: "2px" }}>
                        Joined {formatDate(ref.referral_date)}
                      </div>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div
                    style={{
                      borderRadius: "3px",
                      background: ref.is_redeemed_for_free_classes ? "#C7FFDA" : "#E0E0E0",
                      padding: "4px 11px",
                      fontFamily: "Outfit",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: ref.is_redeemed_for_free_classes ? "#287E54" : "#7B7F7D",
                    }}
                  >
                    {ref.is_redeemed_for_free_classes ? "ACTIVE" : "PENDING"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refer Now floating button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: referrals.length > 0 ? "-30px" : "0",
          }}
        >
          <button
            onClick={handleReferNow}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#FEAB27",
              border: "none",
              borderRadius: "40px",
              padding: "15px 25px 14px",
              cursor: "pointer",
              boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 style={{ margin: 0, fontFamily: "Outfit", fontSize: "19px", fontWeight: 700, color: "#FFF" }}>
              Refer Now
            </h3>
          </button>
        </div>
      </div>

      {/* ── Rewards ── */}
      <div style={{ padding: "22px 26px 44px" }}>
        <h3 style={{ margin: "0 0 20px", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
          Rewards
        </h3>

        {/* Free Classes pair (unlocks every 5 refs) */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "11px" }}>
          {([
            { label: "+10 Free Classes", refs: "5 Referrals", need: 5 },
            { label: "+20 Free Classes", refs: "10 Referrals", need: 10 },
          ] as const).map((reward, i) => {
            const unlocked = totalRefs >= reward.need;
            return (
              <div key={i} style={{ flex: 1 }}>
                <div
                  style={{
                    borderRadius: "12px",
                    height: "166px",
                    background: unlocked
                      ? "linear-gradient(135deg, #1a6e15 0%, #64A45E 100%)"
                      : "linear-gradient(135deg, #DDDEDE 0%, #B0B0B0 100%)",
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "10px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {unlocked ? (
                    <div style={{ borderRadius: "30px", background: "#22C55E", padding: "6px 10px 6px 11px" }}>
                      <span style={{ fontFamily: "Outfit", fontSize: "9px", fontWeight: 600, color: "#FFF" }}>
                        UNLOCKED
                      </span>
                    </div>
                  ) : (
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path d="M8 11V7C8 5.939 8.421 4.922 9.172 4.172C9.922 3.421 10.939 3 12 3C13.061 3 14.078 3.421 14.828 4.172C15.579 4.922 16 5.939 16 7V11M5 12C5 11.47 5.211 10.961 5.586 10.586C5.961 10.211 6.47 10 7 10H17C17.53 10 18.039 10.211 18.414 10.586C18.789 10.961 19 11.47 19 12V19C19 19.53 18.789 20.039 18.414 20.414C18.039 20.789 17.53 21 17 21H7C6.47 21 5.961 20.789 5.586 20.414C5.211 20.039 5 19.53 5 19V12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <b style={{ fontFamily: "Outfit", fontSize: "14px", display: "block", marginTop: "6px", color: "#000" }}>
                  {reward.label}
                </b>
                <b style={{ fontFamily: "Outfit", fontSize: "14px", color: "#FEAB27", display: "block" }}>
                  {reward.refs}
                </b>
                {unlocked && (
                  <button
                    style={{
                      marginTop: "6px",
                      height: "34px",
                      borderRadius: "8px",
                      border: "1px solid #FEAB27",
                      background: "transparent",
                      cursor: "pointer",
                      fontFamily: "Outfit",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#FEAB27",
                      width: "100%",
                    }}
                  >
                    Claimed
                  </button>
                )}
                {/* "X more needed" hint when not yet unlocked */}
                {!unlocked && refsForNextClasses !== null && i === 0 && (
                  <p style={{ margin: "4px 0 0", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500, color: "#9C9C9C" }}>
                    {refsForNextClasses} more needed
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Gift pair (unlocks at 20 and 40 refs) */}
        <div style={{ display: "flex", gap: "12px" }}>
          {([
            { label: "Healthyday T-shirt", refs: "20 Referrals", need: 20 },
            { label: "Special Gift", refs: "40 Referrals", need: 40 },
          ] as const).map((reward, i) => {
            const progress = Math.min(100, (totalRefs / reward.need) * 100);
            const unlocked = totalRefs >= reward.need;
            return (
              <div key={i} style={{ flex: 1 }}>
                <div
                  style={{
                    borderRadius: "12px",
                    height: "166px",
                    background: unlocked
                      ? "linear-gradient(135deg, #1a6e15 0%, #64A45E 100%)"
                      : "linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {!unlocked && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.50)", borderRadius: "12px" }} />
                  )}
                  {unlocked ? (
                    <div style={{ padding: "10px" }}>
                      <div style={{ borderRadius: "30px", background: "#22C55E", padding: "6px 10px 6px 11px", display: "inline-block" }}>
                        <span style={{ fontFamily: "Outfit", fontSize: "9px", fontWeight: 600, color: "#FFF" }}>UNLOCKED</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path d="M8 11V7C8 5.939 8.421 4.922 9.172 4.172C9.922 3.421 10.939 3 12 3C13.061 3 14.078 3.421 14.828 4.172C15.579 4.922 16 5.939 16 7V11M5 12C5 11.47 5.211 10.961 5.586 10.586C5.961 10.211 6.47 10 7 10H17C17.53 10 18.039 10.211 18.414 10.586C18.789 10.961 19 11.47 19 12V19C19 19.53 18.789 20.039 18.414 20.414C18.039 20.789 17.53 21 17 21H7C6.47 21 5.961 20.789 5.586 20.414C5.211 20.039 5 19.53 5 19V12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <b style={{ fontFamily: "Outfit", fontSize: "14px", display: "block", marginTop: "6px", color: "#000" }}>
                  {reward.label}
                </b>
                <b style={{ fontFamily: "Outfit", fontSize: "14px", color: "#FEAB27", display: "block" }}>
                  {reward.refs}
                </b>
                {/* Progress bar */}
                {!unlocked && (
                  <div style={{ marginTop: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontFamily: "Outfit", fontSize: "10px", fontWeight: 600 }}>
                        {totalRefs}/{reward.need}
                        {i === 0 && refsForNextGift !== null && (
                          <span style={{ color: "#9C9C9C", fontWeight: 500 }}> · {refsForNextGift} more</span>
                        )}
                      </span>
                      <span style={{ fontFamily: "Outfit", fontSize: "10px", fontWeight: 600 }}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div style={{ height: "6px", background: "#E8DDD2", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "6px", width: `${progress}%`, background: "#FEAB27", borderRadius: "3px" }} />
                    </div>
                  </div>
                )}
                {unlocked && (
                  <button
                    style={{
                      marginTop: "6px",
                      height: "34px",
                      borderRadius: "8px",
                      border: "1px solid #FEAB27",
                      background: "transparent",
                      cursor: "pointer",
                      fontFamily: "Outfit",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#FEAB27",
                      width: "100%",
                    }}
                  >
                    Claimed
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReferralStatus;
