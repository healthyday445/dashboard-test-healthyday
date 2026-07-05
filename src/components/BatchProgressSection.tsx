import { AttendanceGrid, DayStatus } from "@/components/AttendanceGrid";
import { ReferralRewardsCard } from "@/components/ReferralRewardsCard";
import { ReferAndWinTeaser } from "@/components/ReferAndWinTeaser";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import ReferWinCard from "@/components/ReferWinCard";

interface BatchProgressSectionProps {
  dayStatus: DayStatus[];
  dateRangeLabel: string;
  week: 1 | 2;
  currentDay: number;
  totalReferralCount: number;
  language?: string;
  selectedPlanIdx: number;
  setSelectedPlanIdx: (idx: number) => void;
  shareLink: string;
  referralsUrl: string;
}

/**
 * Attendance grid + the week-specific upsell block below it.
 * Week 1: referral milestone progress + a teaser linking to the referrals page.
 * Week 2: paid-plan pricing/comparison, then the classic Refer & Win card.
 */
export const BatchProgressSection: React.FC<BatchProgressSectionProps> = ({
  dayStatus,
  dateRangeLabel,
  week,
  currentDay,
  totalReferralCount,
  language,
  selectedPlanIdx,
  setSelectedPlanIdx,
  shareLink,
  referralsUrl,
}) => (
  <>
    <AttendanceGrid dayStatus={dayStatus} dateRangeLabel={dateRangeLabel} />

    {week === 1 ? (
      <>
        <div style={{ padding: "28px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>Your Referral Rewards</h3>
            <a href={referralsUrl} style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#FEAB27", textDecoration: "none" }}>View More</a>
          </div>
          <ReferralRewardsCard verifiedRefs={totalReferralCount} language={language} />
        </div>
        <ReferAndWinTeaser referralsUrl={referralsUrl} />
      </>
    ) : (
      <>
        <PricingAndComparisonSection
          selectedPlanIdx={selectedPlanIdx}
          setSelectedPlanIdx={setSelectedPlanIdx}
          daysLeft={Math.max(0, 15 - currentDay)}
        />
        <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
          <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
          <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
        </div>
        <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "center" }}>
          <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={referralsUrl} />
        </div>
      </>
    )}
  </>
);
