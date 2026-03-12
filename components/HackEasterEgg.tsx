"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUIZ_QUESTIONS = [
    {
        question: "What is the most common method hackers use to steal credentials via fake emails?",
        options: ["Social Engineering", "Phishing", "Brute Force", "SQL Injection"],
        correctIndex: 1
    },
    {
        question: "What is Kali Linux primarily used for?",
        options: ["Video Editing", "Web Development", "Penetration Testing", "Gaming"],
        correctIndex: 2
    },
    {
        question: "Which tool is commonly used to analyze and capture network traffic packets?",
        options: ["Burp Suite", "Metasploit", "Wireshark", "Nmap"],
        correctIndex: 2
    },
    {
        question: "What is a major red flag of a phishing email?",
        options: ["Sent from a friend", "Urgent request for passwords", "Contains a PDF", "Has a company logo"],
        correctIndex: 1
    },
    {
        question: "Which of the following creates a secure, encrypted connection over a public network?",
        options: ["VPN", "HTTP", "FTP", "LAN"],
        correctIndex: 0
    }
];

export const HackEasterEgg = () => {
    const [hacked, setHacked] = useState(false);
    const [keyBuffer, setKeyBuffer] = useState<string>("");
    const [hackerAnswer, setHackerAnswer] = useState("");
    const [phase, setPhase] = useState(0); // 0: tracking, 1: quiz, 2: success, 3: lock out
    const [attempts, setAttempts] = useState(3);
    const [currentQuestion, setCurrentQuestion] = useState(QUIZ_QUESTIONS[0]);

    const HACK_CODES = ["sudo", "hack"];
    const MAX_CODE_LEN = 4;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only listen if not typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            setKeyBuffer((prev) => {
                const newBuffer = (prev + e.key).slice(-MAX_CODE_LEN);
                if (HACK_CODES.some(code => newBuffer.toLowerCase().endsWith(code))) {
                    triggerHack();
                }
                return newBuffer;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Lock scrolling when hacked
    useEffect(() => {
        if (hacked) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            document.body.style.touchAction = "auto";
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            document.body.style.touchAction = "auto";
        };
    }, [hacked]);

    const triggerHack = () => {
        if (hacked) return;
        setHacked(true);
        setPhase(0);
        setAttempts(3);
        setHackerAnswer("");
        setCurrentQuestion(QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)]);

        // Move to quiz phase after 5 seconds of "tracking"
        setTimeout(() => {
            setPhase(1);
        }, 5000);
    };

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check if the selected answer's string matches the correct option's string
        const isCorrect = hackerAnswer === currentQuestion?.options[currentQuestion?.correctIndex];

        if (isCorrect) {
            setPhase(2);
            setTimeout(() => {
                setHacked(false);
                setHackerAnswer("");
                setPhase(0);
            }, 5000); // Wait longer so they can read the welcome message
        } else {
            const newAttempts = attempts - 1;
            setAttempts(newAttempts);
            
            if (newAttempts <= 0) {
                setPhase(3);
            } else {
                // visual flash logic
                const temp = hackerAnswer;
                setHackerAnswer("INCORRECT_ATTEMPT");
                setTimeout(() => setHackerAnswer(""), 1000);
            }
        }
    };

    return (
        <AnimatePresence>
            {hacked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                    className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col items-center justify-center font-mono overflow-hidden select-none"
                >
                    {/* Flashing Red Background Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0.2, 0.9, 0.1, 0.5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 bg-red-900 mix-blend-color-burn"
                    />

                    {/* Glitch Overlay Effect */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />

                    {phase === 0 && (
                        <motion.div 
                            className="relative z-10 text-center bg-black/80 p-12 border-4 border-red-600 rounded-lg shadow-[0_0_100px_rgba(255,0,0,0.8)] pointer-events-auto"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                        >
                            <motion.h1 
                                className="text-6xl md:text-8xl font-black text-red-500 mb-4 uppercase tracking-widest"
                                animate={{ x: [-5, 5, -5, 5, 0], y: [-5, 5, 5, -5, 0] }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                            >
                                BREACH DETECTED
                            </motion.h1>
                            
                            <div className="h-1 w-full bg-red-600 mb-8 animate-pulse" />

                            <p className="text-xl md:text-3xl text-red-400 mb-4 tracking-widest">
                                ERROR 0x000000004F
                            </p>
                            <p className="text-sm md:text-lg text-red-500/80 mb-8 max-w-2xl mx-auto uppercase">
                                Unauthorized root access attempt logged. IP Address recorded. 
                                Deploying countermeasures...
                            </p>

                            <div className="flex flex-col items-start text-left max-w-xl mx-auto space-y-2 mt-4 text-xs font-mono text-red-400">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex gap-4"
                                    >
                                        <span>[{new Date().toISOString()}]</span>
                                        <span>TRACING CONNECTION SOURCE...</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {phase === 1 && (
                        <motion.div 
                            className="relative z-50 text-center bg-black/90 p-8 md:p-12 border-2 border-primary rounded-lg shadow-[0_0_50px_rgba(0,240,255,0.4)] pointer-events-auto max-w-2xl w-full mx-4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <h2 className="text-3xl font-black text-primary mb-2 uppercase tracking-widest">Systems Locked</h2>
                            <p className="text-sm text-gray-400 mb-8">CONNECTION HALTED. PROVE CLEARANCE TO REGAIN ACCESS.</p>

                            <div className="bg-primary/5 border border-primary/20 p-6 rounded text-left mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-primary/80 text-sm mb-0">SECURITY PROTOCOL SIGMA-9</p>
                                    <p className="text-red-500 text-xs font-bold animate-pulse">ATTEMPTS REMAINING: {attempts}/3</p>
                                </div>
                                <p className="text-xl text-white font-black mb-4">"{currentQuestion?.question}"</p>
                                
                                <form onSubmit={handleAnswerSubmit} className="flex flex-col gap-4">
                                    <select 
                                        value={hackerAnswer}
                                        onChange={(e) => setHackerAnswer(e.target.value)}
                                        className={`bg-black border ${hackerAnswer === 'INCORRECT_ATTEMPT' ? 'border-red-500 text-red-500' : 'border-primary/40 text-white'} focus:border-primary outline-none px-4 py-3 font-mono transition-colors appearance-none cursor-pointer`}
                                    >
                                        <option value="" disabled>Select the correct sector protocol...</option>
                                        {hackerAnswer === 'INCORRECT_ATTEMPT' && <option value="INCORRECT_ATTEMPT">-- ACCESS DENIED --</option>}
                                        {currentQuestion?.options?.map((opt, i) => (
                                            <option key={i} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    
                                    <button 
                                        type="submit"
                                        disabled={!hackerAnswer || hackerAnswer === 'INCORRECT_ATTEMPT'}
                                        className="bg-primary text-black font-black uppercase tracking-widest py-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        VERIFY_OVERRIDE
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && (
                        <motion.div 
                            className="relative z-50 text-center pointer-events-auto bg-black/80 p-12 border border-green-500/50 rounded-xl backdrop-blur-md max-w-2xl mx-4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <div className="w-16 h-16 rounded-full border-4 border-green-500 border-t-transparent animate-spin mx-auto mb-6" />
                            <h2 className="text-4xl md:text-5xl font-black text-green-500 mb-4 shadow-green-500 [text-shadow:0_0_20px_#22c55e]">AUTHORIZATION VALID</h2>
                            <p className="text-green-400 font-mono tracking-widest text-lg mb-2">Impressive skills, agent.</p>
                            <p className="text-gray-400 font-mono text-sm max-w-md mx-auto">
                                The threat has been neutralized and your clearance level has been upgraded. Rebuilding UI structure...
                            </p>
                        </motion.div>
                    )}

                    {phase === 3 && (
                        <motion.div 
                            className="relative z-50 text-center pointer-events-auto bg-black/98 p-12 border-4 border-red-600 rounded-lg shadow-[0_0_100px_rgba(255,0,0,0.6)]"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <h2 className="text-5xl md:text-7xl font-black text-red-600 mb-6 tracking-widest">SYSTEM LOCKED</h2>
                            <div className="h-1 w-full bg-red-600 mb-8 animate-pulse" />
                            <p className="text-red-400 font-mono text-xl tracking-widest mb-8">MAXIMUM FAILED ATTEMPTS REACHED.</p>
                            <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed">
                                Your connection pattern has been permanently flagged by the threat intelligence network as hostile.
                                <br /><br />
                                <span className="text-white font-bold">Please refresh your browser</span> to clear your cookies and reset the session.
                            </p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-8 border border-red-600 text-red-500 px-6 py-3 uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-colors"
                            >
                                INITIATE REBOOT
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
