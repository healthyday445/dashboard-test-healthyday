import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReferWinCard from "@/components/ReferWinCard";
import { useStudentData } from "@/hooks/use-student-data";
import logo from "@/assets/Primary_logo.svg";
import imgBannerBg from "@/assets/leaderboard/11621406ee6eb5f29bb80937e33d2195815c78d8.webp";
import imgMainPrize from "@/assets/leaderboard/0d0feb7c046d1e7737d4d7000c10d1cf68d8865c.webp";
import imgPrizeTier1 from "@/assets/leaderboard/03fe32d52d733d7264af16fa1a873079ffdb9919.webp";
import imgPrizeTier2 from "@/assets/leaderboard/a999ad5d053fb10e4399ce1c16a6647a5e72b054.webp";
import imgPrizeTier3 from "@/assets/leaderboard/a623655ba98def85f08fd93b110d719415c6fc2e.webp";
import imgShield from "@/assets/leaderboard/shield.webp";
import imgConfettiA from "@/assets/leaderboard/226805aeb355248ebac39e293e844975a3b6fada.webp";
import imgConfettiA1 from "@/assets/leaderboard/226805aeb355248ebac39e293e844975a3b6fada_1.webp";
import imgConfetti from "@/assets/leaderboard/confetti.webp";
import imgMedal from "@/assets/leaderboard/d8c04109d0b7e7d179eedceade5572244f039058.webp";
import imgStarSmall from "@/assets/leaderboard/eeef30852c9e8a5d9b0eedd75392aa12539c4ce5.webp";
import imgBlueArrow from "@/assets/blueArrow.svg";
import imgEllipse from "@/assets/leaderboard/ellipse.svg";
import imgLine from "@/assets/leaderboard/line.svg";
import imgTier1Illustration from "@/assets/leaderboard/tier1-illustration.webp";
import imgTier1Star from "@/assets/leaderboard/tier1-star.webp";
import imgTier2Illustration from "@/assets/leaderboard/tier2-illustration.webp";
import imgTier2Star from "@/assets/leaderboard/tier2-star.webp";
import imgTier3Illustration from "@/assets/leaderboard/tier3-illustration.webp";
import imgTier3Star from "@/assets/leaderboard/tier3-star.webp";
import imgTier4Illustration from "@/assets/leaderboard/tier4-illustration.webp";
import imgTier4Star from "@/assets/leaderboard/tier4-star.webp";
import imgYogaKit from "@/assets/leaderboard/yoga-kit-final.webp";
import imgSadEmoji from "@/assets/leaderboard/sad-emoji.png";
import imgPostCongratsCardBg from "@/assets/leaderboard/post-contest-congrats-bg.webp";
import imgPostProductImg from "@/assets/leaderboard/post-contest-product.webp";
import imgPostRankCardBg from "@/assets/leaderboard/post-contest-rank-bg.webp";
import imgPostInstructor from "@/assets/leaderboard/post-contest-instructor.webp";
import imgPostDietThumb from "@/assets/leaderboard/post-contest-diet-thumb.webp";
import imgPostCouponThumb from "@/assets/leaderboard/post-contest-coupon-thumb.webp";
import imgForward from "@/assets/leaderboard/Forward.png";
import imgTrophyBadgeBg from "@/assets/leaderboard/trophy-badge-bg.svg";
import imgTrophyIcon from "@/assets/leaderboard/trophy-icon.png";
import imgTrophyStar from "@/assets/leaderboard/trophy-star.png";
import imgPeopleBadgeBg from "@/assets/leaderboard/people-badge-bg.svg";
import imgPeopleIconGroup from "@/assets/leaderboard/people-icon-group.png";
import imgPeopleIconFront from "@/assets/leaderboard/people-icon-front.png";
import imgWinnersConfetti from "@/assets/leaderboard/winners-confetti.png";
import imgGiftIcon from "@/assets/leaderboard/gift-icon.png";
import imgDownloadIcon from "@/assets/referral/downloading-updates.png";

const CONTEST_START = "2026-06-01";
const CONTEST_END = "2026-06-30";
const isContestOver = new Date().toISOString().slice(0, 10) >= CONTEST_END;

interface LeaderboardEntry {
  rank: number;
  name: string;
  mobile: string;
  referral_count: number;
}

interface UserRank {
  rank: number;
  name: string;
  referral_count: number;
}

/* ────────────────────────────────────────────
   SVG Icons
   ──────────────────────────────────────────── */
const BackArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M8 21H16M12 17V21M6 3H18L17 10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10L6 3Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 4H4C3 4 2 5 2 6C2 7 3 9 5 9M18 4H20C21 4 22 5 22 6C22 7 21 9 19 9" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ────────────────────────────────────────────
   Prize Tier images (from /public/leaderboard/)
   ──────────────────────────────────────────── */
const PRIZE_IMAGES = {
  tier1: imgPrizeTier1,
  tier2: imgPrizeTier2,
  tier3: imgPrizeTier3,
};

const BANNER_BG = imgBannerBg;
const MAIN_PRIZE_IMG = imgMainPrize;

const ReferralNameNumber: React.FC<{ name: string; mobile: string }> = ({ name, mobile }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
    <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>
      {name}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#888"/>
      </svg>
      <span style={{ color: "#888", fontFamily: "Outfit", fontSize: "12px", fontWeight: 400 }}>
        {mobile}
      </span>
    </div>
  </div>
);

const PendingNote: React.FC<{ language?: string }> = ({ language }) => (
  <p style={{ margin: 0, color: "#FF3E3E", fontFamily: "Outfit", fontSize: "10px", fontWeight: 400, lineHeight: "1.4" }}>
    {language === "Telugu"
      ? "ఈ number 30th June లోపు వాళ్ళ registration WhatsApp Button Click చేసి Confirm చేసుకోలేదు. So contest లో eligible కాదు"
      : "This user neither verified their number nor attended any class. So, not eligible for the contest"}
  </p>
);

/* ────────────────────────────────────────────
   Leaderboard Page Component
   ──────────────────────────────────────────── */
