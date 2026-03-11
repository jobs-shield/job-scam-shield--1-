"use client";

import React, { useState, useEffect } from "react";
import { HiMoon, HiLightningBolt } from "react-icons/hi";

const StealthToggle = () => {
    const [isStealth, setIsStealth] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isStealth) {
            root.classList.add("stealth-mode");
            localStorage.setItem("ui_mode", "stealth");
        } else {
            root.classList.remove("stealth-mode");
            localStorage.setItem("ui_mode", "active");
        }
    }, [isStealth]);

    useEffect(() => {
        const saved = localStorage.getItem("ui_mode");
        if (saved === "stealth") setIsStealth(true);
    }, []);

    return (
        <button
            onClick={() => setIsStealth(!isStealth)}
            className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[6000] p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-500 backdrop-blur-xl flex items-center gap-3 group ${isStealth ? 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_#00f0ff33]' : 'border-white/5 bg-white/5 text-gray-500'
                }`}
            aria-label={isStealth ? "Activate Combat Mode" : "Activate Stealth Mode"}
        >
            <div className="relative">
                {isStealth ? <HiMoon className="text-xl" /> : <HiLightningBolt className="text-xl" />}
            </div>
            <span className="hidden md:inline-flex font-mono text-[9px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isStealth ? 'Mode_Stealth' : 'Mode_Active'}
            </span>
        </button>
    );
};

export default StealthToggle;
