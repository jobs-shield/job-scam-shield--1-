"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { RiRadarLine, RiCloseLine } from "react-icons/ri";

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = [
    { id: "about", label: "ABOUT", angle: -90 },
    { id: "skills", label: "SKILLS", angle: -45 },
    { id: "projects", label: "NETWORK", angle: 0 },
    { id: "certifications", label: "VAULT", angle: 45 },
    { id: "contact", label: "LINK", angle: 90 },
];

const CyberCommandPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id: string) => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: `#${id}`,
            offset: 50,
            ease: "power4.inOut",
        });
        setIsOpen(false);
    };

    // Close on Escape
    React.useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    return (
        <div className="fixed bottom-10 left-10 z-[100] font-mono" role="navigation" aria-label="Cyber Command Navigation">
            <AnimatePresence>
                {isOpen && (
                    <div className="relative" role="menu">
                        {/* Background Radar Rings */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute bottom-0 left-0 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 border border-primary/10 rounded-full" />
                            <div className="absolute inset-10 border border-primary/5 rounded-full" />
                            <div className="absolute inset-20 border border-primary/5 rounded-full" />

                            {/* Rotating Sweep Line */}
                            <div className="absolute inset-0 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                                <div className="w-[150px] h-[1px] bg-gradient-to-r from-transparent to-primary/40 origin-left" />
                            </div>
                        </motion.div>

                        {/* Orbital Buttons */}
                        {NAV_ITEMS.map((item, index) => {
                            const radius = 140;
                            const rad = (item.angle * Math.PI) / 180;
                            const x = Math.cos(rad) * radius;
                            const y = Math.sin(rad) * radius;

                            return (
                                <motion.button
                                    key={item.id}
                                    role="menuitem"
                                    aria-label={`Jump to ${item.label}`}
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{ opacity: 1, scale: 1, x, y }}
                                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                                    onClick={() => scrollToSection(item.id)}
                                    className="absolute bottom-0 left-0 group focus-visible:z-50"
                                    style={{ marginLeft: -30, marginBottom: -15 }}
                                >
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-12 h-12 bg-black/60 backdrop-blur-xl border border-primary/30 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                                            <span className="text-[10px] font-black">{item.label.substring(0, 3)}</span>
                                        </div>
                                        <span className="absolute -top-6 text-[8px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest font-bold">
                                            {item.label}_INIT
                                        </span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Command Panel" : "Open Command Panel"}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="relative w-16 h-16 bg-black/80 backdrop-blur-2xl border-2 border-primary/40 rounded-full flex items-center justify-center z-10 shadow-[0_0_25px_rgba(0,240,255,0.2)] group"
            >
                {/* Animated Sweep in Trigger */}
                <div className="absolute inset-0 rounded-full opacity-20 pointer-events-none overflow-hidden" aria-hidden="true">
                    <div className="absolute inset-[-50%] bg-[conic-gradient(transparent_0deg,rgba(0,240,255,1)_360deg)] animate-[spin_3s_linear_infinite]" />
                </div>

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <RiCloseLine className="text-3xl text-primary" aria-hidden="true" />
                        </motion.div>
                    ) : (
                        <motion.div key="radar" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <RiRadarLine className="text-3xl text-primary animate-pulse" aria-hidden="true" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Info Tag */}
            {!isOpen && (
                <div
                    className="absolute left-20 top-1/2 -translate-y-1/2 bg-primary/5 border border-primary/20 px-3 py-1 rounded-full text-[9px] text-primary/60 tracking-[0.3em] uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                >
                    Ops_Dashboard_Ready
                </div>
            )}
        </div>
    );
};

export default CyberCommandPanel;
