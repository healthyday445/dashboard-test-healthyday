export async function handler(event) {
  const { contest_id, mobile } = event.queryStringParameters || {};
  if (!contest_id || !mobile) {
    return { statusCode: 400, body: JSON.stringify({ error: "contest_id and mobile required" }) };
  }

  const params = new URLSearchParams({ contest_id, mobile });

  const res = await fetch(
    `https://test-healthyday-backend-773381060399.asia-south1.run.app/api/internal/contest/rank?${params.toString()}`,
    { headers: { "X-API-KEY": "HDB@020205" } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
