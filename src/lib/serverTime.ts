const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

let driftMs = 0;
let synced = false;

/** Fetches server epoch time once and caches the drift vs this device's clock.
 *  Call as early as possible (e.g. app mount) and await it before rendering,
 *  so session-live checks never run against an unverified device clock. */
export async function syncServerTime(): Promise<void> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch("/.netlify/functions/server-time", { signal: controller.signal });
    clearTimeout(timeout);
    const { epochMs } = await res.json();
    driftMs = epochMs - Date.now();
    synced = true;
  } catch (err) {
    driftMs = 0;
    synced = false;
    console.error("syncServerTime failed, falling back to device clock:", err);
  }
}

/** Current IST time, corrected for this device's clock drift from the server. */
export function getNowIST(): Date {
  return new Date(Date.now() + driftMs + IST_OFFSET_MS);
}

/** This device's clock drift vs the server, in ms (0 if never synced or sync failed). */
export function getDriftMs(): number {
  return driftMs;
}

/** Whether the last syncServerTime() call actually succeeded. */
export function isServerTimeSynced(): boolean {
  return synced;
}
