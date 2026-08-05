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

// 5:30 AM - 9:30 AM IST — the SN session's real live window, per product decision (supersedes
// the earlier "LIVE all day" simplification).
const SN_LIVE_START_MIN = 5 * 60 + 30;
const SN_LIVE_END_MIN = 9 * 60 + 30;

interface SnChallengeCardProps {
  day: SnChallengeDay;
  totalMin: number;
  mobile?: string;
}

/** "108 Surya Namaskar Challenge" card — English/6-12-month-only, 2026-08-06..09. Live 5:30-9:30
 *  AM IST (LIVE badge + tapping opens the YouTube link); outside that window it links to
 *  /:mobile/recordings instead, where the session should show up once recorded. */
export const SnChallengeCard: React.FC<SnChallengeCardProps> = ({ day, totalMin, mobile }) => {
  const navigate = useNavigate();
  const isLive = totalMin >= SN_LIVE_START_MIN && totalMin < SN_LIVE_END_MIN;
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
      />
    </div>
  );
};
