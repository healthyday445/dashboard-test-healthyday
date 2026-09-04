import lvl1Inprogress from "@/assets/14d-v2-dashboard-level-card/lvl1_inprogress.webp";
import lvl1Unlocked from "@/assets/14d-v2-dashboard-level-card/lvl1_unlocked.webp";
import lvl2Inprogress from "@/assets/14d-v2-dashboard-level-card/lvl2_inprogress.webp";
import lvl2Unlocked from "@/assets/14d-v2-dashboard-level-card/lvl2_unlocked.webp";
import lvl3Inprogress from "@/assets/14d-v2-dashboard-level-card/lvl3_inprogress.webp";
import lvl3Unlocked from "@/assets/14d-v2-dashboard-level-card/lvl3_unlocked.webp";
import lvl4Inprogress from "@/assets/14d-v2-dashboard-level-card/lvl4_inprogress.webp";
import lvl4Unlocked from "@/assets/14d-v2-dashboard-level-card/lvl4_unlocked.webp";
import lvl5Inprogress from "@/assets/14d-v2-dashboard-level-card/lvl5_inprogress.webp";
import lvl5Unlocked from "@/assets/14d-v2-dashboard-level-card/lvl5_unlocked.webp";
import downArrow from "@/assets/dashboard-level-card/down_arrow.webp";
import circledPlayButton from "@/assets/21daysprogram/circled_play_button.png";

// 14-day journey: 5 levels, unlocking every 3 days except the last (day 14, 2 days after level 4).
export const LEVEL_UNLOCK_DAYS_V2 = [3, 6, 9, 12, 14];

// Reward info indexed by level (index 0 = Level 1) — reuses the reward identities/links
// from the 21-day journey's Detox/Breakfast/Lunch/Dinner levels, skipping Sleep Masterclass
// and Post-Meal Movement (which aren't part of the 14-day cadence), plus its own certificate.
export const LEVEL_REWARDS_V2 = [
  { line1: "3-Days", line2: "Detox Program", full: "3-Days Detox Program", subtitleWidth: 134, rewardWidth: 128 },
  { line1: "3-Days", line2: "Breakfast Diet", full: "3-Days Breakfast Diet", subtitleWidth: 133, rewardWidth: 128 },
  { line1: "3-Days", line2: "Lunch Diet", full: "3-Days Lunch Diet", subtitleWidth: 135, rewardWidth: 128 },
  { line1: "3-Days", line2: "Dinner Diet", full: "3-Days Dinner Diet", subtitleWidth: 137, rewardWidth: 137 },
  { line1: "14-Days Yoga", line2: "Certificate", full: "14-Days Yoga Certificate", subtitleWidth: 142, rewardWidth: 147, completesAll: true },
];

// Indexed by attended-day count (0-14) — one image per in-progress/unlocked step of each level.
const DAY_IMAGES_V2 = [
  lvl1Inprogress, lvl1Inprogress, lvl1Inprogress,
  lvl1Unlocked,
  lvl2Inprogress, lvl2Inprogress,
  lvl2Unlocked,
  lvl3Inprogress, lvl3Inprogress,
  lvl3Unlocked,
  lvl4Inprogress, lvl4Inprogress,
  lvl4Unlocked,
  lvl5Inprogress,
  lvl5Unlocked,
];

/** Resolves the join/watch/download link for a given 14-day-journey level's reward. */
export function getLevelRewardLinkV2(level: number, language: string | undefined, studentName: string | undefined, joinLink: string): string {
  const isEnglish = language === "English";
  if (level === 1) return isEnglish ? "https://www.youtube.com/watch?v=bDvlif1ofKA" : "https://www.youtube.com/watch?v=ARr1TMvXYSA";
  if (level === 2) return isEnglish ? "https://www.youtube.com/live/xDFA6-KCE8k" : "https://www.youtube.com/watch?v=d3HiE2QhlZA";
  if (level === 3) return isEnglish ? "https://www.youtube.com/live/IqESKRcvU8E" : "https://www.youtube.com/live/WnITjDbnCPY";
  if (level === 4) return isEnglish ? "https://youtube.com/live/54LLUNIoxRY" : "https://www.youtube.com/live/6CcEvvn6shU";
  if (level === 5) return studentName ? `/certificate?name=${encodeURIComponent(studentName)}` : "/certificate";
  return joinLink;
}

