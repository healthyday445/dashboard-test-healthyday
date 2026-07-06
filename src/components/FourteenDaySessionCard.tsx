import { useLocation } from "react-router-dom";
import { trackSessionClick } from "@/lib/trackSessionClick";
import NoSessionsCard from "@/components/NoSessionsCard";

const StartDateLabel = ({ date }: { date: Date }) => {
  const MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const getOrdinalSuffix = (day: number) => (day >= 11 && day <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] ?? "th");
  return <>{date.getDate()}<sup>{getOrdinalSuffix(date.getDate())}</sup> {MONTHS[date.getMonth()]}</>;
};

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.8346 2.50017C10.8346 2.72119 10.7468 2.93315 10.5906 3.08943C10.4343 3.24571 10.2223 3.33351 10.0013 3.33351C9.78029 3.33351 9.56833 3.24571 9.41205 3.08943C9.25577 2.93315 9.16797 2.72119 9.16797 2.50017C9.16797 2.27916 9.25577 2.0672 9.41205 1.91092C9.56833 1.75464 9.78029 1.66684 10.0013 1.66684C10.2223 1.66684 10.4343 1.75464 10.5906 1.91092C10.7468 2.0672 10.8346 2.27916 10.8346 2.50017Z" fill="#FEAB27" />
    <path fillRule="evenodd" clipRule="evenodd" d="M10.0013 15.8335C10.7673 15.8335 11.5259 15.6826 12.2336 15.3895C12.9414 15.0963 13.5844 14.6666 14.1261 14.125C14.6678 13.5833 15.0974 12.9402 15.3906 12.2325C15.6838 11.5248 15.8346 10.7662 15.8346 10.0002C15.8346 9.23413 15.6838 8.47559 15.3906 7.76785C15.0974 7.06012 14.6678 6.41706 14.1261 5.87538C13.5844 5.33371 12.9414 4.90403 12.2336 4.61088C11.5259 4.31772 10.7673 4.16684 10.0013 4.16684C8.45421 4.16684 6.97047 4.78142 5.87651 5.87538C4.78255 6.96935 4.16797 8.45308 4.16797 10.0002C4.16797 11.5473 4.78255 13.031 5.87651 14.125C6.97047 15.2189 8.45421 15.8335 10.0013 15.8335Z" fill="#FEAB27" />
    <path d="M10.0013 18.3331C10.2223 18.3331 10.4343 18.2453 10.5906 18.089C10.7468 17.9327 10.8346 17.7208 10.8346 17.4997C10.8346 17.2787 10.7468 17.0668 10.5906 16.9105C10.4343 16.7542 10.2223 16.6664 10.0013 16.6664C9.78029 16.6664 9.56833 16.7542 9.41205 16.9105C9.25577 17.0668 9.16797 17.2787 9.16797 17.4997C9.16797 17.7208 9.25577 17.9327 9.41205 18.089C9.56833 18.2453 9.78029 18.3331 10.0013 18.3331ZM17.5013 10.8331C17.2803 10.8331 17.0683 10.7453 16.912 10.589C16.7558 10.4327 16.668 10.2208 16.668 9.99975C16.668 9.77873 16.7558 9.56677 16.912 9.41049C17.0683 9.25421 17.2803 9.16641 17.5013 9.16641C17.7223 9.16641 17.9343 9.25421 18.0906 9.41049C18.2468 9.56677 18.3346 9.77873 18.3346 9.99975C18.3346 10.2208 18.2468 10.4327 18.0906 10.589C17.9343 10.7453 17.7223 10.8331 17.5013 10.8331ZM1.66797 9.99975C1.66797 10.2208 1.75577 10.4327 1.91205 10.589C2.06833 10.7453 2.28029 10.8331 2.5013 10.8331C2.72232 10.8331 2.93428 10.7453 3.09056 10.589C3.24684 10.4327 3.33464 10.2208 3.33464 9.99975C3.33464 9.77873 3.24684 9.56677 3.09056 9.41049C2.93428 9.25421 2.72232 9.16641 2.5013 9.16641C2.28029 9.16641 2.06833 9.25421 1.91205 9.41049C1.75577 9.56677 1.66797 9.77873 1.66797 9.99975ZM15.8938 5.28558C15.8169 5.36517 15.725 5.42866 15.6233 5.47233C15.5216 5.51601 15.4123 5.539 15.3016 5.53996C15.191 5.54092 15.0813 5.51983 14.9788 5.47793C14.8764 5.43603 14.7834 5.37415 14.7051 5.29591C14.6269 5.21767 14.565 5.12462 14.5231 5.02221C14.4812 4.9198 14.4601 4.81006 14.4611 4.69941C14.4621 4.58876 14.485 4.47941 14.5287 4.37774C14.5724 4.27607 14.6359 4.18412 14.7155 4.10725C14.8726 3.95545 15.0831 3.87145 15.3016 3.87335C15.5201 3.87525 15.7291 3.96289 15.8837 4.1174C16.0382 4.27191 16.1258 4.48092 16.1277 4.69941C16.1296 4.91791 16.0456 5.12841 15.8938 5.28558ZM4.10964 15.8922C4.18651 15.9718 4.27846 16.0353 4.38013 16.079C4.4818 16.1227 4.59115 16.1457 4.7018 16.1466C4.81245 16.1476 4.92218 16.1265 5.0246 16.0846C5.12701 16.0427 5.22005 15.9808 5.2983 15.9026C5.37654 15.8243 5.43842 15.7313 5.48032 15.6289C5.52222 15.5265 5.54331 15.4167 5.54234 15.3061C5.54138 15.1954 5.51839 15.0861 5.47472 14.9844C5.43105 14.8827 5.36756 14.7908 5.28797 14.7139C5.1302 14.5658 4.92098 14.4848 4.70457 14.4882C4.48817 14.4915 4.28156 14.5789 4.12846 14.7319C3.97537 14.8849 3.8878 15.0915 3.88429 15.3079C3.88077 15.5243 3.96159 15.7344 4.10964 15.8922ZM14.7163 15.8922C14.6367 15.8154 14.5732 15.7234 14.5296 15.6218C14.4859 15.5201 14.4629 15.4107 14.4619 15.3001C14.461 15.1894 14.482 15.0797 14.524 14.9773C14.5659 14.8749 14.6277 14.7818 14.706 14.7036C14.7842 14.6253 14.8773 14.5635 14.9797 14.5216C15.0821 14.4797 15.1918 14.4586 15.3025 14.4595C15.4131 14.4605 15.5225 14.4835 15.6241 14.5272C15.7258 14.5708 15.8178 14.6343 15.8946 14.7139C16.0464 14.8711 16.1304 15.0816 16.1285 15.3001C16.1266 15.5186 16.039 15.7276 15.8845 15.8821C15.73 16.0366 15.521 16.1242 15.3025 16.1261C15.084 16.128 14.8735 16.044 14.7163 15.8922ZM4.1088 4.10808C4.02921 4.18495 3.96573 4.27691 3.92205 4.37858C3.87838 4.48025 3.85539 4.5896 3.85443 4.70025C3.85347 4.8109 3.87455 4.92063 3.91645 5.02304C3.95835 5.12546 4.02023 5.2185 4.09847 5.29674C4.17672 5.37499 4.26976 5.43687 4.37217 5.47877C4.47459 5.52067 4.58432 5.54175 4.69497 5.54079C4.80562 5.53983 4.91497 5.51684 5.01664 5.47317C5.11831 5.42949 5.21026 5.36601 5.28714 5.28641C5.43529 5.12864 5.51626 4.91942 5.5129 4.70302C5.50954 4.48661 5.42211 4.28 5.26913 4.12691C5.11614 3.97382 4.9096 3.88625 4.69319 3.88273C4.47679 3.87922 4.26668 3.96004 4.1088 4.10808Z" fill="#FEAB27" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M15.9677 10.1262C14.9738 13.5804 11.7558 16 8.1468 16C3.65791 16 0 12.3421 0 7.8532C0 4.24417 2.4196 1.02618 5.87384 0.0322749C6.20786 -0.0654867 6.56632 0.064862 6.76999 0.341853C6.96551 0.626991 6.96551 1.00989 6.76184 1.28688C6.06937 2.25635 5.70276 3.3969 5.70276 4.59448C5.70276 7.73915 8.26085 10.2972 11.4055 10.2972C12.6031 10.2972 13.7436 9.93064 14.7131 9.23816C14.9901 9.03449 15.373 9.03449 15.6581 9.23001C15.9351 9.43368 16.0655 9.79214 15.9677 10.1262Z" fill="#5462F0" />
  </svg>
);

