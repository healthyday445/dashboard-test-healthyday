import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { safeSessionStorage } from "@/lib/storage";
import { getSimulatedBatchDate } from "@/lib/utils";
import { getNowIST } from "@/lib/serverTime";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import NoSessionsCard from "@/components/NoSessionsCard";

const YT_ID_REGEX = /(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/;

// ?previewVideo=1 forces this known-good video so the page can be checked outside real
// live-session windows; ?previewVideo=<link-or-id> overrides with a specific video instead.
const PREVIEW_VIDEO_ID = "SPSwmydulxo";

// Fixed session title shown under the video — intentionally not the real YouTube video title
// (which varies day to day and used to be fetched via oEmbed).
const SESSION_TITLE = "One Extra Bonus Session | FREE Yoga with Healthyday";

const extractYoutubeId = (value: string): string | null => {
  const match = value.match(YT_ID_REGEX);
  if (match) return match[1];
  return /^[a-zA-Z0-9_-]{11}$/.test(value) ? value : null;
};

const parseTimeParam = (t: string | null): number | null => {
  if (!t) return null;
  const isPM = t.toLowerCase().endsWith("pm");
  const s = t.toLowerCase().replace("am", "").replace("pm", "");
  const [hStr, mStr] = s.split(".");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr ?? "0", 10);
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h * 60 + m;
};

const getCurrentTotalMin = (timeParam: string | null) => {
  const parsed = parseTimeParam(timeParam);
  if (parsed !== null) return parsed;
  const nowIST = getNowIST();
  return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
};

const MORNING_SLOTS = [
  { start: 4 * 60 + 30, end: 6 * 60 + 30 },
  { start: 6 * 60 + 30, end: 7 * 60 + 30 },
  { start: 7 * 60 + 30, end: 8 * 60 + 30 },
  { start: 8 * 60 + 30, end: 9 * 60 + 30 },
];
const EVENING_SLOTS = [
  { start: 15 * 60 + 30, end: 17 * 60 + 30 },
  { start: 17 * 60 + 30, end: 18 * 60 + 30 },
  { start: 18 * 60 + 30, end: 19 * 60 + 30 },
];
const ALL_SLOTS = [...MORNING_SLOTS, ...EVENING_SLOTS];

const GRACE_DAY_MIN = 15;
const GRACE_DAY_MAX = 17;

/** Day number since free_batch_start_date (Day 1 = start date), uncapped — unlike the 14-day batch's own day calc, this needs to keep counting past Day 14 into the grace window. */
const getDayNumber = (batchStartDateStr: string | null | undefined, today: Date): number | null => {
  if (!batchStartDateStr) return null;
  const batchStart = new Date(batchStartDateStr);
  batchStart.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - batchStart.getTime()) / 86400000);
  return diffDays + 1;
};

/**
 * Grace-period page (/:mobile/grace) — for students who finished the 14-day free batch without
 * paying, this previews the actual PAID daily class live on Days 15-17 only, to nudge them into
 * subscribing before the window closes. Outside that window (wrong status or wrong day), bounce
 * to the regular dashboard, which already renders the correct state for them.
 */