const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { mobile: pathMobile } = useParams<{ mobile: string }>();
  const mobile = pathMobile || "";

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<UserRank | null>(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [rankLoading, setRankLoading] = useState(!!mobile);
  const [currentPage, setCurrentPage] = useState(1);
  const isFetchingRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [referralsData, setReferralsData] = useState<{ language?: string; total_referrals: number; referrals: { referred_mobile: string; referred_name: string; referral_confirmation_status: string }[] } | null>(null);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [userLanguage, setUserLanguage] = useState("");

  const closeDrawer = () => {
    setDrawerClosing(true);
    setTimeout(() => {
      setDrawerOpen(false);
      setDrawerClosing(false);
    }, 280);
  };

  const openReferralsDrawer = () => {
    setDrawerOpen(true);
    if (referralsData) return;
    setReferralsLoading(true);
    const e164 = `+${mobile.replace(/\D/g, "")}`;
    fetch(`/.netlify/functions/referrals?mobile=${encodeURIComponent(e164)}&start_date=${CONTEST_START}&end_date=${CONTEST_END}&include_contest=true`)
      .then((r) => r.json())
      .then((data) => setReferralsData(data))
      .catch(() => {})
      .finally(() => setReferralsLoading(false));
  };

  useEffect(() => {
    const controller = new AbortController();
    const page = currentPage;
    isFetchingRef.current = true;
    if (page === 1) {
      setLeaderboardLoading(true);
      setLeaderboard([]);
    }
    fetch(`/.netlify/functions/leaderboard?start_date=${CONTEST_START}&end_date=${CONTEST_END}&page_size=100&page=${page}&include_contest=true`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        const rows: LeaderboardEntry[] = data.leaderboard ?? [];
        setLeaderboard((prev) => page === 1 ? rows : [...prev, ...rows]);
      })
      .catch((e) => { if (e.name !== "AbortError") console.error(e); })
      .finally(() => { setLeaderboardLoading(false); isFetchingRef.current = false; });
    return () => controller.abort();
  }, [currentPage]);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || isFetchingRef.current || leaderboardLoading || currentPage >= 5) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    // 7 skeleton rows × (48px height + 8px gap) = ~392px — trigger when user enters skeleton zone
    if (remaining < 392) {
      isFetchingRef.current = true;
      setCurrentPage((p) => p + 1);
    }
  }, [leaderboardLoading, currentPage]);

  useEffect(() => {
    if (!mobile) { setRankLoading(false); return; }
    const e164 = `+${mobile.replace(/\D/g, "")}`;
    fetch(`/.netlify/functions/leaderboard-rank?mobile=${encodeURIComponent(e164)}&start_date=${CONTEST_START}&end_date=${CONTEST_END}&include_contest=true`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.detail?.status === "not_ranked") {
          setUserRank({ rank: 0, name: "", referral_count: 0 });
        } else {
          setUserRank(data);
        }
      })
      .catch(() => {})
      .finally(() => setRankLoading(false));
  }, [mobile]);

  const cleanedMobile = mobile ? mobile.replace(/\D/g, "") : "";
  const studentQuery = useStudentData(cleanedMobile, !!cleanedMobile);

  useEffect(() => {
    const data = studentQuery.data;
    if (!data) return;
    if (data?.status?.toLowerCase() === "paid") setIsPaidUser(true);
    if (data?.language) setUserLanguage(data.language);
  }, [studentQuery.data]);

  const shareLink = mobile
    ? `https://yoga.healthyday.co.in?ref=${mobile}`
    : "https://yoga.healthyday.co.in?ref=demo";
  const referralsUrl = mobile ? `/${mobile}/leaderboard` : "/leaderboard";

  return (
    <div
      className="hd-page"
      style={{
        fontFamily: "Outfit, sans-serif",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      {/* ═══════════════════════════════════════
          SITE HEADER — Back arrow + Healthyday logo
         ═══════════════════════════════════════ */}
      <header
        className="hd-header"
        style={{ background: "#FFF" }}
      >
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {/* ═══════════════════════════════════════
          SECTION TITLE
         ═══════════════════════════════════════ */}
      <div
        style={{
          width: "calc(100% - 32px)",
          padding: "16px 0 12px",
        }}
      >
        <span
          style={{
            color: "#202020",
            fontFamily: "Outfit",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          Yoga Day Referral Contest
        </span>
      </div>


      {/* ═══════════════════════════════════════
          LIVE CONTEST SECTIONS (hidden after contest ends)
         ═══════════════════════════════════════ */}
      {!isContestOver && (
        <>
          {/* BANNER CARD — Blue gradient with leaves bg */}
          <div
            style={{
              width: "calc(100% - 32px)",
              height: "145px",
              borderRadius: "12px",
              border: "1px solid #537AA8",
              backgroundImage: `url(${BANNER_BG})`,

              backgroundSize: "cover",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
              boxShadow:
                "0 -1px 8px 0 rgba(0,0,0,0.05), 0 1px 8px 0 rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Text side */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", zIndex: 1 }}>
              <span
                style={{
                  color: "#0D468B",
                  fontFamily: "Outfit",
                  fontSize: "30px",
                  fontStyle: "normal",
                  fontWeight: 800,
                  lineHeight: "normal",
                  whiteSpace: "nowrap",
                }}
              >
                TOP 500
              </span>
              <span
                style={{
                  color: "#FF9D00",
                  fontFamily: "Outfit",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 800,
                  lineHeight: "normal",
                }}
              >
                WINNERS
              </span>
              <span
                style={{
                  color: "#000",
                  fontFamily: "Outfit",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                  maxWidth: "125px",
                }}
              >
                Get Yoga Kit
              </span>
              <span
                style={{
                  color: "#000",
                  fontFamily: "Outfit",
                  fontSize: "8px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  maxWidth: "165px",
                }}
              >
                (Yoga Mat + T-Shirt + Water Bottle)
              </span>
            </div>

            {/* Prize image */}
            <div
              style={{
                width: "165px",
                height: "123px",
                aspectRatio: "55/41",
                backgroundImage: `url(${MAIN_PRIZE_IMG})`,

                backgroundSize: "180.19% 112.582%",
                backgroundPosition: "-132.189px -9.511px",
                backgroundRepeat: "no-repeat",
                flexShrink: 0,
              }}
            />
          </div>

          {/* DATE BAR — Contest dates */}
          <div
            style={{
              width: "calc(100% - 32px)",
              height: "30px",
              borderRadius: "5px",
              background: "#FFE8CD",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: "10px",
              gap: "16px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "10px", height: "100%", background: "#FF8C00", borderRadius: "2px", flexShrink: 0 }} />
            <span
              style={{
                color: "#505050",
                fontFamily: "Outfit",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              Referral Contest Dates :{" "}
              <span
                style={{
                  color: "#012755",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                From 1<sup style={{ fontSize: "7.74px" }}>st</sup> JUNE to 30<sup style={{ fontSize: "7.74px" }}>th</sup> JUNE
              </span>
            </span>
          </div>

          {/* PRIZE TIERS — 3 columns */}
          <div
            style={{
              width: "calc(100% - 32px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: "18px",
              padding: "0 10px",
              boxSizing: "border-box",
            }}
          >
            <PrizeTierCard
              image={PRIZE_IMAGES.tier1}
              label="Top 1 - 25"
              prizes="Yoga Mat + T Shirt + Water Bottle + Weight Scale + Towel"
            />
            <PrizeTierCard
              image={PRIZE_IMAGES.tier2}
              label="Top 25 - 100"
              prizes="Yoga Mat + T Shirt + Water Bottle + Towel"
            />
            <PrizeTierCard
              image={PRIZE_IMAGES.tier3}
              label="Top 100 - 500"
              prizes="Yoga Mat + T Shirt + Water Bottle"
            />
          </div>

          {/* RANK CARD + REFER & WIN + VIEW REFERRALS */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ order: userRank?.referral_count === 0 ? 1 : 2, width: "100%", display: "flex", justifyContent: "center" }}>
              <CurrentUserRankCard userRank={userRank} loading={rankLoading} />
            </div>

            <div style={{ order: userRank?.referral_count === 0 ? 2 : 1, width: "calc(100% - 32px)", marginTop: "18px", marginBottom: "8px" }}>
              <button
                onClick={() => {
                  if (!mobile) {
                    window.open("https://wa.me/919052888968?text=Refer", "_blank");
                    return;
                  }
                  const waMessage = `I am Inviting you to join me in\n*14-Days FREE YOGA* 🧘‍♀️😊\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith *JAGAN* 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students\n\n*Register for FREE Now* 👇🏻👇🏻\n${shareLink}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank");
                }}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "30px",
                  background: "#FEAB27",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Outfit",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#202020",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  boxShadow: "0px 4px 2px rgba(0,0,0,0.25)",
                }}
              >
                Refer &amp; Win Yoga Kit
              </button>
            </div>

            {mobile && (
              <div style={{ order: 3, width: "calc(100% - 32px)", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <span
                  onClick={openReferralsDrawer}
                  style={{
                    color: "#012755",
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "normal",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  View Your Referrals <img src={imgBlueArrow} alt="" style={{ width: "18px", height: "18px", marginLeft: "4px", marginTop: "4px" }} />
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════
          POST-CONTEST SECTIONS (shown after contest ends)
         ═══════════════════════════════════════ */}
      {isContestOver && (() => {
        const rank = userRank?.rank ?? 0;
        const refCount = userRank?.referral_count ?? 0;
        const userName = userRank?.name ?? "";
        const isTop500 = !!mobile && rank > 0 && rank <= 500;
        const hasRefs = !!mobile && refCount >= 1 && !isTop500;

        return (
          <>
            <PostContestBanner />

            {/* State 1: Top 500 */}
            {isTop500 && (
              <>
                <CongratulationsCard userName={userName} rank={rank} referralCount={refCount} />
                <AddressDetailsCard />
              </>
            )}

            {/* State 2 & 3: Has 1+ refs, not top 500 */}
            {hasRefs && (
              <>
                <PostContestRankCard userName={userName} rank={rank} referralCount={refCount} />
                {!isPaidUser && <YourRewardsCard showCoupon={refCount >= 3} language={userLanguage} />}
              </>
            )}
          </>
        );
      })()}

      {/* ═══════════════════════════════════════
          VIEW YOUR REFERRALS — always shown for logged-in users
         ═══════════════════════════════════════ */}
      {mobile && (
        <div style={{ width: "calc(100% - 32px)", display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <span
            onClick={openReferralsDrawer}
            style={{
              color: "#012755",
              fontFamily: "Outfit",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "normal",
              whiteSpace: "nowrap",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            View your referrals{" "}
            <img src={imgBlueArrow} alt="" style={{ width: "18px", height: "18px", marginLeft: "4px", marginTop: "4px" }} />
          </span>
        </div>
      )}

      {/* ═══════════════════════════════════════
          LEADERBOARD SECTION
         ═══════════════════════════════════════ */}
      {/* Outer colored wrapper */}
      <div
        style={{
          width: "100%",
          background: "#FFE5BA",
          border: "1px solid #FEAB27",
          borderRadius: "32px 32px 0 0",
          marginTop: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", paddingInline: "16px" }}>
          <span style={{ display: "flex", alignItems: "center", color: "#003472", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, marginLeft: "8px" }}>
            {isContestOver ? "Referral Contest Winners" : "Leaderboard"}
            {isContestOver && (
              <img src={imgWinnersConfetti} alt="" style={{ width: "31px", height: "31px", marginLeft: "4px" }} />
            )}
          </span>
          {!isContestOver && (
            <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "#FFFFFF", borderRadius: "20px", padding: "3px 10px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF3B30", animation: "livePulse 1.2s ease-in-out infinite" }} />
              <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, padding: "0 5px" }}>LIVE</span>
            </div>
          )}
        </div>
        {/* Scrollable inner container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="scrollbar-hide"
          style={{
            boxSizing: "border-box",
            maxHeight: "calc(7 * 3rem + 6 * 0.5rem + 2rem + 1.5rem)",
            overflowY: "auto",
            scrollBehavior: "smooth",
            marginTop: "16px",
            marginBottom: "14px",
            marginInline: "16px",
            WebkitOverflowScrolling: "touch",
            willChange: "transform",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderRadius: "12px" }}>
            {leaderboardLoading && [0,1,2,3,4,5,6].map((i) => (
              <LeaderboardRowSkeleton key={`init-skel-${i}`} delay={i * 60} />
            ))}
            {!leaderboardLoading && leaderboard.map((entry, i) => (
              <div key={entry.rank} className="lb-row" style={{ animationDelay: `${Math.min(i % 100, 20) * 20}ms` }}>
                <LeaderboardRow
                  rank={entry.rank}
                  name={entry.name}
                  mobile={entry.mobile}
                  referrals={entry.referral_count}
                  isCurrentUser={userRank?.rank === entry.rank}
                />
              </div>
            ))}
            {!leaderboardLoading && currentPage < 5 && [0,1,2,3,4,5,6].map((i) => (
              <LeaderboardRowSkeleton key={`skel-${i}`} delay={i * 60} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM SHEET (ReferWinCard) — live contest only
         ═══════════════════════════════════════ */}
      {!isContestOver && mobile && <div
        style={{
          position: "sticky",
          bottom: 0,
          width: "90%",
          display: "flex",
          justifyContent: "center",
          padding: "16px 0 32px",
          background: "#FFF",
          boxSizing: "border-box",
        }}
      >
        <ReferWinCard shareLink={shareLink} referralsUrl={referralsUrl} showViewMore={false} />
      </div>}

      {/* ═══ REFERRALS DRAWER ═══ */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className={drawerClosing ? "drawer-backdrop-out" : "drawer-backdrop"}
            onClick={closeDrawer}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100 }}
          />
          {/* Drawer */}
          <div
            className={drawerClosing ? "drawer-slide-down" : "drawer-slide-up"}
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "412px",
              background: "#FFF",
              borderRadius: "30px 30px 0 0",
              boxShadow: "0 1px 8px 0 rgba(0,0,0,0.6)",
              zIndex: 101,
              display: "flex",
              flexDirection: "column",
              maxHeight: "82vh",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 26px 16px", flexShrink: 0 }}>
              <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal" }}>
                Your Referrals from June 1<sup style={{ fontSize: "0.65em" }}>st</sup> – June 30<sup style={{ fontSize: "0.65em" }}>th</sup>
              </span>
              <button
                onClick={closeDrawer}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", lineHeight: 1 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#202020" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Orange-bordered list container */}
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                margin: "0 26px",
                borderTop: "1px solid #FEAB27",
                borderLeft: "1px solid #FEAB27",
                borderRight: "1px solid #FEAB27",
                borderRadius: "20px 20px 0 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="scrollbar-hide" style={{ overflowY: "auto", flex: 1 }}>
                {referralsLoading && (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "#888", fontFamily: "Outfit", fontSize: "14px" }}>Loading…</div>
                )}
                {!referralsLoading && referralsData?.referrals?.map((ref, i) => {
                  const isVerified = ref.referral_confirmation_status === "verified";
                  const displayName = (!ref.referred_name || ref.referred_name === "None") ? ref.referred_mobile : ref.referred_name;
                  const isLast = i === (referralsData?.referrals?.length ?? 0) - 1;
                  return (
                    <div key={i}>
                      {/* Main row: avatar + name/phone + badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: isVerified ? "12px 21px" : "12px 21px 6px" }}>
                        {/* Avatar */}
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#0D468B" opacity="0.6"/>
                            <path d="M12 14C7.58172 14 4 16.6863 4 20V22H20V20C20 16.6863 16.4183 14 12 14Z" fill="#0D468B" opacity="0.6"/>
                          </svg>
                        </div>
                        {/* Center: name + phone */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal", display: "block" }}>
                            {displayName}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#A2A2A2"/>
                            </svg>
                            <span style={{ color: "#A2A2A2", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>
                              {ref.referred_mobile}
                            </span>
                          </div>
                        </div>
                        {/* Right: status badge */}
                        <div style={{ flexShrink: 0 }}>
                          {isVerified ? (
                            <div style={{ background: "#C7FFDA", borderRadius: "3px", width: "58px", height: "21px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ color: "#287E54", fontFamily: "Outfit", fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px" }}>VERIFIED</span>
                            </div>
                          ) : (
                            <div style={{ background: "#E0E0E0", borderRadius: "3px", width: "62px", height: "21px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ color: "#7B7F7D", fontFamily: "Outfit", fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px" }}>PENDING</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Pending error text — below the full row */}
                      {!isVerified && (
                        <div style={{ padding: "0 21px 10px" }}>
                          <PendingNote language={referralsData?.language} />
                        </div>
                      )}
                      {!isLast && <div style={{ height: "1px", background: "#E0E0E0" }} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sticky total bar */}
            {!referralsLoading && (
              <div
                style={{
                  flexShrink: 0,
                  margin: "16px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#FEAB27",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 18px",
                }}
              >
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 800 }}>Your Total Referrals</span>
                <div style={{ background: "#FFF", borderRadius: "8px", width: "44px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700 }}>
                    {referralsData?.total_referrals ?? referralsData?.referrals?.length ?? 0}
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════
          TERMS AND CONDITIONS LINK
         ═══════════════════════════════════════ */}
      <div style={{ width: "100%", padding: "16px 0 24px", display: "flex", justifyContent: "center" }}>
        <a
          href="https://yoga.healthyday.co.in/referral-tnc"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#012755",
            fontFamily: "Outfit",
            fontSize: "14px",
            fontWeight: 500,
            textDecoration: "underline",
          }}
        >
          Referral Contest Terms &amp; Conditions
        </a>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap'); @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes livePulse { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } } @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .lb-row { animation: fadeSlideIn 0.3s ease both; } @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } } .lb-skeleton { background: linear-gradient(90deg, #f0e8d8 25%, #f8f0e0 50%, #f0e8d8 75%); background-size: 800px 100%; animation: shimmer 1.4s ease-in-out infinite; border-radius: 8px; }`}</style>
    </div>
  );
};

/* ────────────────────────────────────────────
   Prize Tier Card Sub-component
   ──────────────────────────────────────────── */
const PrizeTierCard: React.FC<{
  image: string;
  label: string;
  prizes: string;
}> = ({ image, label, prizes }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      width: "110px",
    }}
  >
    {/* Image box */}
    <div
      style={{
        width: "96px",
        height: "76px",
        borderRadius: "10px",
        border: "3px solid #FEAC29",
        background: "#022753",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          aspectRatio: "1/1",
          backgroundImage: `url(${image})`,

          backgroundSize: "cover",
          backgroundPosition: "50%",
          backgroundRepeat: "no-repeat",
          borderRadius: "4px",
        }}
      />
    </div>

    {/* Label badge */}
    <div
      style={{
        width: "91px",
        height: "19px",
        borderRadius: "5px",
        background: "#FEAC29",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Outfit",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: 800,
          lineHeight: "normal",
        }}
      >
        {label}
      </span>
    </div>

    {/* Prize description */}
    <span
      style={{
        color: "#000",
        textAlign: "center",
        fontFamily: "Outfit",
        fontSize: "8px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
        maxWidth: "110px",
      }}
    >
      {prizes}
    </span>
  </div>
);

/* ────────────────────────────────────────────
   Leaderboard Row Sub-component
   ──────────────────────────────────────────── */
const LeaderboardRowSkeleton: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <div style={{ width: "100%", height: "48px", borderRadius: "12px", background: "#FFF", display: "flex", alignItems: "center", paddingInline: "14px", paddingBlock: "10px", boxSizing: "border-box", gap: "15px" }}>
    <div className="lb-skeleton" style={{ width: "28px", height: "28px", borderRadius: "5px", flexShrink: 0, animationDelay: `${delay}ms` }} />
    <div className="lb-skeleton" style={{ flex: 1, height: "14px", borderRadius: "6px", animationDelay: `${delay + 80}ms` }} />
    <div className="lb-skeleton" style={{ width: "48px", height: "14px", borderRadius: "6px", flexShrink: 0, animationDelay: `${delay + 160}ms` }} />
  </div>
);

const LeaderboardRow: React.FC<{
  rank: number;
  name: string;
  mobile: string;
  referrals: number;
  isCurrentUser?: boolean;
}> = ({ rank, name, mobile, referrals, isCurrentUser }) => (
  <div
    style={{
      width: "100%",
      height: "48px",
      borderRadius: "12px",
      background: isCurrentUser ? "#FFB033" : "#FFF",
      display: "flex",
      alignItems: "center",
      paddingLeft: "14px",
      paddingRight: "14px",
      paddingBlock: "10px",
      boxSizing: "border-box",
      gap: "15px",
    }}
  >
    {/* Rank badge */}
    <div
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "5px",
        background: isCurrentUser ? "#FFF" : "#FEAB27",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          color: "#012755",
          fontFamily: "Outfit",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "normal",
        }}
      >
        {rank}
      </span>
    </div>

    {/* Name */}
    <span
      style={{
        color: "#0A386F",
        fontFamily: "Outfit",
        fontSize: "18px",
        fontWeight: isCurrentUser ? 700 : 500,
        lineHeight: "normal",
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {isCurrentUser ? "You" : (!name || name === "None") ? mobile.slice(0, 5) + "XXX" + mobile.slice(8) : name}
    </span>

    {/* Referral count */}
    <span
      style={{
        color: "#0A386F",
        textAlign: "right",
        fontFamily: "Outfit",
        fontSize: "16px",
        fontWeight: isCurrentUser ? 500 : 300,
        lineHeight: "normal",
        flexShrink: 0,
      }}
    >
      {referrals} Ref
    </span>
  </div>
);

/* ────────────────────────────────────────────
   Current User Rank Card Sub-component
   ──────────────────────────────────────────── */
/* Rank + Referrals tab — shared by tiers 2-5 */
const RankReferralsTab: React.FC<{ rank: number; referralCount: number; ellipseImg: string; starImg: string; lineImg: string }> = ({ rank, referralCount, ellipseImg, starImg, lineImg }) => (
  <div
    style={{
      width: "161px",
      height: "37px",
      borderRadius: "6px",
      background: "#FFF",
      border: "0.2px solid #A0A0A0",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      boxSizing: "border-box",
      gap: "4px",
      marginTop: "6px",
    }}
  >
    <div style={{ width: "26px", height: "26px", position: "relative", flexShrink: 0 }}>
      <img src={ellipseImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <img src={starImg} alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "18px", height: "19px", objectFit: "contain" }} />
    </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ color: "#494949", fontFamily: "Outfit", fontSize: "8px", fontWeight: 500, lineHeight: "normal" }}>Your Rank</span>
      <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, lineHeight: "normal" }}>{rank}</span>
    </div>
    <img src={lineImg} alt="" style={{ width: "1px", height: "24px", margin: "0 4px", objectFit: "cover" }} />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ color: "#494949", fontFamily: "Outfit", fontSize: "8px", fontWeight: 500, lineHeight: "normal" }}>Total Referrals</span>
      <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, lineHeight: "normal" }}>{referralCount}</span>
    </div>
  </div>
);

