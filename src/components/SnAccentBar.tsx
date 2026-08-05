/** The orange accent bar shown beside every SN Challenge section title (Figma nodes
 *  1252:18864/1252:18773 — a plain 10x25 #FE961B rect, 2px corner radius = Tailwind's
 *  `rounded-sm`). Extracted since `SnChallengeCard`/`SnChallengeRegularSessionCard` each had
 *  their own copy of this exact div. */
export const SnAccentBar: React.FC = () => <div className="h-[25px] w-[10px] flex-shrink-0 rounded-[2px] bg-[#FE961B]" />;
