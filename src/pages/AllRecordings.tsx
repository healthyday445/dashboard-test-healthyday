import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

// classRecordings is now built dynamically inside the component based on student language & API data

const teluguVideos = [
  {
    id: "SyjnCjDtNS8",
    title: "15 Min Yoga for Beginners",
    subtitle: "Healthyday Yoga Telugu",
    duration: "17 mins",
    date: "OCT  25",
  },
  {
    id: "CgWC09sydHk",
    title: "15 Minutes Pranayama",
    subtitle: "Healthyday Yoga Telugu",
    duration: "15 mins",
    date: "JAN  26",
  },
  {
    id: "raCc7Z31LYw",
    title: "15 Minutes Meditation",
    subtitle: "Healthyday Yoga Telugu",
    duration: "14 mins",
    date: "NOV  25",
  },
  {
    id: "bl3W5tzK4ds",
    title: "Yoga Nidra - Deep Rest",
    subtitle: "Healthyday Yoga Telugu",
    duration: "20 mins",
    date: "DEC  25",
  },
];

const englishVideos = [
  {
    id: "SyjnCjDtNS8",
    title: "15 Min Yoga for Beginners",
    subtitle: "Healthyday Yoga English",
    duration: "17 mins",
    date: "OCT  25",
  },
  {
    id: "aC7Vi9qUExs",
    title: "15 Minutes Pranayama",
    subtitle: "Healthyday Yoga English",
    duration: "15 mins",
    date: "JAN  26",
  },
  {
    id: "u1Hom0s7ibU",
    title: "5-Minute Gratitude Meditation",
    subtitle: "Healthyday Yoga English",
    duration: "14 mins",
    date: "NOV  25",
  },
  {
    id: "n0iI0ZSVTWA",
    title: "Yoga Nidra - Deep Rest",
    subtitle: "Healthyday Yoga English",
    duration: "20 mins",
    date: "DEC  25",
  },
];

const PlayButton = () => (
  <div style={{
    width: "37.894px",
    height: "22.803px",
    aspectRatio: "37.89/22.80",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <img
      src="/image 12.png"
      alt="Play"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

const Thumbnail = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{
    width: "170px",
    minWidth: "170px",
    height: "93.45px",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
  }}>
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      borderRadius: "12px",
      background: "rgba(0, 0, 0, 0.32)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <PlayButton />
    </div>
  </div>
);

const DateBadge = ({ label }: { label: string }) => (
  <div style={{
    width: "fit-content",
    height: "25px",
    borderRadius: "20px",
    background: "#E7EEFA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 12px",
  }}>
    <span style={{
      color: "#0D468B",
      fontFamily: "Outfit",
      fontSize: "12px",
      fontWeight: 700,
      lineHeight: "normal",
    }}>
      {label}
    </span>
  </div>
);

const AllRecordings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mobile = searchParams.get("mobile") || sessionStorage.getItem("referrer_mobile") || "";
  const previewMode = searchParams.get("preview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    if (previewMode === "paid" || previewMode === "english") {
      setStudentData({
        language: previewMode === "english" ? "English" : "Telugu",
        status: "paid",
        paid_classes_joining_link: "https://www.youtube.com/c/Healthyday",
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
        const response = await fetch(`/.netlify/functions/student?mobile=${encodedMobile}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        setStudentData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mobile, previewMode]);

  if (loading) {
    return (
      <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
        <img src={logo} alt="Healthyday" className="h-10 mb-8" />
        <div className="flex flex-col items-center gap-4">
          <div style={{ width: "48px", height: "48px", border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <p style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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

  const isEnglish = studentData?.language === "English";
  const youtubeVideos = isEnglish ? englishVideos : teluguVideos;

  // --- Build Class Recordings dynamically based on language ---
  const yogaClassLink = studentData?.paid_classes_joining_link || studentData?.classes_joining_link || "https://www.youtube.com/c/Healthyday";
  const classRecordings: { title: string; subtitle: string; thumbnail: string; link: string }[] = [
    {
      title: "Yoga Class",
      subtitle: "Daily Live Yoga Session",
      thumbnail: isEnglish ? "/language English.jpg" : "/language Telugu.jpg",
      link: yogaClassLink,
    },
    {
      title: "Face Yoga Session",
      subtitle: "Sundays at 11:30 AM",
      thumbnail: isEnglish ? "/bonus/faceyoga_eng.jpg" : "/bonus/faceyoga_tel.jpg",
      link: isEnglish ? "https://join.healthyday.co.in/healthyface_eng" : "https://join.healthyday.co.in/healthyface",
    },
    {
      title: "Breath to Heal Session",
      subtitle: "Daily at 9:00 PM",
      thumbnail: isEnglish ? "/bonus/bw_eng.jpg" : "/bonus/breathwork.jpg",
      link: isEnglish ? "https://join.healthyday.co.in/b2hsession_eng" : "https://join.healthyday.co.in/b2hsession",
    },
  ];

  // Diet Session — Telugu 12-month plans only
  if (!isEnglish) {
    classRecordings.push({
      title: "Diet Session",
      subtitle: "Daily at 8:00 PM",
      thumbnail: "/bonus/weightlosssession.jpg",
      link: "https://join.healthyday.co.in/diet",
    });
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

      {/* Class Recordings Section */}
      <div style={{ padding: "24px 20px 0" }}>
        <h2 style={{
          color: "#202020",
          fontFamily: "Outfit",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "normal",
          margin: "0 0 16px",
        }}>
          Class Recordings
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {classRecordings.map((rec, i) => (
            <a
              key={i}
              href={rec.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "flex", gap: "12px", alignItems: "flex-start" }}
            >
              <Thumbnail src={rec.thumbnail} alt={rec.title} />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, paddingTop: "2px" }}>
                <span style={{
                  color: "#0D468B",
                  fontFamily: "Outfit",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}>
                  {rec.title}
                </span>
                <span style={{
                  color: "#7E7D7D",
                  fontFamily: "Outfit",
                  fontSize: "11px",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}>
                  {rec.subtitle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div style={{ padding: "28px 20px" }}>
        <div style={{
          width: "100%",
          maxWidth: "360px",
          height: "1.5px",
          background: "#A7A7A7",
        }} />
      </div>

      {/* Youtube Videos Section */}
      <div style={{ padding: "0 20px 40px" }}>
        <h2 style={{
          color: "#202020",
          fontFamily: "Outfit",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "normal",
          margin: "0 0 16px",
        }}>
          Youtube Videos
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {youtubeVideos.map((video, i) => (
            <a
              key={i}
              href={`https://youtu.be/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "flex", gap: "12px", alignItems: "flex-start" }}
            >
              <Thumbnail
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, paddingTop: "2px" }}>
                <span style={{
                  color: "#0D468B",
                  fontFamily: "Outfit",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}>
                  {video.title}
                </span>
                <span style={{
                  color: "#7E7D7D",
                  fontFamily: "Outfit",
                  fontSize: "11px",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}>
                  {video.subtitle}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <DateBadge label={video.date} />
                  <span style={{
                    color: "#7E7D7D",
                    fontFamily: "Outfit",
                    fontSize: "11px",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}>
                    • {video.duration}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecordings;
