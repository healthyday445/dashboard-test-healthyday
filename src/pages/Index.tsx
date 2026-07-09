import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { LevelCard } from "@/components/LevelCard";
import { CertificateModal } from "@/components/CertificateModal";
import { trackVisit } from "@/lib/trackVisit";
import { trackSessionClick } from "@/lib/trackSessionClick";
import logo from "@/assets/Primary_logo.svg";
import imgIngredients from "@/assets/Ingredients.png";
import sessionTimeIcon from "@/assets/leaderboard/session_time_icon.webp";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import { ReferralMilestonesCard } from "@/components/ReferralMilestonesCard";
import { ReferralProgressBar } from "@/components/ReferWinPopup";
import { ShareReferralActions } from "@/components/ShareReferralActions";
import NoSessionsCard from "@/components/NoSessionsCard";
import ReferWinCard from "@/components/ReferWinCard";

import thumbFaceYogaTel from "@/assets/bonus/Face Yoga Thumbnail.jpg";
import thumbFaceYogaEng from "@/assets/bonus/Face Yoga Thumbnail.jpg";
import thumbWeightLossTel from "@/assets/bonus/weightlosssession.jpg";
import thumbWeightLossEng from "@/assets/bonus/weightlosssession_eng.jpg";
import thumbMeditationTel from "@/assets/bonus/meditation_tel.jpg";
import thumbMeditationEng from "@/assets/bonus/meditation_eng.jpg";
import thumbBreathWorkTel from "@/assets/bonus/breathwork.jpg";
import thumbBreathWorkEng from "@/assets/bonus/bw_eng.jpg";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const START_DATE_MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const getOrdinalSuffix = (day: number) => (day >= 11 && day <= 13 ? "TH" : { 1: "ST", 2: "ND", 3: "RD" }[day % 10] ?? "TH");
const StartDateLabel = ({ date }: { date: Date }) => (
  <>{date.getDate()}<sup>{getOrdinalSuffix(date.getDate()).toLowerCase()}</sup> {START_DATE_MONTHS[date.getMonth()]}</>
);
// New batches always start on a Monday — the next upcoming one, never today even if today is Monday
const getNextMonday = (from: Date = new Date()) => {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  const daysToAdd = dow === 0 ? 1 : dow === 1 ? 7 : 8 - dow;
  d.setDate(d.getDate() + daysToAdd);
  return d;
};

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M15.9677 10.1262C14.9738 13.5804 11.7558 16 8.1468 16C3.65791 16 0 12.3421 0 7.8532C0 4.24417 2.4196 1.02618 5.87384 0.0322749C6.20786 -0.0654867 6.56632 0.064862 6.76999 0.341853C6.96551 0.626991 6.96551 1.00989 6.76184 1.28688C6.06937 2.25635 5.70276 3.3969 5.70276 4.59448C5.70276 7.73915 8.26085 10.2972 11.4055 10.2972C12.6031 10.2972 13.7436 9.93064 14.7131 9.23816C14.9901 9.03449 15.373 9.03449 15.6581 9.23001C15.9351 9.43368 16.0655 9.79214 15.9677 10.1262Z" fill="#5462F0" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.8346 2.50017C10.8346 2.72119 10.7468 2.93315 10.5906 3.08943C10.4343 3.24571 10.2223 3.33351 10.0013 3.33351C9.78029 3.33351 9.56833 3.24571 9.41205 3.08943C9.25577 2.93315 9.16797 2.72119 9.16797 2.50017C9.16797 2.27916 9.25577 2.0672 9.41205 1.91092C9.56833 1.75464 9.78029 1.66684 10.0013 1.66684C10.2223 1.66684 10.4343 1.75464 10.5906 1.91092C10.7468 2.0672 10.8346 2.27916 10.8346 2.50017Z" fill="#FEAB27" />
    <path fillRule="evenodd" clipRule="evenodd" d="M10.0013 15.8335C10.7673 15.8335 11.5259 15.6826 12.2336 15.3895C12.9414 15.0963 13.5844 14.6666 14.1261 14.125C14.6678 13.5833 15.0974 12.9402 15.3906 12.2325C15.6838 11.5248 15.8346 10.7662 15.8346 10.0002C15.8346 9.23413 15.6838 8.47559 15.3906 7.76785C15.0974 7.06012 14.6678 6.41706 14.1261 5.87538C13.5844 5.33371 12.9414 4.90403 12.2336 4.61088C11.5259 4.31772 10.7673 4.16684 10.0013 4.16684C8.45421 4.16684 6.97047 4.78142 5.87651 5.87538C4.78255 6.96935 4.16797 8.45308 4.16797 10.0002C4.16797 11.5473 4.78255 13.031 5.87651 14.125C6.97047 15.2189 8.45421 15.8335 10.0013 15.8335Z" fill="#FEAB27" />
    <path d="M10.0013 18.3331C10.2223 18.3331 10.4343 18.2453 10.5906 18.089C10.7468 17.9327 10.8346 17.7208 10.8346 17.4997C10.8346 17.2787 10.7468 17.0668 10.5906 16.9105C10.4343 16.7542 10.2223 16.6664 10.0013 16.6664C9.78029 16.6664 9.56833 16.7542 9.41205 16.9105C9.25577 17.0668 9.16797 17.2787 9.16797 17.4997C9.16797 17.7208 9.25577 17.9327 9.41205 18.089C9.56833 18.2453 9.78029 18.3331 10.0013 18.3331ZM17.5013 10.8331C17.2803 10.8331 17.0683 10.7453 16.912 10.589C16.7558 10.4327 16.668 10.2208 16.668 9.99975C16.668 9.77873 16.7558 9.56677 16.912 9.41049C17.0683 9.25421 17.2803 9.16641 17.5013 9.16641C17.7223 9.16641 17.9343 9.25421 18.0906 9.41049C18.2468 9.56677 18.3346 9.77873 18.3346 9.99975C18.3346 10.2208 18.2468 10.4327 18.0906 10.589C17.9343 10.7453 17.7223 10.8331 17.5013 10.8331ZM1.66797 9.99975C1.66797 10.2208 1.75577 10.4327 1.91205 10.589C2.06833 10.7453 2.28029 10.8331 2.5013 10.8331C2.72232 10.8331 2.93428 10.7453 3.09056 10.589C3.24684 10.4327 3.33464 10.2208 3.33464 9.99975C3.33464 9.77873 3.24684 9.56677 3.09056 9.41049C2.93428 9.25421 2.72232 9.16641 2.5013 9.16641C2.28029 9.16641 2.06833 9.25421 1.91205 9.41049C1.75577 9.56677 1.66797 9.77873 1.66797 9.99975ZM15.8938 5.28558C15.8169 5.36517 15.725 5.42866 15.6233 5.47233C15.5216 5.51601 15.4123 5.539 15.3016 5.53996C15.191 5.54092 15.0813 5.51983 14.9788 5.47793C14.8764 5.43603 14.7834 5.37415 14.7051 5.29591C14.6269 5.21767 14.565 5.12462 14.5231 5.02221C14.4812 4.9198 14.4601 4.81006 14.4611 4.69941C14.4621 4.58876 14.485 4.47941 14.5287 4.37774C14.5724 4.27607 14.6359 4.18412 14.7155 4.10725C14.8726 3.95545 15.0831 3.87145 15.3016 3.87335C15.5201 3.87525 15.7291 3.96289 15.8837 4.1174C16.0382 4.27191 16.1258 4.48092 16.1277 4.69941C16.1296 4.91791 16.0456 5.12841 15.8938 5.28558ZM4.10964 15.8922C4.18651 15.9718 4.27846 16.0353 4.38013 16.079C4.4818 16.1227 4.59115 16.1457 4.7018 16.1466C4.81245 16.1476 4.92218 16.1265 5.0246 16.0846C5.12701 16.0427 5.22005 15.9808 5.2983 15.9026C5.37654 15.8243 5.43842 15.7313 5.48032 15.6289C5.52222 15.5265 5.54331 15.4167 5.54234 15.3061C5.54138 15.1954 5.51839 15.0861 5.47472 14.9844C5.43105 14.8827 5.36756 14.7908 5.28797 14.7139C5.1302 14.5658 4.92098 14.4848 4.70457 14.4882C4.48817 14.4915 4.28156 14.5789 4.12846 14.7319C3.97537 14.8849 3.8878 15.0915 3.88429 15.3079C3.88077 15.5243 3.96159 15.7344 4.10964 15.8922ZM14.7163 15.8922C14.6367 15.8154 14.5732 15.7234 14.5296 15.6218C14.4859 15.5201 14.4629 15.4107 14.4619 15.3001C14.461 15.1894 14.482 15.0797 14.524 14.9773C14.5659 14.8749 14.6277 14.7818 14.706 14.7036C14.7842 14.6253 14.8773 14.5635 14.9797 14.5216C15.0821 14.4797 15.1918 14.4586 15.3025 14.4595C15.4131 14.4605 15.5225 14.4835 15.6241 14.5272C15.7258 14.5708 15.8178 14.6343 15.8946 14.7139C16.0464 14.8711 16.1304 15.0816 16.1285 15.3001C16.1266 15.5186 16.039 15.7276 15.8845 15.8821C15.73 16.0366 15.521 16.1242 15.3025 16.1261C15.084 16.128 14.8735 16.044 14.7163 15.8922ZM4.1088 4.10808C4.02921 4.18495 3.96573 4.27691 3.92205 4.37858C3.87838 4.48025 3.85539 4.5896 3.85443 4.70025C3.85347 4.8109 3.87455 4.92063 3.91645 5.02304C3.95835 5.12546 4.02023 5.2185 4.09847 5.29674C4.17672 5.37499 4.26976 5.43687 4.37217 5.47877C4.47459 5.52067 4.58432 5.54175 4.69497 5.54079C4.80562 5.53983 4.91497 5.51684 5.01664 5.47317C5.11831 5.42949 5.21026 5.36601 5.28714 5.28641C5.43529 5.12864 5.51626 4.91942 5.5129 4.70302C5.50954 4.48661 5.42211 4.28 5.26913 4.12691C5.11614 3.97382 4.9096 3.88625 4.69319 3.88273C4.47679 3.87922 4.26668 3.96004 4.1088 4.10808Z" fill="#FEAB27" />
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
    id: "TJXFF0LknNs",
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

