
import Button from "@/components/ui/Button";

import { FaSync } from "react-icons/fa";
export default function UrlError({ error, setError }) {
    const handleReload = () => {
        window.location.reload();
    };
    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
        }}>
            <div style={{
                maxWidth: "420px", width: "100%", padding: "32px 28px",
                background: "#0c1018", border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: "18px", textAlign: "center",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                animation: "popupIn 0.3s ease",
            }}>
                <div style={{
                    width: "56px", height: "56px", borderRadius: "14px",
                    background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 18px", fontSize: "28px",
                }}>⚠️</div>
                <h3 style={{
                    fontFamily: "'Geist', sans-serif", fontSize: "20px", fontWeight: 700,
                    color: "#f0f4fc", margin: "0 0 10px",
                }}>Video Unavailable</h3>
                <p style={{ color: "#9aa5b4", fontSize: "14px", lineHeight: 1.7, margin: "0 0 24px" }}>
                    {error}
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <Button onClick={handleReload} style={{ background: "linear-gradient(135deg, #db2777, #be185d)" }}>
                        <FaSync /> Try Again
                    </Button>
                    <Button onClick={() => setError(null)} variant="outline">Dismiss</Button>
                </div>
            </div>
            <style>{`
                    @keyframes popupIn {
                      from { opacity: 0; transform: scale(0.9) translateY(10px); }
                      to   { opacity: 1; transform: scale(1) translateY(0); }
                    }
                  `}</style>
        </div>
    )
}