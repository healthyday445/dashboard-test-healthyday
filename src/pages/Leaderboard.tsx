import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReferWinCard from "@/components/ReferWinCard";
import logo from "@/assets/Primary_logo.svg";

/* ────────────────────────────────────────────
   Mock leaderboard data — replace with API later
   ──────────────────────────────────────────── */
const MOCK_LEADERBOARD = [
  { rank: 1, name: "T Ravikrishna", referrals: 98 },
  { rank: 2, name: "Sree Lakshmi", referrals: 85 },
  { rank: 3, name: "Padma Devi", referrals: 72 },
  { rank: 4, name: "Venkat Reddy", referrals: 64 },
  { rank: 5, name: "Anjali Kumari", referrals: 58 },
  { rank: 6, name: "Ravi Kumar", referrals: 51 },
  { rank: 7, name: "Sunitha M", referrals: 47 },
  { rank: 8, name: "Priya Sharma", referrals: 43 },
  { rank: 9, name: "Deepak Rao", referrals: 39 },
  { rank: 10, name: "Meena Kumari", referrals: 35 },
];

/* ────────────────────────────────────────────
   SVG Icons
   ──────────────────────────────────────────── */
const BackArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M8 21H16M12 17V21M6 3H18L17 10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10L6 3Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 4H4C3 4 2 5 2 6C2 7 3 9 5 9M18 4H20C21 4 22 5 22 6C22 7 21 9 19 9" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ────────────────────────────────────────────
   Prize Tier images (from /public/leaderboard/)
   ──────────────────────────────────────────── */
const PRIZE_IMAGES = {
  tier1: "/leaderboard/03fe32d52d733d7264af16fa1a873079ffdb9919.png",
  tier2: "/leaderboard/a999ad5d053fb10e4399ce1c16a6647a5e72b054.png",
  tier3: "/leaderboard/a623655ba98def85f08fd93b110d719415c6fc2e.png",
};

const BANNER_BG = "/leaderboard/11621406ee6eb5f29bb80937e33d2195815c78d8.png";
const MAIN_PRIZE_IMG = "/leaderboard/0d0feb7c046d1e7737d4d7000c10d1cf68d8865c.png";

/* ────────────────────────────────────────────
   Leaderboard Page Component
   ──────────────────────────────────────────── */
