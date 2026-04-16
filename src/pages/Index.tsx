import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import { ReferralMilestonesCard } from "@/components/ReferralMilestonesCard";
import { ReferWinPopup, ReferralProgressBar } from "@/components/ReferWinPopup";
import { ShareReferralActions } from "@/components/ShareReferralActions";

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
    if (previewMode === "paidendsoon") {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 3); // plan ends in 3 days
      const planEnd = toLocalDateStr(endDate);
      setStudentData({
        language: "Telugu",
        status: "paid",
        paid_classes_joining_link: "https://www.youtube.com/c/Healthyday",
        referral_link: "healthyday.app/ref=preview123",
        total_referral_count: 3,
        attendance_tracker: [],
        plan_end_date: planEnd,
      });
      setAuthenticated(true);
      setLoading(false);
      return;
    }
    if (previewMode === "pastdue") {
      setStudentData({
        language: "Telugu",
        status: "pastdue",
        plan_expired_date: "2025-03-03",
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
                    <ReferralMilestonesCard refCount={refCount} milestones={milestones} nextLabel="NEXT GOAL" />
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
                  <div style={{ 
                    width: "100%", 
                    maxWidth: "358px", 
                    height: "254px", 
                    boxSizing: "border-box",
                    borderRadius: "16px", 
                    background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B", 
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", 
                    padding: "20px", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "12px",
                    justifyContent: "center"
                  }}>
                    <div>
                      <h3 style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "21px", fontWeight: 700, lineHeight: "normal", margin: "0 0 4px" }}>Refer &amp; Win</h3>
                      <p style={{ color: "#FFFCFC", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "normal", margin: 0 }}>Invite your friends &amp; family and get exciting gifts!</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <ShareReferralActions shareLink={shareLink} referralsUrl={`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`} />
                    </div>
                  </div>
                </div>
              </>
            )}

                  {/* Referral Status Popup Overlay — Week 1 bonus days only */}
                  {week === 1 && showReferral && (
                    <ReferWinPopup
                      refCount={studentData?.total_referral_count ?? 0}
                      onClose={() => setShowReferral(false)}
                      referNowUrl={`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`}
                    />
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
                              <ReferralMilestonesCard refCount={refCount} milestones={milestones} />
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
                            maxWidth: "358px",
                            height: "254px",
                            boxSizing: "border-box",
                            borderRadius: "16px",
                            background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                            boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            justifyContent: "center"
                          }}
                        >
                          {/* Title + subtitle — left aligned */}
                          <div>
                            <h3 style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "21px", fontWeight: 700, lineHeight: "normal", margin: "0 0 4px" }}>
                              Refer &amp; Win
                            </h3>
                            <p style={{ color: "#FFFCFC", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "normal", margin: 0 }}>
                              Invite your friends &amp; family and get exciting gifts!
                            </p>
                          </div>

                          {/* Share Link */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <ShareReferralActions shareLink={shareLink} referralsUrl={`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                        {/* Referral Status Popup Overlay � 14DaysOngoing simplified */}
                        {showReferral && (
                          <ReferWinPopup
                            refCount={studentData?.total_referral_count ?? 0}
                            onClose={() => setShowReferral(false)}
                            referNowUrl={`/referral?count=${studentData?.total_referral_count ?? 0}&mobile=${mobile || ""}`}
                          />
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

                      // Plan renewal detection (3 days before plan ends)
                      const planEndDate = studentData?.plan_end_date ? new Date(studentData.plan_end_date) : null;
                      const daysUntilPlanEnds = (() => {
                        if (!planEndDate) return null;
                        const todayDate = new Date();
                        todayDate.setHours(0, 0, 0, 0);
                        planEndDate.setHours(0, 0, 0, 0);
                        return Math.ceil((planEndDate.getTime() - todayDate.getTime()) / 86400000);
                      })();
                      const showPlanRenewal = daysUntilPlanEnds !== null && daysUntilPlanEnds <= 3 && daysUntilPlanEnds >= 0;

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

                        const PaidDayBox = ({status, dayLabel}: {status: string; dayLabel: string }) => (
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
                        {label: "10 Free Classes", reward: "+10", refs: 5 },
                        {label: "20 Free Classes", reward: "+20", refs: 10 },
                        {label: "Healthyday T-shirt", reward: null, refs: 20 },
                        {label: "Water Bottle", reward: null, refs: 40 },
                        {label: "Yoga Mat", reward: null, refs: 60 },
                        ];

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
                            <div
                              onClick={() => navigate("/all-recordings")}
                              style={{
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
                              <span
                                onClick={() => navigate(`/attendance-page?mobile=${mobile || ""}`)}
                                style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                              >View progress</span>
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
                          {!showPlanRenewal && (
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
                              <ReferralMilestonesCard refCount={refCount} milestones={milestones} nextLabel="NEXT GOAL" />
                            </div>
                          </div>
                          )}

                          {/* Refer and Win Footer */}
                          {!showPlanRenewal && (
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
                          )}

                          {/* Plan Renewal Section (shows 3 days before plan ends) */}
                          {showPlanRenewal && (
                            <>
                              {/* Your Plan ends warning */}
                              <div style={{ padding: "0 20px", textAlign: "center" }}>
                                <p style={{
                                  width: "100%",
                                  maxWidth: "343px",
                                  color: "#F00",
                                  textAlign: "center",
                                  fontFamily: "Outfit",
                                  fontSize: "24px",
                                  fontWeight: 700,
                                  lineHeight: "normal",
                                  margin: "0 auto 12px",
                                }}>
                                  Your Plan ends in {daysUntilPlanEnds} {daysUntilPlanEnds === 1 ? "Day" : "Days"}
                                </p>
                                <p style={{
                                  width: "221px",
                                  color: "#0D468B",
                                  textAlign: "center",
                                  fontFamily: "Outfit",
                                  fontSize: "20px",
                                  fontWeight: 700,
                                  lineHeight: "normal",
                                  margin: "0 auto 20px",
                                }}>
                                  RENEW NOW!
                                </p>
                              </div>

                              {/* Pricing Section */}
                              <PricingAndComparisonSection
                                selectedPlanIdx={selectedPlanIdx}
                                setSelectedPlanIdx={setSelectedPlanIdx}
                                daysLeft={daysUntilPlanEnds ?? 0}
                                hideDaysLeft={true}
                              />

                              {/* Separator */}
                              <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
                                <div style={{ width: "100%", maxWidth: "358px", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
                                <p style={{
                                  width: "100%",
                                  maxWidth: "343px",
                                  margin: "0 auto",
                                  color: "#0D468B",
                                  textAlign: "center",
                                  fontFamily: "Outfit",
                                  fontSize: "24px",
                                  fontWeight: 600,
                                  lineHeight: "normal",
                                }}>
                                  Want More FREE Classes?
                                </p>
                              </div>

                              {/* Share Referral Actions */}
                              <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
                                <div style={{
                                  width: "100%",
                                  maxWidth: "358px",
                                  boxSizing: "border-box",
                                  borderRadius: "16px",
                                  background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
                                  padding: "20px 16px",
                                }}>
                                  <ShareReferralActions
                                    shareLink={shareLink}
                                    referralsUrl={`/referral-status?count=${refCount}&mobile=${mobile || ""}`}
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          {/* Referral Status Popup Overlay */}
                          {!showPlanRenewal && showReferral && (
                            <ReferWinPopup
                              refCount={refCount}
                              onClose={() => setShowReferral(false)}
referNowUrl={`/referral?count=${refCount}&mobile=${mobile || ""}`}
                            />
                          )}
                        </div>
                        );
  }

  // --- Past Due / Subscription Expired Dashboard ---
  if (studentStatus === "pastdue") {
    // Format expired date
    const expiredDateRaw = studentData?.plan_expired_date;
    const formatExpiredDate = (dateStr: string) => {
      if (!dateStr) return "recently";
      const d = new Date(dateStr);
      const day = d.getDate();
      const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${day}${suffix} ${months[d.getMonth()]}`;
    };
    const expiredDateLabel = formatExpiredDate(expiredDateRaw);

    return (
      <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
        {/* Header */}
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* SUBSCRIPTION EXPIRED Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "fit-content",
            height: "30px",
            borderRadius: "40px",
            border: "0.25px solid #DA8D8D",
            background: "#FFEDED",
            padding: "0 14px",
            marginTop: "20px",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.125 4.29167H6.13111M5.51389 6.125H6.125V8.56944H6.73611M0.625 6.125C0.625 6.84727 0.767262 7.56247 1.04366 8.22976C1.32006 8.89705 1.72519 9.50336 2.23591 10.0141C2.74663 10.5248 3.35295 10.9299 4.02024 11.2063C4.68753 11.4827 5.40273 11.625 6.125 11.625C6.84727 11.625 7.56247 11.4827 8.22976 11.2063C8.89705 10.9299 9.50336 10.5248 10.0141 10.0141C10.5248 9.50336 10.9299 8.89705 11.2063 8.22976C11.4827 7.56247 11.625 6.84727 11.625 6.125C11.625 4.66631 11.0455 3.26736 10.0141 2.23591C8.98264 1.20446 7.58369 0.625 6.125 0.625C4.66631 0.625 3.26736 1.20446 2.23591 2.23591C1.20446 3.26736 0.625 4.66631 0.625 6.125Z" stroke="#B71C1C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{
              color: "#B71C1C",
              fontFamily: "Outfit",
              fontSize: "11px",
              fontWeight: 800,
              lineHeight: "22px",
              letterSpacing: "0.88px",
            }}>
              SUBSCRIPTION EXPIRED
            </span>
          </div>

          {/* Expired Plan Card */}
          <div style={{
            width: "100%",
            maxWidth: "357px",
            borderRadius: "10px",
            border: "1px solid #949494",
            background: "#FFF5E5",
            padding: "16px 20px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "16px",
            marginTop: "20px",
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none" style={{ flexShrink: 0 }}>
              <path d="M17.7497 11.9817V18.4451M17.7497 23.2927H17.7657M15.1311 3.2418L2.16043 25.1109C1.89304 25.5785 1.75154 26.1086 1.75001 26.6486C1.74848 27.1885 1.88697 27.7195 2.1517 28.1886C2.41643 28.6578 2.79818 29.0488 3.25898 29.3227C3.71978 29.5966 4.24356 29.7439 4.77823 29.75H30.7227C31.2571 29.7438 31.7806 29.5964 32.2412 29.3226C32.7018 29.0487 33.0834 28.658 33.3481 28.1891C33.6128 27.7202 33.7513 27.1895 33.75 26.6497C33.7487 26.11 33.6075 25.58 33.3405 25.1125L20.3699 3.24018C20.097 2.78532 19.7125 2.40921 19.2537 2.14818C18.7949 1.88714 18.2771 1.75 17.7505 1.75C17.2238 1.75 16.7061 1.88714 16.2472 2.14818C15.7884 2.40921 15.4039 2.78532 15.1311 3.24018V3.2418Z" stroke="#D70000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ maxWidth: "259px", display: "flex", flexDirection: "column" }}>
              <span style={{
                color: "#000",
                fontFamily: "Outfit",
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: "normal",
              }}>
                Your Yoga Plan{" "}
              </span>
              <span style={{
                color: "#D70000",
                fontFamily: "Outfit",
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: "normal",
                display: "block"
              }}>
                Expired on {expiredDateLabel}
              </span>
            </div>
          </div>

          {/* Renew Now to Continue */}
          <p style={{
            color: "#0D468B",
            textAlign: "center",
            fontFamily: "Outfit",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "normal",
            margin: "28px 0 0",
          }}>
            Renew Now to Continue!
          </p>
        </div>

        {/* Pricing Section */}
        <div style={{ marginTop: "20px" }}>
          <PricingAndComparisonSection
            selectedPlanIdx={selectedPlanIdx}
            setSelectedPlanIdx={setSelectedPlanIdx}
            daysLeft={0}
            hideDaysLeft={true}
          />
        </div>
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
                          const completedDayStatus = Array.from({length: 14 }, (_, i) => {
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
                            <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
                              <div
                                style={{
                                  width: "100%",
                                  maxWidth: "358px",
                                  height: "254px",
                                  boxSizing: "border-box",
                                  borderRadius: "16px",
                                  background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
                                  padding: "20px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "12px",
                                  justifyContent: "center"
                                }}
                              >
                                {/* Title + subtitle — left aligned */}
                                <div>
                                  <h3 style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "21px", fontWeight: 700, lineHeight: "normal", margin: "0 0 4px" }}>
                                    Refer &amp; Win
                                  </h3>
                                  <p style={{ color: "#FFFCFC", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "normal", margin: 0 }}>
                                    Invite your friends &amp; family and get exciting gifts!
                                  </p>
                                </div>

                                {/* Share Link */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                  <ShareReferralActions shareLink={referralLink} referralsUrl={`/referral?count=&mobile=`} />
                                </div>
                              </div>
                            </div>
                          </div>
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
                                      <ReferralProgressBar refCount={studentData?.total_referral_count ?? 0} />

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
