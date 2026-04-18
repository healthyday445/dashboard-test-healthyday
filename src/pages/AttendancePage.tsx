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
          Your Progress
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
                    borderRadius: "9px",
                    background: "#FFB525",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  };
                  textStyle.color = "#FFF";
                } else if (status === "missed") {
                  circleStyle = {
                    width: "24px", height: "24px",
                    borderRadius: "9px",
                    border: "1px solid #FF0101",
                    background: "#FFF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxSizing: "border-box",
                  };
                  textStyle.color = "#FF0101";
                } else if (status === "scheduled") {
                  circleStyle = {
                    width: "24px", height: "24px",
                    borderRadius: "9px",
                    background: "#DCDCDC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  };
                  textStyle.color = "#7F7B75";
                } else {
                  // "none" — shouldn't hit for current month, fallback
                  circleStyle = {
                    width: "24px", height: "24px",
                    borderRadius: "9px",
                    background: "#DCDCDC",
                    display: "flex", alignItems: "center", justifyContent: "center",
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
                <circle cx="7" cy="7" r="7" fill="#FFB525" />
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
                <circle cx="7" cy="7" r="6.5" fill="#FDF3E9" stroke="#FFB525" />
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
                <circle cx="7" cy="7" r="6.5" fill="white" stroke="#FF0101" />
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

      {/* Session Timings */}
      <div style={{ padding: "0 20px" }}>
        <h3 style={{
          color: "#000",
          fontFamily: "Outfit",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "normal",
          margin: "0 0 16px",
        }}>
          Session Timings
        </h3>

        <div style={{
          width: "100%",
          maxWidth: "360px",
          borderRadius: "16px",
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0D468B",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.25)",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "flex-start",
          gap: "0",
        }}>
          {/* Morning Slots */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11.9173 2.74992C11.9173 2.99303 11.8207 3.22619 11.6488 3.3981C11.4769 3.57001 11.2438 3.66659 11.0007 3.66659C10.7575 3.66659 10.5244 3.57001 10.3525 3.3981C10.1806 3.22619 10.084 2.99303 10.084 2.74992C10.084 2.5068 10.1806 2.27365 10.3525 2.10174C10.5244 1.92983 10.7575 1.83325 11.0007 1.83325C11.2438 1.83325 11.4769 1.92983 11.6488 2.10174C11.8207 2.27365 11.9173 2.5068 11.9173 2.74992Z" fill="#FEAB27" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.0007 17.4166C11.8433 17.4166 12.6777 17.2506 13.4562 16.9281C14.2347 16.6057 14.9421 16.133 15.5379 15.5372C16.1338 14.9413 16.6064 14.234 16.9289 13.4555C17.2513 12.677 17.4173 11.8426 17.4173 10.9999C17.4173 10.1573 17.2513 9.32287 16.9289 8.54437C16.6064 7.76586 16.1338 7.05849 15.5379 6.46265C14.9421 5.86681 14.2347 5.39416 13.4562 5.07169C12.6777 4.74922 11.8433 4.58325 11.0007 4.58325C9.29884 4.58325 7.66674 5.25929 6.46338 6.46265C5.26002 7.66601 4.58398 9.29811 4.58398 10.9999C4.58398 12.7017 5.26002 14.3338 6.46338 15.5372C7.66674 16.7405 9.29884 17.4166 11.0007 17.4166Z" fill="#FEAB27" />
                <path d="M11.0007 20.1667C11.2438 20.1667 11.4769 20.0701 11.6488 19.8982C11.8207 19.7263 11.9173 19.4932 11.9173 19.2501C11.9173 19.0069 11.8207 18.7738 11.6488 18.6019C11.4769 18.43 11.2438 18.3334 11.0007 18.3334C10.7575 18.3334 10.5244 18.43 10.3525 18.6019C10.1806 18.7738 10.084 19.0069 10.084 19.2501C10.084 19.4932 10.1806 19.7263 10.3525 19.8982C10.5244 20.0701 10.7575 20.1667 11.0007 20.1667ZM19.2507 11.9167C19.0075 11.9167 18.7744 11.8201 18.6025 11.6482C18.4306 11.4763 18.334 11.2432 18.334 11.0001C18.334 10.7569 18.4306 10.5238 18.6025 10.3519C18.7744 10.18 19.0075 10.0834 19.2507 10.0834C19.4938 10.0834 19.7269 10.18 19.8988 10.3519C20.0707 10.5238 20.1673 10.7569 20.1673 11.0001C20.1673 11.2432 20.0707 11.4763 19.8988 11.6482C19.7269 11.8201 19.4938 11.9167 19.2507 11.9167ZM1.83398 11.0001C1.83398 11.2432 1.93056 11.4763 2.10247 11.6482C2.27438 11.8201 2.50754 11.9167 2.75065 11.9167C2.99377 11.9167 3.22692 11.8201 3.39883 11.6482C3.57074 11.4763 3.66732 11.2432 3.66732 11.0001C3.66732 10.7569 3.57074 10.5238 3.39883 10.3519C3.22692 10.18 2.99377 10.0834 2.75065 10.0834C2.50754 10.0834 2.27438 10.18 2.10247 10.3519C1.93056 10.5238 1.83398 10.7569 1.83398 11.0001ZM17.4824 5.81447C17.3978 5.90202 17.2967 5.97186 17.1849 6.0199C17.073 6.06794 16.9527 6.09323 16.831 6.09429C16.7093 6.09534 16.5886 6.07215 16.4759 6.02606C16.3633 5.97997 16.2609 5.9119 16.1749 5.82583C16.0888 5.73977 16.0207 5.63742 15.9746 5.52476C15.9286 5.41211 15.9054 5.2914 15.9064 5.16969C15.9075 5.04797 15.9328 4.92769 15.9808 4.81585C16.0289 4.70401 16.0987 4.60287 16.1862 4.51831C16.3591 4.35133 16.5907 4.25893 16.831 4.26102C17.0714 4.26311 17.3013 4.35951 17.4712 4.52947C17.6412 4.69943 17.7376 4.92934 17.7397 5.16969C17.7418 5.41003 17.6494 5.64159 17.4824 5.81447ZM4.51982 17.4818C4.60438 17.5694 4.70553 17.6392 4.81736 17.6872C4.9292 17.7353 5.04949 17.7606 5.1712 17.7616C5.29291 17.7627 5.41362 17.7395 5.52628 17.6934C5.63893 17.6473 5.74128 17.5792 5.82735 17.4932C5.91341 17.4071 5.98148 17.3048 6.02757 17.1921C6.07366 17.0794 6.09686 16.9587 6.0958 16.837C6.09474 16.7153 6.06945 16.595 6.02141 16.4832C5.97337 16.3713 5.90354 16.2702 5.81598 16.1856C5.64244 16.0227 5.41229 15.9336 5.17425 15.9373C4.9362 15.941 4.70893 16.0372 4.54053 16.2054C4.37213 16.3737 4.2758 16.6009 4.27193 16.839C4.26807 17.077 4.35697 17.3081 4.51982 17.4818ZM16.1872 17.4818C16.0996 17.3972 16.0298 17.2961 15.9817 17.1843C15.9337 17.0724 15.9084 16.9521 15.9073 16.8304C15.9063 16.7087 15.9295 16.588 15.9756 16.4753C16.0217 16.3627 16.0897 16.2603 16.1758 16.1743C16.2619 16.0882 16.3642 16.0201 16.4769 15.9741C16.5895 15.928 16.7102 15.9048 16.8319 15.9058C16.9536 15.9069 17.0739 15.9322 17.1858 15.9802C17.2976 16.0283 17.3988 16.0981 17.4833 16.1856C17.6503 16.3585 17.7427 16.5901 17.7406 16.8304C17.7385 17.0708 17.6421 17.3007 17.4722 17.4706C17.3022 17.6406 17.0723 17.737 16.8319 17.7391C16.5916 17.7412 16.36 17.6488 16.1872 17.4818ZM4.5189 4.51922C4.43135 4.60378 4.36152 4.70493 4.31348 4.81677C4.26543 4.92861 4.24015 5.04889 4.23909 5.1706C4.23803 5.29232 4.26122 5.41303 4.30731 5.52568C4.35341 5.63834 4.42147 5.74068 4.50754 5.82675C4.59361 5.91282 4.69596 5.98088 4.80861 6.02698C4.92127 6.07307 5.04197 6.09626 5.16369 6.0952C5.2854 6.09414 5.40568 6.06886 5.51752 6.02082C5.62936 5.97277 5.73051 5.90294 5.81507 5.81539C5.97804 5.64184 6.0671 5.4117 6.0634 5.17365C6.05971 4.93561 5.96354 4.70834 5.79526 4.53993C5.62698 4.37153 5.39977 4.2752 5.16173 4.27134C4.92369 4.26747 4.69256 4.35637 4.5189 4.51922Z" fill="#FEAB27" />
              </svg>
              <span style={{
                color: "#FEAB27",
                fontFamily: "Outfit",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "normal",
              }}>Morning Slots</span>
            </div>
            <div style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Outfit",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "normal",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}>
              <div>5:30 AM - 6:30 AM</div>
              <div>6:30 AM - 7:30 AM</div>
              <div>7:30 AM - 8:30 AM</div>
              <div>8:30 AM - 9:30 AM</div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div style={{
            width: "1px",
            height: "103px",
            background: "#FEAB27",
            alignSelf: "center",
            flexShrink: 0,
          }} />

          {/* Evening Slots */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.9667 11.3938C16.8483 15.2805 13.2275 18.003 9.16667 18.003C4.11583 18.003 0 13.8871 0 8.83632C0 4.77548 2.7225 1.15465 6.60917 0.0363153C6.985 -0.0736848 7.38833 0.0729818 7.6175 0.384648C7.8375 0.705482 7.8375 1.13632 7.60833 1.44798C6.82917 2.53882 6.41667 3.82215 6.41667 5.16965C6.41667 8.70798 9.295 11.5863 12.8333 11.5863C14.1808 11.5863 15.4642 11.1738 16.555 10.3946C16.8667 10.1655 17.2975 10.1655 17.6183 10.3855C17.93 10.6146 18.0767 11.018 17.9667 11.3938Z" fill="#FEAB27" />
                <path opacity="0.1" d="M16.9767 13.6122C15.3542 16.2797 12.3933 18.003 9.16667 18.003C4.11583 18.003 0 13.8872 0 8.83637C0 6.27887 1.08167 3.89554 2.86 2.19971C1.98 3.61137 1.485 5.26137 1.485 7.00304C1.485 12.0539 5.60083 16.1697 10.6517 16.1697C13.0533 16.1697 15.3083 15.2164 16.9767 13.6122Z" fill="#FEAB27" />
              </svg>
              <span style={{
                color: "#FEAB27",
                textAlign: "right",
                fontFamily: "Outfit",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "normal",
              }}>Evening Slots</span>
            </div>
            <div style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Outfit",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "normal",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}>
              <div>5:30 PM - 6:30 PM</div>
              <div>6:30 PM - 7:30 PM</div>
              <div>7:30 PM - 8:30 PM</div>
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
        <h3 style={{
          color: "#000",
          fontFamily: "Outfit",
          fontSize: "18px",
          fontWeight: 700,
          lineHeight: "normal",
          margin: 0,
        }}>Weekly Summary</h3>
        <p style={{
          width: "286px",
          color: "#ADADAD",
          textAlign: "center",
          fontFamily: "Outfit",
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "normal",
          margin: 0,
        }}>You are doing a wonderful job staying active!</p>
      </div>
    </div>
  );
};

export default AttendancePage;
