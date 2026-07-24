export async function handler(event) {
  if (event.httpMethod !== "PATCH") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const res = await fetch(
    `https://healthyday-backend-v2-773381060399.asia-south1.run.app/api/internal/student/attendance`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.INTERNAL_API_KEY || "HDB@020205"
      },
      body: event.body
    }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
