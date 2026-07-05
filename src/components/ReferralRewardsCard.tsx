import imgTshirt from "@/assets/referral/tshirt-reward.webp";
import imgMsUnlockedCircle from "@/assets/referral/ms-unlocked-circle.svg";
import imgMsYouAreHere from "@/assets/referral/ms-you-are-here.svg";
import imgMsDownloadIcon from "@/assets/referral/downloading-updates.png";
import imgMsTshirtMilestone from "@/assets/referral/ms-tshirt-milestone.webp";

export const DIET_PDF_REFS = 1;
export const TSHIRT_REFS = 20;

const DIET_PDF_URL = {
  Telugu: "https://d3jt6ku4g6z5l8.cloudfront.net/FILE/6795ce3db71ab6291dfa64b7/5894347_RECIPE%20HANBOOKTELUGU%203compressed.pdf",
  English: "https://d3jt6ku4g6z5l8.cloudfront.net/FILE/6795ce3db71ab6291dfa64b7/9278824_RECIPE%20HANDBOOK%20%20ENGLISH%202compressed.pdf",
};

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

/**
 * "Your Referral Rewards" milestone card — 3 states:
 *   0 refs       → you-are-here(top) → dashed → PDF(locked gray) → dashed → T-shirt(locked gray)
 *   1–19 refs    → PDF(unlocked+Download) → solid → you-are-here → dashed → T-shirt(locked yellow)
 *   20+ refs     → PDF(unlocked+Download) → solid → T-shirt(unlocked)
 *
 * Shared by the Referrals page and the 14-day dashboard's week-1 progress section.
 */
export const ReferralRewardsCard: React.FC<{ verifiedRefs: number; language?: string }> = ({ verifiedRefs, language }) => {
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
