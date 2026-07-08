import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import lockIcon from "@/assets/21daysprogram/lock_icon.png";
import lockLarge from "@/assets/21daysprogram/lock_large.png";
import completedBadge from "@/assets/21daysprogram/completed_badge.webp";
import levelIcon1 from "@/assets/21daysprogram/level_icon_1.webp";
import levelIcon2 from "@/assets/21daysprogram/level_icon_2.webp";
import levelIcon4 from "@/assets/21daysprogram/level_icon_4.webp";
import levelIcon6 from "@/assets/21daysprogram/level_icon_6.webp";
import levelIcon7 from "@/assets/21daysprogram/level_icon_7.webp";
import downloadIcon from "@/assets/21daysprogram/download_icon.png";
import rewardLvl1 from "@/assets/21daysprogram/reward_lvl1.webp";
import rewardLvl2 from "@/assets/21daysprogram/reward_lvl2.webp";
import rewardLvl4 from "@/assets/21daysprogram/reward_lvl4.webp";
import rewardLvl6 from "@/assets/21daysprogram/reward_lvl6.webp";
import rewardLvl7 from "@/assets/21daysprogram/reward_lvl7.webp";
import rewardCardBgUnlocked from "@/assets/21daysprogram/reward_card_bg_unlocked.png";
import circledPlayButton from "@/assets/21daysprogram/circled_play_button.png";
import padlockIcon from "@/assets/21daysprogram/padlock_icon.png";
import pathLineIcon from "@/assets/21daysprogram/path_line_icon.png";
import giftIconUnlocked from "@/assets/21daysprogram/gift_icon_unlocked.png";
import badgeCardL0 from "@/assets/21daysprogram/badge_card_l0.webp";
import badgeCardL1 from "@/assets/21daysprogram/badge_card_l1.webp";
import badgeCardL2 from "@/assets/21daysprogram/badge_card_l2.webp";
import badgeCardL4 from "@/assets/21daysprogram/badge_card_l4.webp";
import badgeCardL6 from "@/assets/21daysprogram/badge_card_l6.webp";
import badgeCardL7 from "@/assets/21daysprogram/badge_card_l7.webp";
import badgeCardShareIcon from "@/assets/21daysprogram/badge_card_share_icon.png";
import { LEVEL_UNLOCK_DAYS_V2, getLevelRewardLinkV2 } from "@/components/FourteenDaysV2LevelCard";

// 14-day journey: 5 levels (Detox/Breakfast/Lunch/Dinner/Certificate), unlocking every
// 3 days except the last (day 14, only 2 days after level 4) — see LEVEL_UNLOCK_DAYS_V2.
const LEVEL_DATA = [
  { level: 1, unlockDay: 3, rewardLine1: "3-Days Detox", rewardLine2: "Programme", badge: levelIcon1, rewardImg: rewardLvl1 },
  { level: 2, unlockDay: 6, rewardLine1: "3-Days", rewardLine2: "Breakfast Diet", badge: levelIcon2, rewardImg: rewardLvl2 },
  { level: 3, unlockDay: 9, rewardLine1: "3-Days", rewardLine2: "Lunch Diet", badge: levelIcon4, rewardImg: rewardLvl4 },
  { level: 4, unlockDay: 12, rewardLine1: "3-Days", rewardLine2: "Dinner Diet", badge: levelIcon6, rewardImg: rewardLvl6 },
  { level: 5, unlockDay: 14, rewardLine1: "14-Days Yoga", rewardLine2: "Certificate", badge: levelIcon7, rewardImg: rewardLvl7 },
];

