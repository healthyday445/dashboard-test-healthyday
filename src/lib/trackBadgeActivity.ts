import { safeLocalStorage } from "./storage";

export interface BadgeStatus {
  generated: boolean;
  name: string;
}

const getCookieKey = (mobile: string, level: number) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_badge_gen_${level}_${cleaned}` : `hd_badge_gen_${level}_anon`;
};

const getNameKey = (mobile: string, level: number) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_badge_name_${level}_${cleaned}` : `hd_badge_name_${level}_anon`;
};

// Separate from `generated` — marks that we've asked the server at least once for this
// mobile+level on this device, so a "not generated yet" answer only ever costs one network
// round trip instead of one per modal open.
const getCheckedKey = (mobile: string, level: number) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_badge_checked_${level}_${cleaned}` : `hd_badge_checked_${level}_anon`;
};

/**
 * Reads badge generation status from Browser Cookie + LocalStorage.
 */
export function getBadgeCookie(mobile: string, level: number): BadgeStatus & { checked: boolean } {
  const genKey = getCookieKey(mobile, level);
  const nameKey = getNameKey(mobile, level);
  const checkedKey = getCheckedKey(mobile, level);

  let generated = false;
  let name = "";
  let checked = false;

  // Check document.cookie
  if (typeof document !== "undefined" && document.cookie) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [k, ...vParts] = cookie.trim().split("=");
      const v = vParts.join("=");
      if (k === genKey && v === "true") generated = true;
      if (k === checkedKey && v === "true") checked = true;
      if (k === nameKey && v) {
        try {
          name = decodeURIComponent(v);
        } catch {
          name = v;
        }
      }
    }
  }

  // Fallback to safeLocalStorage
  if (!generated && safeLocalStorage.getItem(genKey) === "true") {
    generated = true;
  }
  if (!checked && safeLocalStorage.getItem(checkedKey) === "true") {
    checked = true;
  }
  if (!name) {
    name = safeLocalStorage.getItem(nameKey) || "";
  }

  return { generated, name, checked: checked || generated };
}

/**
 * Sets badge generation status in Browser Cookie (1 year expiration) + LocalStorage.
 */
export function setBadgeCookie(mobile: string, level: number, name: string): void {
  const genKey = getCookieKey(mobile, level);
  const nameKey = getNameKey(mobile, level);
  const checkedKey = getCheckedKey(mobile, level);
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  if (typeof document !== "undefined") {
    document.cookie = `${genKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
    document.cookie = `${nameKey}=${encodeURIComponent(name)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    document.cookie = `${checkedKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
  }

  safeLocalStorage.setItem(genKey, "true");
  safeLocalStorage.setItem(nameKey, name);
  safeLocalStorage.setItem(checkedKey, "true");
}

/**
 * Marks that we've asked the server once and confirmed no badge exists yet — without this,
 * a student who hasn't generated their badge would trigger a fresh server check every single
 * time they open the modal, which is exactly the slow path we're trying to avoid.
 */
export function setBadgeChecked(mobile: string, level: number): void {
  const checkedKey = getCheckedKey(mobile, level);
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  if (typeof document !== "undefined") {
    document.cookie = `${checkedKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
  }
  safeLocalStorage.setItem(checkedKey, "true");
}

/**
 * Checks server-side Firestore status for user's badge. Only ever called once per
 * mobile+level+device — see setBadgeChecked/getBadgeCookie's `checked` flag.
 */
export async function checkServerBadgeStatus(mobile: string, level: number): Promise<BadgeStatus | null> {
  if (!mobile) return null;
  const cleanMobile = mobile.replace(/[^0-9]/g, "");
  if (!cleanMobile) return null;

  try {
    const res = await fetch(`/.netlify/functions/badge-logs?mobile=${encodeURIComponent(cleanMobile)}&level=${level}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data) {
      return {
        generated: !!data.hasGenerated,
        name: data.name || "",
      };
    }
  } catch {
    // Silently fallback if network error occurs
  }
  return null;
}

/**
 * Logs user badge activity (generated, downloaded, shared) to Firestore.
 */
export async function trackBadgeActivity(params: {
  mobile: string;
  name: string;
  level: number;
  activity: "generated" | "downloaded" | "shared";
  shareType?: "general" | "whatsapp" | "status";
}): Promise<any> {
  const payload = {
    mobile: params.mobile,
    name: params.name,
    level: params.level,
    activity: params.activity,
    shareType: params.shareType || null,
    clientTime: new Date().toISOString(),
  };

  try {
    const res = await fetch("/.netlify/functions/badge-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Silently swallow error so analytics never interrupt user flow
  }
  return null;
}
