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
    const slug = body.slug;

    if (!slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "slug is required" }),
      };
    }

    // Prepare mobile number (ensure it has a '+' sign if it's purely digits)
    let mobile = slug.replace(/[\s\-\(\)]/g, ''); // strip spaces and dashes
    if (/^\d{10}$/.test(mobile)) {
      mobile = '+91' + mobile;
    } else if (/^\d+$/.test(mobile)) {
      mobile = '+' + mobile;
    } else if (!mobile.startsWith('+')) {
      mobile = '+' + mobile.replace(/[^\d]/g, '');
    }

    // Get current date in YYYY-MM-DD
    const dateObj = new Date();
    // Extract YYYY-MM-DD in local time using string splitting
    // Since serverless functions might be in UTC, we can use UTC offset or standard ISO format
    // A robust way to get YYYY-MM-DD in UTC (or based on standard format)
    const dateStr = dateObj.toISOString().split('T')[0];

    // Document ID: <mobile_number_with_plus_sign_and_acountry_code>_YYYY-MM-DD
    const docId = `${mobile}_${dateStr}`;

    // Extract visitor info from headers
    const ip =
      event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      event.headers["client-ip"] ||
      event.headers["x-real-ip"] ||
      "unknown";

    // Event payload: Include original body plus the extracted IP
    const eventPayload = {
      ...body,
      ip
    };

    // Reference to the document
    const docRef = db.collection('portal_link_clicks').doc(docId);

    // Update with arrayUnion or create if not exists
    await docRef.set({
      mobile: mobile,
      date: dateStr,
      clicks: admin.firestore.FieldValue.arrayUnion(eventPayload)
    }, { merge: true });

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
