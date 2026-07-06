export type DayStatus = "green" | "yellow" | "future";

interface DayStatusBoxProps {
  status: DayStatus;
  dayLabel: string;
}

/** A single day cell in an attendance grid — green check (attended), orange X (missed), or a dimmed future circle. */
export const DayStatusBox: React.FC<DayStatusBoxProps> = ({ status, dayLabel }) => (
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
