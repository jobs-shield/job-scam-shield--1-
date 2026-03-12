"use client";

import React, { useState, useEffect } from "react";

const generateHex = () => Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0").toUpperCase();

export const SidelineStream = () => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLines((prev) => [generateHex(), ...prev].slice(0, 30));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 right-4 h-full pointer-events-none z-[100] hidden lg:flex flex-col gap-1 py-10 opacity-20 select-none overflow-hidden">
            {lines.map((hex, i) => (
                <div key={i} className="text-[9px] font-mono text-primary animate-pulse">
                    0x{hex}
                </div>
            ))}
        </div>
    );
};