const CurrentUserRankCard: React.FC<{ userRank: UserRank | null; loading: boolean }> = ({ userRank, loading }) => {
  if (loading) return (
    <div style={{ width: "calc(100% - 32px)", height: "123px", borderRadius: "12px", border: "1.5px solid #FEAB27", background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B", marginTop: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Outfit", fontSize: "13px" }}>Loading…</span>
    </div>
  );
  if (!userRank) return null;

  const CARD_BASE: React.CSSProperties = {
    width: "calc(100% - 32px)",
    height: "123px",
    borderRadius: "12px",
    marginTop: "18px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxSizing: "border-box",
    overflow: "hidden",
  };

  /* ── Zero referrals ── "Start Referring Today!" */
  if (userRank.referral_count === 0) {
    return (
      <div style={{ ...CARD_BASE, border: "1.5px solid #7AB6ED", background: "radial-gradient(ellipse at 80% 55%, #F7FFFF 2%, #E7F7FF 60%, #DCF4FF 100%)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", zIndex: 2, flex: 1 }}>
          <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal" }}>
            Start Referring Today!
          </span>
          <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "10px", fontWeight: 400, lineHeight: "1.4", maxWidth: "177px" }}>
            You currently do not have a rank as your referrals are still zero
          </span>
          <div style={{ width: "100px", height: "34px", borderRadius: "6px", background: "#FFF", border: "0.2px solid #A0A0A0", boxShadow: "1px 1px 1px 0px rgba(255,255,255,0.25)", display: "flex", alignItems: "center", padding: "0 6px", boxSizing: "border-box", gap: "6px", marginTop: "6px" }}>
            <div style={{ width: "23px", height: "23px", position: "relative", flexShrink: 0 }}>
              <img src={imgEllipse} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <img src={imgSadEmoji} alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "17px", height: "17px", objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#494949", fontFamily: "Outfit", fontSize: "8px", fontWeight: 500, lineHeight: "normal" }}>Your Referrals</span>
              <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, lineHeight: "normal" }}>0</span>
            </div>
          </div>
        </div>
        <img src={imgYogaKit} alt="" style={{ position: "absolute", right: 10, bottom: 0, width: "9.375rem", height: "7.5625rem", objectFit: "cover", pointerEvents: "none" }} />
      </div>
    );
  }

  /* ── Tier 1: Rank 1–25 ── Dark blue + shield + confetti */
  if (userRank.rank <= 25) {
    return (
      <div style={{ ...CARD_BASE, border: "1.5px solid #FEAB27", background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B", padding: "0 27px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "18px", height: "16px", backgroundImage: `url(${imgMedal})`, backgroundSize: "contain", backgroundPosition: "50%", backgroundRepeat: "no-repeat" }} />
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 400, lineHeight: "normal" }}>Great job!</span>
          </div>
          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal" }}>
            You’re in <span style={{ color: "#FEAB27" }}>TOP 25 !</span>
          </span>
          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 400, width: "166px", marginTop: "2px", lineHeight: "normal" }}>
            Keep referring and stay at the top till June 30th.
          </span>
          <div style={{ width: "121px", height: "23px", borderRadius: "6px", background: "#365B88", boxShadow: "1px 1px 1px 0 rgba(255,255,255,0.25)", display: "flex", alignItems: "center", padding: "0 6px", gap: "6px", marginTop: "6px" }}>
            <div style={{ width: "15px", height: "15px", position: "relative" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ position: "absolute", left: 0, top: 0 }}><circle cx="7.5" cy="7.5" r="7.5" fill="#FEAB27" /></svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "10.385px", height: "10.962px", backgroundImage: `url(${imgStarSmall})`, backgroundSize: "contain", backgroundPosition: "50%", backgroundRepeat: "no-repeat" }} />
            </div>
            <span style={{ color: "#D2D2D2", fontFamily: "Outfit", fontSize: "8px", fontWeight: 500, flex: 1 }}>Total Referrals</span>
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600 }}>{userRank.referral_count}</span>
          </div>
        </div>
        {/* Shield badge */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "130px", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "60%", height: "60%", transform: "translate(-50%,-50%)", borderRadius: "50%", boxShadow: "0 0 250px 0 rgba(255,234,199,0.80), 0 0 166px 0 rgba(255,234,199,0.80), 0 0 83px 0 rgba(255,234,199,0.80)", zIndex: 0, pointerEvents: "none" }} />
          {/* Shield image */}
          <img
            src={imgShield}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", zIndex: 1 }}
          />
          {/* Rank number overlay */}
          <span style={{ position: "relative", zIndex: 2, color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 800, textAlign: "center", marginTop: "-15px" }}>
            {userRank.rank}
          </span>
        </div>
        {/* Confetti */}
        <div style={{ position: "absolute", top: "-5px", right: "75px", width: "58.9px", height: "83.6px", transform: "rotate(-144.8deg)", backgroundImage: `url(${imgConfettiA})`, backgroundSize: "242.952% 164.377%", backgroundPosition: "-121.696px -40.227px", backgroundRepeat: "no-repeat", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "45px", left: "210px", width: "47.7px", height: "36.5px", transform: "rotate(39.7deg)", backgroundImage: `url(${imgConfetti})`, backgroundSize: "361.562% 522.221%", backgroundPosition: "-88.083px -79.919px", backgroundRepeat: "no-repeat", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "0", left: "170px", width: "56.96px", height: "61.08px", transform: "rotate(-124.7deg)", backgroundImage: `url(${imgConfettiA1})`, backgroundSize: "364.5% 378.052%", backgroundPosition: "-197.338px -173.409px", backgroundRepeat: "no-repeat", zIndex: 1 }} />
      </div>
    );
  }

  /* ── Rank > 2000 ── Light blue card: "You are ranked X" */
  if (userRank.rank > 2000) {
    return (
      <div style={{ ...CARD_BASE, border: "1.5px solid #7AB6ED", background: "radial-gradient(ellipse at 80% 55%, #F7FFFF 2%, #E7F7FF 60%, #DCF4FF 100%)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", zIndex: 2, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal" }}>
              You are ranked
            </span>
            <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "18px", fontWeight: 800, lineHeight: "normal" }}>
              {userRank.rank}
            </span>
          </div>
          <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "10px", fontWeight: 400, lineHeight: "1.4", maxWidth: "177px" }}>
            {"Refer more to win exciting rewards - FREE Classes & Yoga Kits!"}
          </span>
          <div style={{ width: "100px", height: "34px", borderRadius: "6px", background: "#FFF", border: "0.2px solid #A0A0A0", boxShadow: "1px 1px 1px 0px rgba(255,255,255,0.25)", display: "flex", alignItems: "center", padding: "0 6px", boxSizing: "border-box", gap: "6px", marginTop: "6px" }}>
            <div style={{ width: "23px", height: "23px", position: "relative", flexShrink: 0 }}>
              <img src={imgEllipse} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <img src={imgTier4Star} alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "15px", height: "17px", objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#494949", fontFamily: "Outfit", fontSize: "8px", fontWeight: 500, lineHeight: "normal" }}>Your Referrals</span>
              <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, lineHeight: "normal" }}>{userRank.referral_count}</span>
            </div>
          </div>
        </div>
        <img
          src={imgYogaKit}
          alt=""
          style={{ position: "absolute", right: 10, bottom: 0, width: "9.375rem", height: "7.5625rem", objectFit: "cover", pointerEvents: "none" }}
        />
      </div>
    );
  }

  /* ── Tiers 2-5: light background cards ── */
  type LightTier = { border: string; bg: string; heading: string; hasSparkles: boolean; subtitle: string; illustration: string; ellipse: string; star: string; line: string; imgStyle: React.CSSProperties };
  const tier: LightTier =
    userRank.rank <= 100 ? {
      border: "1.5px solid #7BB7FF",
      bg: "radial-gradient(ellipse at 80% 55%, #FFF 2%, #E3F0FF 65%, #D1E6FF 100%)",
      heading: "You are in TOP 100",
      hasSparkles: true,
      subtitle: "Refer few more and reach Top 25 to win Weight Scale also",
      illustration: imgTier1Illustration,
      ellipse: imgEllipse,
      star: imgTier1Star,
      line: imgLine,
      imgStyle: { position: "absolute", right: 0, bottom: 0, width: "8.375rem", height: "6.5625rem", objectFit: "contain", pointerEvents: "none" },
    } : userRank.rank <= 500 ? {
      border: "1.5px solid #FFD6B8",
      bg: "radial-gradient(ellipse at 80% 55%, #FDF7F1 2%, #FDF5EF 60%, #FDEEE1 100%)",
      heading: "You are in TOP 500",
      hasSparkles: true,
      subtitle: "Refer few more and reach Top 100 to win hand towel as well",
      illustration: imgTier2Illustration,
      ellipse: imgEllipse,
      star: imgTier2Star,
      line: imgLine,
      imgStyle: { position: "absolute", right: 0, bottom: 0, width: "9.375rem", height: "6.6875rem",  pointerEvents: "none" },
    } : userRank.rank <= 1000 ? {
      border: "1.5px solid #A2C6CF",
      bg: "radial-gradient(ellipse at 80% 55%, #FFF 2%, #E3F1FF 65%, #F0F8FE 100%)",
      heading: "You are close to Top 500!",
      hasSparkles: false,
      subtitle: "Keep referring and reach Top 500 to win a Yoga kit!",
      illustration: imgTier3Illustration,
      ellipse: imgEllipse,
      star: imgTier3Star,
      line: imgLine,
      imgStyle: { position: "absolute", right: 0, bottom: 0, width: "8.375rem", height: "6.5625rem", objectFit: "contain", pointerEvents: "none" },
    } : {
      border: "1.5px solid #ADCFA2",
      bg: "radial-gradient(ellipse at 80% 55%, #FFF 2%, #E3FFEE 65%, #F0FEF5 100%)",
      heading: "You are on track!",
      hasSparkles: false,
      subtitle: "You are only few referrals away from Top 500. Just keep referring!",
      illustration: imgTier4Illustration,
      ellipse: imgEllipse,
      star: imgTier4Star,
      line: imgLine,
      imgStyle: { position: "absolute", right: 0, bottom: 0, width: "8.375rem", height: "6.5625rem", objectFit: "contain", pointerEvents: "none" },
    };

  return (
    <div style={{ ...CARD_BASE, border: tier.border, background: tier.bg }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", zIndex: 2, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal" }}>
            {tier.heading}
          </span>
          {tier.hasSparkles && (
            <span style={{ fontSize: "16px" }}>✨</span>
          )}
        </div>
        <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "10px", fontWeight: 400, lineHeight: "1.4", maxWidth: "185px" }}>
          {tier.subtitle}
        </span>
        <RankReferralsTab
          rank={userRank.rank}
          referralCount={userRank.referral_count}
          ellipseImg={tier.ellipse}
          starImg={tier.star}
          lineImg={tier.line}
        />
      </div>
      {/* Right illustration */}
      <img
        src={tier.illustration}
        alt=""
        style={tier.imgStyle}
      />
    </div>
  );
};

