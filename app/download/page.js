import { genToken } from "@/lib/genToken";
import Link from "next/link";
import HistoryList from "@/components/history/HistoryList";
import { ArrowLeft } from "lucide-react";
import Converter from "@/components/url/Converter";

export default async function DownloadPage({ searchParams }) {
  const params = await searchParams;
  const encodedUrl = params?.url;
  const decodedUrl = decodeURIComponent(encodedUrl || "");
  const token = genToken(process.env.SECRET_KEY);

  return (
    <div style={{ background: "#060910", minHeight: "100vh", padding: "32px 20px 60px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back button */}
        <div style={{ marginBottom: "28px" }}>
          <Link href="/" className="back-btn" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "8px 16px", borderRadius: "9px",
            background: "#0c1018", border: "1px solid rgba(255,255,255,0.18)",
            color: "#9aa5b4", fontSize: "13px", fontWeight: 500,
            textDecoration: "none", transition: "all 0.2s",
          }}
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
          <style>{`.back-btn:hover { border-color: rgba(255,255,255,0.45) !important; color: #c8d6e8 !important; }`}</style>
        </div>

        {/* Page heading */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1 style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 800, letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #93c5fd, #5eead4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            margin: "0 0 8px",
          }}>
            TeraBox Downloader
          </h1>
          <p style={{ color: "#6b7a8d", fontSize: "14px" }}>Your download is being prepared</p>
        </div>

        {/* Converter + history */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
          <Converter url={decodedUrl} token={token} />
          <HistoryList />
        </div>
      </div>
    </div>
  );
}
