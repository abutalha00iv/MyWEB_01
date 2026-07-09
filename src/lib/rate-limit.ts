// Minimal in-memory rate limiter for the admin login route.
//
// Limitation: state lives in process memory, so it resets on cold start and
// is per-instance on serverless platforms (e.g. Vercel). That's an
// acceptable basic guard against casual brute-forcing for a single-admin
// site; for stronger guarantees, swap this for a persistent store (Upstash
// Redis, etc.) keyed the same way.

const attempts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 8;

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true };
}

export function resetRateLimit(key: string): void {
  attempts.delete(key);
}
