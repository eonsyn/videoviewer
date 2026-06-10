import { Download, FileIcon } from "lucide-react";

export default function OtherFileFound({ filename, download }) {
    const ext = filename?.split(".").pop().toUpperCase() ?? "FILE";

    return (
        <div style={{ width: "100%", boxSizing: "border-box" }}>
            <div style={{
                position: "relative",
                borderRadius: "20px",
                isolation: "isolate",
                overflow: "hidden",
                padding: "1px",
            }}>

                {/* Spinning conic border */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "250%",
                    aspectRatio: "1",
                    background: "conic-gradient(from 0deg, transparent 40deg, #4f8df5 120deg, #2dd4a4 170deg, transparent 230deg)",
                    animation: "border-spin 6s linear infinite",
                    zIndex: 0,
                }} />

                {/* Card body */}
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    background: "#0c1018",
                    borderRadius: "19px",
                    padding: "48px 24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                    textAlign: "center",
                }}>

                    {/* File icon + extension badge with gentle pulse/float */}
                    <div className="icon-wrapper" style={{ position: "relative", display: "inline-flex" }}>
                        <FileIcon size={72} style={{ color: "#3d4f64" }} />
                        <span style={{
                            position: "absolute",
                            bottom: "6px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "linear-gradient(135deg, #4f8df5 0%, #2dd4a4 100%)",
                            color: "#0c1018", // Dark text for high contrast on the bright teal gradient
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            whiteSpace: "nowrap",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
                        }}>
                            {ext}
                        </span>
                    </div>

                    {/* Text Container */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {/* Filename */}
                        <p style={{
                            fontFamily: "'Geist', sans-serif",
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#f0f4fc",
                            wordBreak: "break-all",
                            maxWidth: "480px",
                            margin: 0,
                        }}>
                            {filename}
                        </p>

                        {/* Subtitle */}
                        <p style={{
                            fontFamily: "'Geist', sans-serif",
                            fontSize: "14px",
                            color: "#6b7a8d",
                            margin: 0,
                        }}>
                            This file can't be previewed — download it directly.
                        </p>
                    </div>

                    {/* Download button with Matched Theme + Pulse Effect */}
                    <a
                        href={download}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-btn-pulse"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "14px 32px",
                            borderRadius: "14px",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#0c1018", // Dark text for clean readability on the vivid theme gradient
                            background: "linear-gradient(135deg, #4f8df5 0%, #2dd4a4 100%)",
                            textDecoration: "none",
                            fontFamily: "'Geist', sans-serif",
                            marginTop: "8px"
                        }}
                    >
                        <Download size={18} strokeWidth={2.5} />
                        Download File
                    </a>
                </div>
            </div>

            {/* Injected CSS for Animations and Hover States */}
            <style>{`
                @keyframes border-spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to   { transform: translate(-50%, -50%) rotate(360deg); }
                }

                @keyframes button-pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(45, 212, 164, 0.5);
                    }
                    70% {
                        box-shadow: 0 0 0 15px rgba(45, 212, 164, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(45, 212, 164, 0);
                    }
                }

                @keyframes icon-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }

                .download-btn-pulse {
                    animation: button-pulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
                }

                .download-btn-pulse:hover {
                    animation: none; 
                    transform: translateY(-2px);
                    /* Dynamic dual-color glow on hover */
                    box-shadow: 0 8px 20px rgba(45, 212, 164, 0.3), 0 8px 20px rgba(79, 141, 245, 0.2);
                    filter: brightness(1.08);
                }

                .download-btn-pulse:active {
                    transform: translateY(1px);
                    box-shadow: 0 4px 12px rgba(45, 212, 164, 0.2);
                }

                .icon-wrapper {
                    animation: icon-float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}