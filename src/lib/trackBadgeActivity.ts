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

/**
 * Reads badge generation status from Browser Cookie + LocalStorage.
 */
export function getBadgeCookie(mobile: string, level: number): BadgeStatus {
  const genKey = getCookieKey(mobile, level);
  const nameKey = getNameKey(mobile, level);

  let generated = false;
  let name = "";

  // Check document.cookie
  if (typeof document !== "undefined" && document.cookie) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [k, ...vParts] = cookie.trim().split("=");
      const v = vParts.join("=");
      if (k === genKey && v === "true") generated = true;
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
  if (!name) {
    name = safeLocalStorage.getItem(nameKey) || "";
  }

  return { generated, name };
}

/**
 * Sets badge generation status in Browser Cookie (1 year expiration) + LocalStorage.
 */
export function setBadgeCookie(mobile: string, level: number, name: string): void {
  const genKey = getCookieKey(mobile, level);
  const nameKey = getNameKey(mobile, level);
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  if (typeof document !== "undefined") {
    document.cookie = `${genKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
    document.cookie = `${nameKey}=${encodeURIComponent(name)}; max-age=${maxAge}; path=/; SameSite=Lax`;
  }

  safeLocalStorage.setItem(genKey, "true");
  safeLocalStorage.setItem(nameKey, name);
}

/**
 * Checks server-side Firestore status for user's badge.
 */
export async function checkServerBadgeStatus(mobile: string, level: number): Promise<BadgeStatus | null> {
  if (!mobile) return null;
  const cleanMobile = mobile.replace(/[^0-9]/g, "");
  if (!cleanMobile) return null;

  try {
    const res = await fetch(`/.netlify/functions/badge-logs?mobile=${encodeURIComponent(cleanMobile)}&level=${level}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.exists) {
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
