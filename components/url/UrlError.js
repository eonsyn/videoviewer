"use client";

import Button from "@/components/ui/Button";
import SurpriseMe from "../surprise/SurpriseMe.js";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function UrlError({ error, setError, token }) {
  const handleReload = () => window.location.reload();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(6,9,16,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "var(--color-surface)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderTop: "1.5px solid var(--color-red)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="url-error-title"
      >
        {/* --- Error section --- */}
        <div
          style={{
            padding: "24px 24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.25)",
            }}
          >
            <AlertCircle size={22} style={{ color: "var(--color-red)" }} />
          </div>

          <h2
            id="url-error-title"
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--color-fg)",
              marginBottom: "6px",
              margin: "0 0 6px",
            }}
          >
            Video unavailable
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              lineHeight: 1.6,
              marginBottom: "20px",
              maxWidth: "270px",
              margin: "0 0 20px",
            }}
          >
            {error || "We couldn't load this video. The link may be expired or invalid."}
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            {/* Retry */}
            <button
              onClick={handleReload}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 0",
                borderRadius: "10px",
                background: "var(--color-fg)",
                color: "var(--color-bg)",
                fontSize: "13px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "opacity 0.15s, transform 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <RotateCcw size={13} />
              Retry
            </button>

            {/* Dismiss */}
            <button
              onClick={() => setError(null)}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: "10px",
                background: "var(--color-surface-2)",
                color: "var(--color-subtle)",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.14)",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.2s, color 0.2s, transform 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                e.currentTarget.style.color = "var(--color-fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                e.currentTarget.style.color = "var(--color-subtle)";
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* --- Divider --- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 24px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
          <span
            style={{
              fontSize: "11px",
              color: "var(--color-muted)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            based on your interests
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* --- Surprise section --- */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            background: "var(--color-surface-2)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <SurpriseMe token={token} variant="button" />
          <p
            style={{
              fontSize: "11px",
              color: "var(--color-muted)",
              textAlign: "center",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            18+ content · confirm you are of legal age before continuing
          </p>
        </div>
      </div>
    </div>
  );
}