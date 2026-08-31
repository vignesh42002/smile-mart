// In-memory token bucket, keyed by IP. Good enough as an anti-spam stub for a
// single-instance deployment; a multi-instance production deployment should
// replace this with a shared store (e.g. Redis) — same call signature.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}
