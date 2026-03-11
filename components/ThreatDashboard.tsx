"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { HiFire, HiShieldCheck, HiStatusOnline, HiOutlineGlobe } from "react-icons/hi";
import EarthGlobe from "./EarthGlobe";

const LOG_ENTRIES = [
    { type: "INFO", text: "Firewall Event – Suspicious login attempt blocked", color: "text-primary" },
    { type: "ALERT", text: "IDS Trigger – Port scanning detected", color: "text-red-500" },
    { type: "INFO", text: "Malware signature update completed", color: "text-primary" },
    { type: "ALERT", text: "Brute force activity detected from [192.168.0.x]", color: "text-red-500" },
    { type: "INFO", text: "Network traffic normalized", color: "text-accent" },
    { type: "INFO", text: "System Handshake: Peer 0x4f22 connected", color: "text-primary" },
    { type: "ALERT", text: "Potential DDoS spike detected in Sector 7", color: "text-red-500" },
    { type: "INFO", text: "Decryption Archive syncing...", color: "text-primary" },
];

const ThreatDashboard = () => {
    const [logs, setLogs] = useState<{ type: string; text: string; color: string; id: number }[]>([]);
    const [metrics, setMetrics] = useState({
        threats: 124,
        blocked: 8932,
        status: "98.2%",
        score: 92
    });

    // Simulated Log Ticker
    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            const entry = LOG_ENTRIES[count % LOG_ENTRIES.length];
            setLogs(prev => [{ ...entry, id: Date.now() }, ...prev].slice(0, 6));
            count++;

            setMetrics(prev => ({
                ...prev,
                threats: prev.threats + (Math.random() > 0.7 ? 1 : 0),
                blocked: prev.blocked + Math.floor(Math.random() * 5),
                score: Math.min(100, Math.max(85, prev.score + (Math.random() > 0.5 ? 0.1 : -0.1)))
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 font-mono">

            {/* Left: Metrics & Logs */}
            <div className="lg:col-span-4 space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "ACTIVE_THREATS", val: metrics.threats, icon: <HiFire />, color: "text-red-500" },
                        { label: "BLOCKED_TOTAL", val: metrics.blocked, icon: <HiShieldCheck />, color: "text-accent" },
                        { label: "NET_STABILITY", val: metrics.status, icon: <HiStatusOnline />, color: "text-primary" },
                        { label: "SEC_INDEX", val: `${metrics.score.toFixed(1)}%`, icon: <HiOutlineGlobe />, color: "text-primary" },
                    ].map((m, i) => (
                        <div key={i} className="glass-card p-6 flex flex-col items-center justify-center text-center group">
                            <div className={`${m.color} text-2xl mb-2 group-hover:scale-110 transition-transform animate-pulse`}>
                                {m.icon}
                            </div>
                            <p className="text-[9px] text-gray-500 tracking-[0.2em] mb-1">{m.label}</p>
                            <p className="text-xl font-black text-white">{m.val}</p>
                        </div>
                    ))}
                </div>

                {/* Live Logs */}
                <div className="glass-card p-6 h-[400px] flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[8px] text-primary/30">LOG_v4.2</div>
                    <h4 className="text-[10px] text-primary tracking-[0.4em] mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                        LIVE_TELEMETRY
                    </h4>
                    <div className="flex-1 overflow-hidden space-y-4">
                        <AnimatePresence initial={false}>
                            {logs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="border-l-2 border-white/5 pl-4 py-1"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-[9px] font-bold ${log.color}`}>[{log.type}]</span>
                                        <span className="text-[8px] text-gray-600 italic">{new Date().toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 leading-tight tracking-tight">
                                        {log.text}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center">
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: [-100, 400] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="w-1/4 h-full bg-primary/20"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: 3D Earth Globe Visualization */}
            <div className="lg:col-span-8 glass-card p-0 h-[350px] sm:h-[450px] lg:h-[550px] relative overflow-hidden group">
                <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 sm:gap-3 z-10 w-2/3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444] shrink-0" />
                    <span className="hidden sm:inline-block text-[10px] text-white/50 tracking-[0.5em]">GLOBAL_ATTACK_SURFACE_MONITOR</span>
                    <span className="sm:hidden text-[8px] text-white/50 tracking-[0.2em] break-words">ATTACK_SURFACE</span>
                </div>

                <div className="w-full h-full">
                    <EarthGlobe />
                </div>

                {/* Scanning Line overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ x: [-100, 1000] }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="w-px h-full bg-primary/20 shadow-[0_0_20px_#00f0ff] opacity-10"
                    />
                </div>

                {/* Alerts Corner */}
                <div className="absolute bottom-8 right-8 text-right font-mono">
                    <p className="text-[8px] text-gray-600 mb-1">NODE_HANDSHAKE_TIMEOUT</p>
                    <p className="text-[10px] text-red-500 font-bold animate-pulse">!! SECURITY_BREACH_SIMULATED !!</p>
                </div>
            </div>
        </div>

    );
};

export default ThreatDashboard;
