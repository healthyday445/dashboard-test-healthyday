import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import { ShareReferralActions } from "@/components/ShareReferralActions";

interface PlanRenewalSectionProps {
  daysUntilPlanEnds: number;
  selectedPlanIdx: number;
  setSelectedPlanIdx: (idx: number) => void;
  shareLink: string;
  referralsUrl: string;
}

/** Renewal upsell shown to paid students starting 7 days before their plan ends. */
export const PlanRenewalSection: React.FC<PlanRenewalSectionProps> = ({ daysUntilPlanEnds, selectedPlanIdx, setSelectedPlanIdx, shareLink, referralsUrl }) => (
  <>
    <div style={{ padding: "15px 20px", textAlign: "center" }}>
      <p style={{
        width: "100%", maxWidth: "343px", color: "#F00", textAlign: "center",
        fontFamily: "Outfit", fontSize: "24px", fontWeight: 700, lineHeight: "normal", margin: "0 auto 12px",
      }}>
        Your Plan ends in {daysUntilPlanEnds} {daysUntilPlanEnds === 1 ? "Day" : "Days"}
      </p>
      <p style={{
        width: "221px", color: "#0D468B", textAlign: "center",
        fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal", margin: "0 auto 0",
      }}>
        RENEW NOW!
      </p>
    </div>

    <PricingAndComparisonSection
      selectedPlanIdx={selectedPlanIdx}
      setSelectedPlanIdx={setSelectedPlanIdx}
      daysLeft={daysUntilPlanEnds}
      hideDaysLeft={true}
    />

    <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
      <div style={{ width: "100%", maxWidth: "358px", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
      <p style={{
        width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center",
        fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal",
      }}>
        Want More FREE Classes?
      </p>
    </div>

    <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%", maxWidth: "358px", boxSizing: "border-box", borderRadius: "16px",
        background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px",
      }}>
        <ShareReferralActions shareLink={shareLink} referralsUrl={referralsUrl} />
      </div>
    </div>
  </>
);
