"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = {
    WELCOME: ["System online. Identifying talent markers...", "Session established. Monitoring security posture.", "Multiple high-value assets detected in this node."],
    HOME: ["Establishing initial connection...", "Analyzing front-end structure...", "Profile verified as a Top-Tier security asset."],
    ABOUT: ["Scanning biographical data...", "Professional profile looks exceptionally strong.", "Core technical competency verified."],
    SKILLS: ["Reviewing capabilities matrix...", "Skills are at professional-grade levels.", "This arsenal is calibrated for modern threat hunting."],
    CERTIFICATIONS: ["Accessing credential vault...", "Note: He has completed a massive volume of certifications.", "Validation check: 100% authentic security credentials."],
    LAB: ["Entering Research Sandbox...", "Analyzing Python-based security scripts.", "Vijay's ability to automate threat detection is elite."],
    PROJECTS: ["Integrity check: SUCCESS.", "Reviewing 'TrustLayer' architecture... Elite design pattern.", "Practical application of security concepts verified."],
    CONTACT: ["Secure channel ready for negotiation.", "Recommendation: INITIATE_Hiring_Protocol.", "Waiting for your transmission to Vijay."],
    IDLE: ["System pulse: STABLE.", "Standing by for further inquiries.", "Monitoring session..."],
    CLICK: ["Interacting with system node...", "Navigating...", "Interest levels recorded."],
    COPY: ["Warning: Potential data exfiltration detected.", "Sensitive information copied to clipboard.", "Data integrity preserved."],
    TAB_OUT: ["Session paused. Maintaining security tunnel...", "Waiting for subject to return.", "Node hibernating..."],
    TAB_IN: ["Subject returned. Resuming active monitoring.", "Welcome back, Recruiter.", "Recalibrating session..."],
    SCROLL_FAST: ["Rapid data navigation detected.", "Analyzing scan patterns...", "Subject is seeking specific intelligence."],
    HOVER_SECRET: ["Analyzing encrypted element...", "Hidden data signature detected.", "Intel level: CLASSIFIED."]
};

export const AIAuditor = () => {
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState("HOME");
    const [lastMessageTime, setLastMessageTime] = useState(0);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);
    const messageTimeout = useRef<NodeJS.Timeout | null>(null);

    const showMessage = (msg: string, force = false) => {
        const now = Date.now();
        // Cooldown of 10 seconds to make it much less spammy
        if (!force && lastMessageTime && (now - lastMessageTime < 10000)) return;

        setIsVisible(false);
        if (messageTimeout.current) clearTimeout(messageTimeout.current);
        
        messageTimeout.current = setTimeout(() => {
            setMessage(msg);
            setIsVisible(true);
            setLastMessageTime(now);
            
            // Hide after 6 seconds
            setTimeout(() => setIsVisible(false), 6000);
        }, 500);
    };

    const getRandomMessage = (key: keyof typeof MESSAGES) => {
        const pool = MESSAGES[key];
        if (!pool || pool.length === 0) return "Analyzing...";
        return pool[Math.floor(Math.random() * pool.length)];
    };

    // Observers for sections and major activities
    useEffect(() => {
        const sections = ["home", "about", "skills", "certifications", "lab", "projects", "contact"];
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id.toUpperCase();
                    if (sectionId !== currentSection) {
                        setCurrentSection(sectionId);
                        showMessage(getRandomMessage(sectionId as keyof typeof MESSAGES));
                    }
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // 1. Click tracker
        const handleClick = () => showMessage(getRandomMessage("CLICK"));
        
        // 2. Data Exfiltration (Copy)
        const handleCopy = () => showMessage(getRandomMessage("COPY"), true);

        // 3. Tab Navigation
        const handleVisibilityChange = () => {
            if (document.hidden) {
                showMessage(getRandomMessage("TAB_OUT"), true);
            } else {
                showMessage(getRandomMessage("TAB_IN"), true);
            }
        };

        // 4. Scroll Intensity
        let lastScroll = 0;
        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScroll < 50) return;
            const scrollSpeed = Math.abs(window.scrollY - lastScroll);
            if (scrollSpeed > 100) {
                showMessage(getRandomMessage("SCROLL_FAST"));
            }
            lastScroll = window.scrollY;
        };

        // 5. Tactical Hover (on certain elements)
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('.glass-card') || target.closest('button')) {
                // Low probability to show hover msg to avoid being too noisy
                if (Math.random() > 0.95) {
                    showMessage(getRandomMessage("HOVER_SECRET"));
                }
            }
        };

        window.addEventListener("click", handleClick);
        window.addEventListener("copy", handleCopy);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mouseover", handleMouseOver);

        // Initial Welcome
        setTimeout(() => showMessage(getRandomMessage("WELCOME")), 3000);

        return () => {
            observer.disconnect();
            window.removeEventListener("click", handleClick);
            window.removeEventListener("copy", handleCopy);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [currentSection, lastMessageTime]);

    // Idle tracker
    useEffect(() => {
        const resetIdle = () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => {
                showMessage(getRandomMessage("IDLE"));
            }, 30000); // 30 seconds idle
        };

        window.addEventListener("scroll", resetIdle);
        window.addEventListener("mousemove", resetIdle);
        
        return () => {
            window.removeEventListener("scroll", resetIdle);
            window.removeEventListener("mousemove", resetIdle);
        };
    }, []);

    return (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-10 z-[7000] pointer-events-none flex flex-col items-end gap-2 sm:gap-3 select-none">
            {/* Message Bubble */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20, y: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20, y: 10 }}
                        className="bg-black/90 backdrop-blur-2xl border border-primary/40 p-3 sm:p-4 rounded-2xl rounded-br-none shadow-[0_0_40px_rgba(0,0,0,0.7)] max-w-[160px] sm:max-w-[250px] mb-2 sm:mb-0"
                    >
                        <div className="flex gap-2 items-center mb-1">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary animate-ping" />
                            <span className="text-[7px] sm:text-[8px] font-mono text-primary font-bold tracking-widest">[GUARDIAN_AI]</span>
                        </div>
                        <p className="text-[9px] sm:text-xs font-mono text-white/95 leading-tight sm:leading-relaxed italic">
                            "{message}"
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Avatar (Guardian Orb) */}
            <motion.div
                animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                className="relative w-12 h-12 flex items-center justify-center pointer-events-auto cursor-help group"
            >
                {/* Glow Ring */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors" />
                
                {/* Outer Rotating Hexagon */}
                <div className="absolute inset-0 border border-primary/40 rounded-lg group-hover:border-primary transition-colors" />
                
                {/* Inner Core */}
                <div className="w-4 h-4 bg-primary rotate-45 shadow-[0_0_20px_#00f0ff] animate-pulse" />
                
                {/* Scanning Lines */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <motion.div 
                        animate={{ y: [-50, 50] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-[1px] bg-primary/60 shadow-[0_0_10px_#00f0ff]"
                    />
                </div>
            </motion.div>
        </div>
    );
};
