import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import DashboardTabBar from "@/components/DashboardTabBar";
import Index from "@/pages/Index";
import TwentyOneDaysProgram from "@/pages/TwentyOneDaysProgram";

// Only students in this specific free batch get the journey tab
const FREE_BATCH_DATE = "2026-06-21";

const Dashboard = () => {
  const { mobile: pathMobile } = useParams<{ mobile: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryMobile = searchParams.get("mobile");
  const mobile = pathMobile || queryMobile || undefined;
  const previewLevels = searchParams.get("preview_levels");

  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "journey">(previewLevels !== null ? "journey" : "dashboard");
  const [journeyMounted, setJourneyMounted] = useState(previewLevels !== null);

  useEffect(() => {
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
  }, [mobile]);

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

  // Determine if this student gets the journey tab:
  // must be in the June-21-2026 free batch AND not paid/pastdue
  const status = studentData?.status;
  const isEligibleForJourneyTab =
    previewLevels !== null ||
    (studentData?.free_batch_start_date === FREE_BATCH_DATE &&
      (status === "registered" || status === "14DaysOngoing" || status === "14daysongoing"));

  // Not eligible for journey tab → render Index standalone (Index owns its own layout)
  if (!isEligibleForJourneyTab) {
    return <Index initialStudentData={studentData} />;
  }

  // June-21-2026 free batch student → show the tab experience
  return (
    <div className="hd-page" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      <div style={{ position: "relative" }}>
        {/* Layer 1: blue tab bar background */}
        <div style={{ height: 68, background: "#E2EFFF" }} />

        {/* Layer 2: content — each view's own spacer holds its Subtract shape */}
        <div style={{ marginTop: "-68px", position: "relative", zIndex: 5 }}>
          <div style={{ display: activeTab === "dashboard" ? "block" : "none" }}>
            <Index initialStudentData={studentData} onSwitchToJourney={() => handleTabChange("journey")} />
          </div>
          {journeyMounted && (
            <div style={{ display: activeTab === "journey" ? "block" : "none" }}>
              <TwentyOneDaysProgram initialStudentData={studentData} />
            </div>
          )}
        </div>

        {/* Layer 3: tab labels float above the content */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 68, zIndex: 10 }}>
          <DashboardTabBar active={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
