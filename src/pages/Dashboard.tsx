import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import week1JourneyBg from "@/assets/21daysprogram/completed_journey_hero_bg.webp";
import week2JourneyBg from "@/assets/21daysprogram/journey_hero_bg.webp";
import HeroBannerWithTabs from "@/components/HeroBannerWithTabs";
import { FourteenDaysV2TabBar } from "@/components/FourteenDaysV2TabBar";
import { WeekTwoCountdownBanner } from "@/components/WeekTwoCountdownBanner";
import { YogaJourneyCompletedPage } from "@/components/YogaJourneyCompletedPage";
import { CertificateModal } from "@/components/CertificateModal";
import IndexFourteenDays from "@/pages/IndexFourteenDays";
import IndexFourteenDaysV2 from "@/pages/IndexFourteenDaysV2";
import IndexTwentyOneDay from "@/pages/IndexTwentyOneDay";
import TwentyOneDaysProgram from "@/pages/TwentyOneDaysProgram";
import FourteenDaysV2Program from "@/pages/FourteenDaysV2Program";
import { getEffectiveStatus } from "@/lib/studentStatus";
import { isFreeBatchOver, getSimulatedBatchDate } from "@/lib/utils";

// The one-off June-21-2026 cohort runs the special 21-day (22-day) programme;
// the one-off July-6-2026 cohort keeps the original 14-day (no-tabs) experience;
// every free batch from July-13-2026 onward (every following Monday) gets the
// new tabbed 14-day-v2 experience.
export const FREE_BATCH_DATE = "2026-06-21";
const FREE_BATCH_DATE_OLD_14DAY = "2026-07-06";

