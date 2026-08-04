import type { Language } from "@/data/diet";
import ideaIcon from "@/assets/diet/icons/idea.webp";
import protectIcon from "@/assets/diet/icons/protect.webp";
import tipsDecoration from "@/assets/diet/tips-decoration.webp";
import precautionsDecoration from "@/assets/diet/precautions-decoration.webp";

interface DietInfoCalloutProps {
  variant: "tips" | "precautions";
  text: string;
  language?: Language;
}

// Colors/assets from Figma node 890:8563 (TIPS/PRECAUTIONS sections).
const VARIANT_CONFIG = {
  tips: {
    // The Telugu Figma screens leave this heading in English — transcribed as-authored.
    label: { English: "Tips", Telugu: "Tips" },
    accentBg: "bg-[#0A386F]",
    accentText: "text-[#0A386F]",
    cardBg: "bg-[#EBF7FF]",
    cardBorder: "border-[#6EB1DC]",
    icon: ideaIcon,
    decoration: tipsDecoration,
  },
  precautions: {
    label: { English: "Precautions", Telugu: "జాగ్రత్తలు" },
    accentBg: "bg-[#FE961B]",
    accentText: "text-[#FE961B]",
    cardBg: "bg-[#FFF4E7]",
    cardBorder: "border-[#F7AB51]",
    icon: protectIcon,
    decoration: precautionsDecoration,
  },
} as const;

/** Shared card for Tips/Precautions (Figma 910:18725 / 910:18716) — accent-colored left
 *  bar, icon + heading, body paragraph, and a small decorative illustration in the corner.
 *  Either section is independently optional per meal, so this only renders when the
 *  corresponding text is present. */
export const DietInfoCallout: React.FC<DietInfoCalloutProps> = ({ variant, text, language = "English" }) => {
  const { label, accentBg, accentText, cardBg, cardBorder, icon, decoration } = VARIANT_CONFIG[variant];
  return (
    <div
      className={`relative mx-5 mb-4 box-border min-h-[100px] overflow-hidden rounded-lg border-[0.5px] pb-3.5 pl-6 pr-[88px] pt-3.5 ${cardBg} ${cardBorder}`}
    >
      <div className={`absolute inset-y-0 left-0 w-[7px] rounded-l-lg ${accentBg}`} />
      <div className="mb-1.5 flex items-center gap-2">
        <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${accentBg}`}>
          <img src={icon} alt="" className="h-3.5 w-3.5" />
        </div>
        <span className={`text-lg font-bold ${accentText}`}>{label[language]}</span>
      </div>
      {/* Aligned with the heading text above (icon width + gap = 32px), not with the card's
          own left padding — the two must share the same starting x. */}
      <p className="ml-8 max-w-[215px] text-xs font-normal leading-normal text-[#202020]">{text}</p>
      <img src={decoration} alt="" className="pointer-events-none absolute right-1.5 top-3 h-[72px] w-[72px] object-contain" />
    </div>
  );
};