const PlayButton = () => (
  <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68" height="48" rx="14" fill="#FF0000" fillOpacity="0.95" />
    <path d="M45 24L28 34V14L45 24Z" fill="white" />
  </svg>
);

const parseTimeParam = (t: string | null): number | null => {
  if (!t) return null;
  const isPM = t.toLowerCase().endsWith("pm");
  const s = t.toLowerCase().replace("am", "").replace("pm", "");
  const [hStr, mStr] = s.split(".");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr ?? "0", 10);
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h * 60 + m;
};

const getCurrentTotalMin = (timeParam: string | null) => {
  const parsed = parseTimeParam(timeParam);
  if (parsed !== null) return parsed;
  const nowIST = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  return nowIST.getUTCHours() * 60 + nowIST.getUTCMinutes();
};

const MORNING_SLOTS = [
  { start: 4 * 60 + 30, end: 6 * 60 + 30, label: "5:30 AM" }, // live window opens 1hr before session
  { start: 6 * 60 + 30, end: 7 * 60 + 30, label: "6:30 AM" },
  { start: 7 * 60 + 30, end: 8 * 60 + 30, label: "7:30 AM" },
  { start: 8 * 60 + 30, end: 9 * 60 + 30, label: "8:30 AM" },
];
const EVENING_SLOTS = [
  { start: 15 * 60 + 30, end: 17 * 60 + 30, label: "4:30 PM" }, // live window opens 1hr before session
  { start: 17 * 60 + 30, end: 18 * 60 + 30, label: "5:30 PM" },
  { start: 18 * 60 + 30, end: 19 * 60 + 30, label: "6:30 PM" },
];
const ALL_SLOTS = [...MORNING_SLOTS, ...EVENING_SLOTS];

