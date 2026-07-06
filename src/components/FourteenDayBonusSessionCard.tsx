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
// session start (not the waiting screen); the card starts showing 30 min before that,
// and "live"/JOIN runs for the session's real duration below. Days beyond 14 belong to
// the 21/22-day cohort and are never reached here since this page caps at day 14.
//
// Day  Session       Card shows from   Actual session time
// 3    Face Yoga     8:00 PM           8:30 – 9:00 PM  (30 min)
// 7    Weight Loss   10:30 AM          11:00 AM – 12:00 Noon (60 min)
// 10   Breath Work   8:30 PM           9:00 – 9:30 PM  (30 min)
// 12   Meditation    8:00 PM           8:30 – 9:00 PM  (30 min)
// 14   Sleep         10:30 AM          11:00 – 11:45 AM (45 min)
export const getBonusInfo = (day: number, lang: string, thumbnails: BonusThumbnails): BonusInfo | null => {
  const isEnglish = lang === "English";
  switch (day) {
    case 3:
      return {
        name: "Face Yoga Session",
        fullName: "Face Yoga Session at 8:30 PM",
        startMin: 20 * 60 + 30,
        videoId: "SyjnCjDtNS8",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/faceyoga_eng" : "https://start.dailyyogawithjagan.com/faceyoga",
        thumbnail: isEnglish ? thumbnails.faceYogaEng : thumbnails.faceYogaTel,
        liveDuration: 30,
        activeEndOffset: 30,
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
        liveDuration: 30,
        activeEndOffset: 30,
      };
    case 12:
      return {
        name: "Meditation Session",
        fullName: "Meditation Session at 8:30 PM",
        startMin: 20 * 60 + 30,
        videoId: isEnglish ? "u1Hom0s7ibU" : "cXaVIxH3RKA",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/meditation_eng" : "https://www.youtube.com/watch?v=cXaVIxH3RKA",
        thumbnail: isEnglish ? thumbnails.meditationEng : thumbnails.meditationTel,
        liveDuration: 30,
        activeEndOffset: 30,
      };
    case 14:
      return {
        name: "Sleep Session",
        fullName: "Sleep Session at 11:00 AM",
        startMin: 11 * 60,
        videoId: "SyjnCjDtNS8",
        sessionLink: isEnglish ? "https://start.dailyyogawithjagan.com/sleepsession_eng" : "https://start.dailyyogawithjagan.com/sleepsession",
        thumbnail: isEnglish ? thumbnails.sleepEng : thumbnails.sleepTel,
        liveDuration: 45,
        activeEndOffset: 45,
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
        <>
          <a href={bonusSession.sessionLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px", overflow: "hidden", background: "#000", position: "relative", marginBottom: "12px" }}>
            <img
              src={bonusSession.thumbnail}
              alt={bonusSession.name}
              style={{ width: "100%", height: "auto", aspectRatio: "372/204", objectFit: "cover", opacity: 0.85, display: "block" }}
            />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlayButton />
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>
              {bonusSession.name}
            </span>
            <a
              href={bonusSession.sessionLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                height: "38px", padding: "0 18px", borderRadius: "8px",
                background: "#FEAB27", textDecoration: "none",
                boxShadow: "0 2px 8px rgba(254,171,39,0.35)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700 }}>JOIN NOW</span>
            </a>
          </div>
        </>
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
            display: "flex", alignItems: "center", paddingLeft: "16px", boxSizing: "border-box",
          }}>
            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>
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
