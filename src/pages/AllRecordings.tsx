import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

const classRecordings = [
  {
    title: "Yoga Class",
    accessible: "Accessible till 26th March (5:00AM)",
    date: "MARCH 25",
    thumbnail: "https://img.youtube.com/vi/SyjnCjDtNS8/maxresdefault.jpg",
    link: "https://youtu.be/SyjnCjDtNS8",
  },
  {
    title: "Breathing Session",
    accessible: "Accessible till 26th March (8:00PM)",
    date: "MARCH 25",
    thumbnail: "https://img.youtube.com/vi/CgWC09sydHk/maxresdefault.jpg",
    link: "https://youtu.be/CgWC09sydHk",
  },
  {
    title: "Diet Session",
    accessible: "Accessible till 26th March (7:30PM)",
    date: "MARCH 25",
    thumbnail: "https://img.youtube.com/vi/raCc7Z31LYw/maxresdefault.jpg",
    link: "https://youtu.be/raCc7Z31LYw",
  },
  {
    title: "Face Yoga",
    accessible: "Accessible till 7th April",
    date: "MARCH 23",
    thumbnail: "https://img.youtube.com/vi/bl3W5tzK4ds/maxresdefault.jpg",
    link: "https://youtu.be/bl3W5tzK4ds",
  },
];

const youtubeVideos = [
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
    duration: "18 mins",
    date: "OCT  25",
  },
  {
    id: "raCc7Z31LYw",
    title: "15 Minutes Meditation",
    subtitle: "Healthyday Yoga Telugu",
    duration: "18 mins",
    date: "OCT  25",
  },
  {
    id: "bl3W5tzK4ds",
    title: "Yoga Nidra Session",
    subtitle: "Healthyday Yoga Telugu",
    duration: "22 mins",
    date: "OCT  25",
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
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

const RecordingCard = ({
  thumbnail,
  title,
  subtitle,
  dateBadge,
  link,
}: {
  thumbnail: string;
  title: string;
  subtitle: string;
  dateBadge: string;
  link: string;
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none", width: "calc(50% - 6px)" }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {/* Thumbnail */}
      <div style={{
        width: "100%",
        height: "93.45px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}>
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "12px",
          background: "rgba(0, 0, 0, 0.32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <PlayButton />
        </div>
      </div>

      {/* Title */}
      <span style={{
        color: "#0D468B",
        fontFamily: "Outfit",
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: "normal",
      }}>
        {title}
      </span>

      {/* Subtitle */}
      <span style={{
        color: "#7E7D7D",
        fontFamily: "Outfit",
        fontSize: "11px",
        fontWeight: 500,
        lineHeight: "normal",
      }}>
        {subtitle}
      </span>

      {/* Date Badge */}
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
          {dateBadge}
        </span>
      </div>
    </div>
  </a>
);

const AllRecordings = () => {
  const navigate = useNavigate();

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

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          {classRecordings.map((rec, i) => (
            <RecordingCard
              key={i}
              thumbnail={rec.thumbnail}
              title={rec.title}
              subtitle={rec.accessible}
              dateBadge={rec.date}
              link={rec.link}
            />
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

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          {youtubeVideos.map((video, i) => (
            <a
              key={i}
              href={`https://youtu.be/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", width: "calc(50% - 6px)" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Thumbnail */}
                <div style={{
                  width: "100%",
                  height: "93.45px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "12px",
                    background: "rgba(0, 0, 0, 0.32)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <PlayButton />
                  </div>
                </div>

                {/* Title */}
                <span style={{
                  color: "#0D468B",
                  fontFamily: "Outfit",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}>
                  {video.title}
                </span>

                {/* Subtitle + Duration */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    color: "#7E7D7D",
                    fontFamily: "Outfit",
                    fontSize: "11px",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}>
                    {video.subtitle}
                  </span>
                  <span style={{
                    color: "#7E7D7D",
                    fontFamily: "Outfit",
                    fontSize: "11px",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}>
                    {video.duration}
                  </span>
                </div>

                {/* Date Badge */}
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
                    {video.date}
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
