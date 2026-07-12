import { LEVEL_REWARDS, getLevelRewardLink, LevelCard } from "@/components/LevelCard";
import circledPlayButton from "@/assets/21daysprogram/circled_play_button.png";
import downloadIcon from "@/assets/21daysprogram/download_icon.png";
import rewardLvl1 from "@/assets/21daysprogram/reward_lvl1.webp";
import rewardLvl2 from "@/assets/21daysprogram/reward_lvl2.webp";
import rewardLvl3 from "@/assets/21daysprogram/reward_lvl3.webp";
import rewardLvl4 from "@/assets/21daysprogram/reward_lvl4.webp";
import rewardLvl5 from "@/assets/21daysprogram/reward_lvl5.webp";
import rewardLvl6 from "@/assets/21daysprogram/reward_lvl6.webp";
import rewardLvl7 from "@/assets/21daysprogram/reward_lvl7.webp";

const REWARD_THUMBS = [rewardLvl1, rewardLvl2, rewardLvl3, rewardLvl4, rewardLvl5, rewardLvl6, rewardLvl7];

interface YogaJourneyCompletedPageProps {
  studentName?: string;
  language?: string;
  joinLink: string;
  onCertificateClick?: () => void;
}

/** "Jagan's Yoga Journey" tab — shown once a student has completed all 21 days; lists every reward, all unlocked. */
export const YogaJourneyCompletedPage: React.FC<YogaJourneyCompletedPageProps> = ({ studentName, language, joinLink, onCertificateClick }) => {
  return (
    <div>
      {/* Level card — pinned to the fully-unlocked (day 22) state now that all levels are completed */}
      <div style={{ padding: "24px 20px 32px" }}>
        <LevelCard
          freeDaysAttended={22}
          studentName={studentName}
          joinLink={joinLink}
          language={language}
          onCertificateClick={onCertificateClick}
        />
      </div>

      {/* Your Rewards */}
      <div style={{ padding: "0 20px" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px", color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700 }}>
          Your Rewards <span aria-hidden>🎁</span>
        </h3>

        <div style={{ borderRadius: "9px", border: "1px solid #FFAC4A", background: "#FFF9F2", boxShadow: "-1px -1px 4px 0px rgba(254,150,27,0.15), 1px 1px 4px 0px rgba(254,150,27,0.15)" }}>
          {LEVEL_REWARDS.map((reward, idx) => {
            const level = idx + 1;
            const isLast = idx === LEVEL_REWARDS.length - 1;
            const link = getLevelRewardLink(level, language, studentName, joinLink);
            return (
              <div key={level}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px" }}>
                  <img src={REWARD_THUMBS[idx]} alt="" style={{ width: "64px", height: "35px", borderRadius: "5px", objectFit: "cover", border: "1px solid #FF8A00", flexShrink: 0 }} />
                  <p style={{ flex: 1, margin: 0, color: "#004394", fontFamily: "Outfit", fontSize: "13px", fontWeight: 700 }}>{reward.full}</p>
                  {isLast && onCertificateClick ? (
                    <button
                      type="button"
                      onClick={onCertificateClick}
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        height: "22px",
                        padding: "0 10px",
                        borderRadius: "5px",
                        background: "#FE961B",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0px 0px 8px 1px rgba(0,0,0,0.05)",
                      }}
                    >
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 700 }}>Download</span>
                      <img src={downloadIcon} alt="" style={{ width: "12px", height: "12px" }} />
                    </button>
                  ) : (
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
                  )}
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
