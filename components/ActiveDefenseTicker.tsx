"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THREAT_EVENTS = [
    "Firewall blocked unauthorized SSH attempt from [REDACTED]",
    "Brute force detected on port 22 // IP Blacklisted",
    "DDoS mitigation active // Traffic diverted to scrubbers",
    "SQL Injection payload neutralized in login field",
    "Cryptojacking script detected and stripped from package.json",
    "Zero-day exploit attempt identified // Signature added to database",
    "Anomaly detected in heartbeat signal // Re-routing traffic",
    "Buffer overflow prevented in memory buffer 0x4A7F",
    "Malware sandbox triggered // File quarantined: backdoor.exe",
    "Threat Level: ELEVATED // Monitoring active connections...",
    "Neural Network analyzing packet integrity in real-time",
    "Cross-Site Scripting (XSS) attempt blocked in comment section",
    "Dictionary attack detected // Account lockout policy enforced"
];

const ActiveDefenseTicker = () => {
    const [eventIndex, setEventIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const timeInterval = setInterval(updateTime, 1000);

        const eventInterval = setInterval(() => {
            setEventIndex((prev) => (prev + 1) % THREAT_EVENTS.length);
        }, 6000); // Change event every 6 seconds

        return () => {
            clearInterval(timeInterval);
            clearInterval(eventInterval);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-[8000] pointer-events-none">
            <div className="bg-[#020202]/80 backdrop-blur-md border-b border-primary/20 h-8 flex items-center overflow-hidden">
                {/* Status Indicator */}
                <div className="flex items-center gap-2 px-4 border-r border-primary/20 bg-primary/5 h-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-mono text-primary font-bold tracking-widest uppercase">
                        Active_Defense
                    </span>
                </div>

                {/* Clock */}
                <div className="px-4 border-r border-primary/20 h-full flex items-center">
                    <span className="text-[9px] font-mono text-primary/60 font-medium">
                        {currentTime}
                    </span>
                </div>

                {/* Scrolling Ticker */}
                <div className="flex-1 px-2 sm:px-4 overflow-hidden relative h-full flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={eventIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex items-center gap-2 sm:gap-4"
                        >
                            <span className="text-[8px] sm:text-[10px] font-mono text-white/90 tracking-tight sm:tracking-wide truncate max-w-[60vw] sm:max-w-none">
                                <span className="text-accent uppercase mr-1 sm:mr-2 font-bold whitespace-nowrap">
                                    {/* Shorter tag on mobile */}
                                    <span className="inline sm:hidden">[LOG]:</span>
                                    <span className="hidden sm:inline">[LOG_EVENT]:</span>
                                </span>
                                {THREAT_EVENTS[eventIndex]}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Network Metrics (Simulated) */}
                <div className="hidden md:flex items-center gap-4 px-4 border-l border-primary/20 bg-primary/5 h-full text-[9px] font-mono">
                    <div className="flex gap-2">
                        <span className="text-gray-500">PACKETS:</span>
                        <span className="text-primary">{Math.floor(Math.random() * 1000)}k/s</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500">LATENCY:</span>
                        <span className="text-accent">14ms</span>
                    </div>
                </div>
            </div>
            {/* Scanline Effect Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary/40 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
        </div>
    );
};

export default ActiveDefenseTicker;
