import logo from "@/assets/Primary_logo.svg";

export const LoadingScreen = () => (
  <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
    <img src={logo} alt="Healthyday" className="h-10 mb-8" />
    <div style={{
      width: "48px", height: "48px",
      border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27",
      borderRadius: "50%", animation: "spin 0.8s linear infinite",
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);
