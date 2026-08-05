interface SnChallengeWarningBannerProps {
  /** Current time-of-day in minutes since midnight (IST) — same value IndexPaid.tsx already
   *  computes for the regular session card, passed through rather than recomputed. */
  totalMin: number;
}

/** Tells students who skip the SN Challenge when they can still join the regular session
 *  instead. Re-derives the same three time bands NoSessionsCard.tsx uses (live / later today /
 *  tomorrow) locally rather than importing from it, since NoSessionsCard is also used by the
 *  unrelated free-batch page and shouldn't be coupled to this temporary feature. */
export const SnChallengeWarningBanner: React.FC<SnChallengeWarningBannerProps> = ({ totalMin }) => {
  const MORNING_END = 9 * 60 + 30; // 9:30 AM
  const EVENING_START = 15 * 60 + 45; // 3:45 PM
  const EVENING_END = 19 * 60 + 30; // 7:30 PM

  const isRegularLive = totalMin < MORNING_END || (totalMin >= EVENING_START && totalMin < EVENING_END);
  const isTomorrow = totalMin >= EVENING_END;

  const message = isRegularLive
    ? "Can’t do 108 Surya Namaskar? Join the regular session using the button below"
    : isTomorrow
    ? "Can’t do 108 Surya Namaskar? Join the regular session tomorrow morning"
    : "Can’t do 108 Surya Namaskar? Join the regular session at 4:30 PM IST";

  return (
    <div className="mx-5 mt-5 flex items-start gap-3 rounded-xl bg-white p-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
        <circle cx="12" cy="12" r="10" stroke="#FE961B" strokeWidth="2" />
        <line x1="12" y1="7" x2="12" y2="13" stroke="#FE961B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1" fill="#FE961B" />
      </svg>
      <p className="m-0 font-['Outfit'] text-sm leading-[18px] text-[#C15721]">{message}</p>
    </div>
  );
};
