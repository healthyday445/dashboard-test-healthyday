import { trackSessionClick } from "@/lib/trackSessionClick";
import imgLanguageEnglish from "@/assets/language_English.webp";
import type { SnChallengeDay } from "@/data/snChallenge";

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
        <div className="h-[25px] w-[10px] rounded-sm bg-[#FE961B]" />
        <h2 className="m-0 font-['Outfit'] text-lg font-bold text-[#202020]">108 Surya Namaskar Challenge</h2>
      </div>

      <a
        href={day.youtubeLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex items-center gap-3 rounded-lg border-[0.5px] border-[#E9E9E9] bg-white p-3 no-underline shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.25)]"
      >
        <div className="relative h-[85px] w-[100px] flex-shrink-0 overflow-hidden rounded-[5px]">
          <img src={getThumbnail(day.youtubeLink)} alt="" className="h-full w-full object-cover" />
          <div className="absolute left-[6px] top-[6px] flex items-center gap-1 rounded-sm bg-[#F91B29] px-[6px] py-[2px]">
            <span className="h-[6px] w-[6px] rounded-full bg-white" />
            <span className="font-['Outfit'] text-[10px] font-bold text-white">LIVE</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div>
            <p className="m-0 font-['Outfit'] text-[16px] font-extrabold leading-[18px] text-[#0A386F]">108 Surya Namaskar</p>
            <p className="m-0 font-['Outfit'] text-[12px] font-medium leading-[18px] text-[#565252]">
              {day.snCount} Surya Namaskar - Day {day.dayNumber}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1 rounded-[5px] bg-[#FEAB27] px-4 py-[6px] font-['Outfit'] text-[13px] font-extrabold text-white">
            JOIN NOW
          </span>
        </div>
      </a>
    </div>
  );
};
