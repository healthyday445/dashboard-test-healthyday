export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const res = await fetch(
    `https://support-cases-service-773381060399.asia-south1.run.app/support/update-student-batch`,
    {
      method: "POST",
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
