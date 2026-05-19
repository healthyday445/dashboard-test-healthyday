/**
 * Netlify Function: track
 * Logs link visits to Google Firestore `portal_link_clicks` collection.
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Service Account Credentials (loaded from environment variable to prevent secret leaks)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Access the specific named database
const db = getFirestore('healthyday-logstore');

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

    // Extract visitor IP from headers
    const ip =
      event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      event.headers["client-ip"] ||
      event.headers["x-real-ip"] ||
      "unknown";

    // Raw payload dump: everything from the request body + IP + timestamp
    const payload = {
      ...body,
      ip,
      timestamp: new Date().toISOString(),
    };

    // Save as a new auto-ID document in portal_link_clicks
    await db.collection('portal_link_clicks').add(payload);

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
