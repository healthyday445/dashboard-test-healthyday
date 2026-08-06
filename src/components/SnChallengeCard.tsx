import { useNavigate } from "react-router-dom";
import { trackSessionClick } from "@/lib/trackSessionClick";
import imgLanguageEnglish from "@/assets/language_English.webp";
import type { SnChallengeDay } from "@/data/snChallenge";
import { SnChallengeSessionTile } from "@/components/SnChallengeSessionTile";
import { SnAccentBar } from "@/components/SnAccentBar";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function getThumbnail(link: string): string {
  const match = link.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/|\/c\/)([a-zA-Z0-9_-]{11})/);
  return match ? ytThumb(match[1]) : imgLanguageEnglish;
}

interface SnChallengeCardProps {
  day: SnChallengeDay;
  /** Whether the SN session is in its 4:30-9:29 AM live window — computed once in IndexPaid.tsx
   *  (via isSnLive from @/data/snChallenge) and passed down, rather than re-derived from
   *  totalMin here, since IndexPaid also needs this exact boolean to decide section order. */
  isLive: boolean;
  mobile?: string;
  /** Figma node 1312:3228/1312:4138 ("View Recording") — whenever the SN card is shown below an
   *  old, unmodified session/bonus card (i.e. some other session is live and it's not the SN
   *  window), the not-live button reads "View Recording" with no icon instead of "JOIN NOW".
   *  Has no effect while isLive is true. */
  showRecordingCta?: boolean;
}

/** "108 Surya Namaskar Challenge" card — English/6-12-month-only, 2026-08-06..09. Live 4:30-9:29
 *  AM IST (LIVE badge + tapping opens the YouTube link); outside that window it links to
 *  /:mobile/recordings instead, where the session should show up once recorded. */
export const SnChallengeCard: React.FC<SnChallengeCardProps> = ({ day, isLive, mobile, showRecordingCta = false }) => {
  const navigate = useNavigate();
  const recordingsPath = `/${mobile || ""}/recordings`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackSessionClick(mobile, `108sn_day${day.dayNumber}`);
    if (!isLive) {
      e.preventDefault();
      navigate(recordingsPath);
    }
  };

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center gap-2 mb-3">
        <SnAccentBar />
        <h2 className="m-0 font-['Outfit'] font-bold text-[#202020]" style={{ fontSize: "clamp(14px, 4.2vw, 18px)" }}>
          108 Surya Namaskar Challenge
        </h2>
      </div>

      <SnChallengeSessionTile
        href={isLive ? day.youtubeLink : recordingsPath}
        onClick={handleClick}
        external={isLive}
        thumbnail={getThumbnail(day.youtubeLink)}
        isLive={isLive}
        titleLines={["108 Surya Namaskar"]}
        subtitle={`${day.snCount} Surya Namaskar - Day ${day.dayNumber}`}
        ctaLabel={!isLive && showRecordingCta ? "View Recording" : "JOIN NOW"}
        showCtaIcon={isLive || !showRecordingCta}
      />
    </div>
  );
};
