import { useQuery } from "@tanstack/react-query";
import {
  fetchContestSummary,
  fetchContestRank,
  fetchContestReferrals,
  ContestNotFoundError,
} from "@/data/contest/api";

/** contestId is `null` while the student's `last_referral_contest_id` hasn't resolved yet, or
 *  is genuinely null (no contest attached to their batch) — every hook here stays disabled
 *  until a real id shows up. */

export function useContestSummary(contestId: string | null) {
  return useQuery({
    queryKey: ["contest-summary", contestId],
    queryFn: () => fetchContestSummary(contestId as string),
    enabled: !!contestId,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => !(error instanceof ContestNotFoundError) && failureCount < 3,
  });
}

export function useContestRank(contestId: string | null, mobile: string) {
  return useQuery({
    queryKey: ["contest-rank", contestId, mobile],
    queryFn: () => fetchContestRank(contestId as string, mobile),
    enabled: !!contestId && !!mobile,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => !(error instanceof ContestNotFoundError) && failureCount < 3,
  });
}

export function useContestReferrals(contestId: string | null, mobile: string, enabled = true) {
  return useQuery({
    queryKey: ["contest-referrals", contestId, mobile],
    queryFn: () => fetchContestReferrals(contestId as string, mobile),
    enabled: enabled && !!contestId && !!mobile,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => !(error instanceof ContestNotFoundError) && failureCount < 3,
  });
}
