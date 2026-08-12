import heartIcon from "@/assets/diet/icons/heart.webp";
import lightningBoltIcon from "@/assets/diet/icons/lightning-bolt.webp";
import waterIcon from "@/assets/diet/icons/water.webp";
import snowflakeIcon from "@/assets/diet/icons/snowflake.webp";
import shieldIcon from "@/assets/diet/icons/shield.webp";
import stomachIcon from "@/assets/diet/icons/stomach.webp";
import sugarCubesIcon from "@/assets/diet/icons/sugar-cubes.webp";
import healthyFoodIcon from "@/assets/diet/icons/healthy-food.webp";
import happyIcon from "@/assets/diet/icons/happy.webp";
import dogBoneIcon from "@/assets/diet/icons/dog-bone.webp";
import healthyEatingIcon from "@/assets/diet/icons/healthy-eating.webp";
import meditationIcon from "@/assets/diet/icons/meditation.webp";
import brainHealthIcon from "@/assets/diet/icons/brain-health.webp";
import healthySkinIcon from "@/assets/diet/icons/healthy-skin.webp";
import muscleHealthIcon from "@/assets/diet/icons/muscle-health.webp";
import hemoglobinIcon from "@/assets/diet/icons/hemoglobin.webp";
import eyeHealthIcon from "@/assets/diet/icons/eye-health.webp";
import warmthIcon from "@/assets/diet/icons/warmth.webp";
import antiInflammatoryIcon from "@/assets/diet/icons/anti-inflammatory.webp";
import nutrientAbsorptionIcon from "@/assets/diet/icons/nutrient-absorption.webp";
import oralHealthIcon from "@/assets/diet/icons/oral-health.webp";
import leafIcon from "@/assets/diet/icons/leaf.webp";
import allergenFreeIcon from "@/assets/diet/icons/allergen-free.webp";
import caringHandIcon from "@/assets/diet/icons/caring-hand.webp";

/**
 * Placeholder visuals for the diet feature until real per-dish photography exists.
 * `getMealPlaceholderIcon` picks a background + glyph from a loose keyword match against
 * a meal's category/detail text — it's decorative only, so an unmatched meal just gets the
 * generic fallback rather than needing an exhaustive keyword list.
 */

interface IconSpec {
  background: string;
  icon: React.ReactNode;
}

const CIRCLE_ICON = (glyphColor: string, path: React.ReactNode) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    {path}
  </svg>
);

const CATEGORY_BUCKETS: { keywords: string[]; spec: IconSpec }[] = [
  {
    keywords: ["fruit", "guava", "apple", "banana", "grape", "jamun", "pineapple", "mango", "watermelon", "sapota"],
    spec: {
      background: "#FFF1DE",
      icon: CIRCLE_ICON("#FEAB27", <circle cx="12" cy="12" r="8" fill="#FEAB27" />),
    },
  },
  {
    keywords: ["nuts", "seeds", "almond", "walnut", "raisin", "pistachio", "date", "cashew"],
    spec: {
      background: "#F4ECE0",
      icon: CIRCLE_ICON("#8B5E34", <rect x="6" y="6" width="12" height="12" rx="4" fill="#8B5E34" />),
    },
  },
  {
    keywords: ["milk", "curd", "buttermilk", "paneer", "ghee", "malt"],
    spec: {
      background: "#EAF3FF",
      icon: CIRCLE_ICON("#0D468B", <path d="M8 3H16V6L18 8V20C18 20.55 17.55 21 17 21H7C6.45 21 6 20.55 6 20V8L8 6V3Z" fill="#0D468B" />),
    },
  },
  {
    keywords: ["rice", "millet", "ragi", "jowar", "jonna", "korra", "sajja", "khichdi", "upma", "poha", "dosa", "idly", "idli", "chapati", "roti", "wheat"],
    spec: {
      background: "#FFF8E1",
      icon: CIRCLE_ICON("#C9971C", <ellipse cx="12" cy="14" rx="8" ry="5" fill="#C9971C" />),
    },
  },
  {
    keywords: ["juice", "water", "drink", "tea", "coconut water", "detox"],
    spec: {
      background: "#E5F7FF",
      icon: CIRCLE_ICON("#1D8FB8", <path d="M12 3C12 3 6 10 6 14.5C6 18 8.7 21 12 21C15.3 21 18 18 18 14.5C18 10 12 3 12 3Z" fill="#1D8FB8" />),
    },
  },
  {
    keywords: ["soup", "snack", "salad", "sprouts", "chana", "chaat"],
    spec: {
      background: "#EAFFE5",
      icon: CIRCLE_ICON("#3E9E1F", <circle cx="12" cy="12" r="8" fill="#3E9E1F" />),
    },
  },
];

const GENERIC_SPEC: IconSpec = {
  background: "#F0EEEE",
  icon: CIRCLE_ICON("#868585", <circle cx="12" cy="12" r="8" fill="#868585" />),
};

export function getMealPlaceholderIcon(category: string, detail: string): IconSpec {
  const haystack = `${category} ${detail}`.toLowerCase();
  for (const bucket of CATEGORY_BUCKETS) {
    if (bucket.keywords.some((kw) => haystack.includes(kw))) return bucket.spec;
  }
  return GENERIC_SPEC;
}

// Real icon assets from the canonical benefit-icon pack (Figma node 875:2129, "icon-pack") —
// the single source of truth for every benefit icon in this feature. Keyed by the same
// `iconKey` strings used in curatedContent.ts. Note "muscle-health" covers BOTH "Muscle
// Health" and "Protein-Rich" benefit labels (the pack itself labels this one icon
// "Muscle Health/Protein"), and "nutrient-absorption" (an orange heart+checkmark) is a
// distinct icon from plain "heart" (red, for "Heart Health") — don't conflate the two.
const BENEFIT_ICONS: Record<string, string> = {
  heart: heartIcon,
  "lightning-bolt": lightningBoltIcon,
  water: waterIcon,
  snowflake: snowflakeIcon,
  shield: shieldIcon,
  stomach: stomachIcon,
  "sugar-cubes": sugarCubesIcon,
  "healthy-food": healthyFoodIcon,
  happy: happyIcon,
  "dog-bone": dogBoneIcon,
  "healthy-eating": healthyEatingIcon,
  meditation: meditationIcon,
  "brain-health": brainHealthIcon,
  "healthy-skin": healthySkinIcon,
  "muscle-health": muscleHealthIcon,
  hemoglobin: hemoglobinIcon,
  "eye-health": eyeHealthIcon,
  warmth: warmthIcon,
  "anti-inflammatory": antiInflammatoryIcon,
  "nutrient-absorption": nutrientAbsorptionIcon,
  "oral-health": oralHealthIcon,
  leaf: leafIcon,
  "allergen-free": allergenFreeIcon,
  "caring-hand": caringHandIcon,
};

/** Real icon asset URL for a `nutritionalBenefits[].iconKey` value — unrecognized keys
 *  (including "generic", our own catch-all, or future ones we haven't seen yet) fall back
 *  to a neutral wellness icon rather than rendering nothing. */
export function getBenefitIcon(iconKey: string): string {
  return BENEFIT_ICONS[iconKey] ?? healthyFoodIcon;
}
