import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import imgImage12 from "@/assets/image_12.png";
import imgLanguageEnglish from "@/assets/language_English.webp";
import imgLanguageTelugu from "@/assets/language_Telugu.webp";
import img0da635 from "@/assets/0da635826ff23e34b2bf7680030cac545d32dcfb.webp";
import img5ce328 from "@/assets/5ce32860a765bdcaeb0504ff13008eea60a6cd55.webp";

// classRecordings is now built dynamically inside the component based on student language & API data


const teluguVideos = [
  {
    id: "SyjnCjDtNS8",
    title: "15 Min Yoga for Beginners",
    subtitle: "Healthyday Yoga Telugu",
    duration: "17 mins",
    date: "OCT  25",
  },
  {
    id: "CgWC09sydHk",
    title: "15 Minutes Pranayama",
    subtitle: "Healthyday Yoga Telugu",
    duration: "15 mins",
    date: "JAN  26",
  },
  {
    id: "raCc7Z31LYw",
    title: "15 Minutes Meditation",
    subtitle: "Healthyday Yoga Telugu",
    duration: "14 mins",
    date: "NOV  25",
  },
  {
    id: "bl3W5tzK4ds",
    title: "Yoga Nidra - Deep Rest",
    subtitle: "Healthyday Yoga Telugu",
    duration: "20 mins",
    date: "DEC  25",
  },
];

const englishVideos = [
  {
    id: "SyjnCjDtNS8",
    title: "15 Min Yoga for Beginners",
    subtitle: "Healthyday Yoga English",
    duration: "17 mins",
    date: "OCT  25",
  },
  {
    id: "aC7Vi9qUExs",
    title: "15 Minutes Pranayama",
    subtitle: "Healthyday Yoga English",
    duration: "15 mins",
    date: "JAN  26",
  },
  {
    id: "u1Hom0s7ibU",
    title: "5-Minute Gratitude Meditation",
    subtitle: "Healthyday Yoga English",
    duration: "14 mins",
    date: "NOV  25",
  },
  {
    id: "n0iI0ZSVTWA",
    title: "Yoga Nidra - Deep Rest",
    subtitle: "Healthyday Yoga English",
    duration: "20 mins",
    date: "DEC  25",
  },
];

// --- Helpers ---

interface SessionLink {
  session_date: string;
  session_name: string | null;
  language: string;
  session_code: string;
  link: string;
  expiry_by: string | null;
}

/** Extract YouTube video ID from various URL formats */
function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
    if (u.searchParams.has("v")) return u.searchParams.get("v");
    const liveMatch = u.pathname.match(/\/live\/([^/?]+)/);
    if (liveMatch) return liveMatch[1];
    return null;
  } catch {
    return null;
  }
}

/** Remove "Healthyday Yoga Telugu", "Healthyday Yoga English", etc. from session names */
function cleanSessionName(name: string): string {
  return name
    .replace(/\|?\s*Healthyday\s+Yoga\s+(Telugu|English)\s*/gi, "")
    .replace(/\|\s*$/, "")
    .trim();
}

/**
 * Helper to determine a rough timestamp for a session based on its date and whether
 * it's a morning or evening session. Used to sort recordings by most recent.
 */
function getSessionTimestamp(link: SessionLink): number {
  if (!link.session_date) return 0;
  const [y, m, d] = link.session_date.split("-").map(Number);
  if (!y || !m || !d) return 0;

  // Determine the IST hour when the session should become available
  let hourIST = 14; // Default -> 2 PM
  if (link.session_code.includes("morning")) {
    hourIST = 8; // Starts 6 AM -> Recording at 8 AM
  } else if (link.session_code.includes("evening")) {
    hourIST = 20; // Starts 6 PM -> Recording at 8 PM
  } else if (link.session_code.includes("b2h")) {
    hourIST = 23; // Starts 9 PM -> Recording at 11 PM
  } else if (link.session_code.includes("diet")) {
    hourIST = 22; // Starts 8 PM -> Recording at 10 PM
  }

  // Construct timestamp strictly in IST (UTC+5:30)
  // UTC hour = IST hour - 5, UTC min = 0 - 30 = -30
  return Date.UTC(y, m - 1, d, hourIST - 5, -30, 0, 0);
}

/**
 * Find the current active recording for a given session_code + language.
 * Sorts multiple available recordings by their calculated timestamp descending,
 * so the most recently occurred session is shown (e.g., Today's Morning over Yesterday's Evening).
 */
