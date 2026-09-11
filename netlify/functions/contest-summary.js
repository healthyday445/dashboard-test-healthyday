export async function handler(event) {
  const contest_id = event.queryStringParameters?.contest_id;
  if (!contest_id) {
    return { statusCode: 400, body: JSON.stringify({ error: "contest_id required" }) };
  }

  const res = await fetch(
    `https://test-healthyday-backend-773381060399.asia-south1.run.app/api/internal/contest/summary?contest_id=${encodeURIComponent(contest_id)}`,
    { headers: { "X-API-KEY": "HDB@020205" } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