// One zone config per completed-reward count (0-5), reusing the exact gradients/character
// art from the 21-day journey's matching reward identity (Detox/Breakfast/Lunch/Dinner/Certificate).
const ZONE_CONFIG = [
  { gradient: "radial-gradient(circle at 85% 0%, rgba(128,164,221,1) 0%, rgba(191,210,238,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL0, imgTop: 8, imgRight: 0, imgWidth: 198, imgHeight: 122, textRight: 176, titleCaps: true },
  { gradient: "radial-gradient(circle at 83% 0%, rgba(255,237,195,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL1, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  { gradient: "radial-gradient(circle at 87% 0%, rgba(212,220,145,1) 0%, rgba(234,238,200,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL2, imgTop: 0, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  { gradient: "radial-gradient(circle at 85% 0%, rgba(171,226,232,1) 0%, rgba(213,241,243,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL4, imgTop: -8, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  { gradient: "radial-gradient(circle at 85% 0%, rgba(255,189,189,1) 0%, rgba(255,255,255,1) 100%)", img: badgeCardL6, imgTop: -6, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
  { gradient: "radial-gradient(circle at 84% 0%, rgba(175,210,255,1) 0%, rgba(215,233,255,1) 50%, rgba(255,255,255,1) 100%)", img: badgeCardL7, imgTop: -6, imgRight: 0, imgWidth: 145, imgHeight: 138, textRight: 128, titleCaps: false },
];

// Indexed by completed-reward count (1-4) — the reward just unlocked at that milestone.
const BADGE_SUBTEXT_COMPLETED = ["", "3-Days Detox Programme", "3-Days Breakfast Diet", "3-Days Lunch Diet", "3-Days Dinner Diet"];

// Indexed by completed-reward count (0-4) — what's still needed, and the badge-card "Level"
// number for it. The top badge card counts one higher than the reward cards below it
// (Figma's own copy for day 2 reads "unlock Level 2 & 3-Days Detox Programme", i.e. the
// Detox reward — Level 1 on the reward-card timeline — is "Level 2" on the badge card).
const BADGE_SUBTEXT_INPROGRESS = [
  { verb: "unlock", badgeLevelNum: 2, reward: "3-Days Detox Programme" },
  { verb: "complete", badgeLevelNum: 3, reward: "Breakfast Diet" },
  { verb: "complete", badgeLevelNum: 4, reward: "Lunch Diet" },
  { verb: "complete", badgeLevelNum: 5, reward: "Dinner Diet" },
  { verb: "complete", badgeLevelNum: 6, reward: "a Certificate" },
];

type DayStatus = "completed" | "next" | "locked";

function getDayStatus(day: number, daysAttended: number): DayStatus {
  if (day <= daysAttended) return "completed";
  if (day === daysAttended + 1) return "next";
  return "locked";
}

const DOT_LEFT_EDGE = 16; // px-4
const DOT_COL_WIDTH = 40;
const LINE_LEFT = DOT_LEFT_EDGE + DOT_COL_WIDTH / 2 - 1; // 35px

function RewardCard({
  levelData,
  isUnlocked,
  lang,
  studentName,
  joinLink,
}: {
  levelData: (typeof LEVEL_DATA)[number];
  isUnlocked: boolean;
  lang?: string;
  studentName?: string;
  joinLink: string;
}) {
  const isCertificate = levelData.level === 5;

  const handleRewardClick = () => {
    if (!isUnlocked) return;
    if (isCertificate) {
      const urlParams = new URLSearchParams(window.location.search);
      const mobileParam = urlParams.get("mobile") || "";
      const pathParts = window.location.pathname.split("/");
      const maybeMobile = pathParts[1] && /^\+?\d+$/.test(pathParts[1]) ? pathParts[1] : mobileParam;
      const targetUrl = maybeMobile ? `/${maybeMobile}/certificate` : "/certificate";
      window.open(targetUrl, "_blank");
      return;
    }
    window.open(getLevelRewardLinkV2(levelData.level, lang, studentName, joinLink), "_blank");
  };

  return (
    <div
      className="relative rounded-[8px] overflow-hidden"
      style={{ height: 119, border: isUnlocked ? "0.75px solid #FEAB27" : "0.75px solid #c8c8c8" }}
    >
      <img
        src={rewardCardBgUnlocked}
        alt=""
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
        style={{ filter: isUnlocked ? "none" : "grayscale(1)" }}
      />

      {isUnlocked && (
        <div
          className="absolute flex items-center gap-[3px]"
          style={{ top: 8, left: 8, backgroundColor: "white", border: "0.2px solid #feab27", borderRadius: 3, paddingTop: 2, paddingBottom: 2, paddingLeft: 4, paddingRight: 4, zIndex: 2 }}
        >
          <img src={padlockIcon} alt="" style={{ width: 6, height: 6 }} />
          <span style={{ color: "#feab27", fontSize: 7, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>UNLOCKED</span>
        </div>
      )}

      <div className="absolute inset-0 flex pr-[14px]">
        <div className="flex-1 flex flex-col justify-start pl-[12px] min-w-0" style={{ paddingTop: isUnlocked ? 32 : 18 }}>
          <div className="flex items-center gap-[4px] mb-[2px]">
            <div
              className="relative flex-shrink-0 flex items-center justify-center rounded-full"
              style={{ width: 18, height: 18, backgroundColor: isUnlocked ? "#FEAB27" : "#c8c8c8" }}
            >
              <img src={giftIconUnlocked} alt="" style={{ width: 12, height: 12, filter: isUnlocked ? "none" : "grayscale(1)" }} />
            </div>
            <span className="font-semibold text-[11px] leading-none" style={{ color: isUnlocked ? "#0d468b" : "#798089", fontFamily: "Outfit, sans-serif" }}>
              Your Level {levelData.level} Reward
            </span>
          </div>
          <div className="h-px mb-[8px]" style={{ width: 98, marginLeft: 22, backgroundColor: isUnlocked ? "#FEAB27" : "#c8c8c8" }} />
          <p className="font-semibold text-[19px] leading-[20px] m-0" style={{ color: isUnlocked ? "#ff8a00" : "#807d79", fontFamily: "Outfit, sans-serif" }}>
            {levelData.rewardLine1}
          </p>
          <p className="font-semibold text-[19px] leading-[20px] m-0" style={{ color: isUnlocked ? "#ff8a00" : "#807d79", fontFamily: "Outfit, sans-serif" }}>
            {levelData.rewardLine2}
          </p>
        </div>

        <div className="flex-shrink-0 flex flex-col pt-[13px]" style={{ width: 130 }}>
          <div className="relative rounded-[5px] overflow-hidden" style={{ width: 130, height: 71, border: isUnlocked ? "0.75px solid #94A0AF" : "1px solid white" }}>
            <img src={levelData.rewardImg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: isUnlocked ? "none" : "grayscale(1) blur(2px)" }} />
            {!isUnlocked && (
              <div className="absolute inset-0 rounded-[5px] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.32)" }}>
                <img src={lockLarge} alt="locked" style={{ width: 20, height: 20 }} />
              </div>
            )}
          </div>

          <div
            onClick={handleRewardClick}
            className="flex items-center justify-center gap-1 mt-[4px]"
            style={{
              width: 130, height: 17, borderRadius: 5,
              background: isUnlocked ? "linear-gradient(to bottom, #237ae2, #1858a5, #0b3f7d)" : "#808284",
              border: `0.25px solid ${isUnlocked ? "#ffe1be" : "white"}`,
              boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)",
              cursor: isUnlocked ? "pointer" : "default",
            }}
          >
            {isCertificate ? (
              <>
                <span className="font-bold text-[9px] text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Download Certificate</span>
                <img src={downloadIcon} alt="" style={{ width: 10, height: 10 }} />
              </>
            ) : isUnlocked ? (
              <>
                <img src={circledPlayButton} alt="" style={{ width: 11, height: 11 }} />
                <span className="font-bold text-[10px] text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Join now</span>
              </>
            ) : (
              <span className="font-bold text-[10px] text-white" style={{ fontFamily: "Outfit, sans-serif" }}>LOCKED</span>
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
  lang,
  studentName,
  joinLink,
}: {
  day: number;
  status: DayStatus;
  levelData?: (typeof LEVEL_DATA)[number];
  daysAttended: number;
  rowRef?: React.RefObject<HTMLDivElement>;
  cardRef?: React.RefObject<HTMLDivElement>;
  lang?: string;
  studentName?: string;
  joinLink: string;
}) {
  const isMilestone = !!levelData;
  const isUnlocked = isMilestone && daysAttended >= (levelData?.unlockDay ?? 0);

  const dayText =
    status === "completed"
      ? `${day} /14   Healthyday${day === 1 ? "" : "s"} Completed`
      : `${day} /14   Healthydays`;

  const rowMinHeight = isMilestone ? 38 : status === "completed" ? 58 : 46;

  return (
    <div className="flex flex-col">
      <div className="flex items-center" ref={rowRef} style={{ gap: 19, minHeight: rowMinHeight }}>
        <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: DOT_COL_WIDTH }}>
          {status === "completed" ? (
            <img src={completedBadge} alt="" style={{ width: 28, height: 28, objectFit: "cover" }} />
          ) : (
            <>
              <div className="rounded-full" style={{ width: 24, height: 24, backgroundColor: "#d1d1d2" }} />
              <img src={lockIcon} alt="locked" className="absolute" style={{ width: 15, height: 15, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
            </>
          )}
        </div>

        <div className="flex-1 flex items-center justify-between">
          <span className="font-semibold text-[14px] whitespace-pre" style={{ fontFamily: "Outfit, sans-serif", color: status === "completed" ? "#0d468b" : "#b0b1b2" }}>
            {dayText}
          </span>

          {isMilestone && levelData?.badge && (
            <img
              src={levelData.badge}
              alt=""
              style={{
                width: 26, height: 26, objectFit: "cover", flexShrink: 0,
                filter: status === "completed" ? "drop-shadow(0px 3px 3px rgba(0,0,0,0.13))" : "grayscale(1) drop-shadow(0px 3px 3px rgba(0,0,0,0.08))",
              }}
            />
          )}
        </div>
      </div>

      {isMilestone && (
        <div ref={cardRef} style={{ marginLeft: DOT_COL_WIDTH + 19, marginBottom: 14 }}>
          <RewardCard levelData={levelData!} isUnlocked={isUnlocked} lang={lang} studentName={studentName} joinLink={joinLink} />
        </div>
      )}
    </div>
  );
}

interface FourteenDaysV2ProgramProps {
  initialStudentData?: any;
}

export default function FourteenDaysV2Program({ initialStudentData }: FourteenDaysV2ProgramProps = {}) {
  const { mobile } = useParams<{ mobile?: string }>();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<any>(initialStudentData ?? null);
  const [loading, setLoading] = useState(!initialStudentData);
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
    if (initialStudentData) return;
    const previewParams = new URLSearchParams(window.location.search);
    if (previewParams.get("preview_levels") !== null) {
      setLoading(false);
      return;
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
      navigate(`/${cleanedMobile}/14daysprogram`, { replace: true });
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
            throw new Error("This link is incorrect. Please recheck your WhatsApp reminder.");
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
  }, [mobile, navigate]);

  // Derive days attended from free_batches attendance_tracker, capped at 14.
  const daysAttended: number = (() => {
    const params = new URLSearchParams(window.location.search);
    const previewParam = params.get("preview_levels");
    if (previewParam !== null) {
      return Math.min(14, Math.max(0, parseInt(previewParam, 10)));
    }
    if (!studentData) return 0;
    const freeBatches = (studentData?.free_batches ?? []) as { batch_start_date: string; attendance_tracker: string[] }[];
    const activeBatches = freeBatches.filter((b) => b.batch_start_date === studentData?.free_batch_start_date);
    const batchesToCheck = activeBatches.length > 0 ? activeBatches : freeBatches;
    const allDates = new Set<string>(batchesToCheck.flatMap((b) => b.attendance_tracker ?? []));
    return Math.min(allDates.size, 14);
  })();

  const lang = studentData?.language === "English" ? "English" : "Telugu";
  const joinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link || "";
  const isMilestoneDay = daysAttended > 0 && LEVEL_UNLOCK_DAYS_V2.includes(daysAttended);
  // Number of rewards fully claimed so far (0-5) — used both to pick the badge-card zone
  // and, for milestone days, to know which reward was *just* unlocked.
  const completedCount = LEVEL_UNLOCK_DAYS_V2.filter((d) => d <= daysAttended).length;
  const zoneConfig = ZONE_CONFIG[completedCount];
  // Badge-card "Level" text is one higher than the reward-card Level it's building toward
  // (Figma's own day-2 copy: "unlock Level 2 & 3-Days Detox Programme", where Detox is
  // reward-card Level 1) — see BADGE_SUBTEXT_INPROGRESS comment.
  const badgeLevelZone = completedCount + 1;
  const badgeTitle = isMilestoneDay
    ? "CONGRATULATIONS!"
    : zoneConfig.titleCaps
      ? `YOU ARE AT LEVEL ${badgeLevelZone}!`
      : `You completed Level ${completedCount + 1}!`;
  const badgeTitleSize = isMilestoneDay || zoneConfig.titleCaps ? 18 : 16;

  const rawShareText =
    (daysAttended === 14
      ? "🌿 I Just Completed all 14 Days of the Yoga Challenge with Healthyday! 🎉🏅\n"
      : `🌿 I Just Completed LEVEL ${completedCount} of the 14 Days Yoga Challenge with Healthyday!🧘🏻‍♀️✨\n`) +
    `Honestly, if I can do it, you can do it too! 💚\n\n` +
    `🌿 14-Days FREE Yoga Challenge\n` +
    `📅 Starts Next Monday\n\n` +
    `✅ Daily Yoga\n` +
    `🥗 Simple Diet Guidance\n` +
    `🌿 Healthy Lifestyle Habits\n\n` +
    `with Jagan 🧘🏻‍♂️\n` +
    `🏅 Internationally Certified Yoga Teacher\n` +
    `👥 6,00,000+ Students Participated\n\n` +
    `👇🏻 Register FREE Here\n` +
    `https://yoga.healthyday.co.in?ref=${mobile || ""}`;

  const shareText = encodeURIComponent(rawShareText);

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/?text=${shareText}`, "_blank");
  };

  const badgeSubText = (() => {
    if (daysAttended === 0) return "Attend 3 classes to unlock Level 2.";
    if (daysAttended === 14) return "You have completed all the Levels & earned the 14-Days Yoga Certificate";
    if (isMilestoneDay) {
      return `You have completed Level ${completedCount + 1} & unlocked the ${BADGE_SUBTEXT_COMPLETED[completedCount]}!`;
    }
    const nextUnlockDay = LEVEL_UNLOCK_DAYS_V2[completedCount] ?? 14;
    const classesNeeded = nextUnlockDay - daysAttended;
    const { verb, badgeLevelNum, reward } = BADGE_SUBTEXT_INPROGRESS[completedCount];
    const suffix = verb === "unlock" ? reward : `get ${reward}`;
    return `Attend ${classesNeeded} more class${classesNeeded > 1 ? "es" : ""} to ${verb} Level ${badgeLevelNum} & ${suffix}`;
  })();

  useLayoutEffect(() => {
    if (!timelineContainerRef.current) return;
    const containerRect = timelineContainerRef.current.getBoundingClientRect();

    let day1El: HTMLDivElement | null = firstDayRowRef.current;
    if (!day1El && daysAttended === 0) day1El = nextDayRowRef.current;
    if (!day1El && daysAttended === 1) day1El = lastCompletedRowRef.current;
    if (day1El) {
      const r = day1El.getBoundingClientRect();
      setLineStartTop(Math.max(0, r.top + r.height / 2 - containerRect.top));
    }

    if (lastDayRowRef.current) {
      const r = lastDayRowRef.current.getBoundingClientRect();
      setTimelineEndHeight(Math.max(0, r.top + r.height / 2 - containerRect.top));
    }

    if (daysAttended === 0) {
      setGreenLineHeight(0);
      setSolidLineEndHeight(0);
      return;
    }
    if (daysAttended >= 14) {
      if (lastCompletedRowRef.current) {
        const lastRow = lastCompletedRowRef.current.getBoundingClientRect();
        setSolidLineEndHeight(Math.max(0, lastRow.top + lastRow.height / 2 - containerRect.top));
      }
      setGreenLineHeight(timelineContainerRef.current.offsetHeight - 40);
      return;
    }

    if (lastCompletedRowRef.current) {
      const lastRow = lastCompletedRowRef.current.getBoundingClientRect();
      setSolidLineEndHeight(Math.max(0, lastRow.top + lastRow.height / 2 - containerRect.top));
    }

    if (isMilestoneDay && iconCardRef.current) {
      const cardRect = iconCardRef.current.getBoundingClientRect();
      setGreenLineHeight(Math.max(0, cardRect.top + cardRect.height / 2 - containerRect.top));
      return;
    }
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
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div style={{ width: 48, height: 48, border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "#888", fontSize: 14, fontWeight: 500 }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hd-page flex flex-col items-center justify-center gap-4 px-6" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10" />
        <p className="text-center text-sm text-red-500">{error}</p>
      </div>
    );
  }

  // Boundary level: last milestone day whose reward is unlocked — the path icon points at its reward card.
  const boundaryUnlockDay = [...LEVEL_UNLOCK_DAYS_V2].reverse().find((d) => d <= daysAttended) ?? 0;

  return (
    <div className="relative">
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <div className="absolute" style={{ top: 21, left: 26, right: 26, height: 138 }}>
          <div className="relative w-full h-full rounded-[20px] overflow-hidden" style={{ border: "1px solid #b8b8b8", boxShadow: "0px -1px 8px 0px rgba(0,0,0,0.05), 0px 1px 8px 0px rgba(0,0,0,0.05)", background: zoneConfig.gradient }}>
            <div className="absolute flex flex-col" style={{ top: zoneConfig.titleCaps ? 14 : 11, bottom: zoneConfig.titleCaps ? 14 : 12, left: 23, right: zoneConfig.textRight, justifyContent: zoneConfig.titleCaps ? "center" : "flex-start", zIndex: 1 }}>
              <p className="font-medium text-[12px] leading-none" style={{ color: "#0a386f", fontFamily: "Outfit, sans-serif", marginBottom: zoneConfig.titleCaps ? 6 : 9 }}>
                {studentData?.name ? `Namaste ${studentData.name.split(" ")[0]} Ji,` : "Namaste Ji,"}
              </p>
              <p className="font-bold leading-none" style={{ color: "#0a386f", fontFamily: "Outfit, sans-serif", fontSize: badgeTitleSize, marginBottom: 8, whiteSpace: "nowrap" }}>
                {badgeTitle}
              </p>
              <p className="font-medium text-[12px] leading-snug" style={{ color: "#000000", fontFamily: "Outfit, sans-serif", flex: zoneConfig.titleCaps ? undefined : 1 }}>
                {badgeSubText}
              </p>
              {!zoneConfig.titleCaps && (
                <a
                  href="#"
                  onClick={handleShareClick}
                  className="flex items-center justify-center gap-[5px]"
                  style={{ width: 179, height: 22, backgroundColor: "#feab27", borderRadius: 5, boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)", textDecoration: "none", flexShrink: 0 }}
                >
                  <img src={badgeCardShareIcon} alt="" style={{ width: 15, height: 15 }} />
                  <span style={{ color: "white", fontSize: 12, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>Share on WhatsApp Status</span>
                </a>
              )}
            </div>

            <img
              src={zoneConfig.img}
              alt=""
              className="absolute object-cover pointer-events-none"
              style={{ top: zoneConfig.imgTop, right: zoneConfig.imgRight, width: zoneConfig.imgWidth, height: zoneConfig.imgHeight, zIndex: 0 }}
            />
          </div>
        </div>
      </div>

      <p className="font-bold text-[18px] px-6 mt-2 mb-3" style={{ color: "#202020", fontFamily: "Outfit, sans-serif" }}>
        14-Days Yoga Challenge
      </p>

      <div className="relative pb-8" style={{ paddingLeft: DOT_LEFT_EDGE, paddingRight: 16 }} ref={timelineContainerRef}>
        {solidLineEndHeight > lineStartTop && (
          <div className="absolute" style={{ left: LINE_LEFT, top: lineStartTop, height: solidLineEndHeight - lineStartTop, width: 3, backgroundColor: "#22c55e", zIndex: 0 }} />
        )}

        {daysAttended > 0 && daysAttended < 14 && greenLineHeight > solidLineEndHeight && (
          <div
            className="absolute"
            style={{ left: LINE_LEFT, top: solidLineEndHeight, width: 3, height: greenLineHeight - solidLineEndHeight, background: "repeating-linear-gradient(to bottom, #0D9400 0px, #0D9400 6px, transparent 6px, transparent 12px)", zIndex: 0 }}
          />
        )}

        {daysAttended > 0 && daysAttended < 14 && greenLineHeight > 0 && (() => {
          const iconSize = isMilestoneDay ? 22 : 15;
          const half = iconSize / 2;
          return (
            <img src={pathLineIcon} alt="" style={{ position: "absolute", left: LINE_LEFT - half, top: greenLineHeight - half, width: iconSize, height: iconSize, zIndex: 2 }} />
          );
        })()}

        {daysAttended < 14 && timelineEndHeight > Math.max(lineStartTop, greenLineHeight + 8) && (
          <div
            className="absolute"
            style={{ left: LINE_LEFT, top: Math.max(lineStartTop, greenLineHeight + 8), height: timelineEndHeight - Math.max(lineStartTop, greenLineHeight + 8), width: 3, backgroundColor: "#d1d1d2", zIndex: 0 }}
          />
        )}

        <div className="relative" style={{ zIndex: 1 }}>
          {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => {
            const status = getDayStatus(day, daysAttended);
            const levelInfo = LEVEL_DATA.find((l) => l.unlockDay === day);
            const isMilestone = !!levelInfo;
            const isNextDay = status === "next";
            const isLastCompleted = day === daysAttended;
            const isLastDay = day === 14;
            const isIconLevel = isMilestone && levelInfo!.unlockDay === boundaryUnlockDay && boundaryUnlockDay > 0;
            return (
              <DayRow
                key={day}
                day={day}
                status={status}
                levelData={levelInfo}
                daysAttended={daysAttended}
                lang={lang}
                studentName={studentData?.name}
                joinLink={joinLink}
                rowRef={
                  isNextDay ? nextDayRowRef :
                    isLastCompleted ? lastCompletedRowRef :
                      isLastDay ? lastDayRowRef :
                        day === 1 ? firstDayRowRef :
                          undefined
                }
                cardRef={isIconLevel ? iconCardRef : undefined}
              />
            );
          })}
        </div>

        <div className="mt-4 mx-2" style={{ height: 1, backgroundColor: "#e5e5e5" }} />
      </div>
    </div>
  );
}
