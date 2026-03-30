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
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbUlEQVQ4ja2UPUsDQRCGn7t4SUSwsLGwEIuAhWBhYSFYWPgL/AX+A3+BhYWFhYWFhYWFhaWFhYWggoWghYUgRBFFBSUXz2J3k72928TKYWF3Z955Z3ZnxogIVWDAgIqoeIRYRAQRwSmcBwZSBE7gnxj6QH++MJdAXAvqBkSbALOBc8AusAuYC+cJFoGVQBzRAmsGxIHFGiOYAbYATQHT8FxxApaBScAN2PVBYxFhE7gjLHRDu8Cx/BYwAUwAi8Ar1hMRpSJb3gbNAEPA4cQ3MdDzwm3gJLClwDjwEd2Lk5xPFwGvic+FcWtA7N4OTJwH9jzwC7VCTwDlIvsCLARblcNUJ2MZmE0GUVGCgBLBmpOoZYdWcqJiNIARst7KSqbxEsZTVYD5YDRfFsFtitImKt8D2S9nMfWgXH8YZVFZKRDOuFpK3uSFjKzPPsJvIEtPCtO4Z0r+gUeAVs0fh+MBFd+0wVnlMjLQ8/wE9r1PgH2LXQQAAAABJRU5ErkJggg=="
                alt="WhatsApp"
                style={{ width: "15px", height: "15px", objectFit: "cover" }}
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
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#FFF3D6" />
                  <path d="M27 14H23V16H27C28.65 16 30 17.35 30 19C30 20.65 28.65 22 27 22H23V24H27C29.76 24 32 21.76 32 19C32 16.24 29.76 14 27 14ZM17 22H13C11.35 22 10 20.65 10 19C10 17.35 11.35 16 13 16H17V14H13C10.24 14 8 16.24 8 19C8 21.76 10.24 24 13 24H17V22ZM14 18H26V20H14V18Z" fill="#FEAB27" />
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
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#FFF3D6" />
                  <path d="M24 18C25.66 18 26.99 16.66 26.99 15C26.99 13.34 25.66 12 24 12C22.34 12 21 13.34 21 15C21 16.66 22.34 18 24 18ZM16 18C17.66 18 18.99 16.66 18.99 15C18.99 13.34 17.66 12 16 12C14.34 12 13 13.34 13 15C13 16.66 14.34 18 16 18ZM16 20C13.67 20 9 21.17 9 23.5V26H23V23.5C23 21.17 18.33 20 16 20ZM24 20C23.71 20 23.38 20.02 23.03 20.05C24.19 20.89 25 22.02 25 23.5V26H31V23.5C31 21.17 26.33 20 24 20Z" fill="#FEAB27" />
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
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#FFF3D6" />
                  <path d="M28 13H25.82C25.93 12.69 26 12.35 26 12C26 10.34 24.66 9 23 9C21.95 9 21.04 9.54 20.5 10.35L20 11.02L19.5 10.34C18.96 9.54 18.05 9 17 9C15.34 9 14 10.34 14 12C14 12.35 14.07 12.69 14.18 13H12C10.89 13 10.01 13.89 10.01 15L10 26C10 27.11 10.89 28 12 28H28C29.11 28 30 27.11 30 26V15C30 13.89 29.11 13 28 13ZM23 11C23.55 11 24 11.45 24 12C24 12.55 23.55 13 23 13C22.45 13 22 12.55 22 12C22 11.45 22.45 11 23 11ZM17 11C17.55 11 18 11.45 18 12C18 12.55 17.55 13 17 13C16.45 13 16 12.55 16 12C16 11.45 16.45 11 17 11ZM28 26H12V24H28V26ZM28 21H12V15H17.08L15 17.83L16.62 19L19 15.76L20 14.4L21 15.76L23.38 19L25 17.83L22.92 15H28V21Z" fill="#FEAB27" />
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
