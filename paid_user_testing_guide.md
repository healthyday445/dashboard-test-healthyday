# Paid User Testing Guide & Test Cases

This document provides a comprehensive structural map and all possible test scenarios for a **Paid User** in the Healthyday Dashboard application.

## 1. Structural Map (Paid User)

The dashboard structure dynamically adapts based on the user's plan duration, language, and current time.

### Main Dashboard (`/`)
* **Header**: Logo
* **Dynamic Session Area**:
  * **Bonus Special Session Card**: Appears dynamically during active windows.
    * *Face Yoga* (Sundays 11:30 AM)
    * *Breath to Heal* (Daily 9:00 PM)
    * *Diet Session* (Daily 8:00 PM)
  * **Your Yoga Session Card**: Regular daily live yoga session. Shows "Live" badge when active.
  * **No Sessions Card**: Displayed when no regular or bonus session is currently active.
* **View Class Recordings**: Button navigating to `/all-recordings`.
* **This Week's Grocery List**: Visible *only* to users on the 12-month Telugu plan. Navigates to an external PDF/link.
* **Your Weekly Attendance**:
  * **View Progress Link**: Navigates to `/attendance-page`.
  * **Week Calendar Card**: Shows Mon-Sun view with day status (Attended/Green, Missed/Yellow, Future/Gray).
* **Refer & Earn Section**:
  * **Your Referral Gifts**: Progress bar showing referral milestones (e.g., T-shirt, Water Bottle).
  * **Refer & Win Card**: WhatsApp share button and copy link functionality.
* **Plan Renewal Section**: Replaces Refer & Earn section when the subscription has 3 or fewer days remaining. Prompts to renew.

### Sub-Pages
* **All Recordings (`/all-recordings`)**: Lists recent dynamic API-based recordings (Yoga, Breath to Heal, Diet, 108 Suryanamaskar) and static YouTube videos.
* **Attendance (`/attendance-page`)**: Full monthly attendance tracking.
* **Referral Status (`/referral-status`)**: Detailed view of referrals and rewards.

---

## 2. Test Scenarios

### A. General & Initialization
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-GEN-01 | Login with a valid Paid user mobile number. | Dashboard loads successfully with paid user layout. |
| TC-GEN-02 | Verify language localization (Telugu vs. English). | Content matches the user's registered language (API response). |

### B. Regular Yoga Session
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-YOG-01 | User visits dashboard outside of live session hours. | "No Sessions Right Now" card is displayed. |
| TC-YOG-02 | User visits dashboard during live session hours. | "Your Yoga Session" card is displayed. |
| TC-YOG-03 | User visits dashboard during exact live session window. | Red "LIVE" badge appears on the session card. |
| TC-YOG-04 | User clicks "Join Session" or the thumbnail. | Opens the correct YouTube joining link in a new tab. |

### C. Bonus Special Sessions
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-BON-01 | **Face Yoga (Sunday)**: Telugu user visits on Sunday 11:30 AM (Even week). | Face Yoga Bonus Session card appears with correct Telugu thumbnail/link. |
| TC-BON-02 | **Face Yoga (Sunday)**: English user visits on Sunday 11:30 AM (Odd week). | Face Yoga Bonus Session card appears with correct English thumbnail/link. |
| TC-BON-03 | **Breath to Heal**: 6-month or 12-month user visits daily at 9:00 PM. | Breath to Heal Bonus Session card appears. |
| TC-BON-04 | **Breath to Heal**: English user visits on Sunday at 9:00 PM. | Breath to Heal session is *hidden* (excluded on Sundays for English). |
| TC-BON-05 | **Diet Session**: 12-month Telugu user visits daily at 8:00 PM. | Diet Session card appears. |
| TC-BON-06 | **Diet Session**: 6-month user or English user visits at 8:00 PM. | Diet Session card is *hidden*. |
| TC-BON-07 | Verify Bonus Session "Live" tag. | Red "LIVE" badge appears exactly at session start time (+30 min window). |
| TC-BON-08 | Verify Bonus Session "Next Session" state. | Shows "Session Starts at [Time]" 30 mins *before* start time. |

### D. Class Recordings (`/all-recordings`)
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-REC-01 | User clicks "View Class Recordings" on dashboard. | Navigates to `/all-recordings`. |
| TC-REC-02 | API successfully returns session links. | "Most Recent Session Recordings" section populates with dynamic API links and expiry dates. |
| TC-REC-03 | API fails to return session links. | "Most Recent Session Recordings" falls back to static/hardcoded links. |
| TC-REC-04 | Telugu user views recordings. | "108 Suryanamaskar Challenge" recording is visible (if active in API). Diet routine is visible. |
| TC-REC-05 | English user views recordings. | Diet routine and 108 Suryanamaskar are *hidden*. |

### E. Grocery List (12-Month Plan Feature)
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-GRO-01 | 12-month Telugu plan user views dashboard. | "This Week's Grocery List" card is visible. |
| TC-GRO-02 | 6-month user views dashboard. | Grocery List card is *hidden*. |
| TC-GRO-03 | 12-month English user views dashboard. | Grocery List card is *hidden*. |
| TC-GRO-04 | User clicks the Grocery List card. | Opens the external grocery list URL in a new tab. |

### F. Weekly Attendance
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-ATT-01 | User views "Week Calendar Card" on dashboard. | Displays current week Mon-Sun. |
| TC-ATT-02 | API returns present days in `paid_attendance_tracker`. | Corresponding days show a Green checkmark. |
| TC-ATT-03 | Past days not in the attendance tracker. | Show as Yellow (missed) crosses. |
| TC-ATT-04 | Future days in the week. | Show as grayed-out/faded icons. |
| TC-ATT-05 | User clicks "View progress". | Navigates to `/attendance-page`. |

### G. Refer & Win
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-REF-01 | User views "Your Referral Gifts" section. | Shows milestone progress bar (e.g., 5, 10, 20 referrals) matching API `total_referral_count`. |
| TC-REF-02 | User clicks "View More" on referral gifts. | Navigates to `/referral-status`. |
| TC-REF-03 | User clicks WhatsApp share button. | Opens WhatsApp with pre-filled referral message. |
| TC-REF-04 | User clicks "Copy" link. | Referral URL is copied to clipboard. |

### H. Plan Renewal & Expiry
| Test Case ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-REN-01 | Plan end date is > 3 days away. | Standard dashboard UI is shown. Plan Renewal section is hidden. |
| TC-REN-02 | Plan end date is <= 3 days away. | "Your Plan ends in X Days" warning appears. Pricing Section replaces Referral section. |
| TC-REN-03 | User status is `pastdue` (Plan Expired). | Standard dashboard is replaced with "SUBSCRIPTION EXPIRED" warning and a prominent Pricing/Renewal section. |
