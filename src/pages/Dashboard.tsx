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

      {/* Tab bar in flow with z-index so it renders above the content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <DashboardTabBar active={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Content pulled up by 68px — component's own bg fills the tab bar area */}
      <div style={{ display: activeTab === "dashboard" ? "block" : "none", marginTop: "-68px" }}>
        <Index />
      </div>
      {journeyMounted && (
        <div style={{ display: activeTab === "journey" ? "block" : "none", marginTop: "-68px" }}>
          <TwentyOneDaysProgram />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
