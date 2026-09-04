export async function handler(event) {
  const mealId = event.queryStringParameters?.meal_id;
  if (!mealId) {
    return { statusCode: 400, body: JSON.stringify({ error: "meal_id required" }) };
  }

  const res = await fetch(
    `https://healthyday-backend-v2-ct564dkwba-el.a.run.app/api/internal/diet-meal?meal_id=${encodeURIComponent(mealId)}`,
    { headers: { "X-API-KEY": process.env.INTERNAL_API_KEY } }
  );

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: {
      "Content-Type": "application/json",
      "Netlify-CDN-Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      "Cache-Tag": `diet-meal-${mealId}`,
    },
    body,
  };
}
