import { trackSessionClick } from "@/lib/trackSessionClick";
import img8ea326 from "@/assets/8ea326ab563adb61ccb99b953865cb3132c173ab.webp";
import { SnChallengeSessionTile } from "@/components/SnChallengeSessionTile";

interface SnChallengeRegularSessionCardProps {
  isLive: boolean;
  totalMin: number;
  sessionThumbnail: string;
  paidJoinLink: string;
  sessionCodeForNow: "daily_morning" | "daily_evening";
  mobile?: string;
}

// Same time bands as NoSessionsCard.tsx's (unexported) constants — re-derived locally rather
// than imported, since this component needs Figma's "Next Session at X" wording specifically,
// distinct from NoSessionsCard's "Next Live at X" (which stays as-is for the non-campaign page).
const MORNING_SESSION_END_MIN = 9 * 60 + 30; // 9:30 AM
const EVENING_SESSION_END_MIN = 19 * 60 + 30; // 7:30 PM

/** The "Regular Session" card during the SN Challenge window (node 1252:18862 live /
 *  1266:19338 "later today" / 1266:19585 "tomorrow") — a re-skinned, more compact stand-in for
 *  PaidLiveSessionCard, matching the SN card's visual style so the two sit together inside the
 *  campaign's tinted wrapper. PaidLiveSessionCard itself is untouched and keeps rendering on
 *  every non-campaign day. */
export const SnChallengeRegularSessionCard: React.FC<SnChallengeRegularSessionCardProps> = ({
  isLive,
  totalMin,
  sessionThumbnail,
  paidJoinLink,
  sessionCodeForNow,
  mobile,
}) => {
  const handleClick = () => trackSessionClick(mobile, sessionCodeForNow);

  const isTomorrow = totalMin >= EVENING_SESSION_END_MIN;
  const isMidDayGap = totalMin >= MORNING_SESSION_END_MIN && totalMin < EVENING_SESSION_END_MIN;
  let nextSessionLabel = "5:30 AM";
  if (isMidDayGap) {
    if (totalMin < 945) nextSessionLabel = "4:30 PM";
    else if (totalMin < 1050) nextSessionLabel = "4:30 PM";
    else if (totalMin < 1110) nextSessionLabel = "5:30 PM";
    else nextSessionLabel = "6:30 PM";
  }
  const sessionTimes = isMidDayGap ? ["4:30 PM", "5:30 PM", "6:30 PM"] : ["5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM"];

  return (
    <div className="px-5 pt-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-[25px] w-[10px] flex-shrink-0 rounded-sm bg-[#FE961B]" />
        <h2 className="m-0 font-['Outfit'] font-bold text-[#202020]" style={{ fontSize: "clamp(14px, 4.2vw, 18px)" }}>
          Regular Session
        </h2>
      </div>

      {isLive ? (
        <SnChallengeSessionTile
          href={paidJoinLink}
          onClick={handleClick}
          thumbnail={sessionThumbnail}
          isLive
          titleLines={["Regular Yoga", "Session"]}
        />
      ) : (
        <div className="flex min-h-[100px] flex-col gap-2 rounded-xl border-[1.5px] border-[#D2D2D2] bg-white p-3 shadow-[-1px_-1px_4px_0px_rgba(0,0,0,0.1),1px_1px_4px_0px_rgba(0,0,0,0.1)]">
          {/* Image + title/subtitle in one row div; timings sit in their own full-width div
              below, matching Figma (the image only spans the title/subtitle's height, and the
              times row is centered across the whole card, not squeezed into the text column). */}
          <div className="flex items-center gap-2">
            {/* Figma node 1266:19443/19594 ("image 8") crops this asset to 112.4%/113.53% at a
                -6.48%/-7.1% offset — matched here via background-position/size rather than a
                plain <img object-cover>, which would show the asset's full (uncropped) padding. */}
            <div
              className="flex-shrink-0 overflow-hidden"
              style={{
                width: "clamp(56px, 17vw, 68px)",
                aspectRatio: "76/75",
                background: `url(${img8ea326}) -6.48% -7.1% / 112.4% 113.53% no-repeat`,
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="m-0 font-['Outfit'] font-bold leading-[1.2] text-[#0A386F]" style={{ fontSize: "clamp(17px, 5vw, 20px)" }}>
                {isTomorrow ? "Next Session is Tomorrow" : `Next Session at ${nextSessionLabel}`}
              </p>
              <p className="m-0 font-['Outfit'] leading-[1.4] text-[#61738A]" style={{ fontSize: "clamp(13px, 4vw, 15px)" }}>
                Open the link during live timings
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "clamp(4px, 1.5vw, 6px)" }}>
            {sessionTimes.map((time, i) => (
              <span key={time} className="flex items-center" style={{ gap: "clamp(4px, 1.5vw, 6px)" }}>
                {i > 0 && <span className="font-['Outfit'] font-extrabold text-[#CCCBCB]" style={{ fontSize: "clamp(14px, 4vw, 17px)" }}>|</span>}
                <span className="whitespace-nowrap font-['Outfit'] font-extrabold text-[#FEAB27]" style={{ fontSize: "clamp(14px, 4vw, 17px)" }}>
                  {time}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
