export async function handler(event) {
  const mobile = event.queryStringParameters?.mobile;
  if (!mobile) {
    return { statusCode: 400, body: JSON.stringify({ error: "mobile required" }) };
  }

  const res = await fetch(
    `https://healthyday-backend-773381060399.asia-south1.run.app/api/internal/student/referrals?mobile=${encodeURIComponent(mobile)}`,
    { headers: { "X-API-KEY": "HDB@020205" } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
