# 📹 Paid User — Recordings Reference

> **Page:** `/all-recordings`  
> **Visible to:** `status = "paid"` users only  
> **Source file:** `src/pages/AllRecordings.tsx`

---

## Section 1: Most Recent Session Recordings

> These are dynamic class recordings linked to the user's live session access.

### ✅ All Paid Users (Telugu + English)
*(Note: Face Yoga is restricted to 12-Month users only)*

| # | Title | Subtitle | Thumbnail | Link | Access Window |
|---|-------|----------|-----------|------|---------------|
| 1 | `[Today's Date]` Yoga Session | Daily Live Yoga Session | Telugu: `/language Telugu.jpg` · English: `/language English.jpg` | User's `paid_classes_joining_link` (fallback: `https://www.youtube.com/c/Healthyday`) | Till **5:00 AM next day** |
| 2 | Last Healthyday Face Yoga | Sundays at 11:30 AM | Telugu: `/bonus/faceyoga_tel.jpg` · English: `/bonus/faceyoga_eng.jpg` | Telugu: `https://join.healthyday.co.in/healthyface` · English: `https://join.healthyday.co.in/healthyface_eng` | Till **+13 days from today** |
| 3 | `[Today's Date]` Breath to Heal Session | Daily at 9:00 PM | Telugu: `/bonus/breathwork.jpg` · English: `/bonus/bw_eng.jpg` | Telugu: `https://join.healthyday.co.in/b2hsession` · English: `https://join.healthyday.co.in/b2hsession_eng` | Till **8:30 PM next day** |

### Diet Session (12-Month users only)

| # | Title | Subtitle | Thumbnail | Link | Access Window |
|---|-------|----------|-----------|------|---------------|
| 4 | `[Today's Date]` Healthyday Diet Routine | Daily at 8:00 PM | `/bonus/weightlosssession.jpg` | Telugu: `https://join.healthyday.co.in/diet` · English: `https://join.healthyday.co.in/diet_eng` | Till **7:30 PM next day** |

---

## Section 2: YouTube Videos

> Static curated videos — different per language.

### 🇮🇳 Telugu (4 Videos)

| # | Title | Duration | Date | YouTube Link |
|---|-------|----------|------|-------------|
| 1 | 15 Min Yoga for Beginners | 17 mins | OCT 25 | [youtu.be/SyjnCjDtNS8](https://youtu.be/SyjnCjDtNS8) |
| 2 | 15 Minutes Pranayama | 15 mins | JAN 26 | [youtu.be/CgWC09sydHk](https://youtu.be/CgWC09sydHk) |
| 3 | 15 Minutes Meditation | 14 mins | NOV 25 | [youtu.be/raCc7Z31LYw](https://youtu.be/raCc7Z31LYw) |
| 4 | Yoga Nidra - Deep Rest | 20 mins | DEC 25 | [youtu.be/bl3W5tzK4ds](https://youtu.be/bl3W5tzK4ds) |

### 🇬🇧 English (4 Videos)

| # | Title | Duration | Date | YouTube Link |
|---|-------|----------|------|-------------|
| 1 | 15 Min Yoga for Beginners | 17 mins | OCT 25 | [youtu.be/SyjnCjDtNS8](https://youtu.be/SyjnCjDtNS8) |
| 2 | 15 Minutes Pranayama | 15 mins | JAN 26 | [youtu.be/aC7Vi9qUExs](https://youtu.be/aC7Vi9qUExs) |
| 3 | 5-Minute Gratitude Meditation | 14 mins | NOV 25 | [youtu.be/u1Hom0s7ibU](https://youtu.be/u1Hom0s7ibU) |
| 4 | Yoga Nidra - Deep Rest | 20 mins | DEC 25 | [youtu.be/n0iI0ZSVTWA](https://youtu.be/n0iI0ZSVTWA) |

> [!NOTE]
> **"15 Min Yoga for Beginners"** (`SyjnCjDtNS8`) is the **same video** shown in both Telugu and English sections.

---

## Quick Reference: All Session Links

| Session | Telugu Link | English Link |
|---------|-------------|-------------|
| Live Yoga Session | *(user's `paid_classes_joining_link`)* | *(user's `paid_classes_joining_link`)* |
| Face Yoga | <https://join.healthyday.co.in/healthyface> | <https://join.healthyday.co.in/healthyface_eng> |
| Breath to Heal | <https://join.healthyday.co.in/b2hsession> | <https://join.healthyday.co.in/b2hsession_eng> |
| Diet Routine | <https://join.healthyday.co.in/diet> | ❌ Not shown |

---

## Logic Summary

```
status === "paid"
  └── /all-recordings page accessible
        ├── language === "Telugu"
        │     ├── Card 1: Yoga Session (user link)
        │     ├── Card 2: Face Yoga → join.healthyday.co.in/healthyface
        │     ├── Card 3: Breath to Heal → join.healthyday.co.in/b2hsession
        │     ├── Card 4: Diet Routine → join.healthyday.co.in/diet  ← Telugu only
        │     └── YouTube: Yoga, Pranayama, Meditation, Yoga Nidra (Telugu IDs)
        │
        └── language === "English"
              ├── Card 1: Yoga Session (user link)
              ├── Card 2: Face Yoga → join.healthyday.co.in/healthyface_eng
              ├── Card 3: Breath to Heal → join.healthyday.co.in/b2hsession_eng
              └── YouTube: Yoga, Pranayama, Gratitude Meditation, Yoga Nidra (English IDs)
```
