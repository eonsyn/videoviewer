import React from "react";

export default function VideoLoader() {
  return (
    <div style={{ width: "100%", maxWidth: "540px", margin: "0 auto" }}>
      {[1].map((i) => (
        <div key={i} style={{
          background: "#0c1018", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px", padding: "20px", overflow: "hidden", position: "relative",
        }}>
          {/* Shimmer effect */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
            animation: "shimmer 1.5s infinite",
          }} />
          
          <div style={{ width: "65%", height: "14px", background: "rgba(255,255,255,0.05)", borderRadius: "6px", marginBottom: "16px" }} />
          <div style={{ width: "100%", height: "200px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", marginBottom: "16px" }} />
          <div style={{ width: "40%", height: "12px", background: "rgba(255,255,255,0.04)", borderRadius: "6px", marginBottom: "12px" }} />
          <div style={{ width: "50%", height: "38px", background: "rgba(255,255,255,0.04)", borderRadius: "10px" }} />
        </div>
      ))}
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
