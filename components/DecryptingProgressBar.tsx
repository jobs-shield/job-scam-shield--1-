"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "0123456789ABCDEF!@#$%^&*";

export const DecryptingProgressBar = ({ label, targetValue, color = "bg-primary" }: { label: string, targetValue: number, color?: string }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const [displayLabel, setDisplayLabel] = useState(label);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [isDecrypted, setIsDecrypted] = useState(false);

    useEffect(() => {
        if (!isInView) return;

        // Progress animation
        const duration = 2000;
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCurrentValue(Math.floor(progress * targetValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        // Label decryption animation
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayLabel(label
                .split("")
                .map((char, index) => {
                    if (index < iteration) return label[index];
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("")
            );

            if (iteration >= label.length) {
                clearInterval(interval);
                setIsDecrypted(true);
            }
            iteration += 1 / 3;
        }, 50);

        return () => clearInterval(interval);
    }, [isInView, label, targetValue]);

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest">
                <span className="text-gray-400 uppercase">{displayLabel}</span>
                <span className="text-white font-bold">{currentValue}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${targetValue}%` } : {}}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={`h-full ${color} shadow-[0_0_10px_rgba(0,240,255,0.3)]`}
                />
            </div>
        </div>
    );
};
