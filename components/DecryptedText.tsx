"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?:{}|[]";

interface DecryptedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className, delay = 0 }) => {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [isDecrypted, setIsDecrypted] = useState(false);

    useEffect(() => {
        if (!isInView || isDecrypted) return;

        const timer = setTimeout(() => {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText((prev) => 
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    setIsDecrypted(true);
                }

                iteration += 1 / 2;
            }, 40);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
    }, [isInView, text, isDecrypted, delay]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
};
