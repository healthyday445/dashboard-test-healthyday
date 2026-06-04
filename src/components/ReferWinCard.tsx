import React from "react";
import { ShareReferralActions } from "@/components/ShareReferralActions";

/**
 * Reusable "Refer & Win" card — dark-blue card with title, subtitle,
 * share-link input, WhatsApp button, and "Your Referrals" link.
 *
 * Used across multiple dashboard sections (14DaysOngoing, Paid, Completed, etc.)
 */

interface ReferWinCardProps {
  shareLink: string;
  referralsUrl: string;
  showViewMore?: boolean;
}

const ReferWinCard: React.FC<ReferWinCardProps> = ({ shareLink, referralsUrl, showViewMore = true }) => (
  <div
    style={{
      width: "100%",
      maxWidth: "358px",
      height: "auto",
      boxSizing: "border-box",
      borderRadius: "16px",
      background:
        "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
      boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      justifyContent: "center",
    }}
  >
    {/* Share actions */}
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <ShareReferralActions shareLink={shareLink} referralsUrl={referralsUrl} showViewMore={showViewMore} />
    </div>
  </div>
);

export default ReferWinCard;
