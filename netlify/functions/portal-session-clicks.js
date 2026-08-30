/**
 * Netlify Function: portal-session-clicks
 * Logs session JOIN clicks (free + paid) to Google Firestore `portal_session_clicks` collection.
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { DateTime } from 'luxon';

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

    // Server-authoritative time (IST), independent of the client's clock
    const nowIST = DateTime.now().setZone("Asia/Kolkata");
    const date = nowIST.toISODate(); // YYYY-MM-DD

    await db.collection('portal_session_clicks').add({
      ...body,
      date,
      click_time_ist: nowIST.toISO(),
      click_time_utc: nowIST.toUTC().toISO(),
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("portal-session-clicks function error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