import { safeSessionStorage, safeLocalStorage } from "@/lib/storage";

interface IndexProps {
  initialStudentData?: any;
  onSwitchToJourney?: () => void;
}

const Index = ({ initialStudentData, onSwitchToJourney }: IndexProps = {}) => {
  const navigate = useNavigate();
  const { mobile: pathMobile } = useParams<{ mobile: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Support Short.io link tracking: /dashboard?mobile=919110378176
  // Reads ?mobile= query param and redirects to clean path-based URL (/919110378176)
  const queryMobile = searchParams.get("mobile");
  const mobile = pathMobile || queryMobile || undefined;


  useEffect(() => {
    if (!pathMobile && queryMobile) {
      // Redirect from /dashboard?mobile=XXX → /XXX (preserving other query params like ?preview=)
      const remaining = new URLSearchParams(location.search);
      remaining.delete("mobile");
      const qs = remaining.toString();
      navigate(`/${queryMobile}${qs ? `?${qs}` : ""}`, { replace: true });
    }
  }, [pathMobile, queryMobile, navigate, location.search]);

  // --- Link tracking: log visit to Supabase attendance_logs ---
  useEffect(() => {
    if (mobile) {
      trackVisit(mobile);
    }
  }, [mobile]);

  // --- Fetch session links for paid users ---
  useEffect(() => {
    fetch("/.netlify/functions/session-links")
      .then(r => r.json())
      .then(data => {
        // Handle bare array OR wrapped object { data: [...] } / { links: [...] }
        const arr = Array.isArray(data)
          ? data
          : Array.isArray(data?.data) ? data.data
            : Array.isArray(data?.links) ? data.links
              : [];
        setSessionLinks(arr);
      })
      .catch(() => { });
  }, []);

  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [loading, setLoading] = useState(!initialStudentData);
  const [error, setError] = useState<string | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [studentData, setStudentData] = useState<any>(initialStudentData ?? null);
  const [showComingSoon, setShowComingSoon] = useState(
    initialStudentData
      ? !(initialStudentData.language === "Telugu" || initialStudentData.language === "English")
      : false
  );
  const [authenticated, setAuthenticated] = useState(
    initialStudentData
      ? (initialStudentData.language === "Telugu" || initialStudentData.language === "English")
      : false
  );
  const [sessionLinks, setSessionLinks] = useState<any[]>([]);
  const [joinedDays, setJoinedDays] = useState<number[]>(() => {
    try {
      const keys = safeLocalStorage.keys().filter(k => k.startsWith("hd_joined_"));
      for (const k of keys) {
        const stored = safeLocalStorage.getItem(k);
        if (stored) return JSON.parse(stored);
      }
    } catch { }
    return [];
  });

  useEffect(() => {
    if (initialStudentData) return; // data already provided by parent or preview
    // Helper: get local date string (YYYY-MM-DD) without UTC timezone shift
    const toLocalDateStr = (d: Date) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };
    if (!mobile) {
      setLoading(false);
      setError("No mobile number provided. Please visit /<mobile_number> to login.");
      return;
    }

    // Normalize mobile number: strip spaces, dashes, parentheses, leading +
    const rawMobile = mobile || "";
    const cleanedMobile = rawMobile.replace(/[\s\-\(\)\+]/g, "");

    if (!/^\d{7,15}$/.test(cleanedMobile)) {
      setLoading(false);
      setError("Please enter a valid mobile number.");
      return;
    }

    // If the URL had special characters (e.g. +91xxx), redirect to clean numeric URL
    if (rawMobile !== cleanedMobile) {
      navigate(`/${cleanedMobile}`, { replace: true });
      return;
    }

    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Country code is compulsory for all users. We just prepend +
        const apiMobile = `+${cleanedMobile}`;
        const encodedMobile = encodeURIComponent(apiMobile);
        const response = await fetch(
          `/.netlify/functions/student?mobile=${encodedMobile}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("This link is incorrect. Can you please recheck your WhatsApp reminder and open the correct link?");
          }
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("[DEBUG] raw API language:", data.language, "| full data keys:", Object.keys(data));
        setStudentData(data);

        // Store referral data for the Referral page
        safeSessionStorage.setItem("total_referral_count", String(data.total_referral_count ?? 0));
        safeSessionStorage.setItem("referrer_mobile", mobile || "");

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
  }, [mobile]);

  // --- Join tracking via localStorage (must be before any conditional returns) ---
  const joinStorageKey = `hd_joined_${mobile}_${studentData?.free_batch_start_date}`;
  useEffect(() => {
    if (!studentData?.free_batch_start_date) return;
    try {
      const stored = safeLocalStorage.getItem(joinStorageKey);
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

  const _globalForceDayParam = new URLSearchParams(location.search).get("forceDay");
  // forceDay=0 is a reserved sentinel (batch day-of-batch is otherwise 1-14) that
  // forces the pre-batch onboarding screen — used to preview the July 5 intro
  // session card without needing a real not-yet-started account.
  const isForceOnboardingPreview = _globalForceDayParam === "0";
  const batchInfo = (() => {
    const real = getActiveBatchInfo(studentData?.free_batch_start_date);
    if (_globalForceDayParam !== null && studentData?.free_batch_start_date) {
      const fd = parseInt(_globalForceDayParam, 10);
      const bs = new Date(studentData.free_batch_start_date);
      bs.setHours(0, 0, 0, 0);
      const be = new Date(bs);
      be.setDate(bs.getDate() + 13);
      const DN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const MN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const fmt = (d: Date) => `${DN[d.getDay()]}, ${MN[d.getMonth()]} ${d.getDate()}`;
      return { isActive: true as const, currentDay: fd, week: fd <= 7 ? 1 : 2, dateRangeLabel: `${fmt(bs)} — ${fmt(be)}` };
    }
    return real;
  })();
  const studentStatus = studentData?.status;
  const isOngoingStatus = studentStatus === "registered" || studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing";
  const isPaid = studentStatus === "paid";
  const sessionJoinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link;
  const hasBatchAccess = isOngoingStatus && batchInfo.isActive && !!sessionJoinLink;

  // --- Active Batch Dashboard (Week 1 or Week 2) ---
  if (hasBatchAccess && !isForceOnboardingPreview) {
    const { currentDay, week, dateRangeLabel } = batchInfo;

    // Level Card tracks the legacy 21-day journey (levels at day 3/6/9/12/15/18/21) — only meaningful for the June-21-2026 batch
    const isLegacyTwentyOneDayBatch = studentData?.free_batch_start_date === "2026-06-21";

    // Combine attendance across all batches that share the active batch start date
    const freeBatches: any[] = studentData?.free_batches ?? [];
    const activeBatches = freeBatches.filter((b) => b.batch_start_date === studentData?.free_batch_start_date);
    const batchesToCheck = activeBatches.length > 0 ? activeBatches : freeBatches;
    const attendedDates = new Set<string>(batchesToCheck.flatMap((b) => b.attendance_tracker ?? []));
    const freeDaysAttended = (() => {
      if (_globalForceDayParam !== null) {
        return Math.min(21, Math.max(0, parseInt(_globalForceDayParam, 10)));
      }
      return Math.min(attendedDates.size, 21);
    })();
    const batchOrigin = new Date(studentData?.free_batch_start_date!);
    batchOrigin.setHours(0, 0, 0, 0);

    // --- Join tracking ---
    const markTodayJoined = () => {
      if (!joinedDays.includes(currentDay)) {
        const updated = [...joinedDays, currentDay];
        setJoinedDays(updated);
        safeLocalStorage.setItem(joinStorageKey, JSON.stringify(updated));
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

    const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
    const defaultTotalMin = nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
    const _sessionLinkTimeParam = new URLSearchParams(location.search).get("time");
    const totalMinCalc = (() => {
      if (_sessionLinkTimeParam) {
        const isPM = _sessionLinkTimeParam.toLowerCase().endsWith("pm");
        const s = _sessionLinkTimeParam.toLowerCase().replace("am", "").replace("pm", "");
        const [hStr, mStr] = s.split(".");
        let h = parseInt(hStr, 10);
        const m = parseInt(mStr ?? "0", 10);
        if (isPM && h !== 12) h += 12;
        if (!isPM && h === 12) h = 0;
        return h * 60 + m;
      }
      return defaultTotalMin;
    })();
    const isMorning = totalMinCalc < (15 * 60 + 30); // < 3:30 PM IST
    const timeOfDayStr = isMorning ? "morning" : "evening";
    const freeLangKey = (studentData?.language || "Telugu").toLowerCase();
    const freeSessionCode = `iyd_2026_${timeOfDayStr}`;

    const freeApiSessionEntry = sessionLinks.find(
      (s: any) => s.session_code === freeSessionCode && s.language === freeLangKey
    );
    const freeApiSessionLink = freeApiSessionEntry?.link || null;
    const apiSessionName = freeApiSessionEntry?.session_name || null; // Can be used to show title if needed

    const sessionLink = freeApiSessionLink || sessionJoinLink || "https://www.youtube.com/c/Healthyday";
    const ytIdMatch = sessionLink.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    const sessionVideoId = ytIdMatch ? ytIdMatch[1] : null;
    const referralLink = studentData?.referral_link ?? "healthyday.app/ref=ggtujev58";

    const shareLink = mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : referralLink;
    const handleCopyLink = () => navigator.clipboard.writeText(shareLink);
    const handleWhatsAppShare = () => {
      const waMessage = `I am Inviting you to join me in\n*14-Days FREE YOGA* 🧘‍♀️😊\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith *JAGAN* 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students\n\n*Register for FREE Now* 👇🏻👇🏻\n${shareLink}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank");
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

    // --- Bonus Special Sessions ---
    const lang = studentData?.language === "English" ? "English" : "Telugu";
    const BONUS_DAYS = lang === "English" ? [5, 8, 12, 15, 19, 22] : [4, 8, 11, 15, 18, 22];

    if (BONUS_DAYS.includes(currentDay)) {
      type BonusInfo = { name: string; fullName: string; startMin: number; videoId: string; sessionLink: string; thumbnail: string; liveDuration?: number; activeEndOffset?: number };
      const getBonusInfo = (day: number, l: string): BonusInfo => {
        if (l === "Telugu") {
          switch (day) {
            case 4: return { name: "Face Yoga Session", fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/faceyoga", thumbnail: thumbFaceYogaTel, liveDuration: 60, activeEndOffset: 60 };
            case 8: return { name: "Weight Loss Session", fullName: "Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession", thumbnail: thumbWeightLossTel };
            case 11: return { name: "Meditation Session", fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, videoId: "cXaVIxH3RKA", sessionLink: "https://www.youtube.com/watch?v=cXaVIxH3RKA", thumbnail: ytThumb("cXaVIxH3RKA") };
            case 15: return { name: "Breath Work Session", fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/breathwork", thumbnail: thumbBreathWorkTel, liveDuration: 30, activeEndOffset: 60 };
            case 18: return { name: "Live Q&A", fullName: "Live Q&A Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/liveqa", thumbnail: ytThumb("SyjnCjDtNS8"), liveDuration: 60, activeEndOffset: 60 };
            case 22: return { name: "Graduation Session", fullName: "Graduation Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/graduation", thumbnail: ytThumb("SyjnCjDtNS8") };
            default: return {} as BonusInfo;
          }
        } else {
          switch (day) {
            case 5: return { name: "Face Yoga Session", fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/faceyoga_eng", thumbnail: thumbFaceYogaEng, liveDuration: 60, activeEndOffset: 60 };
            case 8: return { name: "Weight Loss Orientation", fullName: "Weight Loss Orientation at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession_eng", thumbnail: thumbWeightLossEng };
            case 12: return { name: "Meditation Session", fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, videoId: "u1Hom0s7ibU", sessionLink: "https://start.dailyyogawithjagan.com/meditation_eng", thumbnail: thumbMeditationEng };
            case 15: return { name: "Breath Work Session", fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/bw_eng", thumbnail: thumbBreathWorkEng, liveDuration: 30, activeEndOffset: 60 };
            case 19: return { name: "Live Q&A", fullName: "Live Q&A Session at 8:30 PM", startMin: 20 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/liveqa_eng", thumbnail: ytThumb("SyjnCjDtNS8"), liveDuration: 60, activeEndOffset: 60 };
            case 22: return { name: "Graduation Session", fullName: "Graduation Session at 10:30 AM", startMin: 10 * 60 + 30, videoId: "SyjnCjDtNS8", sessionLink: "https://start.dailyyogawithjagan.com/graduation_eng", thumbnail: ytThumb("SyjnCjDtNS8") };
            default: return {} as BonusInfo;
          }
        }
      };

      const bonusSession = getBonusInfo(currentDay, lang);
      const bonusSessionCode = `free_bonus_${bonusSession.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
      const _timeParam = new URLSearchParams(location.search).get("time");
      const totalMin = (() => { if (_timeParam) { const isPM = _timeParam.toLowerCase().endsWith("pm"); const s = _timeParam.toLowerCase().replace("am", "").replace("pm", ""); const [hStr, mStr] = s.split("."); let h = parseInt(hStr, 10); const m = parseInt(mStr ?? "0", 10); if (isPM && h !== 12) h += 12; if (!isPM && h === 12) h = 0; return h * 60 + m; } const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000); return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes(); })();
      const showBonus = isOngoingStatus && totalMin >= bonusSession.startMin - 30 && totalMin < bonusSession.startMin + (bonusSession.activeEndOffset ?? 30);
      if (showBonus) {
        const isLive = totalMin >= bonusSession.startMin && totalMin < bonusSession.startMin + (bonusSession.liveDuration ?? 30);
        const isAMSession = bonusSession.startMin < 12 * 60;
        const nextSlots = isAMSession ? ["4:00 PM", "5:30 PM", "6:30 PM"] : ["5:00 AM", "6:30 AM", "7:30 AM", "8:30 AM"];
        const nextWhen = isAMSession ? "at 4:00 PM" : "tomorrow at 5:00 AM";
        return (
          <div>
            <header className="hd-header bg-white">
              <img src={logo} alt="Healthyday" className="h-7" />
            </header>

            {/* Bonus Special Session */}
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
                  <a href={bonusSession.sessionLink} target="_blank" rel="noopener noreferrer" onClick={() => trackSessionClick(mobile, bonusSessionCode)} style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px", overflow: "hidden", background: "#000", position: "relative", marginBottom: "12px" }}>
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
                      onClick={() => trackSessionClick(mobile, bonusSessionCode)}
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

              {/* Next regular session card replaced by grey note */}
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

            {/* Level Card — 21-day journey progress, legacy June-21-2026 batch only */}
            {isLegacyTwentyOneDayBatch && (
              <div style={{ padding: "18px 20px 0" }}>
                <LevelCard
                  freeDaysAttended={freeDaysAttended}
                  studentName={studentData?.name}
                  joinLink={sessionJoinLink || ""}
                  language={studentData?.language}
                  onViewMore={onSwitchToJourney}
                  onCertificateClick={() => setShowCertificateModal(true)}
                />
              </div>
            )}

            {/* Refer & Win card */}
            <div style={{ padding: "18px 20px 0" }}>
              <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={`/${mobile || ""}/referrals`} />
            </div>

            {/* 14 Days Attendance — commented out */}
            {/* <div style={{ padding: "28px 20px 0" }}>
              <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
                Your 14 Days Attendance
              </h3>
              <div style={{ width: "100%", borderRadius: "15px", border: "1px solid #FFC76F", padding: "16px 12px", background: "#FFE5BA", boxSizing: "border-box" }}>
                <p style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, marginBottom: "14px" }}>
                  {dateRangeLabel}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                  {dayStatus.slice(0, 7).map((status, i) => (
                    <DayBox key={i} status={status} dayLabel={`Day ${i + 1}`} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {dayStatus.slice(7, 14).map((status, i) => (
                    <DayBox key={i} status={status} dayLabel={`Day ${i + 8}`} />
                  ))}
                </div>
              </div>
            </div> */}

            {/* Your Referral Gifts — commented out */}
            {/* {week === 1 && (() => {
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
                    <h3>Your Referral Gifts</h3>
                    <span onClick={() => navigate(`/${mobile || ""}/leaderboard`)}>View More</span>
                  </div>
                  <div>
                    <ReferralMilestonesCard refCount={refCount} milestones={milestones} nextLabel="NEXT GOAL" />
                  </div>
                </div>
              );
            })()} */}

            {/* Refer & Win card */}
            {/* <div style={{ padding: "28px 20px 40px", display: "flex", justifyContent: "center" }}>
              <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={`/${mobile || ""}/referrals`} />
            </div> */}

            {/* Week 2 Bonus: show payment section instead */}
            {week === 2 && (
              <>
                <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
                  <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
                  <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
                </div>
                {/* <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
                  <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={`/${mobile || ""}/referrals`} />
                </div> */}
              </>
            )}

          </div>
        );
      } // end if (showBonus)
    } // end if (BONUS_DAYS)

    let activeRecurringBonusCard: any = null;
    if (isPaid) {
      const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
      const _forceTime = new URLSearchParams(location.search).get("time");
      const _forceDay = new URLSearchParams(location.search).get("forceDay");
      const totalMin = (() => { if (_forceTime) { const isPM = _forceTime.toLowerCase().endsWith("pm"); const s = _forceTime.toLowerCase().replace("am", "").replace("pm", ""); const [hStr, mStr] = s.split("."); let h = parseInt(hStr, 10); const m = parseInt(mStr ?? "0", 10); if (isPM && h !== 12) h += 12; if (!isPM && h === 12) h = 0; return h * 60 + m; } return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes(); })();
      const currentDow = _forceDay !== null ? parseInt(_forceDay, 10) : nowIST.getUTCDay();

      const activeSub = studentData?.subscriptions?.find((s: any) => s.subscription_status === "active" || s.subscription_status === "ongoing") || studentData?.subscriptions?.[0];
      const planType = activeSub?.plan_type || studentData?.current_plan || studentData?.plan_type;
      const is6Month = planType === "6_months" || planType === "6_months_upgrade";
      const is12Month = planType === "12_months" || planType === "12_months_upgrade";
      const paidLang = studentData?.language === "English" ? "English" : "Telugu";
      const langKey = paidLang.toLowerCase();

      const anchorDate = new Date(Date.UTC(2026, 3, 5));
      const diffMs = nowIST.getTime() - anchorDate.getTime();
      const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
      const isTeluguFaceYogaWeek = diffWeeks % 2 === 0;

      const eligibleBonusSessions: any[] = [];
      const getApiBonusLink = (code: string, fallback: string) => { const match = sessionLinks.find((s: any) => s.session_code === code && s.language === langKey); return match?.link || fallback; };
      const getDynamicThumbnail = (link: string, fallbackId: string) => { if (!link) return ytThumb(fallbackId); const match = link.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/); return ytThumb(match ? match[1] : fallbackId); };

      if (is12Month && currentDow === 0) {
        if (paidLang === "Telugu" && isTeluguFaceYogaWeek) {
          const link = getApiBonusLink("face_yoga", "https://join.healthyday.co.in/healthyface");
          eligibleBonusSessions.push({ name: "Face Yoga Session", fullName: "Face Yoga Session at 11:30 AM", startMin: 690, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8") });
        } else if (paidLang === "English" && !isTeluguFaceYogaWeek) {
          const link = getApiBonusLink("face_yoga", "https://join.healthyday.co.in/healthyface_eng");
          eligibleBonusSessions.push({ name: "Face Yoga Session", fullName: "Face Yoga Session at 11:30 AM", startMin: 690, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8") });
        }
      }
      if (is12Month) {
        const link = getApiBonusLink("paid_diet", paidLang === "English" ? "https://join.healthyday.co.in/diet_eng" : "https://join.healthyday.co.in/diet");
        eligibleBonusSessions.push({ name: "Diet Session", fullName: "Diet Session at 8:00 PM", startMin: 1200, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8") });
      }
      if ((is6Month || is12Month) && !(paidLang === "English" && currentDow === 0)) {
        const link = getApiBonusLink("b2h", paidLang === "English" ? "https://join.healthyday.co.in/b2hsession_eng" : "https://join.healthyday.co.in/b2hsession");
        eligibleBonusSessions.push({ name: "Breath to Heal Session", fullName: "Breath to Heal Session at 9:00 PM", startMin: 1260, sessionLink: link, thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8") });
      }

      activeRecurringBonusCard = eligibleBonusSessions.find(s => totalMin >= s.startMin - 30 && totalMin < s.startMin + 45) || null;
    }

    return (
      <div>
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        {activeRecurringBonusCard && (() => {
          const rTotalMin = (() => { const _t = new URLSearchParams(location.search).get("time"); if (_t) { const isPM = _t.toLowerCase().endsWith("pm"); const s = _t.toLowerCase().replace("am", "").replace("pm", ""); const [hStr, mStr] = s.split("."); let h = parseInt(hStr, 10); const m = parseInt(mStr ?? "0", 10); if (isPM && h !== 12) h += 12; if (!isPM && h === 12) h = 0; return h * 60 + m; } const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000); return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes(); })();
          const bonusIsLive = rTotalMin >= activeRecurringBonusCard.startMin && rTotalMin < activeRecurringBonusCard.startMin + 30;
          const bonusTimeLabel = activeRecurringBonusCard.fullName.replace(/^.*at\s+/, '');
          return (
            <div style={{ padding: "24px 20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>
                  {bonusIsLive ? `${activeRecurringBonusCard.name} - Live Now` : `Next Session - ${activeRecurringBonusCard.name}`}
                </h2>
                {bonusIsLive && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
                    <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>LIVE</span>
                  </div>
                )}
              </div>
              <div style={{ width: "100%" }}>
                <a href={activeRecurringBonusCard.sessionLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px 12px 0 0", overflow: "hidden", background: "#000", position: "relative" }}>
                  <img src={activeRecurringBonusCard.thumbnail} alt={activeRecurringBonusCard.name} style={{ width: "100%", height: "auto", aspectRatio: "372/204", objectFit: "cover", opacity: 0.85, display: "block" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><PlayButton /></div>
                </a>
                <div style={{ width: "100%", height: "67px", borderRadius: "0 0 12px 12px", border: "1.5px solid #E9E9E9", background: "#FFF", boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" }}>
                  {bonusIsLive ? (
                    <a href={activeRecurringBonusCard.sessionLink} target="_blank" rel="noopener noreferrer" style={{ width: "300px", height: "40px", borderRadius: "10px", background: "#FEAB27", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", boxShadow: "0 2px 8px rgba(254,171,39,0.35)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN NOW</span>
                    </a>
                  ) : (
                    <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>Session Starts at {bonusTimeLabel}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Your Yoga Session — live/not-live */}
        {(() => {
          const _timeParam2 = new URLSearchParams(location.search).get("time");
          const totalMin = (() => { if (_timeParam2) { const isPM = _timeParam2.toLowerCase().endsWith("pm"); const s = _timeParam2.toLowerCase().replace("am", "").replace("pm", ""); const [hStr, mStr] = s.split("."); let h = parseInt(hStr, 10); const m = parseInt(mStr ?? "0", 10); if (isPM && h !== 12) h += 12; if (!isPM && h === 12) h = 0; return h * 60 + m; } const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000); return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes(); })();

          // Bonus session detection for regular session card
          const BONUS_DAYS = [3, 5, 7, 10, 14];
          const bonusByDayMap: Record<number, Record<string, { fullName: string; startMin: number; sessionLink: string; thumbnail: string; liveDuration?: number; activeEndOffset?: number }>> = {
            3: {
              Telugu: { fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/faceyoga", thumbnail: ytThumb("SyjnCjDtNS8") },
              English: { fullName: "Face Yoga Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/faceyoga_eng", thumbnail: ytThumb("SyjnCjDtNS8") }
            },
            5: { Telugu: { fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, sessionLink: "https://start.dailyyogawithjagan.com/meditation_tel", thumbnail: ytThumb("raCc7Z31LYw") }, English: { fullName: "Meditation Session at 8:00 PM", startMin: 20 * 60, sessionLink: "https://start.dailyyogawithjagan.com/meditation_eng", thumbnail: ytThumb("u1Hom0s7ibU") } },
            7: { Telugu: { fullName: "Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession", thumbnail: ytThumb("SyjnCjDtNS8") }, English: { fullName: "Weight Loss Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/weightlosssession_eng", thumbnail: ytThumb("SyjnCjDtNS8") } },
            10: {
              Telugu: { fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/breathwork", thumbnail: ytThumb("SyjnCjDtNS8") },
              English: { fullName: "Breath Work Session at 8:30 PM", startMin: 20 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/bw_eng", thumbnail: ytThumb("SyjnCjDtNS8") }
            },
            14: { Telugu: { fullName: "Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/sleepsession", thumbnail: ytThumb("SyjnCjDtNS8") }, English: { fullName: "Sleep Session at 10:30 AM", startMin: 10 * 60 + 30, sessionLink: "https://start.dailyyogawithjagan.com/sleepsession_eng", thumbnail: ytThumb("SyjnCjDtNS8") } },
          };
          const bonusLang = studentData?.language === "English" ? "English" : "Telugu";
          const isBonusDay = BONUS_DAYS.includes(currentDay);
          const bonusSessionData = isBonusDay ? bonusByDayMap[currentDay][bonusLang] : null;
          const showBonus = isPaid && isBonusDay && bonusSessionData !== null && totalMin >= bonusSessionData.startMin - 30 && totalMin < bonusSessionData.startMin + (bonusSessionData.activeEndOffset ?? 30);

          const MORNING_SLOTS = [
            { start: 4 * 60 + 30, end: 6 * 60 + 30, label: "5:30 AM" }, // Starts at 4:45 AM
            { start: 6 * 60 + 30, end: 7 * 60 + 30, label: "6:30 AM" },
            { start: 7 * 60 + 30, end: 8 * 60 + 30, label: "7:30 AM" },
            { start: 8 * 60 + 30, end: 9 * 60 + 30, label: "8:30 AM" },
          ];
          const EVENING_SLOTS = [
            { start: 15 * 60 + 30, end: 17 * 60 + 30, label: "4:30 PM" }, // Starts at 3:30 PM
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

          // If there's an active recurring bonus card and nothing else is live, hide this section
          if (activeRecurringBonusCard && !liveSlot && !showBonus) {
            return null;
          }

          let noteText: string | null = null;
          if (showBonus && bonusSessionData) {
            noteText = `Next Yoga Session is ${nextText}. Currently, Bonus Session is going on! Click on the link above to join`;
          } else if (!liveSlot) {
            noteText = null;
          }

          return (
            <div style={{ padding: "24px 20px 0" }}>
              {(!liveSlot && !showBonus) ? (
                (currentDay === 1 && !isTomorrow && !(nextSlot && EVENING_SLOTS.some(s => s.label === nextSlot.label))) ? (
                  <>
                    <div style={{ paddingTop: "16px", textAlign: "center" }}>
                      <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#0A386F" }}>
                        14-DAYS ONLINE FREE YOGA
                      </p>
                      <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#FE961B" }}>
                        STARTING <StartDateLabel date={batchOrigin} />
                      </p>
                    </div>
                    <div className="flex flex-col items-center m-3">
                      <div style={{ maxWidth: "342px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <SunIcon />
                        <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "9px", fontWeight: 700, lineHeight: "normal" }}>
                          MOR - 5:30AM | 6:30AM | 7:30AM | 8:30AM IST
                        </span>
                      </div>
                      <div style={{ maxWidth: "342px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <MoonIcon />
                        <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "9px", fontWeight: 700, lineHeight: "normal" }}>
                          EVE - 4:30PM | 5:30PM | 6:30PM IST
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <NoSessionsCard totalMin={totalMin} isFreeBatch={true} />
                  </div>
                )
              ) : (
                <>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Your Yoga Session</h2>
                    {liveSlot && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
                        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
                        <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>Ongoing now</span>
                      </div>
                    )}
                  </div>

                  {/* Session Card */}
                  <div style={{ width: "100%" }}>
                    {/* Thumbnail */}
                    <a href={showBonus && bonusSessionData ? bonusSessionData.sessionLink : sessionLink} target="_blank" rel="noopener noreferrer" onClick={() => { markTodayJoined(); trackSessionClick(mobile, showBonus && bonusSessionData ? `free_bonus_${bonusSessionData.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "_")}` : freeSessionCode); }} style={{ display: "block", textDecoration: "none" }}>
                      <div style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "178/93",
                        borderRadius: "12px 12px 0 0",
                        background: (() => {
                          if (showBonus && bonusSessionData) return `url(${bonusSessionData.thumbnail}) lightgray 50% / cover no-repeat`;
                          if (sessionVideoId) {
                            return `url(https://img.youtube.com/vi/${sessionVideoId}/maxresdefault.jpg) lightgray 50% / cover no-repeat`;
                          }
                          const lang = studentData?.language;
                          if (lang === "English") return "url(/language%20English.jpg) lightgray 50% / cover no-repeat";
                          return "url(/language%20Telugu.jpg) lightgray 50% / cover no-repeat";
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
                            <a href={bonusSessionData.sessionLink} target="_blank" rel="noopener noreferrer" onClick={() => { markTodayJoined(); trackSessionClick(mobile, `free_bonus_${bonusSessionData.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`); }} style={{
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
                        // Bonus day but outside 30-min window, and no regular session is live: show bonus session name text
                        if (isBonusDay && bonusSessionData && !liveSlot) {
                          return (
                            <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>
                              {bonusSessionData.fullName}
                            </span>
                          );
                        }
                        // Regular day: show JOIN SESSION with API link
                        return (
                          <a href={sessionLink} target="_blank" rel="noopener noreferrer" onClick={() => { markTodayJoined(); trackSessionClick(mobile, freeSessionCode); }} style={{
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

                  {/* Note — conditionally shown */}
                  {noteText && (
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "5px", marginTop: "10px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.764" height="14.764" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
                        <path d="M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" fill="#9D9D9D" />
                        <path d="M8.38188 5.92126H8.39009H8.38188Z" fill="#9D9D9D" />
                        <path d="M7.56167 8.38188H8.38188V11.6627H9.20209" fill="#9D9D9D" />
                        <path d="M8.38188 5.92126H8.39009M7.56167 8.38188H8.38188V11.6627H9.20209M1 8.38188C1 9.35129 1.19094 10.3112 1.56191 11.2068C1.93289 12.1024 2.47663 12.9162 3.1621 13.6017C3.84757 14.2871 4.66135 14.8309 5.55696 15.2019C6.45257 15.5728 7.41248 15.7638 8.38188 15.7638C9.35129 15.7638 10.3112 15.5728 11.2068 15.2019C12.1024 14.8309 12.9162 14.2871 13.6017 13.6017C14.2871 12.9162 14.8309 12.1024 15.2019 11.2068C15.5728 10.3112 15.7638 9.35129 15.7638 8.38188C15.7638 6.42409 14.986 4.54647 13.6017 3.1621C12.2173 1.77773 10.3397 1 8.38188 1C6.42409 1 4.54647 1.77773 3.1621 3.1621C1.77773 4.54647 1 6.42409 1 8.38188Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ width: "343px", color: "#747474", fontFamily: "Outfit", fontSize: "13px", fontWeight: 400, lineHeight: "22px", textAlign: "center" }}>
                        {noteText}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })()}

        {/* Level Card — 21-day journey progress, legacy June-21-2026 batch only */}
        {isLegacyTwentyOneDayBatch && (
          <div style={{ padding: "18px 20px 0" }}>
            <LevelCard
              freeDaysAttended={freeDaysAttended}
              studentName={studentData?.name}
              joinLink={sessionJoinLink || ""}
              language={studentData?.language}
              onViewMore={onSwitchToJourney}
              onCertificateClick={() => setShowCertificateModal(true)}
            />
          </div>
        )}

        {/* Refer & Win card */}
        <div style={{ padding: "18px 20px 0" }}>
          <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={`/${mobile || ""}/referrals`} />
        </div>

        {/* 14 Days Attendance — commented out */}
        {/* <div style={{ padding: "28px 20px 0" }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              {dayStatus.slice(0, 7).map((status, i) => (
                <DayBox key={i} status={status} dayLabel={`Day ${i + 1}`} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {dayStatus.slice(7, 14).map((status, i) => (
                <DayBox key={i} status={status} dayLabel={`Day ${i + 8}`} />
              ))}
            </div>
          </div>
        </div> */}

        {/* Week 2 Pricing & Comparison */}
        {/* {week === 2 && (
          <PricingAndComparisonSection selectedPlanIdx={selectedPlanIdx} setSelectedPlanIdx={setSelectedPlanIdx} daysLeft={Math.max(0, 15 - currentDay)} useOngoingPricing={true} />
        )} */}

        {/* Your Referral Gifts Section — commented out */}
        {/* {week === 1 && (
          <>
            {(() => {
              const refCount = studentData?.total_referral_count ?? 0;
              const milestones = [...];
              return (
                <div>
                  <h3>Your Referral Gifts</h3>
                  <ReferralMilestonesCard refCount={refCount} milestones={milestones} />
                </div>
              );
            })()}
          </>
        )} */}

        {/* week === 2 && (
          <>
            <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
              <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
              <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
            </div>
            <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
              <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={`/${mobile || ""}/referrals`} />
            </div>
          </>
        ) */}

      </div>
    );
  }

  // --- Paid Member Dashboard ---
  if (isPaid && !isForceOnboardingPreview) {
    const referralLink = studentData?.referral_link ?? "healthyday.app/ref=ggtujev58";
    const shareLink = mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : referralLink;

    // Session live detection (IST)
    const forceTimeParam = new URLSearchParams(location.search).get("time");
    const forceDay = new URLSearchParams(location.search).get("forceDay");

    const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
    const totalMin = (() => {
      if (forceTimeParam) {
        const isPM = forceTimeParam.toLowerCase().endsWith("pm");
        const s = forceTimeParam.toLowerCase().replace("am", "").replace("pm", "");
        const [hStr, mStr] = s.split(".");
        let h = parseInt(hStr, 10);
        const m = parseInt(mStr ?? "0", 10);
        if (isPM && h !== 12) h += 12;
        if (!isPM && h === 12) h = 0;
        return h * 60 + m;
      }
      return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
    })();
    const currentDow = forceDay !== null ? parseInt(forceDay, 10) : nowIST.getUTCDay(); // 0 is Sunday

    // Subscription plan duration check
    const activeSub = studentData?.subscriptions?.find((s: any) => s.subscription_status === "active" || s.subscription_status === "ongoing") || studentData?.subscriptions?.[0];
    const planType = activeSub?.plan_type || studentData?.current_plan || studentData?.plan_type;
    const is6Month = planType === "6_months" || planType === "6_months_upgrade";
    const is12Month = planType === "12_months" || planType === "12_months_upgrade";
    const paidLang = studentData?.language === "English" ? "English" : "Telugu";

    // Resolve session link from API: pick morning (< 15:30 IST) or evening (≥ 15:30 IST)
    // Morning updates at 4:30 AM, Evening updates at 3:30 PM
    const sessionCodeForNow = totalMin < (15 * 60 + 30) ? "daily_morning" : "daily_evening";
    const langKey = paidLang.toLowerCase(); // "telugu" or "english"
    const apiSessionEntry = sessionLinks.find(
      (s: any) => s.session_code === sessionCodeForNow && s.language === langKey
    ) || null;
    const apiSessionLink = apiSessionEntry?.link || null;
    const apiSessionName = apiSessionEntry?.session_name || null;
    const paidJoinLink = apiSessionLink || studentData?.paid_classes_joining_link || studentData?.classes_joining_link || sessionJoinLink || "https://www.youtube.com/c/Healthyday";

    // Extract YouTube video ID from the resolved join link for thumbnail
    const ytMatch = paidJoinLink.match(/(?:v=|youtu\.be\/|\/live\/)([a-zA-Z0-9_-]{11})/);
    const sessionVideoId = ytMatch ? ytMatch[1] : null;
    const sessionThumbnail = sessionVideoId
      ? `https://img.youtube.com/vi/${sessionVideoId}/maxresdefault.jpg`
      : `/language%20${studentData?.language === "English" ? "English" : "Telugu"}.jpg`;

    // Paid Bonus Sessions Logic
    const anchorDate = new Date(Date.UTC(2026, 3, 5)); // April 5, 2026
    const diffMs = nowIST.getTime() - anchorDate.getTime();
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    const isTeluguFaceYogaWeek = diffWeeks % 2 === 0;

    // Collect all eligible bonus sessions for today, then pick the one
    // whose active window (startMin-30 to startMin+45) matches current time.
    // This ensures sessions like Diet (8 PM) and Breath to Heal (9 PM) can
    // both show for 12-month Telugu users at the correct time.
    type BonusCard = { name: string; fullName: string; startMin: number; sessionLink: string; thumbnail: string; code: string };
    const eligibleBonusSessions: BonusCard[] = [];

    const getApiBonusLink = (code: string, fallback: string) => {
      const match = sessionLinks.find((s: any) => s.session_code === code && s.language === langKey);
      return match?.link || fallback;
    };

    const getDynamicThumbnail = (link: string, fallbackId: string) => {
      if (!link) return ytThumb(fallbackId);
      const match = link.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
      return ytThumb(match ? match[1] : fallbackId);
    };

    // 1. Face Yoga (Sundays at 11:30 AM IST -> 690 min)
    // Eligible: 12 months only
    if (is12Month && currentDow === 0) {
      if (paidLang === "Telugu" && isTeluguFaceYogaWeek) {
        const link = getApiBonusLink("face_yoga", "https://join.healthyday.co.in/healthyface");
        eligibleBonusSessions.push({
          name: "Face Yoga Session",
          fullName: "Face Yoga Session at 11:30 AM",
          startMin: 690,
          sessionLink: link,
          thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"),
          code: "face_yoga",
        });
      } else if (paidLang === "English" && !isTeluguFaceYogaWeek) {
        const link = getApiBonusLink("face_yoga", "https://join.healthyday.co.in/healthyface_eng");
        eligibleBonusSessions.push({
          name: "Face Yoga Session",
          fullName: "Face Yoga Session at 11:30 AM",
          startMin: 690,
          sessionLink: link,
          thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"),
          code: "face_yoga",
        });
      }
    }

    // 2. Diet Session (Daily at 8:00 PM IST -> 1200 min)
    // Eligible: 12 months only
    if (is12Month) {
      const link = getApiBonusLink("paid_diet", paidLang === "English" ? "https://join.healthyday.co.in/diet_eng" : "https://join.healthyday.co.in/diet");
      eligibleBonusSessions.push({
        name: "Diet Session",
        fullName: "Diet Session at 8:00 PM",
        startMin: 1200,
        sessionLink: link,
        thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"),
        code: "paid_diet",
      });
    }

    // 3. Breath to Heal (Daily at 9:00 PM IST -> 1260 min)
    // Eligible: 6 & 12 months. Exclude English on Sundays.
    if ((is6Month || is12Month) && !(paidLang === "English" && currentDow === 0)) {
      const link = getApiBonusLink("b2h", paidLang === "English" ? "https://join.healthyday.co.in/b2hsession_eng" : "https://join.healthyday.co.in/b2hsession");
      eligibleBonusSessions.push({
        name: "Breath to Heal Session",
        fullName: "Breath to Heal Session at 9:00 PM",
        startMin: 1260,
        sessionLink: link,
        thumbnail: getDynamicThumbnail(link, "SyjnCjDtNS8"),
        code: "b2h",
      });
    }

    // Pick the session whose active window matches current time (startMin-30 to startMin+45)
    const activeBonusCard = eligibleBonusSessions.find(s => totalMin >= s.startMin - 30 && totalMin < s.startMin + 45) || null;
    // For upcoming session display (outside any active window), pick the next upcoming one
    const todayBonusCard = activeBonusCard || eligibleBonusSessions.find(s => totalMin < s.startMin - 30) || null;
    const isLive = [
      [285, 570], // Morning: 4:45 AM - 9:30 AM
      [945, 1170], // Evening: 3:45 PM - 7:30 PM
    ].some(([s, e]) => totalMin >= s && totalMin < e);

    // Plan renewal detection (7 days before plan ends)
    const planEndDateStr = studentData?.sub_end_date || studentData?.plan_end_date || studentData?.plan_expired_date;
    const planEndDate = planEndDateStr ? (() => {
      const parts = planEndDateStr.split('T')[0].split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
      return new Date(planEndDateStr);
    })() : null;
    const daysUntilPlanEnds = (() => {
      if (!planEndDate) return null;
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      planEndDate.setHours(0, 0, 0, 0);
      return Math.ceil((planEndDate.getTime() - todayDate.getTime()) / 86400000) + 1;
    })();
    const showPlanRenewal = daysUntilPlanEnds !== null && daysUntilPlanEnds <= 7 && daysUntilPlanEnds >= 1;

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
    // paid_attendance_tracker uses day abbreviations: "mon","tue","wed","thu","fri","sat","sun"
    const WEEK_DAY_ABBRS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const paidDayAbbrs = new Set<string>((studentData?.paid_attendance_tracker ?? []).map((d: string) => d.toLowerCase()));
    const todayIdx = todayDow === 0 ? 6 : todayDow - 1;
    const weekStatus = WEEK_DAY_LABELS.map((_, i) => {
      if (i > todayIdx) return "future";
      const d = new Date(mondayDate);
      d.setDate(mondayDate.getDate() + i);
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      // Paid users: check paid_attendance_tracker day abbreviations first
      if (paidDayAbbrs.size > 0 && paidDayAbbrs.has(WEEK_DAY_ABBRS[i])) return "green";
      // Fallback: check full date strings in attendance_tracker
      if (paidAttDates.has(ds)) return "green";
      return "yellow";
    });

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

    return (
      <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
        {/* Header */}
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        {/* Bonus Special Session (Paid) */}
        {activeBonusCard && (() => {
          const bonusIsLive = totalMin >= activeBonusCard.startMin && totalMin < activeBonusCard.startMin + 30;
          const bonusTimeLabel = activeBonusCard.fullName.replace(/^.*at\s+/, '');
          return (
            <div style={{ padding: "24px 20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>
                  {bonusIsLive ? `${activeBonusCard.name} - Live Now` : `Next Session - ${activeBonusCard.name}`}
                </h2>
                {bonusIsLive && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
                    <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>LIVE</span>
                  </div>
                )}
              </div>

              {/* Session card */}
              <div style={{ width: "100%" }}>
                <a href={activeBonusCard.sessionLink} target="_blank" rel="noopener noreferrer" onClick={() => trackSessionClick(mobile, activeBonusCard.code)} style={{ display: "block", textDecoration: "none", width: "100%", borderRadius: "12px 12px 0 0", overflow: "hidden", background: "#000", position: "relative" }}>
                  <img
                    src={activeBonusCard.thumbnail}
                    alt={activeBonusCard.name}
                    style={{ width: "100%", height: "auto", aspectRatio: "372/204", objectFit: "cover", opacity: 0.85, display: "block" }}
                  />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlayButton />
                  </div>
                </a>
                <div style={{
                  width: "100%", height: "67px",
                  borderRadius: "0 0 12px 12px",
                  border: "1.5px solid #E9E9E9", background: "#FFF",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box",
                }}>
                  {bonusIsLive ? (
                    <a href={activeBonusCard.sessionLink} target="_blank" rel="noopener noreferrer" onClick={() => trackSessionClick(mobile, activeBonusCard.code)} style={{
                      width: "300px", height: "40px", borderRadius: "10px", background: "#FEAB27",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(254,171,39,0.35)",
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN NOW</span>
                    </a>
                  ) : (
                    <span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }}>
                      Session Starts at {bonusTimeLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Your Yoga Session / No Sessions */}
        {!activeBonusCard && (() => {
          // When no regular session is live and bonus isn't in its active window, show NoSessionsCard.
          // The activeBonusCard block above already handles bonus sessions near their start time.
          const noSessionsNow = !isLive;
          return (
            <div style={{ padding: "24px 20px 0" }}>
              {noSessionsNow ? (
                /* No sessions right now */
                <NoSessionsCard totalMin={totalMin} />

              ) : (
                /* Regular session is LIVE — show yoga session */
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, margin: 0 }}>
                      Your Yoga Session
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", borderRadius: "60px", background: "#FFD3D3", padding: "4px 10px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E02F2F" }} />
                      <span style={{ color: "#E02F2F", fontFamily: "Outfit", fontSize: "13px", fontWeight: 700 }}>LIVE</span>
                    </div>
                  </div>

                  {/* Session Card — regular yoga */}
                  <div style={{ width: "100%" }}>
                    <a href={paidJoinLink} target="_blank" rel="noopener noreferrer" onClick={() => trackSessionClick(mobile, sessionCodeForNow)} style={{ display: "block", textDecoration: "none" }}>
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
                          onError={(e) => {
                            // Fallback to static image if YouTube thumbnail fails
                            (e.target as HTMLImageElement).src = `/language%20${studentData?.language === "English" ? "English" : "Telugu"}.jpg`;
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
                      <a href={paidJoinLink} target="_blank" rel="noopener noreferrer" onClick={() => trackSessionClick(mobile, sessionCodeForNow)} style={{
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
                </>
              )}
            </div>
          );
        })()}

        {/* View Class Recordings */}
        <div style={{ padding: "20px 21px 0 22px" }}>
          <div
            onClick={() => navigate(`/${mobile || ""}/recordings`)}
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

        {/* This Week's Grocery List — 12-month plan only */}
        {is12Month && (
          <div style={{ padding: "12px 21px 0 22px" }}>
            <div
              onClick={() => window.open("https://dailyyogawithjagan.com/grocery-list", "_blank")}
              style={{
                width: "100%",
                height: "87px",
                borderRadius: "6px",
                border: "1px solid #E7E6E6",
                background: "#EAFFE5",
                boxShadow: "0 1px 1px 0 rgba(0,0,0,0.20)",
                display: "flex",
                alignItems: "center",
                padding: "0 18px",
                gap: "12px",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "6px",
                  border: "0.25px solid #BCBCBC",
                  background: "#FFF",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imgIngredients}
                  alt="Ingredients"
                  style={{ width: "24px", height: "24px", aspectRatio: "1/1", objectFit: "contain" }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    color: "#0D468B",
                    fontFamily: "Outfit",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  This Week's Grocery List
                </span>
                <span
                  style={{
                    color: "#FEAB27",
                    fontFamily: "Outfit",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}
                >
                  Nutrition plan for the week
                </span>
              </div>

              {/* Chevron arrow (rotated SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
                style={{ transform: "rotate(0deg)", flexShrink: 0, display: "block" }}
              >
                <line x1="1.5" y1="-1.5" x2="11.0237" y2="-1.5" transform="matrix(0.718602 -0.695422 0.695421 0.718603 1.46484 17.4191)" stroke="#FEAB27" strokeWidth="3" strokeLinecap="round" />
                <line x1="1.5" y1="-1.5" x2="11.0237" y2="-1.5" transform="matrix(-0.718602 -0.695422 0.695421 -0.718603 10.4648 8.70927)" stroke="#FEAB27" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

        {/* Refer & Win card */}
        <div style={{ padding: "18px 22px 0" }}>
          <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={`/${mobile || ""}/referrals`} />
        </div>

        {/* Your Weekly Attendance */}
        <div style={{ padding: "40px 22px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, margin: 0 }}>Your Weekly Attendance</h3>
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


        {/* Refer & Win Card */}
        {/* {!showPlanRenewal && (
          <div style={{ padding: "28px 20px 40px", display: "flex", justifyContent: "center" }}>
            <ReferWinCard showTitle={true} shareLink={shareLink} referralsUrl={`/${mobile || ""}/referrals`} />
          </div>
        )} */}

        {/* Plan Renewal Section (shows 3 days before plan ends) */}
        {showPlanRenewal && (
          <>
            {/* Your Plan ends warning */}
            <div style={{ padding: "15px 20px", textAlign: "center" }}>
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
                margin: "0 auto 0",
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
                  referralsUrl={`/${mobile || ""}/referrals`}
                />
              </div>
            </div>
          </>
        )}


      </div>
    );
  }

  // --- Past Due / Subscription Expired Dashboard ---
  if (studentStatus === "pastdue" && !isForceOnboardingPreview) {
    // Format expired date
    const expiredSub = studentData?.subscriptions?.find((s: any) => s.subscription_status === "expired") || studentData?.subscriptions?.[studentData.subscriptions.length - 1];
    const expiredDateRaw = expiredSub?.subscription_end || studentData?.sub_end_date || studentData?.plan_end_date || studentData?.plan_expired_date;
    const formatExpiredDate = (dateStr: string) => {
      if (!dateStr) return "";
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
            margin: "28px 0 25px",
          }}>
            Renew Now to Continue!
          </p>
        </div>

        {/* Pricing Section */}
        <div style={{ marginTop: "-30px" }}>
          <PricingAndComparisonSection
            selectedPlanIdx={selectedPlanIdx}
            setSelectedPlanIdx={setSelectedPlanIdx}
            daysLeft={0}
            hideDaysLeft={true}
          />
        </div>
        <div style={{ height: "40px" }} />
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
  if (show14DayCompleted && !isForceOnboardingPreview) {
    const referralLink = "healthyday.app/ref=ggtujev58";
    const shareLink = mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : referralLink;

    const handleCopyLink = () => {
      navigator.clipboard.writeText(shareLink);
    };

    const handleWhatsAppShare = () => {
      const waMessage = `I am Inviting you to join me in\n*14-Days FREE YOGA* 🧘‍♀️😊\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith *JAGAN* 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students\n\n*Register for FREE Now* 👇🏻👇🏻\n${shareLink}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank");
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
        <header className="hd-header bg-background">
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
          <p style={{ width: "308px", color: "#000", textAlign: "center", fontFamily: "Outfit", fontSize: "27px", fontWeight: 800, lineHeight: "normal", margin: 0 }}>
            Your <span style={{ color: "#D70000" }}>14-Days FREE</span> Classes are completed
          </p>
          {/* Subtitle */}
          <p style={{ width: "293px", color: "#7C7B7B", textAlign: "center", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, lineHeight: "18px", margin: 0 }}>
            Join Healthyday Daily Yoga Classes with most affordable Subscription Plans
          </p>
        </div>

        <PricingAndComparisonSection
          selectedPlanIdx={selectedPlanIdx}
          setSelectedPlanIdx={setSelectedPlanIdx}
          daysLeft={0}
          hideDaysLeft={true}
          useOngoingPricing={true}
        />
        {/* Want More FREE Classes heading */}
        <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
          <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
          <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
        </div>
        {/* Refer & Earn */}
        <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
          <ReferWinCard showTitle={true} shareLink={referralLink} referralsUrl={`/${mobile || ""}/referrals`} />
        </div>
      </div>
    );
  }

  // --- Onboarding Section: status="registered", batch not yet active or join link not set ---
  if (!authenticated) return null;

  const userLanguage = studentData?.language || "Telugu";
  console.log("[DEBUG] onboarding render — studentData.language:", studentData?.language, "→ userLanguage:", userLanguage);
  const currentVideos = userLanguage === "English" ? englishVideos : teluguVideos;
  const viewAllLink = userLanguage === "English"
    ? "https://www.youtube.com/@HealthydayEnglish"
    : "https://www.youtube.com/@healthydayyoga";
  // Prefer the real assigned batch date; only fall back to "next Monday" when
  // the student has no batch assigned yet (e.g. brand-new registrant).
  const onboardingStartDate = studentData?.free_batch_start_date
    ? new Date(studentData.free_batch_start_date)
    : getNextMonday();

  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      {/* Hero Text */}
      <div style={{ paddingTop: "16px", textAlign: "center" }}>
        <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#0A386F" }}>
          14-DAYS ONLINE FREE YOGA
        </p>
        <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#FE961B" }}>
          STARTING <StartDateLabel date={onboardingStartDate} />
        </p>
      </div>

      {/* Onboarding Card */}
      <div className="flex flex-col items-center m-3">
        {/* Morning Sessions Row */}
        <div style={{ maxWidth: "342px", display: "flex", alignItems: "center", gap: "6px" }}>
          <SunIcon />
          <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "9px", fontWeight: 700, lineHeight: "normal" }}>
            MOR - 5:30AM | 6:30AM | 7:30AM | 8:30AM IST
          </span>
        </div>

        {/* Evening Sessions Row */}
        <div style={{ maxWidth: "342px", display: "flex", alignItems: "center", gap: "6px" }}>
          <MoonIcon />
          <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "9px", fontWeight: 700, lineHeight: "normal" }}>
            EVE - 4:30PM | 5:30PM | 6:30PM IST
          </span>
        </div>
      </div>

      {/* Introductory Session Card — one-off, July 5 2026, ahead of the July 6 batch start.
          ?forceDay=0 (see isForceOnboardingPreview) + ?time=<hh.mmam/pm> lets QA preview
          this card's live/hidden states without waiting for the real date/time. */}
      {(() => {
        const _timeParam = new URLSearchParams(location.search).get("time");
        const _totalMin = (() => {
          if (_timeParam) {
            const isPM = _timeParam.toLowerCase().endsWith("pm");
            const s = _timeParam.toLowerCase().replace("am", "").replace("pm", "");
            const [hStr, mStr] = s.split(".");
            let h = parseInt(hStr, 10);
            const m = parseInt(mStr ?? "0", 10);
            if (isPM && h !== 12) h += 12;
            if (!isPM && h === 12) h = 0;
            return h * 60 + m;
          }
          const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
          return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
        })();

        if (!isForceOnboardingPreview) {
          const _nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
          const _year = _nowIST.getUTCFullYear();
          const _month = _nowIST.getUTCMonth(); // 6 = July
          const _date = _nowIST.getUTCDate();
          // Only active July 5, 2026
          if (_year !== 2026 || _month !== 6 || _date !== 5) return null;
        }

        const liveStart = 630; // 10:30 AM IST
        const liveEnd = 720; // 12:00 PM IST

        // Before 10:30 AM or after 12:00 PM: hide entirely
        if (_totalMin < liveStart || _totalMin >= liveEnd) return null;

        const isTelugu = userLanguage !== "English";
        const videoId = isTelugu ? "M_9PsFKNshA" : "HI3myN11FKA";
        const link = `https://www.youtube.com/watch?v=${videoId}`;
        const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        return (
          <div style={{ padding: "18px 20px 0" }}>
            {/* Title + LIVE badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <p style={{ color: "#202020", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal", margin: 0 }}>
                Introductory Session
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
                <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>LIVE</span>
              </div>
            </div>

            <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "1px 0 4px rgba(0,0,0,0.25), -1px -1px 4px rgba(0,0,0,0.25)" }}>
              {/* Thumbnail */}
              <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: "block", position: "relative", width: "100%", aspectRatio: "342/187", textDecoration: "none" }}>
                <img src={thumbnail} alt="Introductory Session" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PlayButton />
                </div>
              </a>

              {/* CTA */}
              <div style={{ background: "#fff", border: "1.5px solid #E9E9E9", borderTop: "none", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "300px", height: "40px", borderRadius: "10px", background: "#FEAB27", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN SESSION NOW</span>
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Refer & Win card */}
      <div style={{ padding: "18px 20px 0" }}>
        <ReferWinCard showTitle={true} shareLink={mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : (studentData?.referral_link ?? "")} referralsUrl={`/${mobile || ""}/referrals`} />
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

      <div style={{ height: "48px" }} />

      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        mobile={mobile || ""}
        initialName={studentData?.name}
        daysAttended={freeDaysAttended}
      />
    </div>
  );
};

export default Index;
