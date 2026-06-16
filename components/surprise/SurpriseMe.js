"use client";

import { useEffect, useState } from "react";
import { Gift, X, Loader2, AlertCircle, CheckCircle2, PartyPopper, Sparkles, } from "lucide-react";

const STORAGE_KEY = "seen_surprises_cache";
const ONE_HOUR_MS = 60 * 60 * 1000;

export default function SurpriseMe({ token, variant = "full" }) {
  const [mounted, setMounted] = useState(false);
  const [availableSurprises, setAvailableSurprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [allWatched, setAllWatched] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (variant === "full") {
      const existingBanners = document.querySelectorAll(".surprise-me-fixed-banner-root");
      existingBanners.forEach((banner) => banner.remove());
    }
  }, [variant]);

  const getValidSeenItems = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const now = Date.now();
      const validSeen = {};
      let changed = false;
      for (const [surl, expiryTime] of Object.entries(stored)) {
        if (now < expiryTime) validSeen[surl] = expiryTime;
        else changed = true;
      }
      if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(validSeen));
      return Object.keys(validSeen);
    } catch {
      return [];
    }
  };

  const markAsSeen = (surl) => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      stored[surl] = Date.now() + ONE_HOUR_MS;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!token || !mounted) return;
    let isCurrent = true;
    let visibilityTimeout;

    const fetchData = async () => {
      try {
        setLoading(true);
        setAllWatched(false);
        const seed = Math.random().toString(36).substring(2) + Date.now();
        const res = await fetch("https://interestingapihai.netlify.app/api/secure/get-random", {
          method: "POST",
          headers: {
            "x-secure-token": token,
            "Content-Type": "application/json",
            "x-request-seed": seed,
          },
          body: JSON.stringify({ seed, ts: Date.now() }),
        });
        const json = await res.json();
        if (!isCurrent) return;
        const seenKeys = getValidSeenItems();
        const all = json.data || [];
        const shuffled = [...all].sort(() => Math.random() - 0.5);
        const filtered = shuffled.slice(0, 5).filter((i) => !seenKeys.includes(i.surl));
        if (all.length > 0 && filtered.length === 0) setAllWatched(true);
        setAvailableSurprises(filtered);
      } catch (err) {
        if (isCurrent) setError(err.message);
      } finally {
        if (isCurrent) {
          setLoading(false);
          visibilityTimeout = setTimeout(() => setIsVisible(true), 80);
        }
      }
    };

    fetchData();
    return () => {
      isCurrent = false;
      if (visibilityTimeout) clearTimeout(visibilityTimeout);
    };
  }, [token, mounted]);

  const handleDismiss = () => setIsVisible(false);

  const handleSurpriseClick = () => {
    if (availableSurprises.length === 0 || opening) return;
    const selected = availableSurprises[Math.floor(Math.random() * availableSurprises.length)];
    setOpening(true);
    setTimeout(() => {
      window.open(
        `https://terafetch.netlify.app/download?url=${encodeURIComponent(
          `https://terasharefile.com/s/1${selected.surl}`
        )}`,
        "_blank"
      );
      markAsSeen(selected.surl);
      const remaining = availableSurprises.filter((item) => item.surl !== selected.surl);
      setAvailableSurprises(remaining);
      if (remaining.length === 0) setAllWatched(true);
      setOpening(false);
      setOpened(true);
      setTimeout(() => setOpened(false), 1500);
    }, 600);
  };

  if (!mounted || !token) return null;

  const Dots = ({ count }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: i < count ? "var(--color-primary)" : "rgba(255,255,255,0.12)",
            border: i < count
              ? "1px solid rgba(79,141,245,0.5)"
              : "1px solid rgba(255,255,255,0.18)",
            transition: "all 0.35s cubic-bezier(0.34,1.4,0.64,1)",
            transform: i < count ? "scale(1)" : "scale(0.75)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );

  // ── Variant: Button (inside UrlError card) ──────────────────────────────────
  if (variant === "button") {
    const isEmpty = !loading && availableSurprises.length === 0;
    const isDisabled = loading || !!error || opening || isEmpty || allWatched;

    if (allWatched) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "1px solid rgba(45,212,164,0.2)",
            background: "rgba(45,212,164,0.05)",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PartyPopper size={14} style={{ color: "var(--color-green)" }} />
            <Dots count={0} />
            <PartyPopper size={14} style={{ color: "var(--color-green)" }} />
          </div>
          <span style={{
            fontSize: "10px",
            color: "var(--color-green)",
            opacity: 0.7,
            letterSpacing: "0.03em",
          }}>
            all caught up · check back later
          </span>
        </div>
      );
    }

    return (
      <button
        onClick={handleSurpriseClick}
        disabled={isDisabled}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px 20px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "var(--color-surface-2)",
          cursor: isDisabled ? "default" : "pointer",
          transition: "border-color 0.2s, background 0.2s, transform 0.1s",
          fontFamily: "inherit",
          opacity: loading ? 0.6 : 1,
          width: "100%",
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)";
            e.currentTarget.style.background = "var(--color-surface-3)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
          e.currentTarget.style.background = "var(--color-surface-2)";
        }}
        onMouseDown={(e) => {
          if (!isDisabled) e.currentTarget.style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* Icon row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {loading || opening ? (
            <Loader2 size={15} className="spin" style={{ color: "var(--color-muted)" }} />
          ) : opened ? (
            <CheckCircle2 size={15} style={{ color: "var(--color-green)" }} />
          ) : error ? (
            <AlertCircle size={15} style={{ color: "var(--color-red)" }} />
          ) : (
            <Gift size={15} style={{ color: "var(--color-primary)" }} />
          )}

          {/* Minimal label */}
          <span style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--color-subtle)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}>
            {loading
              ? "loading..."
              : opening
              ? "opening..."
              : opened
              ? "enjoy!"
              : error
              ? "unavailable"
              : availableSurprises.length === 1
              ? "1 surprise"
              : `${availableSurprises.length} surprises`}
          </span>

          {/* 18+ badge */}
          {!loading && !error && !opened && (
            <span style={{
              fontSize: "9px",
              fontWeight: 600,
              color: "var(--color-amber)",
              background: "rgba(245,166,35,0.1)",
              border: "1px solid rgba(245,166,35,0.2)",
              borderRadius: "4px",
              padding: "1px 5px",
              letterSpacing: "0.04em",
              lineHeight: 1.6,
              flexShrink: 0,
            }}>
              18+
            </span>
          )}
        </div>

        {/* Dots */}
        {!loading && !error && (
          <Dots count={availableSurprises.length} />
        )}
      </button>
    );
  }

  // ── Variant: Full / Floating Banner ─────────────────────────────────────────
  if (allWatched || !isVisible) return null;

  return (
    <div
      className="surprise-me-fixed-banner-root"
      style={{
        position: "fixed",
        bottom: "24px",
        left: 0,
        width: "100%",
        zIndex: 9999,
        padding: "0 16px",
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "var(--color-surface)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "20px",
            padding: "8px 10px 8px 8px",
            position: "relative",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.7)",
          }}
        >
          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              zIndex: 10,
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#dc2626",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <X size={9} strokeWidth={2.5} />
          </button>

          {/* Gift icon box */}
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "11px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--color-surface-2)",
              border: "1px solid rgba(255,255,255,0.1)",
              animation: "iconPulse 2.6s ease-in-out infinite",
            }}
          >
            <Gift size={17} style={{ color: "var(--color-primary)" }} />
          </div>

          {/* Text + dots block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
            {/* Top line: label + 18+ badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--color-fg)",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}>
                {loading
                  ? "Mystery box"
                  : availableSurprises.length === 1
                  ? "1 surprise for you"
                  : `${availableSurprises.length} surprises for you`}
              </span>
              <span style={{
                fontSize: "9px",
                fontWeight: 600,
                color: "var(--color-amber)",
                background: "rgba(245,166,35,0.1)",
                border: "1px solid rgba(245,166,35,0.2)",
                borderRadius: "4px",
                padding: "1px 5px",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                flexShrink: 0,
              }}>
                18+
              </span>
            </div>

            {/* Bottom line: dots + hint */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {loading ? (
                <Loader2 size={11} className="spin" style={{ color: "var(--color-muted)" }} />
              ) : (
                <Dots count={availableSurprises.length} />
              )}
              <span style={{
                fontSize: "10px",
                color: "var(--color-muted)",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}>
                tap to open
              </span>
            </div>
          </div>

          {/* Action button */}
          <div style={{ marginLeft: "2px", flexShrink: 0 }}>
            {error ? (
              <AlertCircle size={16} style={{ color: "var(--color-red)" }} />
            ) : (
              <button
                onClick={handleSurpriseClick}
                disabled={loading || opening || availableSurprises.length === 0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: loading || availableSurprises.length === 0
                    ? "var(--color-surface-2)"
                    : "var(--color-primary)",
                  border: loading || availableSurprises.length === 0
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "none",
                  cursor: loading || opening || availableSurprises.length === 0
                    ? "not-allowed"
                    : "pointer",
                  opacity: opening ? 0.6 : 1,
                  transition: "opacity 0.15s, transform 0.1s, background 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (availableSurprises.length > 0 && !opening && !loading)
                    e.currentTarget.style.opacity = "0.82";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = opening ? "0.6" : "1";
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {loading ? (
                  <Loader2 size={15} className="spin" style={{ color: "var(--color-muted)" }} />
                ) : opening ? (
                  <Loader2 size={15} className="spin" style={{ color: "#fff" }} />
                ) : opened ? (
                  <CheckCircle2 size={15} style={{ color: "#fff" }} />
                ) : (
                  <Gift
                    size={15}
                    style={{
                      color: availableSurprises.length === 0
                        ? "var(--color-muted)"
                        : "#fff",
                    }}
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}