import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

const Referral = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referralCount = Number(searchParams.get("count")) || Number(sessionStorage.getItem("total_referral_count")) || 0;
  const referrerMobile = searchParams.get("mobile") || sessionStorage.getItem("referrer_mobile") || "";
  const [copied, setCopied] = useState(false);

  const shareLink = referrerMobile
    ? `https://healthyday.co.in/free-programmes?ref=91${referrerMobile}`
    : "healthyday.app/ref=ggtujev58";

  const displayLink = "healthyday.app/ref=ggtujev58";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Join me on Healthyday! Use my referral link: ${shareLink}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div
      className="mx-auto w-[412px] min-h-screen"
      style={{ fontFamily: "Outfit, sans-serif", background: "#FFF" }}
    >
      {/* Header */}
      <header
        className="flex w-[412px] h-[68px] items-center"
        style={{
          padding: "20px",
          background: "#FFF",
          boxShadow: "0 4px 30px 0 rgba(0,0,0,0.10)",
        }}
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

      {/* Main Content */}
      <div style={{ padding: "24px 20px 0" }}>
        {/* Blue Share Card */}
        <div
          style={{
            width: "360px",
            borderRadius: "16px",
            background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
            boxShadow: "0 0 10px rgba(0,0,0,0.25)",
            padding: "26px 19px",
            boxSizing: "border-box",
          }}
        >
          {/* Share this link label */}
          <div
            style={{
              color: "#FFF",
              fontFamily: "Outfit",
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "11px",
            }}
          >
            Share this link
          </div>

          {/* Link input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "8px",
              background: "#FFF",
              border: "1.2px solid #B4B4B4",
              padding: "9px 12px 11px 18px",
              marginBottom: "16px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                color: "#8E8E8E",
                fontFamily: "Outfit",
                fontSize: "15px",
                fontWeight: 400,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {displayLink}
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
                flexShrink: 0,
                marginLeft: "8px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>

          {/* Buttons Row */}
          <div style={{ display: "flex", gap: "12px" }}>
            {/* Copy Link Button */}
            <button
              onClick={handleCopy}
              style={{
                flex: 1,
                height: "40px",
                borderRadius: "10px",
                background: "#FEAB27",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <g clipPath="url(#clip0_copy)">
                  <path d="M6.49744 4.3332C5.58188 4.14913 4.63123 4.27241 3.79274 4.68395C2.95425 5.0955 2.27469 5.77233 1.85933 6.60964C1.44396 7.44695 1.31596 8.39801 1.49515 9.31552C1.67434 10.233 2.15073 11.0658 2.85052 11.6848C3.55031 12.3039 4.43447 12.6746 5.36605 12.7397C6.29763 12.8048 7.22465 12.5605 8.00354 12.0448C8.78243 11.5291 9.36972 10.7706 9.67446 9.8869C9.9792 9.0032 9.98438 8.04356 9.6892 7.15662M10.481 12.6674C11.3975 12.8525 12.3494 12.7294 13.1889 12.3173C14.0284 11.9053 14.7086 11.2273 15.1238 10.3887C15.539 9.55001 15.666 8.59759 15.4852 7.67925C15.3043 6.76091 14.8257 5.92803 14.1236 5.30989C13.4215 4.69175 12.5352 4.32294 11.6023 4.2607C10.6694 4.19846 9.74209 4.44628 8.96427 4.96569C8.18646 5.4851 7.60168 6.24704 7.30071 7.13324C6.99975 8.01943 6.99943 8.98031 7.29982 9.8667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_copy">
                    <rect width="16.9812" height="17" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span
                style={{
                  color: "#FFF",
                  fontFamily: "Outfit",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>

            {/* Share on WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              style={{
                flex: 1,
                height: "40px",
                borderRadius: "10px",
                background: "#57D063",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <img
                src="/image 1.png"
                alt="WhatsApp"
                style={{ width: "15px", height: "15px", aspectRatio: "1/1", objectFit: "cover" }}
              />
              <span
                style={{
                  color: "#FFF",
                  fontFamily: "Outfit",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Share on Whatsapp
              </span>
            </button>
          </div>
        </div>

        {/* How to refer? Section */}
        <div style={{ marginTop: "40px", padding: "0 0px" }}>
          <h3
            style={{
              color: "#202020",
              fontFamily: "Outfit",
              fontSize: "24px",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "24px",
              margin: "0 0 24px 0",
            }}
          >
            How to refer?
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {/* Step 1 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "23px" }}>
              <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle opacity="0.4" cx="20" cy="20" r="20" fill="#FEAB27"/>
                  <path d="M16.0001 22.0009L22.0001 16.0009M18.0001 13.0009L18.4631 12.4649C18.9274 12.0005 19.4787 11.6321 20.0854 11.3807C20.6921 11.1294 21.3424 11 21.9991 11C22.6558 11 23.3061 11.1294 23.9128 11.3807C24.5196 11.6321 25.0708 12.0005 25.5351 12.4649C26.0003 12.9288 26.3694 13.48 26.6212 14.0868C26.873 14.6936 27.0026 15.3442 27.0025 16.0011C27.0024 16.6581 26.8726 17.3086 26.6207 17.9154C26.3687 18.5221 25.9995 19.0732 25.5341 19.5369M19.6031 25.5349C18.6541 26.4727 17.3738 26.9985 16.0396 26.9985C14.7055 26.9985 13.4251 26.4727 12.4761 25.5349C12.0085 25.0725 11.6372 24.522 11.3839 23.9151C11.1305 23.3082 11 22.6571 11 21.9994C11 21.3418 11.1305 20.6907 11.3839 20.0838C11.6372 19.4769 12.0085 18.9263 12.4761 18.4639L13.0001 18.0009M23.0001 26.0009H29.0001M26.0001 23.0009V29.0009" stroke="#FEAB27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1, paddingTop: "2px" }}>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontWeight: 600,
                    background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Forward your link
                </div>
                <div
                  style={{
                    color: "#8C8C8C",
                    fontFamily: "Outfit",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginTop: "1px",
                  }}
                >
                  Send your unique link to your family & friends
                </div>
              </div>
            </div>

            {/* Line 1 */}
            <div style={{ paddingLeft: "19px", height: "45px", display: "flex", alignItems: "flex-start" }}>
              <div style={{ width: "3px", height: "48px", borderRight: "3px solid #BFBFBF", boxSizing: "border-box" }} />
            </div>

            {/* Step 2 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "23px" }}>
              <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle opacity="0.4" cx="20" cy="20" r="20" fill="#FEAB27"/>
                  <g transform="translate(10.75, 10.75)">
                    <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="#FEAB27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <div style={{ flex: 1, paddingTop: "2px" }}>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontWeight: 600,
                    background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Friends Register
                </div>
                <div
                  style={{
                    color: "#8C8C8C",
                    fontFamily: "Outfit",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginTop: "1px",
                  }}
                >
                  Ask them to register for the next FREE Batch
                </div>
              </div>
            </div>

            {/* Line 2 */}
            <div style={{ paddingLeft: "19px", height: "45px", display: "flex", alignItems: "flex-start" }}>
              <div style={{ width: "3px", height: "48px", borderRight: "3px solid #BFBFBF", boxSizing: "border-box" }} />
            </div>

            {/* Step 3 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "23px" }}>
              <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle opacity="0.4" cx="20" cy="20" r="20" fill="#FEAB27"/>
                  <g transform="translate(10.75, 10.75)">
                    <path d="M9.25 5.69472V17.25M9.25 5.69472C8.92847 4.36978 8.37484 3.23706 7.66132 2.44428C6.9478 1.6515 6.1075 1.23545 5.25 1.25039C4.66063 1.25039 4.0954 1.48451 3.67865 1.90125C3.2619 2.31798 3.02778 2.8832 3.02778 3.47256C3.02778 4.06191 3.2619 4.62713 3.67865 5.04387C4.0954 5.46061 4.66063 5.69473 5.25 5.69473M9.25 5.69472C9.57153 4.36978 10.1252 3.23706 10.8387 2.44428C11.5522 1.6515 12.3925 1.23545 13.25 1.25039C13.8394 1.25039 14.4046 1.48451 14.8213 1.90125C15.2381 2.31798 15.4722 2.8832 15.4722 3.47256C15.4722 4.06191 15.2381 4.62713 14.8213 5.04387C14.4046 5.46061 13.8394 5.69473 13.25 5.69473M15.4722 9.25019V15.4723C15.4722 15.9437 15.2849 16.3959 14.9515 16.7293C14.6181 17.0627 14.1659 17.25 13.6944 17.25H4.80556C4.33406 17.25 3.88187 17.0627 3.54848 16.7293C3.21508 16.3959 3.02778 15.9437 3.02778 15.4723V9.25019M1.25 6.58359C1.25 6.34784 1.34365 6.12176 1.51035 5.95506C1.67705 5.78837 1.90314 5.69472 2.13889 5.69472H16.3611C16.5969 5.69472 16.823 5.78837 16.9897 5.95506C17.1564 6.12176 17.25 6.34784 17.25 6.58359V8.36132C17.25 8.59706 17.1564 8.82315 16.9897 8.98985C16.823 9.15654 16.5969 9.25019 16.3611 9.25019H2.13889C1.90314 9.25019 1.67705 9.15654 1.51035 8.98985C1.34365 8.82315 1.25 8.59706 1.25 8.36132V6.58359Z" stroke="#FEAB27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <div style={{ flex: 1, paddingTop: "2px" }}>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontWeight: 600,
                    background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Win FREE Classes & Gifts
                </div>
                <div
                  style={{
                    color: "#8C8C8C",
                    fontFamily: "Outfit",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginTop: "1px",
                  }}
                >
                  Get 10 FREE Classes on first 5 Referrals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refer and Win Bottom Section */}
      <div
        style={{
          padding: "31px 20px 98px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#FFF5E5" />
          <path d="M33.2979 32.2937H37.8857H33.2979Z" fill="#FEAB27" />
          <path d="M35.5918 30V34.5875V30Z" fill="#FEAB27" />
          <path d="M50.502 30L49.3551 34.5875L50.502 30Z" fill="#FEAB27" />
          <path d="M65.4122 32.2937H70H65.4122Z" fill="#FEAB27" />
          <path d="M67.7061 30V34.5875V30Z" fill="#FEAB27" />
          <path d="M58.5306 41.4687L56.2367 43.7625L58.5306 41.4687Z" fill="#FEAB27" />
          <path d="M65.4122 50.6437L70 49.4968L65.4122 50.6437Z" fill="#FEAB27" />
          <path d="M65.4122 64.4062H70H65.4122Z" fill="#FEAB27" />
          <path d="M67.7061 62.1124V66.6999V62.1124Z" fill="#FEAB27" />
          <path d="M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" fill="#FEAB27" />
          <path d="M33.2979 32.2937H37.8857M35.5918 30V34.5875M50.502 30L49.3551 34.5875M65.4122 32.2937H70M67.7061 30V34.5875M58.5306 41.4687L56.2367 43.7625M65.4122 50.6437L70 49.4968M65.4122 64.4062H70M67.7061 62.1124V66.6999M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>
          <b
            style={{
              color: "#000",
              fontFamily: "Outfit",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "normal",
            }}
          >
            Refer and Win!
          </b>
          <div
            style={{
              color: "#ADADAD",
              fontFamily: "Outfit",
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "normal",
              textAlign: "center",
              width: "286px",
            }}
          >
            Every active referral earn gifts and rewards for you
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
