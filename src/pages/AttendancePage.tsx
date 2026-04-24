import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

const WEEK_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// --- Paid Attendance localStorage helpers ---
const DAY_ABBR_TO_DOW: Record<string, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

function fmt(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Returns Monday of the week containing `date` */
function getWeekMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay(); // 0=Sun
  d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
  return d;
}

/**
 * Given paid_attendance_tracker day abbreviations (e.g. ["thu","fri","sat"]),
 * converts them to actual date strings for the current week (only past/today dates),
 * merges with existing localStorage history, saves, and returns the merged set.
 */
function mergePaidAttendanceToStorage(mobile: string, rawDays: string[]): Set<string> {
  const key = `hd_paid_att_${mobile}`;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monday = getWeekMonday(today);

  // Convert current week's day abbreviations → actual dates (only <= today)
  const thisWeekDates: string[] = [];
  rawDays.forEach((abbr) => {
    const dow = DAY_ABBR_TO_DOW[abbr.toLowerCase()];
    if (dow === undefined) return;
    const daysFromMon = dow === 0 ? 6 : dow - 1;
    const d = new Date(monday);
    d.setDate(monday.getDate() + daysFromMon);
    if (d <= today) thisWeekDates.push(fmt(d));
  });

  // Load existing stored dates
  let stored: string[] = [];
  try {
    const raw = localStorage.getItem(key);
    if (raw) stored = JSON.parse(raw);
  } catch { /* ignore */ }

  // Merge and deduplicate
  const merged = Array.from(new Set([...stored, ...thisWeekDates]));

  // Save back
  try { localStorage.setItem(key, JSON.stringify(merged)); } catch { /* ignore */ }

  return new Set(merged);
}