/* ────────────────────────────────────────────
   Post-Contest UI Sub-components
   ──────────────────────────────────────────── */

const PostContestBanner: React.FC = () => (
  <div
    style={{
      width: "calc(100% - 32px)",
      height: "30px",
      borderRadius: "5px",
      background: "#FFCDCD",
      display: "flex",
      alignItems: "center",
      // overflow: "hidden",
      marginTop: "10px",
      boxSizing: "border-box",
      flexShrink: 0,
    }}
  >
    <div style={{ width: "10px", height: "100%", background: "#FF402B", flexShrink: 0 }} />
    <span
      style={{
        paddingLeft: "8px",
        color: "#505050",
        fontFamily: "Outfit",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      Referral Contest has ended. The winners have been announced.
    </span>
  </div>
);

const CongratulationsCard: React.FC<{ userName: string; rank: number; referralCount: number }> = ({
  userName,
  rank,
  referralCount,
}) => {
  const displayName = !userName || userName === "None" ? "User" : userName.split(" ")[0];
  return (
    <div
      style={{
        width: "calc(100% - 32px)",
        height: "145px",
        borderRadius: "12px",
        border: "1px solid #ebc79c",
        boxShadow: "0 1px 8px 0 rgba(0,0,0,0.05), 0 -1px 8px 0 rgba(0,0,0,0.05)",
        position: "relative",
        overflow: "hidden",
        marginTop: "16px",
      }}
    >
      <img
        src={imgPostCongratsCardBg}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Left content */}
      <div style={{ position: "absolute", left: "16px", top: "12px", zIndex: 1, maxWidth: "185px" }}>
        <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "11px", fontWeight: 500, color: "#000" }}>
          Hi {displayName} ji,
        </p>
        <p
          style={{
            margin: "2px 0",
            fontFamily: "'Cookie', cursive",
            fontSize: "28px",
            fontWeight: 400,
            color: "#004597",
            lineHeight: 1.1,
          }}
        >
          Congratulations!
        </p>
        <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#004597" }}>
          You have won a <span style={{ color: "#fe961b" }}>Yoga Kit!</span>
        </p>
        {/* Rank + Refs badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "32px",
            borderRadius: "5px",
            border: "0.5px solid #fe961b",
            background: "#FFF",
            padding: "0 8px",
            gap: "8px",
            marginTop: "8px",
            width: "fit-content",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "22px",
                height: "22px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <img src={imgTrophyBadgeBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <img
                src={imgTrophyIcon}
                alt=""
                style={{ position: "absolute", left: "3px", top: "5px", width: "16px", height: "14px" }}
              />
              <img
                src={imgTrophyStar}
                alt=""
                style={{ position: "absolute", left: "9px", top: "8px", width: "4px", height: "4px" }}
              />
            </div>
            <div>
              <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "6px", color: "#000" }}>Your Final Rank</p>
              <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, color: "#003c83" }}>{rank}</p>
            </div>
          </div>
          <div style={{ width: "1px", height: "24px", background: "#D9D9D9" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "22px",
                height: "22px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <img src={imgPeopleBadgeBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <img
                src={imgPeopleIconGroup}
                alt=""
                style={{ position: "absolute", left: "2px", top: "2px", width: "18px", height: "18px" }}
              />
              <img
                src={imgPeopleIconFront}
                alt=""
                style={{ position: "absolute", left: "2px", top: "2px", width: "18px", height: "18px" }}
              />
            </div>
            <div>
              <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "6px", color: "#000" }}>Total Referrals</p>
              <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, color: "#003c83" }}>{referralCount}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right product image */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "7px",
          width: "173px",
          height: "138px",
          overflow: "hidden",
        }}
      >
        <img
          src={imgPostProductImg}
          alt=""
          style={{ width: "100%", height: "120%", objectFit: "contain", objectPosition: "center top" }}
        />
      </div>
    </div>
  );
};

