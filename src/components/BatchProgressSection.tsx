import { Link } from "react-router-dom";
import { AttendanceGrid, DayStatus } from "@/components/AttendanceGrid";
import { ReferralRewardsCard } from "@/components/ReferralRewardsCard";
import { ReferAndWinTeaser } from "@/components/ReferAndWinTeaser";
import ReferWinCard from "@/components/ReferWinCard";

interface BatchProgressSectionProps {
  dayStatus: DayStatus[];
  dateRangeLabel: string;
  week: 1 | 2;
  verifiedReferralCount: number;
  language?: string;
  shareLink: string;
  referralsUrl: string;
}

/**
 * Attendance grid + the week-specific upsell block below it.
 * Week 1: referral milestone progress + a teaser linking to the referrals page.
 * Week 2: "Want More FREE Classes?" + the classic Refer & Win card (pricing lives on /pricing, linked from WeekTwoCountdownBanner).
 */
export const BatchProgressSection: React.FC<BatchProgressSectionProps> = ({
  dayStatus,
  dateRangeLabel,
  week,
  verifiedReferralCount,
  language,
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
            <Link to={referralsUrl} style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#FEAB27", textDecoration: "none" }}>View More</Link>
          </div>
          <ReferralRewardsCard verifiedRefs={verifiedReferralCount} language={language} />
        </div>
        <ReferAndWinTeaser referralsUrl={referralsUrl} />
      </>
    ) : (
      <>
        <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
          <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
        </div>
        <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "center" }}>
          <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={referralsUrl} />
        </div>
      </>
    )}
  </>
);