const Grace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile: urlMobile } = useParams<{ mobile: string }>();
  const searchParams = new URLSearchParams(location.search);
  const mobile = urlMobile || searchParams.get("mobile") || safeSessionStorage.getItem("referrer_mobile") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [sessionLinks, setSessionLinks] = useState<any[]>([]);
  const [sessionLinksLoaded, setSessionLinksLoaded] = useState(false);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [channelName, setChannelName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/.netlify/functions/session-links")
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data)
          ? data
          : Array.isArray(data?.data) ? data.data
            : Array.isArray(data?.links) ? data.links
              : [];
        setSessionLinks(arr);
      })
      .catch(() => {})
      .finally(() => setSessionLinksLoaded(true));
  }, []);

  useEffect(() => {
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
        const response = await fetch(`/.netlify/functions/student?mobile=${encodeURIComponent(apiMobile)}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();

        const forceDayParam = searchParams.get("forceDay");
        const today = forceDayParam !== null && data?.free_batch_start_date
          ? getSimulatedBatchDate(data.free_batch_start_date, parseInt(forceDayParam, 10))
          : (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();

        const status = data?.status;
        const isCompleted = status === "14DaysCompleted" || status === "14 day completed";
        const dayNumber = getDayNumber(data?.free_batch_start_date, today);
        const inGraceWindow = dayNumber !== null && dayNumber >= GRACE_DAY_MIN && dayNumber <= GRACE_DAY_MAX;

        if (!isCompleted || !inGraceWindow) {
          navigate(`/${mobile}`, { replace: true });
          return;
        }

        setStudentData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile, navigate]);

  const timeParam = searchParams.get("time");
  const totalMin = getCurrentTotalMin(timeParam);
  const isMorning = totalMin < 15 * 60 + 30;
  const langKey = (studentData?.language || "Telugu").toLowerCase();
  // Grace-period students preview the actual PAID daily class, not a free-batch weekly one.
  const paidSessionCode = isMorning ? "daily_morning" : "daily_evening";

  const apiSessionEntry = sessionLinks.find((s: any) => s.session_code === paidSessionCode && s.language === langKey);
  const sessionLink = apiSessionEntry?.link || studentData?.paid_classes_joining_link || studentData?.classes_joining_link || "https://www.youtube.com/c/Healthyday";
  const ytMatch = sessionLink.match(YT_ID_REGEX);

  const previewVideoParam = searchParams.get("previewVideo");
  const previewVideoId = previewVideoParam
    ? extractYoutubeId(previewVideoParam) ?? PREVIEW_VIDEO_ID
    : null;

  const sessionVideoId = previewVideoId || (ytMatch ? ytMatch[1] : null);
  const liveSlot = !!previewVideoId || !!ALL_SLOTS.find((s) => totalMin >= s.start && totalMin < s.end);

  useEffect(() => {
    if (!liveSlot || !sessionVideoId) {
      setChannelName(null);
      return;
    }
    fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${sessionVideoId}`)}&format=json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setChannelName(data?.author_name ?? null))
      .catch(() => setChannelName(null));
  }, [liveSlot, sessionVideoId]);

  if (loading || !sessionLinksLoaded) {
    return (
      <div className="hd-page bg-background" style={{ fontFamily: "Outfit, sans-serif" }}>
        {/* Reserves the same full-width 16:9 space the video/iframe will occupy once loaded, so
            content doesn't shift (CLS) when it's replaced by the iframe or NoSessionsCard — left
            blank on purpose, the spinner below is the only loading indicator. */}
        <div style={{ width: "100%", aspectRatio: "16/9" }} />
        <div className="flex flex-col items-center justify-center" style={{ padding: "32px 20px" }}>
          <img src={logo} alt="Healthyday" className="h-10 mb-8" />
          <div className="flex flex-col items-center gap-4">
            <div style={{ width: "48px", height: "48px", border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading your bonus session...</p>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div style={{ background: "#FFF3F3", border: "1px solid #FFD4D4", borderRadius: "12px", padding: "24px", textAlign: "center", maxWidth: "340px" }}>
          <p style={{ color: "#D32F2F", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Oops!</p>
          <p style={{ color: "#666", fontSize: "14px", fontWeight: 400 }}>{error || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hd-page bg-background" style={{ fontFamily: "Outfit, sans-serif" }}>
      {liveSlot && sessionVideoId ? (
        <>
          <div style={{ width: "100%", aspectRatio: "16/9", position: "relative" }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${sessionVideoId}?autoplay=1`}
              title="Bonus Yoga Session"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>

          {/* Reserves 2 lines for the title + 1 for the channel name up front (via minHeight +
              line-clamp), whether or not the oEmbed fetch has resolved yet, so that text
              popping in later — or a longer/shorter real title — never shifts the pricing
              section below (CLS). */}
          <div style={{ padding: "14px 20px 0" }}>
            <p style={{ color: "#202020", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, margin: "0 0 4px", lineHeight: "1.3" }}>
              {SESSION_TITLE}
            </p>
            <p style={{ color: "#666", fontFamily: "Outfit", fontSize: "13px", fontWeight: 500, margin: 0, minHeight: "1.3em" }}>
              {channelName ?? " "}
            </p>
          </div>
        </>
      ) : (
        <div style={{ padding: "24px 20px 0", display: "flex", justifyContent: "center" }}>
          <NoSessionsCard totalMin={totalMin} isFreeBatch={false} />
        </div>
      )}

      <div style={{ padding: "28px 20px 0", textAlign: "center" }}>
        <p style={{ margin: "0 0 6px", color: "#000", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "1.3" }}>
          Your 14-Days FREE Classes are completed
        </p>
        <p style={{ margin: "0 0 14px", color: "#FE961B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "1.3" }}>
          Today is ONE Extra Bonus Session.
        </p>
        <p style={{ margin: 0, color: "#7C7B7B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500 }}>
          Join our community for
        </p>
        <p style={{ margin: 0, color: "#0D468B", fontFamily: "Outfit", fontSize: "20px", fontWeight: 800, letterSpacing: "0.5px" }}>
          DAILY YOGA SESSIONS
        </p>
      </div>

      <div style={{ marginTop: "8px" }}>
        <PricingAndComparisonSection
          selectedPlanIdx={selectedPlanIdx}
          setSelectedPlanIdx={setSelectedPlanIdx}
          daysLeft={0}
          hideDaysLeft={true}
          useOngoingPricing={true}
        />
      </div>
      <div style={{ height: "40px" }} />
    </div>
  );
};

export default Grace;