interface FourteenDaySessionCardProps {
  currentDay: number;
  batchOrigin: Date;
  sessionLink: string;
  sessionVideoId: string | null;
  language?: string;
  mobile?: string;
  freeSessionCode: string;
  onJoin: () => void;
}

/** "Your Yoga Session" card — regular free-batch session, live/upcoming/none, plus the day-1 pre-session hero text. */
export const FourteenDaySessionCard: React.FC<FourteenDaySessionCardProps> = ({
  currentDay,
  batchOrigin,
  sessionLink,
  sessionVideoId,
  language,
  mobile,
  freeSessionCode,
  onJoin,
}) => {
  const location = useLocation();
  const totalMin = getCurrentTotalMin(new URLSearchParams(location.search).get("time"));

  const liveSlot = ALL_SLOTS.find(s => totalMin >= s.start && totalMin < s.end);
  const nextSlot = ALL_SLOTS.find(s => s.start > totalMin);
  const isTomorrow = !liveSlot && !nextSlot;
  const handleClick = () => {
    onJoin();
    trackSessionClick(mobile, freeSessionCode);
  };

  return (
    <div style={{ padding: "24px 20px 0" }}>
      {!liveSlot ? (
        currentDay === 1 && !isTomorrow && !(nextSlot && EVENING_SLOTS.some(s => s.label === nextSlot.label)) ? (
          <>
            <div style={{ paddingTop: "16px", textAlign: "center" }}>
              <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#0A386F" }}>
                14-DAYS ONLINE FREE YOGA
              </p>
              <p style={{ margin: 0, fontFamily: "Outfit", fontWeight: 800, fontSize: "1.375rem", lineHeight: "28px", color: "#FE961B" }}>
                STARTING <StartDateLabel date={batchOrigin} />
              </p>
            </div>
            <div className="flex flex-col items-center m-3">
              <div style={{ maxWidth: "342px", display: "flex", alignItems: "center", gap: "6px" }}>
                <SunIcon />
                <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "9px", fontWeight: 700, lineHeight: "normal" }}>
                  MOR - 5:30AM | 6:30AM | 7:30AM | 8:30AM IST
                </span>
              </div>
              <div style={{ maxWidth: "342px", display: "flex", alignItems: "center", gap: "6px" }}>
                <MoonIcon />
                <span style={{ color: "#0A386F", fontFamily: "Outfit", fontSize: "9px", fontWeight: 700, lineHeight: "normal" }}>
                  EVE - 4:30PM | 5:30PM | 6:30PM IST
                </span>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NoSessionsCard totalMin={totalMin} isFreeBatch={true} />
          </div>
        )
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h2 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Your Yoga Session</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFF0F0", borderRadius: "20px", padding: "3px 10px" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF3B30" }} />
              <span style={{ color: "#FF3B30", fontFamily: "Outfit", fontSize: "12px", fontWeight: 700 }}>Ongoing now</span>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <a href={sessionLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ display: "block", textDecoration: "none" }}>
              <div style={{
                width: "100%",
                height: "auto",
                aspectRatio: "178/93",
                borderRadius: "12px 12px 0 0",
                overflow: "hidden",
                boxShadow: "1px 0 4px 0 rgba(0,0,0,0.25), -1px -1px 4px 0 rgba(0,0,0,0.25)",
                position: "relative",
              }}>
                <img
                  src={sessionVideoId ? `https://img.youtube.com/vi/${sessionVideoId}/hqdefault.jpg` : language === "English" ? "/language%20English.jpg" : "/language%20Telugu.jpg"}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onLoad={(e) => {
                    // YouTube serves a tiny 120x90 gray placeholder with an HTTP 404 when no
                    // thumbnail exists for a video — the browser treats that as a successful
                    // load, so onError never fires. Catch it here by its telltale small size.
                    const img = e.target as HTMLImageElement;
                    if (img.naturalWidth <= 120 && !img.src.includes("language%20")) {
                      img.src = language === "English" ? "/language%20English.jpg" : "/language%20Telugu.jpg";
                    }
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = language === "English" ? "/language%20English.jpg" : "/language%20Telugu.jpg";
                  }}
                />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.32)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PlayButton />
                </div>
              </div>
            </a>

            <div style={{
              width: "100%",
              height: "67px",
              borderRadius: "0 0 12px 12px",
              border: "1.5px solid #E9E9E9",
              background: "#FFF",
              boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              paddingLeft: "16px",
            }}>
              <a href={sessionLink} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{
                width: "300px",
                height: "40px",
                borderRadius: "10px",
                background: "#FEAB27",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                textDecoration: "none",
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35472 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99169 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.33333 7.5V12.5L12.5 10L8.33333 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal" }}>JOIN SESSION</span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
