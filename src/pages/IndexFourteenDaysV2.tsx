import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { trackVisit } from "@/lib/trackVisit";
import { isFreeBatchOver, getSimulatedBatchDate, getBonusWindowStart } from "@/lib/utils";
import logo from "@/assets/Primary_logo.svg";
import { PricingAndComparisonSection } from "@/components/PricingAndComparisonSection";
import ReferWinCard from "@/components/ReferWinCard";
import { FourteenDaySessionCard } from "@/components/FourteenDaySessionCard";
import { FourteenDayBonusSessionCard, getBonusInfo, BONUS_DAYS } from "@/components/FourteenDayBonusSessionCard";
import { FourteenDaysV2LevelCard } from "@/components/FourteenDaysV2LevelCard";
import { FourteenDaysV2JourneyCompletedPage } from "@/components/FourteenDaysV2JourneyCompletedPage";
import { FourteenDaysV2TabBar, type FourteenDaysV2Tab } from "@/components/FourteenDaysV2TabBar";
import completedJourneyHeroBg from "@/assets/21daysprogram/completed_journey_hero_bg.webp";
import IndexPaid from "@/pages/IndexPaid";
import { CertificateModal } from "@/components/CertificateModal";

import thumbFaceYogaTel from "@/assets/bonus/faceyoga_tel.jpg";
import thumbFaceYogaEng from "@/assets/bonus/faceyoga_eng.jpg";
import thumbWeightLossTel from "@/assets/bonus/weightlosssession.jpg";
import thumbWeightLossEng from "@/assets/bonus/weightlosssession_eng.jpg";
import thumbBreathWorkTel from "@/assets/bonus/breathwork.jpg";
import thumbBreathWorkEng from "@/assets/bonus/bw_eng.jpg";
import thumbMeditationTel from "@/assets/bonus/meditation_tel.jpg";
import thumbMeditationEng from "@/assets/bonus/meditation_eng.jpg";
import thumbSleepTel from "@/assets/bonus/sleepsession.jpg";
import thumbSleepEng from "@/assets/bonus/sleepsession_eng.jpg";

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
  { id: "TJXFF0LknNs", title: "15 Minutes Yoga for Beginners", duration: "18:51", subtitle: "Healthyday Yoga Telugu" },
  { id: "CgWC09sydHk", title: "15 Minutes Pranayama", duration: "18:04", subtitle: "Healthyday Yoga Telugu" },
  { id: "raCc7Z31LYw", title: "15 Minutes Meditation", duration: "18:23", subtitle: "Healthyday Yoga Telugu" },
  { id: "bl3W5tzK4ds", title: "Recharge your mind with Yoga Nidra", duration: "22:56", subtitle: "Healthyday Yoga Telugu" },
];

