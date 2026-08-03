import { DIET_SLOTS_ORDERED } from "./slots";
import { GENERIC_CYCLE_CONTENT } from "./weekBlocks";
import { CURATED_CONTENT_BY_DATE, OMITTED_SLOTS_BY_DATE } from "./curatedContent";
import { getCyclePosition, getEffectiveToday, getTabDates, formatDateDDMMYYYY, toIsoDateKey } from "./dateMath";
import type { ResolvedDayPlan, ResolvedMeal, Language, LocalizedText } from "./types";

function resolveText(text: LocalizedText | undefined, language: Language): string | undefined {
  return text?.[language];
}

/** An entry with no `visibleLanguages` is shown in every language (the common case). */
function isVisible(visibleLanguages: Language[] | undefined, language: Language): boolean {
  return visibleLanguages === undefined || visibleLanguages.includes(language);
}

/**
 * Resolves one day's meals (normally all 8 slots, fewer if `OMITTED_SLOTS_BY_DATE` drops
 * any for this date) for the given language, merging the generic sheet content with the
 * curated override when present. Precedence: a curated field wins whenever it's present
 * for that date+slot; otherwise fall back to the generic layer for name (-> detail, which
 * has no per-language variant — the sheet is English-only today), or to `undefined` for
 * fields with no generic equivalent (tips/precautions/benefits/etc) — never coerced to ""
 * or []. `category`/`detail` are always the raw sheet values, regardless of curation, so
 * a curated day never loses access to the original sheet text.
 */
export function getResolvedDayPlan(date: Date, language: Language = "English"): ResolvedDayPlan {
  const clamped = getEffectiveToday(date); // defensive: never resolve a pre-launch date
  const { weekBlockId, weekdayIndex } = getCyclePosition(clamped);
  const genericDay = GENERIC_CYCLE_CONTENT[weekBlockId][weekdayIndex];
  const dateKey = toIsoDateKey(clamped);
  const curatedForDate = CURATED_CONTENT_BY_DATE[dateKey]; // undefined => zero curation for this date
  const omittedSlots = OMITTED_SLOTS_BY_DATE[dateKey]; // slots with no card at all for this date

  const meals: ResolvedMeal[] = DIET_SLOTS_ORDERED.filter((slot) => !omittedSlots?.includes(slot.id)).map((slot) => {
    const generic = genericDay[slot.id];
    const curated = curatedForDate?.[slot.id];

    return {
      slotId: slot.id,
      slotLabel: slot.label,
      timeRangeLabel: curated?.timeRangeLabel ?? slot.timeRangeLabel,
      order: slot.order,
      category: generic.category,
      detail: generic.detail,
      isCurated: !!curated,
      name: resolveText(curated?.name, language) ?? generic.detail,
      imageUrl: curated?.imageUrl,
      items: curated?.items?.map((item) => ({ label: resolveText(item.label, language) ?? "" })),
      tips: resolveText(curated?.tips, language),
      precautions: resolveText(curated?.precautions, language),
      nutritionalBenefits: curated?.nutritionalBenefits
        ?.filter((b) => isVisible(b.visibleLanguages, language))
        .map((b) => ({
          ingredient: resolveText(b.ingredient, language) ?? "",
          benefits: b.benefits
            .filter((item) => isVisible(item.visibleLanguages, language))
            .map((item) => ({
              benefitLabel: resolveText(item.benefitLabel, language) ?? "",
              iconKey: item.iconKey,
            })),
        }))
        .filter((b) => b.benefits.length > 0), // defensive: never leave a card with zero rows
      recommendedQuantity: curated?.recommendedQuantity
        ?.filter((q) => isVisible(q.visibleLanguages, language))
        .map((q) => ({
          ingredient: resolveText(q.ingredient, language) ?? "",
          qty: resolveText(q.qty, language) ?? "",
        })),
      groceryListAvailable: curated?.groceryListAvailable ?? false,
    };
  });

  return { dateKey, displayDate: formatDateDDMMYYYY(clamped), weekBlockId, weekdayIndex, meals };
}

/** The 5 tab-strip day plans, starting at effective-today, for the given language. Pass
 *  `today` for `?forceDay=`/`?time=`-style QA overrides. This is the single entry point
 *  page components need — no caller needs to know about week-blocks or curation. */
export function getResolvedTabPlans(today: Date = new Date(), language: Language = "English", count = 5): ResolvedDayPlan[] {
  return getTabDates(today, count).map((date) => getResolvedDayPlan(date, language));
}
