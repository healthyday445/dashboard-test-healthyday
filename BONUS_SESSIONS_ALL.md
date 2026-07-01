# Bonus Sessions Documentation

This document outlines the **Bonus Session Schedules** for both **Free (14DaysOngoing)** and **Paid** students. 

The Dashboard handles these two segments differently, showing different topics on different days.

---

## 🆓 1. Free Student Schedule (21-Day Journey)
*Target Audience: Users with `status = "14DaysOngoing"` or `"registered"`*

These sessions appear as a standalone, exclusive "Special Bonus Session" card that completely overrides the regular daily dashboard during the 30 minutes prior to the session start.

### 🟢 Telugu Schedule
| Day | Time | Topic / Session Name | Link / ID |
| :---: | :--- | :--- | :--- |
| **Day 4** | 8:30 PM | Face Yoga Session | `./faceyoga` |
| **Day 8** | 10:30 AM | Weight Loss Session | `./weightlosssession` |
| **Day 11** | 8:00 PM | Meditation Session | `https://www.youtube.com/watch?v=cXaVIxH3RKA` |
| **Day 15** | 8:30 PM | Breath Work Session | `./breathwork` |
| **Day 18** | 8:30 PM | Live Q&A Session | `./liveqa` |
| **Day 22** | 10:30 AM | Graduation Session | `./graduation` |

### 🔵 English Schedule
| Day | Time | Topic / Session Name | Link / ID |
| :---: | :--- | :--- | :--- |
| **Day 5** | 8:30 PM | Face Yoga Session | `./faceyoga_eng` |
| **Day 8** | 10:30 AM | Weight Loss Orientation | `./weightlosssession_eng` |
| **Day 12** | 8:00 PM | Meditation Session | `./meditation_eng` |
| **Day 15** | 8:30 PM | Breath Work Session | `./bw_eng` |
| **Day 19** | 8:30 PM | Live Q&A Session | `./liveqa_eng` |
| **Day 22** | 10:30 AM | Graduation Session | `./graduation_eng` |

*(Note: Currently in `Index.tsx` line 638, the code still checks for `isPaid` due to the recent `git reset`. If you wish to strictly enforce this for Free students only, you will need to change `isPaid` back to `isOngoingStatus` or similar).*

---

## 👑 2. Paid Student Schedule (14-Day Journey)
*Target Audience: Users with `status = "paid"`*

Paid users see their bonus sessions **injected directly into their daily Yoga Session card**. When it's exactly 30 minutes before the bonus session, the regular daily card dynamically updates its thumbnail and "Join" button to point to the Bonus session instead.

The days are exactly the **same for both Telugu and English** paid users.

| Day | Time | Topic / Session Name | Links (Telugu / English) |
| :---: | :--- | :--- | :--- |
| **Day 3** | 8:30 PM | Face Yoga Session | `/faceyoga` / `/faceyoga_eng` |
| **Day 5** | 8:00 PM | Meditation Session | `/meditation_tel` / `/meditation_eng` |
| **Day 7** | 10:30 AM | Weight Loss Session | `/weightlosssession` / `/weightlosssession_eng` |
| **Day 10** | 8:30 PM | Breath Work Session | `/breathwork` / `/bw_eng` |
| **Day 14** | 10:30 AM | Sleep Session | `/sleepsession` / `/sleepsession_eng` |

---

### How to Test Locally
To simulate and verify these designs locally, append the following to any user's URL:
`?forceDay=X&time=HH.MMpm`

**Example (Paid User on Day 3 at 8:15 PM):**
`http://localhost:8080/918604905722?forceDay=3&time=8.15pm`
