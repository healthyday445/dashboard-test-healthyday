import { trackSessionClick } from "@/lib/trackSessionClick";

const PlayButton = () => (
  <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68" height="48" rx="14" fill="#FF0000" fillOpacity="0.95" />
    <path d="M45 24L28 34V14L45 24Z" fill="white" />
  </svg>
);

export type BonusInfo = { name: string; fullName: string; startMin: number; videoId: string; sessionLink: string; thumbnail: string; liveDuration?: number; activeEndOffset?: number };

interface BonusThumbnails {
  faceYogaTel: string;
  faceYogaEng: string;
  weightLossTel: string;
  weightLossEng: string;
  breathWorkTel: string;
  breathWorkEng: string;
  meditationTel: string;
  meditationEng: string;
  sleepTel: string;
  sleepEng: string;
}

// Day → bonus session info — same 5 days for both languages. startMin is the actual
// session start (not the waiting screen); the card starts showing 30 min before that
// (clipped to the regular-session block boundary via getBonusWindowStart when the bonus
// falls right after one ends), and "live"/JOIN runs from 30 min before start through
// 1 hour after start for every session. Days beyond 14 belong to the 21/22-day cohort
// and are never reached here since this page caps at day 14.
//
// Day  Session       Actual session time   Join window (30 min before – 1 hr after)
// 3    Face Yoga     9:00 PM                8:30 – 10:00 PM
// 7    Weight Loss   11:00 AM               10:30 AM – 12:00 PM
// 10   Breath Work   9:00 PM                8:30 – 10:00 PM
// 12   Meditation    8:30 PM                8:00 – 9:30 PM
// 14   Sleep         11:00 AM               10:30 AM – 12:00 PM
export const getBonusInfo = (day: number, lang: string, thumbnails: BonusThumbnails): BonusInfo | null => {
  const isEnglish = lang === "English";
  switch (day) {
    case 3:
      return {
        name: "Face Yoga Session",
        fullName: "Face Yoga Session at 9:00 PM",
        startMin: 21 * 60,
        videoId: "SyjnCjDtNS8",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/faceyoga_eng" : "https://start.dailyyogawithjagan.com/faceyoga",
        thumbnail: isEnglish ? thumbnails.faceYogaEng : thumbnails.faceYogaTel,
        liveDuration: 60,
        activeEndOffset: 60,
      };
    case 7: {
      const name = isEnglish ? "Weight Loss Orientation" : "Weight Loss Session";
      return {
        name,
        fullName: `${name} at 11:00 AM`,
        startMin: 11 * 60,
        videoId: "SyjnCjDtNS8",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/weightlosssession_eng" : "https://start.dailyyogawithjagan.com/weightlosssession",
        thumbnail: isEnglish ? thumbnails.weightLossEng : thumbnails.weightLossTel,
        liveDuration: 60,
        activeEndOffset: 60,
      };
    }
    case 10:
      return {
        name: "Breath Work Session",
        fullName: "Breath Work Session at 9:00 PM",
        startMin: 21 * 60,
        videoId: "SyjnCjDtNS8",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/bw_eng" : "https://start.dailyyogawithjagan.com/breathwork",
        thumbnail: isEnglish ? thumbnails.breathWorkEng : thumbnails.breathWorkTel,
        liveDuration: 60,
        activeEndOffset: 60,
      };
    case 12:
      return {
        name: "Meditation Session",
        fullName: "Meditation Session at 8:30 PM",
        startMin: 20 * 60 + 30,
        videoId: isEnglish ? "u1Hom0s7ibU" : "cXaVIxH3RKA",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/meditation_eng" : "https://www.youtube.com/watch?v=cXaVIxH3RKA",
        thumbnail: isEnglish ? thumbnails.meditationEng : thumbnails.meditationTel,
        liveDuration: 60,
        activeEndOffset: 60,
      };
    case 14:
      return {
        name: "Sleep Session",
        fullName: "Sleep Session at 11:00 AM",
        startMin: 11 * 60,
        videoId: "SyjnCjDtNS8",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/sleepsession_eng" : "https://start.dailyyogawithjagan.com/sleepsession",
        thumbnail: isEnglish ? thumbnails.sleepEng : thumbnails.sleepTel,
        liveDuration: 60,
        activeEndOffset: 60,
      };
    default:
      return null;
  }
};

export const BONUS_DAYS = [3, 7, 10, 12, 14];

interface FourteenDayBonusSessionCardProps {
  bonusSession: BonusInfo;
  isLive: boolean;
  mobile?: string;
}

/** "Special Bonus Session" card — presentational; parent decides when to render it and whether it's live. */
export const FourteenDayBonusSessionCard: React.FC<FourteenDayBonusSessionCardProps> = ({ bonusSession, isLive, mobile }) => {
  const isAMSession = bonusSession.startMin < 12 * 60;
  const bonusSessionCode = `free_bonus_${bonusSession.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
  const handleClick = () => trackSessionClick(mobile, bonusSessionCode);

  return (
    <div style={{ padding: "24px 20px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>
          Special Bonus Session
        </h2>
        {isLive && (
          <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
            <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>Ongoing now</span>
          </div>
        )}
      </div>

      {isLive ? (
        <div style={{ marginBottom: "16px" }}>
          <a href={bonusSession.sessionLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px 12px 0 0", overflow: "hidden", background: "#000", position: "relative" }}>
            <img
              src={bonusSession.thumbnail}
              alt={bonusSession.name}
              style={{ width: "100%", height: "auto", aspectRatio: "360/197", objectFit: "cover", opacity: 0.85, display: "block" }}
            />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlayButton />
            </div>
          </a>
          <div style={{
            width: "100%", height: "58px",
            borderRadius: "0 0 12px 12px",
            border: "1.5px solid #E9E9E9", background: "#FFF",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
            display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box",
            padding: "0 16px",
          }}>
            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>
              {bonusSession.name}
            </span>
            <a
              href={bonusSession.sessionLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              style={{
                width: "138px", height: "29px", flexShrink: 0, borderRadius: "8px", background: "#FEAB27",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", textDecoration: "none",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "15px", fontWeight: 700, lineHeight: "normal" }}>JOIN NOW</span>
            </a>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "16px" }}>
          <a href={bonusSession.sessionLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px 12px 0 0", overflow: "hidden", background: "#000", position: "relative" }}>
            <img
              src={bonusSession.thumbnail}
              alt={bonusSession.name}
              style={{ width: "100%", height: "auto", aspectRatio: "360/197", objectFit: "cover", opacity: 0.85, display: "block" }}
            />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlayButton />
            </div>
          </a>
          <div style={{
            width: "100%", height: "58px",
            borderRadius: "0 0 12px 12px",
            border: "1.5px solid #E9E9E9", background: "#FFF",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box",
          }}>
            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px", textAlign: "center" }}>
              {bonusSession.fullName}
            </span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "5px", marginTop: "10px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
          <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
          <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
          <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
          <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ width: "343px", color: "#747474", fontFamily: "Outfit", fontSize: "13px", fontWeight: 400, lineHeight: "22px", textAlign: "center" }}>
          Next Yoga Session is {isAMSession ? "at 4:30 PM" : "tomorrow at 5:30 AM"}. Currently, Bonus Session is going on! Click on the link above to join
        </span>
      </div>
    </div>
  );
};
