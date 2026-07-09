import { safeLocalStorage } from "./storage";

export interface CertificateStatus {
  generated: boolean;
  name: string;
}

const getCookieKey = (mobile: string) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_cert_gen_${cleaned}` : "hd_cert_gen_anon";
};

const getNameKey = (mobile: string) => {
  const cleaned = (mobile || "").replace(/[^0-9]/g, "");
  return cleaned ? `hd_cert_name_${cleaned}` : "hd_cert_name_anon";
};

/**
 * Reads certificate generation status from Browser Cookie + LocalStorage.
 */
export function getCertificateCookie(mobile: string): CertificateStatus {
  const genKey = getCookieKey(mobile);
  const nameKey = getNameKey(mobile);

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
 * Sets certificate generation status in Browser Cookie (1 year expiration) + LocalStorage.
 */
export function setCertificateCookie(mobile: string, name: string): void {
  const genKey = getCookieKey(mobile);
  const nameKey = getNameKey(mobile);
  const maxAge = 60 * 60 * 24 * 365; // 1 year

  if (typeof document !== "undefined") {
    document.cookie = `${genKey}=true; max-age=${maxAge}; path=/; SameSite=Lax`;
    document.cookie = `${nameKey}=${encodeURIComponent(name)}; max-age=${maxAge}; path=/; SameSite=Lax`;
  }

  safeLocalStorage.setItem(genKey, "true");
  safeLocalStorage.setItem(nameKey, name);
}

/**
 * Checks server-side Firestore status for user's certificate.
 */
export async function checkServerCertificateStatus(mobile: string): Promise<CertificateStatus | null> {
  if (!mobile) return null;
  const cleanMobile = mobile.replace(/[^0-9]/g, "");
  if (!cleanMobile) return null;

  try {
    const res = await fetch(`/.netlify/functions/certificate-logs?mobile=${encodeURIComponent(cleanMobile)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.exists) {
      return {
        generated: !!data.hasGenerated,
        name: data.name || "",
      };
    }
  } catch {
    // Silently fallback to client-side cookie/storage
  }
  return null;
}

/**
 * Logs user certificate activity (generated, downloaded, shared) to Firestore.
 */
export function trackCertificateActivity(params: {
  mobile: string;
  name: string;
  activity: "generated" | "downloaded" | "shared";
  shareType?: "general" | "whatsapp" | "status";
  daysAttended?: number | null;
}): void {
  const payload = {
    mobile: params.mobile,
    name: params.name,
    activity: params.activity,
    shareType: params.shareType || null,
    daysAttended: params.daysAttended ?? null,
    clientTime: new Date().toISOString(),
  };

  fetch("/.netlify/functions/certificate-logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently swallow error so analytics never interrupt user flow
  });
}
