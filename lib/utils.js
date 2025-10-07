// lib/utils.js
"use client";
import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [apiResponse, setApiResponse] = useState(null);

  const server_1 = async (url) => {
    try {
      const res = await fetch("https://strictapi.onrender.com/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
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
