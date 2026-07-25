import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { safeSessionStorage } from "@/lib/storage";
import { isFreeBatchOver, getSimulatedBatchDate } from "@/lib/utils";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import NoSessionsCard from "@/components/NoSessionsCard";

const YT_ID_REGEX = /(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/;

// ?previewVideo=1 forces this known-good video so the page can be checked outside real
// live-session windows; ?previewVideo=<link-or-id> overrides with a specific video instead.
const PREVIEW_VIDEO_ID = "SPSwmydulxo";

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
  const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
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

/** Day-in-batch + week calc, mirrors getActiveBatchInfo in IndexFourteenDaysV2.tsx. */
const getActiveBatchInfo = (
  batchDateStr: string | null | undefined,
  batchEndDateStr: string | null | undefined,
  today: Date
) => {
  if (!batchDateStr) return { isActive: false as const };
  const batchStart = new Date(batchDateStr);
  batchStart.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - batchStart.getTime()) / 86400000);
  if (diffDays < 0 || diffDays >= 14) return { isActive: false as const };
  if (isFreeBatchOver(batchEndDateStr)) return { isActive: false as const };
  const currentDay = diffDays + 1;
  const week = currentDay <= 7 ? 1 : 2;
  return { isActive: true as const, currentDay, week };
};

/** Standalone "live session" page for free-batch students — embeds the current live YouTube class, with pricing below. */
const LiveSession = () => {
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
  const [videoMeta, setVideoMeta] = useState<{ title: string; author_name: string } | null>(null);

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
        const isOngoingStatus = status === "registered" || status === "14DaysOngoing" || status === "14daysongoing";
        const batchInfo = getActiveBatchInfo(data?.free_batch_start_date, data?.free_batch_end_date, today);

        if (!isOngoingStatus || !batchInfo.isActive) {
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

  const forceDayParam = searchParams.get("forceDay");
  const timeParam = searchParams.get("time");
  const today = forceDayParam !== null && studentData?.free_batch_start_date
    ? getSimulatedBatchDate(studentData.free_batch_start_date, parseInt(forceDayParam, 10))
    : (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
  const batchInfo = getActiveBatchInfo(studentData?.free_batch_start_date, studentData?.free_batch_end_date, today);
  const { week } = batchInfo.isActive ? batchInfo : { week: 1 };

  const totalMin = getCurrentTotalMin(timeParam);
  const isMorning = totalMin < 15 * 60 + 30;
  const langKey = (studentData?.language || "Telugu").toLowerCase();
  const freeSessionCode = `14d_week${week}_${isMorning ? "morning" : "evening"}`;

  const apiSessionEntry = sessionLinks.find((s: any) => s.session_code === freeSessionCode && s.language === langKey);
  const sessionLink = apiSessionEntry?.link || studentData?.free_classes_joining_link || "https://www.youtube.com/c/Healthyday";
  const ytMatch = sessionLink.match(YT_ID_REGEX);

  const previewVideoParam = searchParams.get("previewVideo");
  const previewVideoId = previewVideoParam
    ? extractYoutubeId(previewVideoParam) ?? PREVIEW_VIDEO_ID
    : null;

  const sessionVideoId = previewVideoId || (ytMatch ? ytMatch[1] : null);
  const liveSlot = !!previewVideoId || !!ALL_SLOTS.find((s) => totalMin >= s.start && totalMin < s.end);

  useEffect(() => {
    if (!liveSlot || !sessionVideoId) {
      setVideoMeta(null);
      return;
    }
    fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${sessionVideoId}`)}&format=json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setVideoMeta(data ? { title: data.title, author_name: data.author_name } : null))
      .catch(() => setVideoMeta(null));
  }, [liveSlot, sessionVideoId]);

  if (loading) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div style={{ width: "48px", height: "48px", border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading your live session...</p>
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
              title="Live Yoga Session"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>

          {videoMeta && (
            <div style={{ padding: "14px 20px 0" }}>
              <p style={{ color: "#202020", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, margin: "0 0 4px", lineHeight: "1.3" }}>
                {videoMeta.title}
              </p>
              <p style={{ color: "#666", fontFamily: "Outfit", fontSize: "13px", fontWeight: 500, margin: 0 }}>
                {videoMeta.author_name}
              </p>
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: "24px 20px 0", display: "flex", justifyContent: "center" }}>
          <NoSessionsCard totalMin={totalMin} isFreeBatch={true} />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
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

export default LiveSession;
