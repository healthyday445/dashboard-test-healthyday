export async function handler(event) {
  const { start_date, end_date, page, page_size } = event.queryStringParameters || {};

  const params = new URLSearchParams();
  if (start_date) params.set("start_date", start_date);
  if (end_date) params.set("end_date", end_date);
  if (page) params.set("page", page);
  if (page_size) params.set("page_size", page_size);

  const url = `https://test-healthyday-backend-773381060399.asia-south1.run.app/api/internal/referrals/leaderboard?${params.toString()}`;
  const res = await fetch(url, { headers: { "X-API-KEY": "HDB@020205" } });

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
