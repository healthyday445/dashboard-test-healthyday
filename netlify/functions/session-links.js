export async function handler() {
  const res = await fetch(
    "https://healthyday-backend-v2-773381060399.asia-south1.run.app/api/internal/session-link/active",
    { headers: { "X-API-KEY": "HDB@020205" } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
