"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, AlertCircle, ArrowRight } from "lucide-react";

const STORAGE_KEY = "seen_surprises_cache";
const ONE_HOUR_MS = 60 * 60 * 1000;

export default function SurpriseMe({ token }) {
    const [availableSurprises, setAvailableSurprises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --- Local Storage Management ---
    const getValidSeenItems = () => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            const now = Date.now();
            const validSeen = {};
            let changed = false;

            for (const [surl, expiryTime] of Object.entries(stored)) {
                if (now < expiryTime) {
                    validSeen[surl] = expiryTime;
                } else {
                    changed = true;
                }
            }
            if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(validSeen));
            return Object.keys(validSeen);
        } catch (e) {
            return [];
        }
    };

    const markAsSeen = (surl) => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            stored[surl] = Date.now() + ONE_HOUR_MS;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        } catch (e) {
            console.error("Failed to save to local storage", e);
        }
    };

    // --- Data Fetching ---
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://interestingapihai.netlify.app/api/secure/get-random",
                    {
                        method: "POST",
                        headers: {
                            "x-secure-token": token,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const json = await response.json();

                if (!response.ok) {
                    throw new Error(json?.message || `Request failed: ${response.status}`);
                }

                const fetchedData = (json.data || []).slice(0, 5);
                const seenKeys = getValidSeenItems();
                const freshSurprises = fetchedData.filter(
                    (item) => !seenKeys.includes(item.surl)
                );

                setAvailableSurprises(freshSurprises);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    // --- Action Handler ---
    const handleSurpriseClick = () => {
        if (availableSurprises.length === 0) return;

        const randomIndex = Math.floor(Math.random() * availableSurprises.length);
        const selected = availableSurprises[randomIndex];

        const downloadUrl = `https://terafetch.netlify.app/download?url=${encodeURIComponent(
            `https://terasharefile.com/s/1${selected.surl}`
        )}`;

        window.open(downloadUrl, "_blank");
        markAsSeen(selected.surl);

        setAvailableSurprises((prev) =>
            prev.filter((item) => item.surl !== selected.surl)
        );
    };

    if (!token) return null;

    return (
        <div className="fixed bottom-6 left-0 w-full z-50 px-4 pointer-events-none flex justify-center">
            <AnimatePresence>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="pointer-events-auto w-full max-w-lg bg-zinc-950 rounded-2xl p-[1.5px] overflow-hidden relative shadow-2xl"
                >
                    {/* The Spinning Light Beam Effect */}
                    <div
                        className="absolute top-1/2 left-1/2 w-[300%] aspect-square animate-[spin_6s_linear_infinite]"
                        style={{
                            background: "conic-gradient(from 0deg, transparent 0deg, #a855f7 120deg, #ec4899 240deg, transparent 360deg)",
                            transform: "translate(-50%, -50%)"
                        }}
                    />

                    {/* Content Wrapper */}
                    <div className="relative bg-zinc-900 rounded-[14px] p-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="bg-zinc-800 p-2 rounded-xl">
                                <Sparkles className="text-purple-400" size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Mystery Box</h3>
                                <p className="text-zinc-500 text-[11px]">Click to get surprise videos.</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="pr-4"><Loader2 className="animate-spin text-purple-500" size={20} /></div>
                        ) : error ? (
                            <div className="flex items-center gap-2 text-red-400 text-xs px-2"><AlertCircle size={14} /></div>
                        ) : availableSurprises.length > 0 ? (
                            <button
                                onClick={handleSurpriseClick}
                                className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:brightness-110"
                            >
                                <span>Open</span>
                                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                    <ArrowRight size={16} />
                                </motion.div>
                            </button>
                        ) : (
                            <p className="text-zinc-600 text-xs pr-4 italic">Done!</p>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}