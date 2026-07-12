import lvl1Inprogress from "@/assets/dashboard-level-card/lvl1_inprogress.webp";
import lvl2Inprogress from "@/assets/dashboard-level-card/lvl2_inprogress.webp";
import lvl3Inprogress from "@/assets/dashboard-level-card/lvl3_inprogress.webp";
import lvl4Inprogress from "@/assets/dashboard-level-card/lvl4_inprogress.webp";
import lvl5Inprogress from "@/assets/dashboard-level-card/lvl5_inprogress.webp";
import lvl6Inprogress from "@/assets/dashboard-level-card/lvl6_inprogress.webp";
import lvl7Inprogress from "@/assets/dashboard-level-card/d281f4940dd82c9a590624229b414057020e91f5-removebg-preview.png";
import lvl7Locked from "@/assets/dashboard-level-card/lvl7_locked.webp";
import lvl1Unlocked from "@/assets/dashboard-level-card/lvl1_unlocked.webp";
import lvl2Unlocked from "@/assets/dashboard-level-card/lvl2_unlocked.webp";
import lvl3Unlocked from "@/assets/dashboard-level-card/lvl3_unlocked.webp";
import lvl4Unlocked from "@/assets/dashboard-level-card/lvl4_unlocked.webp";
import lvl5Unlocked from "@/assets/dashboard-level-card/lvl5_unlocked.webp";
import lvl6Unlocked from "@/assets/dashboard-level-card/lvl6_unlocked.webp";
import lvl7Unlocked from "@/assets/dashboard-level-card/lvl7_unlocked.webp";
import downArrow from "@/assets/dashboard-level-card/down_arrow.webp";
import circledPlayButton from "@/assets/21daysprogram/circled_play_button.png";

// Reward info indexed by level (index 0 = Level 1)
// subtitleWidth / rewardWidth from Figma text bounding boxes
const LEVEL_REWARDS = [
  { line1: "3-Days", line2: "Detox Program", full: "3-Days Detox Program", subtitleWidth: 134, rewardWidth: 128, completesAll: false },
  { line1: "3-Days", line2: "Breakfast Diet", full: "3-Days Breakfast Diet", subtitleWidth: 133, rewardWidth: 128, completesAll: false },
  { line1: "3-Days Sleep", line2: "Masterclass", full: "3-Days Sleep Masterclass", subtitleWidth: 134, rewardWidth: 128, completesAll: false },
  { line1: "3-Days", line2: "Lunch Diet", full: "3-Days Lunch Diet", subtitleWidth: 135, rewardWidth: 128, completesAll: false },
  { line1: "Post Meal", line2: "Body Movement", full: "Post Meal Body Movement", subtitleWidth: 137, rewardWidth: 137, completesAll: false },
  { line1: "3-Days", line2: "Dinner Diet", full: "3-Days Dinner Diet", subtitleWidth: 137, rewardWidth: 137, completesAll: false },
  { line1: "21-Days Yoga", line2: "Challenge Certificate", full: "21-Days Yoga Challenge Certificate", subtitleWidth: 155, rewardWidth: 160, completesAll: true },
];

