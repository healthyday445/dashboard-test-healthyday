import { LEVEL_REWARDS_V2, getLevelRewardLinkV2 } from "@/components/FourteenDaysV2LevelCard";
import journeyGift from "@/assets/21daysprogram/journey_gift.png";
import journeyStar from "@/assets/21daysprogram/journey_star.png";
import circledPlayButton from "@/assets/21daysprogram/circled_play_button.png";
import downloadIcon from "@/assets/21daysprogram/download_icon.png";
import rewardLvl1 from "@/assets/21daysprogram/reward_lvl1.webp";
import rewardLvl2 from "@/assets/21daysprogram/reward_lvl2.webp";
import rewardLvl4 from "@/assets/21daysprogram/reward_lvl4.webp";
import rewardLvl6 from "@/assets/21daysprogram/reward_lvl6.webp";
import rewardLvl7 from "@/assets/21daysprogram/reward_lvl7.webp";

const REWARD_THUMBS_V2 = [rewardLvl1, rewardLvl2, rewardLvl4, rewardLvl6, rewardLvl7];

const Star = ({ top, left, size, rotate }: { top: string; left: string; size: number; rotate: number }) => (
  <img src={journeyStar} alt="" style={{ position: "absolute", top, left, width: `${size}px`, height: `${size}px`, transform: `rotate(${rotate}deg)`, pointerEvents: "none" }} />
);

interface FourteenDaysV2JourneyCompletedPageProps {
  studentName?: string;
  language?: string;
  joinLink: string;
}

/** "Jagan's Yoga Journey" tab — shown once a student has completed all 14 days; lists every reward, all unlocked. */
export const FourteenDaysV2JourneyCompletedPage: React.FC<FourteenDaysV2JourneyCompletedPageProps> = ({ studentName, language, joinLink }) => {
  const firstName = studentName?.split(" ")[0];

  return (
    <div>
      <div style={{ padding: "24px 20px 32px" }}>
        <div style={{
          position: "relative",
          borderRadius: "20px",
          border: "1px solid #B8B8B8",
          boxShadow: "0px -1px 8px 0px rgba(0,0,0,0.05), 0px 1px 8px 0px rgba(0,0,0,0.05)",
          background: "radial-gradient(130% 130% at 88% 20%, #AFD2FF 0%, #D7E9FF 45%, #FFFFFF 100%)",
          padding: "17px 20px",
          overflow: "hidden",
        }}>
          <p style={{ margin: "0 0 2px", color: "#0A386F", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>
            Hello {firstName || "there"},
          </p>
          <p style={{ margin: "0 0 8px", color: "#0A386F", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700 }}>
            CONGRATULATIONS!
          </p>
          <div style={{ maxWidth: "203px", color: "#000", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, lineHeight: "normal" }}>
            <p style={{ margin: 0 }}>You have completed all the levels in the 14-Days Yoga Program.</p>
            <p style={{ margin: 0 }}>Claim your rewards...</p>
          </div>

          <div style={{ position: "absolute", top: "10px", right: "8px", width: "110px", height: "90px" }}>
            <Star top="0px" left="30px" size={14} rotate={0} />
            <Star top="6px" left="55px" size={14} rotate={-15} />
            <Star top="22px" left="8px" size={14} rotate={20} />
            <Star top="22px" left="75px" size={27} rotate={18} />
            <img src={journeyGift} alt="Gift" style={{ position: "absolute", top: "38px", left: "18px", width: "72px", height: "72px", objectFit: "contain" }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px", color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700 }}>
          Your Rewards <span aria-hidden>🎁</span>
        </h3>

        <div style={{ borderRadius: "9px", border: "1px solid #FFAC4A", background: "#FFF9F2", boxShadow: "-1px -1px 4px 0px rgba(254,150,27,0.15), 1px 1px 4px 0px rgba(254,150,27,0.15)" }}>
          {LEVEL_REWARDS_V2.map((reward, idx) => {
            const level = idx + 1;
            const isLast = idx === LEVEL_REWARDS_V2.length - 1;
            const link = getLevelRewardLinkV2(level, language, studentName, joinLink);
            return (
              <div key={level}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px" }}>
                  <img src={REWARD_THUMBS_V2[idx]} alt="" style={{ width: "64px", height: "35px", borderRadius: "5px", objectFit: "cover", border: "1px solid #FF8A00", flexShrink: 0 }} />
                  <p
                    style={{
                      flex: 1,
                      minWidth: 0,
                      margin: 0,
                      color: "#004394",
                      fontFamily: "Outfit",
                      fontSize: "clamp(11px, 3.1vw, 13px)",
                      fontWeight: 700,
                      lineHeight: "1.3",
                      overflowWrap: "break-word",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {reward.full}
                  </p>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      height: "22px",
                      padding: "0 10px",
                      borderRadius: "5px",
                      background: "#FE961B",
                      boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: isLast ? "10px" : "11px", fontWeight: 700 }}>{isLast ? "Download" : "Join now"}</span>
                    <img src={isLast ? downloadIcon : circledPlayButton} alt="" style={{ width: isLast ? "12px" : "11px", height: isLast ? "12px" : "11px" }} />
                  </a>
                </div>
                {!isLast && <div style={{ height: "1px", background: "#F1DDBF", margin: "0 14px" }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