function findSessionLink(
  links: SessionLink[],
  sessionCode: string | string[],
  language: string
): SessionLink | undefined {
  const codes = Array.isArray(sessionCode) ? sessionCode : [sessionCode];

  const now = Date.now();

  // Only consider sessions that are for the current language and have already happened
  const matches = links.filter(
    (s) => codes.includes(s.session_code) && s.language === language && getSessionTimestamp(s) <= now
  );

  if (matches.length === 0) return undefined;

  // Sort by most recent session timestamp first
  return [...matches].sort((a, b) => getSessionTimestamp(b) - getSessionTimestamp(a))[0];
}

const PlayButton = () => (
  <div style={{
    width: "37.894px",
    height: "22.803px",
    aspectRatio: "37.89/22.80",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <img
      src={imgImage12}
      alt="Play"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

const Thumbnail = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{
    width: "170px",
    minWidth: "170px",
    height: "93.45px",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
  }}>
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      borderRadius: "12px",
      background: "rgba(0, 0, 0, 0.32)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <PlayButton />
    </div>
  </div>
);

const DateBadge = ({ label }: { label: string }) => (
  <div style={{
    width: "fit-content",
    height: "25px",
    borderRadius: "20px",
    background: "#E7EEFA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 12px",
  }}>
    <span style={{
      color: "#0D468B",
      fontFamily: "Outfit",
      fontSize: "12px",
      fontWeight: 700,
      lineHeight: "normal",
    }}>
      {label}
    </span>
  </div>
);

const AllRecordings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile: urlMobile } = useParams<{ mobile: string }>();
  const searchParams = new URLSearchParams(location.search);
  const mobile = urlMobile || searchParams.get("mobile") || sessionStorage.getItem("referrer_mobile") || "";
  const previewMode = searchParams.get("preview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  // Session links from API
  const [sessionLinks, setSessionLinks] = useState<SessionLink[]>([]);
  const [sessionLinksLoading, setSessionLinksLoading] = useState(true);

  // Fetch student data
  useEffect(() => {
    if (previewMode === "paid" || previewMode === "english" || previewMode === "3month") {
      setStudentData({
        language: previewMode === "english" ? "English" : "Telugu",
        status: "paid",
        plan_type: previewMode === "3month" ? "3_months" : undefined,
        paid_classes_joining_link: "https://www.youtube.com/c/Healthyday",
      });
      setLoading(false);
      return;
    }

    if (!mobile) {
      setLoading(false);
      setError("No mobile number provided.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiMobile = `+${mobile}`;
        const encodedMobile = encodeURIComponent(apiMobile);
        const response = await fetch(`/.netlify/functions/student?mobile=${encodedMobile}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        setStudentData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mobile, previewMode]);

  // Fetch session links from API
  useEffect(() => {
    const fetchSessionLinks = async () => {
      try {
        const res = await fetch("/.netlify/functions/session-links");
        if (!res.ok) throw new Error("Failed to fetch session links");
        const json = await res.json();
        setSessionLinks(json.data || []);
      } catch (err) {
        console.error("Session links fetch error:", err);
        // On failure, sessionLinks stays empty → static fallback links will be used
        setSessionLinks([]);
      } finally {
        setSessionLinksLoading(false);
      }
    };
    fetchSessionLinks();
  }, []);

  if (loading) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div style={{ width: "48px", height: "48px", border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div style={{ background: "#FFF3F3", border: "1px solid #FFD4D4", borderRadius: "12px", padding: "24px", textAlign: "center", maxWidth: "340px" }}>
          <p style={{ color: "#D32F2F", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Oops!</p>
          <p style={{ color: "#666", fontSize: "14px", fontWeight: 400 }}>{error}</p>
        </div>
      </div>
    );
  }

  const isEnglish = studentData?.language === "English";
  const youtubeVideos = isEnglish ? englishVideos : teluguVideos;
  const lang = isEnglish ? "english" : "telugu";

  // Subscription plan duration check (mirrors paid dashboard logic)
  const activeSub = studentData?.subscriptions?.find((s: any) => s.subscription_status === "active" || s.subscription_status === "ongoing") || studentData?.subscriptions?.[0];
  const planType = activeSub?.plan_type || studentData?.current_plan || studentData?.plan_type;
  const is3Month = planType === "3_months" || planType === "3_months_upgrade";
  const is6Month = planType === "6_months" || planType === "6_months_upgrade";
  const is12Month = planType === "12_months" || planType === "12_months_upgrade";
  const hasB2hAccess = is6Month || is12Month;

  // --- Date formatting helpers ---
  const ordinalSuffix = (d: number) => {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const MONTH_NAMES_SHORT = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const fmtDate = (d: Date) => `${d.getDate()}${ordinalSuffix(d.getDate())} ${MONTH_NAMES_SHORT[d.getMonth()]}`;
  const fmtISTDate = (d: Date) => `${d.getUTCDate()}${ordinalSuffix(d.getUTCDate())} ${MONTH_NAMES_SHORT[d.getUTCMonth()]}`;

  /** Format a "YYYY-MM-DD" session_date string into a readable label like "6th May" */
  const fmtSessionDate = (sessionDate: string): string => {
    const [y, m, d] = sessionDate.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return fmtISTDate(date);
  };

  /** Format an ISO expiry_by timestamp into a human-readable access window strictly in IST */
  const formatExpiry = (expiryBy: string | null): string | null => {
    if (!expiryBy) return null;
    const d = new Date(expiryBy);
    // Convert UTC to IST
    const istMs = d.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    const mm = minutes === 0 ? "" : `:${String(minutes).padStart(2, "0")}`;
    const timeStr = `${h12}${mm} ${ampm}`;
    const dateStr = fmtISTDate(istDate);
    return `Access till ${timeStr}, ${dateStr}`;
  };

  // --- Define strict IST "now" for fallback dates ---
  const nowISTFallback = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  const todayLabel = fmtISTDate(nowISTFallback);

  const tomorrow = new Date(nowISTFallback);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const tomorrowLabel = fmtISTDate(tomorrow);

  const plus13 = new Date(nowISTFallback);
  plus13.setUTCDate(plus13.getUTCDate() + 13);
  const plus13Label = fmtISTDate(plus13);

  // --- Look up API session links; fall back to static links if not found ---

  // Card 1: Yoga Session — look for daily_morning or daily_evening
  const yogaSession = findSessionLink(sessionLinks, ["daily_morning", "daily_evening"], lang);
  // Morning-only yoga session — used during evening live hours to show today's morning recording
  const morningYogaSession = findSessionLink(sessionLinks, ["daily_morning"], lang);
  const yogaFallbackLink = studentData?.paid_classes_joining_link || studentData?.classes_joining_link || "https://www.youtube.com/c/Healthyday";

  // Card 2: Face Yoga — no session_code in the API for this; always static
  // (If face_yoga session_code is added to the API later, we can wire it up here)

  // Card 3: Breath to Heal — look for b2h or b2h_eng
  const b2hSession = findSessionLink(sessionLinks, ["b2h", "b2h_eng"], lang);

  // Card 4: Diet Routine — look for paid_diet or diet_eng
  const dietSession = findSessionLink(sessionLinks, ["paid_diet", "diet_eng"], lang);

  const yesterday = new Date(nowISTFallback);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayLabel = fmtISTDate(yesterday);

  // Helper to determine fallback date: if it hasn't happened yet today in IST, show yesterday
  const getFallbackDate = (hourIST: number) => nowISTFallback.getUTCHours() >= hourIST ? todayLabel : yesterdayLabel;

  // Use session_date from API for the title, fallback to today/yesterday dynamically
  const yogaDateLabel = yogaSession ? fmtSessionDate(yogaSession.session_date) : getFallbackDate(6); // 6 AM
  const morningYogaDateLabel = morningYogaSession ? fmtSessionDate(morningYogaSession.session_date) : getFallbackDate(6);
  const b2hDateLabel = b2hSession ? fmtSessionDate(b2hSession.session_date) : getFallbackDate(21); // 9 PM
  const dietDateLabel = dietSession ? fmtSessionDate(dietSession.session_date) : getFallbackDate(20); // 8 PM

  // --- Helper: get YouTube thumbnail or fallback to static ---
  const ytThumb = (link: string | undefined, fallback: string): string => {
    if (!link) return fallback;
    const vid = extractYouTubeId(link);
    return vid ? `https://img.youtube.com/vi/${vid}/mqdefault.jpg` : fallback;
  };

  const getFallbackExpiryDate = (hourIST: number) => nowISTFallback.getUTCHours() >= hourIST ? tomorrowLabel : todayLabel;

  // --- Build Class Recordings with same structure, using API data where available ---
  const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  const forceTime = searchParams.get("forceTime");
  const totalMin = forceTime ? parseInt(forceTime, 10) : (nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes());
  const isMorningLive = totalMin >= 330 && totalMin < 570;  // 5:30 AM - 9:30 AM IST
  const isEveningLive = totalMin >= 990 && totalMin < 1170; // 4:30 PM - 7:30 PM IST
  const isLiveNow = isMorningLive || isEveningLive;

  const classRecordings: { title: string; subtitle: string; thumbnail: string; link: string; accessTill: string }[] = [];

  if (isEveningLive) {
    // During evening live: show today's MORNING recording (not the evening one)
    classRecordings.push({
      title: `${morningYogaDateLabel} Yoga Session`,
      subtitle: "Daily Live Yoga Session",
      thumbnail: ytThumb(morningYogaSession?.link, isEnglish ? imgLanguageEnglish : imgLanguageTelugu),
      link: morningYogaSession?.link || yogaFallbackLink,
      accessTill: (morningYogaSession && formatExpiry(morningYogaSession.expiry_by)) || `Access till 5:00 AM, ${getFallbackExpiryDate(6)}`,
    });
  } else if (!isMorningLive) {
    // Outside live hours: show most recent recording (morning or evening)
    classRecordings.push({
      title: `${yogaDateLabel} Yoga Session`,
      subtitle: "Daily Live Yoga Session",
      thumbnail: ytThumb(yogaSession?.link, isEnglish ? imgLanguageEnglish : imgLanguageTelugu),
      link: yogaSession?.link || yogaFallbackLink,
      accessTill: (yogaSession && formatExpiry(yogaSession.expiry_by)) || `Access till 5:00 AM, ${getFallbackExpiryDate(6)}`,
    });
  }
  // During morning live: no yoga recording shown (session still in progress)

  // Face Yoga — 12-month plan only
  if (is12Month) {
    classRecordings.push({
      title: "Last Healthyday Face Yoga",
      subtitle: "Sundays at 11:30 AM",
      thumbnail: `https://img.youtube.com/vi/SyjnCjDtNS8/hqdefault.jpg`,
      link: isEnglish ? "https://join.healthyday.co.in/healthyface_eng" : "https://join.healthyday.co.in/healthyface",
      accessTill: `Access till ${plus13Label}`,
    });
  }

  // Breath to Heal — 6-month & 12-month plans only
  if (hasB2hAccess) {
    classRecordings.push({
      title: `${b2hDateLabel} Breath to Heal Session`,
      subtitle: "Daily at 9:00 PM",
      thumbnail: ytThumb(b2hSession?.link, `https://img.youtube.com/vi/SyjnCjDtNS8/hqdefault.jpg`),
      link: b2hSession?.link || (isEnglish ? "https://join.healthyday.co.in/b2hsession_eng" : "https://join.healthyday.co.in/b2hsession"),
      accessTill: (b2hSession && formatExpiry(b2hSession.expiry_by)) || `Access till 8:30 PM, ${getFallbackExpiryDate(21)}`,
    });
  }

  // Diet Session — 12-month
  if (is12Month) {
    classRecordings.push({
      title: `${dietDateLabel} Healthyday Diet Routine`,
      subtitle: "Daily at 8:00 PM",
      thumbnail: ytThumb(dietSession?.link, `https://img.youtube.com/vi/SyjnCjDtNS8/hqdefault.jpg`),
      link: dietSession?.link || (isEnglish ? "https://join.healthyday.co.in/diet_eng" : "https://join.healthyday.co.in/diet"),
      accessTill: (dietSession && formatExpiry(dietSession.expiry_by)) || `Access till 7:30 PM, ${getFallbackExpiryDate(20)}`,
    });
  }

  // Card 5: 108 Suryanamaskar Challenge — Telugu only, only shown when API has an active session
  if (!isEnglish) {
    // Match any session_code starting with "108sn_"
    const snSession = findSessionLink(
      sessionLinks,
      sessionLinks
        .filter((s) => s.session_code.startsWith("108sn_") && s.language === lang)
        .map((s) => s.session_code),
      lang
    );
    if (snSession) {
      const snVideoId = extractYouTubeId(snSession.link);
      const snTitle = snSession.session_name
        ? cleanSessionName(snSession.session_name)
        : "108 Suryanamaskar Challenge";
      classRecordings.push({
        title: snTitle,
        subtitle: "108 Suryanamaskar Challenge",
        thumbnail: snVideoId
          ? `https://img.youtube.com/vi/${snVideoId}/mqdefault.jpg`
          : imgLanguageTelugu,
        link: snSession.link,
        accessTill: formatExpiry(snSession.expiry_by) || "Always available",
      });
    }
  }

  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      {/* Header */}
      <header className="hd-header bg-white">
        <button
          onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", cursor: "pointer", marginRight: "12px", padding: "4px" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#202020" />
          </svg>
        </button>
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {/* Class Recordings Section */}
      {isMorningLive && is3Month ? (
        /* --- 3-month user live session banner --- */
        <div style={{ padding: "24px 20px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Live Session Banner Card */}
          <div style={{
            width: "357px",
            maxWidth: "100%",
            height: "87px",
            borderRadius: "10px",
            border: "1px solid var(--Orange, #FEAB27)",
            background: "#FFF5E5",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 14px",
            boxSizing: "border-box",
          }}>
            {/* Yoga Meditation Image */}
            <img
              src={img0da635}
              alt="Live session"
              style={{
                width: "78px",
                height: "78px",
                aspectRatio: "1/1",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            {/* Banner Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
              <span style={{
                color: "var(--Blue, #0A386F)",
                fontFamily: "Outfit",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "normal",
              }}>
                A session is live right now!
              </span>
              <span style={{
                color: "#5A5A5A",
                fontFamily: "Outfit",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "normal",
              }}>
                Please visit the recordings section{" "}
                <span style={{ fontWeight: 700, color: "#5A5A5A" }}>after{"\n"}9:30 AM</span>{" "}
                to access today's session recording.
              </span>
            </div>
          </div>

          {/* Lotus Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            margin: "28px 0 20px",
            width: "100%",
            maxWidth: "300px",
          }}>
            <div style={{ width: "110px", height: "0.5px", background: "var(--Orange, #FEAB27)" }} />
            <img
              src={img5ce328}
              alt="Lotus"
              style={{ width: "32px", height: "21px", aspectRatio: "26/17", objectFit: "cover", flexShrink: 0 }}
            />
            <div style={{ width: "110px", height: "0.5px", background: "var(--Orange, #FEAB27)" }} />
          </div>

          {/* Explore YouTube CTA */}
          <p style={{
            maxWidth: "328px",
            color: "#494949",
            textAlign: "center",
            fontFamily: "Outfit",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "normal",
            margin: "0 0 8px",
          }}>
            Explore these Yoga & Wellness{" "}
            <span style={{ color: "#F00", fontWeight: 600 }}>Youtube</span>{" "}
            videos from{" "}
            <span style={{ color: "var(--Blue, #0A386F)", fontWeight: 600 }}>Healthyday</span>
          </p>

          {/* Separator */}
          <div style={{
            width: "360px",
            maxWidth: "100%",
            height: "1px",
            background: "#D4D4D4",
            marginTop: "16px",
          }} />
        </div>
      ) : (
        <div style={{ padding: "24px 20px 0" }}>
          <h2 style={{
            color: "#202020",
            fontFamily: "Outfit",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "normal",
            margin: "0 0 16px",
          }}>
            Most Recent Session Recordings
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {classRecordings.map((rec, i) => (
              <a
                key={i}
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "flex", gap: "12px", alignItems: "flex-start" }}
              >
                <Thumbnail src={rec.thumbnail} alt={rec.title} />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, paddingTop: "2px" }}>
                  <span style={{
                    color: "#0D468B",
                    fontFamily: "Outfit",
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}>
                    {rec.title}
                  </span>
                  <span style={{
                    color: "#7E7D7D",
                    fontFamily: "Outfit",
                    fontSize: "11px",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}>
                    {rec.subtitle}
                  </span>
                  <span style={{
                    color: "#B71C1C",
                    fontFamily: "Outfit",
                    fontSize: "11px",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}>
                    {rec.accessTill}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Separator — hide when 3-month live banner is shown (it has its own divider) */}
      {!(isMorningLive && is3Month) && (
        <div style={{ padding: "28px 20px" }}>
          <div style={{
            width: "100%",
            maxWidth: "360px",
            height: "1.5px",
            background: "#A7A7A7",
          }} />
        </div>
      )}

      {/* Youtube Videos Section */}
      <div style={{ padding: "24px 20px 40px" }}>
        <h2 style={{
          color: "#202020",
          fontFamily: "Outfit",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "normal",
          margin: "0 0 16px",
        }}>
          Youtube Videos
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {youtubeVideos.map((video, i) => (
            <a
              key={i}
              href={`https://youtu.be/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "flex", gap: "12px", alignItems: "flex-start" }}
            >
              <Thumbnail
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, paddingTop: "2px" }}>
                <span style={{
                  color: "#0D468B",
                  fontFamily: "Outfit",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}>
                  {video.title}
                </span>
                <span style={{
                  color: "#7E7D7D",
                  fontFamily: "Outfit",
                  fontSize: "11px",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}>
                  {video.subtitle}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <DateBadge label={video.date} />
                  <span style={{
                    color: "#7E7D7D",
                    fontFamily: "Outfit",
                    fontSize: "11px",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}>
                    • {video.duration}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecordings;
