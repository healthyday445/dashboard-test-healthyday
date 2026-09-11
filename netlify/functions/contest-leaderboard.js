export async function handler(event) {
  const { contest_id, page, page_size } = event.queryStringParameters || {};
  if (!contest_id) {
    return { statusCode: 400, body: JSON.stringify({ error: "contest_id required" }) };
  }

  const params = new URLSearchParams({ contest_id });
  if (page) params.set("page", page);
  if (page_size) params.set("page_size", page_size);

  const url = `https://test-healthyday-backend-773381060399.asia-south1.run.app/api/internal/contest/leaderboard?${params.toString()}`;
  const res = await fetch(url, { headers: { "X-API-KEY": "HDB@020205" } });

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: {
      "Content-Type": "application/json",
      "Netlify-CDN-Cache-Control": "public, max-age=1800, stale-while-revalidate=900",
      "Cache-Tag": "contest-leaderboard",
    },
    body,
  };
}
