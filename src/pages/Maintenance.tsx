import logo from "@/assets/Primary_logo.svg";
import maintenanceGif from "@/assets/maintainence/maintainence.gif";

const Maintenance = () => {
  return (
    <div className="hd-page bg-white" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 68px)",
          padding: "40px 24px 60px",
          textAlign: "center",
        }}
      >
        {/* Hero GIF */}
        <img
          src={maintenanceGif}
          alt=""
          aria-hidden="true"
          style={{ width: 180, height: 180, objectFit: "contain", marginBottom: 0 }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            marginBottom: 16,
          }}
        >
          <span
            className="hd-eyebrow-dot"
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#FEAB27",
              flexShrink: 0,
              animation: "hd-blink 2s step-start infinite",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "Outfit",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.9px",
              textTransform: "uppercase",
              color: "#0D468B",
            }}
          >
            Scheduled Maintenance
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "Outfit",
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1.22,
            letterSpacing: "-0.4px",
            color: "#0D468B",
            marginBottom: 13,
          }}
        >
          Take a breath.<br />
          We'll be right back.
        </h1>

        {/* Body */}
        <p
          style={{
            fontFamily: "Outfit",
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.65,
            color: "#888",
            maxWidth: 290,
            marginBottom: 36,
          }}
        >
          We're making a few improvements to your dashboard. Everything will be ready in just a moment — thanks for your patience.
        </p>
      </main>
    </div>
  );
};

export default Maintenance;
