import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import dietMealIcon from "@/assets/diet/icons/meal.webp";
import imgLanguageEnglish from "@/assets/language_English.webp";
import imgLanguageTelugu from "@/assets/language_Telugu.webp";
import { getCurrentMinutesIST } from "@/lib/utils";
import { getActivePaidBonusSession, isRegularSessionLive } from "@/lib/paidBonusSessions";
import { getPlanRenewalInfo } from "@/lib/planRenewal";
import { getWeeklyAttendance } from "@/lib/weeklyAttendance";
import { getSnChallengeDay, isSnChallengeEligible, isSnLive, toIstIsoDateKey } from "@/data/snChallenge";
import { PaidBonusSessionCard } from "@/components/PaidBonusSessionCard";
import { PaidLiveSessionCard } from "@/components/PaidLiveSessionCard";
import { SnChallengeCard } from "@/components/SnChallengeCard";
import { SnChallengeWarningBanner } from "@/components/SnChallengeWarningBanner";
import { SnChallengeRegularSessionCard } from "@/components/SnChallengeRegularSessionCard";
import { PaidActionCard } from "@/components/PaidActionCard";
import { WeeklyAttendanceCard } from "@/components/WeeklyAttendanceCard";
import { PlanRenewalSection } from "@/components/PlanRenewalSection";
import { ReferralRewardsCard } from "@/components/ReferralRewardsCard";
import ReferWinCard from "@/components/ReferWinCard";

interface IndexPaidProps {
  studentData: any;
  sessionLinks: any[];
  sessionLinksLoaded?: boolean;
  mobile?: string;
  selectedPlanIdx: number;
  setSelectedPlanIdx: (idx: number) => void;
  verifiedReferralCount: number;
}

