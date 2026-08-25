import walkingIcon from "@/assets/diet/icons/fillers/walking.webp";
import sleepingInBedIcon from "@/assets/diet/icons/fillers/sleeping-in-bed.webp";
import guruIcon from "@/assets/diet/icons/fillers/guru.webp";
import breathingIcon from "@/assets/diet/icons/fillers/breathing.webp";
import emptyGlassIcon from "@/assets/diet/icons/fillers/empty-glass.webp";
import emptyGlassDarkIcon from "@/assets/diet/icons/fillers/empty-glass-dark.webp";
import type { FillerIconKey } from "@/data/diet/types";

/** A filler item's "kind" for style lookup — activity items key by their own icon,
 *  hydration items always use this shared key regardless of glass count. */
export type FillerStyleKey = FillerIconKey | "hydration";

// "nap" and "sleep" intentionally share one glyph (Figma reuses the same
// "Sleeping in Bed" icon for both) — see FillerIconKey in data/diet/types.ts.
const FILLER_ICON_ASSETS: Record<FillerIconKey, string> = {
  walking: walkingIcon,
  nap: sleepingInBedIcon,
  yoga: guruIcon,
  breathing: breathingIcon,
  sleep: sleepingInBedIcon,
};

/** The "empty glass" glyph for a bare hydration item (no circle backdrop — the
 *  standalone "after breakfast"/"after morning snack" rows). */
export const HYDRATION_GLASS_ICON = emptyGlassIcon;

/** The darker "empty glass" glyph used when a hydration item sits inside a colored
 *  circle (the lunch/evening-snack/dinner combo rows) — Figma node 1624:20641 uses a
 *  visibly darker glass than the bare standalone rows, not the same asset re-tinted. */
export const HYDRATION_GLASS_ICON_DARK = emptyGlassDarkIcon;

/** Real icon asset for a filler's activity glyph — hydration items don't call this,
 *  they always render `HYDRATION_GLASS_ICON` instead. */
export function getFillerIconAsset(icon: FillerIconKey): string {
  return FILLER_ICON_ASSETS[icon];
}

/** Circle background + label text colors, sampled directly from the Figma design
 *  (node 1569:19620) fills — not guessed. */
const FILLER_STYLE: Record<FillerStyleKey, { circleBg: string; textColor: string }> = {
  walking: { circleBg: "#D4FDE7", textColor: "#00981C" },
  nap: { circleBg: "#EFE9FF", textColor: "#7620ED" },
  sleep: { circleBg: "#EFE9FF", textColor: "#7620ED" },
  yoga: { circleBg: "#FFF9BC", textColor: "#D58600" },
  breathing: { circleBg: "#FFE7FB", textColor: "#BF2F92" },
  hydration: { circleBg: "#B8E2FF", textColor: "#0067A7" },
};

export function getFillerStyle(key: FillerStyleKey): { circleBg: string; textColor: string } {
  return FILLER_STYLE[key];
}
