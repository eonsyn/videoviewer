// lib/utils.js
"use client";
import { createContext, useContext, useState } from "react";
import { useTurnstileSession } from "@/components/turnstile/TurnstileProvider";
import { WORKER_BASE } from "@/lib/constants";

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [apiResponse, setApiResponse] = useState(null);

  const { ensureSession, invalidateSession } = useTurnstileSession();

  // Resolve a share link through the worker (session-gated, CORS-safe, handles Render cold starts).
  // Must be rendered inside <TurnstileProvider>.
  const server_1 = async (url) => {
    try {
      let res;
      for (let attempt = 0; attempt < 2; attempt++) {
        const sessionToken = await ensureSession();
        res = await fetch(`${WORKER_BASE}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, sessionToken }),
        });
        if (res.status === 401) { invalidateSession(); continue; }
        break;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `Error: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return { error: err.message };
    }
  };

  return (
    <GlobalStateContext.Provider value={{ apiResponse, setApiResponse, server_1 }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
