"use client";
import { useState } from "react";
import { encryptWithSessionKey } from "@/app/lib/encryptor-client";

export default function Page() {
  const [url, setUrl] = useState("");
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handle() {
    setLoading(true);
    setResp(null);
    try {
      // 1) request session
      const sres = await fetch("https://shhapi.vercel.app/api/session", { method: "POST" });
      const sjson = await sres.json();
      if (!sjson.ok) return setResp(sjson);

      const { sessionId, sessionKey } = sjson;

      // 2) build payload with ts + nonce
      const payloadObj = { url, ts: Date.now(), nonce: crypto.getRandomValues(new Uint8Array(8)).reduce((p,c)=>p+c.toString(16),"") };

      // 3) encrypt using sessionKey
      const envelopeB64 = await encryptWithSessionKey(payloadObj, sessionKey);

      // 4) send to server
      const fres = await fetch("https://shhapi.vercel.app/api/terabox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, payload: envelopeB64 })
      });
      const fjson = await fres.json();
      setResp(fjson);
    } catch (err) {
      setResp({ ok: false, message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Secure Terabox Fetch</h2>
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://teraboxapp.com/..." style={{ width: "100%" }} />
      <button onClick={handle} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Working..." : "Fetch securely"}
      </button>

      <pre style={{ marginTop: 20 }}>{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
}
