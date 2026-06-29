import { useState } from "react";
import logo from "@/assets/Primary_logo.svg";
import HeaderDaysLeft from "@/components/HeaderDaysLeft";
import DashboardTabBar from "@/components/DashboardTabBar";
import Index from "@/pages/Index";
import TwentyOneDaysProgram from "@/pages/TwentyOneDaysProgram";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "journey">("dashboard");
  const [journeyMounted, setJourneyMounted] = useState(false);

  const handleTabChange = (tab: "dashboard" | "journey") => {
    if (tab === "journey") setJourneyMounted(true);
    setActiveTab(tab);
  };

  const june30 = new Date(2026, 5, 30);
  june30.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilJune30 = Math.max(0, Math.ceil((june30.getTime() - today.getTime()) / 86400000));

  return (
    <div className="hd-page" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
        <HeaderDaysLeft daysLeft={daysUntilJune30} />
      </header>

      <div style={{ position: "relative" }}>
        {/* Layer 1: blueish tab bar background */}
        <div style={{ height: 68, background: "#E2EFFF" }} />

        {/* Layer 2: view content — each view's 68px spacer holds its own Subtract */}
        <div style={{ marginTop: "-68px", position: "relative", zIndex: 5 }}>
          <div style={{ display: activeTab === "dashboard" ? "block" : "none" }}>
            <Index />
          </div>
          {journeyMounted && (
            <div style={{ display: activeTab === "journey" ? "block" : "none" }}>
              <TwentyOneDaysProgram />
            </div>
          )}
        </div>

        {/* Layer 3: tab labels and click areas — float above the Subtract */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 68, zIndex: 10 }}>
          <DashboardTabBar active={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
