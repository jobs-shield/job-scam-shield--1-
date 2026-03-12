"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const BiometricButton = ({ onComplete, label }: { onComplete: () => void, label: string }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startScan = () => {
        setIsScanning(true);
        setProgress(0);
        timerRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timerRef.current!);
                    onComplete();
                    return 100;
                }
                return prev + 2;
            });
        }, 20);
    };

    const stopScan = () => {
        if (progress < 100) {
            setIsScanning(false);
            setProgress(0);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    return (
        <div className="relative group w-full sm:w-auto">
            <button
                onMouseDown={startScan}
                onMouseUp={stopScan}
                onMouseLeave={stopScan}
                onTouchStart={startScan}
                onTouchEnd={stopScan}
                className="btn-primary w-full sm:w-auto px-8 sm:px-12 relative overflow-hidden select-none touch-none"
            >
                <span className={isScanning ? "opacity-0" : "opacity-100"}>{label}</span>
                {isScanning && (
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-black tracking-widest text-primary italic animate-pulse">
                        SCANNING_BIOMETRICS... {progress}%
                    </span>
                )}
                
                {/* Scan Progress Bar */}
                <div 
                    className="absolute bottom-0 left-0 h-1 bg-white shadow-[0_0_10px_#fff]" 
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                />
            </button>

            {/* Glowing Ring Effect when scanning */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute -inset-4 border border-primary rounded-full pointer-events-none z-[-1]"
                    />
                )}
            </AnimatePresence>

            <div className="absolute top-full left-0 w-full text-center mt-2 text-[8px] text-gray-600 font-mono uppercase tracking-widest pointer-events-none lg:group-hover:text-primary transition-colors">
                [HOLD TO VERIFY SESSION]
            </div>
        </div>
    );
};
