import { useQuery } from "@tanstack/react-query";

export interface ApiReferral {
  referred_mobile: string;
  referred_name: string;
  referral_date: string;
  is_redeemed_for_free_classes: boolean;
  is_redeemed_for_gift: boolean;
  referral_confirmation_status: "pending" | "verified";
}

export interface ReferralsApiData {
  total_referrals: number;
  pending_referrals: number;
  verified_referrals: number;
  referrals_required_for_next_free_classes: number;
  referrals_required_for_next_gift: number;
  language?: string;
  referrals: ApiReferral[];
}

interface UseReferralsOptions {
  /** Defaults to `false`, matching every call site except the Leaderboard contest drawer. */
  includeContest?: boolean;
  /** Contest window bounds — only the Leaderboard drawer passes these. */
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
}

async function fetchReferrals(
  mobile: string,
  includeContest: boolean,
  startDate: string | null,
  endDate: string | null
): Promise<ReferralsApiData> {
  // Every existing call site sends the referrals API a "+"-prefixed number — centralized
  // here so callers just pass the bare digits they already have (same convention as
  // useStudentData/useSessionLinks).
  const params = new URLSearchParams({ mobile: `+${mobile}`, include_contest: String(includeContest) });
  if (startDate) params.set("start_date", startDate);
  if (endDate) params.set("end_date", endDate);
  const res = await fetch(`/.netlify/functions/referrals?${params.toString()}`);
  if (!res.ok) throw new Error(`referrals API error: ${res.status}`);
  return res.json();
}

/** Shared, cached fetch for a student's referral data, keyed by `mobile` (bare digits, no
 *  "+") plus the params that actually change what the backend returns — `mobile` alone
 *  isn't a unique key since the Leaderboard contest drawer requests a different date-
 *  scoped, contest-inclusive view of the same student's referrals. Three of the four
 *  existing call sites use the exact same (no-dates, include_contest=false) params, so
 *  they now share one cache entry instead of three independent fetches. */
export function useReferrals(mobile: string, options: UseReferralsOptions = {}) {
  const includeContest = options.includeContest ?? false;
  const startDate = options.startDate ?? null;
  const endDate = options.endDate ?? null;
  const enabled = (options.enabled ?? true) && !!mobile;

  return useQuery({
    queryKey: ["referrals", mobile, includeContest, startDate, endDate],
    queryFn: () => fetchReferrals(mobile, includeContest, startDate, endDate),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