const AddressDetailsCard: React.FC = () => (
  <div
    style={{
      width: "calc(100% - 32px)",
      height: "54px",
      borderRadius: "12px",
      background: "linear-gradient(90deg, #012755 0%, #003e88 50%, #001a38 100%)",
      border: "1px solid #ffae4f",
      marginTop: "10px",
      display: "flex",
      alignItems: "center",
      padding: "0 10px 0 0",
      boxSizing: "border-box",
      gap: "10px",
    }}
  >
    <div
      style={{
        flexShrink: 0,
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#FF9F00",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
          fill="white"
        />
      </svg>
    </div>
    <p
      style={{
        flex: 1,
        margin: 0,
        fontFamily: "Outfit",
        fontSize: "11px",
        fontWeight: 600,
        color: "#FFF",
        lineHeight: 1.4,
      }}
    >
      Provide your address details to claim reward
    </p>
    <button
      onClick={() => window.open("https://forms.gle/p8jPXp3toqdpDtC69", "_blank")}
      style={{
        flexShrink: 0,
        width: "114px",
        height: "21px",
        borderRadius: "4px",
        background: "linear-gradient(180deg, #FEAB27 0%, #FF8A00 100%)",
        boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "3px",
      }}
    >
      <span
        style={{
          fontFamily: "Outfit",
          fontSize: "9px",
          fontWeight: 700,
          color: "#FFF",
          textTransform: "uppercase",
          letterSpacing: "0.3px",
        }}
      >
        SUBMIT ADDRESS
      </span>
      <img src={imgForward} alt="" style={{ width: "1.0625rem", height: "1.0625rem", aspectRatio: "1/1" }} />
    </button>
  </div>
);

const PostContestRankCard: React.FC<{ userName: string; rank: number; referralCount: number }> = ({
  userName,
  rank,
  referralCount,
}) => {
  const displayName = !userName || userName === "None" ? "User" : userName.split(" ")[0];
  return (
    <div
      style={{
        width: "calc(100% - 32px)",
        height: "140px",
        borderRadius: "12px",
        border: "1px solid #febf38",
        position: "relative",
        overflow: "hidden",
        marginTop: "16px",
      }}
    >
      <img
        src={imgPostRankCardBg}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Left content */}
      <div style={{ position: "absolute", left: "16px", top: "14px", zIndex: 1, maxWidth: "210px" }}>
        <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "11px", fontWeight: 500, color: "#000" }}>
          Hi {displayName} ji,
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px", flexWrap: "wrap", marginTop: "2px" }}>
          <span style={{ fontFamily: "Outfit", fontSize: "17px", fontWeight: 800, color: "#0d468b" }}>
            You are ranked
          </span>
          <span style={{ fontFamily: "Outfit", fontSize: "20px", fontWeight: 800, color: "#00316b" }}>
            {rank}!
          </span>
        </div>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "Outfit",
            fontSize: "11px",
            fontWeight: 600,
            color: "#004597",
            maxWidth: "143px",
          }}
        >
          Thank you for referring!
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontFamily: "Outfit",
            fontSize: "8px",
            fontWeight: 400,
            color: "#535353",
            maxWidth: "193px",
            lineHeight: 1.4,
          }}
        >
          You're helping more people start their yoga journey!
        </p>
        {/* Total Referrals pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "23px",
            background: "#0049a0",
            borderRadius: "6px",
            boxShadow: "1px 1px 1px 0 rgba(255,255,255,0.25)",
            padding: "0 8px",
            gap: "6px",
            marginTop: "8px",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              background: "#FEAB27",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="white" />
            </svg>
          </div>
          <span style={{ fontFamily: "Outfit", fontSize: "8px", fontWeight: 500, color: "#e9e9e9" }}>
            Total Referrals
          </span>
          <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#FFF" }}>
            {referralCount}
          </span>
        </div>
      </div>
      {/* Right instructor image */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "120px",
          height: "128px",
          borderTopRightRadius: "11px",
          overflow: "hidden",
        }}
      >
        <img
          src={imgPostInstructor}
          alt=""
          style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
    </div>
  );
};

