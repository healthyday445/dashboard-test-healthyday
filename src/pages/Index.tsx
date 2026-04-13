import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";

// ─── Dynamic Milestone Window System ───────────────────────────────────────────
// Shows only 2 milestones at a time and clamps indicator position to guarantee
// minimum spacing between labels. Prevents all text/icon collisions.
const ALL_REF_MILESTONES = [
  { count: 5, label: "+10 FREE Classes", lines: ["+10 FREE", "Classes"] },
  { count: 10, label: "+20 FREE Classes", lines: ["+20 FREE", "Classes"] },
  { count: 20, label: "Healthyday T-shirt", lines: ["Healthyday", "T-shirt"] },
  { count: 40, label: "Water Bottle", lines: ["Water", "Bottle"] },
  { count: 60, label: "Yoga Mat", lines: ["Yoga Mat"] },
];

function getRefWindow(refCount: number) {
  const nextIdx = ALL_REF_MILESTONES.findIndex(m => refCount < m.count);

  let milestones: typeof ALL_REF_MILESTONES;
  let windowEnd: number;

  if (nextIdx === -1) {
    // All milestones completed — show last two
    milestones = ALL_REF_MILESTONES.slice(-2);
    windowEnd = 65;
  } else if (nextIdx <= 1) {
    // Early stage (0–12 referrals): show [5, 10]
    milestones = ALL_REF_MILESTONES.slice(0, 2);
    windowEnd = 13;
  } else {
    // Show next + one future milestone (max 2 for clean spacing)
    const end = Math.min(nextIdx + 2, ALL_REF_MILESTONES.length);
    milestones = ALL_REF_MILESTONES.slice(nextIdx, end);
    const last = milestones[milestones.length - 1];
    windowEnd = Math.round(last.count * 1.1);
  }

  // --- Indicator position with minimum-gap enforcement ---
  const reachedMs = milestones.filter(m => refCount >= m.count);
  const mergedMs = reachedMs.length > 0 ? reachedMs[reachedMs.length - 1] : null;
  const showStandalone = !mergedMs;

  const naturalPos = refCount === 0 ? 9 : Math.max(9, (refCount / windowEnd) * 100);
  const nextMs = milestones.find(m => refCount < m.count);
  const nextMsPos = nextMs ? (nextMs.count / windowEnd) * 100 : 100;
  const MIN_GAP = 25; // 25% of track width — guarantees ~85px on a 340px track

  let indicatorPos = naturalPos;
  if (showStandalone && nextMs && (nextMsPos - naturalPos) < MIN_GAP) {
    indicatorPos = Math.max(9, nextMsPos - MIN_GAP);
  }

  return {
    milestones,
    windowEnd,
    indicatorPos,
    progressPct: Math.min(100, indicatorPos),
    mergedMs,
    showStandalone,
    indicatorColor: refCount === 0 ? "#FF0000" : "#FEAB27",
  };
}
// ────────────────────────────────────────────────────────────────────────────────

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M15.9677 10.1262C14.9738 13.5804 11.7558 16 8.1468 16C3.65791 16 0 12.3421 0 7.8532C0 4.24417 2.4196 1.02618 5.87384 0.0322749C6.20786 -0.0654867 6.56632 0.064862 6.76999 0.341853C6.96551 0.626991 6.96551 1.00989 6.76184 1.28688C6.06937 2.25635 5.70276 3.3969 5.70276 4.59448C5.70276 7.73915 8.26085 10.2972 11.4055 10.2972C12.6031 10.2972 13.7436 9.93064 14.7131 9.23816C14.9901 9.03449 15.373 9.03449 15.6581 9.23001C15.9351 9.43368 16.0655 9.79214 15.9677 10.1262Z" fill="#5462F0" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="4" fill="#FEAB27" />
    <path d="M8 0.5V2.5M8 13.5V15.5M15.5 8H13.5M2.5 8H0.5M13.3 2.7L11.9 4.1M4.1 11.9L2.7 13.3M13.3 13.3L11.9 11.9M4.1 4.1L2.7 2.7" stroke="#FEAB27" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PlayButton = () => (
  <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68" height="48" rx="14" fill="#FF0000" fillOpacity="0.95" />
    <path d="M45 24L28 34V14L45 24Z" fill="white" />
  </svg>
);

const teluguVideos = [
  {
    id: "SyjnCjDtNS8",
    title: "15 Minutes Yoga for Beginners",
    duration: "18:51",
    subtitle: "Healthyday Yoga Telugu",
  },
  {
    id: "CgWC09sydHk",
    title: "15 Minutes Pranayama",
    duration: "18:04",
    subtitle: "Healthyday Yoga Telugu",
  },
  {
    id: "raCc7Z31LYw",
    title: "15 Minutes Meditation",
    duration: "18:23",
    subtitle: "Healthyday Yoga Telugu",
  },
  {
    id: "bl3W5tzK4ds",
    title: "Recharge your mind with Yoga Nidra",
    duration: "22:56",
    subtitle: "Healthyday Yoga Telugu",
  },
];

const englishVideos = [
  {
    id: "SyjnCjDtNS8",
    title: "15 Minutes Yoga for Beginners",
    duration: "18:51",
    subtitle: "Healthyday Yoga English",
  },
  {
    id: "aC7Vi9qUExs",
    title: "15 Minutes Pranayama",
    duration: "18:04",
    subtitle: "Healthyday Yoga English",
  },
  {
    id: "u1Hom0s7ibU",
    title: "5-Minute Gratitude Meditation",
    duration: "18:23",
    subtitle: "Healthyday Yoga English",
  },
  {
    id: "n0iI0ZSVTWA",
    title: "Recharge your mind with Yoga Nidra",
    duration: "22:56",
    subtitle: "Healthyday Yoga English",
  },
];

