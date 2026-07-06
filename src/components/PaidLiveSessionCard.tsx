import { trackSessionClick } from "@/lib/trackSessionClick";
import NoSessionsCard from "@/components/NoSessionsCard";
import imgLanguageEnglish from "@/assets/language_English.webp";
import imgLanguageTelugu from "@/assets/language_Telugu.webp";

const PlayButton = () => (
  <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68" height="48" rx="14" fill="#FF0000" fillOpacity="0.95" />
    <path d="M45 24L28 34V14L45 24Z" fill="white" />
  </svg>
);

interface PaidLiveSessionCardProps {
  isLive: boolean;
  totalMin: number;
  sessionThumbnail: string;
  sessionVideoId: string | null;
  apiSessionName: string | null;
  paidJoinLink: string;
  sessionCodeForNow: "daily_morning" | "daily_evening";
  language?: string;
  mobile?: string;
}

/** The regular (non-bonus) daily session card — live video + JOIN button, or NoSessionsCard when nothing's on. */
export const PaidLiveSessionCard: React.FC<PaidLiveSessionCardProps> = ({
  isLive,
  totalMin,
  sessionThumbnail,
  apiSessionName,
  paidJoinLink,
  sessionCodeForNow,
  language,
  mobile,
}) => {
  const handleClick = () => trackSessionClick(mobile, sessionCodeForNow);

  if (!isLive) {
    return (
      <div style={{ padding: "24px 20px 0" }}>
        <NoSessionsCard totalMin={totalMin} />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 20px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, margin: 0 }}>
          Your Yoga Session
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", borderRadius: "60px", background: "#FFD3D3", padding: "4px 10px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E02F2F" }} />
          <span style={{ color: "#E02F2F", fontFamily: "Outfit", fontSize: "13px", fontWeight: 700 }}>LIVE</span>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <a href={paidJoinLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ display: "block", textDecoration: "none" }}>
          <div style={{
            width: "100%", aspectRatio: "178/93", borderRadius: "12px 12px 0 0",
            overflow: "hidden",
            boxShadow: "1px 0 4px 0 rgba(0,0,0,0.25), -1px -1px 4px 0 rgba(0,0,0,0.25)",
            position: "relative",
          }}>
            <img
              src={sessionThumbnail}
              alt={apiSessionName || "Yoga Session"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onLoad={(e) => {
                // YouTube serves a tiny 120x90 gray placeholder with an HTTP 404 when no
                // thumbnail exists for a video — the browser treats that as a successful
                // load, so onError never fires. Catch it here by its telltale small size.
                const img = e.target as HTMLImageElement;
                const fallback = language === "English" ? imgLanguageEnglish : imgLanguageTelugu;
                if (img.naturalWidth <= 120 && img.src !== fallback) {
                  img.src = fallback;
                }
              }}
              onError={(e) => {
                // Guard against retrying the same URL forever if the fallback itself is unreachable.
                const img = e.target as HTMLImageElement;
                const fallback = language === "English" ? imgLanguageEnglish : imgLanguageTelugu;
                if (img.src !== fallback) img.src = fallback;
              }}
            />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "12px 12px 0 0", background: "rgba(0,0,0,0.32)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlayButton />
            </div>
            {apiSessionName && (
              <div style={{
                position: "absolute", bottom: "10px", left: "12px", right: "12px",
                color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700,
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}>
                {apiSessionName}
              </div>
            )}
          </div>
        </a>
        <div style={{
          width: "100%", height: "67px", borderRadius: "0 0 12px 12px",
          border: "1.5px solid #E9E9E9", background: "#FFF",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box",
        }}>
          <a href={paidJoinLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{
            width: "300px", height: "40px", borderRadius: "10px", background: "#FEAB27",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", textDecoration: "none",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN SESSION</span>
          </a>
        </div>
      </div>

      {/* Note — tells the student when the other time-of-day session repeats */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "5px", marginTop: "10px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
          <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
          <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
          <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
          <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ width: "343px", color: "#747474", fontFamily: "Outfit", fontSize: "13px", fontWeight: 400, lineHeight: "22px", textAlign: "center" }}>
          Note: {sessionCodeForNow === "daily_morning" ? "Evening Yoga Session will start at 4:30 PM" : "Morning Yoga Session will start tomorrow at 5:30 AM"} with the same link
        </span>
      </div>
    </div>
  );
};
