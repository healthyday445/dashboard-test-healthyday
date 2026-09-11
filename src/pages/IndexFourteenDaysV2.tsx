import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useStudentData, StudentFetchError } from "@/hooks/use-student-data";
import { useSessionLinks } from "@/hooks/use-session-links";
import { useReferrals } from "@/hooks/use-referrals";
import { useContestSummary } from "@/hooks/use-contest";
import { isFreeBatchOver, getSimulatedBatchDate, getBonusWindowStart } from "@/lib/utils";
import logo from "@/assets/Primary_logo.svg";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import ReferWinCard from "@/components/ReferWinCard";
import ReferAndWin500 from "@/components/ReferAndWin500";
import { FourteenDaySessionCard } from "@/components/FourteenDaySessionCard";
import { FourteenDayBonusSessionCard, getBonusInfo, BONUS_DAYS } from "@/components/FourteenDayBonusSessionCard";
import { FourteenDaysV2LevelCard } from "@/components/FourteenDaysV2LevelCard";
import { FourteenDaysV2JourneyCompletedPage } from "@/components/FourteenDaysV2JourneyCompletedPage";
import { FourteenDaysV2TabBar, type FourteenDaysV2Tab } from "@/components/FourteenDaysV2TabBar";
import completedJourneyHeroBg from "@/assets/21daysprogram/completed_journey_hero_bg.webp";
import IndexPaid from "@/pages/IndexPaid";
import SubscriptionPausedScreen from "@/components/SubscriptionPausedScreen";
import { CertificateModal } from "@/components/CertificateModal";

import thumbFaceYogaTel from "@/assets/bonus/faceyoga_tel.webp";
import thumbFaceYogaEng from "@/assets/bonus/faceyoga_eng.webp";
import thumbWeightLossTel from "@/assets/bonus/weightlosssession.webp";
import thumbWeightLossEng from "@/assets/bonus/weightlosssession_eng.webp";
import thumbBreathWorkTel from "@/assets/bonus/breathwork.webp";
import thumbBreathWorkEng from "@/assets/bonus/bw_eng.webp";
import thumbMeditationTel from "@/assets/bonus/meditation_tel.webp";
import thumbMeditationEng from "@/assets/bonus/meditation_eng.webp";
import thumbSleepTel from "@/assets/bonus/sleepsession.webp";
import thumbSleepEng from "@/assets/bonus/sleepsession_eng.webp";

const IndexOnboarding = lazy(() => import("@/pages/IndexOnboarding"));

import { safeSessionStorage } from "@/lib/storage";
import { getNowIST } from "@/lib/serverTime";

