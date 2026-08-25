import type { LocalizedText } from "./types";

/** Same text in both languages — for content that hasn't been translated yet (or never
 *  differs by language), so it can be swapped for a real per-language value later
 *  without touching any other code. */
export const same = (text: string): LocalizedText => ({ English: text, Telugu: text });

/** Distinct text per language. */
export const t = (English: string, Telugu: string): LocalizedText => ({ English, Telugu });
