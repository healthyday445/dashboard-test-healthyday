interface PaidActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  background: string;
  titleColor?: string;
  onClick: () => void;
}

/** A tappable icon+title+subtitle row used for dashboard shortcuts (recordings, grocery list, etc). */
export const PaidActionCard: React.FC<PaidActionCardProps> = ({ icon, title, subtitle, background, titleColor = "#0D468B", onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: "100%", borderRadius: "6px", border: "1px solid #F0EEEE", background,
      boxShadow: "0 1px 1px 0 rgba(0,0,0,0.20)",
      display: "flex", alignItems: "center", padding: "20px 23px 19px 27px", gap: "16px", boxSizing: "border-box", cursor: "pointer",
    }}
  >
    <div style={{ flexShrink: 0 }}>{icon}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
      <span style={{ color: titleColor, fontFamily: "Outfit", fontSize: "16px", fontWeight: 700 }}>{title}</span>
      <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600 }}>{subtitle}</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 1L8 9L1 17" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);
