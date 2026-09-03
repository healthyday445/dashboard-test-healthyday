import { useQuery } from "@tanstack/react-query";

/** Thrown on a non-ok response — carries `status` so a page that needs to special-case a
 *  particular status (e.g. a custom 404 message) can, without re-implementing the fetch. */
export class StudentFetchError extends Error {
  constructor(public status: number) {
    super(`student API error: ${status}`);
    this.name = "StudentFetchError";
  }
}

async function fetchStudent(mobile: string) {
  // Every existing call site sends the student API a "+"-prefixed number (`+${mobile}`) —
  // centralized here so callers just pass the bare digits they already have.
  const apiMobile = `+${mobile}`;
  const res = await fetch(`/.netlify/functions/student?mobile=${encodeURIComponent(apiMobile)}`);
  if (!res.ok) throw new StudentFetchError(res.status);
  return res.json();
}

/** Shared, cached fetch for the logged-in student's record, keyed by `mobile` (bare digits,
 *  no "+") — every page that needs it was independently re-fetching the same data on every
 *  navigation. Pass `enabled: false` when a page is using a canned/preview object instead
 *  (this hook has no opinion on preview modes — those differ per page and stay page-local).
 *  `staleTime` matches the diet feature's queries: student data doesn't change mid-session,
 *  so revisiting a page shouldn't refetch it. */
export function useStudentData(mobile: string, enabled = true) {
  return useQuery({
    queryKey: ["student", mobile],
    queryFn: () => fetchStudent(mobile),
    enabled: enabled && !!mobile,
    staleTime: 5 * 60 * 1000,
  });
}
