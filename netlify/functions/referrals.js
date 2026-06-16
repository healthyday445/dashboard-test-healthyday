export async function handler(event) {
  const { mobile, start_date, end_date } = event.queryStringParameters || {};
  if (!mobile) {
    return { statusCode: 400, body: JSON.stringify({ error: "mobile required" }) };
  }

  const params = new URLSearchParams({ mobile });
  if (start_date) params.set("start_date", start_date);
  if (end_date) params.set("end_date", end_date);

  const res = await fetch(
    `https://test-healthyday-backend-773381060399.asia-south1.run.app/api/internal/student/referrals?${params.toString()}`,
    { headers: { "X-API-KEY": "HDB@020205" } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