/** Derives which of the 5 levels is current/just-completed for a given attended-day count (0-14). */
function getLevelState(freeDaysAttended: number) {
  const safeDay = Math.min(Math.max(0, freeDaysAttended), 14);
  const completedCount = LEVEL_UNLOCK_DAYS_V2.filter((d) => d <= safeDay).length;
  const isUnlocked = LEVEL_UNLOCK_DAYS_V2.includes(safeDay);
  const level = isUnlocked ? completedCount : Math.min(completedCount + 1, 5);
  const nextUnlockDay = LEVEL_UNLOCK_DAYS_V2[completedCount] ?? 14;
  const classesNeeded = nextUnlockDay - safeDay;
  return { safeDay, isUnlocked, level, classesNeeded };
}

export function FourteenDaysV2LevelCard({
  freeDaysAttended,
  studentName,
  joinLink,
  language,
  onViewMore,
  onCertificateClick,
}: {
  freeDaysAttended: number;
  studentName?: string;
  joinLink: string;
  language?: string;
  onViewMore?: () => void;
  onCertificateClick?: () => void;
}) {
  const { safeDay, isUnlocked, level, classesNeeded } = getLevelState(freeDaysAttended);
  const reward = LEVEL_REWARDS_V2[level - 1];
  const img = DAY_IMAGES_V2[safeDay];

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "0.25px solid #999",
        borderRadius: 16,
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
        height: 156,
        overflow: "hidden",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          position: "absolute",
          right: 0,
          top: 34,
          width: "min(210px, 51vw)",
          height: "min(118px, 28.7vw)",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ position: "absolute", top: 9, right: 7, display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => onViewMore?.()}
      >
        <span style={{ color: "#feab27", fontSize: 14, fontWeight: 600 }}>View more</span>
        <img src={downArrow} alt="" style={{ width: 25, height: 25, objectFit: "contain", transform: "rotate(-90deg)" }} />
      </div>

      {isUnlocked ? (
        <>
          <p style={{ position: "absolute", left: 18, right: 90, top: 13, margin: 0, fontSize: "clamp(14px, 4.4vw, 18px)", fontWeight: 700, color: "#202020", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "normal" }}>
            Congratulations{studentName ? ` ${studentName.split(" ")[0]}!` : "!"}
          </p>
          <div style={{ position: "absolute", left: 20, top: 53, width: 143, color: "#0a386f", lineHeight: "normal" }}>
            <p style={{ margin: 0, fontSize: "clamp(10px, 2.4vw, 10px)", fontWeight: 400 }}>You have completed Level {level}</p>
            <p style={{ margin: 0, fontSize: "clamp(10px, 2.4vw, 10px)", fontWeight: 400 }}>Here's your reward...</p>
            <p style={{ margin: 0, fontSize: "clamp(12px, 2.9vw, 12px)", fontWeight: 700 }}>{reward.full}</p>
          </div>
          <div
            style={{ position: "absolute", left: 20, top: 110, width: 93, height: 28, borderRadius: 5, background: "linear-gradient(to bottom, #237ae2, #1858a5, #0b3f7d)", border: "0.25px solid #ffe1be", boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer" }}
            onClick={() => {
              if (level === 5 && onCertificateClick) {
                onCertificateClick();
              } else {
                window.open(getLevelRewardLinkV2(level, language, studentName, joinLink), "_blank");
              }
            }}
          >
            {level === 5 ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "white" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>Download</span>
              </>
            ) : (
              <>
                <img src={circledPlayButton} alt="" style={{ width: 12, height: 12 }} />
                <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>Join now</span>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <p style={{ position: "absolute", left: 18, right: 90, top: 13, margin: 0, fontSize: "min(18px, 4.2vw)", fontWeight: 700, color: "#202020", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "normal" }}>
            You are currently at Level {level} !
          </p>
          <p style={{ position: "absolute", left: 20, top: 45, margin: 0, fontSize: safeDay === 0 ? "min(12px, 2.9vw)" : "min(12px, 3.4vw)", fontWeight: 400, color: "#0a386f", width: `min(${reward.subtitleWidth}px, 32vw)`, lineHeight: "normal" }}>
            {safeDay === 0
              ? `Attend 3 classes to complete Level 1 & get`
              : <>Attend {classesNeeded} more class{classesNeeded !== 1 ? "es" : ""} to{" "}{reward.completesAll ? "complete all levels" : `complete Level ${level}`} &amp; get</>
            }
          </p>
          <div style={{ position: "absolute", left: 20, top: 91, width: `min(${reward.rewardWidth}px, 34vw)`, fontSize: "min(17px, 4.1vw)", fontWeight: 700, color: "#0a386f", lineHeight: "normal" }}>
            <p style={{ margin: 0 }}>{reward.line1}</p>
            <p style={{ margin: 0 }}>{reward.line2}</p>
          </div>
        </>
      )}
    </div>
  );
}
