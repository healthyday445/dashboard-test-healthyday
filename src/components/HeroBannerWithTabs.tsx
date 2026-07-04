import { useNavigate } from "react-router-dom";
import tabYoutubeLive from "@/assets/tab_youtube_live.webp";
import tabGuru from "@/assets/tab_guru.webp";
import tabActivePill from "@/assets/tab_active_pill.svg";
import journeyHeroBg from "@/assets/21daysprogram/journey_hero_bg.webp";

const MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const getOrdinalSuffix = (day: number) => (day >= 11 && day <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] ?? "th");

// Days 15-22 of the 21-day programme (the last week) get specific promotional
// copy instead of the generic countdown, keyed by daysLeft until batchEndDate.
const SPECIAL_DAY_MESSAGES: Record<number, string> = {
  7: "Only 7 Days Left!",
  6: "Only 431 Slots Left!",
  5: "Only 5 Days Left!",
  4: "Very Few Slots Left!",
  3: "Only 3 Days Left!",
  2: "Only 106 Slots Left!",
  1: "Last Day Tomorrow!",
  0: "Free Program Ends Today!",
};

interface HeroBannerWithTabsProps {
  // The free batch's last day — the daily/paid batch is assumed to start the day after.
  batchEndDate?: string | null;
  // Parent-computed override for previewing a specific batch day (?forceDay=N)
  // instead of the real calendar date — see Dashboard.tsx.
  daysLeftOverride?: number;
  activeTab: "dashboard" | "journey";
  onTabChange: (tab: "dashboard" | "journey") => void;
}

// Banner + tab row share one background (orange gradient for Live Sessions,
// blue/peach illustration for Your Yoga Journey) so the active tab can "pop"
// as a white pill that visually connects to its white content view below —
// the inactive tab has no box, it just sits on the shared background.
const HeroBannerWithTabs = ({ batchEndDate, daysLeftOverride, activeTab, onTabChange }: HeroBannerWithTabsProps) => {
  const navigate = useNavigate();
  if (!batchEndDate) return null;

  const batchEnd = new Date(batchEndDate);
  batchEnd.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const realDaysLeft = Math.max(0, Math.ceil((batchEnd.getTime() - today.getTime()) / 86400000));
  const daysLeft = daysLeftOverride ?? realDaysLeft;

  const nextBatchStart = new Date(batchEnd);
  nextBatchStart.setDate(nextBatchStart.getDate() + 1);
  const nextBatchStartDay = nextBatchStart.getDate();

  const backgroundStyle =
    activeTab === "journey"
      ? { backgroundImage: `url(${journeyHeroBg})`, backgroundSize: "cover", backgroundPosition: "center" }
      : { background: "linear-gradient(0deg, #FFFFFF 0%, #FFE2C0 25%, #FFE2C0 50%, #FF9416 100%)" };

  // Each tab's content box is sized and positioned to exactly match where
  // tab_active_pill sits (230px, flush left for dashboard / flush right for
  // journey), so the icon+label are centered relative to the pill itself.
  const tabStyle = (tab: "dashboard" | "journey") => ({
    position: "absolute" as const,
    bottom: 0,
    left: tab === "dashboard" ? 0 : ("auto" as const),
    right: tab === "journey" ? 0 : ("auto" as const),
    width: "230px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: "pointer",
  });

  const labelStyle = (tab: "dashboard" | "journey") => ({
    fontSize: "0.875rem",
    fontWeight: 700,
    fontFamily: "Outfit, sans-serif",
    color: activeTab === tab ? "#000000" : "#0a386f",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div style={backgroundStyle}>
      <div style={{ padding: "20px 20px 16px", textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: daysLeft === 0 ? "24px" : "28px",
            whiteSpace: daysLeft === 0 ? "nowrap" : "normal",
            color: "#002B5E",
            textShadow: "0px 2px 4px rgba(0,0,0,0.25)",
            textTransform: "uppercase",
          }}
        >
          {SPECIAL_DAY_MESSAGES[daysLeft] ?? `Only ${daysLeft} ${daysLeft === 1 ? "Day" : "Days"} Left!`}
        </p>
        <p
          style={{
            margin: "5px 0 12px",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            color: "#171717",
          }}
        >
          Daily Yoga Batch starts on{" "}
          <span style={{ fontWeight: 800, color: "#0D468B" }}>
            {nextBatchStartDay}{getOrdinalSuffix(nextBatchStartDay)} {MONTHS[nextBatchStart.getMonth()]}
          </span>
        </p>
        <button
          type="button"
          onClick={() => navigate("/pricing")}
          style={{
            background: "#0A386F",
            border: "none",
            borderRadius: "30px",
            padding: "8px 28px",
            color: "#FFF",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0px 4px 2px rgba(0,0,0,0.25)",
          }}
        >
          Join Daily Yoga Classes
        </button>
      </div>

      <div style={{ position: "relative", height: "3.25rem" }}>
        {/* Bottom inset shadow only on the side opposite the active pill — the
            pill itself already has its own drop shadow from tab_active_pill. */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: activeTab === "dashboard" ? "230px" : 0,
            right: activeTab === "journey" ? "230px" : 0,
            height: "100%",
            boxShadow: "0 -1px 0 0 rgba(0, 0, 0, 0.20) inset",
            pointerEvents: "none",
          }}
        />
        <img
          src={tabActivePill}
          alt=""
          style={{
            position: "absolute",
            bottom: -1,
            left: activeTab === "dashboard" ? 0 : "auto",
            right: activeTab === "journey" ? 0 : "auto",
            width: "230px",
            height: "51px",
            pointerEvents: "none",
          }}
        />
        <div onClick={() => onTabChange("dashboard")} style={tabStyle("dashboard")}>
          <img src={tabYoutubeLive} alt="" style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
          <span style={labelStyle("dashboard")}>Live sessions</span>
        </div>
        <div onClick={() => onTabChange("journey")} style={tabStyle("journey")}>
          <img src={tabGuru} alt="" style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
          <span style={labelStyle("journey")}>Your Yoga Journey</span>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerWithTabs;
