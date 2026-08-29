import type { LocalizedText } from "./types";

/** Same text in both languages — used by the static filler-strip content
 *  (`mealFillers.ts`), which has no Telugu source yet, so it can be swapped for a real
 *  per-language value later without touching any other code. */
export const same = (text: string): LocalizedText => ({ English: text, Telugu: text });
