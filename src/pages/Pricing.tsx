import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";

// Dedicated pricing/plans page for the 21-day batch — linked from the
// "Join Daily Yoga Classes" button in HeroBannerWithTabs, and from anywhere
// else in the 21-day experience that wants to send a student to upgrade.
const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

  return (
    <div
      className="mx-auto min-h-screen bg-white"
      style={{ fontFamily: "Outfit, sans-serif", maxWidth: "412px", width: "100%" }}
    >
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 20px 0" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M1 8H19M1 8L8 15M1 8L8 1" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, color: "#202020" }}>
          Pricing Plans
        </span>
      </div>

      <div style={{ padding: "20px 20px 0", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, color: "#0D468B", lineHeight: "normal" }}>
          Most affordable Subscription Plans
        </p>
        <p style={{ margin: "4px 0 0", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, color: "#0D468B", lineHeight: "normal" }}>
          JOIN DAILY CLASSES
        </p>
      </div>

      <PricingAndComparisonSection
        selectedPlanIdx={selectedPlanIdx}
        setSelectedPlanIdx={setSelectedPlanIdx}
        daysLeft={0}
        hideDaysLeft={true}
        useOngoingPricing={true}
      />

      <div style={{ height: "40px" }} />
    </div>
  );
};

export default Pricing;
