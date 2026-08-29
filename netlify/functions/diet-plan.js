export async function handler(event) {
  const date = event.queryStringParameters?.date;
  const language = event.queryStringParameters?.language;
  if (!date || !language) {
    return { statusCode: 400, body: JSON.stringify({ error: "date and language required" }) };
  }

  const res = await fetch(
    `https://healthyday-backend-v2-ct564dkwba-el.a.run.app/api/internal/diet-plan?date=${encodeURIComponent(date)}&language=${encodeURIComponent(language)}`,
    { headers: { "X-API-KEY": process.env.INTERNAL_API_KEY } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: { "Content-Type": "application/json" },
    body,
  };
}
