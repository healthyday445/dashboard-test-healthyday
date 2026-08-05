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

  // Split into Figma's own two-line structure ("Can't do...?" / "Join the regular...") rather
  // than one long string — letting the browser wrap a single string produced a ragged 3-line
  // break at narrow widths instead of the designed 2 lines.
  const secondLine = isRegularLive
    ? "Join the regular session using the button below"
    : isTomorrow
    ? "Join the regular session tomorrow morning"
    : "Join the regular session at 4:30 PM IST";

  return (
    <div className="mx-4 mt-4 flex items-start gap-2 rounded-xl bg-white p-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="flex-shrink-0"
        style={{ width: "clamp(22px, 7vw, 30px)", height: "clamp(22px, 7vw, 30px)" }}
      >
        <circle cx="12" cy="12" r="10" stroke="#FE961B" strokeWidth="2" />
        <line x1="12" y1="7" x2="12" y2="13" stroke="#FE961B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1" fill="#FE961B" />
      </svg>
      <p className="m-0 font-['Outfit'] leading-[1.3] text-[#C15721]" style={{ fontSize: "clamp(12.5px, 3.6vw, 14px)" }}>
        Can’t do 108 Surya Namaskar?
        <br />
        {secondLine}
      </p>
    </div>
  );
};
