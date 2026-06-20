import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import heroBg from "@/assets/21daysprogram/hero-bg.png";
import lockIcon from "@/assets/21daysprogram/lock_icon.png";
import lockLarge from "@/assets/21daysprogram/lock_large.png";
import completedBadge from "@/assets/21daysprogram/completed_badge.png";
import levelIcon1 from "@/assets/21daysprogram/level_icon_1.png";
import levelIcon2 from "@/assets/21daysprogram/level_icon_2.png";
import levelIcon3 from "@/assets/21daysprogram/level_icon_3.png";
import levelIcon4 from "@/assets/21daysprogram/level_icon_4.png";
import levelIcon5 from "@/assets/21daysprogram/level_icon_5.png";
import levelIcon6 from "@/assets/21daysprogram/level_icon_6.png";
import levelIcon7 from "@/assets/21daysprogram/level_icon_7.png";
import downloadIcon from "@/assets/21daysprogram/download_icon.png";
import rewardVideoPlaceholder from "@/assets/language_English.webp";
import rewardCardBgUnlocked from "@/assets/21daysprogram/reward_card_bg_unlocked.png";
import circledPlayButton from "@/assets/21daysprogram/circled_play_button.png";
import padlockIcon from "@/assets/21daysprogram/padlock_icon.png";
import pathLineIcon from "@/assets/21daysprogram/path_line_icon.png";
import giftIconUnlocked from "@/assets/21daysprogram/gift_icon_unlocked.png";
import badgeCardL0 from "@/assets/21daysprogram/badge_card_l0.png";
import badgeCardL1 from "@/assets/21daysprogram/badge_card_l1.png";
import badgeCardL2 from "@/assets/21daysprogram/badge_card_l2.png";
import badgeCardL3 from "@/assets/21daysprogram/badge_card_l3.png";
import badgeCardL4 from "@/assets/21daysprogram/badge_card_l4.png";
import badgeCardL5 from "@/assets/21daysprogram/badge_card_l5.png";
import badgeCardL6 from "@/assets/21daysprogram/badge_card_l6.png";
import badgeCardL7 from "@/assets/21daysprogram/badge_card_l7.png";
import badgeCardShareIcon from "@/assets/21daysprogram/badge_card_share_icon.png";

const LEVEL_DATA = [
  { level: 1, unlockDay: 3, rewardLine1: "3-Days Detox", rewardLine2: "Programme", badge: levelIcon1 },
  { level: 2, unlockDay: 6, rewardLine1: "3-Days", rewardLine2: "Breakfast Diet", badge: levelIcon2 },
  { level: 3, unlockDay: 9, rewardLine1: "3-Days Sleep", rewardLine2: "Masterclass", badge: levelIcon3 },
  { level: 4, unlockDay: 12, rewardLine1: "3-Days", rewardLine2: "Lunch Diet", badge: levelIcon4 },
  { level: 5, unlockDay: 15, rewardLine1: "Post Meal", rewardLine2: "Body Movement", badge: levelIcon5 },
  { level: 6, unlockDay: 18, rewardLine1: "3-Days", rewardLine2: "Dinner Diet", badge: levelIcon6 },
  { level: 7, unlockDay: 21, rewardLine1: "21-Days Yoga", rewardLine2: "Certificate", badge: levelIcon7 },
];

