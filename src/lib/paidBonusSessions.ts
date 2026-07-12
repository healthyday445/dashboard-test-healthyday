import { getBonusWindowStart } from "@/lib/utils";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export interface PaidBonusCard {
  name: string;
  fullName: string;
  startMin: number;
  sessionLink: string;
  thumbnail: string;
  code: string;
}

interface GetActivePaidBonusSessionParams {
  is6Month: boolean;
  is12Month: boolean;
  paidLang: "Telugu" | "English";
  currentDow: number; // 0 = Sunday
  totalMin: number;
  sessionLinks: any[];
  isTeluguFaceYogaWeek: boolean;
}

const getApiLink = (sessionLinks: any[], code: string, language: string, fallback: string) => {
  const match = sessionLinks.find((s: any) => s.session_code === code && s.language === language);
  return match?.link || fallback;
};

const getDynamicThumbnail = (link: string, fallbackId: string) => {
  if (!link) return ytThumb(fallbackId);
  const match = link.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
  return ytThumb(match ? match[1] : fallbackId);
};

/**
 * Builds the list of bonus sessions a paid student is eligible for today (Face Yoga,
 * Diet, Breath to Heal), then picks whichever one's active window (getBonusWindowStart(startMin)
 * to startMin+45) matches the current time — or null if none are active right now.
 */
export function getActivePaidBonusSession({
  is6Month,
  is12Month,
  paidLang,
  currentDow,
  totalMin,
  sessionLinks,
  isTeluguFaceYogaWeek,
}: GetActivePaidBonusSessionParams): PaidBonusCard | null {
  const langKey = paidLang.toLowerCase();
  const eligible: PaidBonusCard[] = [];

  // 1. Face Yoga (Sundays at 11:30 AM IST -> 690 min). Eligible: 12 months only.
  if (is12Month && currentDow === 0) {
    if (paidLang === "Telugu" && isTeluguFaceYogaWeek) {
      const link = getApiLink(sessionLinks, "face_yoga", langKey, "https://join.healthyday.co.in/healthyface");
      eligible.push({ name: "Face Yoga Session", fullName: "Face Yoga Session at 11:30 AM", startMin: 690, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"), code: "face_yoga" });
    } else if (paidLang === "English" && !isTeluguFaceYogaWeek) {
      const link = getApiLink(sessionLinks, "face_yoga", langKey, "https://join.healthyday.co.in/healthyface_eng");
      eligible.push({ name: "Face Yoga Session", fullName: "Face Yoga Session at 11:30 AM", startMin: 690, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"), code: "face_yoga" });
    }
  }

  // 2. Diet Session (Daily at 8:00 PM IST -> 1200 min). Eligible: 12 months only.
  if (is12Month) {
    const link = getApiLink(sessionLinks, "paid_diet", langKey, paidLang === "English" ? "https://join.healthyday.co.in/diet_eng" : "https://join.healthyday.co.in/diet");
    eligible.push({ name: "Diet Session", fullName: "Diet Session at 8:00 PM", startMin: 1200, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"), code: "paid_diet" });
  }

  // 3. Breath to Heal (Daily at 9:00 PM IST -> 1260 min). Eligible: 6 & 12 months, excludes English on Sundays.
  if ((is6Month || is12Month) && !(paidLang === "English" && currentDow === 0)) {
    const link = getApiLink(sessionLinks, "b2h", langKey, paidLang === "English" ? "https://join.healthyday.co.in/b2hsession_eng" : "https://join.healthyday.co.in/b2hsession");
    eligible.push({ name: "Breath to Heal Session", fullName: "Breath to Heal Session at 9:00 PM", startMin: 1260, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"), code: "b2h" });
  }

  return eligible.find(s => totalMin >= getBonusWindowStart(s.startMin) && totalMin < s.startMin + 45) || null;
}

/** Regular (non-bonus) daily session live windows, in IST minutes-since-midnight. */
export function isRegularSessionLive(totalMin: number): boolean {
  return [
    [285, 570], // Morning: 4:45 AM - 9:30 AM
    [945, 1170], // Evening: 3:45 PM - 7:30 PM
  ].some(([s, e]) => totalMin >= s && totalMin < e);
}
