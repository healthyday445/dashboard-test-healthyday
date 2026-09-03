import { useQuery } from "@tanstack/react-query";
import { getCurrentMinutesIST } from "@/lib/utils";

export interface SessionLink {
  session_code?: string;
  language?: string;
  link?: string;
  session_name?: string;
  [key: string]: unknown;
}

interface UseSessionLinksOptions {
  /** `?previewSnDate=YYYY-MM-DD` (SN Challenge QA preview) — forwarded to the backend's
   *  `date` param so `/session-link/active` returns links "as of" that date instead of
   *  real today. */
  previewSnDate?: string | null;
  /** This app's own `?time=` param, in its "8.00am"-style format — converted to the
   *  backend's "HH:MM" IST before sending, same as every existing call site did. */
  time?: string | null;
}

// Handles every response shape seen across the existing call sites: a bare array, or a
// wrapped `{ data: [...] }` / `{ links: [...] }` object.
function normalizeSessionLinks(data: unknown): SessionLink[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as SessionLink[];
    if (Array.isArray(obj.links)) return obj.links as SessionLink[];
  }
  return [];
}

function toBackendTime(time: string): string {
  const totalMin = getCurrentMinutesIST(time);
  const hh = String(Math.floor(totalMin / 60) % 24).padStart(2, "0");
  const mm = String(totalMin % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

async function fetchSessionLinks(previewSnDate: string | null, backendTime: string | null): Promise<SessionLink[]> {
  const qs = new URLSearchParams();
  if (previewSnDate) qs.set("date", previewSnDate);
  if (backendTime) qs.set("time", backendTime);
  const url = `/.netlify/functions/session-links${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`session-links API error: ${res.status}`);
  return normalizeSessionLinks(await res.json());
}

export interface UseSessionLinksResult {
  sessionLinks: SessionLink[];
  /** True until the first fetch settles (success or failure) — several callers gate a
   *  loading skeleton on this, matching each page's old `sessionLinksLoaded` state. */
  isLoading: boolean;
}

/** Shared, cached fetch for session/class links — 6 pages were independently re-fetching
 *  this same (mostly-identical) list on every navigation. Two pages need it filtered by a
 *  QA-preview `date`/`time`; the rest call it with no params — both are the same query
 *  key shape, just with `null`s when unused, so they still share one cache entry when the
 *  params genuinely match. */
export function useSessionLinks(options: UseSessionLinksOptions = {}): UseSessionLinksResult {
  const previewSnDate = options.previewSnDate ?? null;
  const backendTime = options.time ? toBackendTime(options.time) : null;

  const query = useQuery({
    queryKey: ["session-links", previewSnDate, backendTime],
    queryFn: () => fetchSessionLinks(previewSnDate, backendTime),
    staleTime: 5 * 60 * 1000,
  });

  // Every existing call site treats a failed fetch as "no links yet" (falls back to
  // static links), not a distinct error state.
  return { sessionLinks: query.data ?? [], isLoading: query.isLoading };
}
