"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CyberCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === "pointer");
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block"
            style={{ cursor: 'none' }}
        >
            {/* Main Crosshair Container */}
            <motion.div
                className="absolute flex items-center justify-center"
                animate={{
                    x: mousePos.x,
                    y: mousePos.y,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
            >
                {/* Horizontal Line */}
                <div className={`h-px bg-primary/40 transition-all duration-300 ${isPointer ? 'w-16' : 'w-10'}`} />
                {/* Vertical Line */}
                <div className={`absolute w-px bg-primary/40 transition-all duration-300 ${isPointer ? 'h-16' : 'h-10'}`} />

                {/* Center Dot */}
                <div className="absolute w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_#00f0ff]" />

                {/* Tactical Corners */}
                <div className="absolute w-24 h-24 border border-primary/10 rounded-full animate-spin-slow" />

                {/* Real-time Coordinates */}
                <div className="absolute top-6 left-6 font-mono text-[8px] text-primary/60 whitespace-nowrap bg-black/40 px-2 py-1 rounded backdrop-blur-md">
                    X:{mousePos.x.toString().padStart(4, '0')} <br />
                    Y:{mousePos.y.toString().padStart(4, '0')}
                </div>

                {/* Scanning Status - Removed per request */}
            </motion.div>

            {/* Trailing Ghost Effect */}
            <motion.div
                className="absolute w-4 h-4 border border-primary/20 rounded-sm"
                animate={{
                    x: mousePos.x - 8,
                    y: mousePos.y - 8,
                    rotate: 45
                }}
                transition={{ type: "spring", damping: 40, stiffness: 150, mass: 1 }}
            />
        </div>
    );
};

export default CyberCursor;
