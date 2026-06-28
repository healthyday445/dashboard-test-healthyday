import { useNavigate, useParams } from "react-router-dom";
import headerDaysIcon from "@/assets/header_days_icon.webp";
import headerYogaKit from "@/assets/header_yoga_kit.webp";

interface HeaderDaysLeftProps {
  daysLeft: number;
}

const HeaderDaysLeft = ({ daysLeft }: HeaderDaysLeftProps) => {
  const navigate = useNavigate();
  const { mobile } = useParams<{ mobile: string }>();
  const isLastDay = daysLeft === 0;

  return (
    <div
      onClick={() => navigate(`/${mobile}/leaderboard`)}
      style={{ marginLeft: "auto", display: "flex", alignItems: "center", flexShrink: 0, width: "fit-content", cursor: "pointer" }}
    >
      {/* Orange gradient pill */}
      <div style={{
        position: "relative",
        width: isLastDay ? "119px" : "119px",
        height: "37px",
        borderRadius: "8px",
        background: "linear-gradient(90deg, #ffd182 0%, #ff8a00 100%)",
        borderTop: "0.75px solid #ededed",
        borderRight: "0.5px solid #ededed",
        borderBottom: "0.5px solid #ededed",
        borderLeft: "0.5px solid #ededed",
        boxShadow: "-1px 1px 5px 0px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}>
        {isLastDay ? (
          /* ENDS TODAY — no calendar icon, text left-aligned with padding, right padding clears the avatar overlap */
          <span style={{
            color: "#043a7b",
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "Outfit, sans-serif",
            whiteSpace: "nowrap",
            letterSpacing: "0.02em",
            paddingLeft: "10px",
            paddingRight: "22px",
          }}>
            ENDS TODAY
          </span>
        ) : (
          <>
            {/* Calendar icon with day number overlaid */}
            <div style={{
              position: "relative",
              width: "34px",
              height: "34px",
              flexShrink: 0,
              marginLeft: "4px",
            }}>
              <img
                src={headerDaysIcon}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <span style={{
                marginTop: "4px",
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00316c",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "Outfit, sans-serif",
              }}>
                {daysLeft}
              </span>
            </div>

            {/* "Days Left" label */}
            <span style={{
              color: "#043a7b",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "Outfit, sans-serif",
              marginLeft: "4px",
              whiteSpace: "nowrap",
            }}>
              Days Left
            </span>
          </>
        )}
      </div>

      {/* Yoga avatar — overlaps pill's right edge by 19px */}
      <div style={{
        marginLeft: "-1.1875rem",
        width: "2.75rem",
        height: "2.75rem",
        position: "relative",
        flexShrink: 0,
        zIndex: 1,
      }}>
        {/* Outer white circle */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 5px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.08)",
        }} />
        {/* Inner orange circle (#FFE7CB) */}
        <div style={{
          position: "absolute",
          top: "0.1875rem",
          left: "0.1875rem",
          width: "2.375rem",
          height: "2.375rem",
          borderRadius: "50%",
          background: "#FFE7CB",
        }} />
        {/* Yoga kit (593:5605): 2.5rem container, image at 125% width with −12.5% left offset */}
        <div style={{
          position: "absolute",
          top: "0.12rem",
          left: "0.12rem",
          width: "2.5rem",
          height: "2.5rem",
          overflow: "hidden",
        }}>
          <img
            src={headerYogaKit}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
              width: "125%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderDaysLeft;