const englishVideos = [
  { id: "SyjnCjDtNS8", title: "15 Minutes Yoga for Beginners", duration: "18:51", subtitle: "Healthyday Yoga English" },
  { id: "aC7Vi9qUExs", title: "15 Minutes Pranayama", duration: "18:04", subtitle: "Healthyday Yoga English" },
  { id: "u1Hom0s7ibU", title: "5-Minute Gratitude Meditation", duration: "18:23", subtitle: "Healthyday Yoga English" },
  { id: "n0iI0ZSVTWA", title: "Recharge your mind with Yoga Nidra", duration: "22:56", subtitle: "Healthyday Yoga English" },
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
            <div
              style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: "12px", background: "rgba(0, 0, 0, 0.32)",
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
      <p style={{ color: "#1A1A1A", fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>{video.title}</p>
      <p style={{ color: "#888", fontSize: "12px", fontWeight: 400 }}>{video.subtitle}</p>
    </div>
  );
};

import { safeSessionStorage } from "@/lib/storage";

// ?preview_dashboard=<key> seeds mock studentData so each render state of the
// Live Sessions tab can be checked without real API data — mirrors the equivalent
// mechanism in IndexTwentyOneDay.tsx. Existing per-state fine-tuning params (forceDay,
// time) still work on top of whichever state is selected here. Combine with ?tab=journey
// to land directly on the 14day_completed state's Journey tab.
const previewToLocalDateStr = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const buildPreviewDashboardData = (key: string): any | null => {
  const today = new Date();
  switch (key) {
    case "coming_soon":
      return { status: "registered", language: "Hindi", name: "Preview User" };

    case "onboarding":
      return {
        status: "registered",
        language: "Telugu",
        name: "Preview User",
        free_batch_start_date: null,
        free_classes_joining_link: null,
        referral_link: "healthyday.app/ref=preview",
      };

    case "free_active": {
      // Anchored to a real new-format batch start date (not "today") so the
      // Level Card renders faithfully; use forceDay to pick a day.
      const batchStart = "2026-07-13";
      return {
        status: "14DaysOngoing",
        language: "Telugu",
        name: "Preview User",
        free_batch_start_date: batchStart,
        free_classes_joining_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        free_batches: [{ batch_start_date: batchStart, attendance_tracker: [] }],
        total_referral_count: 3,
      };
    }

    case "paid": {
      const subEnd = new Date(today);
      subEnd.setDate(subEnd.getDate() + 90);
      return {
        status: "paid",
        language: "Telugu",
        name: "Preview User",
        subscriptions: [{ subscription_status: "active", plan_type: "12_months", subscription_end: previewToLocalDateStr(subEnd) }],
        paid_classes_joining_link: "https://www.youtube.com/c/Healthyday",
        classes_joining_link: "https://www.youtube.com/c/Healthyday",
        attendance_tracker: [],
        paid_attendance_tracker: ["mon", "wed"],
        sub_end_date: previewToLocalDateStr(subEnd),
        total_referral_count: 5,
        referral_link: "healthyday.app/ref=preview",
      };
    }

    case "pastdue": {
      const subEnd = new Date(today);
      subEnd.setDate(subEnd.getDate() - 10);
      return {
        status: "pastdue",
        language: "Telugu",
        name: "Preview User",
        subscriptions: [{ subscription_status: "expired", subscription_end: previewToLocalDateStr(subEnd) }],
      };
    }

    case "14day_completed":
      return { status: "14DaysCompleted", language: "Telugu", name: "Preview User", total_referral_count: 4 };

    default:
      return null;
  }
};

interface IndexProps {
  initialStudentData?: any;
  onSwitchToJourney?: () => void;
}

/**
 * "Live sessions" tab content for 14-day batches from 2026-07-13 onward (every following
 * Monday). Everything except the active-batch dashboard is identical to IndexFourteenDays.tsx
 * (loading/error/coming-soon/paid/pastdue/onboarding have no new design for this cohort).
 * The active-batch dashboard renders without its own header/tab-bar — Dashboard.tsx supplies
 * both around this component while the student is actively in the batch. The 14-day-completed
 * state is reached through Dashboard.tsx's standalone fallback instead (status no longer
 * qualifies for the outer tabs), so it owns its own header + FourteenDaysV2TabBar here.
 */
const IndexFourteenDaysV2 = ({ initialStudentData, onSwitchToJourney }: IndexProps = {}) => {
  const navigate = useNavigate();
  const { mobile: pathMobile } = useParams<{ mobile: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const queryMobile = searchParams.get("mobile");
  const mobile = pathMobile || queryMobile || undefined;

  const previewDashboardKey = searchParams.get("preview_dashboard");
  const previewStudentData = previewDashboardKey ? buildPreviewDashboardData(previewDashboardKey) : null;
  const effectiveInitialData = previewStudentData ?? initialStudentData;

  useEffect(() => {
    if (!pathMobile && queryMobile) {
      const remaining = new URLSearchParams(location.search);
      remaining.delete("mobile");
      const qs = remaining.toString();
      navigate(`/${queryMobile}${qs ? `?${qs}` : ""}`, { replace: true });
    }
  }, [pathMobile, queryMobile, navigate, location.search]);

  useEffect(() => {
    if (mobile) {
      trackVisit(mobile);
    }
  }, [mobile]);

  useEffect(() => {
    fetch("/.netlify/functions/session-links")
      .then(r => r.json())
      .then(data => {
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
  const [loading, setLoading] = useState(!effectiveInitialData);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(effectiveInitialData ?? null);
  const [showComingSoon, setShowComingSoon] = useState(
    effectiveInitialData
      ? !(effectiveInitialData.language === "Telugu" || effectiveInitialData.language === "English")
      : false
  );
  const [authenticated, setAuthenticated] = useState(
    effectiveInitialData
      ? (effectiveInitialData.language === "Telugu" || effectiveInitialData.language === "English")
      : false
  );
  const [sessionLinks, setSessionLinks] = useState<any[]>([]);
  const [verifiedReferralCount, setVerifiedReferralCount] = useState<number | null>(null);
  // Completed-batch page tab — defaults to "live", or override via ?tab=journey for direct preview
  const [completedTab, setCompletedTab] = useState<FourteenDaysV2Tab>(
    searchParams.get("tab") === "journey" ? "journey" : "live"
  );

  useEffect(() => {
    if (effectiveInitialData) return;
    if (!mobile) {
      setLoading(false);
      setError("No mobile number provided. Please visit /<mobile_number> to login.");
      return;
    }

    const rawMobile = mobile || "";
    const cleanedMobile = rawMobile.replace(/[\s\-\(\)\+]/g, "");

    if (!/^\d{7,15}$/.test(cleanedMobile)) {
      setLoading(false);
      setError("Please enter a valid mobile number.");
      return;
    }

    if (rawMobile !== cleanedMobile) {
      navigate(`/${cleanedMobile}`, { replace: true });
      return;
    }

    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiMobile = `+${cleanedMobile}`;
        const encodedMobile = encodeURIComponent(apiMobile);
        const response = await fetch(`/.netlify/functions/student?mobile=${encodedMobile}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("This link is incorrect. Can you please recheck your WhatsApp reminder and open the correct link?");
          }
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setStudentData(data);

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

  // Verified referral count (from /referrals, distinct from studentData.total_referral_count)
  // — fetched independently of the effect above, since that one no-ops when a parent
  // (Dashboard.tsx) already supplied initialStudentData.
  useEffect(() => {
    if (!mobile) return;
    const cleanedMobile = mobile.replace(/[\s()+-]/g, "");
    if (!/^\d{7,15}$/.test(cleanedMobile)) return;
    const encodedMobile = encodeURIComponent(`+${cleanedMobile}`);
    fetch(`/.netlify/functions/referrals?mobile=${encodedMobile}&include_contest=false`)
      .then((r) => (r.ok ? r.json() : null))
      .then((refData) => setVerifiedReferralCount(refData?.verified_referrals ?? null))
      .catch(() => {});
  }, [mobile]);

  if (loading) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div style={{ width: "48px", height: "48px", border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading your dashboard...</p>
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

  if (showComingSoon) {
    return (
      <div className="hd-page bg-background flex items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "340px", borderRadius: "16px", background: "#fff", padding: "32px 24px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", fontFamily: "Outfit, sans-serif", animation: "popIn 0.3s ease-out" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>
              🌍
            </div>
            <h2 style={{ color: "#202020", fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>English is Coming Soon!</h2>
            <p style={{ color: "#888", fontSize: "14px", fontWeight: 400, lineHeight: "1.5", marginBottom: "24px" }}>
              We're currently available in <strong style={{ color: "#FEAB27" }}>Telugu</strong> only.
              English support is on the way — stay tuned!
            </p>
            <div style={{ width: "100%", height: "6px", borderRadius: "3px", background: "#F0F0F0", overflow: "hidden" }}>
              <div style={{ width: "60%", height: "100%", background: "linear-gradient(90deg, #FEAB27, #FF8C00)", borderRadius: "3px", animation: "progressPulse 1.5s ease-in-out infinite" }} />
            </div>
            <style>{`
              @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
              @keyframes progressPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  const getActiveBatchInfo = (batchDateStr: string | null | undefined, batchEndDateStr: string | null | undefined) => {
    if (!batchDateStr) return { isActive: false as const };
    const batchStart = new Date(batchDateStr);
    batchStart.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - batchStart.getTime()) / 86400000);
    if (diffDays < 0 || diffDays >= 14) return { isActive: false as const };
    if (isFreeBatchOver(batchEndDateStr)) return { isActive: false as const };
    const currentDay = diffDays + 1;
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
  const _globalTimeParam = new URLSearchParams(location.search).get("time");
  const isForceOnboardingPreview = _globalForceDayParam === "0";
  // Whether the batch is "over" right now — driven by the real clock, or by the
  // ?forceDay=/?time= QA preview overrides when present (simulates that day's date).
  const batchOverNow = _globalForceDayParam !== null && studentData?.free_batch_start_date
    ? isFreeBatchOver(studentData.free_batch_end_date, {
        today: getSimulatedBatchDate(studentData.free_batch_start_date, parseInt(_globalForceDayParam, 10)),
        timeOverride: _globalTimeParam,
      })
    : isFreeBatchOver(studentData?.free_batch_end_date);
  const batchInfo = (() => {
    const real = getActiveBatchInfo(studentData?.free_batch_start_date, studentData?.free_batch_end_date);
    if (_globalForceDayParam !== null && studentData?.free_batch_start_date) {
      const fd = parseInt(_globalForceDayParam, 10);
      const bs = new Date(studentData.free_batch_start_date);
      bs.setHours(0, 0, 0, 0);
      const be = new Date(bs);
      be.setDate(bs.getDate() + 13);
      const DN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const fmt = (d: Date) => `${DN[d.getDay()]}, ${MN[d.getMonth()]} ${d.getDate()}`;
      return { isActive: !batchOverNow, currentDay: fd, week: fd <= 7 ? 1 : 2, dateRangeLabel: `${fmt(bs)} — ${fmt(be)}` };
    }
    return real;
  })();
  const studentStatus = studentData?.status;
  const isOngoingStatus = studentStatus === "registered" || studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing";
  const isPaid = studentStatus === "paid";
  const sessionJoinLink = studentData?.free_classes_joining_link || studentData?.free_class_join_link;
  const hasBatchAccess = isOngoingStatus && batchInfo.isActive && !!sessionJoinLink;

  // --- Active Batch: "Live sessions" tab content (Week 1 or Week 2) ---
  // No own header/tab-bar here — Dashboard.tsx renders those around this component
  // while the student is actively in the batch (status stays eligible for the outer tabs).
  if (hasBatchAccess && !isForceOnboardingPreview) {
    const { currentDay, week } = batchInfo;

    const freeBatches: any[] = studentData?.free_batches ?? [];
    const activeBatches = freeBatches.filter((b) => b.batch_start_date === studentData?.free_batch_start_date);
    const batchesToCheck = activeBatches.length > 0 ? activeBatches : freeBatches;
    const attendedDates = new Set<string>(batchesToCheck.flatMap((b) => b.attendance_tracker ?? []));
    const batchOrigin = new Date(studentData?.free_batch_start_date!);
    batchOrigin.setHours(0, 0, 0, 0);

    // ?preview_attended=<0-14> overrides the real attendance count so the Level Card's
    // in-progress/unlocked states can be checked without seeding attendance_tracker dates.
    const previewAttendedParam = searchParams.get("preview_attended");
    const freeDaysAttended = previewAttendedParam !== null
      ? Math.min(Math.max(parseInt(previewAttendedParam, 10), 0), 14)
      : Math.min(attendedDates.size, 14);

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
    const isMorning = totalMinCalc < (15 * 60 + 30);
    const timeOfDayStr = isMorning ? "morning" : "evening";
    const freeLangKey = (studentData?.language || "Telugu").toLowerCase();
    const freeSessionCode = `14d_week${week}_${timeOfDayStr}`;

    const freeApiSessionEntry = sessionLinks.find(
      (s: any) => s.session_code === freeSessionCode && s.language === freeLangKey
    );
    const freeApiSessionLink = freeApiSessionEntry?.link || null;

    const sessionLink = freeApiSessionLink || sessionJoinLink || "https://www.youtube.com/c/Healthyday";
    const ytIdMatch = sessionLink.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    const sessionVideoId = ytIdMatch ? ytIdMatch[1] : null;

    const lang = studentData?.language === "English" ? "English" : "Telugu";
    const bonusInfo = BONUS_DAYS.includes(currentDay)
      ? getBonusInfo(currentDay, lang, {
          faceYogaTel: thumbFaceYogaTel,
          faceYogaEng: thumbFaceYogaEng,
          weightLossTel: thumbWeightLossTel,
          weightLossEng: thumbWeightLossEng,
          breathWorkTel: thumbBreathWorkTel,
          breathWorkEng: thumbBreathWorkEng,
          meditationTel: thumbMeditationTel,
          meditationEng: thumbMeditationEng,
          sleepTel: thumbSleepTel,
          sleepEng: thumbSleepEng,
        })
      : null;
    const showBonus = !!bonusInfo && totalMinCalc >= getBonusWindowStart(bonusInfo.startMin) && totalMinCalc < bonusInfo.startMin + (bonusInfo.activeEndOffset ?? 30);
    const bonusIsLive = !!bonusInfo && totalMinCalc >= bonusInfo.startMin - 30 && totalMinCalc < bonusInfo.startMin + (bonusInfo.liveDuration ?? 30);

    return (
      <div style={{ fontFamily: "Outfit, sans-serif" }}>
        {showBonus && bonusInfo ? (
          <FourteenDayBonusSessionCard bonusSession={bonusInfo} isLive={bonusIsLive} mobile={mobile} />
        ) : (
          <FourteenDaySessionCard
            currentDay={currentDay}
            batchOrigin={batchOrigin}
            sessionLink={sessionLink}
            sessionVideoId={sessionVideoId}
            language={studentData?.language}
            mobile={mobile}
            freeSessionCode={freeSessionCode}
            onJoin={() => {}}
          />
        )}

        <div style={{ padding: "18px 20px 0" }}>
          <FourteenDaysV2LevelCard
            freeDaysAttended={freeDaysAttended}
            studentName={studentData?.name}
            joinLink={sessionJoinLink || ""}
            language={studentData?.language}
            onViewMore={onSwitchToJourney}
            onCertificateClick={() => setShowCertificateModal(true)}
          />
        </div>

        {/* Plain share-link Refer & Win card — stands in for the "TOP 100 WINNERS / Get Yoga
            Kit" prize card shown in this spot in Figma, which is excluded for now. */}
        <div style={{ padding: "18px 20px 32px" }}>
          <ReferWinCard showTitle={true} shareLink={mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : (studentData?.referral_link ?? "")} referralsUrl={`/${mobile || ""}/referrals`} />
        </div>
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          initialName={studentData?.name}
          mobile={mobile || studentData?.mobile}
          daysAttended={14}
        />
      </div>
    );
  }

  // --- Paid Member Dashboard ---
  if (isPaid && !isForceOnboardingPreview) {
    return (
      <IndexPaid
        studentData={studentData}
        sessionLinks={sessionLinks}
        mobile={mobile}
        selectedPlanIdx={selectedPlanIdx}
        setSelectedPlanIdx={setSelectedPlanIdx}
        verifiedReferralCount={verifiedReferralCount  ?? 0}
      />
    );
  }

  // --- Past Due / Subscription Expired Dashboard ---
  if (studentStatus === "pastdue" && !isForceOnboardingPreview) {
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
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "fit-content", height: "30px", borderRadius: "40px", border: "0.25px solid #DA8D8D", background: "#FFEDED", padding: "0 14px", marginTop: "20px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.125 4.29167H6.13111M5.51389 6.125H6.125V8.56944H6.73611M0.625 6.125C0.625 6.84727 0.767262 7.56247 1.04366 8.22976C1.32006 8.89705 1.72519 9.50336 2.23591 10.0141C2.74663 10.5248 3.35295 10.9299 4.02024 11.2063C4.68753 11.4827 5.40273 11.625 6.125 11.625C6.84727 11.625 7.56247 11.4827 8.22976 11.2063C8.89705 10.9299 9.50336 10.5248 10.0141 10.0141C10.5248 9.50336 10.9299 8.89705 11.2063 8.22976C11.4827 7.56247 11.625 6.84727 11.625 6.125C11.625 4.66631 11.0455 3.26736 10.0141 2.23591C8.98264 1.20446 7.58369 0.625 6.125 0.625C4.66631 0.625 3.26736 1.20446 2.23591 2.23591C1.20446 3.26736 0.625 4.66631 0.625 6.125Z" stroke="#B71C1C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#B71C1C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 800, lineHeight: "22px", letterSpacing: "0.88px" }}>SUBSCRIPTION EXPIRED</span>
          </div>

          <div style={{ width: "100%", maxWidth: "357px", borderRadius: "10px", border: "1px solid #949494", background: "#FFF5E5", padding: "16px 20px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "16px", marginTop: "20px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none" style={{ flexShrink: 0 }}>
              <path d="M17.7497 11.9817V18.4451M17.7497 23.2927H17.7657M15.1311 3.2418L2.16043 25.1109C1.89304 25.5785 1.75154 26.1086 1.75001 26.6486C1.74848 27.1885 1.88697 27.7195 2.1517 28.1886C2.41643 28.6578 2.79818 29.0488 3.25898 29.3227C3.71978 29.5966 4.24356 29.7439 4.77823 29.75H30.7227C31.2571 29.7438 31.7806 29.5964 32.2412 29.3226C32.7018 29.0487 33.0834 28.658 33.3481 28.1891C33.6128 27.7202 33.7513 27.1895 33.75 26.6497C33.7487 26.11 33.6075 25.58 33.3405 25.1125L20.3699 3.24018C20.097 2.78532 19.7125 2.40921 19.2537 2.14818C18.7949 1.88714 18.2771 1.75 17.7505 1.75C17.2238 1.75 16.7061 1.88714 16.2472 2.14818C15.7884 2.40921 15.4039 2.78532 15.1311 3.24018V3.2418Z" stroke="#D70000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ maxWidth: "259px", display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "20px", fontWeight: 600, lineHeight: "normal" }}>Your Yoga Plan{" "}</span>
              <span style={{ color: "#D70000", fontFamily: "Outfit", fontSize: "20px", fontWeight: 600, lineHeight: "normal", display: "block" }}>Expired on {expiredDateLabel}</span>
            </div>
          </div>

          <p style={{ color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 700, lineHeight: "normal", margin: "28px 0 25px" }}>Renew Now to Continue!</p>
        </div>

        <div style={{ marginTop: "-30px" }}>
          <PricingAndComparisonSection selectedPlanIdx={selectedPlanIdx} setSelectedPlanIdx={setSelectedPlanIdx} daysLeft={0} hideDaysLeft={true} />
        </div>
        <div style={{ height: "40px" }} />
      </div>
    );
  }

  // --- Detect ongoing users whose 14-day batch has elapsed ---
  const batchElapsed = batchOverNow;
  const show14DayCompleted = (studentData?.status === "14 day completed" || studentData?.status === "14DaysCompleted") || (isOngoingStatus && batchElapsed);

  // --- 14 Days Completed — self-contained with its own header + tab switcher, since the
  // student's status no longer qualifies them for Dashboard.tsx's outer tab chrome. ---
  if (show14DayCompleted && !isForceOnboardingPreview) {
    const referralLink = "healthyday.app/ref=ggtujev58";
    const shareLink = mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : referralLink;

    return (
      <div className="hd-page bg-background" style={{ fontFamily: "Outfit, sans-serif" }}>
        <header className="hd-header bg-white">
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        <div style={{
          position: "relative",
          ...(completedTab === "journey" ? { backgroundImage: `url(${completedJourneyHeroBg})`, backgroundSize: "100% auto", backgroundPosition: "top center", backgroundRepeat: "no-repeat" } : {}),
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}>
            <FourteenDaysV2TabBar activeTab={completedTab} onChange={setCompletedTab} />
          </div>

          <div style={{ paddingTop: "68px" }}>
        {completedTab === "journey" ? (
          <FourteenDaysV2JourneyCompletedPage studentName={studentData?.name} language={studentData?.language} joinLink={sessionJoinLink || ""} />
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px 0", gap: "12px" }}>
              <div style={{ width: "129px", height: "30px", borderRadius: "40px", border: "0.25px solid #DA8D8D", background: "#FFEDED", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ width: "11px", height: "11px", aspectRatio: "1/1" }}>
                  <path d="M6 4.16667H6.00611M5.38889 6H6V8.44444H6.61111M0.5 6C0.5 6.72227 0.642262 7.43747 0.918663 8.10476C1.19506 8.77205 1.60019 9.37836 2.11091 9.88909C2.62163 10.3998 3.22795 10.8049 3.89524 11.0813C4.56253 11.3577 5.27773 11.5 6 11.5C6.72227 11.5 7.43747 11.3577 8.10476 11.0813C8.77205 10.8049 9.37836 10.3998 9.88909 9.88909C10.3998 9.37836 10.8049 8.77205 11.0813 8.10476C11.3577 7.43747 11.5 6.72227 11.5 6C11.5 4.54131 10.9205 3.14236 9.88909 2.11091C8.85764 1.07946 7.45869 0.5 6 0.5C4.54131 0.5 3.14236 1.07946 2.11091 2.11091C1.07946 3.14236 0.5 4.54131 0.5 6Z" stroke="#B71C1C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: "#B71C1C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 800, lineHeight: "22px", letterSpacing: "0.88px" }}>TRIAL ENDED</span>
              </div>
              <p style={{ width: "308px", color: "#000", textAlign: "center", fontFamily: "Outfit", fontSize: "27px", fontWeight: 800, lineHeight: "normal", margin: 0 }}>
                Your <span style={{ color: "#D70000" }}>14-Days FREE</span> Classes are completed
              </p>
              <p style={{ width: "293px", color: "#7C7B7B", textAlign: "center", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500, lineHeight: "18px", margin: 0 }}>
                Join Healthyday Daily Yoga Classes with most affordable Subscription Plans
              </p>
            </div>

            <PricingAndComparisonSection selectedPlanIdx={selectedPlanIdx} setSelectedPlanIdx={setSelectedPlanIdx} daysLeft={0} hideDaysLeft={true} useOngoingPricing={true} />
            <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
              <div style={{ width: "100%", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
              <p style={{ width: "100%", maxWidth: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
            </div>
            <div style={{ padding: "32px 20px 32px", display: "flex", justifyContent: "center" }}>
              <ReferWinCard showTitle={true} shareLink={referralLink} referralsUrl={`/${mobile || ""}/referrals`} />
            </div>
          </>
        )}
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
  const onboardingStartDate = studentData?.free_batch_start_date
    ? new Date(studentData.free_batch_start_date)
    : getNextMonday();

  // Own header here — Dashboard.tsx only wraps this component in its tab chrome once the
  // batch has actually started, so a "registered but not-yet-started" student always
  // reaches this branch standalone (no tabs), matching the original 14-day onboarding screen.
  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      <div style={{ paddingTop: "16px", textAlign: "center" }}>
        {studentStatus === "paidPendingStart" ? (
          <>
            <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#0A386F" }}>
              YOUR DAILY YOGA CLASSES
            </p>
            <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#FE961B" }}>
              Starts From Tomorrow
            </p>
          </>
        ) : (
          <>
            <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#0A386F" }}>14-DAYS ONLINE FREE YOGA</p>
            <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#FE961B" }}>
              STARTING <StartDateLabel date={onboardingStartDate} />
            </p>
          </>
        )}
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

      <div style={{ padding: "18px 20px 0" }}>
        <ReferWinCard showTitle={true} shareLink={mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : (studentData?.referral_link ?? "")} referralsUrl={`/${mobile || ""}/referrals`} />
      </div>

      <div className="px-5 mt-6">
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontStyle: "normal", fontWeight: 500, lineHeight: "25px" }}>Before your batch starts,</span>
          <br />
          <span style={{ color: "#000", fontFamily: "Outfit", fontSize: "20px", fontStyle: "normal", fontWeight: 700, lineHeight: "25px" }}>Try these 15 Minutes Yoga</span>
        </div>

        <div className="flex flex-col gap-5">
          {currentVideos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <a
            href={viewAllLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: "320px", height: "43px", borderRadius: "8px", background: "#FEAB27", boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none" }}
          >
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>View all videos</span>
            <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "25px", fontWeight: 500, lineHeight: "normal", width: "12px", height: "23px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{"→"}</span>
          </a>
        </div>
      </div>

      <div style={{ height: "48px" }} />
    </div>
  );
};

export default IndexFourteenDaysV2;
