import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

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
    <div className="block">
      <div className="relative overflow-hidden" style={{ width: "342px", height: "188px", borderRadius: "12px" }}>
        {playing ? (
          <iframe
            width="342"
            height="188"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="cursor-pointer relative w-full h-full" onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.title}
              style={{ width: "342px", height: "188px", objectFit: "cover", display: "block" }}
            />
            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "342px",
                height: "188px",
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
    } catch {}
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
    // ── PREVIEW MODE: bypass API ──────────────────────────────
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
    // ── NORMAL FLOW ───────────────────────────────────────────
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
    } catch {}
  }, [joinStorageKey, studentData?.free_batch_start_date]);

  // --- Loading Screen ---
  if (loading) {
    return (
      <div
        className="mx-auto w-[412px] min-h-screen bg-background flex flex-col items-center justify-center"
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
        className="mx-auto w-[412px] min-h-screen bg-background flex flex-col items-center justify-center"
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
        className="mx-auto w-[412px] min-h-screen bg-background flex items-center justify-center"
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
              🌐
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
      dateRangeLabel: `${fmt(batchStart)} – ${fmt(batchEnd)}`,
    };
  };

  const batchInfo = getActiveBatchInfo(studentData?.free_batch_start_date);
  const studentStatus = studentData?.status;
  const isOngoingStatus = studentStatus === "registered" || studentStatus === "14DaysOngoing";
  const sessionJoinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link;
  const hasBatchAccess = isOngoingStatus && batchInfo.isActive && !!sessionJoinLink;

  // --- Active Batch Dashboard (Week 1 or Week 2) ---
  if (hasBatchAccess) {
    const { currentDay, week, dateRangeLabel } = batchInfo;
    const attendance: string[] = studentData?.attendance ?? [];

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
      // Check if user clicked JOIN SESSION for this day
      const didJoin = joinedDays.includes(dayNum);
      // Also check server attendance
      const raw = attendance[i];
      if (didJoin || raw === "present") return "green";
      return "yellow"; // not attended
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
      type BonusInfo = { name: string; fullName: string; startMin: number; videoId: string };
      const bonusByDay: Record<number, Record<string, BonusInfo>> = {
        3: {
          Telugu: { name: "Telugu Face Yoga Session", fullName: "Telugu Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8" },
          English: { name: "English Face Yoga Session", fullName: "English Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8" },
        },
        5: {
          Telugu: { name: "Meditation Session", fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, videoId: "raCc7Z31LYw" },
          English: { name: "Meditation Session", fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, videoId: "u1Hom0s7ibU" },
        },
        7: {
          Telugu: { name: "Telugu Weight Loss Session", fullName: "Telugu Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8" },
          English: { name: "English Weight Loss Session", fullName: "English Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8" },
        },
        10: {
          Telugu: { name: "Telugu Breath Work Session", fullName: "Telugu Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8" },
          English: { name: "English Breath Work Session", fullName: "English Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8" },
        },
        14: {
          Telugu: { name: "Telugu Sleep Session", fullName: "Telugu Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8" },
          English: { name: "English Sleep Session", fullName: "English Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8" },
        },
      };
      const bonusSession = bonusByDay[currentDay][lang];
      const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
      const totalMin = nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
      const isLive = totalMin >= bonusSession.startMin && totalMin < bonusSession.startMin + 30;
      const isAMSession = bonusSession.startMin < 12 * 60;
      const nextSlots = isAMSession ? ["4:30 PM", "5:30 PM", "6:30 PM"] : ["5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM"];
      const nextWhen = isAMSession ? "at 4:30 PM" : "tomorrow at 5:30 AM";

      return (
        <div className="mx-auto w-[412px] min-h-screen bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
          {/* Header */}
          <header className="flex w-[412px] h-[68px] items-center bg-white"
            style={{ padding: "20px", boxShadow: "0 4px 30px 0 rgba(0,0,0,0.10)" }}>
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
                <div style={{ width: "372px", borderRadius: "12px", overflow: "hidden", background: "#000", position: "relative", marginBottom: "12px" }}>
                  <img
                    src={`https://img.youtube.com/vi/${bonusSession.videoId}/maxresdefault.jpg`}
                    alt={bonusSession.name}
                    style={{ width: "372px", height: "204px", objectFit: "cover", opacity: 0.85, display: "block" }}
                  />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlayButton />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>
                    {bonusSession.name}
                  </span>
                  <a
                    href={sessionLink}
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
                <div style={{ width: "360px", borderRadius: "12px 12px 0 0", overflow: "hidden", background: "#000", position: "relative" }}>
                  <img
                    src={`https://img.youtube.com/vi/${bonusSession.videoId}/maxresdefault.jpg`}
                    alt={bonusSession.name}
                    style={{ width: "360px", height: "197px", objectFit: "cover", opacity: 0.85, display: "block" }}
                  />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlayButton />
                  </div>
                </div>
                <div style={{
                  width: "360px", height: "58px",
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
              width: "358px", height: "206px", borderRadius: "12px",
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
                    {idx > 0 && <span style={{ color: "#CCCBCB", fontFamily: "Outfit", fontSize: "18px", fontWeight: 800, margin: "0 8px" }}>|</span>}
                    <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "18px", fontWeight: 800, lineHeight: "normal", textAlign: "center" }}>{label}</span>
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
            <div style={{ width: "372px", borderRadius: "15px", border: "1px solid #FFC76F", padding: "16px 12px", background: "#FFE5BA" }}>
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

          {/* Referral Milestones */}
          {(() => {
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
            const lineH = milestones.length * 52;
            return (
              <div style={{ padding: "28px 20px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <h3 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Referral Milestones</h3>
                  <span onClick={() => navigate(`/referral?count=${refCount}&mobile=${mobile || ""}`)} style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>View More</span>
                </div>
                <div style={{ width: "360px", borderRadius: "16px", background: "#FFF", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px", boxSizing: "border-box" }}>
                  <div style={{ position: "relative" }}>
                    {/* Vertical line */}
                    <div style={{ position: "absolute", left: "15px", top: "16px", bottom: "16px", width: "3px", background: "#DDDEDE", borderRadius: "2px", zIndex: 0 }} />
                    {/* "You are here" row at the very top */}
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                      <div style={{ marginLeft: "-2.5px", flexShrink: 0, width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: refCount > 0 ? "#FEAB27" : "#FF3B30" }} />
                      </div>
                      <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700 }}>{refCount} Referrals</span>
                      <div style={{ height: "28px", borderRadius: "20px", border: "1px solid #FEAB27", background: "rgba(254,171,39,0.20)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 12px" }}>
                        <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "13px", fontWeight: 600 }}>You are here</span>
                      </div>
                    </div>
                    {/* Milestone rows */}
                    {milestones.map((m, idx) => {
                      const claimed = refCount >= m.refs;
                      const isNext = idx === nextIdx;
                      return (
                        <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: idx < milestones.length - 1 ? "14px" : "0", position: "relative", zIndex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {claimed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                                <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E"/>
                                {m.reward && <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>}
                                {!m.reward && <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}
                              </svg>
                            ) : (
                              <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                  {isNext
                                    ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4"/>
                                    : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE"/>}
                                </svg>
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z" stroke={isNext ? "#FEAB27" : "#A2A2A2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                            )}
                            <div>
                              <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#202020" : isNext ? "#FEAB27" : "#9A9797" }}>
                                {claimed && m.reward ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</> : m.label}
                              </div>
                              <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{m.refs} Referrals</div>
                            </div>
                          </div>
                          {claimed && (
                            <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>CLAIMED 🎁</span>
                          )}
                          {isNext && (
                            <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>IN PROGRESS</span>
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

          {/* Referral Status Popup Overlay */}
          {showReferral && (
            <div
              onClick={() => setShowReferral(false)}
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ width: "358px", borderRadius: "12px", background: "#0B2A4A", padding: "16px", position: "relative", fontFamily: "Outfit, sans-serif", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
                  <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "1.2px" }}>REFERRAL STATUS</span>
                  <button onClick={() => setShowReferral(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer", padding: "0", lineHeight: 1 }}>✕</button>
                </div>
                {(() => {
                  const refCount = studentData?.total_referral_count ?? 0;
                  const maxRef = 20;
                  const progressPct = Math.min(100, Math.round((refCount / maxRef) * 100));
                  const reached10 = refCount >= 10;
                  const reached20 = refCount >= 20;
                  const earnedClasses = reached10 ? 20 : 0;
                  const nextGoal = reached20 ? "All Claimed! 🎉" : reached10 ? "Healthyday T-shirt" : "10 Free Classes";
                  return (
                    <>
                      <div style={{ position: "relative", marginBottom: "20px", padding: "0 4px" }}>
                        <div style={{ position: "relative", height: "6px", display: "flex", alignItems: "center" }}>
                          <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                          <div style={{ width: `${100 - progressPct}%`, height: "6px", background: "#3A5068", borderRadius: "3px" }} />
                        </div>
                        <div style={{ position: "absolute", left: "0%", top: "-4px" }}>
                          <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: refCount > 0 ? "#FEAB27" : "#FF3B30" }} />
                        </div>
                        <div style={{ position: "absolute", left: "50%", top: "-7px", transform: "translateX(-50%)" }}>
                          {reached10 ? (
                            <>
                              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                              <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap" }}>
                                <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>10 Classes</div>
                                <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Added</div>
                              </div>
                            </>
                          ) : (
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                            </div>
                          )}
                        </div>
                        <div style={{ position: "absolute", left: "50%", top: "22px", transform: "translateX(-50%)" }}>
                          <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>10 Referrals</div>
                        </div>
                        <div style={{ position: "absolute", left: "100%", top: "-7px", transform: "translateX(-50%)" }}>
                          {reached20 ? (
                            <>
                              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                              <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                                <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                                <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                              </div>
                              <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                                <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                                <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                              </div>
                            </>
                          )}
                        </div>
                        <div style={{ position: "absolute", left: "100%", top: "22px", transform: "translateX(-50%)" }}>
                          <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>20 Referrals</div>
                        </div>
                        {!reached20 && (
                          <div style={{ position: "absolute", left: `${progressPct}%`, top: "-12px", transform: "translateX(-50%)" }}>
                            <div style={{ textAlign: "center" }}>
                              <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, marginBottom: "2px" }}>You are here</div>
                              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", border: "2px solid #fff" }}>
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.24 0 0 2.24 0 5C0 8.5 5 12 5 12S10 8.5 10 5C10 2.24 7.76 0 5 0ZM5 6.5C4.17 6.5 3.5 5.83 3.5 5C3.5 4.17 4.17 3.5 5 3.5C5.83 3.5 6.5 4.17 6.5 5C6.5 5.83 5.83 6.5 5 6.5Z" fill="white" /></svg>
                              </div>
                            </div>
                            <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "4px" }}>{refCount} Referrals</div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2" style={{ marginTop: "62px" }}>
                        <div style={{ flex: 1, background: "#0E3358", borderRadius: "10px", padding: "12px" }}>
                          <div className="flex items-center gap-2" style={{ marginBottom: "8px" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: earnedClasses > 0 ? "#34C759" : "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff" }}>{earnedClasses > 0 ? "✓" : "—"}</div>
                            <div>
                              <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>EARNED</div>
                              <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{earnedClasses > 0 ? `${earnedClasses} FREE Classes Earned` : "No rewards yet"}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#8A9FB5" }}>🚩</div>
                            <div>
                              <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>NEXT GOAL</div>
                              <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{nextGoal}</div>
                            </div>
                          </div>
                        </div>
                        <div style={{ width: "80px", background: "#0E3358", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ color: "#8A9FB5", fontSize: "9px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "4px" }}>STATUS</div>
                          <div>
                            <span style={{ color: "#FEAB27", fontSize: "32px", fontWeight: 800 }}>{refCount}</span>
                            <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>/20</span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
                <button
                  onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}
                  style={{ width: "100%", marginTop: "14px", padding: "14px", borderRadius: "10px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 8C14.66 8 15.99 6.66 15.99 5C15.99 3.34 14.66 2 13 2C11.34 2 10 3.34 10 5C10 6.66 11.34 8 13 8ZM7 8C8.66 8 9.99 6.66 9.99 5C9.99 3.34 8.66 2 7 2C5.34 2 4 3.34 4 5C4 6.66 5.34 8 7 8ZM7 10C4.67 10 0 11.17 0 13.5V16H14V13.5C14 11.17 9.33 10 7 10ZM13 10C12.71 10 12.38 10.02 12.03 10.05C13.19 10.89 14 12.02 14 13.5V16H20V13.5C20 11.17 15.33 10 13 10Z" fill="#0B2A4A" />
                  </svg>
                  <span style={{ color: "#0B2A4A", fontSize: "16px", fontWeight: 700, fontFamily: "Outfit" }}>Refer Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mx-auto w-[412px] min-h-screen bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
        {/* Header */}
        <header className="flex w-[412px] h-[68px] items-center bg-white"
          style={{ padding: "20px", boxShadow: "0 4px 30px 0 rgba(0,0,0,0.10)" }}>
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        {/* Your Yoga Session — live/not-live */}
        {(() => {
          const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
          const totalMin = nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();

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

              {/* Session Card */}
              <div style={{ width: "357px" }}>
                {/* Thumbnail */}
                <a href={sessionLink} target="_blank" rel="noopener noreferrer" onClick={markTodayJoined} style={{ display: "block", textDecoration: "none" }}>
                  <div style={{
                    width: "357.03px",
                    height: "186.534px",
                    aspectRatio: "178/93",
                    borderRadius: "12px 12px 0 0",
                    background: (() => {
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
                  width: "357px",
                  height: "67px",
                  borderRadius: "0 0 12px 12px",
                  border: "1.5px solid #E9E9E9",
                  background: "#FFF",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}>
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
                      <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN SESSION</span>
                  </a>
                </div>
              </div>

              {/* Note */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "5px", marginTop: "10px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
                  <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D"/>
                  <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D"/>
                  <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D"/>
                  <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ width: "268px", color: "#747474", fontFamily: "Outfit", fontSize: "15px", fontWeight: 400, lineHeight: "22px", textAlign: "center" }}>
                  {noteText}
                </span>
              </div>
            </div>
          );
        })()}

        {/* 14 Days Attendance */}
        <div style={{ padding: "28px 20px 0" }}>
          <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
            Your 14 Days Attendance
          </h3>
          <div style={{
            width: "372px", borderRadius: "15px",
            border: "1px solid #FFC76F", padding: "16px 12px", background: "#FFE5BA",
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

        {/* Referral Milestones Section */}
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
                <span onClick={() => navigate(`/referral?count=${refCount}&mobile=${mobile || ""}`)} style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>View More</span>
              </div>
              <div style={{ width: "360px", borderRadius: "16px", background: "#FFF", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px", boxSizing: "border-box" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "15px", top: "16px", bottom: "16px", width: "3px", background: "#DDDEDE", borderRadius: "2px", zIndex: 0 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                    <div style={{ marginLeft: "-2.5px", flexShrink: 0, width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: refCount > 0 ? "#FEAB27" : "#FF3B30" }} />
                    </div>
                    <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700 }}>{refCount} Referrals</span>
                    <div style={{ height: "28px", borderRadius: "20px", border: "1px solid #FEAB27", background: "rgba(254,171,39,0.20)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 12px" }}>
                      <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "13px", fontWeight: 600 }}>You are here</span>
                    </div>
                  </div>
                  {milestones.map((m, idx) => {
                    const claimed = refCount >= m.refs;
                    const isNext = idx === nextIdx;
                    return (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: idx < milestones.length - 1 ? "14px" : "0", position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {claimed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                              <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E"/>
                              {m.reward && <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>}
                              {!m.reward && <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}
                            </svg>
                          ) : (
                            <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                {isNext ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4"/> : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE"/>}
                              </svg>
                              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z" stroke={isNext ? "#FEAB27" : "#A2A2A2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            </div>
                          )}
                          <div>
                            <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#202020" : isNext ? "#FEAB27" : "#9A9797" }}>
                              {claimed && m.reward ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</> : m.label}
                            </div>
                            <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{m.refs} Referrals</div>
                          </div>
                        </div>
                        {claimed && <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>CLAIMED 🎁</span>}
                        {isNext && <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>IN PROGRESS</span>}
                      </div>
                    );
                  })}
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

        {/* Referral Status Popup Overlay */}
        {showReferral && (
          <div
            onClick={() => setShowReferral(false)}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: "358px", borderRadius: "12px", background: "#0B2A4A", padding: "16px", position: "relative", fontFamily: "Outfit, sans-serif", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
                <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "1.2px" }}>REFERRAL STATUS</span>
                <button onClick={() => setShowReferral(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer", padding: "0", lineHeight: 1 }}>✕</button>
              </div>
              {(() => {
                const refCount = studentData?.total_referral_count ?? 0;
                const maxRef = 20;
                const progressPct = Math.min(100, Math.round((refCount / maxRef) * 100));
                const reached10 = refCount >= 10;
                const reached20 = refCount >= 20;
                const earnedClasses = reached10 ? 20 : 0;
                const nextGoal = reached20 ? "All Claimed! 🎉" : reached10 ? "Healthyday T-shirt" : "10 Free Classes";
                return (
                  <>
                    <div style={{ position: "relative", marginBottom: "20px", padding: "0 4px" }}>
                      <div style={{ position: "relative", height: "6px", display: "flex", alignItems: "center" }}>
                        <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                        <div style={{ width: `${100 - progressPct}%`, height: "6px", background: "#3A5068", borderRadius: "3px" }} />
                      </div>
                      <div style={{ position: "absolute", left: "0%", top: "-4px" }}>
                        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: refCount > 0 ? "#FEAB27" : "#FF3B30" }} />
                      </div>
                      <div style={{ position: "absolute", left: "50%", top: "-7px", transform: "translateX(-50%)" }}>
                        {reached10 ? (
                          <>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                            <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap" }}>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>10 Classes</div>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Added</div>
                            </div>
                          </>
                        ) : (
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                          </div>
                        )}
                      </div>
                      <div style={{ position: "absolute", left: "50%", top: "22px", transform: "translateX(-50%)" }}>
                        <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>10 Referrals</div>
                      </div>
                      <div style={{ position: "absolute", left: "100%", top: "-7px", transform: "translateX(-50%)" }}>
                        {reached20 ? (
                          <>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                            <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                            </div>
                            <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                            </div>
                          </>
                        )}
                      </div>
                      <div style={{ position: "absolute", left: "100%", top: "22px", transform: "translateX(-50%)" }}>
                        <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>20 Referrals</div>
                      </div>
                      {!reached20 && (
                        <div style={{ position: "absolute", left: `${progressPct}%`, top: "-12px", transform: "translateX(-50%)" }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, marginBottom: "2px" }}>You are here</div>
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", border: "2px solid #fff" }}>
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.24 0 0 2.24 0 5C0 8.5 5 12 5 12S10 8.5 10 5C10 2.24 7.76 0 5 0ZM5 6.5C4.17 6.5 3.5 5.83 3.5 5C3.5 4.17 4.17 3.5 5 3.5C5.83 3.5 6.5 4.17 6.5 5C6.5 5.83 5.83 6.5 5 6.5Z" fill="white" /></svg>
                            </div>
                          </div>
                          <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "4px" }}>{refCount} Referrals</div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2" style={{ marginTop: "62px" }}>
                      <div style={{ flex: 1, background: "#0E3358", borderRadius: "10px", padding: "12px" }}>
                        <div className="flex items-center gap-2" style={{ marginBottom: "8px" }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: earnedClasses > 0 ? "#34C759" : "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff" }}>{earnedClasses > 0 ? "✓" : "—"}</div>
                          <div>
                            <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>EARNED</div>
                            <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{earnedClasses > 0 ? `${earnedClasses} FREE Classes Earned` : "No rewards yet"}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#8A9FB5" }}>🚩</div>
                          <div>
                            <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>NEXT GOAL</div>
                            <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{nextGoal}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "80px", background: "#0E3358", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ color: "#8A9FB5", fontSize: "9px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "4px" }}>STATUS</div>
                        <div>
                          <span style={{ color: "#FEAB27", fontSize: "32px", fontWeight: 800 }}>{refCount}</span>
                          <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>/20</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
              <button
                onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}
                style={{ width: "100%", marginTop: "14px", padding: "14px", borderRadius: "10px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 8C14.66 8 15.99 6.66 15.99 5C15.99 3.34 14.66 2 13 2C11.34 2 10 3.34 10 5C10 6.66 11.34 8 13 8ZM7 8C8.66 8 9.99 6.66 9.99 5C9.99 3.34 8.66 2 7 2C5.34 2 4 3.34 4 5C4 6.66 5.34 8 7 8ZM7 10C4.67 10 0 11.17 0 13.5V16H14V13.5C14 11.17 9.33 10 7 10ZM13 10C12.71 10 12.38 10.02 12.03 10.05C13.19 10.89 14 12.02 14 13.5V16H20V13.5C20 11.17 15.33 10 13 10Z" fill="#0B2A4A" />
                </svg>
                <span style={{ color: "#0B2A4A", fontSize: "16px", fontWeight: 700, fontFamily: "Outfit" }}>Refer Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- 14 Days Completed Page ---
  if (studentData?.status === "14 day completed" || studentData?.status === "14DaysCompleted") {
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

    // Sample attendance data: "green" = attended, "orange" = partial, "red" = missed
    const attendanceData = [
      "green", "green", "orange", "green", "green", "green", "green",
      "green", "green", "green", "red", "green", "green", "green",
    ];

    const plans = [
      { name: "1 Year Plan", price: 1999, originalPrice: 5988, discount: 63, bestValue: true, url: "https://healthyday.co.in/1-year-plan/" },
      { name: "6 Months Plan", price: 1499, originalPrice: 2994, discount: 38, bestValue: false, url: "https://healthyday.co.in/6-months-plan/" },
      { name: "3 Months Plan", price: 999, originalPrice: 1497, discount: 25, bestValue: false, url: "https://healthyday.co.in/3-months-plan/" },
    ];

    const features = [
      { name: "Daily YOGA", year: true, sixMonth: true, threeMonth: true },
      { name: "24-Hour Recording", year: true, sixMonth: true, threeMonth: true },
      { name: "Reminders & Tracking", year: true, sixMonth: true, threeMonth: true },
      { name: "108 Surya Namaskar", year: true, sixMonth: true, threeMonth: false },
      { name: "Breath Mastery", year: true, sixMonth: true, threeMonth: false },
      { name: "Face YOGA", year: true, sixMonth: false, threeMonth: false },
      { name: "Masterclass", year: true, sixMonth: false, threeMonth: false },
    ];

    const CheckIcon = () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#34C759" />
        <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

    const CrossIcon = () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#FF3B30" />
        <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );

    return (
      <div className="mx-auto w-[412px] min-h-screen bg-background" style={{ fontFamily: "Outfit, sans-serif" }}>
        {/* Header */}
        <header
          className="flex w-[412px] h-[68px] items-center bg-background"
          style={{
            padding: "20px 247px 20px 20px",
            boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.10)",
          }}
        >
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        {/* Trial Ended Banner */}
        <div className="flex justify-center mt-6">
          <div
            style={{
              width: "358px",
              borderRadius: "12px",
              background: "#FFF",
              boxShadow: "-1px -1px 4px 0 rgba(0, 0, 0, 0.08), 1px 1px 4px 0 rgba(0, 0, 0, 0.08)",
              padding: "24px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Badge */}
            <div
              style={{
                width: "129px",
                height: "30px",
                borderRadius: "40px",
                border: "0.25px solid #DA8D8D",
                background: "#FFEDED",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="5.5" r="5" stroke="#B71C1C" strokeWidth="1" />
                <path d="M5.5 3.5V5.5M5.5 7.5H5.505" stroke="#B71C1C" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#B71C1C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 800, lineHeight: "22px", letterSpacing: "0.88px" }}>
                TRIAL ENDED
              </span>
            </div>

            <h2 style={{ width: "308px", margin: 0, textAlign: "center" }}>
              <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "25px", fontStyle: "normal", fontWeight: 800, lineHeight: "normal" }}>Your </span>
              <span style={{ color: "#D70000", fontFamily: "Outfit", fontSize: "25px", fontStyle: "normal", fontWeight: 800, lineHeight: "normal" }}>14-Days FREE</span>
              <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "25px", fontStyle: "normal", fontWeight: 800, lineHeight: "normal" }}> Classes are completed</span>
            </h2>

            <p style={{ width: "293px", color: "#7C7B7B", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, lineHeight: "18px", textAlign: "center", margin: 0 }}>
              Get a subscription now to continue your Yoga journey without interruption.
            </p>
          </div>
        </div>

        {/* Join Our Community */}
        <div style={{ padding: "32px 27px 0", textAlign: "center" }}>
          <p style={{ width: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 700, lineHeight: "normal", marginBottom: "2px" }}>
            Join our community for
          </p>
          <h3 style={{ width: "221px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>
            DAILY YOGA SESSIONS
          </h3>
        </div>

        {/* Pricing Plans */}
        <div style={{ padding: "24px 27px 0" }}>
          {
            plans.map((plan, idx) => {
              const isSelected = selectedPlanIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPlanIdx(idx)}
                  style={{
                    width: plan.bestValue ? "360px" : "358px",
                    minHeight: plan.bestValue ? "198px" : "160px",
                    borderRadius: "16px",
                    background: plan.bestValue ? "#0D468B" : "#FFF",
                    border: !plan.bestValue && isSelected ? "2.5px solid #0D468B" : "none",
                    boxShadow: plan.bestValue ? "none" : "0 4px 10px 2px rgba(0, 0, 0, 0.25)",
                    padding: plan.bestValue ? "0 2px 2px 2px" : "0",
                    marginBottom: "16px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Best Value Badge */}
                  {plan.bestValue && (
                    <div
                      style={{
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M17.5 9.16917H17.3534L15.8342 4.725L2.79504 9.16917L2.50004 9.16667M2.08337 9.17H2.50004L11.7884 1.75L14.1359 5.04167" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" />
                        <path d="M12.0834 13.3333C12.0834 13.8859 11.8639 14.4158 11.4732 14.8065C11.0825 15.1972 10.5526 15.4167 10.0001 15.4167C9.44755 15.4167 8.91764 15.1972 8.52694 14.8065C8.13624 14.4158 7.91675 13.8859 7.91675 13.3333C7.91675 12.7808 8.13624 12.2509 8.52694 11.8602C8.91764 11.4695 9.44755 11.25 10.0001 11.25C10.5526 11.25 11.0825 11.4695 11.4732 11.8602C11.8639 12.2509 12.0834 12.7808 12.0834 13.3333Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" />
                        <path d="M17.9167 9.16699V17.5003H2.08337V9.16699H17.9167Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" />
                        <path d="M2.08337 9.16699H3.75004C3.75004 9.60902 3.57445 10.0329 3.26189 10.3455C2.94932 10.6581 2.5254 10.8337 2.08337 10.8337V9.16699ZM17.9167 9.16699H16.25C16.25 9.60902 16.4256 10.0329 16.7382 10.3455C17.0508 10.6581 17.4747 10.8337 17.9167 10.8337V9.16699ZM2.08337 17.5003H3.75171C3.75193 17.2812 3.70892 17.0641 3.62516 16.8616C3.5414 16.6591 3.41852 16.4751 3.26355 16.3201C3.10859 16.1652 2.92459 16.0423 2.72208 15.9585C2.51957 15.8748 2.30252 15.8318 2.08337 15.832V17.5003ZM17.9167 17.5003H16.25C16.25 17.0583 16.4256 16.6344 16.7382 16.3218C17.0508 16.0093 17.4747 15.8337 17.9167 15.8337V17.5003Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal" }}>Best Value</span>
                    </div>
                  )}

                  <div
                    style={{
                      padding: "16px 18px 18px",
                      background: "#fff",
                      borderRadius: plan.bestValue ? "14px" : "16px",
                      height: "100%"
                    }}
                  >
                    <h4 style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal", marginBottom: "8px" }}>{plan.name}</h4>
                    <div className="flex items-center gap-3" style={{ marginBottom: "8px" }}>
                      <span style={{ color: "#809AB9", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal", textDecoration: "line-through" }}>
                        ₹{plan.originalPrice}/-
                      </span>
                      <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "30px", fontWeight: 700, lineHeight: "normal" }}>
                        ₹{plan.price}/-
                      </span>
                    </div>
                    {/* Discount badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        height: "18.167px",
                        padding: "2px 10px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        borderRadius: "10.093px",
                        background: "#F00",
                        marginBottom: "16px",
                      }}
                    >
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10.496px", fontWeight: 700, lineHeight: "normal", textTransform: "uppercase" }}>{plan.discount}% OFF</span>
                    </div>
                    {/* CTA Button */}
                    {plan.bestValue ? (
                      <button
                        onClick={() => window.open(plan.url, "_blank")}
                        style={{
                          width: "314px",
                          height: "32.3px",
                          borderRadius: "30px",
                          background: "#FEAB27",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto",
                        }}
                      >
                        <span style={{ width: "249.333px", height: "17.1px", color: "#202020", textAlign: "center", fontFamily: "Outfit", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          Join 1 YEAR PLAN
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => window.open(plan.url, "_blank")}
                        style={{
                          width: "314px",
                          height: "32.3px",
                          borderRadius: "30px",
                          background: "#FEAB27",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto",
                        }}
                      >
                        <span style={{ width: "249.333px", height: "17.1px", color: "#202020", textAlign: "center", fontFamily: "Outfit", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          Join {plan.name.toUpperCase().replace(" PLAN", "")} PLAN
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          }
        </div>

        {/* Compare and Choose */}
        <div style={{ padding: "16px 27px 0" }}>
          <h3 style={{ width: "343px", color: "#0D468B", fontSize: "24px", fontWeight: 600, fontFamily: "Outfit", textAlign: "center", marginBottom: "20px", margin: "0 auto 20px" }}>
            Compare and choose your plan!
          </h3>

          {/* Table */}
          <div style={{ position: "relative", width: "358px" }}>

            {/* Highlighted column background — moves with selectedPlanIdx */}
            <div style={{
              position: "absolute",
              top: 0,
              left: selectedPlanIdx === 0 ? "calc(100% - 207px)" : selectedPlanIdx === 1 ? "calc(100% - 138px)" : "calc(100% - 69px)",
              width: "69px",
              height: "312px",
              borderRadius: "5px",
              border: "1px solid #0D468B",
              background: "#FFF5E5",
              zIndex: 0,
            }} />

            {/* Header Row */}
            <div style={{ display: "flex", alignItems: "center", paddingBottom: "10px", position: "relative", zIndex: 1 }}>
              <div style={{ flex: 1, color: "#919191", fontFamily: "Outfit", fontSize: "10px", fontWeight: 700, lineHeight: "normal" }}>Features</div>
              <div style={{ width: "69px", textAlign: "center", color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>1 Year</div>
              <div style={{ width: "69px", textAlign: "center", color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>6 Months</div>
              <div style={{ width: "69px", textAlign: "center", color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>3 Months</div>
            </div>

            {/* Feature Rows */}
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 0",
                  borderTop: "1px solid #F0F0F0",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div style={{ flex: 1, color: "#202020", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, lineHeight: "normal" }}>{feature.name}</div>
                <div style={{ width: "69px", display: "flex", justifyContent: "center" }}>
                  {feature.year ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                      <path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="#0D468B" />
                      <path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="black" fillOpacity="0.2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12.4136 0.508815C12.563 0.350874 12.7425 0.224485 12.9416 0.137118C13.1407 0.0497516 13.3552 0.00318029 13.5726 0.000157267C13.79 -0.00286575 14.0057 0.0377209 14.2072 0.119518C14.4086 0.201315 14.5916 0.322663 14.7453 0.476389C14.899 0.630114 15.0204 0.813098 15.1022 1.01452C15.184 1.21595 15.2245 1.43173 15.2215 1.64911C15.2185 1.86649 15.1719 2.08106 15.0846 2.28013C14.9972 2.4792 14.8708 2.65874 14.7129 2.80813L9.94733 7.57376C9.94102 7.58005 9.93601 7.58753 9.9326 7.59577C9.92918 7.604 9.92742 7.61283 9.92742 7.62174C9.92742 7.63065 9.92918 7.63948 9.9326 7.64771C9.93601 7.65595 9.94102 7.66343 9.94733 7.66972L14.7129 12.4353C14.8659 12.5859 14.9877 12.7653 15.0711 12.9631C15.1545 13.161 15.1979 13.3734 15.1988 13.5881C15.1997 13.8028 15.1581 14.0156 15.0763 14.2141C14.9946 14.4126 14.8743 14.593 14.7225 14.7449C14.5707 14.8967 14.3904 15.017 14.1919 15.0988C13.9933 15.1806 13.7806 15.2222 13.5659 15.2214C13.3512 15.2205 13.1388 15.1772 12.9409 15.0938C12.7431 15.0105 12.5636 14.8888 12.413 14.7357L7.64751 9.97012C7.64121 9.96381 7.63374 9.95881 7.6255 9.95539C7.61727 9.95197 7.60844 9.95021 7.59953 9.95021C7.59062 9.95021 7.58179 9.95197 7.57356 9.95539C7.56532 9.95881 7.55784 9.96381 7.55155 9.97012L2.78601 14.7357C2.63545 14.8888 2.45607 15.0106 2.25823 15.094C2.06038 15.1774 1.84798 15.2208 1.63328 15.2217C1.41857 15.2226 1.20582 15.1809 1.00728 15.0992C0.808743 15.0175 0.628353 14.8972 0.476516 14.7454C0.324679 14.5936 0.2044 14.4133 0.122616 14.2147C0.0408328 14.0162 -0.000836142 13.8035 1.27127e-05 13.5888C0.000861567 13.374 0.0442115 13.1616 0.127562 12.9638C0.210913 12.7659 0.332614 12.5865 0.485647 12.4359L5.25119 7.67026C5.2575 7.66397 5.2625 7.65649 5.26592 7.64826C5.26934 7.64002 5.2711 7.6312 5.2711 7.62228C5.2711 7.61337 5.26934 7.60454 5.26592 7.59631C5.2625 7.58807 5.2575 7.5806 5.25119 7.5743L0.485647 2.80868C0.184692 2.50285 0.0167751 2.09048 0.0184715 1.66141C0.0201678 1.23233 0.19134 0.82131 0.494704 0.51787C0.798067 0.21443 1.20904 0.0431577 1.63811 0.0413602C2.06718 0.0395627 2.47957 0.207386 2.78547 0.508273L7.55101 5.2739C7.5573 5.28021 7.56478 5.28522 7.57301 5.28863C7.58125 5.29205 7.59007 5.29381 7.59899 5.29381C7.6079 5.29381 7.61673 5.29205 7.62496 5.28863C7.63319 5.28522 7.64067 5.28021 7.64697 5.2739L12.4136 0.508815Z" fill="#FF0000" />
                    </svg>
                  )}
                </div>
                <div style={{ width: "69px", display: "flex", justifyContent: "center" }}>
                  {feature.sixMonth ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                      <path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="#0D468B" />
                      <path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="black" fillOpacity="0.2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12.4136 0.508815C12.563 0.350874 12.7425 0.224485 12.9416 0.137118C13.1407 0.0497516 13.3552 0.00318029 13.5726 0.000157267C13.79 -0.00286575 14.0057 0.0377209 14.2072 0.119518C14.4086 0.201315 14.5916 0.322663 14.7453 0.476389C14.899 0.630114 15.0204 0.813098 15.1022 1.01452C15.184 1.21595 15.2245 1.43173 15.2215 1.64911C15.2185 1.86649 15.1719 2.08106 15.0846 2.28013C14.9972 2.4792 14.8708 2.65874 14.7129 2.80813L9.94733 7.57376C9.94102 7.58005 9.93601 7.58753 9.9326 7.59577C9.92918 7.604 9.92742 7.61283 9.92742 7.62174C9.92742 7.63065 9.92918 7.63948 9.9326 7.64771C9.93601 7.65595 9.94102 7.66343 9.94733 7.66972L14.7129 12.4353C14.8659 12.5859 14.9877 12.7653 15.0711 12.9631C15.1545 13.161 15.1979 13.3734 15.1988 13.5881C15.1997 13.8028 15.1581 14.0156 15.0763 14.2141C14.9946 14.4126 14.8743 14.593 14.7225 14.7449C14.5707 14.8967 14.3904 15.017 14.1919 15.0988C13.9933 15.1806 13.7806 15.2222 13.5659 15.2214C13.3512 15.2205 13.1388 15.1772 12.9409 15.0938C12.7431 15.0105 12.5636 14.8888 12.413 14.7357L7.64751 9.97012C7.64121 9.96381 7.63374 9.95881 7.6255 9.95539C7.61727 9.95197 7.60844 9.95021 7.59953 9.95021C7.59062 9.95021 7.58179 9.95197 7.57356 9.95539C7.56532 9.95881 7.55784 9.96381 7.55155 9.97012L2.78601 14.7357C2.63545 14.8888 2.45607 15.0106 2.25823 15.094C2.06038 15.1774 1.84798 15.2208 1.63328 15.2217C1.41857 15.2226 1.20582 15.1809 1.00728 15.0992C0.808743 15.0175 0.628353 14.8972 0.476516 14.7454C0.324679 14.5936 0.2044 14.4133 0.122616 14.2147C0.0408328 14.0162 -0.000836142 13.8035 1.27127e-05 13.5888C0.000861567 13.374 0.0442115 13.1616 0.127562 12.9638C0.210913 12.7659 0.332614 12.5865 0.485647 12.4359L5.25119 7.67026C5.2575 7.66397 5.2625 7.65649 5.26592 7.64826C5.26934 7.64002 5.2711 7.6312 5.2711 7.62228C5.2711 7.61337 5.26934 7.60454 5.26592 7.59631C5.2625 7.58807 5.2575 7.5806 5.25119 7.5743L0.485647 2.80868C0.184692 2.50285 0.0167751 2.09048 0.0184715 1.66141C0.0201678 1.23233 0.19134 0.82131 0.494704 0.51787C0.798067 0.21443 1.20904 0.0431577 1.63811 0.0413602C2.06718 0.0395627 2.47957 0.207386 2.78547 0.508273L7.55101 5.2739C7.5573 5.28021 7.56478 5.28522 7.57301 5.28863C7.58125 5.29205 7.59007 5.29381 7.59899 5.29381C7.6079 5.29381 7.61673 5.29205 7.62496 5.28863C7.63319 5.28522 7.64067 5.28021 7.64697 5.2739L12.4136 0.508815Z" fill="#FF0000" />
                    </svg>
                  )}
                </div>
                <div style={{ width: "69px", display: "flex", justifyContent: "center" }}>
                  {feature.threeMonth ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
                      <path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="#0D468B" />
                      <path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="black" fillOpacity="0.2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12.4136 0.508815C12.563 0.350874 12.7425 0.224485 12.9416 0.137118C13.1407 0.0497516 13.3552 0.00318029 13.5726 0.000157267C13.79 -0.00286575 14.0057 0.0377209 14.2072 0.119518C14.4086 0.201315 14.5916 0.322663 14.7453 0.476389C14.899 0.630114 15.0204 0.813098 15.1022 1.01452C15.184 1.21595 15.2245 1.43173 15.2215 1.64911C15.2185 1.86649 15.1719 2.08106 15.0846 2.28013C14.9972 2.4792 14.8708 2.65874 14.7129 2.80813L9.94733 7.57376C9.94102 7.58005 9.93601 7.58753 9.9326 7.59577C9.92918 7.604 9.92742 7.61283 9.92742 7.62174C9.92742 7.63065 9.92918 7.63948 9.9326 7.64771C9.93601 7.65595 9.94102 7.66343 9.94733 7.66972L14.7129 12.4353C14.8659 12.5859 14.9877 12.7653 15.0711 12.9631C15.1545 13.161 15.1979 13.3734 15.1988 13.5881C15.1997 13.8028 15.1581 14.0156 15.0763 14.2141C14.9946 14.4126 14.8743 14.593 14.7225 14.7449C14.5707 14.8967 14.3904 15.017 14.1919 15.0988C13.9933 15.1806 13.7806 15.2222 13.5659 15.2214C13.3512 15.2205 13.1388 15.1772 12.9409 15.0938C12.7431 15.0105 12.5636 14.8888 12.413 14.7357L7.64751 9.97012C7.64121 9.96381 7.63374 9.95881 7.6255 9.95539C7.61727 9.95197 7.60844 9.95021 7.59953 9.95021C7.59062 9.95021 7.58179 9.95197 7.57356 9.95539C7.56532 9.95881 7.55784 9.96381 7.55155 9.97012L2.78601 14.7357C2.63545 14.8888 2.45607 15.0106 2.25823 15.094C2.06038 15.1774 1.84798 15.2208 1.63328 15.2217C1.41857 15.2226 1.20582 15.1809 1.00728 15.0992C0.808743 15.0175 0.628353 14.8972 0.476516 14.7454C0.324679 14.5936 0.2044 14.4133 0.122616 14.2147C0.0408328 14.0162 -0.000836142 13.8035 1.27127e-05 13.5888C0.000861567 13.374 0.0442115 13.1616 0.127562 12.9638C0.210913 12.7659 0.332614 12.5865 0.485647 12.4359L5.25119 7.67026C5.2575 7.66397 5.2625 7.65649 5.26592 7.64826C5.26934 7.64002 5.2711 7.6312 5.2711 7.62228C5.2711 7.61337 5.26934 7.60454 5.26592 7.59631C5.2625 7.58807 5.2575 7.5806 5.25119 7.5743L0.485647 2.80868C0.184692 2.50285 0.0167751 2.09048 0.0184715 1.66141C0.0201678 1.23233 0.19134 0.82131 0.494704 0.51787C0.798067 0.21443 1.20904 0.0431577 1.63811 0.0413602C2.06718 0.0395627 2.47957 0.207386 2.78547 0.508273L7.55101 5.2739C7.5573 5.28021 7.56478 5.28522 7.57301 5.28863C7.58125 5.29205 7.59007 5.29381 7.59899 5.29381C7.6079 5.29381 7.61673 5.29205 7.62496 5.28863C7.63319 5.28522 7.64067 5.28021 7.64697 5.2739L12.4136 0.508815Z" fill="#FF0000" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refer & Earn — only shown after popup is dismissed */}
        {!showReferral && <div style={{ padding: "32px 27px 32px", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "358px",
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
              <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>Your Referrals →</span>
            </div>
          </div>
        </div>}

        {/* Referral Status Popup Overlay */}
        {showReferral && (
          <div
            onClick={() => setShowReferral(false)}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: "358px", borderRadius: "12px", background: "#0B2A4A", padding: "16px", position: "relative", fontFamily: "Outfit, sans-serif", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
                <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "1.2px" }}>REFERRAL STATUS</span>
                <button onClick={() => setShowReferral(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer", padding: "0", lineHeight: 1 }}>✕</button>
              </div>
              {(() => {
                const refCount = studentData?.total_referral_count ?? 0;
                const maxRef = 20;
                const progressPct = Math.min(100, Math.round((refCount / maxRef) * 100));
                const reached10 = refCount >= 10;
                const reached20 = refCount >= 20;
                const earnedClasses = reached10 ? 20 : 0;
                const nextGoal = reached20 ? "All Claimed! 🎉" : reached10 ? "Healthyday T-shirt" : "10 Free Classes";
                return (
                  <>
                    <div style={{ position: "relative", marginBottom: "20px", padding: "0 4px" }}>
                      <div style={{ position: "relative", height: "6px", display: "flex", alignItems: "center" }}>
                        <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                        <div style={{ width: `${100 - progressPct}%`, height: "6px", background: "#3A5068", borderRadius: "3px" }} />
                      </div>
                      <div style={{ position: "absolute", left: "0%", top: "-4px" }}>
                        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: refCount > 0 ? "#FEAB27" : "#FF3B30" }} />
                      </div>
                      <div style={{ position: "absolute", left: "50%", top: "-7px", transform: "translateX(-50%)" }}>
                        {reached10 ? (
                          <>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                            <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap" }}>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>10 Classes</div>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Added</div>
                            </div>
                          </>
                        ) : (
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                          </div>
                        )}
                      </div>
                      <div style={{ position: "absolute", left: "50%", top: "22px", transform: "translateX(-50%)" }}>
                        <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>10 Referrals</div>
                      </div>
                      <div style={{ position: "absolute", left: "100%", top: "-7px", transform: "translateX(-50%)" }}>
                        {reached20 ? (
                          <>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                            <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                            </div>
                            <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                              <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                            </div>
                          </>
                        )}
                      </div>
                      <div style={{ position: "absolute", left: "100%", top: "22px", transform: "translateX(-50%)" }}>
                        <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>20 Referrals</div>
                      </div>
                      {!reached20 && (
                        <div style={{ position: "absolute", left: `${progressPct}%`, top: "-12px", transform: "translateX(-50%)" }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, marginBottom: "2px" }}>You are here</div>
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", border: "2px solid #fff" }}>
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.24 0 0 2.24 0 5C0 8.5 5 12 5 12S10 8.5 10 5C10 2.24 7.76 0 5 0ZM5 6.5C4.17 6.5 3.5 5.83 3.5 5C3.5 4.17 4.17 3.5 5 3.5C5.83 3.5 6.5 4.17 6.5 5C6.5 5.83 5.83 6.5 5 6.5Z" fill="white" /></svg>
                            </div>
                          </div>
                          <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "4px" }}>{refCount} Referrals</div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2" style={{ marginTop: "62px" }}>
                      <div style={{ flex: 1, background: "#0E3358", borderRadius: "10px", padding: "12px" }}>
                        <div className="flex items-center gap-2" style={{ marginBottom: "8px" }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: earnedClasses > 0 ? "#34C759" : "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff" }}>{earnedClasses > 0 ? "✓" : "—"}</div>
                          <div>
                            <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>EARNED</div>
                            <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{earnedClasses > 0 ? `${earnedClasses} FREE Classes Earned` : "No rewards yet"}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#8A9FB5" }}>🚩</div>
                          <div>
                            <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>NEXT GOAL</div>
                            <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{nextGoal}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "80px", background: "#0E3358", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ color: "#8A9FB5", fontSize: "9px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "4px" }}>STATUS</div>
                        <div>
                          <span style={{ color: "#FEAB27", fontSize: "32px", fontWeight: 800 }}>{refCount}</span>
                          <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>/20</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
              <button
                onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}
                style={{ width: "100%", marginTop: "14px", padding: "14px", borderRadius: "10px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 8C14.66 8 15.99 6.66 15.99 5C15.99 3.34 14.66 2 13 2C11.34 2 10 3.34 10 5C10 6.66 11.34 8 13 8ZM7 8C8.66 8 9.99 6.66 9.99 5C9.99 3.34 8.66 2 7 2C5.34 2 4 3.34 4 5C4 6.66 5.34 8 7 8ZM7 10C4.67 10 0 11.17 0 13.5V16H14V13.5C14 11.17 9.33 10 7 10ZM13 10C12.71 10 12.38 10.02 12.03 10.05C13.19 10.89 14 12.02 14 13.5V16H20V13.5C20 11.17 15.33 10 13 10Z" fill="#0B2A4A" />
                </svg>
                <span style={{ color: "#0B2A4A", fontSize: "16px", fontWeight: 700, fontFamily: "Outfit" }}>Refer Now</span>
              </button>
            </div>
          </div>
        )}
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
    <div className="mx-auto w-[412px] min-h-[1740px] bg-background" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header
        className="flex w-[411px] h-[68px] items-center bg-background"
        style={{
          padding: "20px 247px 20px 20px",
          boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.10)",
        }}
      >
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {/* Onboarding Card */}
      <div className="flex flex-col items-center mt-6 gap-3">
        {/* Title */}
        <h2 style={{ width: "370px", fontFamily: "Outfit", fontSize: "20px", fontStyle: "normal", fontWeight: 700, lineHeight: "normal", margin: 0 }}>
          {(() => {
            const d = studentData?.free_batch_start_date;
            if (!d) {
              return <span style={{ color: "#FEAB27" }}>Your Free Batch Now Started! Get ready for 14 Days FREE Yoga</span>;
            }
            const date = new Date(d);
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const day = date.getDate();
            const suffix = [1,21,31].includes(day) ? "st" : [2,22].includes(day) ? "nd" : [3,23].includes(day) ? "rd" : "th";
            const label = `${months[date.getMonth()]} ${day}${suffix}`;
            return <>
              <span style={{ color: "#FEAB27" }}>Your 14 Days FREE Yoga Batch starts on </span>
              <span style={{ color: "#0D468B" }}>{label}</span>
            </>;
          })()}
        </h2>

        {/* Morning Session Card */}
        <div style={{ width: "342px", height: "93px", borderRadius: "10px", border: "0.5px solid #FFCD7E", background: "#FFFDF5", boxShadow: "-1px -1px 4px 0 rgba(205,205,205,0.10), 1px 1px 4px 0 rgba(205,205,205,0.10)", display: "flex", alignItems: "center", padding: "0 12px", gap: "12px" }}>
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
        <div style={{ width: "342px", height: "93px", borderRadius: "10px", border: "0.5px solid #56A2FF", background: "#F6F8FF", boxShadow: "-1px -1px 4px 0 rgba(205,205,205,0.10), 1px 1px 4px 0 rgba(205,205,205,0.10)", display: "flex", alignItems: "center", padding: "0 12px", gap: "12px" }}>
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
        <div style={{ width: "342px", display: "flex", alignItems: "flex-start", gap: "6px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
            <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
            <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
            <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
            <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: "#747474", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}>Note: You will receive Joining Link on WhatsApp</span>
        </div>
      </div>

      {/* Try these 15 Minutes Yoga Section */}
      <div className="px-[27px] mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "20px", fontStyle: "normal", fontWeight: 700, lineHeight: "normal" }}>
            Try these 15 Minutes Yoga
          </h3>
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
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "25px", fontWeight: 500, lineHeight: "normal", width: "12px", height: "23px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>→</span>
          </a>
        </div>
      </div>

      {/* Referral Status Popup Overlay */}
      {showReferral && (
        <div
          onClick={() => setShowReferral(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "358px",
              borderRadius: "12px",
              background: "#0B2A4A",
              padding: "16px",
              position: "relative",
              fontFamily: "Outfit, sans-serif",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "1.2px" }}>
                REFERRAL STATUS
              </span>
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
                ✕
              </button>
            </div>

            {/* Progress Bar — fully dynamic */}
            {(() => {
              const refCount = studentData?.total_referral_count ?? 0;
              const maxRef = 20;
              const progressPct = Math.min(100, Math.round((refCount / maxRef) * 100));
              const reached10 = refCount >= 10;
              const reached20 = refCount >= 20;
              const earnedClasses = reached10 ? 20 : 0;
              const nextGoal = reached20 ? "All Claimed! 🎉" : reached10 ? "Healthyday T-shirt" : "10 Free Classes";

              return (
                <>
                  <div style={{ position: "relative", marginBottom: "20px", padding: "0 4px" }}>
                    {/* Track */}
                    <div style={{ position: "relative", height: "6px", display: "flex", alignItems: "center" }}>
                      <div style={{ width: `${progressPct}%`, height: "6px", background: "#FEAB27", borderRadius: "3px" }} />
                      <div style={{ width: `${100 - progressPct}%`, height: "6px", background: "#3A5068", borderRadius: "3px" }} />
                    </div>

                    {/* Dot 1 - Start */}
                    <div style={{ position: "absolute", left: "0%", top: "-4px" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: refCount > 0 ? "#FEAB27" : "#FF3B30" }} />
                    </div>

                    {/* Dot 2 - 10 Referrals */}
                    <div style={{ position: "absolute", left: "50%", top: "-7px", transform: "translateX(-50%)" }}>
                      {reached10 ? (
                        <>
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                          <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap" }}>
                            <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>10 Classes</div>
                            <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Added</div>
                          </div>
                        </>
                      ) : (
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                          <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                        </div>
                      )}
                    </div>
                    {/* 10 Referrals label */}
                    <div style={{ position: "absolute", left: "50%", top: "22px", transform: "translateX(-50%)" }}>
                      <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>10 Referrals</div>
                    </div>

                    {/* Dot 3 - 20 Referrals (end) */}
                    <div style={{ position: "absolute", left: "100%", top: "-7px", transform: "translateX(-50%)" }}>
                      {reached20 ? (
                        <>
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff", fontWeight: 700 }}>✓</div>
                          <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                            <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                            <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #5A7A96" }}>
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><rect x="1" y="5" width="8" height="6" rx="1" fill="#8A9FB5" /><path d="M3 5V3C3 1.9 3.9 1 5 1C6.1 1 7 1.9 7 3V5" stroke="#8A9FB5" strokeWidth="1.2" /></svg>
                          </div>
                          <div style={{ textAlign: "center", marginTop: "4px", whiteSpace: "nowrap", transform: "translateX(-8px)" }}>
                            <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>Healthyday</div>
                            <div style={{ color: "#FEAB27", fontSize: "9px", fontWeight: 700 }}>T-shirt</div>
                          </div>
                        </>
                      )}
                    </div>
                    {/* 20 Referrals label */}
                    <div style={{ position: "absolute", left: "100%", top: "22px", transform: "translateX(-50%)" }}>
                      <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "22px" }}>20 Referrals</div>
                    </div>

                    {/* "You are here" pin — positioned dynamically */}
                    {!reached20 && (
                      <div style={{ position: "absolute", left: `${progressPct}%`, top: "-12px", transform: "translateX(-50%)" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, marginBottom: "2px" }}>You are here</div>
                          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", border: "2px solid #fff" }}>
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.24 0 0 2.24 0 5C0 8.5 5 12 5 12S10 8.5 10 5C10 2.24 7.76 0 5 0ZM5 6.5C4.17 6.5 3.5 5.83 3.5 5C3.5 4.17 4.17 3.5 5 3.5C5.83 3.5 6.5 4.17 6.5 5C6.5 5.83 5.83 6.5 5 6.5Z" fill="white" /></svg>
                          </div>
                        </div>
                        <div style={{ color: "#fff", fontSize: "8px", fontWeight: 600, textAlign: "center", marginTop: "4px" }}>{refCount} Referrals</div>
                      </div>
                    )}
                  </div>

                  {/* Info Cards */}
                  <div className="flex gap-2" style={{ marginTop: "62px" }}>
                    <div style={{ flex: 1, background: "#0E3358", borderRadius: "10px", padding: "12px" }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: "8px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: earnedClasses > 0 ? "#34C759" : "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff" }}>{earnedClasses > 0 ? "✓" : "—"}</div>
                        <div>
                          <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>EARNED</div>
                          <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{earnedClasses > 0 ? `${earnedClasses} FREE Classes Earned` : "No rewards yet"}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#3A5068", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#8A9FB5" }}>🚩</div>
                        <div>
                          <div style={{ color: "#8A9FB5", fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px" }}>NEXT GOAL</div>
                          <div style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>{nextGoal}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ width: "80px", background: "#0E3358", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ color: "#8A9FB5", fontSize: "9px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "4px" }}>STATUS</div>
                      <div>
                        <span style={{ color: "#FEAB27", fontSize: "32px", fontWeight: 800 }}>{refCount}</span>
                        <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>/20</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Refer Now Button */}
            <button
              onClick={() => navigate(`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`)}
              style={{
                width: "100%",
                marginTop: "14px",
                padding: "14px",
                borderRadius: "10px",
                background: "#FEAB27",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 8C14.66 8 15.99 6.66 15.99 5C15.99 3.34 14.66 2 13 2C11.34 2 10 3.34 10 5C10 6.66 11.34 8 13 8ZM7 8C8.66 8 9.99 6.66 9.99 5C9.99 3.34 8.66 2 7 2C5.34 2 4 3.34 4 5C4 6.66 5.34 8 7 8ZM7 10C4.67 10 0 11.17 0 13.5V16H14V13.5C14 11.17 9.33 10 7 10ZM13 10C12.71 10 12.38 10.02 12.03 10.05C13.19 10.89 14 12.02 14 13.5V16H20V13.5C20 11.17 15.33 10 13 10Z" fill="#0B2A4A" />
              </svg>
              <span style={{ color: "#0B2A4A", fontSize: "16px", fontWeight: 700, fontFamily: "Outfit" }}>Refer Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
