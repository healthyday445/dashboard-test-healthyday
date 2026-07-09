/**
 * Netlify Function: certificate-logs
 * Logs completion certificate activities (generated, downloaded, shared)
 * to Google Firestore collection `certificate logs` (and mirrors `certificate_logs`).
 *
 * Enforces single-document per user (keyed by mobile number) so it updates/merges
 * existing records rather than creating multiple entries.
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

const storageBucket =
  process.env.FIREBASE_STORAGE_BUCKET ||
  (serviceAccount ? `${serviceAccount.project_id}.appspot.com` : undefined);

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket,
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
    // GET request to check existing user certificate status (for rate limiting & name locking)
    if (event.httpMethod === "GET") {
      const mobileParam = event.queryStringParameters?.mobile || "";
      const cleanMobile = mobileParam.replace(/[^0-9]/g, "");

      if (!cleanMobile) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ exists: false, hasGenerated: false }),
        };
      }

      const docRef = db.collection('certificate logs').doc(cleanMobile);
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
          certificateUrl: data.certificateUrl || null,
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

      const docRef = db.collection('certificate logs').doc(cleanMobile);

      const docSnap = await docRef.get();
      const existing = docSnap.exists ? docSnap.data() : {};

      const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();

      const activity = body.activity || "unknown";
      const isGenerated = activity === "generated" || existing.hasGenerated === true;
      const isDownloaded = activity === "downloaded" || existing.hasDownloaded === true;
      const isShared = activity === "shared" || activity.startsWith("shared") || existing.hasShared === true;

      const generatedCount = activity === "generated"
        ? (existing.generatedCount || 0) + 1
        : (existing.generatedCount || 0);
      const downloadedCount = activity === "downloaded"
        ? (existing.downloadedCount || 0) + 1
        : (existing.downloadedCount || 0);
      const sharedCount = activity === "shared" || activity.startsWith("shared")
        ? (existing.sharedCount || 0) + 1
        : (existing.sharedCount || 0);

      const historyItem = `${nowIST.replace("T", " ").substring(0, 19)} IST | ${activity}${
        body.shareType ? ` (${body.shareType})` : ""
      }`;
      const prevHistory = Array.isArray(existing.activityHistory) ? existing.activityHistory : [];
      const activityHistory = [historyItem, ...prevHistory].slice(0, 25);

      let certificateUrl = existing.certificateUrl || null;

      if (body.imageBase64 && admin.apps.length) {
        try {
          const bucket = getStorage().bucket(storageBucket);
          const fileName = `certificates/${cleanMobile}.jpg`;
          const file = bucket.file(fileName);
          const base64Data = body.imageBase64.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, "base64");

          await file.save(buffer, {
            metadata: {
              contentType: "image/jpeg",
              cacheControl: "public, max-age=31536000",
            },
          });

          try {
            await file.makePublic();
          } catch (pubErr) {
            // Uniform bucket-level access might be enabled
          }

          certificateUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        } catch (storageErr) {
          console.error("Firebase Storage upload error:", storageErr);
        }
      }

      const updatePayload = {
        mobile: cleanMobile,
        number: cleanMobile,
        name: body.name || existing.name || existing.userName || "Student",
        userName: body.name || existing.userName || existing.name || "Student",
        daysAttended:
          body.daysAttended !== undefined && body.daysAttended !== null
            ? body.daysAttended
            : existing.daysAttended || null,

        hasGenerated: isGenerated,
        hasDownloaded: isDownloaded,
        hasShared: isShared,
        certificateUrl: certificateUrl || existing.certificateUrl || null,

        generatedCount,
        downloadedCount,
        sharedCount,

        lastActivity: activity,
        lastActivityAt: nowIST,
        activityHistory,
        updatedAt: nowIST,
      };

      if (activity === "generated" && !existing.firstGeneratedAt) {
        updatePayload.firstGeneratedAt = nowIST;
      }

      await docRef.set(updatePayload, { merge: true });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          updated: updatePayload,
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (err) {
    console.error("certificate-logs error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