const VideoCard = ({ video }: { video: (typeof teluguVideos)[0] }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="block" style={{ width: "100%" }}>
      <div className="relative overflow-hidden" style={{ width: "100%", aspectRatio: "342/188", borderRadius: "12px" }}>
        {playing ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          />
        ) : (
          <div className="cursor-pointer relative w-full h-full" onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "12px",
                background: "rgba(0, 0, 0, 0.32)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayButton />
            </div>
            <div
              className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: "11px", fontWeight: 600 }}
            >
              {video.duration}
            </div>
          </div>
        )}
      </div>
      <p style={{ color: "#1A1A1A", fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>
        {video.title}
      </p>
      <p style={{ color: "#888", fontSize: "12px", fontWeight: 400 }}>
        {video.subtitle}
      </p>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const { mobile } = useParams<{ mobile: string }>();
  const location = useLocation();
  const previewMode = new URLSearchParams(location.search).get("preview");
  const [showReferral, setShowReferral] = useState(true);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [joinedDays, setJoinedDays] = useState<number[]>(() => {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("hd_joined_"));
      for (const k of keys) {
        const stored = localStorage.getItem(k);
        if (stored) return JSON.parse(stored);
      }
    } catch { }
    return [];
  });

  useEffect(() => {
    // Helper: get local date string (YYYY-MM-DD) without UTC timezone shift
    const toLocalDateStr = (d: Date) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };
    // â”€â”€ PREVIEW MODE: bypass API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (previewMode === "batch") {
      const today = new Date();
      const day = today.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      const monday = new Date(today);
      monday.setDate(today.getDate() + diffToMonday);
      const yyyyMMDD = toLocalDateStr(monday);
      setStudentData({
        language: "Telugu",
        status: "registered",
        free_batch_start_date: yyyyMMDD,
        attendance: ["present", "present", "present"],
        free_class_join_link: "https://www.youtube.com/c/Healthyday",
        referral_link: "healthyday.app/ref=preview123",
      });
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    if (previewMode === "sunday") {
      const today = new Date();
      const sixDaysAgo = new Date(today);
      sixDaysAgo.setDate(today.getDate() - 6);
      const yyyyMMDD = toLocalDateStr(sixDaysAgo);
      setStudentData({
        language: "Telugu",
        status: "registered",
        free_batch_start_date: yyyyMMDD,
        attendance: ["present", "present", "present", "present", "present", "present"],
        free_class_join_link: "https://www.youtube.com/c/Healthyday",
        referral_link: "healthyday.app/ref=preview123",
      });
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    if (previewMode === "completed") {
      setStudentData({ language: "Telugu", status: "14 day completed" });
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    if (previewMode === "onboarding") {
      setStudentData({ language: "Telugu", status: "registered" });
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    if (previewMode === "paid") {
      setStudentData({
        language: "Telugu",
        status: "paid",
        paid_classes_joining_link: "https://www.youtube.com/c/Healthyday",
        referral_link: "healthyday.app/ref=preview123",
        total_referral_count: 3,
        attendance_tracker: [],
      });
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    // ?preview=elapsed — preview ongoing user whose 14-day batch has elapsed
    if (previewMode === "elapsed") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 15); // batch started 15 days ago
      const yyyyMMDD = toLocalDateStr(startDate);
      setStudentData({
        language: "Telugu",
        status: "registered",
        free_batch_start_date: yyyyMMDD,
        attendance: ["present", "present", "present", "present", "present", "present", "present",
          "present", "present", "present", "absent", "present", "present", "present"],
        free_class_join_link: "https://www.youtube.com/c/Healthyday",
        referral_link: "healthyday.app/ref=preview123",
      });
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    // ?preview=day1 … day14 — preview a specific batch day
    if (previewMode && previewMode.startsWith("day")) {
      const dayNum = Number(previewMode.slice(3));
      if (dayNum >= 1 && dayNum <= 14) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (dayNum - 1));
        const yyyyMMDD = toLocalDateStr(startDate);
        setStudentData({
          language: "Telugu",
          status: "registered",
          free_batch_start_date: yyyyMMDD,
          attendance: Array(dayNum - 1).fill("present"),
          free_class_join_link: "https://www.youtube.com/c/Healthyday",
          referral_link: "healthyday.app/ref=preview123",
        });
        setAuthenticated(true);
        setLoading(false);
        return;
      }
    }
    // â”€â”€ NORMAL FLOW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (!mobile) {
      setLoading(false);
      setError("No mobile number provided. Please visit /<mobile_number> to login.");
      return;
    }

    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        const encodedMobile = encodeURIComponent(`+91${mobile}`);
        const response = await fetch(
          `/.netlify/functions/student?mobile=${encodedMobile}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setStudentData(data);

        // Store referral data for the Referral page
        sessionStorage.setItem("total_referral_count", String(data.total_referral_count ?? 0));
        sessionStorage.setItem("referrer_mobile", mobile || "");

        if (data.language === "Telugu" || data.language === "English") {
          setAuthenticated(true);
        } else {
          setShowComingSoon(true);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [mobile, previewMode]);

  // --- Join tracking via localStorage (must be before any conditional returns) ---
  const joinStorageKey = `hd_joined_${mobile}_${studentData?.free_batch_start_date}`;
  useEffect(() => {
    if (!studentData?.free_batch_start_date) return;
    try {
      const stored = localStorage.getItem(joinStorageKey);
      if (stored) setJoinedDays(JSON.parse(stored));
    } catch { }
  }, [joinStorageKey, studentData?.free_batch_start_date]);

  // --- Loading Screen ---
  if (loading) {
    return (
      <div
        className="hd-page bg-background flex flex-col items-center justify-center"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid #EDF6FF",
              borderTop: "4px solid #FEAB27",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading your dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // --- Error Screen ---
  if (error) {
    return (
      <div
        className="hd-page bg-background flex flex-col items-center justify-center"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div
          style={{
            background: "#FFF3F3",
            border: "1px solid #FFD4D4",
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
            maxWidth: "340px",
          }}
        >
          <p style={{ color: "#D32F2F", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
            Oops!
          </p>
          <p style={{ color: "#666", fontSize: "14px", fontWeight: 400 }}>{error}</p>
        </div>
      </div>
    );
  }

  // --- "Coming Soon" Popup for non-Telugu users ---
  if (showComingSoon) {
    return (
      <div
        className="hd-page bg-background flex items-center justify-center"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.55)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "340px",
              borderRadius: "16px",
              background: "#fff",
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              fontFamily: "Outfit, sans-serif",
              animation: "popIn 0.3s ease-out",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#FFF3E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "28px",
              }}
            >
              🌍
            </div>
            <h2 style={{ color: "#202020", fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>
              English is Coming Soon!
            </h2>
            <p style={{ color: "#888", fontSize: "14px", fontWeight: 400, lineHeight: "1.5", marginBottom: "24px" }}>
              We're currently available in <strong style={{ color: "#FEAB27" }}>Telugu</strong> only.
              English support is on the way — stay tuned!
            </p>
            <div
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "#F0F0F0",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  background: "linear-gradient(90deg, #FEAB27, #FF8C00)",
                  borderRadius: "3px",
                  animation: "progressPulse 1.5s ease-in-out infinite",
                }}
              />
            </div>
            <style>{`
              @keyframes popIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              @keyframes progressPulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  // --- Active Batch: helper ---
  const getActiveBatchInfo = (batchDateStr: string | null | undefined) => {
    if (!batchDateStr) return { isActive: false as const };
    const batchStart = new Date(batchDateStr);
    batchStart.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - batchStart.getTime()) / 86400000);
    if (diffDays < 0 || diffDays >= 14) return { isActive: false as const };
    const currentDay = diffDays + 1; // 1-indexed
    const week = currentDay <= 7 ? 1 : 2;
    const batchEnd = new Date(batchStart);
    batchEnd.setDate(batchStart.getDate() + 13);
    const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const MON_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fmt = (d: Date) => `${DAY_NAMES[d.getDay()]}, ${MON_NAMES[d.getMonth()]} ${d.getDate()}`;
    return {
      isActive: true as const,
      currentDay,
      week,
      dateRangeLabel: `${fmt(batchStart)} — ${fmt(batchEnd)}`,
    };
  };

  const batchInfo = getActiveBatchInfo(studentData?.free_batch_start_date);
  const studentStatus = studentData?.status;
  const isOngoingStatus = studentStatus === "registered" || studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing";
  const isPaid = studentStatus === "paid";
  const paidInActiveBatch = isPaid && batchInfo.isActive;
  const sessionJoinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link;
  const hasBatchAccess = (isOngoingStatus || paidInActiveBatch) && batchInfo.isActive && !!sessionJoinLink;

  // --- Active Batch Dashboard (Week 1 or Week 2) ---
  if (hasBatchAccess) {
    const { currentDay, week, dateRangeLabel } = batchInfo;

    // Resolve free batch attendance from free_batches[].attendance_tracker
    const freeBatches: any[] = studentData?.free_batches ?? [];
    const activeBatchEntry = freeBatches.find(b => b.start_date === studentData?.free_batch_start_date) ?? freeBatches[freeBatches.length - 1];
    const attendedDates = new Set<string>(activeBatchEntry?.attendance_tracker ?? []);
    const batchOrigin = new Date(studentData?.free_batch_start_date!);
    batchOrigin.setHours(0, 0, 0, 0);

    // --- Join tracking ---
    const markTodayJoined = () => {
      if (!joinedDays.includes(currentDay)) {
        const updated = [...joinedDays, currentDay];
        setJoinedDays(updated);
        localStorage.setItem(joinStorageKey, JSON.stringify(updated));
      }
    };

    // Build 14 status values: "green" | "yellow" | "future"
    const dayStatus = Array.from({ length: 14 }, (_, i) => {
      const dayNum = i + 1;
      if (dayNum > currentDay) return "future";
      const didJoin = joinedDays.includes(dayNum);
      const d = new Date(batchOrigin);
      d.setDate(batchOrigin.getDate() + i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (didJoin || attendedDates.has(dateStr)) return "green";
      return "yellow";
    });

    const sessionLink = sessionJoinLink ?? "https://www.youtube.com/c/Healthyday";
    const ytIdMatch = sessionLink.match(/(?:v=|youtu\.be\/|\/live\/)([a-zA-Z0-9_-]{11})/);
    const sessionVideoId = ytIdMatch ? ytIdMatch[1] : null;
    const referralLink = studentData?.referral_link ?? "healthyday.app/ref=ggtujev58";

    const shareLink = mobile ? `https://healthyday.co.in/free-programmes?ref=91${mobile}` : referralLink;
    const handleCopyLink = () => navigator.clipboard.writeText(shareLink);
    const handleWhatsAppShare = () => {
      const msg = encodeURIComponent(`Join me on Healthyday! ${shareLink}`);
      window.open(`https://wa.me/?text=${msg}`, "_blank");
    };

    const DayBox = ({ status, dayLabel }: { status: string; dayLabel: string }) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "42px" }}>
        <div style={{
          width: "36.763px", height: "36.763px", aspectRatio: "1/1", borderRadius: "5px",
          background: status === "future"
            ? "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B"
            : status === "yellow" ? "#FEAB27" : "#0D9400",
          opacity: status === "future" ? 0.5 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px",
        }}>
          {status === "green" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8.7071" cy="8.7071" r="8.7071" fill="white" />
              <path d="M4.5 8.90237L7.77251 11.8047L14.3175 6" stroke="#0D9400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {status === "yellow" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8.7071" cy="8.7071" r="8.7071" fill="white" />
              <path d="M11.9619 4.83728L4.10791 12.5769M4.10791 4.83728L11.9619 12.5769" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {status === "future" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle opacity="0.5" cx="8.7071" cy="8.7071" r="8.7071" fill="white" />
            </svg>
          )}
        </div>
        <span style={{ color: "#666", fontFamily: "Outfit", fontSize: "10px", fontWeight: 600 }}>{dayLabel}</span>
      </div>
    );

    // --- Bonus Session Days (3, 5, 7, 10, 14) ---
    const BONUS_DAYS = [3, 5, 7, 10, 14];
    if (BONUS_DAYS.includes(currentDay)) {
      const lang = studentData?.language === "English" ? "English" : "Telugu";
      type BonusInfo = { name: string; fullName: string; startMin: number; videoId: string; sessionLink: string; thumbnail: string };
      const bonusByDay: Record<number, Record<string, BonusInfo>> = {
        3: {
          Telugu: { name: "Face Yoga Session", fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/faceyoga", thumbnail: "/bonus/faceyoga_tel.jpg" },
          English: { name: "Face Yoga Session", fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/faceyoga_eng", thumbnail: "/bonus/faceyoga_eng.jpg" },
        },
        5: {
          Telugu: { name: "Meditation Session", fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, videoId: "raCc7Z31LYw", sessionLink: "https://start.dailyyogawithjagan.com/meditation_tel", thumbnail: "/bonus/meditation_tel.jpg" },
          English: { name: "Meditation Session", fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, videoId: "u1Hom0s7ibU", sessionLink: "https://start.dailyyogawithjagan.com/meditation_eng", thumbnail: "/bonus/meditation_eng.jpg" },
        },
        7: {
          Telugu: { name: "Weight Loss Session", fullName: "Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession", thumbnail: "/bonus/weightlosssession.jpg" },
          English: { name: "Weight Loss Session", fullName: "Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession_eng", thumbnail: "/bonus/weightlosssession_eng.jpg" },
        },
        10: {
          Telugu: { name: "Breath Work Session", fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/breathwork", thumbnail: "/bonus/breathwork.jpg" },
          English: { name: "Breath Work Session", fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/bw_eng", thumbnail: "/bonus/bw_eng.jpg" },
        },
        14: {
          Telugu: { name: "Sleep Session", fullName: "Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/sleepsession", thumbnail: "/bonus/sleepsession.jpg" },
          English: { name: "Sleep Session", fullName: "Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/sleepsession_eng", thumbnail: "/bonus/sleepsession_eng.jpg" },
        },
      };
      const bonusSession = bonusByDay[currentDay][lang];
      const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
      const totalMin = nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
      const showBonus = totalMin >= bonusSession.startMin - 30 && totalMin < bonusSession.startMin + 30;
      if (showBonus) {
        const isLive = totalMin >= bonusSession.startMin && totalMin < bonusSession.startMin + 30;
        const isAMSession = bonusSession.startMin < 12 * 60;
        const nextSlots = isAMSession ? ["4:30 PM", "5:30 PM", "6:30 PM"] : ["5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM"];
        const nextWhen = isAMSession ? "at 4:30 PM" : "tomorrow at 5:30 AM";
        return (
          <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
            {/* Header */}
            <header className="hd-header bg-white">
              <img src={logo} alt="Healthyday" className="h-7" />
            </header>

            {/* Bonus Special Session */}
            <div style={{ padding: "24px 20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>
                  Bonus Special Session
                </h2>
                {isLive && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
                    <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>LIVE</span>
                  </div>
                )}
              </div>

              {isLive ? (
                <>
                  <a href={`https://youtu.be/${bonusSession.videoId}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px", overflow: "hidden", background: "#000", position: "relative", marginBottom: "12px" }}>
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

              {/* Next regular session card */}
              <div style={{
                width: "100%", height: "auto", borderRadius: "12px",
                border: "1.5px solid #D2D2D2", background: "#FFF",
                boxShadow: "-1px -1px 4px 0 rgba(0,0,0,0.10), 1px 1px 4px 0 rgba(0,0,0,0.10)",
                padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "82px", height: "81px", aspectRatio: "82/81", borderRadius: "50%", flexShrink: 0,
                    background: "url(/8ea326ab563adb61ccb99b953865cb3132c173ab.png) lightgray -5.311px -5.747px / 112.404% 113.525% no-repeat",
                  }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal", width: "231.658px" }}>
                      Next regular session is {nextWhen}
                    </div>
                    <div style={{ color: "#7990AC", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "24px", width: "244px" }}>
                      Open the link during live timings
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0" }}>
                  {nextSlots.map((label, idx) => (
                    <span key={label} style={{ display: "flex", alignItems: "center" }}>
                      {idx > 0 && <span style={{ color: "#CCCBCB", fontFamily: "Outfit", fontSize: "16px", fontStyle: "normal", fontWeight: 800, lineHeight: "normal", margin: "0 8px" }}>|</span>}
                      <span style={{ color: "#FEAB27", textAlign: "center", fontFamily: "Outfit", fontSize: "16px", fontStyle: "normal", fontWeight: 800, lineHeight: "normal" }}>{label}</span>
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "5px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
                    <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
                    <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
                    <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
                    <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: "#747474", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "22px", textAlign: "center", width: "289.656px" }}>
                    Note: No recordings are available for FREE batch
                  </span>
                </div>
              </div>
            </div>

            {/* 14 Days Attendance */}
            <div style={{ padding: "28px 20px 0" }}>
              <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
                Your 14 Days Attendance
              </h3>
              <div style={{ width: "100%", borderRadius: "15px", border: "1px solid #FFC76F", padding: "16px 12px", background: "#FFE5BA", boxSizing: "border-box" }}>
                <p style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, marginBottom: "14px" }}>
                  {dateRangeLabel}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {dayStatus.slice(0, 7).map((status, i) => (
                    <DayBox key={i} status={status} dayLabel={`Day ${i + 1}`} />
                  ))}
                </div>
                {week === 2 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px" }}>
                    {dayStatus.slice(7, 14).map((status, i) => (
                      <DayBox key={i} status={status} dayLabel={`Day ${i + 8}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Referral Milestones — Week 1 only */}
            {week === 1 && (() => {
              const refCount = studentData?.total_referral_count ?? 0;
              const milestones = [
                { label: "10 Free Classes", reward: "+10", refs: 5 },
                { label: "20 Free Classes", reward: "+20", refs: 10 },
                { label: "Healthyday T-shirt", reward: null, refs: 20 },
                { label: "Water Bottle", reward: null, refs: 40 },
                { label: "Yoga Mat", reward: null, refs: 60 },
              ];
              // Find the first unclaimed milestone index
              const nextIdx = milestones.findIndex(m => refCount < m.refs);
              // Build rows: insert "You are here" before first unclaimed milestone
              type MRow2 = { type: "milestone"; m: typeof milestones[0]; claimed: boolean; isNext: boolean };
              type HRow2 = { type: "here" };
              type Row2 = MRow2 | HRow2;
              const rows2: Row2[] = [];
              let hereInserted2 = false;
              milestones.forEach((m, idx) => {
                const claimed = refCount >= m.refs;
                const isNext = idx === nextIdx;
                if (idx === nextIdx && !hereInserted2) {
                  rows2.push({ type: "here" });
                  hereInserted2 = true;
                }
                rows2.push({ type: "milestone", m, claimed, isNext });
              });
              if (!hereInserted2) rows2.push({ type: "here" }); // all claimed
              return (
                <div style={{ padding: "28px 20px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Referral Milestones</h3>
                    <span
                      onClick={() => {
                        const dest = (refCount > 0 && (studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing"))
                          ? `/referral-status?count=${refCount}&mobile=${mobile || ""}`
                          : `/referral?count=${refCount}&mobile=${mobile || ""}`;
                        navigate(dest);
                      }}
                      style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                    >
                      View More
                    </span>
                  </div>
                  <div style={{ width: "100%", borderRadius: "16px", background: "#FFF", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px", boxSizing: "border-box" }}>
                    <div style={{ position: "relative" }}>
                      {/* Vertical connecting line */}
                      <div style={{ position: "absolute", left: "15px", top: "16px", bottom: "16px", width: "3px", background: "#DDDEDE", borderRadius: "2px", zIndex: 0 }} />
                      {/* Dynamic rows: "You are here" inserted before first unclaimed milestone */}
                      {rows2.map((row, ri) => {
                        if (row.type === "here") {
                          if (refCount === 0) {
                            return (
                              <div key="here" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                                <div style={{ flexShrink: 0, width: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <circle cx="11" cy="11" r="11" fill="#FF0000" />
                                  </svg>
                                </div>
                                <span style={{ color: "#F00", fontFamily: "Outfit", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>
                                  0 Referrals
                                </span>
                                <div style={{ width: "106px", height: "28px", borderRadius: "20px", border: "1px solid #F00", background: "rgba(254, 171, 39, 0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <span style={{ color: "#F00", textAlign: "center", fontFamily: "Outfit", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>
                                    You are here
                                  </span>
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div key="here" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                              <div style={{ flexShrink: 0, width: "33px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FEAB27", boxShadow: "0 0 0 4px rgba(254,171,39,0.25)" }} />
                              </div>
                              <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600 }}>{refCount} Referrals</span>
                              <div style={{ height: "21px", borderRadius: "20px", border: "1px solid #FEAB27", background: "rgba(254,171,39,0.20)", display: "flex", alignItems: "center", padding: "0 10px" }}>
                                <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600 }}>You are here</span>
                              </div>
                            </div>
                          );
                        }
                        const { m, claimed, isNext } = row as MRow2;
                        const isLastRow = ri === rows2.length - 1;
                        return (
                          <div key={m.refs} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isLastRow ? 0 : "14px", position: "relative", zIndex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              {claimed ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                                  <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E" />
                                  {m.reward && <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>}
                                  {!m.reward && <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
                                </svg>
                              ) : (
                                <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                    {isNext
                                      ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" />
                                      : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />}
                                  </svg>
                                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                      <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z" stroke={isNext ? "#FEAB27" : "#A2A2A2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                              <div>
                                <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#377456" : isNext ? "#FEAB27" : "#9A9797" }}>
                                  {claimed && m.reward ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</> : m.label}
                                </div>
                                <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{m.refs} Referrals</div>
                              </div>
                            </div>
                            {claimed && (
                              <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>CLAIMED 🎁</span>
                            )}
                            {isNext && (
                              <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>NEXT GOAL</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Refer and Win */}
            <div style={{ padding: "28px 20px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
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
              <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal", margin: 0 }}>Refer and Win!</h3>
              <p style={{ color: "#ADADAD", fontFamily: "Outfit", fontSize: "18px", fontWeight: 500, lineHeight: "normal", textAlign: "center", width: "286px", margin: 0 }}>Every active referral earn gifts and rewards for you</p>
            </div>

            {/* Week 2 Bonus: show payment section instead */}
            {week === 2 && (
              <>
                <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
                  <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
                  <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
                </div>
                <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: "100%", borderRadius: "16px", background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <h3 style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "21px", fontWeight: 700, lineHeight: "normal", margin: "0 0 4px" }}>Refer &amp; Earn</h3>
                      <p style={{ color: "#FFFCFC", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "normal", margin: 0 }}>Invite your friends &amp; family and get exciting gifts!</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>SHARE THIS LINK</span>
                      <div style={{ width: "100%", height: "48px", borderRadius: "8px", border: "1.218px solid #B4B4B4", background: "#FFF", display: "flex", alignItems: "center", padding: "0 12px", gap: "8px" }}>
                        <span style={{ color: "#8E8E8E", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "normal", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{shareLink}</span>
                        <button onClick={handleCopyLink} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center", flexShrink: 0 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={handleCopyLink} style={{ flex: 1, height: "40px", borderRadius: "8px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g clipPath="url(#clip_copy_bonus)"><path d="M6.49744 4.3332C5.58188 4.14913 4.63123 4.27241 3.79274 4.68395C2.95425 5.0955 2.27469 5.77233 1.85933 6.60964C1.44396 7.44695 1.31596 8.39801 1.49515 9.31552C1.67434 10.233 2.15073 11.0658 2.85052 11.6848C3.55031 12.3039 4.43447 12.6746 5.36605 12.7397C6.29763 12.8048 7.22465 12.5605 8.00354 12.0448C8.78243 11.5291 9.36972 10.7706 9.67446 9.8869C9.9792 9.0032 9.98438 8.04356 9.6892 7.15662M10.481 12.6674C11.3975 12.8525 12.3494 12.7294 13.1889 12.3173C14.0284 11.9053 14.7086 11.2273 15.1238 10.3887C15.539 9.55001 15.666 8.59759 15.4852 7.67925C15.3043 6.76091 14.8257 5.92803 14.1236 5.30989C13.4215 4.69175 12.5352 4.32294 11.6023 4.2607C10.6694 4.19846 9.74209 4.44628 8.96427 4.96569C8.18646 5.4851 7.60168 6.24704 7.30071 7.13324C6.99975 8.01943 6.99943 8.98031 7.29982 9.8667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g><defs><clipPath id="clip_copy_bonus"><rect width="16.9812" height="17" fill="white" /></clipPath></defs></svg>
                        <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500 }}>Copy Link</span>
                      </button>
                      <button onClick={handleWhatsAppShare} style={{ flex: 1, height: "40px", borderRadius: "8px", background: "#25D366", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500 }}>Share on Whatsapp</span>
                      </button>
                    </div>
                    <div style={{ textAlign: "center", cursor: "pointer", paddingTop: "4px" }} onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}>
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>Your Referrals {"\u2192"}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Referral Status Popup Overlay — Week 1 bonus days only */}
            {week === 1 && showReferral && (
              <div
                onClick={() => setShowReferral(false)}
                className="hd-popup-overlay"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="hd-popup-content"
                  style={{ height: "200px" }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>REFER & WIN</span>
                    <button onClick={() => setShowReferral(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ aspectRatio: "1/1" }}><path d="M11 1L1 11M1 1L11 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                  </div>
                  {/* Progress Bar */}
                  {(() => {
                    const refCount = studentData?.total_referral_count ?? 0;
                    const { milestones: allMilestones, windowEnd, indicatorPos, progressPct, mergedMs, showStandalone, indicatorColor } = getRefWindow(refCount);
                    const pinSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 21 24" fill="none"><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" fill="white" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" fill="white" /><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                    return (
                      <div style={{ position: "relative", marginTop: "60px", marginBottom: "40px" }}>
                        {/* Grey track */}
                        <div style={{ height: "6px", background: "#AAA", borderRadius: "3px", marginLeft: "9%" }}>
                          <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                        </div>
                        {/* Standalone indicator */}
                        {showStandalone && (
                          <div style={{ position: "absolute", left: `${indicatorPos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="9.5" fill={indicatorColor} /></svg>
                            <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4px" }}>
                              <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "6px", whiteSpace: "nowrap" }}>You are here</div>
                              {pinSvg}
                            </div>
                            <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px", textAlign: "center", whiteSpace: "nowrap" }}>
                              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{refCount} Referrals</span>
                            </div>
                          </div>
                        )}
                        {/* Milestone dots */}
                        {allMilestones.map((m) => {
                          const pos = (m.count / windowEnd) * 100;
                          const reached = refCount >= m.count;
                          const isMerged = mergedMs?.count === m.count;
                          return (
                            <div key={m.count} style={{ position: "absolute", left: `${pos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                              {/* Above dot: merged = "You are here" + pin + label; normal = just label */}
                              {isMerged ? (
                                <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                  <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "2px" }}>You are here</div>
                                  {pinSvg}
                                  <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, marginTop: "2px", whiteSpace: "nowrap" }}>{m.label}</span>
                                </div>
                              ) : (
                                <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                                  <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>{m.label}</span>
                                </div>
                              )}
                              {/* Dot */}
                              {reached ? (
                                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="12" fill="#DDDEDE" />
                                  <path d="M10.4243 11.1512V9.21185C10.4243 8.6975 10.6286 8.2042 10.9923 7.8405C11.356 7.47679 11.8493 7.27246 12.3637 7.27246C12.878 7.27246 13.3713 7.47679 13.735 7.8405C14.0987 8.2042 14.3031 8.6975 14.3031 9.21185V11.1512M8.96973 12.1209C8.96973 11.8638 9.07189 11.6171 9.25374 11.4353C9.4356 11.2534 9.68224 11.1512 9.93942 11.1512H14.7879C15.0451 11.1512 15.2917 11.2534 15.4736 11.4353C15.6554 11.6171 15.7576 11.8638 15.7576 12.1209V15.03C15.7576 15.2872 15.6554 15.5339 15.4736 15.7157C15.2917 15.8976 15.0451 15.9997 14.7879 15.9997H9.93942C9.68224 15.9997 9.4356 15.8976 9.25374 15.7157C9.07189 15.5339 8.96973 15.2872 8.96973 15.03V12.1209ZM11.8788 13.5755C11.8788 13.7041 11.9299 13.8274 12.0208 13.9183C12.1118 14.0093 12.2351 14.0603 12.3637 14.0603C12.4923 14.0603 12.6156 14.0093 12.7065 13.9183C12.7974 13.8274 12.8485 13.7041 12.8485 13.5755C12.8485 13.4469 12.7974 13.3236 12.7065 13.2327C12.6156 13.1417 12.4923 13.0906 12.3637 13.0906C12.2351 13.0906 12.1118 13.1417 12.0208 13.2327C11.9299 13.3236 11.8788 13.4469 11.8788 13.5755Z" stroke="#A2A2A2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                              {/* Label below */}
                              <div style={{ position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{m.count} Referrals</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                  {/* Refer Now Button */}
                  <button
                    onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}
                    style={{ width: "100%", height: "43px", borderRadius: "14px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                      <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>Refer Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      } // end if (showBonus)
    } // end if (BONUS_DAYS)

    return (
      <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
        {/* Header */}
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        {/* Your Yoga Session — live/not-live */}
        {(() => {
          const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
          const totalMin = nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();

          // Bonus session detection for regular session card
          const BONUS_DAYS = [3, 5, 7, 10, 14];
          const bonusByDayMap: Record<number, Record<string, { fullName: string; startMin: number; sessionLink: string; thumbnail: string }>> = {
            3: { Telugu: { fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/faceyoga", thumbnail: "/bonus/faceyoga_tel.jpg" }, English: { fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/faceyoga_eng", thumbnail: "/bonus/faceyoga_eng.jpg" } },
            5: { Telugu: { fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, sessionLink: "https://start.dailyyogawithjagan.com/meditation_tel", thumbnail: "/bonus/meditation_tel.jpg" }, English: { fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, sessionLink: "https://start.dailyyogawithjagan.com/meditation_eng", thumbnail: "/bonus/meditation_eng.jpg" } },
            7: { Telugu: { fullName: "Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession", thumbnail: "/bonus/weightlosssession.jpg" }, English: { fullName: "Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession_eng", thumbnail: "/bonus/weightlosssession_eng.jpg" } },
            10: { Telugu: { fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/breathwork", thumbnail: "/bonus/breathwork.jpg" }, English: { fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/bw_eng", thumbnail: "/bonus/bw_eng.jpg" } },
            14: { Telugu: { fullName: "Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/sleepsession", thumbnail: "/bonus/sleepsession.jpg" }, English: { fullName: "Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/sleepsession_eng", thumbnail: "/bonus/sleepsession_eng.jpg" } },
          };
          const bonusLang = studentData?.language === "English" ? "English" : "Telugu";
          const isBonusDay = BONUS_DAYS.includes(currentDay);
          const bonusSessionData = isBonusDay ? bonusByDayMap[currentDay][bonusLang] : null;
          const showBonus = isBonusDay && bonusSessionData !== null && totalMin >= bonusSessionData.startMin - 30 && totalMin < bonusSessionData.startMin + 30;

          const MORNING_SLOTS = [
            { start: 5 * 60 + 30, end: 6 * 60 + 30, label: "5:30 AM" },
            { start: 6 * 60 + 30, end: 7 * 60 + 30, label: "6:30 AM" },
            { start: 7 * 60 + 30, end: 8 * 60 + 30, label: "7:30 AM" },
            { start: 8 * 60 + 30, end: 9 * 60 + 30, label: "8:30 AM" },
          ];
          const EVENING_SLOTS = [
            { start: 16 * 60 + 30, end: 17 * 60 + 30, label: "4:30 PM" },
            { start: 17 * 60 + 30, end: 18 * 60 + 30, label: "5:30 PM" },
            { start: 18 * 60 + 30, end: 19 * 60 + 30, label: "6:30 PM" },
          ];
          const allSlots = [...MORNING_SLOTS, ...EVENING_SLOTS];
          const liveSlot = allSlots.find(s => totalMin >= s.start && totalMin < s.end);
          const nextSlot = allSlots.find(s => s.start > totalMin);
          const isTomorrow = !liveSlot && !nextSlot;
          const displaySlots = (!liveSlot && nextSlot)
            ? (MORNING_SLOTS.some(s => s.label === nextSlot.label) ? MORNING_SLOTS : EVENING_SLOTS)
            : MORNING_SLOTS; // tomorrow: show morning slots

          const nextLabel = nextSlot ? nextSlot.label : "5:30 AM";
          const nextText = isTomorrow ? `tomorrow at ${nextLabel}` : `at ${nextLabel}`;
          const noteText = liveSlot
            ? "Note: Evening Yoga Session will start at 4:30 PM with the same link"
            : `Next regular session is ${nextText}`;

          return (
            <div style={{ padding: "24px 20px 0" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Your Yoga Session</h2>
                {liveSlot && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
                    <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>LIVE</span>
                  </div>
                )}
              </div>

              {/* Session Card — hidden after bonus is done */}
              {!(isBonusDay && bonusSessionData && totalMin >= bonusSessionData.startMin + 45) && (
                <div style={{ width: "100%" }}>
                  {/* Thumbnail */}
                  <a href={showBonus && bonusSessionData ? bonusSessionData.sessionLink : sessionLink} target="_blank" rel="noopener noreferrer" onClick={markTodayJoined} style={{ display: "block", textDecoration: "none" }}>
                    <div style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "178/93",
                      borderRadius: "12px 12px 0 0",
                      background: (() => {
                        if (showBonus && bonusSessionData) return `url(${bonusSessionData.thumbnail}) lightgray 50% / cover no-repeat`;
                        const lang = studentData?.language;
                        if (lang === "English") return "url(/language%20English.jpg) lightgray 50% / cover no-repeat";
                        if (lang === "Telugu") return "url(/language%20Telugu.jpg) lightgray 50% / cover no-repeat";
                        return sessionVideoId
                          ? `url(https://img.youtube.com/vi/${sessionVideoId}/maxresdefault.jpg) lightgray 50% / cover no-repeat`
                          : "url(/language%20Telugu.jpg) lightgray 50% / cover no-repeat";
                      })(),
                      boxShadow: "1px 0 4px 0 rgba(0,0,0,0.25), -1px -1px 4px 0 rgba(0,0,0,0.25)",
                      position: "relative",
                    }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "12px", background: "rgba(0, 0, 0, 0.32)" }} />
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <PlayButton />
                      </div>
                    </div>
                  </a>

                  {/* Bottom bar */}
                  <div style={{
                    width: "100%",
                    height: "67px",
                    borderRadius: "0 0 12px 12px",
                    border: "1.5px solid #E9E9E9",
                    background: "#FFF",
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    paddingLeft: "16px",
                  }}>
                    {(() => {
                      // 30 min before bonus: show JOIN button linking to bonus
                      if (showBonus && bonusSessionData) {
                        return (
                          <a href={bonusSessionData.sessionLink} target="_blank" rel="noopener noreferrer" onClick={markTodayJoined} style={{
                            width: "300px", height: "40px", borderRadius: "10px", background: "#FEAB27",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none",
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN SESSION</span>
                          </a>
                        );
                      }
                      // Bonus day but outside 30-min window: show bonus session name text
                      if (isBonusDay && bonusSessionData) {
                        return (
                          <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>
                            {bonusSessionData.fullName}
                          </span>
                        );
                      }
                      // Regular day: show JOIN SESSION with API link
                      return (
                        <a href={sessionLink} target="_blank" rel="noopener noreferrer" onClick={markTodayJoined} style={{
                          width: "300px",
                          height: "40px",
                          borderRadius: "10px",
                          background: "#FEAB27",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          textDecoration: "none",
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN SESSION</span>
                        </a>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Note — hidden on bonus days since the card below already shows next session info */}
              {!isBonusDay && <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "5px", marginTop: "10px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
                  <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
                  <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
                  <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
                  <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ width: "268px", color: "#747474", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "22px", textAlign: "center" }}>
                  {noteText}
                </span>
              </div>}

              {/* Next regular session card — shown on bonus days */}
              {isBonusDay && bonusSessionData && (() => {
                const isAMBonus = bonusSessionData.startMin < 12 * 60;
                const nextRegSlots = isAMBonus ? ["4:30 PM", "5:30 PM", "6:30 PM"] : ["5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM"];
                const nextRegWhen = isAMBonus ? "at 4:30 PM" : "tomorrow at 5:30 AM";
                return (
                  <div style={{
                    width: "100%", borderRadius: "12px", marginTop: "16px",
                    border: "1.5px solid #D2D2D2", background: "#FFF",
                    boxShadow: "-1px -1px 4px 0 rgba(0,0,0,0.10), 1px 1px 4px 0 rgba(0,0,0,0.10)",
                    padding: "16px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "12px",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{
                        width: "82px", height: "81px", borderRadius: "50%", flexShrink: 0,
                        background: "url(/8ea326ab563adb61ccb99b953865cb3132c173ab.png) lightgray -5.311px -5.747px / 112.404% 113.525% no-repeat",
                      }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>
                          Next regular session is {nextRegWhen}
                        </div>
                        <div style={{ color: "#7990AC", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "24px" }}>
                          Open the link during live timings
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0" }}>
                      {nextRegSlots.map((label, idx) => (
                        <span key={label} style={{ display: "flex", alignItems: "center" }}>
                          {idx > 0 && <span style={{ color: "#CCCBCB", fontFamily: "Outfit", fontSize: "16px", fontStyle: "normal", fontWeight: 800, lineHeight: "normal", margin: "0 8px" }}>|</span>}
                          <span style={{ color: "#FEAB27", textAlign: "center", fontFamily: "Outfit", fontSize: "16px", fontStyle: "normal", fontWeight: 800, lineHeight: "normal" }}>{label}</span>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "5px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
                        <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
                        <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
                        <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
                        <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ color: "#747474", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "22px", textAlign: "center", width: "289px" }}>
                        Note: No recordings are available for FREE batch
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })()}

        {/* 14 Days Attendance */}
        <div style={{ padding: "28px 20px 0" }}>
          <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
            Your 14 Days Attendance
          </h3>
          <div style={{
            width: "100%", borderRadius: "15px",
            border: "1px solid #FFC76F", padding: "16px 12px", background: "#FFE5BA", boxSizing: "border-box",
          }}>
            <p style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, marginBottom: "14px" }}>
              {dateRangeLabel}
            </p>
            {/* Row 1: Days 1-7 */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: week === 2 ? "14px" : "0" }}>
              {dayStatus.slice(0, 7).map((status, i) => (
                <DayBox key={i} status={status} dayLabel={`Day ${i + 1}`} />
              ))}
            </div>
            {/* Row 2: Days 8-14 — only shown in week 2 */}
            {week === 2 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {dayStatus.slice(7, 14).map((status, i) => (
                  <DayBox key={i} status={status} dayLabel={`Day ${i + 8}`} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Week 2 Pricing & Comparison */}
        {week === 2 && (
          <PricingAndComparisonSection selectedPlanIdx={selectedPlanIdx} setSelectedPlanIdx={setSelectedPlanIdx} daysLeft={Math.max(0, 15 - currentDay)} />
        )}

        {/* Referral Milestones Section */}
        {week === 1 && (
          <>
            {(() => {
              const refCount = studentData?.total_referral_count ?? 0;
              const milestones = [
                { label: "10 Free Classes", reward: "+10", refs: 5 },
                { label: "20 Free Classes", reward: "+20", refs: 10 },
                { label: "Healthyday T-shirt", reward: null, refs: 20 },
                { label: "Water Bottle", reward: null, refs: 40 },
                { label: "Yoga Mat", reward: null, refs: 60 },
              ];
              const nextIdx = milestones.findIndex(m => refCount < m.refs);
              return (
                <div style={{ padding: "28px 20px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Referral Milestones</h3>
                    <span
                      onClick={() => {
                        const dest = (refCount > 0 && (studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing"))
                          ? `/referral-status?count=${refCount}&mobile=${mobile || ""}`
                          : `/referral?count=${refCount}&mobile=${mobile || ""}`;
                        navigate(dest);
                      }}
                      style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                    >
                      View More
                    </span>
                  </div>
                  <div style={{ width: "100%", borderRadius: "16px", background: "#FFF", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px", boxSizing: "border-box" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "15px", top: "16px", bottom: "16px", width: "3px", background: "#DDDEDE", borderRadius: "2px", zIndex: 0 }} />
                      {(() => {
                        type Row = { type: "here" } | { type: "milestone"; m: typeof milestones[0]; claimed: boolean; isNext: boolean };
                        const rows: Row[] = [];
                        let hereInserted = false;
                        milestones.forEach((m, idx) => {
                          const claimed = refCount >= m.refs;
                          const isNext = idx === nextIdx;
                          if (idx === nextIdx && !hereInserted) {
                            rows.push({ type: "here" });
                            hereInserted = true;
                          }
                          rows.push({ type: "milestone", m, claimed, isNext });
                        });
                        if (!hereInserted) rows.push({ type: "here" }); // all claimed

                        return rows.map((row, ri) => {
                          if (row.type === "here") {
                            if (refCount === 0) {
                              return (
                                <div key="here" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                                  <div style={{ flexShrink: 0, width: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                      <circle cx="11" cy="11" r="11" fill="#FF0000" />
                                    </svg>
                                  </div>
                                  <span style={{ color: "#F00", fontFamily: "Outfit", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>
                                    0 Referrals
                                  </span>
                                  <div style={{ width: "106px", height: "28px", borderRadius: "20px", border: "1px solid #F00", background: "rgba(254, 171, 39, 0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: "#F00", textAlign: "center", fontFamily: "Outfit", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>
                                      You are here
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <div key="here" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                                <div style={{ flexShrink: 0, width: "33px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FEAB27", boxShadow: "0 0 0 4px rgba(254,171,39,0.25)" }} />
                                </div>
                                <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600 }}>{refCount} Referrals</span>
                                <div style={{ height: "21px", borderRadius: "20px", border: "1px solid #FEAB27", background: "rgba(254,171,39,0.20)", display: "flex", alignItems: "center", padding: "0 10px" }}>
                                  <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600 }}>You are here</span>
                                </div>
                              </div>
                            );
                          }

                          const { m, claimed, isNext } = row;
                          const isLastRow = ri === rows.length - 1;
                          return (
                            <div key={m.refs} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isLastRow ? "0" : "14px", position: "relative", zIndex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                {claimed ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                                    <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E" />
                                    {m.reward ? (
                                      <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>
                                    ) : (
                                      <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    )}
                                  </svg>
                                ) : (
                                  <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                      {isNext
                                        ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" />
                                        : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />
                                      }
                                    </svg>
                                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z" stroke={isNext ? "#FEAB27" : "#A2A2A2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#377456" : isNext ? "#FEAB27" : "#9A9797" }}>
                                    {claimed && m.reward ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</> : m.label}
                                  </div>
                                  <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{m.refs} Referrals</div>
                                </div>
                              </div>
                              {claimed && <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>CLAIMED 🎁</span>}
                              {isNext && <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>IN PROGRESS</span>}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
              );

            })()}


            {/* Refer and Win banner */}
            <div style={{ padding: "28px 20px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
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
              <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal", margin: 0 }}>Refer and Win!</h3>
              <p style={{ color: "#ADADAD", fontFamily: "Outfit", fontSize: "18px", fontWeight: 500, lineHeight: "normal", textAlign: "center", width: "286px", margin: 0 }}>Every active referral earn gifts and rewards for you</p>
            </div>
          </>
        )}

        {week === 2 && (
          <>
            {/* Want More FREE Classes heading */}
            <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
              <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
              <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
            </div>
            {/* Refer & Earn */}
            <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Title + subtitle — left aligned */}
                <div>
                  <h3 style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "21px", fontWeight: 700, lineHeight: "normal", margin: "0 0 4px" }}>
                    Refer &amp; Earn
                  </h3>
                  <p style={{ color: "#FFFCFC", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "normal", margin: 0 }}>
                    Invite your friends &amp; family and get exciting gifts!
                  </p>
                </div>

                {/* Share Link */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>SHARE THIS LINK</span>
                  <div style={{ width: "100%", height: "48px", borderRadius: "8px", border: "1.218px solid #B4B4B4", background: "#FFF", display: "flex", alignItems: "center", padding: "0 12px", gap: "8px" }}>
                    <span style={{ color: "#8E8E8E", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "normal", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                      {shareLink}
                    </span>
                    {/* Inline copy icon */}
                    <button onClick={handleCopyLink} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center", flexShrink: 0 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Buttons — side by side */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={handleCopyLink}
                    style={{ flex: 1, height: "40px", borderRadius: "8px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <g clipPath="url(#clip_copy)">
                        <path d="M6.49744 4.3332C5.58188 4.14913 4.63123 4.27241 3.79274 4.68395C2.95425 5.0955 2.27469 5.77233 1.85933 6.60964C1.44396 7.44695 1.31596 8.39801 1.49515 9.31552C1.67434 10.233 2.15073 11.0658 2.85052 11.6848C3.55031 12.3039 4.43447 12.6746 5.36605 12.7397C6.29763 12.8048 7.22465 12.5605 8.00354 12.0448C8.78243 11.5291 9.36972 10.7706 9.67446 9.8869C9.9792 9.0032 9.98438 8.04356 9.6892 7.15662M10.481 12.6674C11.3975 12.8525 12.3494 12.7294 13.1889 12.3173C14.0284 11.9053 14.7086 11.2273 15.1238 10.3887C15.539 9.55001 15.666 8.59759 15.4852 7.67925C15.3043 6.76091 14.8257 5.92803 14.1236 5.30989C13.4215 4.69175 12.5352 4.32294 11.6023 4.2607C10.6694 4.19846 9.74209 4.44628 8.96427 4.96569C8.18646 5.4851 7.60168 6.24704 7.30071 7.13324C6.99975 8.01943 6.99943 8.98031 7.29982 9.8667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs><clipPath id="clip_copy"><rect width="16.9812" height="17" fill="white" /></clipPath></defs>
                    </svg>
                    <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500 }}>Copy Link</span>
                  </button>

                  <button
                    onClick={handleWhatsAppShare}
                    style={{ flex: 1, height: "40px", borderRadius: "8px", background: "#25D366", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500 }}>Share on Whatsapp</span>
                  </button>
                </div>

                {/* Your Referrals Link — centered */}
                <div style={{ textAlign: "center", cursor: "pointer", paddingTop: "4px" }} onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}>
                  <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>Your Referrals {"\u2192"}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Referral Status Popup Overlay — 14DaysOngoing simplified */}
        {showReferral && (
          <div
            onClick={() => setShowReferral(false)}
            className="hd-popup-overlay"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="hd-popup-content"
              style={{ height: "200px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>REFER & WIN</span>
                <button onClick={() => setShowReferral(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ aspectRatio: "1/1" }}><path d="M11 1L1 11M1 1L11 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              </div>
              {/* Progress Bar */}
              {(() => {
                const refCount = studentData?.total_referral_count ?? 0;
                const { milestones: allMilestones, windowEnd, indicatorPos, progressPct, mergedMs, showStandalone, indicatorColor } = getRefWindow(refCount);
                const pinSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 21 24" fill="none"><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" fill="white" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" fill="white" /><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                return (
                  <div style={{ position: "relative", marginTop: "60px", marginBottom: "40px" }}>
                    {/* Grey track */}
                    <div style={{ height: "6px", background: "#AAA", borderRadius: "3px", marginLeft: "9%" }}>
                      <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                    </div>
                    {/* Standalone indicator */}
                    {showStandalone && (
                      <div style={{ position: "absolute", left: `${indicatorPos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="9.5" fill={indicatorColor} /></svg>
                        <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4px" }}>
                          <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "6px", whiteSpace: "nowrap" }}>You are here</div>
                          {pinSvg}
                        </div>
                        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{refCount} Referrals</span>
                        </div>
                      </div>
                    )}
                    {/* Milestone dots */}
                    {allMilestones.map((m) => {
                      const pos = (m.count / windowEnd) * 100;
                      const reached = refCount >= m.count;
                      const isMerged = mergedMs?.count === m.count;
                      return (
                        <div key={m.count} style={{ position: "absolute", left: `${pos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                          {isMerged ? (
                            <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "2px" }}>You are here</div>
                              {pinSvg}
                              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, marginTop: "2px", whiteSpace: "nowrap" }}>{m.label}</span>
                            </div>
                          ) : (
                            <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>{m.label}</span>
                            </div>
                          )}
                          {reached ? (
                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="12" fill="#DDDEDE" />
                              <path d="M10.4243 11.1512V9.21185C10.4243 8.6975 10.6286 8.2042 10.9923 7.8405C11.356 7.47679 11.8493 7.27246 12.3637 7.27246C12.878 7.27246 13.3713 7.47679 13.735 7.8405C14.0987 8.2042 14.3031 8.6975 14.3031 9.21185V11.1512M8.96973 12.1209C8.96973 11.8638 9.07189 11.6171 9.25374 11.4353C9.4356 11.2534 9.68224 11.1512 9.93942 11.1512H14.7879C15.0451 11.1512 15.2917 11.2534 15.4736 11.4353C15.6554 11.6171 15.7576 11.8638 15.7576 12.1209V15.03C15.7576 15.2872 15.6554 15.5339 15.4736 15.7157C15.2917 15.8976 15.0451 15.9997 14.7879 15.9997H9.93942C9.68224 15.9997 9.4356 15.8976 9.25374 15.7157C9.07189 15.5339 8.96973 15.2872 8.96973 15.03V12.1209ZM11.8788 13.5755C11.8788 13.7041 11.9299 13.8274 12.0208 13.9183C12.1118 14.0093 12.2351 14.0603 12.3637 14.0603C12.4923 14.0603 12.6156 14.0093 12.7065 13.9183C12.7974 13.8274 12.8485 13.7041 12.8485 13.5755C12.8485 13.4469 12.7974 13.3236 12.7065 13.2327C12.6156 13.1417 12.4923 13.0906 12.3637 13.0906C12.2351 13.0906 12.1118 13.1417 12.0208 13.2327C11.9299 13.3236 11.8788 13.4469 11.8788 13.5755Z" stroke="#A2A2A2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          <div style={{ position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{m.count} Referrals</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
              {/* Refer Now Button */}
              <button
                onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}
                style={{ width: "100%", height: "43px", borderRadius: "14px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>Refer Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Paid Member Dashboard ---
  if (isPaid) {
    const paidJoinLink = studentData?.paid_classes_joining_link || studentData?.classes_joining_link || sessionJoinLink || "https://www.youtube.com/c/Healthyday";
    const referralLink = studentData?.referral_link ?? "healthyday.app/ref=ggtujev58";
    const shareLink = mobile ? `https://healthyday.co.in/free-programmes?ref=91${mobile}` : referralLink;

    // Session live detection (IST)
    const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
    const totalMin = nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
    const isLive = [
      [330, 390], [390, 450], [450, 510], [510, 570],
      [990, 1050], [1050, 1110], [1110, 1170],
    ].some(([s, e]) => totalMin >= s && totalMin < e);

    // Weekly attendance (Mon-Sun)
    const today = new Date();
    const todayDow = today.getDay();
    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - (todayDow === 0 ? 6 : todayDow - 1));
    mondayDate.setHours(0, 0, 0, 0);
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);
    const DN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const MN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fmtD = (d: Date) => `${DN[d.getDay()]}, ${MN[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
    const weekLabel = `${fmtD(mondayDate)} — ${fmtD(sundayDate)}`;

    const paidAttDates = new Set<string>(studentData?.attendance_tracker ?? []);
    const WEEK_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayIdx = todayDow === 0 ? 6 : todayDow - 1;
    const weekStatus = WEEK_DAY_LABELS.map((_, i) => {
      if (i > todayIdx) return "future";
      const d = new Date(mondayDate);
      d.setDate(mondayDate.getDate() + i);
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (paidAttDates.has(ds)) return "green";
      return "yellow";
    });

    const refCount = studentData?.total_referral_count ?? 0;

    const PaidDayBox = ({ status, dayLabel }: { status: string; dayLabel: string }) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "42px" }}>
        <div style={{
          width: "36.763px", height: "36.763px", borderRadius: "5px",
          background: status === "future"
            ? "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B"
            : status === "yellow" ? "#FEAB27" : "#0D9400",
          opacity: status === "future" ? 0.5 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px",
        }}>
          {status === "green" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.7071" cy="8.7071" r="8.7071" fill="white" /><path d="M4.5 8.90237L7.77251 11.8047L14.3175 6" stroke="#0D9400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          {status === "yellow" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.7071" cy="8.7071" r="8.7071" fill="white" /><path d="M11.9619 4.83728L4.10791 12.5769M4.10791 4.83728L11.9619 12.5769" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          {status === "future" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle opacity="0.5" cx="8.7071" cy="8.7071" r="8.7071" fill="white" /></svg>}
        </div>
        <span style={{ color: "#666", fontFamily: "Outfit", fontSize: "10px", fontWeight: 600 }}>{dayLabel}</span>
      </div>
    );

    // Milestone rows
    const milestones = [
      { label: "10 Free Classes", reward: "+10", refs: 5 },
      { label: "20 Free Classes", reward: "+20", refs: 10 },
      { label: "Healthyday T-shirt", reward: null, refs: 20 },
      { label: "Water Bottle", reward: null, refs: 40 },
      { label: "Yoga Mat", reward: null, refs: 60 },
    ];
    const nextMilestoneIdx = milestones.findIndex(m => refCount < m.refs);
    type PaidRow = { type: "here" } | { type: "milestone"; m: typeof milestones[0]; claimed: boolean; isNext: boolean };
    const paidRows: PaidRow[] = [];
    let paidHereInserted = false;
    milestones.forEach((m, idx) => {
      const claimed = refCount >= m.refs;
      const isNext = idx === nextMilestoneIdx;
      if (idx === nextMilestoneIdx && !paidHereInserted) {
        paidRows.push({ type: "here" });
        paidHereInserted = true;
      }
      paidRows.push({ type: "milestone", m, claimed, isNext });
    });
    if (!paidHereInserted) paidRows.push({ type: "here" });

    return (
      <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
        {/* Header */}
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        {/* Your Yoga Session */}
        <div style={{ padding: "24px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, margin: 0 }}>Your Yoga Session</h2>
            {isLive && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", borderRadius: "60px", background: "#FFD3D3", padding: "4px 10px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E02F2F" }} />
                <span style={{ color: "#E02F2F", fontFamily: "Outfit", fontSize: "13px", fontWeight: 700 }}>LIVE</span>
              </div>
            )}
          </div>

          {/* Session Card */}
          <div style={{ width: "100%" }}>
            <a href={paidJoinLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
              <div style={{
                width: "100%", aspectRatio: "178/93", borderRadius: "12px 12px 0 0",
                background: `url(/language%20${studentData?.language === "English" ? "English" : "Telugu"}.jpg) lightgray 50% / cover no-repeat`,
                boxShadow: "1px 0 4px 0 rgba(0,0,0,0.25), -1px -1px 4px 0 rgba(0,0,0,0.25)",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "12px 12px 0 0", background: "rgba(0,0,0,0.32)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PlayButton />
                </div>
              </div>
            </a>
            <div style={{
              width: "100%", height: "67px", borderRadius: "0 0 12px 12px",
              border: "1.5px solid #E9E9E9", background: "#FFF",
              boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box",
            }}>
              <a href={paidJoinLink} target="_blank" rel="noopener noreferrer" style={{
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
        </div>

        {/* View Class Recordings */}
        <div style={{ padding: "20px 21px 0 22px" }}>
          <div style={{
            width: "100%", borderRadius: "6px", border: "1px solid #F0EEEE", background: "#FFF5E5",
            boxShadow: "0 1px 1px 0 rgba(0,0,0,0.20)",
            display: "flex", alignItems: "center", padding: "20px 23px 19px 27px", gap: "16px", boxSizing: "border-box", cursor: "pointer",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="22" cy="22" r="22" fill="#FEAB27" opacity="0.15" />
              <path d="M18 16V28L30 22L18 16Z" fill="#FEAB27" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
              <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>View Class Recordings</span>
              <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600 }}>Click here to see Yoga Class at anytime</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none" style={{ flexShrink: 0 }}>
              <path d="M1 1L8 9L1 17" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Your Weekly Attendance */}
        <div style={{ padding: "40px 22px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, margin: 0 }}>Your Weekly Attendance</h3>
            <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>View progress</span>
          </div>
        </div>

        {/* Week Calendar Card */}
        <div style={{ padding: "0 20px" }}>
          <div style={{ width: "100%", borderRadius: "15px", border: "1px solid #FFC76F", padding: "15px 10px 16px 11px", background: "#FFE5BA", boxSizing: "border-box" }}>
            <p style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, margin: "0 0 14px 1px" }}>
              {weekLabel}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "2px" }}>
              {WEEK_DAY_LABELS.map((label, i) => (
                <PaidDayBox key={i} status={weekStatus[i]} dayLabel={label} />
              ))}
            </div>
          </div>
        </div>

        {/* Referral Milestones */}
        <div style={{ padding: "28px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Referral Milestones</h3>
            <span
              onClick={() => navigate(`/referral-status?count=${refCount}&mobile=${mobile || ""}`)}
              style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            >
              View More
            </span>
          </div>
          <div style={{ width: "100%", borderRadius: "16px", background: "#FFF", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px", boxSizing: "border-box" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "15px", top: "16px", bottom: "16px", width: "3px", background: "#DDDEDE", borderRadius: "2px", zIndex: 0 }} />
              {paidRows.map((row, ri) => {
                if (row.type === "here") {
                  if (refCount === 0) {
                    return (
                      <div key="here" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                        <div style={{ flexShrink: 0, width: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <circle cx="11" cy="11" r="11" fill="#FF0000" />
                          </svg>
                        </div>
                        <span style={{ color: "#F00", fontFamily: "Outfit", fontSize: "16px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>
                          0 Referrals
                        </span>
                        <div style={{ width: "106px", height: "28px", borderRadius: "20px", border: "1px solid #F00", background: "rgba(254, 171, 39, 0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "#F00", textAlign: "center", fontFamily: "Outfit", fontSize: "14px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal" }}>
                            You are here
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key="here" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                      <div style={{ flexShrink: 0, width: "33px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FEAB27", boxShadow: "0 0 0 4px rgba(254,171,39,0.25)" }} />
                      </div>
                      <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600 }}>{refCount} Referrals</span>
                      <div style={{ height: "21px", borderRadius: "20px", border: "1px solid #FEAB27", background: "rgba(254,171,39,0.20)", display: "flex", alignItems: "center", padding: "0 10px" }}>
                        <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600 }}>You are here</span>
                      </div>
                    </div>
                  );
                }
                const { m, claimed, isNext } = row;
                const isLastRow = ri === paidRows.length - 1;
                return (
                  <div key={m.refs} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isLastRow ? 0 : "14px", position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {claimed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E" />
                          {m.reward && <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>}
                          {!m.reward && <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
                        </svg>
                      ) : (
                        <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            {isNext
                              ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" />
                              : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />}
                          </svg>
                          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z" stroke={isNext ? "#FEAB27" : "#A2A2A2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <div>
                        <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#377456" : isNext ? "#FEAB27" : "#9A9797" }}>
                          {claimed && m.reward ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</> : m.label}
                        </div>
                        <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{m.refs} Referrals</div>
                      </div>
                    </div>
                    {claimed && <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>CLAIMED 🎁</span>}
                    {isNext && <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>NEXT GOAL</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Refer and Win Footer */}
        <div
          style={{ padding: "28px 63px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", cursor: "pointer" }}
          onClick={() => navigate(`/referral?count=${refCount}&mobile=${mobile || ""}`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="50" fill="#FFF5E5" />
            <path d="M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" fill="#FEAB27" />
            <path d="M33.2979 32.2937H37.8857M35.5918 30V34.5875M50.502 30L49.3551 34.5875M65.4122 32.2937H70M67.7061 30V34.5875M58.5306 41.4687L56.2367 43.7625M65.4122 50.6437L70 49.4968M65.4122 64.4062H70M67.7061 62.1124V66.6999M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal", margin: 0 }}>Refer and Win!</h3>
          <p style={{ color: "#ADADAD", fontFamily: "Outfit", fontSize: "18px", fontWeight: 500, lineHeight: "normal", textAlign: "center", margin: 0 }}>Every active referral earn gifts and rewards for you</p>
        </div>

        {/* Referral Status Popup Overlay */}
        {showReferral && (
          <div onClick={() => setShowReferral(false)} className="hd-popup-overlay">
            <div onClick={(e) => e.stopPropagation()} className="hd-popup-content" style={{ height: "200px" }}>
              <div className="flex items-center justify-between">
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>REFER & WIN</span>
                <button onClick={() => setShowReferral(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ aspectRatio: "1/1" }}><path d="M11 1L1 11M1 1L11 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              {(() => {
                const { milestones: allMilestones, windowEnd, indicatorPos, progressPct, mergedMs, showStandalone, indicatorColor } = getRefWindow(refCount);
                const pinSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 21 24" fill="none"><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" fill="white" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" fill="white" /><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
                return (
                  <div style={{ position: "relative", marginTop: "60px", marginBottom: "40px" }}>
                    <div style={{ height: "6px", background: "#AAA", borderRadius: "3px", marginLeft: "9%" }}>
                      <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                    </div>
                    {showStandalone && (
                      <div style={{ position: "absolute", left: `${indicatorPos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="9.5" fill={indicatorColor} /></svg>
                        <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4px" }}>
                          <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "6px", whiteSpace: "nowrap" }}>You are here</div>
                          {pinSvg}
                        </div>
                        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{refCount} Referrals</span>
                        </div>
                      </div>
                    )}
                    {allMilestones.map((m) => {
                      const pos = (m.count / windowEnd) * 100;
                      const reached = refCount >= m.count;
                      const isMerged = mergedMs?.count === m.count;
                      return (
                        <div key={m.count} style={{ position: "absolute", left: `${pos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                          {isMerged ? (
                            <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "2px" }}>You are here</div>
                              {pinSvg}
                              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, marginTop: "2px", whiteSpace: "nowrap" }}>{m.label}</span>
                            </div>
                          ) : (
                            <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>{m.label}</span>
                            </div>
                          )}
                          {reached ? (
                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="12" fill="#DDDEDE" />
                              <path d="M10.4243 11.1512V9.21185C10.4243 8.6975 10.6286 8.2042 10.9923 7.8405C11.356 7.47679 11.8493 7.27246 12.3637 7.27246C12.878 7.27246 13.3713 7.47679 13.735 7.8405C14.0987 8.2042 14.3031 8.6975 14.3031 9.21185V11.1512M8.96973 12.1209C8.96973 11.8638 9.07189 11.6171 9.25374 11.4353C9.4356 11.2534 9.68224 11.1512 9.93942 11.1512H14.7879C15.0451 11.1512 15.2917 11.2534 15.4736 11.4353C15.6554 11.6171 15.7576 11.8638 15.7576 12.1209V15.03C15.7576 15.2872 15.6554 15.5339 15.4736 15.7157C15.2917 15.8976 15.0451 15.9997 14.7879 15.9997H9.93942C9.68224 15.9997 9.4356 15.8976 9.25374 15.7157C9.07189 15.5339 8.96973 15.2872 8.96973 15.03V12.1209Z" stroke="#A2A2A2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          <div style={{ position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{m.count} Referrals</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
              <button
                onClick={() => navigate(`/referral?count=${refCount}&mobile=${mobile || ""}`)}
                style={{ width: "100%", height: "43px", borderRadius: "14px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)", backdropFilter: "blur(2px)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>Refer Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Detect ongoing users whose 14-day batch has elapsed ---
  const batchElapsed = (() => {
    if (!studentData?.free_batch_start_date) return false;
    const batchStart = new Date(studentData?.free_batch_start_date);
    batchStart.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - batchStart.getTime()) / 86400000);
    return diffDays >= 14;
  })();
  const show14DayCompleted = (studentData?.status === "14 day completed" || studentData?.status === "14DaysCompleted") || (isOngoingStatus && batchElapsed);

  // --- 14 Days Completed Page ---
  if (show14DayCompleted) {
    const referralLink = "healthyday.app/ref=ggtujev58";
    const shareLink = mobile ? `https://healthyday.co.in/free-programmes?ref=91${mobile}` : referralLink;

    const handleCopyLink = () => {
      navigator.clipboard.writeText(shareLink);
    };

    const handleWhatsAppShare = () => {
      const message = encodeURIComponent(
        `Join me on Healthyday! Use my referral link: ${shareLink}`
      );
      window.open(`https://wa.me/?text=${message}`, "_blank");
    };

    const completedFreeBatches: any[] = studentData?.free_batches ?? [];
    const completedBatchEntry = completedFreeBatches.find(b => b.start_date === studentData?.free_batch_start_date) ?? completedFreeBatches[completedFreeBatches.length - 1];
    const completedAttendedDates = new Set<string>(completedBatchEntry?.attendance_tracker ?? []);
    const completedBatchOrigin = new Date(studentData?.free_batch_start_date!);
    completedBatchOrigin.setHours(0, 0, 0, 0);
    const completedDayStatus = Array.from({ length: 14 }, (_, i) => {
      const dayNum = i + 1;
      const didJoin = joinedDays.includes(dayNum);
      const d = new Date(completedBatchOrigin);
      d.setDate(completedBatchOrigin.getDate() + i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (didJoin || completedAttendedDates.has(dateStr)) return "green";
      return "yellow";
    });

    const completedDateRangeLabel = (() => {
      if (!studentData?.free_batch_start_date) return '';
      const batchStart = new Date(studentData?.free_batch_start_date);
      const batchEnd = new Date(batchStart);
      batchEnd.setDate(batchStart.getDate() + 13);
      const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const MON_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const fmt = (d: Date) => `${DAY_NAMES[d.getDay()]}, ${MON_NAMES[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
      return `${fmt(batchStart)} — ${fmt(batchEnd)}`;
    })();

    return (
      <div className="hd-page bg-background" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {/* Header */}
        <header
          className="hd-header bg-background"
        >
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        {/* 14-Days Completed Banner */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px 0", gap: "12px" }}>
          {/* Red pill badge */}
          <div style={{
            width: "129px", height: "30px", borderRadius: "40px",
            border: "0.25px solid #DA8D8D", background: "#FFEDED",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ width: "11px", height: "11px", aspectRatio: "1/1" }}>
              <path d="M6 4.16667H6.00611M5.38889 6H6V8.44444H6.61111M0.5 6C0.5 6.72227 0.642262 7.43747 0.918663 8.10476C1.19506 8.77205 1.60019 9.37836 2.11091 9.88909C2.62163 10.3998 3.22795 10.8049 3.89524 11.0813C4.56253 11.3577 5.27773 11.5 6 11.5C6.72227 11.5 7.43747 11.3577 8.10476 11.0813C8.77205 10.8049 9.37836 10.3998 9.88909 9.88909C10.3998 9.37836 10.8049 8.77205 11.0813 8.10476C11.3577 7.43747 11.5 6.72227 11.5 6C11.5 4.54131 10.9205 3.14236 9.88909 2.11091C8.85764 1.07946 7.45869 0.5 6 0.5C4.54131 0.5 3.14236 1.07946 2.11091 2.11091C1.07946 3.14236 0.5 4.54131 0.5 6Z" stroke="#B71C1C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#B71C1C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 800, lineHeight: "22px", letterSpacing: "0.88px" }}>TRIAL ENDED</span>
          </div>
          {/* Title */}
          <p style={{ width: "308px", color: "#000", textAlign: "center", fontFamily: "Outfit", fontSize: "25px", fontWeight: 800, lineHeight: "normal", margin: 0 }}>
            Your <span style={{ color: "#D70000" }}>14-Days FREE</span> Classes are completed
          </p>
          {/* Subtitle */}
          <p style={{ width: "293px", color: "#7C7B7B", textAlign: "center", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, lineHeight: "18px", margin: 0 }}>
            Get a subscription now to continue your Yoga journey without interruption.
          </p>
        </div>

        <PricingAndComparisonSection
          selectedPlanIdx={selectedPlanIdx}
          setSelectedPlanIdx={setSelectedPlanIdx}
          daysLeft={0}
          hideDaysLeft={true}
        />
        {/* Want More FREE Classes heading */}
        <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
          <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
          <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
        </div>
        {/* Refer & Earn */}
        {<div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              borderRadius: "16px",
              background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Title + subtitle — left aligned */}
            <div>
              <h3 style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "21px", fontWeight: 700, lineHeight: "normal", margin: "0 0 4px" }}>
                Refer &amp; Earn
              </h3>
              <p style={{ color: "#FFFCFC", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "normal", margin: 0 }}>
                Invite your friends &amp; family and get exciting gifts!
              </p>
            </div>

            {/* Share Link */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>SHARE THIS LINK</span>
              <div style={{ width: "100%", height: "48px", borderRadius: "8px", border: "1.218px solid #B4B4B4", background: "#FFF", display: "flex", alignItems: "center", padding: "0 12px", gap: "8px" }}>
                <span style={{ color: "#8E8E8E", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "normal", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                  {referralLink}
                </span>
                {/* Inline copy icon */}
                <button onClick={handleCopyLink} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Buttons — side by side */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleCopyLink}
                style={{ flex: 1, height: "40px", borderRadius: "8px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <g clipPath="url(#clip_copy)">
                    <path d="M6.49744 4.3332C5.58188 4.14913 4.63123 4.27241 3.79274 4.68395C2.95425 5.0955 2.27469 5.77233 1.85933 6.60964C1.44396 7.44695 1.31596 8.39801 1.49515 9.31552C1.67434 10.233 2.15073 11.0658 2.85052 11.6848C3.55031 12.3039 4.43447 12.6746 5.36605 12.7397C6.29763 12.8048 7.22465 12.5605 8.00354 12.0448C8.78243 11.5291 9.36972 10.7706 9.67446 9.8869C9.9792 9.0032 9.98438 8.04356 9.6892 7.15662M10.481 12.6674C11.3975 12.8525 12.3494 12.7294 13.1889 12.3173C14.0284 11.9053 14.7086 11.2273 15.1238 10.3887C15.539 9.55001 15.666 8.59759 15.4852 7.67925C15.3043 6.76091 14.8257 5.92803 14.1236 5.30989C13.4215 4.69175 12.5352 4.32294 11.6023 4.2607C10.6694 4.19846 9.74209 4.44628 8.96427 4.96569C8.18646 5.4851 7.60168 6.24704 7.30071 7.13324C6.99975 8.01943 6.99943 8.98031 7.29982 9.8667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs><clipPath id="clip_copy"><rect width="16.9812" height="17" fill="white" /></clipPath></defs>
                </svg>
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500 }}>Copy Link</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                style={{ flex: 1, height: "40px", borderRadius: "8px", background: "#25D366", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500 }}>Share on Whatsapp</span>
              </button>
            </div>

            {/* Your Referrals Link — centered */}
            <div style={{ textAlign: "center", cursor: "pointer", paddingTop: "4px" }} onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>Your Referrals {"\u2192"}</span>
            </div>
          </div>
        </div>}


      </div >
    );
  }

  // --- Onboarding Section: status="registered", batch not yet active or join link not set ---
  if (!authenticated) return null;

  const userLanguage = studentData?.language || "Telugu";
  const currentVideos = userLanguage === "English" ? englishVideos : teluguVideos;
  const viewAllLink = userLanguage === "English"
    ? "https://www.youtube.com/@HealthydayEnglish"
    : "https://www.youtube.com/@healthydayyoga";

  return (
    <div className="hd-page bg-background" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header
        className="hd-header bg-background"
      >
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {/* Onboarding Card */}
      <div className="flex flex-col items-center mt-6 gap-3">
        {/* Title */}
        <h2 style={{ width: "100%", maxWidth: "370px", textAlign: "center", fontFamily: "Outfit", fontSize: "20px", fontStyle: "normal", fontWeight: 700, lineHeight: "normal", margin: 0 }}>
          {(() => {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const getSuffix = (day: number) => [1, 21, 31].includes(day) ? "st" : [2, 22].includes(day) ? "nd" : [3, 23].includes(day) ? "rd" : "th";

            const d = studentData?.free_batch_start_date;
            let dateLabel: string;
            if (!d) {
              // Calculate next Monday
              const today = new Date();
              const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
              const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 7 : (8 - dayOfWeek);
              const nextMonday = new Date(today);
              nextMonday.setDate(today.getDate() + daysUntilMonday);
              const day = nextMonday.getDate();
              dateLabel = `${months[nextMonday.getMonth()]} ${day}${getSuffix(day)}`;
            } else {
              const date = new Date(d);
              const day = date.getDate();
              dateLabel = `${months[date.getMonth()]} ${day}${getSuffix(day)}`;
            }
            return <>
              <span style={{ color: "#FEAB27" }}>Your 14 Days FREE Yoga Batch starts on </span>
              <span style={{ color: "#0D468B" }}>{dateLabel}</span>
            </>;
          })()}
        </h2>

        {/* Morning Session Card */}
        <div style={{ width: "100%", maxWidth: "342px", height: "93px", borderRadius: "10px", border: "0.5px solid #FFCD7E", background: "#FFFDF5", boxShadow: "-1px -1px 4px 0 rgba(205,205,205,0.10), 1px 1px 4px 0 rgba(205,205,205,0.10)", display: "flex", alignItems: "center", padding: "0 12px", gap: "12px", boxSizing: "border-box" }}>
          {/* Sun icon box */}
          <div style={{ width: "54px", height: "53px", borderRadius: "5px", border: "0.5px solid #FFCD7E", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
              <path d="M18.9582 4.37533C18.9582 4.7621 18.8045 5.13303 18.531 5.40652C18.2575 5.68001 17.8866 5.83366 17.4998 5.83366C17.1131 5.83366 16.7421 5.68001 16.4686 5.40652C16.1951 5.13303 16.0415 4.7621 16.0415 4.37533C16.0415 3.98855 16.1951 3.61762 16.4686 3.34413C16.7421 3.07064 17.1131 2.91699 17.4998 2.91699C17.8866 2.91699 18.2575 3.07064 18.531 3.34413C18.8045 3.61762 18.9582 3.98855 18.9582 4.37533Z" fill="#FEAB27" />
              <path fillRule="evenodd" clipRule="evenodd" d="M17.4998 27.7087C18.8404 27.7087 20.1679 27.4446 21.4064 26.9316C22.6449 26.4186 23.7703 25.6666 24.7182 24.7187C25.6662 23.7708 26.4181 22.6454 26.9311 21.4069C27.4441 20.1684 27.7082 18.8409 27.7082 17.5003C27.7082 16.1597 27.4441 14.8323 26.9311 13.5938C26.4181 12.3552 25.6662 11.2299 24.7182 10.2819C23.7703 9.33401 22.6449 8.58207 21.4064 8.06906C20.1679 7.55604 18.8404 7.29199 17.4998 7.29199C14.7924 7.29199 12.1959 8.36751 10.2815 10.2819C8.36702 12.1964 7.2915 14.7929 7.2915 17.5003C7.2915 20.2077 8.36702 22.8043 10.2815 24.7187C12.1959 26.6331 14.7924 27.7087 17.4998 27.7087Z" fill="#FEAB27" />
              <path d="M17.4998 32.0829C17.8866 32.0829 18.2575 31.9293 18.531 31.6558C18.8045 31.3823 18.9582 31.0113 18.9582 30.6246C18.9582 30.2378 18.8045 29.8669 18.531 29.5934C18.2575 29.3199 17.8866 29.1662 17.4998 29.1662C17.1131 29.1662 16.7421 29.3199 16.4686 29.5934C16.1952 29.8669 16.0415 30.2378 16.0415 30.6246C16.0415 31.0113 16.1952 31.3823 16.4686 31.6558C16.7421 31.9293 17.1131 32.0829 17.4998 32.0829ZM30.6248 18.9579C30.2381 18.9579 29.8671 18.8043 29.5936 18.5308C29.3201 18.2573 29.1665 17.8863 29.1665 17.4996C29.1665 17.1128 29.3201 16.7419 29.5936 16.4684C29.8671 16.1949 30.2381 16.0412 30.6248 16.0412C31.0116 16.0412 31.3825 16.1949 31.656 16.4684C31.9295 16.7419 32.0832 17.1128 32.0832 17.4996C32.0832 17.8863 31.9295 18.2573 31.656 18.5308C31.3825 18.8043 31.0116 18.9579 30.6248 18.9579ZM2.9165 17.4996C2.9165 17.8863 3.07015 18.2573 3.34364 18.5308C3.61713 18.8043 3.98806 18.9579 4.37484 18.9579C4.76161 18.9579 5.13254 18.8043 5.40603 18.5308C5.67953 18.2573 5.83317 17.8863 5.83317 17.4996C5.83317 17.1128 5.67953 16.7419 5.40603 16.4684C5.13254 16.1949 4.76161 16.0412 4.37484 16.0412C3.98806 16.0412 3.61713 16.1949 3.34364 16.4684C3.07015 16.7419 2.9165 17.1128 2.9165 17.4996ZM27.8117 9.24977C27.6772 9.38906 27.5163 9.50016 27.3383 9.57659C27.1604 9.65302 26.9691 9.69325 26.7754 9.69493C26.5818 9.69661 26.3898 9.65972 26.2105 9.58639C26.0313 9.51306 25.8685 9.40478 25.7316 9.26785C25.5946 9.13092 25.4863 8.9681 25.413 8.78887C25.3397 8.60965 25.3028 8.41762 25.3045 8.22398C25.3062 8.03035 25.3464 7.83898 25.4228 7.66106C25.4992 7.48314 25.6103 7.32222 25.7496 7.18769C26.0247 6.92204 26.3931 6.77505 26.7754 6.77838C27.1578 6.7817 27.5236 6.93507 27.7939 7.20546C28.0643 7.47584 28.2177 7.84161 28.221 8.22398C28.2243 8.60635 28.0774 8.97473 27.8117 9.24977ZM7.18942 27.8114C7.32395 27.9507 7.48487 28.0618 7.66279 28.1383C7.84071 28.2147 8.03207 28.2549 8.22571 28.2566C8.41935 28.2583 8.61138 28.2214 8.7906 28.1481C8.96983 28.0747 9.13265 27.9664 9.26958 27.8295C9.40651 27.6926 9.51479 27.5298 9.58812 27.3505C9.66145 27.1713 9.69834 26.9793 9.69666 26.7856C9.69498 26.592 9.65475 26.4007 9.57832 26.2227C9.50189 26.0448 9.39079 25.8839 9.2515 25.7494C8.97541 25.4901 8.60926 25.3484 8.23056 25.3543C7.85185 25.3602 7.49028 25.5131 7.22237 25.7809C6.95446 26.0486 6.80121 26.4101 6.79506 26.7888C6.78891 27.1675 6.93034 27.5352 7.18942 27.8114ZM25.7511 27.8114C25.6118 27.6769 25.5007 27.516 25.4243 27.3381C25.3478 27.1602 25.3076 26.9688 25.3059 26.7752C25.3042 26.5815 25.3411 26.3895 25.4145 26.2103C25.4878 26.031 25.5961 25.8682 25.733 25.7313C25.8699 25.5944 26.0328 25.4861 26.212 25.4127C26.3912 25.3394 26.5832 25.3025 26.7769 25.3042C26.9705 25.3059 27.1619 25.3461 27.3398 25.4225C27.5177 25.499 27.6786 25.6101 27.8132 25.7494C28.0788 26.0244 28.2258 26.3928 28.2225 26.7752C28.2192 27.1575 28.0658 27.5233 27.7954 27.7937C27.525 28.0641 27.1593 28.2174 26.7769 28.2208C26.3945 28.2241 26.0261 28.0771 25.7511 27.8114ZM7.18796 7.18915C7.04868 7.32368 6.93758 7.4846 6.86115 7.66252C6.78472 7.84044 6.74449 8.0318 6.74281 8.22544C6.74112 8.41908 6.77802 8.61111 6.85135 8.79033C6.92467 8.96956 7.03296 9.13238 7.16989 9.26931C7.30681 9.40624 7.46964 9.51452 7.64886 9.58785C7.82809 9.66117 8.02012 9.69807 8.21376 9.69639C8.40739 9.69471 8.59875 9.65448 8.77668 9.57805C8.9546 9.50162 9.11552 9.39052 9.25005 9.25123C9.50932 8.97513 9.65101 8.60899 9.64513 8.23029C9.63925 7.85158 9.48626 7.49001 9.21853 7.2221C8.95081 6.95419 8.58935 6.80094 8.21065 6.79479C7.83194 6.78864 7.46424 6.93007 7.18796 7.18915Z" fill="#FEAB27" />
            </svg>
          </div>
          {/* Morning text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#898989", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, lineHeight: "normal" }}>MORNING SESSIONS</span>
            </div>
            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "13px", fontWeight: 700, lineHeight: "normal" }}>5:30AM | 6:30AM | 7:30AM | 8:30AM</span>
          </div>
        </div>

        {/* Evening Session Card */}
        <div style={{ width: "100%", maxWidth: "342px", height: "93px", borderRadius: "10px", border: "0.5px solid #56A2FF", background: "#F6F8FF", boxShadow: "-1px -1px 4px 0 rgba(205,205,205,0.10), 1px 1px 4px 0 rgba(205,205,205,0.10)", display: "flex", alignItems: "center", padding: "0 12px", gap: "12px", boxSizing: "border-box" }}>
          {/* Moon icon box — full SVG with border built in */}
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="53" viewBox="0 0 54 53" fill="none" style={{ flexShrink: 0 }}>
            <rect x="0.25" y="0.25" width="53.5" height="52.5" rx="4.75" fill="white" stroke="#56A2FF" strokeWidth="0.5" />
            <path d="M40.9435 30.7208C39.2042 36.7657 33.5727 41 27.2569 41C19.4013 41 13 34.5987 13 26.7431C13 20.4273 17.2343 14.7958 23.2792 13.0565C23.8638 12.8854 24.4911 13.1135 24.8475 13.5982C25.1896 14.0972 25.1896 14.7673 24.8332 15.252C23.6214 16.9486 22.9798 18.9446 22.9798 21.0403C22.9798 26.5435 27.4565 31.0202 32.9597 31.0202C35.0554 31.0202 37.0514 30.3786 38.748 29.1668C39.2327 28.8104 39.9028 28.8104 40.4018 29.1525C40.8865 29.5089 41.1146 30.1362 40.9435 30.7208Z" fill="#5462F0" />
          </svg>
          {/* Evening text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#898989", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, lineHeight: "normal" }}>EVENING SESSIONS</span>
            </div>
            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "13px", fontWeight: 700, lineHeight: "normal" }}>4:30PM | 5:30PM | 6:30PM</span>
          </div>
        </div>

        {/* Info note */}
        <div style={{ width: "100%", maxWidth: "342px", display: "flex", alignItems: "flex-start", gap: "6px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
            <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
            <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
            <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
            <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: "#747474", fontFamily: "Outfit", fontSize: "11px", fontWeight: 400, lineHeight: "22px" }}>Note: You will receive Joining Link on WhatsApp on {(() => {
            const today = new Date();
            const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
            const daysUntilSunday = dayOfWeek === 0 ? 7 : (7 - dayOfWeek);
            const nextSunday = new Date(today);
            nextSunday.setDate(today.getDate() + daysUntilSunday);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const day = nextSunday.getDate();
            const suffix = [1, 21, 31].includes(day) ? "st" : [2, 22].includes(day) ? "nd" : [3, 23].includes(day) ? "rd" : "th";
            return `${months[nextSunday.getMonth()]} ${day}${suffix}`;
          })()}</span>
        </div>
      </div>

      {/* Try these 15 Minutes Yoga Section */}
      <div className="px-5 mt-6">
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontStyle: "normal", fontWeight: 500, lineHeight: "25px" }}>
            Before your batch starts,
          </span>
          <br />
          <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "20px", fontStyle: "normal", fontWeight: 700, lineHeight: "25px" }}>
            Try these 15 Minutes Yoga
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {currentVideos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>

        {/* View all videos button */}
        <div className="flex justify-center mt-5">
          <a
            href={viewAllLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "320px",
              height: "43px",
              borderRadius: "8px",
              background: "#FEAB27",
              boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>View all videos</span>
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "25px", fontWeight: 500, lineHeight: "normal", width: "12px", height: "23px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{"\u2192"}</span>
          </a>
        </div>
      </div>

      {/* Referral Status Popup Overlay */}
      {showReferral && (
        <div
          onClick={() => setShowReferral(false)}
          className="hd-popup-overlay"
          style={{ alignItems: "center" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="hd-popup-content"
            style={{ height: "336px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, lineHeight: "normal" }}>REFER & WIN</span>
              <button
                onClick={() => setShowReferral(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: 1,
                }}
              >
                X
              </button>
            </div>

            {/* Progress Bar */}
            {(() => {
              const refCount = studentData?.total_referral_count ?? 0;
              const { milestones: allMilestones, windowEnd, indicatorPos, progressPct, mergedMs, showStandalone, indicatorColor } = getRefWindow(refCount);
              const pinSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 21 24" fill="none"><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" fill="white" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" fill="white" /><path d="M6.9375 10.521C6.9375 11.4679 7.31283 12.3761 7.98093 13.0457C8.64903 13.7153 9.55516 14.0915 10.5 14.0915C11.4448 14.0915 12.351 13.7153 13.0191 13.0457C13.6872 12.3761 14.0625 11.4679 14.0625 10.521C14.0625 9.57403 13.6872 8.66585 13.0191 7.99625C12.351 7.32665 11.4448 6.95048 10.5 6.95048C9.55516 6.95048 8.64903 7.32665 7.98093 7.99625C7.31283 8.66585 6.9375 9.57403 6.9375 10.521Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.2177 17.2538L12.1791 22.3037C11.7338 22.7495 11.1301 23 10.5006 23C9.87112 23 9.26739 22.7495 8.82206 22.3037L3.78232 17.2538C2.45377 15.9222 1.54903 14.2256 1.18251 12.3787C0.815988 10.5317 1.00415 8.61734 1.7232 6.87757C2.44224 5.1378 3.65988 3.6508 5.22214 2.6046C6.78439 1.5584 8.6211 1 10.5 1C12.3789 1 14.2156 1.5584 15.7779 2.6046C17.3401 3.6508 18.5578 5.1378 19.2768 6.87757C19.9959 8.61734 20.184 10.5317 19.8175 12.3787C19.451 14.2256 18.5462 15.9222 17.2177 17.2538Z" stroke="#0A386F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
              return (
                <div style={{ position: "relative", marginTop: "60px", marginBottom: "40px" }}>
                  {/* Grey track */}
                  <div style={{ height: "6px", background: "#AAA", borderRadius: "3px", marginLeft: "9%" }}>
                    <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                  </div>
                  {/* Standalone indicator */}
                  {showStandalone && (
                    <div style={{ position: "absolute", left: `${indicatorPos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="9.5" fill={indicatorColor} /></svg>
                      <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4px" }}>
                        <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "6px", whiteSpace: "nowrap" }}>You are here</div>
                        {pinSvg}
                      </div>
                      <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px", textAlign: "center", whiteSpace: "nowrap" }}>
                        <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{refCount} Referrals</span>
                      </div>
                    </div>
                  )}
                  {/* Milestone dots */}
                  {allMilestones.map((m) => {
                    const pos = (m.count / windowEnd) * 100;
                    const reached = refCount >= m.count;
                    const isMerged = mergedMs?.count === m.count;
                    return (
                      <div key={m.count} style={{ position: "absolute", left: `${pos}%`, top: "50%", transform: "translate(-50%, -50%)" }}>
                        {isMerged ? (
                          <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: "70px", textAlign: "center", color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, lineHeight: "normal", marginBottom: "2px" }}>You are here</div>
                            {pinSvg}
                            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700, marginTop: "2px", whiteSpace: "nowrap" }}>{m.label}</span>
                          </div>
                        ) : (
                          <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>{m.label}</span>
                          </div>
                        )}
                        {reached ? (
                          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="#DDDEDE" />
                            <path d="M10.4243 11.1512V9.21185C10.4243 8.6975 10.6286 8.2042 10.9923 7.8405C11.356 7.47679 11.8493 7.27246 12.3637 7.27246C12.878 7.27246 13.3713 7.47679 13.735 7.8405C14.0987 8.2042 14.3031 8.6975 14.3031 9.21185V11.1512M8.96973 12.1209C8.96973 11.8638 9.07189 11.6171 9.25374 11.4353C9.4356 11.2534 9.68224 11.1512 9.93942 11.1512H14.7879C15.0451 11.1512 15.2917 11.2534 15.4736 11.4353C15.6554 11.6171 15.7576 11.8638 15.7576 12.1209V15.03C15.7576 15.2872 15.6554 15.5339 15.4736 15.7157C15.2917 15.8976 15.0451 15.9997 14.7879 15.9997H9.93942C9.68224 15.9997 9.4356 15.8976 9.25374 15.7157C9.07189 15.5339 8.96973 15.2872 8.96973 15.03V12.1209ZM11.8788 13.5755C11.8788 13.7041 11.9299 13.8274 12.0208 13.9183C12.1118 14.0093 12.2351 14.0603 12.3637 14.0603C12.4923 14.0603 12.6156 14.0093 12.7065 13.9183C12.7974 13.8274 12.8485 13.7041 12.8485 13.5755C12.8485 13.4469 12.7974 13.3236 12.7065 13.2327C12.6156 13.1417 12.4923 13.0906 12.3637 13.0906C12.2351 13.0906 12.1118 13.1417 12.0208 13.2327C11.9299 13.3236 11.8788 13.4469 11.8788 13.5755Z" stroke="#A2A2A2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        <div style={{ position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                          <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10px", fontWeight: 500 }}>{m.count} Referrals</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Info Cards */}
            {(() => {
              const refCount = studentData?.total_referral_count ?? 0;
              return (
                <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                  {/* Left card */}
                  <div style={{ flex: 1, height: "95px", borderRadius: "20px", background: "#012550", padding: "10px 12px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {refCount >= 5 ? (
                        <div style={{ width: "25px", height: "25px", borderRadius: "5px", background: "#34C759", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>✓</div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" style={{ flexShrink: 0 }}>
                          <rect width="25" height="25" rx="5" fill="#3B516E" />
                          <path d="M17.0141 9.01406L9.0001 17M9.01416 9L17.0001 17.014" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      <div>
                        <div style={{ color: "#AAA", fontFamily: "Outfit", fontSize: "7px", fontWeight: 700, lineHeight: "normal" }}>EARNED</div>
                        <div style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "13px", fontWeight: 600, lineHeight: "normal" }}>
                          {refCount >= 5 ? `+${Math.min(Math.floor(refCount / 5), 2) * 10} FREE Classes` : "No Reward Earned Yet"}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" style={{ flexShrink: 0 }}>
                        <rect opacity="0.5" width="25" height="25" rx="5" fill="#757E8C" />
                        <path d="M7.14258 7.026C7.85787 6.33769 8.81954 5.95215 9.82115 5.95215C10.8228 5.95215 11.7844 6.33769 12.4997 7.026C13.215 7.7143 14.1767 8.09984 15.1783 8.09984C16.1799 8.09984 17.1416 7.7143 17.8569 7.026V13.7879C17.1416 14.4762 16.1799 14.8617 15.1783 14.8617C14.1767 14.8617 13.215 14.4762 12.4997 13.7879C11.7844 13.0995 10.8228 12.714 9.82115 12.714C8.81954 12.714 7.85787 13.0995 7.14258 13.7879V7.026Z" fill="#D9D9D9" />
                        <path d="M7.14258 19.0474V13.7879" stroke="#D9D9D9" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.14258 13.7879C7.85787 13.0995 8.81954 12.714 9.82115 12.714C10.8228 12.714 11.7844 13.0995 12.4997 13.7879C13.215 14.4762 14.1767 14.8617 15.1783 14.8617C16.1799 14.8617 17.1416 14.4762 17.8569 13.7879V7.026" stroke="#D9D9D9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <div style={{ color: "#AAA", fontFamily: "Outfit", fontSize: "7px", fontWeight: 700, lineHeight: "normal" }}>NEXT GOAL</div>
                        <div style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "13px", fontWeight: 600, lineHeight: "normal" }}>
                          +10 FREE Classes
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right card */}
                  <div style={{ width: "115px", height: "95px", borderRadius: "20px", background: "#012550", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px" }}>
                    <div style={{ color: "#AAA", fontFamily: "Outfit", fontSize: "10px", fontWeight: 700, lineHeight: "normal" }}>STATUS</div>
                    <div>
                      <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "35px", fontWeight: 800, lineHeight: "normal" }}>{refCount}</span>
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "35px", fontWeight: 800, lineHeight: "normal" }}>/20</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Refer Now Button */}
            <button
              onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}
              style={{
                width: "100%",
                maxWidth: "378px",
                height: "43px",
                borderRadius: "14px",
                background: "#FEAB27",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 0 10px 1px rgba(0,0,0,0.25)",
                backdropFilter: "blur(2px)",
                alignSelf: "center",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M1.25 16.4079V14.7237C1.25 13.8303 1.60489 12.9736 2.23659 12.3419C2.86829 11.7102 3.72506 11.3553 4.61842 11.3553H7.98684C8.79526 11.3553 9.53632 11.6399 10.1174 12.114M12.1974 1.35948C12.9219 1.54499 13.5641 1.96638 14.0227 2.55721C14.4814 3.14804 14.7303 3.8747 14.7303 4.62264C14.7303 5.37057 14.4814 6.09723 14.0227 6.68806C13.5641 7.27889 12.9219 7.70028 12.1974 7.88579M12.1974 14.7237H17.25M14.7237 12.1974V17.25M2.93421 4.61842C2.93421 5.51178 3.2891 6.36855 3.9208 7.00025C4.5525 7.63196 5.40927 7.98684 6.30263 7.98684C7.19599 7.98684 8.05276 7.63196 8.68447 7.00025C9.31617 6.36855 9.67105 5.51178 9.67105 4.61842C9.67105 3.72506 9.31617 2.86829 8.68447 2.23659C8.05276 1.60489 7.19599 1.25 6.30263 1.25C5.40927 1.25 4.5525 1.60489 3.9208 2.23659C3.2891 2.86829 2.93421 3.72506 2.93421 4.61842Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>Refer Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
