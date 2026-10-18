// How long a history entry (and its resolved stream URLs) is trusted before we hit the API again.
export const HISTORY_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours

// How long one Turnstile verification is reused client-side.
// The worker's session JWT `expiresIn` must be >= this, otherwise the worker's expiry wins.
export const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Cloudflare Worker that verifies Turnstile, issues sessions and proxies the resolver APIs.
export const WORKER_BASE =
  process.env.NEXT_PUBLIC_WORKER_URL || "https://player.terabro.workers.dev";
