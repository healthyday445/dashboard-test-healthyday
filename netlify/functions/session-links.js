export async function handler(event) {
  const { date, time } = event.queryStringParameters || {};
  const qs = new URLSearchParams();
  if (date) qs.set("date", date);
  if (time) qs.set("time", time);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";

  const res = await fetch(
    `https://healthyday-backend-v2-773381060399.asia-south1.run.app/api/internal/session-link/active${suffix}`,
    { headers: { "X-API-KEY": "HDB@020205" } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: {
      "Content-Type": "application/json",
      "Netlify-CDN-Cache-Control": "public, max-age=1800, stale-while-revalidate=600",
      "Cache-Tag": date || time ? `session-links-${date || "today"}-${time || "now"}` : "session-links",
    },
    body,
  };
}
