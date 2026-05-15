/**
 * trackVisit — Fire-and-forget link-tracking call.
 *
 * Sends the current slug (mobile number / tracking param) to the
 * Netlify `track` function which logs it in the Supabase
 * `attendance_logs` table along with the visitor's IP and User-Agent.
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

  fetch("/.netlify/functions/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
  }).catch(() => {
    // Silently ignore — tracking must never break the dashboard
  });
}