/** Reads accumulated paid attendance from localStorage (without modifying it). */
function readPaidAttendanceFromStorage(mobile: string): Set<string> {
  try {
    const raw = localStorage.getItem(`hd_paid_att_${mobile}`);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set();
}

const AttendancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mobile = searchParams.get("mobile") || sessionStorage.getItem("referrer_mobile") || "";
  const previewMode = searchParams.get("preview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  // Calendar navigation state
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (previewMode === "paid") {
      // Preview: simulate Thu/Fri/Sat class schedule with some history
      const paidDays = ["thu", "fri", "sat"];
      const previewMobile = "preview";
      const mergedDates = mergePaidAttendanceToStorage(previewMobile, paidDays);
      setStudentData({
        language: "Telugu",
        status: "paid",
        total_referral_count: 3,
        attendance_tracker: Array.from(mergedDates),
        paid_attendance_tracker: paidDays,
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
        const encodedMobile = encodeURIComponent(`+91${mobile}`);
        const response = await fetch(
          `/.netlify/functions/student?mobile=${encodedMobile}`
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();

        if (data.status !== "paid") {
          navigate(`/${mobile}`);
          return;
        }

        // --- Paid user: accumulate attendance in localStorage ---
        // API gives current week's attended days as abbreviations in paid_attendance_tracker.
        // We convert those to actual dates and merge with stored history so the full
        // month calendar can show past weeks' attendance without re-fetching.
        const rawPaidDays: string[] = data.paid_attendance_tracker ?? [];
        if (rawPaidDays.length > 0) {
          const mergedDates = mergePaidAttendanceToStorage(mobile, rawPaidDays);
          // Inject merged dates back into data so the calendar uses full history
          data.attendance_tracker = Array.from(mergedDates);
        } else {
          // No paid_attendance_tracker from API — read whatever was stored before
          const stored = readPaidAttendanceFromStorage(mobile);
          if (stored.size > 0) {
            data.attendance_tracker = Array.from(stored);
          }
        }

        setStudentData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mobile, previewMode, navigate]);

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
              width: "48px", height: "48px",
              border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27",
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading...</p>
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
        <div style={{ background: "#FFF3F3", border: "1px solid #FFD4D4", borderRadius: "12px", padding: "24px", textAlign: "center", maxWidth: "340px" }}>
          <p style={{ color: "#D32F2F", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Oops!</p>
          <p style={{ color: "#666", fontSize: "14px", fontWeight: 400 }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!studentData) return null;

  // --- Calendar logic ---
  // For paid users: attendance_tracker was already merged with localStorage above.
  const attendedDates = new Set<string>(studentData?.attendance_tracker ?? []);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // paid_attendance_tracker: e.g. ["thu", "fri", "sat"] — the weekdays that have sessions
  const rawPaidDays: string[] = studentData?.paid_attendance_tracker ?? [];
  const scheduledWeekdays: Set<number> | null =
    studentData?.status === "paid" && rawPaidDays.length > 0
      ? new Set(rawPaidDays.map((d: string) => DAY_ABBR_TO_DOW[d.toLowerCase()]).filter((n: number | undefined): n is number => n !== undefined))
      : null;

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const startDow = firstDayOfMonth.getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Build calendar grid (6 rows x 7 cols max)
  type CellInfo = {
    day: number;
    isCurrentMonth: boolean;
    dateStr: string;
    dateObj: Date;
  };

  const cells: CellInfo[] = [];

  // Previous month filler days
  for (let i = startDow - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    const dateObj = new Date(y, m, day);
    cells.push({
      day,
      isCurrentMonth: false,
      dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      dateObj,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(viewYear, viewMonth, d);
    cells.push({
      day: d,
      isCurrentMonth: true,
      dateStr: `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      dateObj,
    });
  }

  // Next month filler days to complete grid
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateObj = new Date(y, m, d);
      cells.push({
        day: d,
        isCurrentMonth: false,
        dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        dateObj,
      });
    }
  }

  // Determine cell status
  const getCellStatus = (cell: CellInfo): "attended" | "missed" | "scheduled" | "none" => {
    if (!cell.isCurrentMonth) return "none";
    const cellDate = new Date(cell.dateObj);
    cellDate.setHours(0, 0, 0, 0);

    // Paid users: only class weekdays get a status indicator
    if (scheduledWeekdays !== null && !scheduledWeekdays.has(cellDate.getDay())) return "none";

    if (cellDate > today) return "scheduled"; // future class day
    if (attendedDates.has(cell.dateStr)) return "attended";
    if (cellDate < today) return "missed";   // past class day, not attended
    // Today
    return "scheduled"; // today's class, not yet marked attended
  };

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Split cells into rows of 7
  const rows: CellInfo[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
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

      {/* Title */}
      <div style={{ padding: "28px 20px 0", textAlign: "center" }}>
        <h2 style={{
          color: "#0D468B",
          textAlign: "center",
          fontFamily: "Outfit",
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "normal",
          margin: 0,
        }}>
          Your Consistency Tracker
        </h2>
      </div>

      {/* Calendar Card */}
      <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: "348px",
          borderRadius: "28px",
          background: "#FFF",
          boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.25)",
          padding: "24px 16px 20px",
          boxSizing: "border-box",
        }}>
          {/* Month Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            padding: "0 4px",
          }}>
            <span style={{
              color: "#202020",
              fontFamily: "Outfit",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "normal",
            }}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Prev arrow */}
              <button
                onClick={goToPrevMonth}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ opacity: 0.5 }}>
                  <line x1="8.1516" y1="1.76753" x2="1.76755" y2="7.94564" stroke="#FEAB27" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="1.76842" y1="7.88777" x2="8.15247" y2="14.0659" stroke="#FEAB27" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
              {/* Next arrow */}
              <button
                onClick={goToNextMonth}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <line x1="1.25163" y1="14.0658" x2="7.63568" y2="7.88765" stroke="#FEAB27" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="7.63481" y1="7.94552" x2="1.25076" y2="1.76741" stroke="#FEAB27" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Top Separator */}
          <div style={{
            width: "308px",
            height: "0.5px",
            background: "#BEBEBE",
            margin: "0 auto",
          }} />

          {/* Day-of-week headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px", marginTop: "8px" }}>
            {WEEK_HEADERS.map((h) => (
              <div key={h} style={{
                display: "flex",
                width: "100%",
                height: "34px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#000",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "10px",
                fontWeight: 500,
                lineHeight: "12px",
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {row.map((cell, colIdx) => {
                const status = getCellStatus(cell);

                // Non-current-month days: faded gray text, no indicator
                if (!cell.isCurrentMonth) {
                  return (
                    <div key={colIdx} style={{
                      display: "flex",
                      width: "100%",
                      height: "34px",
                      padding: "11px 0",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxSizing: "border-box",
                    }}>
                      <span style={{
                        color: "#B7B7B7",
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "12px",
                      }}>
                        {cell.day}
                      </span>
                    </div>
                  );
                }

                // Current month days with status circles
                let circleStyle: React.CSSProperties = {};
                let textStyle: React.CSSProperties = {
                  textAlign: "center" as const,
                  fontFamily: "Outfit",
                  fontSize: "12px",
                  fontWeight: 700,
                  lineHeight: "12px",
                };

                if (status === "attended") {
                  circleStyle = {
                    width: "24px", height: "24px",
                    minWidth: "24px", minHeight: "24px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    background: "#FFB525",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxSizing: "border-box",
                  };
                  textStyle.color = "#FFF";
                } else if (status === "missed") {
                  circleStyle = {
                    width: "24px", height: "24px",
                    minWidth: "24px", minHeight: "24px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    border: "1px solid #FF0101",
                    background: "#FFF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxSizing: "border-box",
                  };
                  textStyle.color = "#FF0101";
                } else if (status === "scheduled") {
                  circleStyle = {
                    width: "24px", height: "24px",
                    minWidth: "24px", minHeight: "24px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    background: "#DCDCDC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxSizing: "border-box",
                  };
                  textStyle.color = "#7F7B75";
                } else {
                  // "none" — shouldn't hit for current month, fallback
                  circleStyle = {
                    width: "24px", height: "24px",
                    minWidth: "24px", minHeight: "24px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    background: "#DCDCDC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxSizing: "border-box",
                  };
                  textStyle.color = "#7F7B75";
                }

                return (
                  <div key={colIdx} style={{
                    display: "flex",
                    width: "100%",
                    height: "34px",
                    padding: "11px 0",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxSizing: "border-box",
                  }}>
                    <div style={circleStyle}>
                      <span style={textStyle}>{cell.day}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Separator */}
          <div style={{
            width: "100%",
            maxWidth: "308px",
            height: "0.5px",
            background: "#BEBEBE",
            margin: "16px auto 14px",
          }} />

          {/* Legend */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}>
            {/* Attended */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect width="14" height="14" rx="4" fill="#FFB525" />
              </svg>
              <span style={{
                color: "#595959",
                textAlign: "center",
                fontFamily: "Outfit",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "12px",
              }}>Attended</span>
            </div>
            {/* Scheduled */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect width="14" height="14" rx="4" fill="#DCDCDC" />
              </svg>
              <span style={{
                color: "#595959",
                fontFamily: "Outfit",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "12px",
              }}>Scheduled</span>
            </div>
            {/* Missed */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="0.5" y="0.5" width="13" height="13" rx="4" fill="white" stroke="#FF0101" />
              </svg>
              <span style={{
                color: "#595959",
                fontFamily: "Outfit",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "12px",
              }}>Missed</span>
            </div>
          </div>
        </div>
      </div>



      {/* Weekly Summary */}
      <div style={{
        padding: "32px 20px 40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#FFF5E5" />
          <path d="M39.5294 52.1211V67.1165C39.5294 67.6137 39.3311 68.0904 38.9781 68.442C38.6251 68.7935 38.1463 68.991 37.6471 68.991H33.8824C33.3831 68.991 32.9043 68.7935 32.5513 68.442C32.1983 68.0904 32 67.6137 32 67.1165V53.9955C32 53.4984 32.1983 53.0216 32.5513 52.6701C32.9043 52.3185 33.3831 52.1211 33.8824 52.1211H39.5294C41.5263 52.1211 43.4415 51.3311 44.8535 49.925C46.2655 48.5189 47.0588 46.6118 47.0588 44.6233V42.7489C47.0588 41.7546 47.4555 40.8011 48.1615 40.098C48.8675 39.395 49.8251 39 50.8235 39C51.822 39 52.7796 39.395 53.4856 40.098C54.1916 40.8011 54.5882 41.7546 54.5882 42.7489V52.1211H60.2353C61.2338 52.1211 62.1913 52.516 62.8973 53.2191C63.6034 53.9221 64 54.8757 64 55.8699L62.1176 65.2421C61.8469 66.392 61.3334 67.3794 60.6544 68.0556C59.9754 68.7317 59.1677 69.06 58.3529 68.991H45.1765C43.6788 68.991 42.2424 68.3985 41.1834 67.3439C40.1244 66.2894 39.5294 64.8591 39.5294 63.3677" fill="#FEAB27" />
          <path d="M39.5294 52.1211V67.1165C39.5294 67.6137 39.3311 68.0904 38.9781 68.442C38.6251 68.7935 38.1463 68.991 37.6471 68.991H33.8824C33.3831 68.991 32.9043 68.7935 32.5513 68.442C32.1983 68.0904 32 67.6137 32 67.1165V53.9955C32 53.4984 32.1983 53.0216 32.5513 52.6701C32.9043 52.3185 33.3831 52.1211 33.8824 52.1211H39.5294ZM39.5294 52.1211C41.5263 52.1211 43.4415 51.3311 44.8535 49.925C46.2655 48.5189 47.0588 46.6118 47.0588 44.6233V42.7489C47.0588 41.7546 47.4555 40.8011 48.1615 40.098C48.8675 39.395 49.8251 39 50.8235 39C51.822 39 52.7796 39.395 53.4856 40.098C54.1916 40.8011 54.5882 41.7546 54.5882 42.7489V52.1211H60.2353C61.2338 52.1211 62.1913 52.516 62.8973 53.2191C63.6034 53.9221 64 54.8757 64 55.8699L62.1176 65.2421C61.8469 66.392 61.3334 67.3794 60.6544 68.0556C59.9754 68.7317 59.1677 69.06 58.3529 68.991H45.1765C43.6788 68.991 42.2424 68.3985 41.1834 67.3439C40.1244 66.2894 39.5294 64.8591 39.5294 63.3677" stroke="#FFF5E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M71.7647 42C72.3263 42 72.865 42.2107 73.2621 42.5858C73.6592 42.9609 73.8824 43.4696 73.8824 44C73.8824 43.4696 74.1055 42.9609 74.5026 42.5858C74.8997 42.2107 75.4384 42 76 42C75.4384 42 74.8997 41.7893 74.5026 41.4142C74.1055 41.0391 73.8824 40.5304 73.8824 40C73.8824 40.5304 73.6592 41.0391 73.2621 41.4142C72.865 41.7893 72.3263 42 71.7647 42ZM71.7647 30C72.3263 30 72.865 30.2107 73.2621 30.5858C73.6592 30.9609 73.8824 31.4696 73.8824 32C73.8824 31.4696 74.1055 30.9609 74.5026 30.5858C74.8997 30.2107 75.4384 30 76 30C75.4384 30 74.8997 29.7893 74.5026 29.4142C74.1055 29.0391 73.8824 28.5304 73.8824 28C73.8824 28.5304 73.6592 29.0391 73.2621 29.4142C72.865 29.7893 72.3263 30 71.7647 30ZM64.3529 42C64.3529 40.4087 65.0223 38.8826 66.2137 37.7574C67.4051 36.6321 69.021 36 70.7059 36C69.021 36 67.4051 35.3679 66.2137 34.2426C65.0223 33.1174 64.3529 31.5913 64.3529 30C64.3529 31.5913 63.6836 33.1174 62.4922 34.2426C61.3008 35.3679 59.6849 36 58 36C59.6849 36 61.3008 36.6321 62.4922 37.7574C63.6836 38.8826 64.3529 40.4087 64.3529 42Z" fill="#FEAB27" />
        </svg>

        <p style={{
          width: "286px",
          color: "#ADADAD",
          textAlign: "center",
          fontFamily: "Outfit",
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "normal",
          margin: 0,
        }}>Your consistency is the only key to your results!</p>
      </div>
    </div>
  );
};

export default AttendancePage;