const DIET_PDF_URL = {
  Telugu: "https://d3jt6ku4g6z5l8.cloudfront.net/FILE/6795ce3db71ab6291dfa64b7/5894347_RECIPE%20HANBOOKTELUGU%203compressed.pdf",
  English: "https://d3jt6ku4g6z5l8.cloudfront.net/FILE/6795ce3db71ab6291dfa64b7/9278824_RECIPE%20HANDBOOK%20%20ENGLISH%202compressed.pdf",
};

const YourRewardsCard: React.FC<{ showCoupon: boolean; language?: string }> = ({ showCoupon, language }) => (
  <div style={{ width: "calc(100% - 32px)", marginTop: "16px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
      <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, color: "#012755" }}>
        Your Rewards
      </span>
      <img src={imgGiftIcon} alt="" style={{ width: "18px", height: "18px" }} />
    </div>
    <div
      style={{
        background: "#fff9f2",
        border: "1px solid #ffac4a",
        borderRadius: "9px",
        boxShadow: "-1px -1px 4px 0 rgba(254,150,27,0.15), 1px 1px 4px 0 rgba(254,150,27,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Diet PDF row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px" }}>
        <div
          style={{
            width: "55px",
            height: "31px",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0 4px rgba(0,0,0,0.15)",
          }}
        >
          <img src={imgPostDietThumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ flex: 1, fontFamily: "Outfit", fontSize: "13px", fontWeight: 700, color: "#004394" }}>
          Diet e-Handbook PDF
        </span>
        <button
          onClick={() => window.open(language === "Telugu" ? DIET_PDF_URL.Telugu : DIET_PDF_URL.English, "_blank")}
          style={{
            flexShrink: 0,
            width: "80px",
            height: "22px",
            borderRadius: "5px",
            background: "#fe961b",
            boxShadow: "0 0 8px 1px rgba(0,0,0,0.05)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <img src={imgDownloadIcon} alt="" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
          <span style={{ fontFamily: "Outfit", fontSize: "10px", fontWeight: 700, color: "#FFF" }}>Download</span>
        </button>
      </div>

      {showCoupon && (
        <>
          <div style={{ height: "0.5px", background: "#E8D5C0", margin: "0 12px" }} />
          {/* Yoga Coupon row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px" }}>
            <div
              style={{
                width: "59px",
                height: "29px",
                borderRadius: "4px",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 0 4px rgba(0,0,0,0.10)",
                marginTop: "2px",
              }}
            >
              <img src={imgPostCouponThumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "Outfit",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#004394",
                  maxWidth: "191px",
                }}
              >
                Get 1 Month extra with paid plan
              </p>
            </div>
            <button
              onClick={() => window.open("https://yoga.healthyday.co.in/pricing", "_blank")}
              style={{
                flexShrink: 0,
                width: "80px",
                height: "22px",
                borderRadius: "5px",
                background: "#fe961b",
                boxShadow: "0 0 8px 1px rgba(0,0,0,0.05)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "Outfit", fontSize: "10px", fontWeight: 700, color: "#FFF" }}>
                Redeem Now
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

export default Leaderboard;
