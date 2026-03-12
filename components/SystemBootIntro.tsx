"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const DEFAULT_BOOT_SEQUENCE = [
    "Initializing Secure Interface...",
    "Loading Threat Analysis Modules...",
    "Connecting to Security Network...",
    "Authenticating Visitor...",
    "Running Decryption Algorithms...",
    "Access Granted."
];

const TypingLine = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                // Delay after typing is finished
                setTimeout(onComplete, 300);
            }
        }, 50); // Slightly slower for cinematic effect
        return () => clearInterval(interval);
    }, [text, onComplete]);

    return <span>{displayedText}</span>;
};

const SystemBootIntro = ({ onComplete }: { onComplete: () => void }) => {
    const [activeMessageIndex, setActiveMessageIndex] = useState(0);
    const [completedMessages, setCompletedMessages] = useState<string[]>([]);
    const [showIntro, setShowIntro] = useState(true);
    const [isMounting, setIsMounting] = useState(true);
    const [bootSequence, setBootSequence] = useState(DEFAULT_BOOT_SEQUENCE);
    const introRef = useRef<HTMLDivElement>(null);
    const isTransitioning = useRef(false);

    useEffect(() => {
        // Fetch OSINT Geolocation Data
        const fetchGeoData = async () => {
            try {
                const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
                const data = await res.json();
                if (data.city && data.country) {
                    setBootSequence([
                        "Initializing Secure Interface...",
                        `Incoming connection flagged from [${data.city}, ${data.country}]. Tracking IP...`,
                        "Loading Threat Analysis Modules...",
                        "Authenticating Visitor...",
                        "Running Decryption Algorithms...",
                        "Access Granted."
                    ]);
                }
            } catch (e) {
                console.error("Geo locator bypassed");
            }
        };
        fetchGeoData();
        // Check session storage with a fresh version key v6
        const hasSeenIntro = sessionStorage.getItem("system_boot_v6");
        if (hasSeenIntro === "true") {
            setShowIntro(false);
            onComplete();
        }
        setIsMounting(false);

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") skipIntro();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onComplete]);

    const handleLineComplete = () => {
        if (isTransitioning.current) return;

        if (activeMessageIndex < bootSequence.length - 1) {
            setCompletedMessages(prev => [...prev, bootSequence[activeMessageIndex]]);
            setActiveMessageIndex(prev => prev + 1);
        } else {
            // "Access Granted" line finished
            setCompletedMessages(prev => [...prev, bootSequence[activeMessageIndex]]);
            isTransitioning.current = true;
            // Wait a bit longer on "Access Granted" for impact
            setTimeout(handleFinalTransition, 1200);
        }
    };

    const handleFinalTransition = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem("system_boot_v6", "true");
                setShowIntro(false);
                onComplete();
            }
        });

        tl.to(".boot-line", {
            opacity: 0,
            y: -40,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.in"
        })
            .to(introRef.current, {
                opacity: 0,
                scale: 1.2,
                filter: "blur(40px)",
                duration: 1.2,
                ease: "expo.inOut"
            });
    };

    const skipIntro = () => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        sessionStorage.setItem("system_boot_v6", "true");
        setShowIntro(false);
        onComplete();
    };

    if (!showIntro || isMounting) return null;

    return (
        <div
            ref={introRef}
            className="fixed inset-0 z-[10000] bg-[#020202] flex items-center justify-center p-6 font-mono overflow-hidden"
        >
            {/* Background Radiance */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.07)_0%,transparent_100%)] z-0" />

            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />

            <div className="max-w-xl w-full relative z-20">
                <div className="mb-14 flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                    <h2 className="text-primary text-[11px] tracking-[0.5em] uppercase font-black">
                        Terminal_Auth_Sequence // ROOT_LEVEL
                    </h2>
                </div>

                <div className="space-y-6 min-h-[380px]">
                    {completedMessages.map((msg, i) => (
                        <div key={i} className="boot-line text-sm md:text-base flex gap-8 text-primary/60">
                            <span className="text-primary/20 w-12 font-bold">[{i.toString().padStart(2, '0')}]</span>
                            <span className={msg.includes("Access Granted") ? "text-accent font-black scale-110 origin-left shadow-accent" : ""}>
                                {msg}
                            </span>
                            <span className="text-accent/30 ml-auto text-xs tracking-tighter">SUCCESS</span>
                        </div>
                    ))}

                    {activeMessageIndex < bootSequence.length && (
                        <div className="boot-line text-sm md:text-base flex gap-8 text-primary">
                            <span className="text-primary/20 w-12 font-bold">[{activeMessageIndex.toString().padStart(2, '0')}]</span>
                            <TypingLine
                                text={bootSequence[activeMessageIndex]}
                                onComplete={handleLineComplete}
                            />
                            <span className="w-3 h-6 bg-primary animate-pulse inline-block align-middle" />
                        </div>
                    )}
                </div>

                {/* Global Progress Hub */}
                <div className="mt-24 relative">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((activeMessageIndex + 1) / bootSequence.length) * 100}%` }}
                            className="h-full bg-primary shadow-[0_0_25px_#00f0ff]"
                        />
                    </div>
                    <div className="mt-5 flex justify-between text-[10px] text-gray-700 tracking-[0.4em] uppercase font-bold">
                        <span>HANDSHAKE_PROGRESS</span>
                        <span className="text-primary/40">{(Math.min(((activeMessageIndex + 1) / bootSequence.length) * 100, 100)).toFixed(0)}%</span>
                    </div>
                </div>

                <button
                    onClick={skipIntro}
                    className="absolute -bottom-32 left-1/2 -translate-x-1/2 text-[10px] text-gray-800 hover:text-primary transition-all tracking-[0.4em] uppercase border-b border-transparent hover:border-primary pb-2 opacity-30 hover:opacity-100"
                >
                    Bypass_Secure_Entry [ESC]
                </button>
            </div>

            {/* Hex Stream Background */}
            <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.04] pointer-events-none select-none overflow-hidden font-mono text-[8px] flex flex-wrap gap-6 p-10">
                {Array.from({ length: 200 }).map((_, i) => (
                    <span key={i} className={Math.random() > 0.95 ? "text-primary" : ""}>
                        0x{Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SystemBootIntro;
