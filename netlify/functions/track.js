/**
 * Netlify Function: track
 * Logs link visits to the Supabase `attendance_logs` table.
 *
 * POST /.netlify/functions/track
 * Body: { "slug": "919110378176" }
 *
 * The function captures the visitor's IP and User-Agent from request headers
 * and inserts a row into the `attendance_logs` table.
 */

const SUPABASE_URL = "https://opmezoyalvcqdezxcexw.supabase.co";
const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbWV6b3lhbHZjcWRlenhjZXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTEwNTM5NywiZXhwIjoyMDg2NjgxMzk3fQ.NsHxI8HIxlA6DOr-TlITTugIIPX-PMARqaglMJ7u4Ug";

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const slug = body.slug;

    if (!slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "slug is required" }),
      };
    }

    // Extract visitor info from headers
    const ip =
      event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      event.headers["client-ip"] ||
      event.headers["x-real-ip"] ||
      "unknown";

    const userAgent = event.headers["user-agent"] || "unknown";

    // Insert into Supabase via REST API (no SDK needed in serverless)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/attendance_logs`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        slug,
        ip,
        user_agent: userAgent,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase insert error:", res.status, errText);
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to log visit", detail: errText }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Track function error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