// One entry per attended-day count (0–22), indexed directly by freeDaysAttended.
// Levels 1–6 unlock every 3 days; Level 7 (certificate) unlocks on day 22 instead of
// the day-21 that the every-3-days pattern would predict, so level/classesNeeded are
// stored explicitly here rather than derived from safeDay.
const LEVEL_CARD_DATA = [
  { img: lvl1Inprogress, isUnlocked: false, level: 1, classesNeeded: 3 }, // Day 0
  { img: lvl1Inprogress, isUnlocked: false, level: 1, classesNeeded: 2 }, // Day 1
  { img: lvl1Inprogress, isUnlocked: false, level: 1, classesNeeded: 1 }, // Day 2
  { img: lvl1Unlocked, isUnlocked: true, level: 1, classesNeeded: 0 }, // Day 3  — Level 1 unlocked
  { img: lvl2Inprogress, isUnlocked: false, level: 2, classesNeeded: 2 }, // Day 4
  { img: lvl2Inprogress, isUnlocked: false, level: 2, classesNeeded: 1 }, // Day 5
  { img: lvl2Unlocked, isUnlocked: true, level: 2, classesNeeded: 0 }, // Day 6  — Level 2 unlocked
  { img: lvl3Inprogress, isUnlocked: false, level: 3, classesNeeded: 2 }, // Day 7
  { img: lvl3Inprogress, isUnlocked: false, level: 3, classesNeeded: 1 }, // Day 8
  { img: lvl3Unlocked, isUnlocked: true, level: 3, classesNeeded: 0 }, // Day 9  — Level 3 unlocked
  { img: lvl4Inprogress, isUnlocked: false, level: 4, classesNeeded: 2 }, // Day 10
  { img: lvl4Inprogress, isUnlocked: false, level: 4, classesNeeded: 1 }, // Day 11
  { img: lvl4Unlocked, isUnlocked: true, level: 4, classesNeeded: 0 }, // Day 12 — Level 4 unlocked
  { img: lvl5Inprogress, isUnlocked: false, level: 5, classesNeeded: 2 }, // Day 13
  { img: lvl5Inprogress, isUnlocked: false, level: 5, classesNeeded: 1 }, // Day 14
  { img: lvl5Unlocked, isUnlocked: true, level: 5, classesNeeded: 0 }, // Day 15 — Level 5 unlocked
  { img: lvl6Inprogress, isUnlocked: false, level: 6, classesNeeded: 2 }, // Day 16
  { img: lvl6Inprogress, isUnlocked: false, level: 6, classesNeeded: 1 }, // Day 17
  { img: lvl6Unlocked, isUnlocked: true, level: 6, classesNeeded: 0 }, // Day 18 — Level 6 unlocked
  { img: lvl7Locked, isUnlocked: false, level: 7, classesNeeded: 3 }, // Day 19
  { img: lvl7Locked, isUnlocked: false, level: 7, classesNeeded: 2 }, // Day 20
  { img: lvl7Inprogress, isUnlocked: false, level: 7, classesNeeded: 1 }, // Day 21
  { img: lvl7Unlocked, isUnlocked: true, level: 7, classesNeeded: 0 }, // Day 22 — Level 7 unlocked (certificate)
];

/** Resolves the join/watch/download link for a given level's reward — shared between the in-progress LevelCard and the all-completed Yoga Journey rewards list. */
export function getLevelRewardLink(level: number, language: string | undefined, studentName: string | undefined, joinLink: string): string {
  if (level === 1) return language === "English" ? "https://www.youtube.com/watch?v=bDvlif1ofKA" : "https://www.youtube.com/watch?v=ARr1TMvXYSA";
  if (level === 2) return language === "English" ? "https://www.youtube.com/live/xDFA6-KCE8k" : "https://www.youtube.com/watch?v=d3HiE2QhlZA";
  if (level === 3) return language === "English" ? "https://youtube.com/live/J3aX2kUMLno" : "https://youtube.com/live/Nc7figrxfuQ";
  if (level === 4) return language === "English" ? "https://www.youtube.com/live/IqESKRcvU8E" : "https://www.youtube.com/live/WnITjDbnCPY";
  if (level === 5) return language === "English" ? "https://youtube.com/live/LJzX5ltIFPw" : "https://www.youtube.com/live/dwGVmXjBskg";
  if (level === 6) return language === "English" ? "https://youtube.com/live/54LLUNIoxRY" : "https://www.youtube.com/live/6CcEvvn6shU";
  if (level === 7) return studentName ? `/certificate?name=${encodeURIComponent(studentName)}` : "/certificate";
  return joinLink;
}

export { LEVEL_REWARDS };

