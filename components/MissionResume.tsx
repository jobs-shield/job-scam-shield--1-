"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiDownload, HiShieldCheck } from "react-icons/hi";

const MissionResume = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("ENCRYPTED");

    const handleDownload = () => {
        setIsDownloading(true);
        setStatus("DECRYPTING");

        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setStatus("AUTHORIZED");
                setTimeout(() => {
                    // Logic to actually trigger file download would go here
                    // window.open('/resume.pdf', '_blank');
                    setIsDownloading(false);
                    setProgress(0);
                    setStatus("ENCRYPTED");
                }, 1500);
            }
            setProgress(p);
        }, 200);
    };

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                disabled={isDownloading}
                className={`btn-secondary w-full sm:w-auto px-12 group transition-all duration-500 overflow-hidden ${isDownloading ? 'border-primary shadow-[0_0_20px_rgba(0,240,255,0.2)]' : ''
                    }`}
            >
                <div className="flex items-center gap-3 relative z-10">
                    {isDownloading ? <HiShieldCheck className="animate-pulse text-primary text-xl" /> : <HiDownload className="group-hover:translate-y-1 transition-transform" />}
                    <span>{isDownloading ? `MISSION_REPORT_${progress.toFixed(0)}%` : 'MISSION_REPORT.PDF'}</span>
                </div>

                {/* Progress Bar Background fill */}
                {isDownloading && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: `${progress - 100}%` }}
                        className="absolute inset-0 bg-primary/10 -z-0"
                    />
                )}
            </motion.button>

            <AnimatePresence>
                {isDownloading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 font-mono text-[9px] text-primary bg-black/80 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-xl whitespace-nowrap shadow-[0_0_30px_rgba(0,240,255,0.1)] z-50 flex items-center gap-3"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        <span>STATUS: {status}</span>
                        <span className="text-gray-600">|</span>
                        <span>HASH: SHA_256_SECURE</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MissionResume;
