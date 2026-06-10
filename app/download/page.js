import { genToken } from "@/lib/genToken";
import Converter from "@/components/url/Converter";
import TakeUrl from "@/components/home/TakeUrl.js";

export default async function DownloadPage({ searchParams }) {
  const params = await searchParams;
  const encodedUrl = params?.url;
  const decodedUrl = decodeURIComponent(encodedUrl || "");
  const token = genToken(process.env.SECRET_KEY);

  return (
    <div style={{
      background: "#060910",
      minHeight: "100vh",
      padding: "20px 16px 60px",
      boxSizing: "border-box",
    }}>

      {/*
        Outer wrapper: matches YouTube's ~1280px max content width.
        On desktop it gives breathing room; on mobile it fills the screen.
      */}
      <div style={{
        maxWidth: "1600px",
        margin: "0 auto",
        width: "100%",
      }}>
        <Converter url={decodedUrl} token={token} />

      </div>

      <style>{`
        /* Show top URL bar only on desktop, hide on mobile */
        .download-topbar {
          display: block;
          margin-bottom: 20px;
        }

        @media (max-width: 767px) {
          .download-topbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}