# App Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `Index` | Dashboard (no mobile) |
| `/dashboard` | `Index` | Alias for `/` |
| `/:mobile` | `Index` | Dashboard for a specific user |
| `/referral` | `Referral` | — |
| `/referral-status` | `ReferralStatus` | — |
| `/:mobile/referrals/:count` | `ReferralStatus` | User-specific referral status |
| `/attendance-page` | `AttendancePage` | — |
| `/:mobile/attendance` | `AttendancePage` | User-specific attendance |
| `/:mobile/recordings` | `AllRecordings` | User-specific recordings |
| `/leaderboard` | `Leaderboard` | Anonymous leaderboard |
| `/:mobile/leaderboard` | `Leaderboard` | User-specific leaderboard |
| `*` | `NotFound` | 404 catch-all |
