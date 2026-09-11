import type {
  ContestSummary,
  ContestLeaderboardPage,
  ContestRank,
  ContestReferrals,
} from "./types";

/** Thrown when the backend returns 404 `{status: "not_found"}` — a genuinely missing/deleted
 *  contest_id, distinct from a network failure so the page can render a "no contest" state. */
export class ContestNotFoundError extends Error {
  constructor(contestId: string) {
    super(`contest not found: ${contestId}`);
    this.name = "ContestNotFoundError";
  }
}

interface ApiContestSummaryResponse {
  contest_id: string;
  name: string;
  start_date: string;
  end_date: string;
  gift_eligible_rank: number;
  is_live: boolean;
}

export async function fetchContestSummary(contestId: string): Promise<ContestSummary> {
  const res = await fetch(`/.netlify/functions/contest-summary?contest_id=${encodeURIComponent(contestId)}`);
  if (res.status === 404) throw new ContestNotFoundError(contestId);
  if (!res.ok) throw new Error(`contest-summary API error: ${res.status}`);
  const data: ApiContestSummaryResponse = await res.json();
  return {
    contestId: data.contest_id,
    name: data.name,
    startDate: data.start_date,
    endDate: data.end_date,
    giftEligibleRank: data.gift_eligible_rank,
    isLive: data.is_live,
  };
}

interface ApiContestLeaderboardEntry {
  rank: number;
  name: string;
  referral_count: number;
  is_winner: boolean;
}

interface ApiContestLeaderboardResponse {
  contest: { contest_id: string; start_date: string; end_date: string; result_declared: boolean };
  page: number;
  page_size: number;
  total_pages: number;
  leaderboard: ApiContestLeaderboardEntry[];
}

export async function fetchContestLeaderboard(
  contestId: string,
  page: number,
  pageSize: number
): Promise<ContestLeaderboardPage> {
  const params = new URLSearchParams({
    contest_id: contestId,
    page: String(page),
    page_size: String(pageSize),
  });
  const res = await fetch(`/.netlify/functions/contest-leaderboard?${params.toString()}`);
  if (res.status === 404) throw new ContestNotFoundError(contestId);
  if (!res.ok) throw new Error(`contest-leaderboard API error: ${res.status}`);
  const data: ApiContestLeaderboardResponse = await res.json();
  return {
    contestId: data.contest.contest_id,
    startDate: data.contest.start_date,
    endDate: data.contest.end_date,
    resultDeclared: data.contest.result_declared,
    page: data.page,
    pageSize: data.page_size,
    totalPages: data.total_pages,
    entries: data.leaderboard.map((e) => ({
      rank: e.rank,
      name: e.name,
      referralCount: e.referral_count,
      isWinner: e.is_winner,
    })),
  };
}

interface ApiContestRankResponse {
  contest_id: string;
  rank: number;
  name: string;
  referral_count: number;
  is_winner: boolean;
}

const NOT_RANKED: ContestRank = { rank: 0, name: "", referralCount: 0, isWinner: false };

export async function fetchContestRank(contestId: string, mobile: string): Promise<ContestRank> {
  const params = new URLSearchParams({ contest_id: contestId, mobile: `+${mobile}` });
  const res = await fetch(`/.netlify/functions/contest-rank?${params.toString()}`);
  if (res.status === 404) {
    const data = await res.json().catch(() => null);
    if (data?.detail?.status === "not_ranked") return NOT_RANKED;
    throw new ContestNotFoundError(contestId);
  }
  if (!res.ok) throw new Error(`contest-rank API error: ${res.status}`);
  const data: ApiContestRankResponse = await res.json();
  return {
    rank: data.rank,
    name: data.name,
    referralCount: data.referral_count,
    isWinner: data.is_winner,
  };
}

interface ApiContestReferral {
  referred_mobile: string;
  referred_name: string;
  referral_date: string;
  referral_status: "pending" | "verified";
}

interface ApiContestReferralsResponse {
  contest_id: string;
  mobile: string;
  total_referrals: number;
  pending_referrals: number;
  verified_referrals: number;
  referrals: ApiContestReferral[];
}

export async function fetchContestReferrals(contestId: string, mobile: string): Promise<ContestReferrals> {
  const params = new URLSearchParams({ contest_id: contestId, mobile: `+${mobile}` });
  const res = await fetch(`/.netlify/functions/contest-referrals?${params.toString()}`);
  if (res.status === 404) throw new ContestNotFoundError(contestId);
  if (!res.ok) throw new Error(`contest-referrals API error: ${res.status}`);
  const data: ApiContestReferralsResponse = await res.json();
  return {
    contestId: data.contest_id,
    mobile: data.mobile,
    totalReferrals: data.total_referrals,
    pendingReferrals: data.pending_referrals,
    verifiedReferrals: data.verified_referrals,
    referrals: data.referrals.map((r) => ({
      referredMobile: r.referred_mobile,
      referredName: r.referred_name,
      referralDate: r.referral_date,
      status: r.referral_status,
    })),
  };
}
