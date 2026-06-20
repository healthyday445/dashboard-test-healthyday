import { useNavigate } from "react-router-dom";
import lvl1Inprogress from "@/assets/dashboard-level-card/lvl1_inprogress.png";
import lvl2Inprogress from "@/assets/dashboard-level-card/lvl2_inprogress.png";
import lvl3Inprogress from "@/assets/dashboard-level-card/lvl3_inprogress.png";
import lvl4Inprogress from "@/assets/dashboard-level-card/lvl4_inprogress.png";
import lvl5Inprogress from "@/assets/dashboard-level-card/lvl5_inprogress.png";
import lvl6Inprogress from "@/assets/dashboard-level-card/lvl6_inprogress.png";
import lvl7Inprogress from "@/assets/dashboard-level-card/lvl7_inprogress.png";
import lvl1Unlocked from "@/assets/dashboard-level-card/lvl1_unlocked.png";
import lvl2Unlocked from "@/assets/dashboard-level-card/lvl2_unlocked.png";
import lvl3Unlocked from "@/assets/dashboard-level-card/lvl3_unlocked.png";
import lvl4Unlocked from "@/assets/dashboard-level-card/lvl4_unlocked.png";
import lvl5Unlocked from "@/assets/dashboard-level-card/lvl5_unlocked.png";
import lvl6Unlocked from "@/assets/dashboard-level-card/lvl6_unlocked.png";
import lvl7Unlocked from "@/assets/dashboard-level-card/lvl7_unlocked.png";
import downArrow from "@/assets/dashboard-level-card/down_arrow.png";
import circledPlayButton from "@/assets/21daysprogram/circled_play_button.png";

// Reward info indexed by level (index 0 = Level 1)
// subtitleWidth / rewardWidth from Figma text bounding boxes
const LEVEL_REWARDS = [
  { line1: "3-Days",       line2: "Detox Program",  full: "3-Days Detox Program",         subtitleWidth: 134, rewardWidth: 128, completesAll: false },
  { line1: "3-Days",       line2: "Breakfast Diet", full: "3-Days Breakfast Diet",         subtitleWidth: 133, rewardWidth: 128, completesAll: false },
  { line1: "3-Days Sleep", line2: "Masterclass",    full: "3-Days Sleep Masterclass",      subtitleWidth: 134, rewardWidth: 128, completesAll: false },
  { line1: "3-Days",       line2: "Lunch Diet",     full: "3-Days Lunch Diet",             subtitleWidth: 135, rewardWidth: 128, completesAll: false },
  { line1: "Post Meal",    line2: "Body Movement",  full: "Post Meal Body Movement",       subtitleWidth: 137, rewardWidth: 137, completesAll: false },
  { line1: "3-Days",       line2: "Dinner Diet",    full: "3-Days Dinner Diet",            subtitleWidth: 137, rewardWidth: 137, completesAll: false },
  { line1: "21-Days Yoga", line2: "Certificate",    full: "21-Days Yoga Certificate",      subtitleWidth: 142, rewardWidth: 147, completesAll: true  },
];

