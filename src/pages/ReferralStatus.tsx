import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import imgTshirt from "@/assets/referral/tshirt-reward.webp";
import imgDietPdf from "@/assets/referral/diet-pdf.webp";
import imgMsUnlockedCircle from "@/assets/referral/ms-unlocked-circle.svg";
import imgMsYouAreHere from "@/assets/referral/ms-you-are-here.svg";
import imgMsDownloadIcon from "@/assets/referral/downloading-updates.png";
import imgMsTshirtMilestone from "@/assets/referral/ms-tshirt-milestone.webp";
import { safeSessionStorage } from "@/lib/storage";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ApiReferral {
  referred_mobile: string;
  referred_name: string;
  referral_date: string;
  is_redeemed_for_free_classes: boolean;
  is_redeemed_for_gift: boolean;
  referral_confirmation_status: "pending" | "verified";
}

interface ReferralsApiData {
  total_referrals: number;
  pending_referrals: number;
  verified_referrals: number;
  referrals_required_for_next_free_classes: number;
  referrals_required_for_next_gift: number;
  language?: string;
  referrals: ApiReferral[];
}

// ── Gift thresholds ───────────────────────────────────────────────────────────

const DIET_PDF_REFS = 1;
const TSHIRT_REFS = 20;

// ── Helpers ───────────────────────────────────────────────────────────────────

const maskMobile = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  const local = digits.startsWith("91") ? digits.slice(2) : digits;
  if (local.length < 4) return raw;
  return `+91 ${local.slice(0, 2)} ******${local.slice(-2)}`;
};

