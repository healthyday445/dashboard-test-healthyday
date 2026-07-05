import { useNavigate } from "react-router-dom";
import referWinIcon from "@/assets/referral/refer_win_icon.svg";

interface ReferAndWinTeaserProps {
  referralsUrl: string;
}

/** Bottom-of-page teaser linking to the referrals page — icon + "Refer and Win!" + subtext. */
export const ReferAndWinTeaser: React.FC<ReferAndWinTeaserProps> = ({ referralsUrl }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(referralsUrl)}
      style={{ padding: "40px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", cursor: "pointer" }}
    >
      <img src={referWinIcon} alt="" style={{ width: "100px", height: "100px" }} />
      <p style={{ margin: 0, fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, color: "#000" }}>
        Refer and Win!
      </p>
      <p style={{ margin: 0, maxWidth: "286px", textAlign: "center", fontFamily: "Outfit", fontSize: "18px", fontWeight: 500, color: "#ADADAD" }}>
        Every active referral earn gifts and rewards for you
      </p>
    </div>
  );
};