// ?preview_dashboard=<key> seeds mock studentData so each render state of the
// Live Sessions tab can be checked without real API data — mirrors the equivalent
// mechanism in IndexTwentyOneDay.tsx. Existing per-state fine-tuning params (forceDay,
// time) still work on top of whichever state is selected here. Combine with ?tab=journey
// to land directly on the 14day_completed state's Journey tab.
const previewToLocalDateStr = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const buildPreviewDashboardData = (key: string): any | null => {
  const today = new Date();
  switch (key) {
    case "coming_soon":
      return { status: "registered", language: "Hindi", name: "Preview User" };

    case "onboarding":
      return {
        status: "registered",
        language: "Telugu",
        name: "Preview User",
        free_batch_start_date: null,
        free_classes_joining_link: null,
        referral_link: "healthyday.app/ref=preview",
      };

    case "onboarding_eng":
      return {
        status: "registered",
        language: "English",
        name: "Preview User",
        free_batch_start_date: null,
        free_classes_joining_link: null,
        referral_link: "healthyday.app/ref=preview",
      };

    case "free_active": {
      // Anchored to a real new-format batch start date (not "today") so the
      // Level Card renders faithfully; use forceDay to pick a day.
      const batchStart = "2026-07-13";
      return {
        status: "14DaysOngoing",
        language: "Telugu",
        name: "Preview User",
        free_batch_start_date: batchStart,
        free_classes_joining_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        free_batches: [{ batch_start_date: batchStart, attendance_tracker: [] }],
        total_referral_count: 3,
      };
    }

    case "free_active_eng": {
      const batchStart = "2026-07-13";
      return {
        status: "14DaysOngoing",
        language: "English",
        name: "Preview User",
        free_batch_start_date: batchStart,
        free_classes_joining_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        free_batches: [{ batch_start_date: batchStart, attendance_tracker: [] }],
        total_referral_count: 3,
      };
    }

    case "paid": {
      const subEnd = new Date(today);
      subEnd.setDate(subEnd.getDate() + 90);
      return {
        status: "paid",
        language: "Telugu",
        name: "Preview User",
        subscriptions: [{ subscription_status: "active", plan_type: "12_months", subscription_end: previewToLocalDateStr(subEnd) }],
        paid_classes_joining_link: "https://www.youtube.com/c/Healthyday",
        classes_joining_link: "https://www.youtube.com/c/Healthyday",
        attendance_tracker: [],
        paid_attendance_tracker: ["mon", "wed"],
        sub_end_date: previewToLocalDateStr(subEnd),
        total_referral_count: 5,
        referral_link: "healthyday.app/ref=preview",
      };
    }

    case "pastdue": {
      const subEnd = new Date(today);
      subEnd.setDate(subEnd.getDate() - 10);
      return {
        status: "pastdue",
        language: "Telugu",
        name: "Preview User",
        subscriptions: [{ subscription_status: "expired", subscription_end: previewToLocalDateStr(subEnd) }],
      };
    }

    case "paused": {
      // Mirrors the effective status getEffectiveStatus() would derive from a real
      // paid+paused API response — this preview path renders studentData.status directly
      // rather than going through Dashboard.tsx's routing. `language` is overridden below
      // by the generic ?previewLanguage= param when present.
      const resumeDate = new Date(today);
      resumeDate.setDate(resumeDate.getDate() + 30);
      return {
        status: "subscriptionPaused",
        language: "English",
        name: "Preview User",
        mobile: "+919999999999",
        current_plan: null,
        subscription_status: "paused",
        resume_date: previewToLocalDateStr(resumeDate),
        subscriptions: [{ subscription_status: "paused", plan_type: "12_months" }],
      };
    }

    case "14day_completed":
      return { status: "14DaysCompleted", language: "Telugu", name: "Preview User", total_referral_count: 4 };

    default:
      return null;
  }
};

interface IndexProps {
  initialStudentData?: any;
  onSwitchToJourney?: () => void;
}

/**
 * "Live sessions" tab content for 14-day batches from 2026-07-13 onward (every following
 * Monday). Everything except the active-batch dashboard is identical to IndexFourteenDays.tsx
 * (loading/error/coming-soon/paid/pastdue/onboarding have no new design for this cohort).
 * The active-batch dashboard renders without its own header/tab-bar — Dashboard.tsx supplies
 * both around this component while the student is actively in the batch. The 14-day-completed
 * state is reached through Dashboard.tsx's standalone fallback instead (status no longer
 * qualifies for the outer tabs), so it owns its own header + FourteenDaysV2TabBar here.
 */
