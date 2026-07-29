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
    accent: "#0A386F",
    background: "#EBF7FF",
    border: "#6EB1DC",
    icon: ideaIcon,
    decoration: tipsDecoration,
  },
  precautions: {
    label: { English: "Precautions", Telugu: "జాగ్రత్తలు" },
    accent: "#FE961B",
    background: "#FFF4E7",
    border: "#F7AB51",
    icon: protectIcon,
    decoration: precautionsDecoration,
  },
} as const;

/** Shared card for Tips/Precautions (Figma 910:18725 / 910:18716) — accent-colored left
 *  bar, icon + heading, body paragraph, and a small decorative illustration in the corner.
 *  Either section is independently optional per meal, so this only renders when the
 *  corresponding text is present. */
export const DietInfoCallout: React.FC<DietInfoCalloutProps> = ({ variant, text, language = "English" }) => {
  const { label, accent, background, border, icon, decoration } = VARIANT_CONFIG[variant];
  return (
    <div
      style={{
        position: "relative",
        margin: "0 20px 16px",
        minHeight: "100px",
        boxSizing: "border-box",
        padding: "14px 88px 14px 24px",
        background,
        border: `0.5px solid ${border}`,
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "7px", background: accent, borderRadius: "8px 0 0 8px" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        <div
          style={{
            flexShrink: 0,
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: `${accent}1F`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={icon} alt="" style={{ width: "14px", height: "14px" }} />
        </div>
        <span style={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, color: accent }}>{label[language]}</span>
      </div>
      <p style={{ margin: 0, maxWidth: "215px", fontFamily: "Outfit", fontSize: "12px", fontWeight: 400, color: "#202020", lineHeight: 1.5 }}>{text}</p>
      <img
        src={decoration}
        alt=""
        style={{ position: "absolute", right: "6px", top: "12px", width: "72px", height: "72px", objectFit: "contain", pointerEvents: "none" }}
      />
    </div>
  );
};
