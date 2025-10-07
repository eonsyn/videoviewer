"use client";
import { useState } from "react";
import { useGlobalState } from "@/components/AppContext";
import ServerOne from "@/components/servers/ServerOne";
import ServerTwo from "@/components/servers/ServerTwo";
import VideoLoader from "@/components/loading/VideoLoader";
import WhatIsTerabox from "@/components/home/WhatIsTerabox";
import WhatIsTeraboxNetlify from "@/components/home/WhatIsTeraboxNetlify";
import HowToDownload from "@/components/home/HowToDownload";
import Disclaimer from "@/components/home/Disclaimer";
import Faq from '@/components/home/Faq'
export default function Home() {
  const { server_1, server_2 } = useGlobalState();
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeServer, setActiveServer] = useState(null);
const handleSubmit = async (serverType) => {
  if (!url.trim()) {
    setError("Please enter a valid Terabox URL.");
    return;
  }

  setActiveServer(serverType);
  setLoading(true);
  setError("");
  setResponse(null);

  try {
    // Call the appropriate server function
    const data =
      serverType === "server1" ? await server_1(url) : await server_2(url);

    console.log("data is:", data);

    // Check if the response contains an error
    if (data.error) {
      throw new Error(data.error || "Server returned an error");
    }

    setResponse(data);
  } catch (err) {
    console.error(err);
    setError(err.message || "Something went wrong. Please check console or try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>

      <div id='download' className="min-h-screen flex flex-col mt-6  items-center justify-start pt-16 pb-20 rounded-b-2xl px-4 md:px-8 text-black bg-gradient-to-l from-[#FBCFE8] to-[#DDD6FE]">
        {/* Card Container */}
        <div className="w-full md:px-32 rounded-2xl p-6  ">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-semibold text-center mb-4">
            Download Terabox Videos & Files
          </h1>
          <p className='text-xl md:px-20 pb-4 text-center'>TeraDownloader.netlify.app simplifies Terabox file and video downloads. Skip Terabox login, download directly from servers. No data storage, ensuring privacy.</p>

          {/* Input Field */}
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Paste your Terabox URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0f0f10] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none text-white placeholder-gray-400 transition-all"
            />

            {/* Server Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleSubmit("server1")}
                disabled={loading}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${activeServer === "server1"
                    ? "bg-blue-600 cursor-pointer shadow-lg shadow-blue-600/30"
                    : "bg-blue-500 cursor-pointer hover:bg-blue-600"
                  } disabled:bg-gray-600 disabled:cursor-not-allowed`}
              >
                {loading && activeServer === "server1" ? "Loading..." : "Server 1"}
              </button>

              <button
                onClick={() => handleSubmit("server2")}
                disabled={loading}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${activeServer === "server2"
                    ? "bg-green-600 shadow-lg cursor-pointer shadow-green-600/30"
                    : "bg-green-500 cursor-pointer hover:bg-green-600"
                  } disabled:bg-gray-600 disabled:cursor-not-allowed`}
              >
                {loading && activeServer === "server2" ? "Loading..." : "Server 2 (Fast)"}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-center font-medium bg-red-500/10 border border-red-600 rounded-lg py-2">
              There was an error use Different Url
            </p>
          )}
        </div>

        {/* Results Section */}
        <div className="w-full max-w-4xl ">
          {/* Loading state */}
          {loading && (
            <div className="flex justify-center">
              <VideoLoader />
            </div>
          )}

          {/* Server results */}
          {!loading && activeServer === "server1" && response && <ServerOne res={response} />}
          {!loading && activeServer === "server2" && response && <ServerTwo res={response} />}
        </div>
      </div>
      <div className=' w-full'>
<WhatIsTerabox/>
<WhatIsTeraboxNetlify/>
<HowToDownload/>
<Disclaimer/>
<Faq/>
      </div>
    </>
  );
}
