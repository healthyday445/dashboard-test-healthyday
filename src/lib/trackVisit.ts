/**
 * trackVisit — Fire-and-forget link-tracking call.
 *
 * Sends the current slug (mobile number / tracking param) to the
 * Netlify `track` function, which logs it in Firestore `portal_link_clicks`
 * along with rich browser/device/session context.
 *
 * - Deduplicates per session so a page reload doesn't create multiple rows.
 * - Silently swallows errors so tracking never blocks the user experience.
 */

const TRACKED_KEY = "hd_visit_tracked";

export function trackVisit(slug: string): void {
  // Skip if already tracked in this browser session
  const alreadyTracked = sessionStorage.getItem(TRACKED_KEY);
  if (alreadyTracked === slug) return;

  // Mark immediately to avoid duplicate fire on React re-renders
  sessionStorage.setItem(TRACKED_KEY, slug);

  // Collect all browser-available context
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;

  const payload = {
    // Core identifier
    slug,

    // Page context
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || null,

    // Device & browser
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,

    // Timezone
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    // Network (available in Chrome/Android, undefined elsewhere)
    connectionType: nav.connection?.effectiveType ?? null,
    downlink: nav.connection?.downlink ?? null,

    // Client-side timestamp (server will also add its own)
    clientTime: new Date().toISOString(),
  };

  fetch("/.netlify/functions/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently ignore — tracking must never break the dashboard
  });
}
