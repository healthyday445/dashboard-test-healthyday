/**
 * Netlify Function: portal-session-clicks
 * Logs session JOIN clicks (free + paid) to Google Firestore `portal_session_clicks` collection.
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

    // Server-authoritative time (IST), independent of the client's clock
    const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    const date = nowIST.toISOString().split("T")[0]; // YYYY-MM-DD

    await db.collection('portal_session_clicks').add({
      ...body,
      date,
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