/** Paid member dashboard — subscription-gated live sessions, bonus sessions, weekly attendance, plan renewal upsell. */
const IndexPaid: React.FC<IndexPaidProps> = ({ studentData, sessionLinks, sessionLinksLoaded = true, mobile, selectedPlanIdx, setSelectedPlanIdx, verifiedReferralCount }) => {
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

  // Subscription plan duration check — current_plan is the backend's authoritative,
  // already-resolved field; deriving it from subscriptions[] instead is unreliable
  // because future ref_reward entries can also carry subscription_status "active"
  // and sort before the real current plan.
  const planType = studentData?.current_plan || studentData?.plan_type;
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
    : studentData?.language === "English" ? imgLanguageEnglish : imgLanguageTelugu;

  // Face Yoga alternates Telugu/English by week, anchored to April 5, 2026
  const anchorDate = new Date(Date.UTC(2026, 3, 5));
  const diffWeeks = Math.floor((nowIST.getTime() - anchorDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  const isTeluguFaceYogaWeek = diffWeeks % 2 === 0;

  const activeBonusCard = getActivePaidBonusSession({ is6Month, is12Month, paidLang, currentDow, totalMin, sessionLinks, isTeluguFaceYogaWeek });
  const isLive = isRegularSessionLive(totalMin);

  // 108 Surya Namaskar Challenge (2026-08-06..09, English + 6/12-month only) — temporary,
  // purely date-gated. `?previewSnDate=YYYY-MM-DD` is a QA-only override, distinct from
  // forcePaidDay/time/Diet's previewDate per this repo's per-feature-param convention (see
  // PREVIEWS.md) so it can't collide with those.
  const previewSnDate = searchParams.get("previewSnDate");
  const snDateKey = previewSnDate || toIstIsoDateKey(nowIST);
  const snDay = isSnChallengeEligible(studentData, is6Month, is12Month) ? getSnChallengeDay(snDateKey) : null;
  const snIsLive = isSnLive(totalMin);
  // Whenever some OTHER session (regular or bonus/diet) is actually live, but it's outside the
  // SN Challenge's own 4:30-9:29 AM window, that other session's old/unmodified card goes on top
  // and the SN card moves to the bottom (Figma nodes 1312:2971/1312:4008). Inside the SN window,
  // or whenever nothing at all is live, the SN card stays on top with its orange-wrapped
  // regular-session companion below (live or "no sessions", Figma nodes 1252:18631/1266:19194).
  const anySessionLive = isLive || !!activeBonusCard;
  const showSnAtBottom = !!snDay && !snIsLive && anySessionLive;

  const { daysUntilPlanEnds, showPlanRenewal } = getPlanRenewalInfo(studentData);
  const { weekLabel, weekStatus } = getWeeklyAttendance(studentData);

  const regularSessionCard = (
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
      isLoading={!sessionLinksLoaded}
    />
  );

  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {snDay ? (
        showSnAtBottom ? (
          // Figma nodes 1312:2971 (regular evening session) / 1312:4008 (bonus/diet session) —
          // the OTHER session's old, unmodified card goes first, no warning banner or orange
          // wrapper, then the SN card second with its "View Recording" (no icon) button.
          <>
            {activeBonusCard ? (
              <PaidBonusSessionCard bonusCard={activeBonusCard} totalMin={totalMin} mobile={mobile} isLoading={!sessionLinksLoaded} />
            ) : (
              regularSessionCard
            )}
            <SnChallengeCard day={snDay} isLive={snIsLive} mobile={mobile} showRecordingCta />
          </>
        ) : (
          // Figma nodes 1252:18631 (SN + regular both live, morning window) / 1266:19194 (SN +
          // "no sessions" regular, nothing live) — SN card on top, orange-wrapped regular-session
          // companion below either way (its own isLive prop picks the live/no-sessions sub-state).
          <>
            <SnChallengeCard day={snDay} isLive={snIsLive} mobile={mobile} />
            {/* A small mx here (kept deliberately smaller than the children's own mx-4/px-5
                inset) just gives the orange box itself a bit of breathing room from the page edge. */}
            <div className="mx-2 mt-4 rounded-[10px] border-[0.25px] border-[#FE961B] bg-[#FFEDD7] pb-3">
              <SnChallengeWarningBanner totalMin={totalMin} />
              <SnChallengeRegularSessionCard
                isLive={isLive}
                totalMin={totalMin}
                sessionThumbnail={sessionThumbnail}
                paidJoinLink={paidJoinLink}
                sessionCodeForNow={sessionCodeForNow}
                mobile={mobile}
              />
            </div>
          </>
        )
      ) : activeBonusCard ? (
        <PaidBonusSessionCard bonusCard={activeBonusCard} totalMin={totalMin} mobile={mobile} isLoading={!sessionLinksLoaded} />
      ) : (
        regularSessionCard
      )}

      <div style={{ padding: "20px 21px 0 22px" }}>
        {/* Blue "SN Integration" variant (Figma node 1252:18682) during the campaign window
            only — same PaidActionCard/icon geometry, just recolored blue instead of orange.
            Reverts automatically once snDay is null, same as the rest of this feature. */}
        <PaidActionCard
          onClick={() => navigate(`/${mobile || ""}/recordings`)}
          background={snDay ? "#DEEFFF" : "#FFF5E5"}
          accentColor={snDay ? "#598ECE" : undefined}
          title="View Class Recordings"
          subtitle="Click here to see Yoga Class at anytime"
          icon={
            <div style={{ width: "44px", height: "44px", borderRadius: "6px", border: "0.25px solid #BCBCBC", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="4" width="14" height="14" rx="1.5" fill={snDay ? "#598ECE" : "#FEAB27"} />
                <path d="M9 4V10L14 7L9 4Z" fill="white" />
                <line x1="1" y1="4" x2="1" y2="17" stroke={snDay ? "#598ECE" : "#FEAB27"} strokeWidth="2" strokeLinecap="round" />
                <line x1="13" y1="17" x2="1" y2="17" stroke={snDay ? "#598ECE" : "#FEAB27"} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          }
        />
      </div>

      {is12Month && (
        <div style={{ padding: "12px 21px 0 22px" }}>
          <PaidActionCard
            onClick={() => navigate(`/${mobile || ""}/diet`)}
            background="#EAFFE5"
            title="View DIET Routine"
            subtitle="Nutrition plan for the week"
            accentColor="#7BBC6B"
            icon={
              <div style={{ width: "44px", height: "44px", borderRadius: "6px", border: "0.25px solid #BCBCBC", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={dietMealIcon} alt="" style={{ width: "26px", height: "26px" }} />
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
        <ReferralRewardsCard verifiedRefs={verifiedReferralCount} language={studentData?.language} isPaid />
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
