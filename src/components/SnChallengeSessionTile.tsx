/** Compact thumbnail-left/text-right session tile shared by SnChallengeCard and
 *  SnChallengeRegularSessionCard's live state — same Figma layout in both places
 *  (node 1252:18756's "Youtube video" block and node 1252:18862's, byte-identical).
 *  Sizes use clamp() (matching NoSessionsCard.tsx's existing responsive convention on this
 *  page) since the fixed px sizes overflowed/wrapped badly below ~360px viewport width. */
interface SnChallengeSessionTileProps {
  href: string;
  onClick?: () => void;
  thumbnail: string;
  isLive: boolean;
  titleLines: string[];
  subtitle?: string;
}

export const SnChallengeSessionTile: React.FC<SnChallengeSessionTileProps> = ({
  href,
  onClick,
  thumbnail,
  isLive,
  titleLines,
  subtitle,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className="flex items-center gap-3 rounded-lg border-[0.5px] border-[#E9E9E9] bg-white p-3 no-underline shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25),0px_2px_4px_0px_rgba(0,0,0,0.25)]"
  >
    {/* Figma's thumbnail (node 1252:18867/1237:18458) is 163x85 inside a 357px-wide card —
        a ~46% width:card ratio and a wide 163/85 aspect ratio, not the near-square placeholder
        this used before. Expressed as a %-of-row width so it scales with the tile itself. */}
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-[5px]"
      style={{ width: "46%", aspectRatio: "163/85" }}
    >
      <img src={thumbnail} alt="" className="h-full w-full object-cover" />
      {isLive && (
        <div className="absolute left-[6px] top-[6px] flex items-center gap-1 rounded-sm bg-[#F91B29] px-[6px] py-[2px]">
          <span className="h-[6px] w-[6px] rounded-full bg-white" />
          <span className="font-['Outfit'] text-[10px] font-bold text-white">LIVE</span>
        </div>
      )}
    </div>

    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div>
        {titleLines.map((line, i) => (
          <p
            key={i}
            className="m-0 font-['Outfit'] font-extrabold leading-[18px] text-[#0A386F]"
            style={{ fontSize: "clamp(13px, 3.8vw, 16px)" }}
          >
            {line}
          </p>
        ))}
        {subtitle && (
          <p className="m-0 font-['Outfit'] font-medium leading-[18px] text-[#565252]" style={{ fontSize: "clamp(11px, 3vw, 12px)" }}>
            {subtitle}
          </p>
        )}
      </div>
      <span
        className="inline-flex w-fit items-center gap-[6px] whitespace-nowrap rounded-[5px] bg-[#FEAB27] py-[6px] font-['Outfit'] font-extrabold text-white"
        style={{ fontSize: "clamp(11px, 3.2vw, 13px)", padding: "6px clamp(10px, 3vw, 16px)" }}
      >
        {/* Same play-in-a-loop icon PaidBonusSessionCard.tsx/PaidLiveSessionCard.tsx already use
            for their JOIN buttons (Figma's own "tabler-icon-brand-parsinta" asset renders
            identically) — reused instead of pulling in a duplicate SVG asset. */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" style={{ width: "clamp(11px, 3vw, 13px)", height: "clamp(11px, 3vw, 13px)", flexShrink: 0 }}>
          <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        JOIN NOW
      </span>
    </div>
  </a>
);