const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { mobile: pathMobile } = useParams<{ mobile: string }>();
  const mobile = pathMobile || "";

  const shareLink = mobile
    ? `https://yoga.healthyday.co.in?ref=${mobile}`
    : "https://yoga.healthyday.co.in?ref=demo";
  const referralsUrl = mobile ? `/${mobile}/referrals/0` : "/referral-status";

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
          width: "100%",
          maxWidth: "360px",
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
          width: "360px",
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
          width: "360px",
          height: "30px",
          borderRadius: "5px",
          background: "#FFE8CD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
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
            From 1st JUNE to 30th JUNE
          </span>
        </span>
      </div>

      {/* ═══════════════════════════════════════
          PRIZE TIERS — 3 columns
         ═══════════════════════════════════════ */}
      <div
        style={{
          width: "360px",
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
          CURRENT USER RANK
         ═══════════════════════════════════════ */}
      <CurrentUserRankCard />

      {/* ═══════════════════════════════════════
          REFER & WIN BUTTON
         ═══════════════════════════════════════ */}
      <button
        onClick={() => {
          const msg = encodeURIComponent(
            `Join me on Healthyday! ${shareLink}`
          );
          window.open(`https://wa.me/?text=${msg}`, "_blank");
        }}
        style={{
          width: "343px",
          height: "40px",
          borderRadius: "30px",
          background: "#FEAB27",
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
          border: "none",
          cursor: "pointer",
          marginTop: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#202020",
            textAlign: "center",
            fontFamily: "Outfit",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            textTransform: "uppercase",
          }}
        >
          Refer &amp; Win yoga kit
        </span>
      </button>

      {/* ═══════════════════════════════════════
          LEADERBOARD SECTION
         ═══════════════════════════════════════ */}
      <div
        style={{
          width: "360px",
          borderRadius: "12px",
          border: "1.5px solid #FEAB27",
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
          marginTop: "18px",
          padding: "16px 12px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "4px",
          }}
        >
          <TrophyIcon />
          <span
            style={{
              color: "#FFF",
              fontFamily: "Outfit",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            Leaderboard
          </span>
        </div>

        {/* Mini column headers */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4px",
            marginBottom: "2px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Outfit",
              fontSize: "11px",
              fontWeight: 500,
            }}
          >
            Rank
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Outfit",
              fontSize: "11px",
              fontWeight: 500,
            }}
          >
            Referrals
          </span>
        </div>

        {MOCK_LEADERBOARD.map((entry) => (
          <LeaderboardRow key={entry.rank} {...entry} />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM — Golden sheet with ReferWinCard
         ═══════════════════════════════════════ */}
      <div
        style={{
          width: "412px",
          borderRadius: "32px 32px 0 0",
          border: "1px solid #FEAB27",
          borderBottom: "none",
          background: "#FFE5BA",
          marginTop: "24px",
          padding: "28px 34px 40px 35px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <ReferWinCard shareLink={shareLink} referralsUrl={referralsUrl} />
      </div>
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
  referrals: number;
}> = ({ rank, name, referrals }) => (
  <div
    style={{
      width: "100%",
      height: "48px",
      borderRadius: "12px",
      background: "#FFF",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      boxSizing: "border-box",
      gap: "10px",
    }}
  >
    {/* Rank badge */}
    <div
      style={{
        width: "28px",
        height: "28px",
        aspectRatio: "1/1",
        borderRadius: "5px",
        background: "#FEAB27",
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
          fontStyle: "normal",
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
        color: "#0D468B",
        fontFamily: "Outfit",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>

    {/* Referral count */}
    <span
      style={{
        color: "#0D468B",
        textAlign: "right",
        fontFamily: "Outfit",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 300,
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
const CurrentUserRankCard: React.FC = () => {
  return (
    <div
      style={{
        width: "360px",
        height: "123px",
        borderRadius: "12px",
        border: "1.5px solid #FEAB27",
        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0D468B",
        position: "relative",
        marginTop: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Left side texts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: "18px",
              height: "16px",
              backgroundImage: "url(/leaderboard/d8c04109d0b7e7d179eedceade5572244f039058.png)",
              backgroundSize: "contain",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
            }}
          />
          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 400, lineHeight: "normal" }}>
            Great job!
          </span>
        </div>
        
        <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal" }}>
          You’re in <span style={{ color: "#FEAB27" }}>TOP 25 !</span>
        </span>
        
        <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 400, width: "166px", marginTop: "2px", lineHeight: "normal" }}>
          Keep referring and stay at the top till June 30th.
        </span>

        {/* Total Referrals Badge */}
        <div
          style={{
            width: "121px",
            height: "23px",
            borderRadius: "6px",
            background: "#365B88",
            boxShadow: "1px 1px 1px 0 rgba(255, 255, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            padding: "0 6px",
            gap: "6px",
            marginTop: "6px",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              position: "relative",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ position: "absolute", left: 0, top: 0 }}>
              <circle cx="7.5" cy="7.5" r="7.5" fill="#FEAB27"/>
            </svg>
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "10.385px", height: "10.962px",
              backgroundImage: "url(/leaderboard/eeef30852c9e8a5d9b0eedd75392aa12539c4ce5.png)",
              backgroundSize: "contain",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat"
            }} />
          </div>
          <span style={{ color: "#D2D2D2", fontFamily: "Outfit", fontSize: "8px", fontWeight: 500, lineHeight: "normal", flex: 1 }}>
            Total Referrals
          </span>
          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, lineHeight: "normal" }}>
            88
          </span>
        </div>
      </div>

      {/* Right side Badge */}
      <div style={{ position: "relative", width: "85.954px", height: "84px", zIndex: 2, marginRight: "8px" }}>
        {/* Glow behind the badge */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "50%",
            height: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            boxShadow: "0 0 250px 0 rgba(255, 234, 199, 0.80), 0 0 166.32px 0 rgba(255, 234, 199, 0.80), 0 0 83.16px 0 rgba(255, 234, 199, 0.80), 0 0 23.76px 0 rgba(255, 234, 199, 0.80), 0 0 11.88px 0 rgba(255, 234, 199, 0.80)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/leaderboard/ca43f854ecd5ab3cd7e14fec2e140210244d902d.png)",
            backgroundSize: "139.424% 100%",
            backgroundPosition: "-16.943px 0px",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "14px", // Adjust to center the text in the badge
          }}
        >
          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "22px", fontWeight: 800, lineHeight: "normal" }}>
            6
          </span>
        </div>
      </div>

      {/* Confetti Backgrounds */}
      <div
        style={{
          position: "absolute",
          top: "-5px",
          right: "75px",
          width: "58.902px",
          height: "83.609px",
          transform: "rotate(-144.816deg)",
          backgroundImage: "url(/leaderboard/226805aeb355248ebac39e293e844975a3b6fada.png)",
          backgroundSize: "242.952% 164.377%",
          backgroundPosition: "-121.696px -40.227px",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "45px",
          left: "210px",
          width: "47.675px",
          height: "36.475px",
          transform: "rotate(39.729deg)",
          backgroundImage: "url(/leaderboard/confetti.png)",
          backgroundSize: "361.562% 522.221%",
          backgroundPosition: "-88.083px -79.919px",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "15px",
          width: "41.966px",
          height: "60.769px",
          transform: "rotate(-90.317deg)",
          backgroundImage: "url(/leaderboard/confetti\\ (1).png)",
          backgroundSize: "494.772% 380.013%",
          backgroundPosition: "-143.092px -26.872px",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "170px",
          width: "56.964px",
          height: "61.084px",
          transform: "rotate(-124.681deg)",
          backgroundImage: "url(/leaderboard/226805aeb355248ebac39e293e844975a3b6fada\\ (1).png)",
          backgroundSize: "364.5% 378.052%",
          backgroundPosition: "-197.338px -173.409px",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Leaderboard;
