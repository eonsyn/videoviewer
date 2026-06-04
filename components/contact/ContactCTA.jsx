"use client";
import React from "react";

export default function ContactCTA() {
  // Feature tags shown on contact page
  const tags = ["Bug Reports", "Feature Requests", "Download Help", "General Questions"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", justifyContent: "center", marginTop: "28px" }}>
      {tags.map(t => (
        <span key={t} style={{
          padding: "5px 12px", borderRadius: "100px",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          color: "#3d4f64", fontSize: "12px",
        }}>{t}</span>
      ))}
    </div>
  );
}
