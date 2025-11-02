// encryptor-client.js (browser)
export async function importKeyFromBase64(base64Key) {
  const raw = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt"]);
}

function bufToBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

export async function encryptWithSessionKey(obj, sessionKeyBase64) {
  const key = await importKeyFromBase64(sessionKeyBase64);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 bytes
  const enc = new TextEncoder().encode(JSON.stringify(obj));
  const ciphertextBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc);
  // ciphertextBuffer contains ciphertext + tag appended (WebCrypto)
  const envelope = {
    iv: bufToBase64(iv),
    ciphertext: bufToBase64(ciphertextBuffer),
  };
  return btoa(JSON.stringify(envelope)); // final payload string (base64 of JSON)
}
