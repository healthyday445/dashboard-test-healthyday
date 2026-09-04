/**
 * trackSessionClick — Fire-and-forget log of live session JOIN clicks.
 *
 * Sends the mobile number and the clicked session's code to the Netlify
 * `portal-session-clicks` function, which logs it in Firestore `portal_session_clicks`.
 * Fires for both free and paid students, every click — no dedup.
 *
 * `source` distinguishes a live "Join Session" click from a recordings-page click,
 * since both funnel into the same collection.
 */

export function trackSessionClick(
  slug: string | undefined,
  sessionCode: string,
  source: "join_button" | "recording" = "join_button"
): void {
  if (!slug) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;

  const payload = {
    slug,
    sessionCode,
    source,

    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || null,

    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,

    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    connectionType: nav.connection?.effectiveType ?? null,
    downlink: nav.connection?.downlink ?? null,

    clientTime: new Date().toISOString(),
  };

  fetch("/.netlify/functions/portal-session-clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently ignore — tracking must never break the dashboard
  });
}
