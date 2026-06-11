import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReferWinCard from "@/components/ReferWinCard";
import logo from "@/assets/Primary_logo.svg";

const CONTEST_START = "2026-06-01";
const CONTEST_END = "2026-06-30";

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
  tier1: "/leaderboard/03fe32d52d733d7264af16fa1a873079ffdb9919.webp",
  tier2: "/leaderboard/a999ad5d053fb10e4399ce1c16a6647a5e72b054.webp",
  tier3: "/leaderboard/a623655ba98def85f08fd93b110d719415c6fc2e.webp",
};

const BANNER_BG = "/leaderboard/11621406ee6eb5f29bb80937e33d2195815c78d8.webp";
const MAIN_PRIZE_IMG = "/leaderboard/0d0feb7c046d1e7737d4d7000c10d1cf68d8865c.webp";

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
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [referralsData, setReferralsData] = useState<{ total_referrals: number; referrals: { referred_mobile: string; referred_name: string; referral_confirmation_status: string }[] } | null>(null);
  const [referralsLoading, setReferralsLoading] = useState(false);

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
    const digits = mobile.replace(/\D/g, "");
    const normalized = digits.startsWith("91") && digits.length >= 12 ? digits.slice(2) : digits;
    const e164 = `+91${normalized}`;
    fetch(`/.netlify/functions/referrals?mobile=${encodeURIComponent(e164)}&start_date=${CONTEST_START}&end_date=${CONTEST_END}`)
      .then((r) => r.json())
      .then((data) => setReferralsData(data))
      .catch(() => {})
      .finally(() => setReferralsLoading(false));
  };

  const maskMobile = (num: string) => {
    const digits = num.replace(/\D/g, "");
    const last10 = digits.slice(-10);
    return `+91 ${last10.slice(0, 1)}***${last10.slice(-6)}`;
  };

  useEffect(() => {
    if (currentPage === 1) {
      setLeaderboardLoading(true);
      setLeaderboard([]);
    } else {
      setIsFetchingMore(true);
    }
    fetch(`/.netlify/functions/leaderboard?start_date=${CONTEST_START}&end_date=${CONTEST_END}&page_size=100&page=${currentPage}`)
      .then((r) => r.json())
      .then((data) => {
        const rows: LeaderboardEntry[] = data.leaderboard ?? [];
        setLeaderboard((prev) => currentPage === 1 ? rows : [...prev, ...rows]);
      })
      .catch(() => {})
      .finally(() => { setLeaderboardLoading(false); setIsFetchingMore(false); });
  }, [currentPage]);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || isFetchingMore || leaderboardLoading || currentPage >= 5) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsNearBottom(remaining < 60);
    if (remaining < 80) setCurrentPage((p) => p + 1);
  }, [isFetchingMore, leaderboardLoading, currentPage]);

  useEffect(() => {
    if (!mobile) { setRankLoading(false); return; }
    const digits = mobile.replace(/\D/g, "");
    const normalized = digits.startsWith("91") && digits.length >= 12 ? digits.slice(2) : digits;
    const e164 = `+91${normalized}`;
    fetch(`/.netlify/functions/leaderboard-rank?mobile=${encodeURIComponent(e164)}&start_date=${CONTEST_START}&end_date=${CONTEST_END}`)
      .then((r) => (r.status === 404 ? null : r.json()))
      .then((data) => setUserRank(data))
      .catch(() => {})
      .finally(() => setRankLoading(false));
  }, [mobile]);

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
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "12px",
            padding: "4px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#202020" />
          </svg>
        </button>
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
          BANNER CARD — Blue gradient with leaves bg
         ═══════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════
          DATE BAR — Contest dates
         ═══════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════
          PRIZE TIERS — 3 columns
         ═══════════════════════════════════════ */}
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
        {/* Tier 1: Top 1-25 */}
        <PrizeTierCard
          image={PRIZE_IMAGES.tier1}
          label="Top 1 - 25"
          prizes="Yoga Mat + T Shirt + Water Bottle + Weight Scale + Towel"
        />
        {/* Tier 2: Top 25-100 */}
        <PrizeTierCard
          image={PRIZE_IMAGES.tier2}
          label="Top 25 - 100"
          prizes="Yoga Mat + T Shirt + Water Bottle + Towel"
        />
        {/* Tier 3: Top 100-500 */}
        <PrizeTierCard
          image={PRIZE_IMAGES.tier3}
          label="Top 100 - 500"
          prizes="Yoga Mat + T Shirt + Water Bottle"
        />
      </div>

      {/* ═══════════════════════════════════════
          REFER & WIN BUTTON
         ═══════════════════════════════════════ */}
      <div style={{ width: "calc(100% - 32px)", marginTop: "18px", marginBottom: "8px" }}>
        <button
          onClick={() => {
            if (!mobile) {
              window.open("https://wa.me/919052888968?text=Refer", "_blank");
              return;
            }
            const waMessage = `I am Inviting you to join me in\n*21-Days FREE YOGA* 🧘‍♀️😊\n🗓️ Starts *21st JUNE*\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith *JAGAN* 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students\n\n*Register for FREE Now* 👇🏻👇🏻\n${shareLink}`;
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


      {/* ═══════════════════════════════════════
          CURRENT USER RANK
         ═══════════════════════════════════════ */}
      <CurrentUserRankCard userRank={userRank} loading={rankLoading} />

      {mobile && <div style={{ width: "calc(100% - 32px)", display: "flex", justifyContent: "center", marginTop: "10px" }}>
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
          View Your Referrals <img src="/blueArrow.svg" alt="" style={{ width: "18px", height: "18px", marginLeft: "4px", marginTop: "4px" }} />
        </span>
      </div>}

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
        {/* Scrollable inner container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="scrollbar-hide"
          style={{
            boxSizing: "border-box",
            maxHeight: "calc(7 * 3rem + 6 * 0.5rem + 2rem + 1.5rem)",
            overflowY: "auto",
            marginTop: "24px",
            marginBottom: "14px",
            marginInline: "16px",
            WebkitOverflowScrolling: "touch",
            willChange: "transform",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderRadius: "12px" }}>
            {leaderboardLoading && (
              <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "13px", textAlign: "center", padding: "12px 0" }}>Loading…</span>
            )}
            {!leaderboardLoading && leaderboard.map((entry) => (
              <LeaderboardRow
                key={entry.rank}
                rank={entry.rank}
                name={entry.name}
                mobile={entry.mobile}
                referrals={entry.referral_count}
                isCurrentUser={userRank?.rank === entry.rank}
              />
            ))}
            {/* Load-more zone — springs open when near bottom or fetching */}
            {currentPage < 5 && (
              <div
                style={{
                  height: isFetchingMore ? "48px" : isNearBottom ? "28px" : "0px",
                  transition: "height 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  color: "#FEAB27",
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {isFetchingMore
                  ? <><span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>⟳</span> Loading more…</>
                  : "↓ more"
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM SHEET (ReferWinCard)
         ═══════════════════════════════════════ */}
      {mobile && <div
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
              borderRadius: "20px 20px 0 0",
              zIndex: 101,
              display: "flex",
              flexDirection: "column",
              maxHeight: "82vh",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px", flexShrink: 0 }}>
              <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "1.025rem", fontWeight: 700, lineHeight: "normal" }}>
                Your referrals from June 1<sup style={{ fontSize: "0.6em" }}>st</sup> to June 30<sup style={{ fontSize: "0.6em" }}>th</sup> 
              </span>
              <button
                onClick={closeDrawer}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#202020", padding: "4px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            {/* List */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 12px" }}>
              {referralsLoading && (
                <div style={{ textAlign: "center", padding: "32px 0", color: "#888", fontFamily: "Outfit", fontSize: "14px" }}>Loading…</div>
              )}
              {!referralsLoading && referralsData?.referrals?.map((ref, i) => {
                const isVerified = ref.referral_confirmation_status === "verified";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 12px",
                      borderRadius: "12px",
                      border: "1px solid #FFE5BA",
                      marginBottom: "10px",
                      background: "#FFF",
                    }}
                  >
                    {/* Avatar */}
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#0D468B" opacity="0.6"/>
                        <path d="M12 14C7.58172 14 4 16.6863 4 20V22H20V20C20 16.6863 16.4183 14 12 14Z" fill="#0D468B" opacity="0.6"/>
                      </svg>
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>
                        {(!ref.referred_name || ref.referred_name === "None") ? maskMobile(ref.referred_mobile) : ref.referred_name}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#888"/>
                        </svg>
                        <span style={{ color: "#888", fontFamily: "Outfit", fontSize: "12px", fontWeight: 400 }}>
                          {maskMobile(ref.referred_mobile)}
                        </span>
                      </div>
                    </div>
                    {/* Status badge */}
                    <div
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: isVerified ? "#E6F9EE" : "#F2F2F2",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: isVerified ? "#1A8A45" : "#888", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>
                        {isVerified ? "VERIFIED" : "PENDING"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky total bar */}
            {!referralsLoading && <div
              style={{
                flexShrink: 0,
                margin: "0 16px 16px",
                height: "56px",
                borderRadius: "14px",
                background: "#FEAB27",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
              }}
            >
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>Your Total Referrals</span>
              <div style={{ background: "#FFF", borderRadius: "8px", padding: "4px 14px" }}>
                <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700 }}>
                  {referralsData?.referrals?.filter(r => r.referral_confirmation_status === "verified").length ?? 0}
                </span>
              </div>
            </div>}
          </div>
        </>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
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

  /* ── Tier 1: Rank 1–25 ── Dark blue + shield + confetti */
  if (userRank.rank <= 25) {
    return (
      <div style={{ ...CARD_BASE, border: "1.5px solid #FEAB27", background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B", padding: "0 27px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "18px", height: "16px", backgroundImage: "url(/leaderboard/d8c04109d0b7e7d179eedceade5572244f039058.png)", backgroundSize: "contain", backgroundPosition: "50%", backgroundRepeat: "no-repeat" }} />
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
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "10.385px", height: "10.962px", backgroundImage: "url(/leaderboard/eeef30852c9e8a5d9b0eedd75392aa12539c4ce5.png)", backgroundSize: "contain", backgroundPosition: "50%", backgroundRepeat: "no-repeat" }} />
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
            src="https://www.figma.com/api/mcp/asset/ae45b944-5789-48fb-a245-6c7e0d583498"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", zIndex: 1 }}
          />
          {/* Rank number overlay */}
          <span style={{ position: "relative", zIndex: 2, color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 800, textAlign: "center", marginTop: "-15px" }}>
            {userRank.rank}
          </span>
        </div>
        {/* Confetti */}
        <div style={{ position: "absolute", top: "-5px", right: "75px", width: "58.9px", height: "83.6px", transform: "rotate(-144.8deg)", backgroundImage: "url(/leaderboard/226805aeb355248ebac39e293e844975a3b6fada.png)", backgroundSize: "242.952% 164.377%", backgroundPosition: "-121.696px -40.227px", backgroundRepeat: "no-repeat", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "45px", left: "210px", width: "47.7px", height: "36.5px", transform: "rotate(39.7deg)", backgroundImage: "url(/leaderboard/confetti.png)", backgroundSize: "361.562% 522.221%", backgroundPosition: "-88.083px -79.919px", backgroundRepeat: "no-repeat", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "0", left: "170px", width: "56.96px", height: "61.08px", transform: "rotate(-124.7deg)", backgroundImage: "url(/leaderboard/226805aeb355248ebac39e293e844975a3b6fada\\ (1).png)", backgroundSize: "364.5% 378.052%", backgroundPosition: "-197.338px -173.409px", backgroundRepeat: "no-repeat", zIndex: 1 }} />
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
      illustration: "https://www.figma.com/api/mcp/asset/6ef5463d-a898-48fc-98dc-e711c0b34996",
      ellipse: "https://www.figma.com/api/mcp/asset/41e7fddc-4b3f-4ec2-af4d-dd17b5c98409",
      star: "https://www.figma.com/api/mcp/asset/f097455c-c5a8-4784-954a-d70c8a3ad33e",
      line: "https://www.figma.com/api/mcp/asset/994fb10a-939b-4089-b514-f879546c6447",
      imgStyle: { position: "absolute", right: 0, bottom: 0, width: "8.375rem", height: "6.5625rem", objectFit: "contain", pointerEvents: "none" },
    } : userRank.rank <= 500 ? {
      border: "1.5px solid #FFD6B8",
      bg: "radial-gradient(ellipse at 80% 55%, #FDF7F1 2%, #FDF5EF 60%, #FDEEE1 100%)",
      heading: "You are in TOP 500",
      hasSparkles: true,
      subtitle: "Refer few more and reach Top 100 to win hand towel as well",
      illustration: "https://www.figma.com/api/mcp/asset/c90d6f89-3f9f-488e-a14f-7d4f88f2af63",
      ellipse: "https://www.figma.com/api/mcp/asset/04933756-d957-47cf-a30b-14f87a06d7f2",
      star: "https://www.figma.com/api/mcp/asset/a976429d-c0e8-4d89-bf50-3bcd1aad9e1d",
      line: "https://www.figma.com/api/mcp/asset/5851987f-6b6d-4a28-a73d-d6d563f6aa1b",
      imgStyle: { position: "absolute", right: 0, bottom: 0, width: "9.375rem", height: "6.6875rem",  pointerEvents: "none" },
    } : userRank.rank <= 1000 ? {
      border: "1.5px solid #A2C6CF",
      bg: "radial-gradient(ellipse at 80% 55%, #FFF 2%, #E3F1FF 65%, #F0F8FE 100%)",
      heading: "You are close to Top 500!",
      hasSparkles: false,
      subtitle: "Keep referring and reach Top 500 to win a Yoga kit!",
      illustration: "https://www.figma.com/api/mcp/asset/170c682f-6efb-4a0d-9c6f-92047a9d6a8d",
      ellipse: "https://www.figma.com/api/mcp/asset/358ea314-1060-4db0-b7c5-c0ed9423e2fa",
      star: "https://www.figma.com/api/mcp/asset/698019ed-6dd6-4e3f-a35f-41951c4a70e3",
      line: "https://www.figma.com/api/mcp/asset/0be9ddf1-1921-4fe8-a7bf-f1a282cbb11f",
      imgStyle: { position: "absolute", right: 0, bottom: 0, width: "8.375rem", height: "6.5625rem", objectFit: "contain", pointerEvents: "none" },
    } : {
      border: "1.5px solid #ADCFA2",
      bg: "radial-gradient(ellipse at 80% 55%, #FFF 2%, #E3FFEE 65%, #F0FEF5 100%)",
      heading: "You are on track!",
      hasSparkles: false,
      subtitle: "You are only few referrals away from Top 500. Just keep referring!",
      illustration: "https://www.figma.com/api/mcp/asset/37e40e5d-344b-48f6-bba8-1a46e5e64393",
      ellipse: "https://www.figma.com/api/mcp/asset/c542efcf-eaec-4e13-ace0-da1de37af699",
      star: "https://www.figma.com/api/mcp/asset/95afdf40-7ae5-4a55-8405-15485a546146",
      line: "https://www.figma.com/api/mcp/asset/d183e791-7993-4aed-b45c-4beb74dcc761",
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

export default Leaderboard;
