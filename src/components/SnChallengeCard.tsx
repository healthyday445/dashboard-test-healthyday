import { trackSessionClick } from "@/lib/trackSessionClick";
import imgLanguageEnglish from "@/assets/language_English.webp";
import type { SnChallengeDay } from "@/data/snChallenge";
import { SnChallengeSessionTile } from "@/components/SnChallengeSessionTile";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function getThumbnail(link: string): string {
  const match = link.match(/(?:v=|youtu\.be\/|\/live\/|\/shorts\/|\/embed\/|\/c\/)([a-zA-Z0-9_-]{11})/);
  return match ? ytThumb(match[1]) : imgLanguageEnglish;
}

interface SnChallengeCardProps {
  day: SnChallengeDay;
  mobile?: string;
}

/** "108 Surya Namaskar Challenge" card — English/6-12-month-only, 2026-08-06..09. LIVE badge is
 *  shown for the whole campaign day (not time-windowed), per explicit product decision. */
export const SnChallengeCard: React.FC<SnChallengeCardProps> = ({ day, mobile }) => {
  const handleClick = () => trackSessionClick(mobile, `108sn_day${day.dayNumber}`);

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-[25px] w-[10px] flex-shrink-0 rounded-sm bg-[#FE961B]" />
        <h2 className="m-0 font-['Outfit'] font-bold text-[#202020]" style={{ fontSize: "clamp(14px, 4.2vw, 18px)" }}>
          108 Surya Namaskar Challenge
        </h2>
      </div>

      <SnChallengeSessionTile
        href={day.youtubeLink}
        onClick={handleClick}
        thumbnail={getThumbnail(day.youtubeLink)}
        isLive
        titleLines={["108 Surya Namaskar"]}
        subtitle={`${day.snCount} Surya Namaskar - Day ${day.dayNumber}`}
      />
    </div>
  );
};
