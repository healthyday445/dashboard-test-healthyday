import { DayStatusBox, type DayStatus } from "@/components/DayStatusBox";

export type { DayStatus };

interface AttendanceGridProps {
  dayStatus: DayStatus[];
  dateRangeLabel: string;
}

/** "Your 14 Days Attendance" card — 2 rows of 7 day boxes inside an orange-tinted panel. */
export const AttendanceGrid: React.FC<AttendanceGridProps> = ({ dayStatus, dateRangeLabel }) => (
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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
        {dayStatus.slice(0, 7).map((status, i) => (
          <DayStatusBox key={i} status={status} dayLabel={`Day ${i + 1}`} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {dayStatus.slice(7, 14).map((status, i) => (
          <DayStatusBox key={i} status={status} dayLabel={`Day ${i + 8}`} />
        ))}
      </div>
    </div>
  </div>
);