// One entry per attended-day count (0–21), indexed directly by freeDaysAttended
const LEVEL_CARD_DATA = [
  { img: lvl1Inprogress, isUnlocked: false }, // Day 0
  { img: lvl1Inprogress, isUnlocked: false }, // Day 1
  { img: lvl1Inprogress, isUnlocked: false }, // Day 2
  { img: lvl1Unlocked,   isUnlocked: true  }, // Day 3  — Level 1 unlocked
  { img: lvl2Inprogress, isUnlocked: false }, // Day 4
  { img: lvl2Inprogress, isUnlocked: false }, // Day 5
  { img: lvl2Unlocked,   isUnlocked: true  }, // Day 6  — Level 2 unlocked
  { img: lvl3Inprogress, isUnlocked: false }, // Day 7
  { img: lvl3Inprogress, isUnlocked: false }, // Day 8
  { img: lvl3Unlocked,   isUnlocked: true  }, // Day 9  — Level 3 unlocked
  { img: lvl4Inprogress, isUnlocked: false }, // Day 10
  { img: lvl4Inprogress, isUnlocked: false }, // Day 11
  { img: lvl4Unlocked,   isUnlocked: true  }, // Day 12 — Level 4 unlocked
  { img: lvl5Inprogress, isUnlocked: false }, // Day 13
  { img: lvl5Inprogress, isUnlocked: false }, // Day 14
  { img: lvl5Unlocked,   isUnlocked: true  }, // Day 15 — Level 5 unlocked
  { img: lvl6Inprogress, isUnlocked: false }, // Day 16
  { img: lvl6Inprogress, isUnlocked: false }, // Day 17
  { img: lvl6Unlocked,   isUnlocked: true  }, // Day 18 — Level 6 unlocked
  { img: lvl7Inprogress, isUnlocked: false }, // Day 19
  { img: lvl7Inprogress, isUnlocked: false }, // Day 20
  { img: lvl7Unlocked,   isUnlocked: true  }, // Day 21 — Level 7 unlocked
];

export function LevelCard({
  freeDaysAttended,
  studentName,
  mobile,
  joinLink,
}: {
  freeDaysAttended: number;
  studentName?: string;
  mobile?: string;
  joinLink: string;
}) {
  const navigate = useNavigate();
  const safeDay = Math.min(Math.max(0, freeDaysAttended), LEVEL_CARD_DATA.length - 1);
  const config = LEVEL_CARD_DATA[safeDay];
  const { isUnlocked } = config;

  const level = isUnlocked ? safeDay / 3 : Math.floor(safeDay / 3) + 1;
  const rewardIdx = Math.min(level - 1, LEVEL_REWARDS.length - 1);
  const reward = LEVEL_REWARDS[rewardIdx];
  const classesNeeded = 3 - (safeDay % 3);

  const viewMoreTarget = mobile ? `/${mobile}/21daysprogram` : "/21daysprogram";

  // Figma absolute positions relative to card top-left (card starts at page x=26, y=418)
  // In-progress: title top=13, subtitle top=50, reward top=91, img left=146 top=33
  // Unlocked:    title top=13, text top=53,    button top=110, img left=148 top=34

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
      {/* Reward image */}
      <img
        src={config.img}
        alt=""
        style={{
          position: "absolute",
          left: isUnlocked ? 148 : 146,
          top: isUnlocked ? 34 : 33,
          width: isUnlocked ? 209 : 212,
          height: isUnlocked ? 118 : 119,
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
        onClick={() => navigate(viewMoreTarget)}
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
              top: 13,
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#202020",
              whiteSpace: "nowrap",
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
            <p style={{ margin: 0, fontSize: 10, fontWeight: 400 }}>
              You have completed Level {level}
            </p>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 400 }}>
              Here's your reward...
            </p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700 }}>{reward.full}</p>
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
            }}
            onClick={() => window.open(joinLink, "_blank")}
          >
            <img src={circledPlayButton} alt="" style={{ width: 12, height: 12 }} />
            <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>Join now</span>
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
              top: 13,
              margin: 0,
              fontSize: 16,
              fontWeight: 700,
              color: "#202020",
              whiteSpace: "nowrap",
              lineHeight: "normal",
            }}
          >
            You are currently at Level {level} !
          </p>

          {/* Subtitle — top=50, per-level width */}
          <p
            style={{
              position: "absolute",
              left: 20,
              top: 50,
              margin: 0,
              fontSize: 12,
              fontWeight: 400,
              color: "#0a386f",
              width: reward.subtitleWidth,
              lineHeight: "normal",
            }}
          >
            {safeDay === 0
              ? `Attend 3 classes to complete Level 1 & join`
              : <>Attend {classesNeeded} more class{classesNeeded !== 1 ? "es" : ""} to{" "}{reward.completesAll ? "complete all levels" : `complete Level ${level}`} &amp; get</>
            }
          </p>

          {/* Reward name — top=91, per-level width, 15px bold */}
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 91,
              width: reward.rewardWidth,
              fontSize: 15,
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
