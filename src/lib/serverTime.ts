const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

let driftMs = 0;

/** Fetches server epoch time once and caches the drift vs this device's clock.
 *  Call as early as possible (e.g. app mount); safe to call multiple times. */
export async function syncServerTime(): Promise<void> {
  try {
    const res = await fetch("/.netlify/functions/server-time");
    const { epochMs } = await res.json();
    driftMs = epochMs - Date.now();
  } catch {
    driftMs = 0;
  }
}

/** Current IST time, corrected for this device's clock drift from the server. */
export function getNowIST(): Date {
  return new Date(Date.now() + driftMs + IST_OFFSET_MS);
}
