import { DayStatusBox, type DayStatus } from "@/components/DayStatusBox";
import { WEEK_DAY_LABELS } from "@/lib/weeklyAttendance";

interface WeeklyAttendanceCardProps {
  weekLabel: string;
  weekStatus: DayStatus[];
  viewProgressUrl: string;
}

/** "Your Weekly Attendance" heading + Mon-Sun attendance grid, used on the paid dashboard. */
export const WeeklyAttendanceCard: React.FC<WeeklyAttendanceCardProps> = ({ weekLabel, weekStatus, viewProgressUrl }) => (
  <>
    <div style={{ padding: "24px 22px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 600, margin: 0 }}>Your Weekly Attendance</h3>
        <a href={viewProgressUrl} style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, color: "#FEAB27", textDecoration: "none" }}>View More</a>
      </div>
    </div>

    <div style={{ padding: "0 20px" }}>
      <div style={{ width: "100%", borderRadius: "15px", border: "1px solid #FFC76F", padding: "15px 10px 16px 11px", background: "#FFE5BA", boxSizing: "border-box" }}>
        <p style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, margin: "0 0 14px 1px" }}>
          {weekLabel}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "2px" }}>
          {WEEK_DAY_LABELS.map((label, i) => (
            <DayStatusBox key={i} status={weekStatus[i]} dayLabel={label} />
          ))}
        </div>
      </div>
    </div>
  </>
);