// Indexed directly by daysAttended (0–21) — one config per day so each can be individually styled
const BADGE_CARD_DATA = [
  // Day 0 — YOU ARE AT LEVEL 1!, blue sky scene
  { gradient: "radial-gradient(circle at 85% 0%, rgba(128,164,221,1) 0%, rgba(191,210,238,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL0, imgTop: 8, imgRight: 0, imgWidth: 198, imgHeight: 122, textRight: 176, titleCaps: true },
  // Day 1
  { gradient: "radial-gradient(circle at 85% 0%, rgba(128,164,221,1) 0%, rgba(191,210,238,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL0, imgTop: 8, imgRight: 0, imgWidth: 198, imgHeight: 122, textRight: 176, titleCaps: true },
  // Day 2
  { gradient: "radial-gradient(circle at 85% 0%, rgba(128,164,221,1) 0%, rgba(191,210,238,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL0, imgTop: 8, imgRight: 0, imgWidth: 198, imgHeight: 122, textRight: 176, titleCaps: true },
  // Day 3 — CONGRATULATIONS! Level 1, warm yellow
  { gradient: "radial-gradient(circle at 83% 0%, rgba(255,237,195,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL1, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  // Day 4
  { gradient: "radial-gradient(circle at 83% 0%, rgba(255,237,195,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL1, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 5
  { gradient: "radial-gradient(circle at 83% 0%, rgba(255,237,195,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL1, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 6 — CONGRATULATIONS! Level 2, yellow-green
  { gradient: "radial-gradient(circle at 87% 0%, rgba(212,220,145,1) 0%, rgba(234,238,200,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL2, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  // Day 7
  { gradient: "radial-gradient(circle at 87% 0%, rgba(212,220,145,1) 0%, rgba(234,238,200,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL2, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 8
  { gradient: "radial-gradient(circle at 87% 0%, rgba(212,220,145,1) 0%, rgba(234,238,200,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL2, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 9 — CONGRATULATIONS! Level 3, lavender
  { gradient: "radial-gradient(circle at 89% 0%, rgba(246,219,255,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL3, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  // Day 10
  { gradient: "radial-gradient(circle at 89% 0%, rgba(246,219,255,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL3, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 11
  { gradient: "radial-gradient(circle at 89% 0%, rgba(246,219,255,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL3, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 12 — CONGRATULATIONS! Level 4, teal
  { gradient: "radial-gradient(circle at 85% 0%, rgba(171,226,232,1) 0%, rgba(213,241,243,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL4, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 13
  { gradient: "radial-gradient(circle at 85% 0%, rgba(171,226,232,1) 0%, rgba(213,241,243,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL4, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 14
  { gradient: "radial-gradient(circle at 85% 0%, rgba(171,226,232,1) 0%, rgba(213,241,243,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL4, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 15 — CONGRATULATIONS! Level 5, warm orange
  { gradient: "radial-gradient(circle at 86% 0%, rgba(249,191,117,1) 0%, rgba(251,207,152,1) 25%, rgba(252,223,186,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL5, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  // Day 16
  { gradient: "radial-gradient(circle at 86% 0%, rgba(249,191,117,1) 0%, rgba(251,207,152,1) 25%, rgba(252,223,186,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL5, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 17
  { gradient: "radial-gradient(circle at 86% 0%, rgba(249,191,117,1) 0%, rgba(251,207,152,1) 25%, rgba(252,223,186,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL5, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 18 — CONGRATULATIONS! Level 6, pink/salmon
  { gradient: "radial-gradient(circle at 85% 0%, rgba(255,189,189,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL6, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 19
  { gradient: "radial-gradient(circle at 85% 0%, rgba(255,189,189,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL6, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 20
  { gradient: "radial-gradient(circle at 85% 0%, rgba(255,189,189,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL6, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 148, titleCaps: false },
  // Day 21 — CONGRATULATIONS! All 21 days!, blue/indigo
  { gradient: "radial-gradient(circle at 84% 0%, rgba(175,210,255,1) 0%, rgba(215,233,255,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL7, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
];

// Indexed by completedLevel (daysAttended / 3), for milestone days
const BADGE_SUBTEXT_COMPLETED = [
  "",                        // 0 — handled separately
  "3-Days Detox Program",
  "3-Days Breakfast Diet",
  "3-Days Sleep Masterclass",
  "3-Days Lunch Diet",
  "Post-Meal Body Movement",
  "3-Days Dinner Diet",
];

// Indexed by Math.floor(daysAttended / 3) for non-milestone days
const BADGE_SUBTEXT_INPROGRESS = [
  { verb: "unlock", levelNum: 2, reward: "3-Days Detox Programme" },
  { verb: "complete", levelNum: 2, reward: "Breakfast Diet" },
  { verb: "complete", levelNum: 3, reward: "Sleep Masterclass" },
  { verb: "complete", levelNum: 4, reward: "Lunch Diet" },
  { verb: "complete", levelNum: 5, reward: "Post Meal Movement" },
  { verb: "complete", levelNum: 6, reward: "Dinner Diet" },
  { verb: "complete", levelNum: 7, reward: "a Certificate" },
];

type DayStatus = "completed" | "next" | "locked";

function getDayStatus(day: number, daysAttended: number): DayStatus {
  if (day <= daysAttended) return "completed";
  if (day === daysAttended + 1) return "next";
  return "locked";
}

// Dot column is 40px wide, centered at 20px. px-4 = 16px padding.
// Line center = 16 + 20 = 36px from left edge.
const DOT_LEFT_EDGE = 16; // px-4
const DOT_COL_WIDTH = 40;
const LINE_LEFT = DOT_LEFT_EDGE + DOT_COL_WIDTH / 2 - 1; // 35px

function RewardCard({
  levelData,
  isUnlocked,
}: {
  levelData: (typeof LEVEL_DATA)[number];
  isUnlocked: boolean;
}) {
  const isCertificate = levelData.level === 7;
  return (
    <div
      className="relative rounded-[8px] overflow-hidden"
      style={{ height: 119 }}
    >
      <img
        src={rewardCardBgUnlocked}
        alt=""
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
        style={{ filter: isUnlocked ? "none" : "grayscale(1)" }}
      />

      {/* Unlocked tag overlaid at top-left of card */}
      {isUnlocked && (
        <div
          className="absolute flex items-center gap-[3px]"
          style={{
            top: 8,
            left: 8,
            backgroundColor: "white",
            border: "0.2px solid #feab27",
            borderRadius: 3,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 4,
            paddingRight: 4,
            zIndex: 2,
          }}
        >
          <img src={padlockIcon} alt="" style={{ width: 6, height: 6 }} />
          <span
            style={{
              color: "#feab27",
              fontSize: 7,
              fontWeight: 700,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            UNLOCKED
          </span>
        </div>
      )}

      <div className="absolute inset-0 flex pr-[14px]">
        {/* Left reward info */}
        <div
          className="flex-1 flex flex-col justify-start pl-[12px] min-w-0"
          style={{ paddingTop: isUnlocked ? 32 : 18 }}
        >
          <div className="flex items-center gap-[4px] mb-[2px]">
            <div
              className="relative flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 18,
                height: 18,
                backgroundColor: isUnlocked ? "#FEAB27" : "#c8c8c8",
              }}
            >
              <img
                src={giftIconUnlocked}
                alt=""
                style={{ width: 12, height: 12, filter: isUnlocked ? "none" : "grayscale(1)" }}
              />
            </div>
            <span
              className="font-semibold text-[11px] leading-none"
              style={{
                color: isUnlocked ? "#0d468b" : "#798089",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Your Level {levelData.level} Reward
            </span>
          </div>
          <div
            className="h-px mb-[8px]"
            style={{
              width: 98,
              marginLeft: 22,
              backgroundColor: isUnlocked ? "#FEAB27" : "#c8c8c8",
            }}
          />
          <p
            className="font-semibold text-[19px] leading-[20px] m-0"
            style={{
              color: isUnlocked ? "#ff8a00" : "#807d79",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {levelData.rewardLine1}
          </p>
          <p
            className="font-semibold text-[19px] leading-[20px] m-0"
            style={{
              color: isUnlocked ? "#ff8a00" : "#807d79",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {levelData.rewardLine2}
          </p>
        </div>

        {/* Right video + button */}
        <div className="flex-shrink-0 flex flex-col pt-[13px]" style={{ width: 130 }}>
          <div
            className="relative rounded-[5px] overflow-hidden"
            style={{
              width: 130,
              height: 71,
              border: isUnlocked ? "1px solid #FF8A00" : "1px solid white",
            }}
          >
            <img
              src={rewardVideoPlaceholder}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: isUnlocked ? "none" : "grayscale(1) blur(2px)" }}
            />
            {!isUnlocked && (
              <div
                className="absolute inset-0 rounded-[5px] flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.32)" }}
              >
                <img src={lockLarge} alt="locked" style={{ width: 20, height: 20 }} />
              </div>
            )}
          </div>

          {/* Button — always shows "Download Certificate" for level 7 */}
          <div
            className="flex items-center justify-center gap-1 mt-[4px]"
            style={{
              width: 130,
              height: 17,
              borderRadius: 5,
              background: isUnlocked
                ? "linear-gradient(to bottom, #237ae2, #1858a5, #0b3f7d)"
                : "#808284",
              border: `0.25px solid ${isUnlocked ? "#ffe1be" : "white"}`,
              boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)",
            }}
          >
            {isCertificate ? (
              <>
                <span
                  className="font-bold text-[9px] text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Download Certificate
                </span>
                <img src={downloadIcon} alt="" style={{ width: 10, height: 10 }} />
              </>
            ) : isUnlocked ? (
              <>
                <img src={circledPlayButton} alt="" style={{ width: 11, height: 11 }} />
                <span
                  className="font-bold text-[10px] text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Join now
                </span>
              </>
            ) : (
              <span
                className="font-bold text-[10px] text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                LOCKED
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DayRow({
  day,
  status,
  levelData,
  daysAttended,
  rowRef,
  cardRef,
}: {
  day: number;
  status: DayStatus;
  levelData?: (typeof LEVEL_DATA)[number];
  daysAttended: number;
  rowRef?: React.RefObject<HTMLDivElement>;
  cardRef?: React.RefObject<HTMLDivElement>;
}) {
  const isMilestone = !!levelData;
  const isUnlocked = isMilestone && daysAttended >= (levelData?.unlockDay ?? 0);

  const dayText =
    status === "completed"
      ? `${day} /21   Healthyday${day === 1 ? "" : "s"} Completed`
      : `${day} /21   Healthydays`;

  // Figma: completed rows ~59px, locked/next rows ~46px, milestone headers ~38px
  const rowMinHeight = isMilestone ? 38 : status === "completed" ? 58 : 46;

  return (
    <div className="flex flex-col">
      <div className="flex items-center" ref={rowRef} style={{ gap: 19, minHeight: rowMinHeight }}>
        {/* Dot column */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center"
          style={{ width: DOT_COL_WIDTH }}
        >
          {status === "completed" ? (
            <img
              src={completedBadge}
              alt=""
              style={{ width: 28, height: 28, objectFit: "cover" }}
            />
          ) : (
            <>
              <div
                className="rounded-full"
                style={{ width: 24, height: 24, backgroundColor: "#d1d1d2" }}
              />
              <img
                src={lockIcon}
                alt="locked"
                className="absolute"
                style={{
                  width: 15,
                  height: 15,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </>
          )}
        </div>

        {/* Text + right badge */}
        <div className="flex-1 flex items-center justify-between">
          <span
            className="font-semibold text-[14px] whitespace-pre"
            style={{
              fontFamily: "Outfit, sans-serif",
              color: status === "completed" ? "#0d468b" : "#b0b1b2",
            }}
          >
            {dayText}
          </span>

          {/* Level badge for all milestone days — coloured if completed, greyscale if not */}
          {isMilestone && levelData?.badge && (
            <img
              src={levelData.badge}
              alt=""
              style={{
                width: 26,
                height: 26,
                objectFit: "cover",
                flexShrink: 0,
                filter: status === "completed"
                  ? `${(day === 18 || day === 21) ? "saturate(0.55) " : ""}drop-shadow(0px 3px 3px rgba(0,0,0,0.13))`
                  : "grayscale(1) drop-shadow(0px 3px 3px rgba(0,0,0,0.08))",
              }}
            />
          )}

        </div>
      </div>

      {/* Reward card below milestone day */}
      {isMilestone && (
        <div ref={cardRef} style={{ marginLeft: DOT_COL_WIDTH + 19, marginBottom: 14 }}>
          <RewardCard levelData={levelData!} isUnlocked={isUnlocked} />
        </div>
      )}
    </div>
  );
}

export default function TwentyOneDaysProgram() {
  const { mobile } = useParams<{ mobile?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const previewMode = new URLSearchParams(location.search).get("preview");

  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const nextDayRowRef = useRef<HTMLDivElement>(null);
  const iconCardRef = useRef<HTMLDivElement>(null);
  const lastCompletedRowRef = useRef<HTMLDivElement>(null);
  const lastDayRowRef = useRef<HTMLDivElement>(null);
  const firstDayRowRef = useRef<HTMLDivElement>(null);
  const [greenLineHeight, setGreenLineHeight] = useState(0);
  const [solidLineEndHeight, setSolidLineEndHeight] = useState(0);
  const [lineStartTop, setLineStartTop] = useState(0);
  const [timelineEndHeight, setTimelineEndHeight] = useState(0);

  useEffect(() => {
    // Preview mode: ?preview=day0 … ?preview=day21
    // Skips API call entirely and sets mock attendance count.
    if (previewMode) {
      const dayMatch = previewMode.match(/^day(\d+)$/);
      if (dayMatch) {
        const days = Math.min(21, Math.max(0, parseInt(dayMatch[1], 10)));
        setStudentData({
          paid_attendance_tracker: Array(days).fill("mon"),
        });
        setLoading(false);
        return;
      }
    }

    if (!mobile) {
      setLoading(false);
      return;
    }

    const cleanedMobile = mobile.replace(/[\s\-\(\)\+]/g, "");

    if (!/^\d{7,15}$/.test(cleanedMobile)) {
      setLoading(false);
      setError("Please enter a valid mobile number.");
      return;
    }

    if (mobile !== cleanedMobile) {
      navigate(`/${cleanedMobile}/21daysprogram`, { replace: true });
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiMobile = `+${cleanedMobile}`;
        const encodedMobile = encodeURIComponent(apiMobile);
        const response = await fetch(`/.netlify/functions/student?mobile=${encodedMobile}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "This link is incorrect. Please recheck your WhatsApp reminder."
            );
          }
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setStudentData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mobile, navigate, previewMode]);

  // Derive days attended from whichever tracker is available, capped at 21
  const daysAttended: number = (() => {
    if (!studentData) return 0;
    const paidDays: number = studentData?.paid_attendance_tracker?.length ?? 0;
    if (paidDays > 0) return Math.min(paidDays, 21);
    const freeBatches: any[] = studentData?.free_batches ?? [];
    const freeLen: number = freeBatches[0]?.attendance_tracker?.length ?? 0;
    return Math.min(freeLen, 21);
  })();

  // Level zone: which level group the student is currently "in" (1–7)
  const levelZone = Math.max(1, Math.min(7, Math.ceil((daysAttended + 0.01) / 3)));
  const badgeCardConfig = BADGE_CARD_DATA[daysAttended];
  const badgeCardLevel = Math.floor(daysAttended / 3); // 0–7, for text interpolation
  const isMilestone = daysAttended > 0 && daysAttended % 3 === 0;
  const badgeTitle = isMilestone
    ? "CONGRATULATIONS!"
    : badgeCardConfig.titleCaps
      ? `YOU ARE AT LEVEL ${levelZone}!`
      : `You completed Level ${badgeCardLevel}!`;
  const badgeTitleSize = isMilestone || badgeCardConfig.titleCaps ? 18 : 16;
  const shareText = encodeURIComponent(
    daysAttended === 21
      ? "I completed all 21 Days of the HealthyDay Yoga Challenge! 🎉🏅"
      : `I just completed Level ${badgeCardLevel} of the HealthyDay 21-Day Yoga Challenge! 🧘‍♀️🎉`
  );

  const badgeSubText = (() => {
    if (daysAttended === 0) return "Attend 3 classes to unlock Level 2.";
    if (daysAttended === 21) return "You have completed all the Levels & earned the 21-Days Yoga Certificate";
    if (isMilestone) {
      return `You have completed Level ${badgeCardLevel} & unlocked the ${BADGE_SUBTEXT_COMPLETED[badgeCardLevel]}!`;
    }
    const classesNeeded = 3 - (daysAttended % 3);
    const { verb, levelNum, reward } = BADGE_SUBTEXT_INPROGRESS[badgeCardLevel];
    const suffix = verb === "unlock" ? reward : `get ${reward}`;
    return `Attend ${classesNeeded} more class${classesNeeded > 1 ? "es" : ""} to ${verb} Level ${levelNum} & ${suffix}`;
  })();

  useLayoutEffect(() => {
    if (!timelineContainerRef.current) return;
    const containerRect = timelineContainerRef.current.getBoundingClientRect();

    // Line starts at center of day 1 row.
    // firstDayRowRef is only assigned when day 1 has no critical ref (daysAttended >= 2).
    // For daysAttended 0, day 1 holds nextDayRowRef; for daysAttended 1, it holds lastCompletedRowRef.
    let day1El: HTMLDivElement | null = firstDayRowRef.current;
    if (!day1El && daysAttended === 0) day1El = nextDayRowRef.current;
    if (!day1El && daysAttended === 1) day1El = lastCompletedRowRef.current;
    if (day1El) {
      const r = day1El.getBoundingClientRect();
      setLineStartTop(Math.max(0, r.top + r.height / 2 - containerRect.top));
    }

    // Always measure where day-21 row center sits in the container
    if (lastDayRowRef.current) {
      const r = lastDayRowRef.current.getBoundingClientRect();
      setTimelineEndHeight(Math.max(0, r.top + r.height / 2 - containerRect.top));
    }

    if (daysAttended === 0) {
      setGreenLineHeight(0);
      setSolidLineEndHeight(0);
      return;
    }
    if (daysAttended >= 21) {
      if (lastCompletedRowRef.current) {
        const lastRow = lastCompletedRowRef.current.getBoundingClientRect();
        setSolidLineEndHeight(Math.max(0, lastRow.top + lastRow.height / 2 - containerRect.top));
      }
      setGreenLineHeight(timelineContainerRef.current.offsetHeight - 40);
      return;
    }

    // solidLineEndHeight = center of last completed row
    if (lastCompletedRowRef.current) {
      const lastRow = lastCompletedRowRef.current.getBoundingClientRect();
      setSolidLineEndHeight(Math.max(0, lastRow.top + lastRow.height / 2 - containerRect.top));
    }

    const isMilestone = daysAttended % 3 === 0;

    if (isMilestone && iconCardRef.current) {
      // Milestone: path icon at center of the just-unlocked reward card (below the milestone row)
      const cardRect = iconCardRef.current.getBoundingClientRect();
      setGreenLineHeight(Math.max(0, cardRect.top + cardRect.height / 2 - containerRect.top));
      return;
    }
    // Non-milestone: path icon between last completed and next day row centers
    if (lastCompletedRowRef.current && nextDayRowRef.current) {
      const lastRow = lastCompletedRowRef.current.getBoundingClientRect();
      const nextRow = nextDayRowRef.current.getBoundingClientRect();
      setGreenLineHeight(Math.max(0, (lastRow.top + lastRow.height / 2 + nextRow.top + nextRow.height / 2) / 2 - containerRect.top));
      return;
    }
    if (nextDayRowRef.current) {
      const nextRow = nextDayRowRef.current.getBoundingClientRect();
      setGreenLineHeight(Math.max(0, nextRow.top - containerRect.top + nextRow.height / 2));
    }
  }, [daysAttended, studentData, loading]);

  if (loading) {
    return (
      <div
        className="hd-page bg-background flex flex-col items-center justify-center"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div
            style={{
              width: 48,
              height: 48,
              border: "4px solid #EDF6FF",
              borderTop: "4px solid #FEAB27",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ color: "#888", fontSize: 14, fontWeight: 500 }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="hd-page flex flex-col items-center justify-center gap-4 px-6"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <img src={logo} alt="Healthyday" className="h-10" />
        <p className="text-center text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="hd-page bg-white overflow-x-hidden"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      {/* Fixed Header */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 z-10 bg-white flex items-center"
        style={{
          width: "100%",
          maxWidth: 412,
          height: 68,
          boxShadow: "0px 4px 30px 0px rgba(0,0,0,0.1)",
          paddingLeft: 20,
        }}
      >
        <img
          src={logo}
          alt="Healthyday"
          style={{ height: 28, width: 144, objectFit: "contain" }}
        />
      </div>

      {/* Spacer for fixed header */}
      <div style={{ height: 68 }} />

      <div
        className="relative"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "100% 22.5rem",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* Hero section with badge card overlay */}
        <div className="relative overflow-hidden" style={{ height: 180 }}>

          {/* Badge card */}
          <div className="absolute" style={{ top: 21, left: 26, right: 26, height: 138 }}>
            <div
              className="relative w-full h-full rounded-[20px] overflow-hidden"
              style={{
                border: "1px solid #b8b8b8",
                boxShadow: "0px -1px 8px 0px rgba(0,0,0,0.05), 0px 1px 8px 0px rgba(0,0,0,0.05)",
                background: badgeCardConfig.gradient,
              }}
            >
              {/* Left text block */}
              <div
                className="absolute flex flex-col"
                style={{
                  top: badgeCardConfig.titleCaps ? 14 : 11,
                  bottom: badgeCardConfig.titleCaps ? 14 : 12,
                  left: 23,
                  right: badgeCardConfig.textRight,
                  justifyContent: badgeCardConfig.titleCaps ? "center" : "flex-start",
                }}
              >
                <p
                  className="font-medium text-[12px] leading-none"
                  style={{
                    color: "#0a386f",
                    fontFamily: "Outfit, sans-serif",
                    marginBottom: badgeCardConfig.titleCaps ? 6 : 9,
                  }}
                >
                  {studentData?.name ? `Hello ${studentData.name},` : "Hello there,"}
                </p>
                <p
                  className="font-bold leading-none"
                  style={{
                    color: "#0a386f",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: badgeTitleSize,
                    marginBottom: 8,
                  }}
                >
                  {badgeTitle}
                </p>
                <p
                  className="font-medium text-[12px] leading-snug"
                  style={{
                    color: "#000000",
                    fontFamily: "Outfit, sans-serif",
                    flex: badgeCardConfig.titleCaps ? undefined : 1,
                  }}
                >
                  {badgeSubText}
                </p>
                {!badgeCardConfig.titleCaps && (
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-[5px]"
                    style={{
                      width: 179,
                      height: 22,
                      backgroundColor: "#feab27",
                      borderRadius: 5,
                      boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)",
                      textDecoration: "none",
                      flexShrink: 0,
                    }}
                  >
                    <img src={badgeCardShareIcon} alt="" style={{ width: 15, height: 15 }} />
                    <span
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      Share on WhatsApp Status
                    </span>
                  </a>
                )}
              </div>

              {/* Right character image */}
              <img
                src={badgeCardConfig.img}
                alt=""
                className="absolute object-cover pointer-events-none"
                style={{
                  top: badgeCardConfig.imgTop,
                  right: badgeCardConfig.imgRight,
                  width: badgeCardConfig.imgWidth,
                  height: badgeCardConfig.imgHeight,
                }}
              />
            </div>
          </div>
        </div>

        {/* Section title */}
        <p
          className="font-bold text-[18px] px-6 mt-2 mb-3"
          style={{ color: "#202020", fontFamily: "Outfit, sans-serif" }}
        >
          21-Days Yoga Challenge
        </p>

        {/* Timeline */}
        <div
          className="relative pb-8"
          style={{ paddingLeft: DOT_LEFT_EDGE, paddingRight: 16 }}
          ref={timelineContainerRef}
        >
          {/* Green solid line — day 1 center to center of last completed row */}
          {solidLineEndHeight > lineStartTop && (
            <div
              className="absolute"
              style={{
                left: LINE_LEFT,
                top: lineStartTop,
                height: solidLineEndHeight - lineStartTop,
                width: 3,
                backgroundColor: "#22c55e",
                zIndex: 0,
              }}
            />
          )}

          {/* Dashed green line — last completed row center to path icon */}
          {daysAttended > 0 && daysAttended < 21 && greenLineHeight > solidLineEndHeight && (
            <div
              className="absolute"
              style={{
                left: LINE_LEFT,
                top: solidLineEndHeight,
                width: 3,
                height: greenLineHeight - solidLineEndHeight,
                background:
                  "repeating-linear-gradient(to bottom, #0D9400 0px, #0D9400 6px, transparent 6px, transparent 12px)",
                zIndex: 0,
              }}
            />
          )}

          {/* Path icon — vertically centered on the boundary reward card */}
          {daysAttended > 0 && daysAttended < 21 && greenLineHeight > 0 && (
            <img
              src={pathLineIcon}
              alt=""
              style={{
                position: "absolute",
                left: LINE_LEFT - 7,
                top: greenLineHeight - 7,
                width: 15,
                height: 15,
                zIndex: 2,
              }}
            />
          )}

          {/* Gray line — remaining portion (starts below icon, hidden when all done) */}
          {daysAttended < 21 && timelineEndHeight > Math.max(lineStartTop, greenLineHeight + 8) && (
            <div
              className="absolute"
              style={{
                left: LINE_LEFT,
                top: Math.max(lineStartTop, greenLineHeight + 8),
                height: timelineEndHeight - Math.max(lineStartTop, greenLineHeight + 8),
                width: 3,
                backgroundColor: "#d1d1d2",
                zIndex: 0,
              }}
            />
          )}

          <div className="relative" style={{ zIndex: 1 }}>
            {LEVEL_DATA.map((levelInfo) => {
              const startDay = (levelInfo.level - 1) * 3 + 1;
              // Boundary level: last level whose reward is unlocked
              const boundaryUnlockDay = Math.floor(daysAttended / 3) * 3;
              const isIconLevel =
                levelInfo.unlockDay === boundaryUnlockDay && boundaryUnlockDay > 0;
              return (
                <div key={levelInfo.level}>
                  {[startDay, startDay + 1, startDay + 2].map((day) => {
                    const status = getDayStatus(day, daysAttended);
                    const isMilestone = day === levelInfo.unlockDay;
                    const isNextDay = status === "next";
                    const isLastCompleted = day === daysAttended;
                    const isLastDay = day === 21;
                    return (
                      <DayRow
                        key={day}
                        day={day}
                        status={status}
                        levelData={isMilestone ? levelInfo : undefined}
                        daysAttended={daysAttended}
                        rowRef={
                          isNextDay ? nextDayRowRef :
                          isLastCompleted ? lastCompletedRowRef :
                          isLastDay ? lastDayRowRef :
                          day === 1 ? firstDayRowRef :
                          undefined
                        }
                        cardRef={isMilestone && isIconLevel ? iconCardRef : undefined}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Bottom separator */}
          <div
            className="mt-4 mx-2"
            style={{ height: 1, backgroundColor: "#e5e5e5" }}
          />
        </div>
      </div>

    </div>
  );
}