const formatDate = (iso: string): string => {
  const [, mm, dd] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[Number(mm) - 1]} ${Number(dd)}`;
};

const getDisplayName = (ref: ApiReferral) =>
  !ref.referred_name || ref.referred_name === "None"
    ? maskMobile(ref.referred_mobile)
    : ref.referred_name;

// Single referral row — flat joined list style (Figma 696-7116)
const ReferralRow: React.FC<{ referral: ApiReferral; language?: string; isLast?: boolean }> = ({ referral, language, isLast = false }) => {
  const displayName = getDisplayName(referral);
  const isVerified = referral.referral_confirmation_status === "verified";

  const handleRemind = () => {
    const phone = referral.referred_mobile.replace(/\D/g, "");
    const text = language === "Telugu"
      ? "మీరు ఇంకా మీ 21 Days FREE Registration confirm చేయలేదు.\n\nDaily Yoga with Jagan WhatsApp Number నుండి మీకు ఒక message వచ్చింది. అందులో \"Next Step - Click Here\" అని ఒక Button ఉంటుంది. అది Click చేసి Confirm చేయొచ్చు"
      : "Namaste! You still haven't verified your mobile number for 21 days FREE Yoga.\n\nYou must have received a message from \"Daily Yoga with Jagan\" on WhatsApp. There is a button in there \"NEXT STEP - CLICK HERE\".\n\nPlease click that button to verify";
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
            <span style={{ color: "#A2A2A2", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{maskMobile(referral.referred_mobile)}</span>
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

// ── Referral Rewards milestone card (Figma 689-6115) ─────────────────────────

// Vertical connecting line between milestone rows
// solid orange = after unlocked item, dashed grey = before locked item
const MilestoneLine: React.FC<{ dashed?: boolean }> = ({ dashed = false }) => (
  <div style={{ display: "flex", paddingLeft: "15px" /* center of 33px icon col */ }}>
    <div style={{
      width: "3px",
      height: "22px",
      background: dashed
        ? "repeating-linear-gradient(to bottom, #D0D0D0 0, #D0D0D0 4px, transparent 4px, transparent 8px)"
        : "#FEAB27",
    }} />
  </div>
);

// Icon for an unlocked milestone: green circle + inline open padlock (white)
const UnlockedMilestoneIcon = () => (
  <div style={{ position: "relative", width: "33px", height: "33px", flexShrink: 0 }}>
    <img src={imgMsUnlockedCircle} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    <svg
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      width="18" height="18" viewBox="0 0 24 24" fill="none"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M7 11V7C7 4.79 8.79 3 11 3C13.21 3 15 4.79 15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="16.5" r="1.5" fill="white"/>
    </svg>
  </div>
);

// Icon for a locked milestone: gray (0 refs) or orange (1+ refs)
const LockedMilestoneIcon: React.FC<{ gray?: boolean }> = ({ gray = false }) => (
  <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
    {gray ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
        <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
        <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" />
      </svg>
    )}
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z"
          stroke={gray ? "#A2A2A2" : "#FEAB27"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

// "You are here" pulsing orange dot
const YouAreHereIcon = () => (
  <div style={{ width: "33px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
    <img src={imgMsYouAreHere} alt="" style={{ width: "26px", height: "26px" }} />
  </div>
);

// "You are here" full row — red pill; zero-refs uses a different layout (Figma 689-6279)
const YouAreHereRow: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "33px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#FF0000" />
          </svg>
        </div>
        <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, color: "#F00", lineHeight: "normal" }}>
          0 Referrals
        </span>
        <div style={{ width: "106px", height: "28px", borderRadius: "20px", border: "1px solid #F00", background: "rgba(254,171,39,0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#F00", lineHeight: "normal" }}>You are here</span>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <YouAreHereIcon />
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #FEAB27", borderRadius: "20px", background: "rgba(254,171,39,0.20)", padding: "0 10px", height: "21px" }}>
          <span style={{ fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, color: "#FEAB27" }}>You are here</span>
        </div>
        <p style={{ margin: "4px 0 0", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, color: "#9C9C9C" }}>
          {count} {count === 1 ? "Referral" : "Referrals"}
        </p>
      </div>
    </div>
  );
};

const DIET_PDF_URL = {
  Telugu: "https://d3jt6ku4g6z5l8.cloudfront.net/FILE/6795ce3db71ab6291dfa64b7/5894347_RECIPE%20HANBOOKTELUGU%203compressed.pdf",
  English: "https://d3jt6ku4g6z5l8.cloudfront.net/FILE/6795ce3db71ab6291dfa64b7/9278824_RECIPE%20HANDBOOK%20%20ENGLISH%202compressed.pdf",
};

// Download button shown on unlocked Free Diet PDF row
const DownloadButton: React.FC<{ language?: string }> = ({ language }) => (
  <button
    onClick={() => window.open(language === "Telugu" ? DIET_PDF_URL.Telugu : DIET_PDF_URL.English, "_blank")}
    style={{ display: "flex", alignItems: "center", gap: "4px", background: "#FEAB27", border: "none", borderRadius: "5px", width: "88px", height: "22px", boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)", cursor: "pointer", justifyContent: "center", flexShrink: 0 }}
  >
    <img src={imgMsDownloadIcon} alt="" style={{ width: "17px", height: "17px", objectFit: "contain" }} />
    <span style={{ fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, color: "#FFF" }}>Download</span>
  </button>
);

// Main milestone card — 3 states:
//   0 refs       → you-are-here(top) → dashed → PDF(locked gray) → dashed → T-shirt(locked gray)
//   1–19 refs    → PDF(unlocked+Download) → solid → you-are-here → dashed → T-shirt(locked yellow)
//   20+ refs     → PDF(unlocked+Download) → solid → T-shirt(unlocked)
const ReferralRewardsCard: React.FC<{ verifiedRefs: number; language?: string }> = ({ verifiedRefs, language }) => {
  const pdfUnlocked = verifiedRefs >= DIET_PDF_REFS;
  const tshirtUnlocked = verifiedRefs >= TSHIRT_REFS;
  const isZero = verifiedRefs === 0;

  return (
    <div style={{ background: "#FFF", borderRadius: "16px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)", position: "relative", overflow: "hidden" }}>
      <div style={{ padding: "16px 16px 20px" }}>

        {/* 0 refs: "You are here" at top */}
        {isZero && (
          <>
            <YouAreHereRow count={0} />
            <MilestoneLine dashed />
          </>
        )}

        {/* Free Diet PDF */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {pdfUnlocked ? <UnlockedMilestoneIcon /> : <LockedMilestoneIcon gray={isZero} />}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, color: pdfUnlocked ? "#377456" : isZero ? "#9A9797" : "#FEAB27" }}>
                Free Diet PDF
              </span>
              {pdfUnlocked && <DownloadButton language={language} />}
            </div>
            <span style={{ fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, color: "#9C9C9C" }}>1 Referral</span>
          </div>
        </div>

        {/* 1–19 refs: solid line → you-are-here → dashed line */}
        {pdfUnlocked && !tshirtUnlocked && (
          <>
            <MilestoneLine />
            <YouAreHereRow count={verifiedRefs} />
            <MilestoneLine dashed />
          </>
        )}

        {/* 0 refs: dashed line between two locked items */}
        {!pdfUnlocked && <MilestoneLine dashed />}

        {/* 20+ refs: solid line between two unlocked items */}
        {tshirtUnlocked && <MilestoneLine />}

        {/* Healthyday T-shirt */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {tshirtUnlocked ? <UnlockedMilestoneIcon /> : <LockedMilestoneIcon gray={isZero} />}
          <div>
            <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, color: tshirtUnlocked ? "#377456" : isZero ? "#9A9797" : "#FEAB27", display: "block" }}>
              Healthyday T-shirt
            </span>
            <span style={{ fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, color: "#9C9C9C" }}>20 Referrals</span>
          </div>
        </div>

      </div>

      {/* T-shirt image peeking from bottom-right corner */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "95px", height: "90px", borderBottomRightRadius: "16px", overflow: "hidden" }}>
        <img
          src={imgMsTshirtMilestone}
          alt=""
          style={{ position: "absolute", top: "-31%", left: 0, width: "100%", height: "131%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
    </div>
  );
};

// ── Rewards section cards ─────────────────────────────────────────────────────

const REWARDS = [
  { key: "pdf",    label: "Free Diet PDF",      refs: DIET_PDF_REFS, img: imgDietPdf  },
  { key: "tshirt", label: "Healthyday T-shirt", refs: TSHIRT_REFS,   img: imgTshirt  },
] as const;

const RewardCard: React.FC<{ reward: (typeof REWARDS)[number]; verifiedRefs: number }> = ({ reward, verifiedRefs }) => {
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

  const [apiData, setApiData] = useState<ReferralsApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);

  const closeDrawer = () => {
    setDrawerClosing(true);
    setTimeout(() => { setDrawerOpen(false); setDrawerClosing(false); }, 280);
  };

  const shareLink = mobile
    ? `https://yoga.healthyday.co.in?ref=${mobile}`
    : "https://yoga.healthyday.co.in";

  useEffect(() => {
    if (!mobile) { setLoading(false); return; }
    const apiMobile = `+${mobile.replace(/\D/g, "")}`;
    fetch(`/.netlify/functions/referrals?mobile=${encodeURIComponent(apiMobile)}&include_contest=false`)
      .then((r) => r.json())
      .then((data: ReferralsApiData) => setApiData(data))
      .catch((err) => setApiError(String(err)))
      .finally(() => setLoading(false));
  }, [mobile]);

  // Use verified_referrals for all gift progress; fall back to 0 while loading
  const verifiedRefs = loading ? 0 : (apiData?.verified_referrals ?? 0);
  // Keep total for display in score card (optimistic with URL param)
  const displayCount = loading ? initialCount : (apiData?.verified_referrals ?? initialCount);
  const referrals: ApiReferral[] = apiData?.referrals ?? [];
  const language = apiData?.language;

  const handleReferNow = () => {
    const waMessage = `I am Inviting you to join me in\n*21-Days FREE YOGA* 🧘‍♀️😊\n🗓️ Starts *21st JUNE*\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith *JAGAN* 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students\n\n*Register for FREE Now* 👇🏻👇🏻\n${shareLink}`;
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
        <ReferralRewardsCard verifiedRefs={verifiedRefs} language={language} />
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
          {REWARDS.map((reward) => (
            <RewardCard key={reward.key} reward={reward} verifiedRefs={verifiedRefs} />
          ))}
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