const Dashboard = () => {
  const { mobile: pathMobile } = useParams<{ mobile: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryMobile = searchParams.get("mobile");
  const mobile = pathMobile || queryMobile || undefined;
  const previewLevels = searchParams.get("preview_levels");
  const previewDashboard = searchParams.get("preview_dashboard");
  // preview_dashboard alone can't tell us the programme type (no real studentData to
  // read free_batch_start_date from) — preview_programme=21day forces IndexTwentyOneDay.
  const previewProgramme = searchParams.get("preview_programme");
  const forceDayParam = searchParams.get("forceDay");
  const timeParam = searchParams.get("time");
  const tabParam = searchParams.get("tab");
  const startOnJourney = previewLevels !== null || tabParam === "journey" || location.hash === "#journey";

  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(!previewDashboard && previewLevels === null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "journey">(startOnJourney ? "journey" : "dashboard");
  const [journeyMounted, setJourneyMounted] = useState(startOnJourney);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    // A preview param means we want canned data, not whatever real account
    // happens to live at this mobile number — skip the real fetch so the tab
    // chrome/eligibility isn't decided by unrelated real account state.
    if (previewDashboard || previewLevels !== null) {
      setLoading(false);
      return;
    }
    if (!mobile) {
      setLoading(false);
      return;
    }
    const cleanedMobile = mobile.replace(/[-\s()+]/g, "");
    if (!/^\d{7,15}$/.test(cleanedMobile)) {
      setLoading(false);
      return;
    }
    const apiMobile = `+${cleanedMobile}`;
    const encodedMobile = encodeURIComponent(apiMobile);
    fetch(`/.netlify/functions/student?mobile=${encodedMobile}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setStudentData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mobile, previewDashboard, previewLevels]);

  const handleTabChange = (tab: "dashboard" | "journey") => {
    if (tab === "journey") setJourneyMounted(true);
    setActiveTab(tab);
  };

  // Show a loading screen while we determine which experience to show
  if (loading) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div style={{
          width: "48px", height: "48px",
          border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Raw backend status — true only for students who have genuinely already purchased a
  // plan, even if it hasn't started yet. Checked before the free-batch cohort variables
  // below since an already-paid student always gets the v2 tabs, regardless of which
  // free-batch cohort they originally joined.
  const alreadyPaid = studentData?.status === "paid";

  // Batch type is the next thing we check: it decides which Live Sessions component a
  // still-free student gets. The 21-day/22-day June-21-2026 cohort uses the dedicated
  // IndexTwentyOneDay copy; the one-off July-6-2026 batch keeps the original IndexFourteenDays
  // (no tabs); every other batch (July-13-2026 onward) gets the new tabbed IndexFourteenDaysV2.
  const is21DayBatch =
    previewProgramme === "21day" ||
    studentData?.free_batch_start_date === FREE_BATCH_DATE ||
    (forceDayParam !== null && parseInt(forceDayParam, 10) > 14);
  const isLegacyFourteenDayBatch = previewProgramme === "legacy14day" || studentData?.free_batch_start_date === FREE_BATCH_DATE_OLD_14DAY;
  const isNewFourteenDayBatch = !is21DayBatch && !isLegacyFourteenDayBatch;
  const LiveSessions = alreadyPaid ? IndexFourteenDaysV2 : is21DayBatch ? IndexTwentyOneDay : isLegacyFourteenDayBatch ? IndexFourteenDays : IndexFourteenDaysV2;
  const JourneyProgram = is21DayBatch ? TwentyOneDaysProgram : FourteenDaysV2Program;

  // The backend can report status:"paid" before the purchased plan actually starts
  // (e.g. a referral-reward/renewal subscription scheduled for later) while the student
  // is still inside their free-batch window — treat them as ongoing-free until then.
  const effectiveStatus = getEffectiveStatus(studentData, { forceDay: forceDayParam, timeOverride: timeParam });
  const effectiveStudentData = studentData && effectiveStatus !== studentData?.status
    ? { ...studentData, status: effectiveStatus }
    : studentData;

  // Whether a new-format 14-day batch has actually started yet — a "registered" student
  // whose batch start date is still in the future should see the plain not-started
  // onboarding screen (no tabs), not the ongoing tab chrome. forceDay=0 previews that same
  // not-started state everywhere else, so it's treated the same way here; any other
  // forceDay value simulates an active batch day.
  const newBatchHasStarted = (() => {
    if (!isNewFourteenDayBatch) return false;
    if (forceDayParam !== null) return forceDayParam !== "0";
    if (!studentData?.free_batch_start_date) return false;
    const batchStart = new Date(studentData.free_batch_start_date);
    batchStart.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime() >= batchStart.getTime();
  })();

  // Determine if this student gets the journey tab: must be in the June-21-2026 free batch
  // or an already-started new-format (July-13-2026+) 14-day batch, AND not paid/pastdue/completed.
  const isOngoingFreeStatus = effectiveStatus === "registered" || effectiveStatus === "14DaysOngoing" || effectiveStatus === "14daysongoing";
  const isEligibleForJourneyTab =
    previewLevels !== null ||
    (is21DayBatch && isOngoingFreeStatus) ||
    (isNewFourteenDayBatch && isOngoingFreeStatus && newBatchHasStarted);

  // Not eligible for journey tab → render the Live Sessions component standalone (it owns its own layout)
  if (!isEligibleForJourneyTab) {
    return <LiveSessions initialStudentData={effectiveStudentData} />;
  }

  // For the new 14-day-v2 batch's ongoing week, derive which week (1 or 2) the student is
  // in — mirrors the day-math IndexFourteenDaysV2/IndexFourteenDays already do internally —
  // so the Week-2 countdown banner can render above the tab bar, matching Figma's layout.
  const newBatchWeek = (() => {
    if (!isNewFourteenDayBatch || !studentData?.free_batch_start_date) return null;
    const batchStart = new Date(studentData.free_batch_start_date);
    batchStart.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - batchStart.getTime()) / 86400000);
    const currentDay = forceDayParam !== null ? parseInt(forceDayParam, 10) : diffDays + 1;
    if (currentDay < 1 || currentDay > 14) return null;
    return { currentDay, week: currentDay <= 7 ? 1 : (2 as 1 | 2) };
  })();

  // forceDay previews a specific batch day everywhere else (Live Sessions tab,
  // Journey tab) — the banner's "days left" countdown needs to follow it too,
  // instead of always reading the real calendar date.
  const daysLeftOverride = (() => {
    if (forceDayParam === null) return undefined;
    if (!studentData?.free_batch_start_date || !studentData?.free_batch_end_date) return undefined;
    const batchStart = new Date(studentData.free_batch_start_date);
    batchStart.setHours(0, 0, 0, 0);
    const batchEnd = new Date(studentData.free_batch_end_date);
    batchEnd.setHours(0, 0, 0, 0);
    const simulatedToday = new Date(batchStart);
    simulatedToday.setDate(batchStart.getDate() + (parseInt(forceDayParam, 10) - 1));
    return Math.max(0, Math.ceil((batchEnd.getTime() - simulatedToday.getTime()) / 86400000));
  })();

  // 21-day cohort: existing orange countdown-banner tab bar (HeroBannerWithTabs), unchanged.
  if (is21DayBatch) {
    // Once the batch is calendar-over (from 7:30 PM IST on day 21, or any time day 22+ —
    // same rule IndexTwentyOneDay's own Live Sessions tab already uses), the journey tab
    // shows the same completed-state view as the 14DaysCompleted status, even if the
    // backend status field hasn't flipped over yet.
    const batchOverNow = forceDayParam !== null && studentData?.free_batch_start_date
      ? isFreeBatchOver(studentData.free_batch_end_date, {
          today: getSimulatedBatchDate(studentData.free_batch_start_date, parseInt(forceDayParam, 10)),
          timeOverride: timeParam,
        })
      : isFreeBatchOver(studentData?.free_batch_end_date);
    const sessionJoinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link;

    return (
      <div className="hd-page" style={{ fontFamily: "Outfit, sans-serif" }}>
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        <HeroBannerWithTabs
          batchEndDate={studentData?.free_batch_end_date}
          daysLeftOverride={daysLeftOverride}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          alreadyPaid={alreadyPaid}
        />

        <div style={{ display: activeTab === "dashboard" ? "block" : "none" }}>
          <LiveSessions initialStudentData={effectiveStudentData} onSwitchToJourney={() => handleTabChange("journey")} />
        </div>
        {journeyMounted && (
          <div style={{
            display: activeTab === "journey" ? "block" : "none",
            ...(batchOverNow ? { backgroundImage: `url(${week1JourneyBg})`, backgroundSize: "100% auto", backgroundPosition: "top center", backgroundRepeat: "no-repeat" } : {}),
          }}>
            <YogaJourneyCompletedPage
              studentName={studentData?.name}
              language={studentData?.language}
              joinLink={sessionJoinLink || ""}
              onCertificateClick={() => setShowCertificateModal(true)}
            />
          </div>
        )}
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          initialName={studentData?.name}
          mobile={mobile || studentData?.mobile}
          daysAttended={21}
          programDays={21}
          />
      </div>
    );
  }

  // New-format 14-day-v2 batch: plain pill tab bar, with the Week-2 countdown banner above
  // it when applicable.
  //
  // Week-1 (no countdown banner): tabs + content share one background wrapper, matching
  // Figma's ongoing-journey frame — its decorative image is tall enough (498px) to
  // intentionally bleed from behind the tabs into the margins around the badge card below,
  // and being a background-image (not a gradient) it naturally stops there instead of
  // stretching to cover the rest of the (much taller) page.
  //
  // Week-2: Figma's own "BG" layer for this state is a fixed 210px tall — it covers only
  // the countdown banner + tab bar, stopping right at the tab bar's bottom edge; the content
  // below has its own unrelated background. A CSS gradient (used for the Live tab) has no
  // natural height and WOULD stretch to cover an entire tabs+content wrapper, so Week-2 gets
  // its own dedicated, correctly-bounded wrapper containing only the banner + tab bar.
  const isJourneyTabActive = activeTab === "journey";
  const isWeek2 = newBatchWeek?.week === 2;

  const tabBar = (
    <FourteenDaysV2TabBar
      activeTab={activeTab === "dashboard" ? "live" : "journey"}
      onChange={(tab) => handleTabChange(tab === "live" ? "dashboard" : "journey")}
      blendWithParentBackground={isWeek2}
    />
  );

  const content = (
    <>
      <div style={{ display: activeTab === "dashboard" ? "block" : "none" }}>
        <LiveSessions initialStudentData={effectiveStudentData} onSwitchToJourney={() => handleTabChange("journey")} />
      </div>
      {journeyMounted && (
        <div style={{ display: activeTab === "journey" ? "block" : "none" }}>
          <JourneyProgram initialStudentData={effectiveStudentData} />
        </div>
      )}
    </>
  );

  return (
    <div className="hd-page" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {isWeek2 ? (
        <>
          <div style={{
            position: "relative",
            ...(isJourneyTabActive
              ? { backgroundImage: `url(${week2JourneyBg})`, backgroundSize: "100% 100%", backgroundPosition: "top center", backgroundRepeat: "no-repeat" }
              : { background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 226, 192) 25.005%, rgb(255, 226, 192) 50.01%, rgb(255, 148, 22) 100%)" }),
          }}>
            <WeekTwoCountdownBanner daysLeft={Math.max(0, 14 - newBatchWeek.currentDay)} showBackground={false} />
            <div style={{ marginTop: "-30px" }}>
              {tabBar}
            </div>
          </div>
          {content}
        </>
      ) : (
        <div style={{
          position: "relative",
          ...(isJourneyTabActive ? { backgroundImage: `url(${week1JourneyBg})`, backgroundSize: "100% auto", backgroundPosition: "top center", backgroundRepeat: "no-repeat" } : {}),
        }}>
          {tabBar}
          {content}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
