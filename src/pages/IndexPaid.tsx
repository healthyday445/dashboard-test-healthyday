import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import imgIngredients from "@/assets/Ingredients.png";
import { getCurrentMinutesIST } from "@/lib/utils";
import { getActivePaidBonusSession, isRegularSessionLive } from "@/lib/paidBonusSessions";
import { getPlanRenewalInfo } from "@/lib/planRenewal";
import { getWeeklyAttendance } from "@/lib/weeklyAttendance";
import { PaidBonusSessionCard } from "@/components/PaidBonusSessionCard";
import { PaidLiveSessionCard } from "@/components/PaidLiveSessionCard";
import { PaidActionCard } from "@/components/PaidActionCard";
import { WeeklyAttendanceCard } from "@/components/WeeklyAttendanceCard";
import { PlanRenewalSection } from "@/components/PlanRenewalSection";
import { ReferralRewardsCard } from "@/components/ReferralRewardsCard";
import ReferWinCard from "@/components/ReferWinCard";

interface IndexPaidProps {
  studentData: any;
  sessionLinks: any[];
  mobile?: string;
  selectedPlanIdx: number;
  setSelectedPlanIdx: (idx: number) => void;
}

/** Paid member dashboard — subscription-gated live sessions, bonus sessions, weekly attendance, plan renewal upsell. */
const IndexPaid: React.FC<IndexPaidProps> = ({ studentData, sessionLinks, mobile, selectedPlanIdx, setSelectedPlanIdx }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sessionJoinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link;
  const referralLink = studentData?.referral_link ?? "healthyday.app/ref=ggtujev58";
  const shareLink = mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : referralLink;
  const referralsUrl = `/${mobile || ""}/referrals`;

  // Session live detection (IST). forcePaidDay is its own param (not forceDay) since
  // forceDay=0 is reserved on the free-batch page to force the onboarding-preview
  // screen — reusing it here would make that check misfire for paid students too.
  const totalMin = getCurrentMinutesIST(searchParams.get("time"));
  const forcePaidDay = searchParams.get("forcePaidDay");
  const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  const currentDow = forcePaidDay !== null ? parseInt(forcePaidDay, 10) : nowIST.getUTCDay(); // 0 is Sunday

  // Subscription plan duration check
  const activeSub = studentData?.subscriptions?.find((s: any) => s.subscription_status === "active" || s.subscription_status === "ongoing") || studentData?.subscriptions?.[0];
  const planType = activeSub?.plan_type || studentData?.current_plan || studentData?.plan_type;
  const is6Month = planType === "6_months" || planType === "6_months_upgrade";
  const is12Month = planType === "12_months" || planType === "12_months_upgrade";
  const paidLang: "Telugu" | "English" = studentData?.language === "English" ? "English" : "Telugu";
  const langKey = paidLang.toLowerCase();

  // Resolve session link from API: pick morning (< 15:30 IST) or evening (≥ 15:30 IST)
  // Morning updates at 4:30 AM, Evening updates at 3:30 PM
  const sessionCodeForNow: "daily_morning" | "daily_evening" = totalMin < (15 * 60 + 30) ? "daily_morning" : "daily_evening";
  const apiSessionEntry = sessionLinks.find((s: any) => s.session_code === sessionCodeForNow && s.language === langKey) || null;
  const paidJoinLink = apiSessionEntry?.link || studentData?.paid_classes_joining_link || studentData?.classes_joining_link || sessionJoinLink || "https://www.youtube.com/c/Healthyday";
  const apiSessionName = apiSessionEntry?.session_name || null;

  const ytMatch = paidJoinLink.match(/(?:v=|youtu\.be\/|\/live\/)([a-zA-Z0-9_-]{11})/);
  const sessionVideoId = ytMatch ? ytMatch[1] : null;
  const sessionThumbnail = sessionVideoId
    ? `https://img.youtube.com/vi/${sessionVideoId}/hqdefault.jpg`
    : `/language%20${studentData?.language === "English" ? "English" : "Telugu"}.jpg`;

  // Face Yoga alternates Telugu/English by week, anchored to April 5, 2026
  const anchorDate = new Date(Date.UTC(2026, 3, 5));
  const diffWeeks = Math.floor((nowIST.getTime() - anchorDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const isTeluguFaceYogaWeek = diffWeeks % 2 === 0;

  const activeBonusCard = getActivePaidBonusSession({ is6Month, is12Month, paidLang, currentDow, totalMin, sessionLinks, isTeluguFaceYogaWeek });
  const isLive = isRegularSessionLive(totalMin);

  const { daysUntilPlanEnds, showPlanRenewal } = getPlanRenewalInfo(studentData);
  const { weekLabel, weekStatus } = getWeeklyAttendance(studentData);

  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {activeBonusCard ? (
        <PaidBonusSessionCard bonusCard={activeBonusCard} totalMin={totalMin} mobile={mobile} />
      ) : (
        <PaidLiveSessionCard
          isLive={isLive}
          totalMin={totalMin}
          sessionThumbnail={sessionThumbnail}
          sessionVideoId={sessionVideoId}
          apiSessionName={apiSessionName}
          paidJoinLink={paidJoinLink}
          sessionCodeForNow={sessionCodeForNow}
          language={studentData?.language}
          mobile={mobile}
        />
      )}

      <div style={{ padding: "20px 21px 0 22px" }}>
        <PaidActionCard
          onClick={() => navigate(`/${mobile || ""}/recordings`)}
          background="#FFF5E5"
          title="View Class Recordings"
          subtitle="Click here to see Yoga Class at anytime"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="22" fill="#FEAB27" opacity="0.15" />
              <path d="M18 16V28L30 22L18 16Z" fill="#FEAB27" />
            </svg>
          }
        />
      </div>

      {is12Month && (
        <div style={{ padding: "12px 21px 0 22px" }}>
          <PaidActionCard
            onClick={() => window.open("https://dailyyogawithjagan.com/grocery-list", "_blank")}
            background="#EAFFE5"
            title="This Week's Grocery List"
            subtitle="Nutrition plan for the week"
            icon={
              <div style={{ width: "44px", height: "44px", borderRadius: "6px", border: "0.25px solid #BCBCBC", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={imgIngredients} alt="Ingredients" style={{ width: "24px", height: "24px", aspectRatio: "1/1", objectFit: "contain" }} />
              </div>
            }
          />
        </div>
      )}

      <WeeklyAttendanceCard weekLabel={weekLabel} weekStatus={weekStatus} viewProgressUrl={`/${mobile || ""}/attendance`} />

      <div style={{ padding: "28px 22px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, color: "#202020" }}>Your Referral Rewards</h3>
          <a href={referralsUrl} style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#FEAB27", textDecoration: "none" }}>View More</a>
        </div>
        <ReferralRewardsCard verifiedRefs={studentData?.total_referral_count ?? 0} language={studentData?.language} />
      </div>

      <div style={{ padding: "18px 22px 0" }}>
        <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={referralsUrl} />
      </div>

      {showPlanRenewal && daysUntilPlanEnds !== null && (
        <PlanRenewalSection
          daysUntilPlanEnds={daysUntilPlanEnds}
          selectedPlanIdx={selectedPlanIdx}
          setSelectedPlanIdx={setSelectedPlanIdx}
          shareLink={shareLink}
          referralsUrl={referralsUrl}
        />
      )}
    </div>
  );
};

export default IndexPaid;
