"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null); // store JSON
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("https://strictapi.onrender.com/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      setResponse(data); // store as JSON
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-black p-4">
       

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {response && Array.isArray(response) && response.length > 0 && (
        <div className="w-full h-[80vh] max-w-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Video:</h2>
          <video
            src={response[0].direct_link}
            poster={response[0].thumb} // thumbnail
            controls
            className="w-full h-full  rounded-lg shadow"
          ></video>

          {/* <h2 className="text-xl font-semibold mt-4 mb-2">Full Response:</h2>
          <pre className="bg-white p-4 rounded-lg shadow overflow-x-auto text-sm">
            {JSON.stringify(response, null, 2)}
          </pre> */}
        </div>
      )}
    </div>
  );
}
