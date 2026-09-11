export interface ContestSummary {
  contestId: string;
  name: string;
  startDate: string;
  endDate: string;
  giftEligibleRank: number;
  isLive: boolean;
}

export interface ContestLeaderboardEntry {
  rank: number;
  name: string;
  referralCount: number;
  isWinner: boolean;
}

export interface ContestLeaderboardPage {
  contestId: string;
  startDate: string;
  endDate: string;
  resultDeclared: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  entries: ContestLeaderboardEntry[];
}

export interface ContestRank {
  rank: number;
  name: string;
  referralCount: number;
  isWinner: boolean;
}

export interface ContestReferral {
  referredMobile: string;
  referredName: string;
  referralDate: string;
  status: "pending" | "verified";
}

export interface ContestReferrals {
  contestId: string;
  mobile: string;
  totalReferrals: number;
  pendingReferrals: number;
  verifiedReferrals: number;
  referrals: ContestReferral[];
}
