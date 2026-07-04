import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import HeroBannerWithTabs from "@/components/HeroBannerWithTabs";
import Index from "@/pages/Index";
import IndexTwentyOneDay from "@/pages/IndexTwentyOneDay";
import TwentyOneDaysProgram from "@/pages/TwentyOneDaysProgram";

// The one-off June-21-2026 cohort runs the special 21-day (22-day) programme;
// every other free batch is the standard 14-day general-public batch.
const FREE_BATCH_DATE = "2026-06-21";

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

  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(!previewDashboard && previewLevels === null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "journey">(previewLevels !== null ? "journey" : "dashboard");
  const [journeyMounted, setJourneyMounted] = useState(previewLevels !== null);

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

  // Batch type is the first thing we check: it decides which Live Sessions
  // component this student gets. 14-day general public uses Index; the
  // 21-day/22-day June-21-2026 cohort uses the dedicated IndexTwentyOneDay copy.
  const is21DayBatch = previewProgramme === "21day" || studentData?.free_batch_start_date === FREE_BATCH_DATE;
  const LiveSessions = is21DayBatch ? IndexTwentyOneDay : Index;

  // Determine if this student gets the journey tab:
  // must be in the June-21-2026 free batch AND not paid/pastdue
  const status = studentData?.status;
  const isEligibleForJourneyTab =
    previewLevels !== null ||
    (is21DayBatch &&
      (status === "registered" || status === "14DaysOngoing" || status === "14daysongoing"));

  // Not eligible for journey tab → render the Live Sessions component standalone (it owns its own layout)
  if (!isEligibleForJourneyTab) {
    return <LiveSessions initialStudentData={studentData} />;
  }

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

  // June-21-2026 free batch student → show the tab experience
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
      />

      <div style={{ display: activeTab === "dashboard" ? "block" : "none" }}>
        <LiveSessions initialStudentData={studentData} onSwitchToJourney={() => handleTabChange("journey")} />
      </div>
      {journeyMounted && (
        <div style={{ display: activeTab === "journey" ? "block" : "none" }}>
          <TwentyOneDaysProgram initialStudentData={studentData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
