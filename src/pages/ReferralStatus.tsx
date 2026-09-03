import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { useStudentData } from "@/hooks/use-student-data";
import { useReferrals, type ApiReferral, type ReferralsApiData } from "@/hooks/use-referrals";
import imgTshirt from "@/assets/referral/tshirt-reward.webp";
import imgDietPdf from "@/assets/referral/diet-pdf.webp";
import imgTenClasses from "@/assets/referral/ten-classes-reward.webp";
import { ReferralRewardsCard, ReferralRewardsCardSkeleton, DIET_PDF_REFS, TSHIRT_REFS, PAID_FREE_CLASSES_REFS } from "@/components/ReferralRewardsCard";
import { safeSessionStorage } from "@/lib/storage";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string => {
  const [, mm, dd] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[Number(mm) - 1]} ${Number(dd)}`;
};

const getDisplayName = (ref: ApiReferral) =>
  !ref.referred_name || ref.referred_name === "None"
    ? ref.referred_mobile
    : ref.referred_name;

// ── Preview mode ──────────────────────────────────────────────────────────────
// ?preview=<count> forces <count> verified referrals so milestone/reward states
// (0, 1, 19, 20, etc.) can be checked without real API data.
const buildPreviewData = (count: number): ReferralsApiData => {
  const referrals: ApiReferral[] = Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      referred_mobile: `9${String(100000000 + i).padStart(9, "0")}`,
      referred_name: `Preview Referral ${count - i}`,
      referral_date: date.toISOString().slice(0, 10),
      is_redeemed_for_free_classes: false,
      is_redeemed_for_gift: false,
      referral_confirmation_status: "verified",
    };
  });

  return {
    total_referrals: count,
    pending_referrals: 0,
    verified_referrals: count,
    referrals_required_for_next_free_classes: Math.max(0, DIET_PDF_REFS - count),
    referrals_required_for_next_gift: Math.max(0, TSHIRT_REFS - count),
    language: "English",
    referrals,
  };
};

// Single referral row — flat joined list style (Figma 696-7116)
const ReferralRow: React.FC<{ referral: ApiReferral; language?: string; isLast?: boolean }> = ({ referral, language, isLast = false }) => {
  const displayName = getDisplayName(referral);
  const isVerified = referral.referral_confirmation_status === "verified";

  const handleRemind = () => {
    const phone = referral.referred_mobile.replace(/\D/g, "");
    const text = language === "Telugu"
      ? "మీరు ఇంకా మీ 14 Days FREE Registration confirm చేయలేదు.\n\nDaily Yoga with Jagan WhatsApp Number నుండి మీకు ఒక message వచ్చింది. అందులో \"Next Step - Click Here\" అని ఒక Button ఉంటుంది. అది Click చేసి Confirm చేయొచ్చు"
      : "Namaste! You still haven't verified your mobile number for 14 days FREE Yoga.\n\nYou must have received a message from \"Daily Yoga with Jagan\" on WhatsApp. There is a button in there \"NEXT STEP - CLICK HERE\".\n\nPlease click that button to verify";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 0" }}>
        {/* Avatar 36×36 */}
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#0D468B" opacity="0.6"/>
            <path d="M12 14C7.58172 14 4 16.6863 4 20V22H20V20C20 16.6863 16.4183 14 12 14Z" fill="#0D468B" opacity="0.6"/>
          </svg>
        </div>

        {/* Center: name + phone + optional error */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal", display: "block" }}>{displayName}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "3px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#A2A2A2"/>
            </svg>
            <span style={{ color: "#A2A2A2", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{referral.referred_mobile}</span>
          </div>
          {!isVerified && (
            <p style={{ color: "#FF3E3E", fontFamily: "Outfit", fontSize: "10px", fontWeight: 400, lineHeight: 1.4, margin: "4px 0 0", maxWidth: "185px" }}>
              {language === "Telugu"
                ? "ఈ person ఇంకా whatsapp లో confirm button నొక్కలేదు"
                : "Verify Button in the WhatsApp Reminder is not clicked by this person"}
            </p>
          )}
        </div>

        {/* Right: badge + remind */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
          {isVerified ? (
            <div style={{ background: "#C7FFDA", borderRadius: "3px", padding: "0 8px", height: "21px", display: "flex", alignItems: "center" }}>
              <span style={{ color: "#287E54", fontFamily: "Outfit", fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px" }}>VERIFIED</span>
            </div>
          ) : (
            <>
              <div style={{ background: "#E0E0E0", borderRadius: "3px", padding: "0 8px", height: "21px", display: "flex", alignItems: "center" }}>
                <span style={{ color: "#7B7F7D", fontFamily: "Outfit", fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px" }}>PENDING</span>
              </div>
              <button
                onClick={handleRemind}
                style={{ display: "flex", alignItems: "center", gap: "4px", padding: "0 6px", borderRadius: "4px", border: "0.7px solid #40C351", background: "#FFF", cursor: "pointer", width: "62px", height: "21px", justifyContent: "center" }}
              >
                <span style={{ fontFamily: "Outfit", fontSize: "10px", fontWeight: 600, color: "#40C351" }}>Remind</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#40C351">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      {!isLast && <div style={{ height: "1px", background: "#FEAB27" }} />}
    </div>
  );
};

// ── Rewards section cards ─────────────────────────────────────────────────────

// Free-batch students unlock a Free Diet PDF (downloadable) at 1 referral; paid students instead
// unlock 10 FREE Classes (credited to their account, so it's "Claimed" rather than downloaded).
// The Healthyday T-shirt milestone at 20 referrals is the same for both.
const getRewards = (isPaid: boolean) => (isPaid
  ? [
      { key: "classes", label: "10 FREE Classes",   refs: PAID_FREE_CLASSES_REFS, img: imgTenClasses, claimable: true },
      { key: "tshirt",  label: "Healthyday T-shirt", refs: TSHIRT_REFS,            img: imgTshirt,     claimable: true },
    ]
  : [
      { key: "pdf",     label: "Free Diet PDF",      refs: DIET_PDF_REFS, img: imgDietPdf, claimable: false },
      { key: "tshirt",  label: "Healthyday T-shirt", refs: TSHIRT_REFS,   img: imgTshirt,  claimable: false },
    ]
) as const;

const RewardCard: React.FC<{ reward: ReturnType<typeof getRewards>[number]; verifiedRefs: number }> = ({ reward, verifiedRefs }) => {
  const unlocked = verifiedRefs >= reward.refs;
  const progress = Math.min(100, (verifiedRefs / reward.refs) * 100);

  return (
    <div style={{ flex: 1 }}>
      {/* Card image */}
      <div style={{
        borderRadius: "12px",
        height: "154px",
        overflow: "hidden",
        position: "relative",
      }}>
        <img
          src={reward.img}
          alt={reward.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: unlocked ? 1 : 0.7 }}
        />
        {!unlocked && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11M5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12V20C19 20.55 18.55 21 18 21H6C5.45 21 5 20.55 5 20V12ZM12 16.5C12.55 16.5 13 16.05 13 15.5C13 14.95 12.55 14.5 12 14.5C11.45 14.5 11 14.95 11 15.5C11 16.05 11.45 16.5 12 16.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {unlocked && (
          <div style={{ position: "absolute", top: "8px", left: "8px", background: "#22C55E", borderRadius: "30px", padding: "4px 12px" }}>
            <span style={{ fontFamily: "Outfit", fontSize: "9px", fontWeight: 700, color: "#FFF" }}>UNLOCKED</span>
          </div>
        )}
      </div>

      {/* Label */}
      <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, display: "block", marginTop: "8px", color: "#202020" }}>
        {reward.label}
      </span>
      <span style={{ fontFamily: "Outfit", fontSize: "13px", fontWeight: 600, color: "#FEAB27", display: "block" }}>
        {reward.refs} {reward.refs === 1 ? "Referral" : "Referrals"}
      </span>

      {/* Claimed pill for unlocked claimable rewards (paid milestones) */}
      {unlocked && reward.claimable && (
        <div style={{ marginTop: "8px", height: "34px", borderRadius: "8px", border: "1px solid #FEAB27", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, color: "#FEAB27" }}>Claimed</span>
        </div>
      )}

      {/* Progress bar for locked items */}
      {!unlocked && (
        <div style={{ marginTop: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontFamily: "Outfit", fontSize: "10px", fontWeight: 600 }}>{verifiedRefs}/{reward.refs}</span>
            <span style={{ fontFamily: "Outfit", fontSize: "10px", color: "#9C9C9C" }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: "6px", background: "#E8DDD2", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ height: "6px", width: `${progress}%`, background: "#FEAB27", borderRadius: "3px" }} />
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder for a RewardCard while verifiedRefs/isPaid are loading, so the grid doesn't
// flash a default reward (image/label) before switching to the real one.
const RewardCardSkeleton: React.FC = () => (
  <div style={{ flex: 1 }}>
    <div className="referral-rewards-skeleton" style={{ borderRadius: "12px", height: "154px" }} />
    <div className="referral-rewards-skeleton" style={{ width: "70%", height: "14px", borderRadius: "6px", marginTop: "8px", animationDelay: "80ms" }} />
    <div className="referral-rewards-skeleton" style={{ width: "45%", height: "13px", borderRadius: "6px", marginTop: "6px", animationDelay: "160ms" }} />
    <div className="referral-rewards-skeleton" style={{ height: "34px", borderRadius: "8px", marginTop: "8px", animationDelay: "240ms" }} />
    <style>{`
      @keyframes referral-rewards-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
      .referral-rewards-skeleton { background: linear-gradient(90deg, #EFEFEF 25%, #F7F7F7 50%, #EFEFEF 75%); background-size: 800px 100%; animation: referral-rewards-shimmer 1.4s ease-in-out infinite; }
    `}</style>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const ReferralStatus = () => {
  const location = useLocation();
  const { mobile: urlMobile } = useParams<{ mobile: string }>();
  const searchParams = new URLSearchParams(location.search);

  const initialCount =
    Number(searchParams.get("count")) ||
    Number(safeSessionStorage.getItem("total_referral_count")) ||
    0;
  const mobile =
    urlMobile ||
    searchParams.get("mobile") ||
    safeSessionStorage.getItem("referrer_mobile") ||
    "";
  const previewParam = searchParams.get("preview_referrals");
  const previewCount =
    previewParam !== null && /^\d+$/.test(previewParam) ? Number(previewParam) : null;
  const previewPaidParam = searchParams.get("preview_paid");

  const [isPaid, setIsPaid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);

  const closeDrawer = () => {
    setDrawerClosing(true);
    setTimeout(() => { setDrawerOpen(false); setDrawerClosing(false); }, 280);
  };

  const shareLink = mobile
    ? `https://yoga.healthyday.co.in?ref=${mobile}`
    : "https://yoga.healthyday.co.in";

  const cleanedMobile = mobile ? mobile.replace(/\D/g, "") : "";
  const referralsQuery = useReferrals(cleanedMobile, { enabled: previewCount === null && !!mobile });
  const apiData = previewCount !== null ? buildPreviewData(previewCount) : referralsQuery.data ?? null;
  const loading = previewCount === null && !!mobile && referralsQuery.isLoading;
  const apiError = referralsQuery.error instanceof Error ? referralsQuery.error.message : null;

  // Paid/free status is always resolved from the real student record for a given mobile —
  // independent of `preview_referrals`, so testers can preview an arbitrary referral count
  // while still seeing the correct milestone variant for that student. `preview_paid` is an
  // explicit override for previewing a variant without a matching real account.
  const studentQuery = useStudentData(cleanedMobile, previewPaidParam === null && !!mobile);

  useEffect(() => {
    if (previewPaidParam !== null) {
      setIsPaid(previewPaidParam === "1" || previewPaidParam === "true");
      return;
    }
    if (!mobile) { setIsPaid(false); return; }
    if (studentQuery.isLoading) return;
    setIsPaid(studentQuery.data?.status === "paid");
  }, [mobile, previewPaidParam, studentQuery.isLoading, studentQuery.data]);

  const statusLoading = previewPaidParam === null && !!mobile && studentQuery.isLoading;

  // Referral rewards (both the milestone tracker and the static Rewards grid) depend on both
  // verifiedRefs and isPaid — show a skeleton until both have resolved instead of flashing a
  // default free/zero-referral state.
  const rewardsLoading = loading || statusLoading;

  // Use verified_referrals for all gift progress; fall back to 0 while loading
  const verifiedRefs = loading ? 0 : (apiData?.verified_referrals ?? 0);
  // Keep total for display in score card (optimistic with URL param)
  const displayCount = loading ? initialCount : (apiData?.verified_referrals ?? initialCount);
  const referrals: ApiReferral[] = apiData?.referrals ?? [];
  const language = apiData?.language;

  const handleReferNow = () => {
    const waMessage = `I am Inviting you to join me in\n*14-Days FREE YOGA* 🧘‍♀️😊\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith *JAGAN* 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students\n\n*Register for FREE Now* 👇🏻👇🏻\n${shareLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank");
  };

  return (
    <div
      className="mx-auto min-h-screen"
      style={{ fontFamily: "Outfit, sans-serif", background: "#FFF", overflowX: "hidden", maxWidth: "412px", width: "100%" }}
    >
      {/* ── Header ── */}
      <header style={{ width: "100%", height: "68px", display: "flex", alignItems: "center", background: "#FFF", boxShadow: "0 4px 30px rgba(0,0,0,0.10)", padding: "20px", boxSizing: "border-box", flexShrink: 0 }}>
        <img src={logo} alt="Healthyday" style={{ height: "28px", width: "144px" }} />
      </header>

      {/* ── Score Card ── */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ borderRadius: "12px", background: "#FEAB27", boxShadow: "0 4px 8px rgba(0,0,0,0.25)", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>
              REFERRAL STATUS
            </span>
            <h2 style={{ margin: 0, fontFamily: "Outfit", fontSize: "24px", fontWeight: 800, color: "#FFF" }}>
              Your Referrals
            </h2>
          </div>
          <div style={{ borderRadius: "12px", background: "#FFF", padding: "5px 18px 6px", flexShrink: 0 }}>
            <span style={{
              fontFamily: "Outfit",
              fontSize: "35px",
              fontWeight: 700,
              ...(!loading && displayCount === 0
                ? { color: "#F00" }
                : {
                    background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
              ),
            }}>
              {loading ? "—" : displayCount}
            </span>
          </div>
        </div>
      </div>

      {/* ── Your Referral Rewards ── */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{ margin: "0 0 16px", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
          Your Referral Rewards
        </h3>
        {rewardsLoading ? <ReferralRewardsCardSkeleton /> : <ReferralRewardsCard verifiedRefs={verifiedRefs} language={language} isPaid={isPaid} />}
      </div>

      {/* ── Your Recent Referrals ── */}
      <div style={{ background: "#FFF9EF", padding: "24px 20px 32px", marginTop: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
            Your Recent Referrals
          </h3>
          {referrals.length > 3 && (
            <button
              onClick={() => setDrawerOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#FEAB27", padding: 0 }}
            >
              View All ({referrals.length})
            </button>
          )}
        </div>

        {!loading && apiError && (
          <p style={{ color: "#E53935", fontFamily: "Outfit", fontSize: "12px", textAlign: "center", margin: "0 0 16px" }}>
            Error loading referrals. Please try again.
          </p>
        )}

        {!loading && !apiError && referrals.length === 0 && (
          <div style={{ border: "1px solid #FF6E6E", borderRadius: "20px", background: "#FFF", padding: "20px", textAlign: "center", marginBottom: "16px" }}>
            <p style={{ color: "#FF6060", fontFamily: "Outfit", fontSize: "15px", fontWeight: 300, margin: 0 }}>
              You don't have any referrals currently
            </p>
          </div>
        )}

        {/* Show up to 3 referrals inline — yellow-bordered flat list */}
        {referrals.length > 0 && (
          <div style={{ background: "#FFF", borderRadius: "20px", border: "1px solid #FEAB27", overflow: "hidden", padding: "0 12px" }}>
            {referrals.slice(0, 3).map((ref, i) => (
              <ReferralRow key={i} referral={ref} language={language} isLast={i === Math.min(referrals.length, 3) - 1} />
            ))}
          </div>
        )}

        {/* REFER & WIN button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <button
            className="refer-fab"
            onClick={handleReferNow}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "linear-gradient(135deg, #FEAB27 0%, #FF8C00 100%)",
              border: "none", borderRadius: "40px", padding: "12px 28px", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(254,171,39,0.50), 0 3px 10px rgba(0,0,0,0.12)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 19 19" fill="none">
              <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, color: "#FFF", whiteSpace: "nowrap" }}>
              REFER &amp; WIN
            </span>
          </button>
        </div>

        <style>{`
          .refer-fab:hover { transform: scale(1.05) !important; box-shadow: 0 8px 28px rgba(254,171,39,0.60), 0 4px 14px rgba(0,0,0,0.18) !important; }
          .refer-fab:active { transform: scale(0.97) !important; }
        `}</style>
      </div>

      {/* ── Rewards ── */}
      <div style={{ padding: "24px 20px 48px" }}>
        <h3 style={{ margin: "0 0 16px", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>
          Rewards
        </h3>
        <div style={{ display: "flex", gap: "12px" }}>
          {rewardsLoading ? (
            <>
              <RewardCardSkeleton />
              <RewardCardSkeleton />
            </>
          ) : (
            getRewards(isPaid).map((reward) => (
              <RewardCard key={reward.key} reward={reward} verifiedRefs={verifiedRefs} />
            ))
          )}
        </div>
      </div>

      {/* ── All Referrals Drawer ── */}
      {drawerOpen && (
        <>
          <div
            className={drawerClosing ? "drawer-backdrop-out" : "drawer-backdrop"}
            onClick={closeDrawer}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100 }}
          />
          <div
            className={drawerClosing ? "drawer-slide-down" : "drawer-slide-up"}
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "412px",
              background: "#FFF",
              borderRadius: "20px 20px 0 0",
              zIndex: 101,
              display: "flex",
              flexDirection: "column",
              maxHeight: "82vh",
            }}
          >
            {/* Drawer header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px", flexShrink: 0 }}>
              <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>
                All Referrals ({referrals.length})
              </span>
              <button
                onClick={closeDrawer}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#202020", padding: "4px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable referral list */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 12px" }}>
              <div style={{ background: "#FFF", borderRadius: "20px", border: "1px solid #FEAB27", overflow: "hidden", padding: "0 12px" }}>
                {referrals.map((ref, i) => (
                  <ReferralRow key={i} referral={ref} language={language} isLast={i === referrals.length - 1} />
                ))}
              </div>
            </div>

            {/* Total bar */}
            <div style={{ flexShrink: 0, margin: "0 16px 16px", height: "52px", borderRadius: "14px", background: "#FEAB27", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "15px", fontWeight: 700 }}>Verified Referrals</span>
              <div style={{ background: "#FFF", borderRadius: "8px", padding: "4px 14px" }}>
                <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700 }}>
                  {verifiedRefs}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReferralStatus;
