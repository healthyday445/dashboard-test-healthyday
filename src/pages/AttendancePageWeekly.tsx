import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/Primary_logo.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { safeSessionStorage } from "@/lib/storage";
import { getWeeklyAttendance, WEEK_DAY_LABELS } from "@/lib/weeklyAttendance";

interface DayUpdate {
  day: string;
  attended: boolean;
}

/**
 * PATCH /.netlify/functions/update-attendance -> backend PATCH /api/internal/student/attendance
 * Body: { mobile: "+<mobile>", week_start: "YYYY-MM-DD", updates: [{ day, attended }] }
 * Success (200): { status: "success", paid_attendance_tracker: string[] } — the corrected
 *   week's attended-day abbreviations, used to resync the checkboxes with the server.
 * Failure (403/404/409/500): { detail: string }.
 */
async function submitAttendanceUpdate(
  mobile: string,
  weekStart: string,
  updates: DayUpdate[]
): Promise<{ paid_attendance_tracker: string[] }> {
  const payload = { mobile: `+${mobile}`, week_start: weekStart, updates };
  console.log("[submitAttendanceUpdate] payload", payload);

  const response = await fetch("/.netlify/functions/update-attendance", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || `Failed to update attendance (${response.status})`);
  }

  return data;
}

/** Weekly attendance tracker as editable checkboxes, reached from the "Update Attendance" button on the paid dashboard. */
const AttendancePageWeekly = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile: urlMobile } = useParams<{ mobile: string }>();
  const searchParams = new URLSearchParams(location.search);
  const mobile = urlMobile || searchParams.get("mobile") || safeSessionStorage.getItem("referrer_mobile") || "";
  const previewMode = searchParams.get("preview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  const [weekLabel, setWeekLabel] = useState("");
  const [checkedDays, setCheckedDays] = useState<boolean[]>([]);
  const [originalDays, setOriginalDays] = useState<boolean[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (previewMode === "paid") {
      setStudentData({
        language: "Telugu",
        status: "paid",
        paid_attendance_tracker: ["mon", "wed"],
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
        const apiMobile = `+${mobile}`;
        const response = await fetch(`/.netlify/functions/student?mobile=${encodeURIComponent(apiMobile)}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();

        if (data.status !== "paid") {
          navigate(`/${mobile}`);
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
  }, [mobile, previewMode, navigate]);

  useEffect(() => {
    if (!studentData) return;
    const { weekLabel: label, weekStatus } = getWeeklyAttendance(studentData);
    const initial = weekStatus.map((status) => status === "green");
    setWeekLabel(label);
    setCheckedDays(initial);
    setOriginalDays(initial);
  }, [studentData]);

  const todayIdx = (() => {
    const dow = new Date().getDay();
    return dow === 0 ? 6 : dow - 1; // Mon=0 ... Sun=6
  })();

  const isDirty = checkedDays.some((checked, i) => checked !== originalDays[i]);

  const toggleDay = (i: number) => {
    if (i > todayIdx || submitting) return;
    setCheckedDays((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const handleUpdate = async () => {
    if (!isDirty || submitting) return;
    setSubmitting(true);
    try {
      const updates: DayUpdate[] = WEEK_DAY_LABELS
        .map((label, i) => ({ day: label.toLowerCase(), attended: checkedDays[i] }))
        .filter((_, i) => checkedDays[i] !== originalDays[i]);

      const today = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - todayIdx);
      const weekStart = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;

      const result = await submitAttendanceUpdate(mobile, weekStart, updates);

      setStudentData((prev) => ({ ...prev, paid_attendance_tracker: result.paid_attendance_tracker }));
      toast.success("Attendance updated successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update attendance. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // --- Error Screen ---
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

  const showSkeleton = loading || !studentData;

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

      {/* Weekly Tracker Card */}
      <div style={{ padding: "35px 20px 0", display: "flex", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: "373px",
          borderRadius: "15px",
          background: "#FFF",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.2)",
          padding: "20px 16px",
          boxSizing: "border-box",
        }}>
          {showSkeleton ? (
            <Skeleton style={{ width: "150px", height: "14px", borderRadius: "4px", marginBottom: "16px" }} />
          ) : (
            <p style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, margin: "0 0 16px 1px" }}>
              {weekLabel}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "4px", opacity: submitting ? 0.6 : 1 }}>
            {WEEK_DAY_LABELS.map((label, i) => {
              if (showSkeleton) {
                return (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <Skeleton style={{ width: "37px", height: "37px", borderRadius: "5px" }} />
                    <Skeleton style={{ width: "24px", height: "10px", borderRadius: "3px" }} />
                  </div>
                );
              }

              const checked = checkedDays[i] ?? false;
              // Future days are always non-interactive and grey. Mid-submit, every box is
              // briefly non-interactive too, but must keep its current checked/unchecked look —
              // reusing one flag for both meant a just-unchecked day flashed into the grey
              // "not happened yet" style for the duration of the request.
              const isFuture = i > todayIdx;
              const interactionDisabled = isFuture || submitting;
              return (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    aria-label={`${label} attendance`}
                    disabled={interactionDisabled}
                    onClick={() => toggleDay(i)}
                    style={{
                      width: "37px", height: "37px",
                      borderRadius: "5px",
                      border: checked ? "none" : isFuture ? "1px solid #C8C8C8" : "1px solid #FEAB27",
                      background: checked ? "#0D9400" : isFuture ? "#EFEFEF" : "#FFF",
                      cursor: interactionDisabled ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    {checked && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 8.90237L7.77251 11.8047L14.3175 6" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span style={{ color: "#868585", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div style={{ padding: "24px 20px 40px", display: "flex", justifyContent: "center" }}>
        {showSkeleton ? (
          <Skeleton style={{ width: "100%", maxWidth: "337px", height: "50px", borderRadius: "25px" }} />
        ) : (
          <button
            onClick={handleUpdate}
            disabled={!isDirty || submitting}
            style={{
              width: "100%",
              maxWidth: "337px",
              height: "50px",
              background: "#FEAB27",
              border: "none",
              borderRadius: "25px",
              boxShadow: "0px 4px 2px rgba(0, 0, 0, 0.25)",
              color: "#FFF",
              fontFamily: "Outfit",
              fontSize: "15px",
              fontWeight: 700,
              textTransform: "capitalize",
              cursor: !isDirty || submitting ? "not-allowed" : "pointer",
              opacity: !isDirty || submitting ? 0.5 : 1,
            }}
          >
            {submitting ? "Updating..." : "Update Attendance"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AttendancePageWeekly;