const IndexFourteenDaysV2 = ({ initialStudentData, onSwitchToJourney }: IndexProps = {}) => {
  const navigate = useNavigate();
  const { mobile: pathMobile } = useParams<{ mobile: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const queryMobile = searchParams.get("mobile");
  const mobile = pathMobile || queryMobile || undefined;

  const previewDashboardKey = searchParams.get("preview_dashboard");
  const previewLanguage = searchParams.get("previewLanguage");
  // Memoized so its identity is stable across renders when the QA params haven't actually
  // changed — several effects below depend on it, which would otherwise refire every
  // render in preview_dashboard mode (buildPreviewDashboardData returns a fresh object
  // each call).
  const effectiveInitialData = useMemo(() => {
    const previewStudentData = previewDashboardKey ? buildPreviewDashboardData(previewDashboardKey) : null;
    if (!previewStudentData) return initialStudentData;
    return previewLanguage ? { ...previewStudentData, language: previewLanguage } : previewStudentData;
  }, [previewDashboardKey, previewLanguage, initialStudentData]);

  useEffect(() => {
    if (!pathMobile && queryMobile) {
      const remaining = new URLSearchParams(location.search);
      remaining.delete("mobile");
      const qs = remaining.toString();
      navigate(`/${queryMobile}${qs ? `?${qs}` : ""}`, { replace: true });
    }
  }, [pathMobile, queryMobile, navigate, location.search]);

  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [studentData, setStudentData] = useState<any>(effectiveInitialData ?? null);
  const [showComingSoon, setShowComingSoon] = useState(
    effectiveInitialData
      ? !(effectiveInitialData.language === "Telugu" || effectiveInitialData.language === "English")
      : false
  );
  const [authenticated, setAuthenticated] = useState(
    effectiveInitialData
      ? (effectiveInitialData.language === "Telugu" || effectiveInitialData.language === "English")
      : false
  );
  // `?previewSnDate=YYYY-MM-DD` (SN Challenge QA preview, see PREVIEWS.md) is forwarded to
  // the backend's `date` param so `/session-link/active` returns links "as of" that date
  // instead of real today — without this, previewing a future campaign day would show an
  // empty dashboard since the backend excludes any session whose session_date is still in
  // the future. `time` is this app's own "8.00am"-style param, converted to the backend's
  // "HH:MM" IST inside the hook.
  const { sessionLinks, isLoading: sessionLinksLoading } = useSessionLinks({
    previewSnDate: searchParams.get("previewSnDate"),
    time: searchParams.get("time"),
  });
  const sessionLinksLoaded = !sessionLinksLoading;
  // Completed-batch page tab — defaults to "live", or override via ?tab=journey for direct preview
  const [completedTab, setCompletedTab] = useState<FourteenDaysV2Tab>(
    searchParams.get("tab") === "journey" ? "journey" : "live"
  );

  const rawMobile = mobile || "";
  const cleanedMobile = rawMobile.replace(/[\s\-\(\)\+]/g, "");
  const isValidMobile = /^\d{7,15}$/.test(cleanedMobile);
  const isMismatchedMobile = !!rawMobile && rawMobile !== cleanedMobile;
  const shouldFetchStudent = !effectiveInitialData && !!mobile && isValidMobile && !isMismatchedMobile;
  const studentQuery = useStudentData(cleanedMobile, shouldFetchStudent);

  useEffect(() => {
    if (effectiveInitialData) return;
    const data = studentQuery.data;
    if (!data) return;

    setStudentData(data);
    safeSessionStorage.setItem("total_referral_count", String(data.total_referral_count ?? 0));
    safeSessionStorage.setItem("referrer_mobile", mobile || "");

    if (data.language === "Telugu" || data.language === "English") {
      setAuthenticated(true);
    } else {
      setShowComingSoon(true);
    }
  }, [effectiveInitialData, studentQuery.data, mobile]);

  // Canonicalize the URL's mobile segment — a separate concern from data fetching.
  useEffect(() => {
    if (effectiveInitialData || !mobile || !isValidMobile) return;
    if (rawMobile !== cleanedMobile) {
      navigate(`/${cleanedMobile}`, { replace: true });
    }
  }, [effectiveInitialData, mobile, rawMobile, cleanedMobile, isValidMobile, navigate]);

  const loading = shouldFetchStudent && studentQuery.isLoading;
  const error = effectiveInitialData
    ? null
    : !mobile
      ? "No mobile number provided. Please visit /<mobile_number> to login."
      : !isValidMobile
        ? "Please enter a valid mobile number."
        : studentQuery.error instanceof StudentFetchError && studentQuery.error.status === 404
          ? "This link is incorrect. Can you please recheck your WhatsApp reminder and open the correct link?"
          : studentQuery.error instanceof Error ? studentQuery.error.message : null;

  // Verified referral count (from /referrals, distinct from studentData.total_referral_count)
  // — fetched independently of the effect above, since that one no-ops when a parent
  // (Dashboard.tsx) already supplied initialStudentData. Only paid students see this value
  // (in IndexPaid below) — free-batch students don't need it, so skip the fetch for them.
  const referralsQuery = useReferrals(cleanedMobile, { enabled: isValidMobile && studentData?.status === "paid" });
  const verifiedReferralCount = referralsQuery.data?.verified_referrals ?? null;

  // Contest-enrolled free batch students (see project_contest_enrolled_free_batches memory)
  // see the TOP-N Refer & Win card in place of the generic ReferWinCard, on both the
  // onboarding screen (IndexOnboarding.tsx) and the active-batch dashboard below.
  const contestId: string | null = studentData?.last_referral_contest_id ?? null;
  const contestSummaryQuery = useContestSummary(contestId);
  const contestSummary = contestSummaryQuery.data ?? null;

  if (loading) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div style={{ width: "48px", height: "48px", border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading your dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div style={{ background: "#FFF3F3", border: "1px solid #FFD4D4", borderRadius: "12px", padding: "24px", textAlign: "center", maxWidth: "340px" }}>
          <p style={{ color: "#D32F2F", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Oops!</p>
          <p style={{ color: "#666", fontSize: "14px", fontWeight: 400 }}>{error}</p>
        </div>
      </div>
    );
  }

  if (showComingSoon) {
    return (
      <div className="hd-page bg-background flex items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "340px", borderRadius: "16px", background: "#fff", padding: "32px 24px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", fontFamily: "Outfit, sans-serif", animation: "popIn 0.3s ease-out" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>
              🌍
            </div>
            <h2 style={{ color: "#202020", fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>English is Coming Soon!</h2>
            <p style={{ color: "#888", fontSize: "14px", fontWeight: 400, lineHeight: "1.5", marginBottom: "24px" }}>
              We're currently available in <strong style={{ color: "#FEAB27" }}>Telugu</strong> only.
              English support is on the way — stay tuned!
            </p>
            <div style={{ width: "100%", height: "6px", borderRadius: "3px", background: "#F0F0F0", overflow: "hidden" }}>
              <div style={{ width: "60%", height: "100%", background: "linear-gradient(90deg, #FEAB27, #FF8C00)", borderRadius: "3px", animation: "progressPulse 1.5s ease-in-out infinite" }} />
            </div>
            <style>{`
              @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
              @keyframes progressPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  const getActiveBatchInfo = (batchDateStr: string | null | undefined, batchEndDateStr: string | null | undefined) => {
    if (!batchDateStr) return { isActive: false as const };
    const batchStart = new Date(batchDateStr);
    batchStart.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - batchStart.getTime()) / 86400000);
    if (diffDays < 0 || diffDays >= 14) return { isActive: false as const };
    if (isFreeBatchOver(batchEndDateStr)) return { isActive: false as const };
    const currentDay = diffDays + 1;
    const week = currentDay <= 7 ? 1 : 2;
    const batchEnd = new Date(batchStart);
    batchEnd.setDate(batchStart.getDate() + 13);
    const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const MON_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fmt = (d: Date) => `${DAY_NAMES[d.getDay()]}, ${MON_NAMES[d.getMonth()]} ${d.getDate()}`;
    return {
      isActive: true as const,
      currentDay,
      week,
      dateRangeLabel: `${fmt(batchStart)} — ${fmt(batchEnd)}`,
    };
  };

  const _globalForceDayParam = new URLSearchParams(location.search).get("forceDay");
  const _globalTimeParam = new URLSearchParams(location.search).get("time");
  const isForceOnboardingPreview = _globalForceDayParam === "0";
  // Whether the batch is "over" right now — driven by the real clock, or by the
  // ?forceDay=/?time= QA preview overrides when present (simulates that day's date).
  const batchOverNow = _globalForceDayParam !== null && studentData?.free_batch_start_date
    ? isFreeBatchOver(studentData.free_batch_end_date, {
        today: getSimulatedBatchDate(studentData.free_batch_start_date, parseInt(_globalForceDayParam, 10)),
        timeOverride: _globalTimeParam,
      })
    : isFreeBatchOver(studentData?.free_batch_end_date);
  const batchInfo = (() => {
    const real = getActiveBatchInfo(studentData?.free_batch_start_date, studentData?.free_batch_end_date);
    if (_globalForceDayParam !== null && studentData?.free_batch_start_date) {
      const fd = parseInt(_globalForceDayParam, 10);
      const bs = new Date(studentData.free_batch_start_date);
      bs.setHours(0, 0, 0, 0);
      const be = new Date(bs);
      be.setDate(bs.getDate() + 13);
      const DN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const fmt = (d: Date) => `${DN[d.getDay()]}, ${MN[d.getMonth()]} ${d.getDate()}`;
      return { isActive: !batchOverNow, currentDay: fd, week: fd <= 7 ? 1 : 2, dateRangeLabel: `${fmt(bs)} — ${fmt(be)}` };
    }
    return real;
  })();
  const studentStatus = studentData?.status;
  const isOngoingStatus = studentStatus === "registered" || studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing";
  const isPaid = studentStatus === "paid";
  const sessionJoinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link;
  const hasBatchAccess = isOngoingStatus && batchInfo.isActive && !!sessionJoinLink;

  // --- Active Batch: "Live sessions" tab content (Week 1 or Week 2) ---
  // No own header/tab-bar here — Dashboard.tsx renders those around this component
  // while the student is actively in the batch (status stays eligible for the outer tabs).
  if (hasBatchAccess && !isForceOnboardingPreview) {
    const { currentDay, week } = batchInfo;

    const freeBatches: any[] = studentData?.free_batches ?? [];
    const activeBatches = freeBatches.filter((b) => b.batch_start_date === studentData?.free_batch_start_date);
    const batchesToCheck = activeBatches.length > 0 ? activeBatches : freeBatches;
    const attendedDates = new Set<string>(batchesToCheck.flatMap((b) => b.attendance_tracker ?? []));
    const batchOrigin = new Date(studentData?.free_batch_start_date!);
    batchOrigin.setHours(0, 0, 0, 0);

    // ?preview_attended=<0-14> overrides the real attendance count so the Level Card's
    // in-progress/unlocked states can be checked without seeding attendance_tracker dates.
    const previewAttendedParam = searchParams.get("preview_attended");
    const freeDaysAttended = previewAttendedParam !== null
      ? Math.min(Math.max(parseInt(previewAttendedParam, 10), 0), 14)
      : Math.min(attendedDates.size, 14);

    const nowIST = getNowIST();
    const defaultTotalMin = nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
    const _sessionLinkTimeParam = new URLSearchParams(location.search).get("time");
    const totalMinCalc = (() => {
      if (_sessionLinkTimeParam) {
        const isPM = _sessionLinkTimeParam.toLowerCase().endsWith("pm");
        const s = _sessionLinkTimeParam.toLowerCase().replace("am", "").replace("pm", "");
        const [hStr, mStr] = s.split(".");
        let h = parseInt(hStr, 10);
        const m = parseInt(mStr ?? "0", 10);
        if (isPM && h !== 12) h += 12;
        if (!isPM && h === 12) h = 0;
        return h * 60 + m;
      }
      return defaultTotalMin;
    })();
    const isMorning = totalMinCalc < (15 * 60 + 30);
    const timeOfDayStr = isMorning ? "morning" : "evening";
    const freeLangKey = (studentData?.language || "Telugu").toLowerCase();
    const freeSessionCode = `14d_week${week}_${timeOfDayStr}`;

    const freeApiSessionEntry = sessionLinks.find(
      (s: any) => s.session_code === freeSessionCode && s.language === freeLangKey
    );
    const freeApiSessionLink = freeApiSessionEntry?.link || null;

    const sessionLink = freeApiSessionLink || sessionJoinLink || "https://www.youtube.com/c/Healthyday";
    const ytIdMatch = sessionLink.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    const sessionVideoId = ytIdMatch ? ytIdMatch[1] : null;

    const lang = studentData?.language === "English" ? "English" : "Telugu";
    const bonusInfo = BONUS_DAYS.includes(currentDay)
      ? getBonusInfo(currentDay, lang, {
          faceYogaTel: thumbFaceYogaTel,
          faceYogaEng: thumbFaceYogaEng,
          weightLossTel: thumbWeightLossTel,
          weightLossEng: thumbWeightLossEng,
          breathWorkTel: thumbBreathWorkTel,
          breathWorkEng: thumbBreathWorkEng,
          meditationTel: thumbMeditationTel,
          meditationEng: thumbMeditationEng,
          sleepTel: thumbSleepTel,
          sleepEng: thumbSleepEng,
        })
      : null;
    const showBonus = !!bonusInfo && totalMinCalc >= getBonusWindowStart(bonusInfo.startMin) && totalMinCalc < bonusInfo.startMin + (bonusInfo.activeEndOffset ?? 30);
    const bonusIsLive = !!bonusInfo && totalMinCalc >= bonusInfo.startMin - 30 && totalMinCalc < bonusInfo.startMin + (bonusInfo.liveDuration ?? 30);

    return (
      <div style={{ fontFamily: "Outfit, sans-serif" }}>
        {showBonus && bonusInfo ? (
          <FourteenDayBonusSessionCard bonusSession={bonusInfo} isLive={bonusIsLive} mobile={mobile} />
        ) : (
          <FourteenDaySessionCard
            currentDay={currentDay}
            batchOrigin={batchOrigin}
            sessionLink={sessionLink}
            sessionVideoId={sessionVideoId}
            language={studentData?.language}
            mobile={mobile}
            freeSessionCode={freeSessionCode}
            onJoin={() => {}}
            isLoading={!sessionLinksLoaded}
          />
        )}

        <div style={{ padding: "18px 20px 0" }}>
          <FourteenDaysV2LevelCard
            freeDaysAttended={freeDaysAttended}
            studentName={studentData?.name}
            joinLink={sessionJoinLink || ""}
            language={studentData?.language}
            onViewMore={onSwitchToJourney}
            onCertificateClick={() => setShowCertificateModal(true)}
          />
        </div>

        {contestId && contestSummary ? (
          <div style={{ padding: "18px 20px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <ReferAndWin500
              topN={contestSummary.giftEligibleRank}
              onClick={() => navigate(mobile ? `/${mobile}/leaderboard` : "/leaderboard")}
            />
            <button
              onClick={() => {
                const waMessage = `I am Inviting you to join me in\n*14-Days FREE YOGA* 🧘‍♀️😊\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith *JAGAN* 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students\n\n*Register for FREE Now* 👇🏻👇🏻\n${mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : "https://yoga.healthyday.co.in?ref=demo"}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank");
              }}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "30px",
                background: "#FEAB27",
                border: "none",
                cursor: "pointer",
                fontFamily: "Outfit",
                fontSize: "16px",
                fontWeight: 500,
                color: "#202020",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                boxShadow: "0px 4px 2px rgba(0,0,0,0.25)",
              }}
            >
              Refer &amp; Win Yoga Kit
            </button>
          </div>
        ) : (
          /* Plain share-link Refer & Win card — stands in for the "TOP 100 WINNERS / Get Yoga
             Kit" prize card shown in this spot in Figma for non-contest-enrolled students. */
          <div style={{ padding: "18px 20px 32px" }}>
            <ReferWinCard showTitle={true} shareLink={mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : (studentData?.referral_link ?? "")} referralsUrl={`/${mobile || ""}/referrals`} />
          </div>
        )}
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          initialName={studentData?.name}
          mobile={mobile || studentData?.mobile}
          daysAttended={14}
          programDays={14}
          />
      </div>
    );
  }

  // --- Paid Member Dashboard ---
  if (isPaid && !isForceOnboardingPreview) {
    return (
      <IndexPaid
        studentData={studentData}
        sessionLinks={sessionLinks}
        sessionLinksLoaded={sessionLinksLoaded}
        mobile={mobile}
        selectedPlanIdx={selectedPlanIdx}
        setSelectedPlanIdx={setSelectedPlanIdx}
        verifiedReferralCount={verifiedReferralCount  ?? 0}
      />
    );
  }

  // --- Subscription Paused Dashboard ---
  if (studentStatus === "subscriptionPaused" && !isForceOnboardingPreview) {
    return <SubscriptionPausedScreen studentData={studentData} />;
  }

  // --- Past Due / Subscription Expired Dashboard ---
  if (studentStatus === "pastdue" && !isForceOnboardingPreview) {
    const expiredSub = studentData?.subscriptions?.find((s: any) => s.subscription_status === "expired") || studentData?.subscriptions?.[studentData.subscriptions.length - 1];
    const expiredDateRaw = expiredSub?.subscription_end || studentData?.sub_end_date || studentData?.plan_end_date || studentData?.plan_expired_date;
    const formatExpiredDate = (dateStr: string) => {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      const day = d.getDate();
      const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${day}${suffix} ${months[d.getMonth()]}`;
    };
    const expiredDateLabel = formatExpiredDate(expiredDateRaw);

    return (
      <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "fit-content", height: "30px", borderRadius: "40px", border: "0.25px solid #DA8D8D", background: "#FFEDED", padding: "0 14px", marginTop: "20px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.125 4.29167H6.13111M5.51389 6.125H6.125V8.56944H6.73611M0.625 6.125C0.625 6.84727 0.767262 7.56247 1.04366 8.22976C1.32006 8.89705 1.72519 9.50336 2.23591 10.0141C2.74663 10.5248 3.35295 10.9299 4.02024 11.2063C4.68753 11.4827 5.40273 11.625 6.125 11.625C6.84727 11.625 7.56247 11.4827 8.22976 11.2063C8.89705 10.9299 9.50336 10.5248 10.0141 10.0141C10.5248 9.50336 10.9299 8.89705 11.2063 8.22976C11.4827 7.56247 11.625 6.84727 11.625 6.125C11.625 4.66631 11.0455 3.26736 10.0141 2.23591C8.98264 1.20446 7.58369 0.625 6.125 0.625C4.66631 0.625 3.26736 1.20446 2.23591 2.23591C1.20446 3.26736 0.625 4.66631 0.625 6.125Z" stroke="#B71C1C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#B71C1C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 800, lineHeight: "22px", letterSpacing: "0.88px" }}>SUBSCRIPTION EXPIRED</span>
          </div>

          <div style={{ width: "100%", maxWidth: "357px", borderRadius: "10px", border: "1px solid #949494", background: "#FFF5E5", padding: "16px 20px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "16px", marginTop: "20px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none" style={{ flexShrink: 0 }}>
              <path d="M17.7497 11.9817V18.4451M17.7497 23.2927H17.7657M15.1311 3.2418L2.16043 25.1109C1.89304 25.5785 1.75154 26.1086 1.75001 26.6486C1.74848 27.1885 1.88697 27.7195 2.1517 28.1886C2.41643 28.6578 2.79818 29.0488 3.25898 29.3227C3.71978 29.5966 4.24356 29.7439 4.77823 29.75H30.7227C31.2571 29.7438 31.7806 29.5964 32.2412 29.3226C32.7018 29.0487 33.0834 28.658 33.3481 28.1891C33.6128 27.7202 33.7513 27.1895 33.75 26.6497C33.7487 26.11 33.6075 25.58 33.3405 25.1125L20.3699 3.24018C20.097 2.78532 19.7125 2.40921 19.2537 2.14818C18.7949 1.88714 18.2771 1.75 17.7505 1.75C17.2238 1.75 16.7061 1.88714 16.2472 2.14818C15.7884 2.40921 15.4039 2.78532 15.1311 3.24018V3.2418Z" stroke="#D70000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ maxWidth: "259px", display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "20px", fontWeight: 600, lineHeight: "normal" }}>Your Yoga Plan{" "}</span>
              <span style={{ color: "#D70000", fontFamily: "Outfit", fontSize: "20px", fontWeight: 600, lineHeight: "normal", display: "block" }}>Expired on {expiredDateLabel}</span>
            </div>
          </div>

          <p style={{ color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 700, lineHeight: "normal", margin: "28px 0 25px" }}>Renew Now to Continue!</p>
        </div>

        <div style={{ marginTop: "-30px" }}>
          <PricingAndComparisonSection selectedPlanIdx={selectedPlanIdx} setSelectedPlanIdx={setSelectedPlanIdx} daysLeft={0} hideDaysLeft={true} />
        </div>
        <div style={{ height: "40px" }} />
      </div>
    );
  }

  // --- Detect ongoing users whose 14-day batch has elapsed ---
  const batchElapsed = batchOverNow;
  const show14DayCompleted = (studentData?.status === "14 day completed" || studentData?.status === "14DaysCompleted") || (isOngoingStatus && batchElapsed);

  // --- 14 Days Completed — self-contained with its own header + tab switcher, since the
  // student's status no longer qualifies them for Dashboard.tsx's outer tab chrome. ---
  if (show14DayCompleted && !isForceOnboardingPreview) {
    const referralLink = "healthyday.app/ref=ggtujev58";
    const shareLink = mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : referralLink;

    return (
      <div className="hd-page bg-background" style={{ fontFamily: "Outfit, sans-serif" }}>
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        <div style={{
          position: "relative",
          ...(completedTab === "journey" ? { backgroundImage: `url(${completedJourneyHeroBg})`, backgroundSize: "100% auto", backgroundPosition: "top center", backgroundRepeat: "no-repeat" } : {}),
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}>
            <FourteenDaysV2TabBar activeTab={completedTab} onChange={setCompletedTab} />
          </div>

          <div style={{ paddingTop: "68px" }}>
        {completedTab === "journey" ? (
          <FourteenDaysV2JourneyCompletedPage
            studentName={studentData?.name}
            language={studentData?.language}
            joinLink={sessionJoinLink || ""}
            onCertificateClick={() => setShowCertificateModal(true)}
          />
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px 0", gap: "12px" }}>
              <div style={{ width: "129px", height: "30px", borderRadius: "40px", border: "0.25px solid #DA8D8D", background: "#FFEDED", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ width: "11px", height: "11px", aspectRatio: "1/1" }}>
                  <path d="M6 4.16667H6.00611M5.38889 6H6V8.44444H6.61111M0.5 6C0.5 6.72227 0.642262 7.43747 0.918663 8.10476C1.19506 8.77205 1.60019 9.37836 2.11091 9.88909C2.62163 10.3998 3.22795 10.8049 3.89524 11.0813C4.56253 11.3577 5.27773 11.5 6 11.5C6.72227 11.5 7.43747 11.3577 8.10476 11.0813C8.77205 10.8049 9.37836 10.3998 9.88909 9.88909C10.3998 9.37836 10.8049 8.77205 11.0813 8.10476C11.3577 7.43747 11.5 6.72227 11.5 6C11.5 4.54131 10.9205 3.14236 9.88909 2.11091C8.85764 1.07946 7.45869 0.5 6 0.5C4.54131 0.5 3.14236 1.07946 2.11091 2.11091C1.07946 3.14236 0.5 4.54131 0.5 6Z" stroke="#B71C1C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: "#B71C1C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 800, lineHeight: "22px", letterSpacing: "0.88px" }}>TRIAL ENDED</span>
              </div>
              <p style={{ width: "308px", color: "#000", textAlign: "center", fontFamily: "Outfit", fontSize: "27px", fontWeight: 800, lineHeight: "normal", margin: 0 }}>
                Your <span style={{ color: "#D70000" }}>14-Days FREE</span> Classes are completed
              </p>
              <p style={{ width: "293px", color: "#7C7B7B", textAlign: "center", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, lineHeight: "18px", margin: 0 }}>
                Join Healthyday Daily Yoga Classes with most affordable Subscription Plans
              </p>
            </div>

            <PricingAndComparisonSection selectedPlanIdx={selectedPlanIdx} setSelectedPlanIdx={setSelectedPlanIdx} daysLeft={0} hideDaysLeft={true} useOngoingPricing={true} />
            <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
              <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
              <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
            </div>
            <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
              <ReferWinCard showTitle={true} shareLink={referralLink} referralsUrl={`/${mobile || ""}/referrals`} />
            </div>
          </>
        )}
          </div>
        </div>
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          initialName={studentData?.name}
          mobile={mobile || studentData?.mobile}
          daysAttended={14}
          programDays={14}
          />
      </div>
    );
  }

  // --- Onboarding Section: status="registered", batch not yet active or join link not set ---
  if (!authenticated) return null;

  // Own header here — Dashboard.tsx only wraps this component in its tab chrome once the
  // batch has actually started, so a "registered but not-yet-started" student always
  // reaches this branch standalone (no tabs), matching the original 14-day onboarding screen.
  // Extracted to its own lazy-loaded module (src/pages/IndexOnboarding.tsx) so this screen's
  // assets (video thumbnails, intro-session images) aren't part of the bundle for the much
  // more common "batch already active" path — see docs.local/leaderboard_contest_plan.md.
  return (
    <Suspense fallback={<div className="hd-page bg-white" />}>
      <IndexOnboarding
        mobile={mobile}
        studentData={studentData}
        studentStatus={studentStatus}
        isForceOnboardingPreview={isForceOnboardingPreview}
        globalTimeParam={_globalTimeParam}
      />
    </Suspense>
  );
};

export default IndexFourteenDaysV2;
