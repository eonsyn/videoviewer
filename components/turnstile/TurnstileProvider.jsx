"use client";
import dynamic from "next/dynamic";
import { SESSION_TTL_MS, WORKER_BASE } from "@/lib/constants";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Dynamically import Turnstile to prevent Next.js SSR/Hydration errors
const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((mod) => mod.Turnstile),
  { ssr: false }
);

const STORAGE_KEY = "tvp_session_token";
const SESSION_ENDPOINT = `${WORKER_BASE}/session`;
const EXPIRY_SKIP_MS = 15_000; // treat tokens expiring within 15s as expired

// Cloudflare's always-passes testing key is used when no env var is configured.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

const TurnstileContext = createContext(null);

// Reads the `exp` claim (UI-side hint only — the worker is the real validator).
function isFresh(token) {
  if (!token || typeof token !== "string") return false;
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    const { exp } = JSON.parse(json);
    if (!exp) return true; // no exp claim: let the server decide
    return exp * 1000 - Date.now() > EXPIRY_SKIP_MS;
  } catch {
    return false;
  }
}

// Stored as { token, verifiedAt } so the 30-minute window is ours, independent of the JWT.
function readStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { token, verifiedAt } = JSON.parse(raw);
    const withinWindow = Date.now() - Number(verifiedAt) < SESSION_TTL_MS;
    return withinWindow && isFresh(token) ? { token, verifiedAt } : null;
  } catch {
    return null;
  }
}

function writeStored(session) {
  try {
    if (session) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* sessionStorage unavailable — keep it in memory only */
  }
}

function isValid(session) {
  return !!session
    && Date.now() - session.verifiedAt < SESSION_TTL_MS
    && isFresh(session.token);
}

export function TurnstileProvider({ children }) {
  const [sessionToken, setSessionToken] = useState(null);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);
  const [challengeError, setChallengeError] = useState(null);

  const sessionRef = useRef(null);     // { token, verifiedAt } — always-current copy for async callers
  const pendingRef = useRef(null);     // shared in-flight { promise, resolve, reject }

  // Restore a still-valid session after reload / client navigation.
  useEffect(() => {
    const stored = readStored();
    if (stored) {
      sessionRef.current = stored;
      setSessionToken(stored.token);
    }
  }, []);

  const storeToken = useCallback((token) => {
    const session = token ? { token, verifiedAt: Date.now() } : null;
    sessionRef.current = session;
    setSessionToken(token);
    writeStored(session);
  }, []);

  // Drop the session (e.g. worker answered 401). Next ensureSession() re-challenges.
  const invalidateSession = useCallback(() => {
    storeToken(null);
  }, [storeToken]);

  // Resolves with a valid session token, showing the Turnstile widget only if needed.
  // Concurrent callers share one challenge.
  const ensureSession = useCallback(() => {
    const current = isValid(sessionRef.current) ? sessionRef.current : readStored();
    if (current) {
      sessionRef.current = current;
      return Promise.resolve(current.token);
    }
    if (pendingRef.current) return pendingRef.current.promise;

    let resolve, reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    pendingRef.current = { promise, resolve, reject };
    setChallengeError(null);
    setWidgetKey((k) => k + 1);
    setChallengeOpen(true);
    return promise;
  }, []);

  const failChallenge = useCallback((message) => {
    // Keep the widget open with a fresh challenge so the user can retry.
    setChallengeError(message);
    setWidgetKey((k) => k + 1);
  }, []);

  const handleTurnstileSuccess = useCallback(async (rawToken) => {
    try {
      const res = await fetch(SESSION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken: rawToken }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || `Verification failed (HTTP ${res.status})`);
      }
      const data = await res.json();
      const token = data?.sessionToken;
      if (!token) throw new Error("Verification failed: no session token returned");

      storeToken(token);
      setChallengeError(null);
      setChallengeOpen(false);
      const pending = pendingRef.current;
      pendingRef.current = null;
      pending?.resolve(token);
    } catch (e) {
      failChallenge(e?.message || "Verification failed. Please try again.");
    }
  }, [storeToken, failChallenge]);

  const value = useMemo(
    () => ({ sessionToken, ensureSession, invalidateSession, challengeOpen }),
    [sessionToken, ensureSession, invalidateSession, challengeOpen]
  );

  return (
    <TurnstileContext.Provider value={value}>
      {children}
      {challengeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Verify you are human"
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(6,9,16,0.82)", padding: "20px",
          }}
        >
          <div style={{
            background: "#0c1018", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px", padding: "24px", maxWidth: "360px", width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
          }}>
            <p style={{ color: "#c8d6e8", fontSize: "14px", margin: 0, textAlign: "center" }}>
              Quick check — verify once and watch as many videos as you like this session.
            </p>
            <Turnstile
              key={widgetKey}
              siteKey={SITE_KEY}
              onSuccess={handleTurnstileSuccess}
              onExpire={() => failChallenge("Captcha expired. Please verify again.")}
              onError={() => failChallenge("Captcha verification failed. Please try again.")}
            />
            {challengeError && (
              <p style={{ color: "#ef4444", fontSize: "14px", textAlign: "center", margin: 0 }}>
                {challengeError}
              </p>
            )}
          </div>
        </div>
      )}
    </TurnstileContext.Provider>
  );
}

export function useTurnstileSession() {
  const ctx = useContext(TurnstileContext);
  if (!ctx) throw new Error("useTurnstileSession must be used within <TurnstileProvider>");
  return ctx;
}
