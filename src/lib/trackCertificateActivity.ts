import { safeLocalStorage } from "./storage";

export interface CertificateStatus {
  generated: boolean;
  name: string;
  firstGeneratedAt?: string | null;
}

const getCookieKey = (mobile: string) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_cert_gen_${cleaned}` : "hd_cert_gen_anon";
};

const getNameKey = (mobile: string) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_cert_name_${cleaned}` : "hd_cert_name_anon";
};

const getDateKey = (mobile: string) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_cert_date_${cleaned}` : "hd_cert_date_anon";
};

// Separate from `generated` — marks that we've asked the server at least once for this
// mobile on this device, so a "not generated yet" answer only ever costs one network round
// trip instead of one per modal/page open.
const getCheckedKey = (mobile: string) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_cert_checked_${cleaned}` : "hd_cert_checked_anon";
};

/**
 * Reads certificate generation status from Browser Cookie + LocalStorage.
 */
export function getCertificateCookie(mobile: string): CertificateStatus & { checked: boolean } {
  const genKey = getCookieKey(mobile);
  const nameKey = getNameKey(mobile);
  const checkedKey = getCheckedKey(mobile);
  const dateKey = getDateKey(mobile);

  let generated = false;
  let name = "";
  let checked = false;
  let firstGeneratedAt: string | null = null;

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
      if (k === dateKey && v) {
        try {
          firstGeneratedAt = decodeURIComponent(v);
        } catch {
          firstGeneratedAt = v;
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
  if (!firstGeneratedAt) {
    firstGeneratedAt = safeLocalStorage.getItem(dateKey) || null;
  }

  return { generated, name, firstGeneratedAt, checked: checked || generated };
}

/**
 * Sets certificate generation status in Browser Cookie (1 year expiration) + LocalStorage.
 */
export function setCertificateCookie(mobile: string, name: string, firstGeneratedAt?: string | null): void {
  const genKey = getCookieKey(mobile);
  const nameKey = getNameKey(mobile);
  const checkedKey = getCheckedKey(mobile);
  const dateKey = getDateKey(mobile);
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  if (typeof document !== "undefined") {
    document.cookie = `${genKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
    document.cookie = `${nameKey}=${encodeURIComponent(name)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    document.cookie = `${checkedKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
    if (firstGeneratedAt) {
      document.cookie = `${dateKey}=${encodeURIComponent(firstGeneratedAt)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    }
  }

  safeLocalStorage.setItem(genKey, "true");
  safeLocalStorage.setItem(nameKey, name);
  safeLocalStorage.setItem(checkedKey, "true");
  if (firstGeneratedAt) {
    safeLocalStorage.setItem(dateKey, firstGeneratedAt);
  }
}

/**
 * Marks that we've asked the server once and confirmed no certificate exists yet — without
 * this, a student who hasn't generated their certificate would trigger a fresh server check
 * every single time they open the modal/page, which is exactly the slow path we're avoiding.
 */
export function setCertificateChecked(mobile: string): void {
  const checkedKey = getCheckedKey(mobile);
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  if (typeof document !== "undefined") {
    document.cookie = `${checkedKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
  }
  safeLocalStorage.setItem(checkedKey, "true");
}

/**
 * Checks server-side Firestore status for user's certificate. Only ever called once per
 * mobile+device — see setCertificateChecked/getCertificateCookie's `checked` flag.
 */
export async function checkServerCertificateStatus(mobile: string): Promise<CertificateStatus | null> {
  if (!mobile) return null;
  const cleanMobile = mobile.replace(/[^0-9]/g, "");
  if (!cleanMobile) return null;

  try {
    const res = await fetch(`/.netlify/functions/certificate-logs?mobile=${encodeURIComponent(cleanMobile)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data) {
      return {
        generated: !!data.hasGenerated,
        name: data.name || "",
        firstGeneratedAt: data.firstGeneratedAt || null,
      };
    }
  } catch {
    // Silently fallback if network error occurs
  }
  return null;
}

/**
 * Logs user certificate activity (generated, downloaded, shared) to Firestore (analytics only).
 */
export async function trackCertificateActivity(params: {
  mobile: string;
  name: string;
  activity: "generated" | "downloaded" | "shared";
  shareType?: "general" | "whatsapp" | "status";
  daysAttended?: number | null;
}): Promise<any> {
  const payload = {
    mobile: params.mobile,
    name: params.name,
    activity: params.activity,
    shareType: params.shareType || null,
    daysAttended: params.daysAttended ?? null,
    clientTime: new Date().toISOString(),
  };

  try {
    const res = await fetch("/.netlify/functions/certificate-logs", {
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
