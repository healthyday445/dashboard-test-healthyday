import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { ReferralMilestonesCard } from "@/components/ReferralMilestonesCard";

// ── API types ─────────────────────────────────────────────────────────────────

interface ApiReferral {
  referred_mobile: string;
  referred_name: string;
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
  const [apiError, setApiError] = useState<string | null>(null);

  const shareLink = mobile
    ? `https://healthyday.co.in/free-programmes?ref=91${mobile}`
    : "healthyday.app/ref=ggtujev58";

  useEffect(() => {
    if (!mobile) { setLoading(false); return; }
    const encodedMobile = encodeURIComponent(`+91${mobile}`);
    fetch(`/.netlify/functions/referrals?mobile=${encodedMobile}`)
      .then((r) => r.json())
      .then((data: ReferralsApiData) => setApiData(data))
      .catch((err) => setApiError(String(err)))
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

  return (
    <div
      className="mx-auto min-h-screen"
      style={{ fontFamily: "Outfit, sans-serif", background: "#FFF", overflowX: "hidden", maxWidth: "412px", width: "100%" }}
    >
      {/* ── Header ── */}
      <header
        style={{
          width: "100%",
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
      <div style={{ padding: "31px 26px 9px" }}>
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

      {/* ── Your Referral Gifts ── */}
      <div style={{ padding: "22px 26px 9px" }}>
        <h3 style={{ margin: "0 0 24px", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
          Your Referral Gifts
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
          <ReferralMilestonesCard refCount={totalRefs} milestones={MILESTONES} />
        </div>
      </div>

      {/* ── Recent Referrals ── */}
      <div style={{ background: "#FFF9EF", padding: "32px 26px 80px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
            Your Recent Referrals
          </h3>
        </div>

        {!loading && apiError && (
          <p style={{ color: "#E53935", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, textAlign: "center", margin: "0 0 20px" }}>
            Error: {apiError}
          </p>
        )}

        {!loading && !apiError && referrals.length === 0 && (
          <p style={{ color: "#ADADAD", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500, textAlign: "center", margin: "0 0 20px" }}>
            No referrals yet. Share your link to get started!
          </p>
        )}

        {/* Card + FAB wrapper */}
        <div style={{ position: "relative", paddingBottom: "44px", minHeight: referrals.length === 0 ? "60px" : "auto" }}>
          {referrals.length > 0 && (
            <div
              style={{
                borderRadius: "20px",
                border: "1px solid #FEAB27",
                background: "#FFF",
                overflow: "hidden",
                marginBottom: "0",
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="18" cy="18" r="18" fill="#F3F4F7" />
                        <g transform="translate(12, 9.5)">
                          <path d="M1 16V14.3333C1 13.4493 1.35119 12.6014 1.97631 11.9763C2.60143 11.3512 3.44928 11 4.33333 11H7.66667C8.55072 11 9.39857 11.3512 10.0237 11.9763C10.6488 12.6014 11 13.4493 11 14.3333V16M2.66667 4.33333C2.66667 5.21739 3.01786 6.06523 3.64298 6.69036C4.2681 7.31548 5.11594 7.66667 6 7.66667C6.88405 7.66667 7.7319 7.31548 8.35702 6.69036C8.98214 6.06523 9.33333 5.21739 9.33333 4.33333C9.33333 3.44928 8.98214 2.60143 8.35702 1.97631C7.7319 1.35119 6.88405 1 6 1C5.11594 1 4.2681 1.35119 3.64298 1.97631C3.01786 2.60143 2.66667 3.44928 2.66667 4.33333Z" stroke="#0D468B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 16V14.3333C1 13.4493 1.35119 12.6014 1.97631 11.9763C2.60143 11.3512 3.44928 11 4.33333 11H7.66667C8.55072 11 9.39857 11.3512 10.0237 11.9763C10.6488 12.6014 11 13.4493 11 14.3333V16M2.66667 4.33333C2.66667 5.21739 3.01786 6.06523 3.64298 6.69036C4.2681 7.31548 5.11594 7.66667 6 7.66667C6.88405 7.66667 7.7319 7.31548 8.35702 6.69036C8.98214 6.06523 9.33333 5.21739 9.33333 4.33333C9.33333 3.44928 8.98214 2.60143 8.35702 1.97631C7.7319 1.35119 6.88405 1 6 1C5.11594 1 4.2681 1.35119 3.64298 1.97631C3.01786 2.60143 2.66667 3.44928 2.66667 4.33333Z" stroke="black" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                      </svg>
                      <div>
                        {/* Name as primary identifier */}
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
                          {ref.referred_name || maskMobile(ref.referred_mobile)}
                        </div>
                        {/* Masked mobile + referral date */}
                        <div style={{ color: "#A2A2A2", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, marginTop: "2px" }}>
                          {ref.referred_name && `${maskMobile(ref.referred_mobile)} · `}Joined {formatDate(ref.referral_date)}
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div
                      style={{
                        width: "58px",
                        height: "21px",
                        borderRadius: "3px",
                        background: "#C7FFDA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Outfit",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#287E54",
                      }}
                    >
                      ACTIVE
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REFER & WIN — FAB floating at bottom-right */}
          <button
            className="refer-fab"
            onClick={handleReferNow}
            style={{
              position: "absolute",
              bottom: referrals.length > 0 ? "-24px" : "-100px",
              right: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #FEAB27 0%, #FF8C00 100%)",
              border: "none",
              borderRadius: "40px",
              padding: "12px 24px",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(254,171,39,0.50), 0 3px 10px rgba(0,0,0,0.12)",
              backdropFilter: "blur(4px)",
              zIndex: 2,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 19 19" fill="none">
              <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ margin: 0, fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, color: "#FFF", whiteSpace: "nowrap" }}>
              REFER & WIN
            </span>
          </button>
        </div>

        {/* Hover animation for FAB */}
        <style>{`
          .refer-fab:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 8px 28px rgba(254,171,39,0.60), 0 4px 14px rgba(0,0,0,0.18) !important;
          }
          .refer-fab:active {
            transform: scale(0.97) !important;
          }
        `}</style>
      </div>

      {/* ── Rewards ── */}
      <div style={{ padding: "22px 26px 44px" }}>
        <h3 style={{ margin: "0 0 20px", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
          Rewards
        </h3>

        {/* Free Classes pair (unlocks every 5 refs) */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "11px" }}>
          {([
            { label: "+10 Free Classes", refs: "5 Referrals", need: 5, img: "/pose 8 1.png" },
            { label: "+20 Free Classes", refs: "10 Referrals", need: 10, img: "/pose 8 1 (1).png" },
          ] as const).map((reward, i) => {
            const unlocked = totalRefs >= reward.need;
            return (
              <div key={i} style={{ flex: 1 }}>
                <div
                  style={{
                    borderRadius: "12px",
                    height: "166px",
                    backgroundImage: `url("${reward.img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "10px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {!unlocked && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", borderRadius: "12px" }} />
                  )}
                  {unlocked ? (
                    <div style={{ width: "71px", height: "23px", borderRadius: "30px", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                      <span style={{ fontFamily: "Outfit", fontSize: "9px", fontWeight: 600, color: "#FFF" }}>UNLOCKED</span>
                    </div>
                  ) : (
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M12 16.5V10.5C12 8.9087 12.6321 7.38258 13.7574 6.25736C14.8826 5.13214 16.4087 4.5 18 4.5C19.5913 4.5 21.1174 5.13214 22.2426 6.25736C23.3679 7.38258 24 8.9087 24 10.5V16.5M7.5 19.5C7.5 18.7044 7.81607 17.9413 8.37868 17.3787C8.94129 16.8161 9.70435 16.5 10.5 16.5H25.5C26.2956 16.5 27.0587 16.8161 27.6213 17.3787C28.1839 17.9413 28.5 18.7044 28.5 19.5V28.5C28.5 29.2956 28.1839 30.0587 27.6213 30.6213C27.0587 31.1839 26.2956 31.5 25.5 31.5H10.5C9.70435 31.5 8.94129 31.1839 8.37868 30.6213C7.81607 30.0587 7.5 29.2956 7.5 28.5V19.5ZM16.5 24C16.5 24.3978 16.658 24.7794 16.9393 25.0607C17.2206 25.342 17.6022 25.5 18 25.5C18.3978 25.5 18.7794 25.342 19.0607 25.0607C19.342 24.7794 19.5 24.3978 19.5 24C19.5 23.6022 19.342 23.2206 19.0607 22.9393C18.7794 22.658 18.3978 22.5 18 22.5C17.6022 22.5 17.2206 22.658 16.9393 22.9393C16.658 23.2206 16.5 23.6022 16.5 24Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            { label: "Healthyday T-shirt", refs: "20 Referrals", need: 20, img: "/unsplash_GkXJisd5W1M.png" },
            { label: "Special Gift", refs: "40 Referrals", need: 40, img: "/unsplash_mSJsiQCm6og.png" },
          ] as const).map((reward, i) => {
            const progress = Math.min(100, (totalRefs / reward.need) * 100);
            const unlocked = totalRefs >= reward.need;
            return (
              <div key={i} style={{ flex: 1 }}>
                <div
                  style={{
                    borderRadius: "12px",
                    height: "166px",
                    backgroundImage: `url("${reward.img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {!unlocked && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.50)", borderRadius: "12px" }} />
                  )}
                  {unlocked ? (
                    <div style={{ padding: "10px", position: "relative", zIndex: 1 }}>
                      <div style={{ width: "71px", height: "23px", borderRadius: "30px", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "Outfit", fontSize: "9px", fontWeight: 600, color: "#FFF" }}>UNLOCKED</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M12 16.5V10.5C12 8.9087 12.6321 7.38258 13.7574 6.25736C14.8826 5.13214 16.4087 4.5 18 4.5C19.5913 4.5 21.1174 5.13214 22.2426 6.25736C23.3679 7.38258 24 8.9087 24 10.5V16.5M7.5 19.5C7.5 18.7044 7.81607 17.9413 8.37868 17.3787C8.94129 16.8161 9.70435 16.5 10.5 16.5H25.5C26.2956 16.5 27.0587 16.8161 27.6213 17.3787C28.1839 17.9413 28.5 18.7044 28.5 19.5V28.5C28.5 29.2956 28.1839 30.0587 27.6213 30.6213C27.0587 31.1839 26.2956 31.5 25.5 31.5H10.5C9.70435 31.5 8.94129 31.1839 8.37868 30.6213C7.81607 30.0587 7.5 29.2956 7.5 28.5V19.5ZM16.5 24C16.5 24.3978 16.658 24.7794 16.9393 25.0607C17.2206 25.342 17.6022 25.5 18 25.5C18.3978 25.5 18.7794 25.342 19.0607 25.0607C19.342 24.7794 19.5 24.3978 19.5 24C19.5 23.6022 19.342 23.2206 19.0607 22.9393C18.7794 22.658 18.3978 22.5 18 22.5C17.6022 22.5 17.2206 22.658 16.9393 22.9393C16.658 23.2206 16.5 23.6022 16.5 24Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
