import React, { useState } from "react";
import logo from "@/assets/Primary_logo.svg";
import { formatOrdinalDate, daysUntil } from "@/lib/planRenewal";

/**
 * Full-page dashboard shown when status === "paid" && subscription_status === "paused".
 * `current_plan` is null while paused, so this screen deliberately never reads it —
 * only `resume_date` drives the copy.
 */

interface SubscriptionPausedScreenProps {
  studentData: any;
}

const SUPPORT_WHATSAPP = "919052888968";

const COPY = {
  English: {
    resumesOn: (dateLabel: string) => `Resumes automatically on ${dateLabel}`,
    points: [
      "This paused duration is not counted in your Subscription",
      "Your classes will resume automatically post the date mentioned above",
      "Want to resume sooner? Just click the button below and restart your classes right away",
    ],
    resumeButton: "Resume My Classes Now",
    resuming: "Resuming...",
    resumeError: "Couldn't resume your subscription. Please try again or contact support.",
    contactSupport: "Contact Support",
  },
  Telugu: {
    resumesOn: (dateLabel: string) => `${dateLabel} నుండీ మీ subscription మళ్ళీ continue అవుతుంది`,
    points: [
      "ఈ pause చేసిన duration మీ Subscription లో count అవ్వదు.",
      "పైన mention చేసిన date తర్వాత మీ classes automatically resume అవుతాయి.",
      "ముందుగానే resume చేయాలనుకున్నా, కింద ఉన్న button పై click చేసి వెంటనే మీ yoga classes restart చేయొచ్చు",
    ],
    resumeButton: "ఇప్పుడే నా Classes Resume చేయండి",
    resuming: "Resume అవుతోంది...",
    resumeError: "Subscription resume అవ్వలేదు. మళ్ళీ try చేయండి లేదా మా Support Team ని contact చేయండి.",
    contactSupport: "Support ని సంప్రదించండి",
  },
} as const;

const SubscriptionPausedScreen: React.FC<SubscriptionPausedScreenProps> = ({ studentData }) => {
  const [isResuming, setIsResuming] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const language: "English" | "Telugu" = studentData?.language === "English" ? "English" : "Telugu";
  const copy = COPY[language];

  const resumeDateRaw: string | undefined = studentData?.resume_date;
  const resumeDateLabel = resumeDateRaw ? formatOrdinalDate(resumeDateRaw) : "";
  const remainingDays = resumeDateRaw ? daysUntil(resumeDateRaw) : null;

  const handleContactSupport = () => {
    const message = "Hi! I am unable to resume my subscription. Can you please help?";
    window.open(`https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleResumeNow = async () => {
    if (!studentData?.mobile || isResuming) return;
    setIsResuming(true);
    try {
      const response = await fetch("/.netlify/functions/resume-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: studentData.mobile }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("resume-subscription failed:", response.status, errorText);
        setShowErrorPopup(true);
        setIsResuming(false);
        return;
      }
      window.location.reload();
    } catch (err) {
      console.error("resume-subscription error:", err);
      setShowErrorPopup(true);
      setIsResuming(false);
    }
  };

  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* SUBSCRIPTION PAUSED badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          width: "fit-content",
          height: "30px",
          borderRadius: "40px",
          border: "0.25px solid #E3B57A",
          background: "#FFF4E5",
          padding: "0 14px",
          marginTop: "20px",
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" rx="1" fill="#A96A0A" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="#A96A0A" />
          </svg>
          <span style={{
            color: "#A96A0A",
            fontFamily: "Outfit",
            fontSize: "11px",
            fontWeight: 800,
            lineHeight: "22px",
            letterSpacing: "0.88px",
          }}>
            SUBSCRIPTION PAUSED
          </span>
        </div>

        {/* Paused plan card */}
        <div style={{
          width: "100%",
          maxWidth: "357px",
          borderRadius: "10px",
          border: "1px solid #E3B57A",
          background: "#FFF9F0",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "6px",
          marginTop: "20px",
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "6px" }}>
            <circle cx="12" cy="12" r="11" stroke="#FE961B" strokeWidth="1.5" />
            <rect x="9" y="8" width="2.2" height="8" rx="1" fill="#FE961B" />
            <rect x="12.8" y="8" width="2.2" height="8" rx="1" fill="#FE961B" />
          </svg>

          <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "20px", fontWeight: 600, lineHeight: "normal" }}>
            Your Yoga Plan is Paused
          </span>

          {resumeDateLabel && (
            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>
              {copy.resumesOn(resumeDateLabel)}
            </span>
          )}

          {remainingDays !== null && remainingDays >= 0 && (
            <span style={{ color: "#7C7B7B", fontFamily: "Outfit", fontSize: "13px", fontWeight: 500 }}>
              {remainingDays === 0 ? "Today" : remainingDays === 1 ? "1 day to go" : `${remainingDays} days to go`}
            </span>
          )}
        </div>

        {/* What happens next */}
        <div style={{
          width: "100%",
          maxWidth: "357px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}>
          {copy.points.map((line: string, i: number) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#FE961B", marginTop: "7px", flexShrink: 0,
              }} />
              <span style={{ color: "#3D3D3D", fontFamily: "Outfit", fontSize: "13px", fontWeight: 500, lineHeight: "19px" }}>
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Resume now CTA */}
        <button
          onClick={handleResumeNow}
          disabled={isResuming}
          style={{
            marginTop: "28px",
            width: "100%",
            maxWidth: "357px",
            height: "48px",
            borderRadius: "12px",
            border: "none",
            background: isResuming ? "#8FBF9F" : "#178541",
            color: "#fff",
            fontFamily: "Outfit",
            fontSize: "15px",
            fontWeight: 700,
            cursor: isResuming ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {isResuming ? copy.resuming : copy.resumeButton}
        </button>

        {/* Contact support CTA */}
        <button
          onClick={handleContactSupport}
          style={{
            marginTop: "12px",
            marginBottom: "40px",
            width: "100%",
            maxWidth: "357px",
            height: "48px",
            borderRadius: "12px",
            border: "1.5px solid #178541",
            background: "#fff",
            color: "#178541",
            fontFamily: "Outfit",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {copy.contactSupport}
        </button>
      </div>

      {showErrorPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setShowErrorPopup(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              fontFamily: "Outfit, sans-serif",
              padding: "28px 24px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowErrorPopup(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "none",
                background: "#F2F2F2",
                color: "#555",
                fontSize: "16px",
                lineHeight: "28px",
                cursor: "pointer",
                padding: 0,
              }}
            >
              ✕
            </button>

            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="#D70000" strokeWidth="1.5" />
              <path d="M12 7v6M12 16.5h.01" stroke="#D70000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <span style={{ color: "#000", fontSize: "15px", fontWeight: 500, lineHeight: "22px" }}>
              {copy.resumeError}
            </span>

            <button
              onClick={handleContactSupport}
              style={{
                width: "100%",
                height: "46px",
                borderRadius: "12px",
                border: "none",
                background: "#178541",
                color: "#fff",
                fontFamily: "Outfit",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {copy.contactSupport}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPausedScreen;
