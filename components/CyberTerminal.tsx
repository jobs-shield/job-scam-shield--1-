"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiTerminal, HiX } from "react-icons/hi";

const COMMANDS = {
    help: "Available commands: help, about, skills, projects, certifications, contact, clear, start hack-os. \n[CLASSIFIED HINT: if you're stuck, just type 'hack' anywhere on the visual interface to see what happens.]",
    about: `Vijay Bhagwat Ukande - Cybersecurity Aspirant & Dedicated Student.
Founder of TrustLayer (Educational Initiative).
Education: BSc Computer Science (Rajmata Jijau Mahavidyalaya) | MSc Cybersecurity (MIT ACSC, Pune - Currently Enrolled).
Focus: Learning Vulnerability Assessment, Penetration Testing, and Security Concepts.`,
    skills: `Current Learning Focus: 
- Cybersecurity Fundamentals
- Practical Penetration Testing (Labs)
- Vulnerability Concepts
Tools: Kali Linux, OpenVAS, Burp Suite, Wireshark.
Programming: Python, SQL, C++, Networking Fundamentals.`,
    projects: `Security Projects:
- DVWA Exploitation Lab: Detailed audit of web vulnerabilities.
- OpenVAS Assessment: Automated network-wide vulnerability scans.
- Burp Suite Testing: Comprehensive web security audits.
- ESP32 Bluetooth Deauther: Hardware-based security research.`,
    certifications: `Professional Certifications:
- Google Cybersecurity Professional
- Cisco Networking Academy: Intro to Cybersecurity
- IBM SkillsBuild: Cybersecurity Fundamentals
- Microsoft Student SOC Training
- NASSCOM FutureSkills Cybersecurity Professional
- EC-Council: Python for Beginners & Dark Web Fundamentals
- DeepLearning.AI: AI for Everyone`,
    contact: `Communication Channels:
Email: yashukande1443@gmail.com
LinkedIn: linkedin.com/in/vijay-ukande-017415225
GitHub: github.com/vijay-ukande`,
};

const CyberTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOSMode, setIsOSMode] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ type: "input" | "output"; text: string }[]>([
        { type: "output", text: "Welcome to TrustLayer Secure Terminal v1.0.4" },
        { type: "output", text: "Type 'help' to see available commands." },
    ]);

    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                terminalRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
            );
            inputRef.current?.focus();

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setIsOpen(false);
                    setIsOSMode(false);
                }
            };
            window.addEventListener("keydown", handleEscape);
            return () => window.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.toLowerCase().trim();
        const newHistory = [...history, { type: "input", text: cleanCmd } as const];

        if (cleanCmd === "clear") {
            setHistory([]);
            return;
        }

        if (cleanCmd === "") {
            setHistory(newHistory);
            return;
        }

        if (cleanCmd === "start hack-os") {
            setHistory([...newHistory, { type: "output", text: "INITIATING FULL SYSTEM OVERRIDE..." }]);
            setTimeout(() => {
                setIsOSMode(true);
                setHistory([{ type: "output", text: "ROOT SHELL ACCESS GRANTED. FULL OS OVERRIDE ACTIVE. Type 'exit' to return." }]);
            }, 800);
            return;
        }

        if (cleanCmd === "exit" && isOSMode) {
            setIsOSMode(false);
            setHistory([...newHistory, { type: "output", text: "Closing OS mode..." }]);
            return;
        }

        const output = COMMANDS[cleanCmd as keyof typeof COMMANDS] || "Command not recognized. Type 'help' to see available commands.";

        // Simulate typing effect by adding to history
        setHistory([...newHistory, { type: "output", text: output }]);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 z-[60] bg-primary/20 hover:bg-primary/40 text-primary p-4 rounded-full border border-primary/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group"
                title={isOpen ? "Close Terminal" : "Open Terminal"}
                aria-label={isOpen ? "Close Terminal" : "Open Terminal"}
                aria-expanded={isOpen}
            >
                {isOpen ? <HiX className="text-2xl" aria-hidden="true" /> : <HiTerminal className="text-2xl" aria-hidden="true" />}
                <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-background border border-primary/20 px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {isOpen ? "Close Terminal" : "Open Terminal"}
                </span>
            </button>

            {/* Terminal Overlay */}
            {isOpen && (
                <div
                    ref={terminalRef}
                    role="dialog"
                    aria-label="Cyber Security Terminal"
                    className={
                        isOSMode 
                            ? "fixed inset-0 w-full h-full bg-[#020202] z-[99999] flex flex-col font-mono text-primary"
                            : "fixed bottom-28 right-8 w-[90vw] md:w-[600px] h-[400px] bg-background/95 backdrop-blur-xl border border-primary/30 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden font-mono"
                    }
                >
                    {/* Header */}
                    <div className={`${isOSMode ? 'bg-black border-b border-primary/40' : 'bg-primary/10 border-b border-primary/20'} px-4 py-2 flex justify-between items-center`}>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            <span className="ml-2 text-xs text-primary/70 uppercase tracking-widest pt-0.5">
                                {isOSMode ? 'TRUSTLAYER_OS_ROOT' : 'Secure_Terminal_v1.0.4'}
                            </span>
                        </div>
                        <button
                            onClick={() => { setIsOpen(false); setIsOSMode(false); }}
                            aria-label="Close Terminal"
                            className="p-1 hover:text-primary transition-colors"
                        >
                            <HiX className="text-primary/50" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Output Area */}
                    <div
                        className={`flex-1 overflow-y-auto p-4 ${isOSMode ? 'text-base sm:text-lg' : 'text-sm'} scrollbar-hide`}
                        aria-live="polite"
                    >
                        {history.map((line, i) => (
                            <div key={i} className="mb-2">
                                {line.type === "input" ? (
                                    <div className="flex gap-2">
                                        <span className="text-accent">visitor@cyber-system:~$</span>
                                        <span className="text-white">{line.text}</span>
                                    </div>
                                ) : (
                                    <div className="text-primary italic whitespace-pre-wrap leading-relaxed opacity-90 border-l-2 border-primary/20 pl-3 py-1">
                                        {line.text}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input Area */}
                    <label className={`p-4 ${isOSMode ? 'bg-black border-t border-primary/40' : 'bg-primary/5 border-t border-primary/10'} flex gap-2 items-center cursor-text`}>
                        <span className="text-accent text-sm">visitor@cyber-system:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            className={`flex-1 bg-transparent border-none outline-none text-white ${isOSMode ? 'text-base sm:text-lg' : 'text-sm'}`}
                            autoFocus
                            aria-label="Terminal Input"
                        />
                        <div className="w-2 h-4 bg-primary animate-pulse" aria-hidden="true" />
                    </label>
                </div>
            )}
        </>
    );
};

export default CyberTerminal;
