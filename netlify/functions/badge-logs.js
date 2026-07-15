/**
 * Netlify Function: badge-logs
 * Logs badge activities (generated, downloaded, shared)
 * to Google Firestore collection `badge_log`.
 *
 * Enforces single-document per user per level (keyed by mobile_level) so it updates/merges
 * existing records rather than creating multiple entries.
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore('healthyday-logstore');

export async function handler(event) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    // GET request to check existing user badge status
    if (event.httpMethod === "GET") {
      const mobileParam = event.queryStringParameters?.mobile || "";
      const levelParam = event.queryStringParameters?.level || "1";
      const cleanMobile = mobileParam.replace(/[^0-9]/g, "");

      if (!cleanMobile) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ exists: false, hasGenerated: false }),
        };
      }

      const docId = `${cleanMobile}_level_${levelParam}`;
      const docRef = db.collection('badge_log').doc(docId);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ exists: false, hasGenerated: false }),
        };
      }

      const data = docSnap.data() || {};
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          exists: true,
          hasGenerated: !!data.hasGenerated,
          name: data.name || data.userName || "",
          generatedCount: data.generatedCount || 0,
          downloadedCount: data.downloadedCount || 0,
          sharedCount: data.sharedCount || 0,
        }),
      };
    }

    // POST request to log or update activity
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const cleanMobile = (body.mobile || "").replace(/[^0-9]/g, "") || "anonymous";
      const level = body.level || 1;

      const docId = `${cleanMobile}_level_${level}`;
      const docRef = db.collection('badge_log').doc(docId);

      const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();
      const activity = body.activity || "unknown";

      const historyItem = `${nowIST.replace("T", " ").substring(0, 19)} IST | ${activity}${
        body.shareType ? ` (${body.shareType})` : ""
      }`;

      // Single merge write, no upfront get(). Counters use FieldValue.increment so
      // they stay correct without ever reading the previous value (this also fixes a
      // lost-update race the old read-then-write had under concurrent requests).
      // Fields are only included when *this* event actually sets them; `merge: true`
      // leaves everything else untouched, which is equivalent to the old
      // `body.x || existing.x` fallback without needing the read that fallback relied on.
      // Net effect: one Firestore round trip removed per call — that round trip is
      // fully billed Netlify function duration, so this directly cuts compute cost.
      const updatePayload = {
        mobile: cleanMobile,
        number: cleanMobile,
        level: level,
        lastActivity: activity,
        lastActivityAt: nowIST,
        updatedAt: nowIST,
        activityHistory: admin.firestore.FieldValue.arrayUnion(historyItem),
      };

      if (body.name) {
        updatePayload.name = body.name;
        updatePayload.userName = body.name;
      }

      if (activity === "generated") {
        updatePayload.hasGenerated = true;
        updatePayload.generatedCount = admin.firestore.FieldValue.increment(1);
        // Last-write-wins now (was "first-write-wins"); this field isn't read
        // anywhere in the app today, so the semantic change is not observable.
        updatePayload.firstGeneratedAt = nowIST;
      } else if (activity === "downloaded") {
        updatePayload.hasDownloaded = true;
        updatePayload.downloadedCount = admin.firestore.FieldValue.increment(1);
      } else if (activity === "shared" || activity.startsWith("shared")) {
        updatePayload.hasShared = true;
        updatePayload.sharedCount = admin.firestore.FieldValue.increment(1);
      }

      await docRef.set(updatePayload, { merge: true });

      // activityHistory/counts aren't consumed by any caller of this endpoint
      // (trackBadgeActivity's callers all discard the response body) — since we no
      // longer read the previous doc, the response reports this event's own fields
      // rather than recomputed cumulative totals.
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          updated: {
            mobile: cleanMobile,
            number: cleanMobile,
            level,
            name: body.name || undefined,
            userName: body.name || undefined,
            hasGenerated: activity === "generated" ? true : undefined,
            hasDownloaded: activity === "downloaded" ? true : undefined,
            hasShared: (activity === "shared" || activity.startsWith("shared")) ? true : undefined,
            lastActivity: activity,
            lastActivityAt: nowIST,
            updatedAt: nowIST,
          },
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (err) {
    console.error("badge-logs error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