export function LevelCard({
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
  const safeDay = 22; // Math.min(Math.max(freeDaysAttended, 0), 22); // clamp to [0, 22] range
  const config = LEVEL_CARD_DATA[safeDay];
  const { isUnlocked, level, classesNeeded } = config;

  const rewardIdx = Math.min(level - 1, LEVEL_REWARDS.length - 1);
  const reward = LEVEL_REWARDS[rewardIdx];

  // Day 21: one class away from the certificate — shown as a "Congratulations" near-win state instead of the usual in-progress copy.
  const isAlmostCertified = !isUnlocked && level === 7 && classesNeeded === 1;

  // Figma absolute positions relative to card top-left (card starts at page x=26, y=418)
  // In-progress: title top=13, subtitle top=50, reward top=91, img left=146 top=33
  // Unlocked:    title top=13, text top=53,    button top=110, img left=148 top=34

  return (
    <div
      onClick={() => {
        if (isUnlocked && level === 7 && onCertificateClick) {
          onCertificateClick();
        }
      }}
      style={{
        position: "relative",
        background: "white",
        border: "0.25px solid #999",
        borderRadius: 16,
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
        height: 156,
        overflow: "hidden",
        fontFamily: "Outfit, sans-serif",
        cursor: isUnlocked && level === 7 && onCertificateClick ? "pointer" : "default",
      }}
    >
      {/* Reward image */}
      <img
        src={config.img}
        alt=""
        style={{
          position: "absolute",
          right: 0,
          top: isUnlocked ? 34 : 33,
          width: isUnlocked ? "min(209px, 50.7vw)" : "min(212px, 51.5vw)",
          height: isUnlocked ? "min(118px, 28.6vw)" : "min(119px, 28.9vw)",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      {/* View more — top right */}
      <div
        style={{
          position: "absolute",
          top: 9,
          right: 7,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onViewMore?.();
        }}
      >
        <span style={{ color: "#feab27", fontSize: 14, fontWeight: 600 }}>View more</span>
        <img
          src={downArrow}
          alt=""
          style={{ width: 25, height: 25, objectFit: "contain", transform: "rotate(-90deg)" }}
        />
      </div>

      {isUnlocked ? (
        /* ── Unlocked / Congratulations state ── */
        <>
          {/* Title — top=13, font 18px bold */}
          <p
            style={{
              position: "absolute",
              left: 18,
              right: 90,
              top: 13,
              margin: 0,
              fontSize: "clamp(14px, 4.4vw, 18px)",
              fontWeight: 700,
              color: "#202020",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "normal",
            }}
          >
            Congratulations{studentName ? ` ${studentName.split(" ")[0]}!` : "!"}
          </p>

          {/* Text block — top=53, width=143 */}
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 53,
              width: 143,
              color: "#0a386f",
              lineHeight: "normal",
            }}
          >
            <p style={{ margin: 0, fontSize: "clamp(8px, 2.4vw, 10px)", fontWeight: 400 }}>
              You have completed Level {level}
            </p>
            <p style={{ margin: 0, fontSize: "clamp(8px, 2.4vw, 10px)", fontWeight: 400 }}>
              Here's your reward...
            </p>
            <p style={{ margin: 0, fontSize: "clamp(10px, 2.9vw, 12px)", fontWeight: 700 }}>{reward.full}</p>
          </div>

          {/* Join now button — top=110, left=20 */}
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 110,
              width: 93,
              height: 28,
              borderRadius: 5,
              background: "linear-gradient(to bottom, #237ae2, #1858a5, #0b3f7d)",
              border: "0.25px solid #ffe1be",
              boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              cursor: "pointer",
              zIndex: 50,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (level === 7 && onCertificateClick) {
                onCertificateClick();
              } else {
                window.open(getLevelRewardLink(level, language, studentName, joinLink), "_blank");
              }
            }}
          >
            {level === 7 ? (
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
        /* ── In-progress state ── */
        <>
          {/* Title — top=13, font 16px bold */}
          <p
            style={{
              position: "absolute",
              left: 18,
              right: 90,
              top: 13,
              margin: 0,
              fontSize: isAlmostCertified ? "clamp(14px, 4.4vw, 18px)" : "clamp(13px, 3.9vw, 16px)",
              fontWeight: 700,
              color: "#202020",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "normal",
            }}
          >
            {isAlmostCertified
              ? `Congratulations${studentName ? ` ${studentName.split(" ")[0]}!` : "!"}`
              : `You are currently at Level ${level} !`}
          </p>

          {/* Subtitle — top=50, per-level width */}
          <p
            style={{
              position: "absolute",
              left: 20,
              top: 50,
              margin: 0,
              fontSize: safeDay === 0 ? "clamp(8px, 2.4vw, 10px)" : "clamp(10px, 2.9vw, 12px)",
              fontWeight: 400,
              color: "#0a386f",
              width: `min(${reward.subtitleWidth}px, 32vw)`,
              lineHeight: "normal",
            }}
          >
            {safeDay === 0
              ? `Attend 3 classes to complete Level 1 & join`
              : isAlmostCertified
                ? <>You have completed Level 7<br style={{ marginBottom: 4 }} />Attend tomorrow's session to get the</>
                : reward.completesAll
                  ? <>Attend {classesNeeded - 1} more class{classesNeeded - 1 !== 1 ? "es" : ""} to complete all levels &amp; get</>
                  : <>Attend {classesNeeded} more class{classesNeeded !== 1 ? "es" : ""} to{" "}{`complete Level ${level}`} &amp; get</>
            }
          </p>

          {/* Reward name — top=91, per-level width, 15px bold */}
          <div
            style={{
              position: "absolute",
              left: 20,
              top: reward.completesAll ? 105 : 91,
              width: `min(${reward.rewardWidth}px, 34vw)`,
              fontSize: "clamp(12px, 3.6vw, 15px)",
              fontWeight: 700,
              color: "#0a386f",
              lineHeight: "normal",
            }}
          >
            <p style={{ margin: 0 }}>{reward.line1}</p>
            <p style={{ margin: 0 }}>{reward.line2}</p>
          </div>
        </>
      )}
    </div>
  );
}
