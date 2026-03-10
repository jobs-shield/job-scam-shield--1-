"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiTerminal, HiPlay, HiCode, HiShieldExclamation } from "react-icons/hi";

const LABORATORY_SCRIPTS = [
    {
        id: "port_scan",
        name: "net_recon.py",
        code: `import socket

def scan(host, ports):
    for port in ports:
        s = socket.socket()
        if s.connect_ex((host, port)) == 0:
            print(f"[*] Port {port} OPEN")
        s.close()

scan('127.0.0.1', [21, 22, 80, 443])`,
        output: [
            "[!] INITIALIZING NETWORK RECONNAISSANCE...",
            "[*] TARGET: 127.0.0.1",
            "[*] Port 22 OPEN (SSH)",
            "[*] Port 80 OPEN (HTTP)",
            "[*] Port 443 OPEN (HTTPS)",
            "[+] RECON COMPLETE. 3 VULNERABILITIES IDENTIFIED."
        ]
    },
    {
        id: "hash_crack",
        name: "brute_force.py",
        code: `import hashlib

target = "5d41402abc4b2a76b9719d911017c592"
wordlist = ["admin", "password", "123456", "hello"]

for word in wordlist:
    if hashlib.md5(word.encode()).hexdigest() == target:
        print(f"[+] HASH CRACKED: {word}")`,
        output: [
            "[!] STARTING BRUTE FORCE ATTACK...",
            "[*] TRYING: admin... FAIL",
            "[*] TRYING: password... FAIL",
            "[*] TRYING: 123456... FAIL",
            "[*] TRYING: hello... MATCH FOUND!",
            "[+] HASH CRACKED: 'hello' (MD5)"
        ]
    }
];

const CyberLab = () => {
    const [selectedScript, setSelectedScript] = useState(LABORATORY_SCRIPTS[0]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);

    const executeScript = () => {
        setIsExecuting(true);
        setTerminalLines([]);

        let i = 0;
        const interval = setInterval(() => {
            if (i < selectedScript.output.length) {
                setTerminalLines(prev => [...prev, selectedScript.output[i]]);
                i++;
                if (terminalRef.current) {
                    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
                }
            } else {
                clearInterval(interval);
                setIsExecuting(false);
            }
        }, 700);
    };

    return (
        <section id="lab" className="py-24 sm:py-32 md:py-48 relative overflow-hidden bg-black/20">
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-20"
                >
                    <p className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] mb-4 uppercase">
                        Virtual_Sandbox
                    </p>
                    <h2 className="text-responsive-md sm:text-responsive-lg font-black mb-4 sm:mb-8 leading-none">
                        CYBER <span className="text-primary-glow">LAB</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl text-base sm:text-lg md:text-xl font-light leading-relaxed">
                        Interactive security simulations. Execute researcher scripts in a secure virtual environment.
                    </p>
                </motion.div>

                {/* IDE Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-10 items-stretch">

                    {/* Script Selector & Code View */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-card p-0 flex flex-col overflow-hidden border-white/5"
                    >
                        {/* Tab Bar */}
                        <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border-b border-white/5">
                            <HiCode className="text-primary text-sm sm:text-base shrink-0" />
                            <span className="font-mono text-[9px] sm:text-xs text-gray-400 tracking-widest uppercase">
                                Source_Workspace
                            </span>
                        </div>

                        {/* Script Tabs */}
                        <div className="flex bg-black/20 overflow-x-auto scrollbar-hide">
                            {LABORATORY_SCRIPTS.map(script => (
                                <button
                                    key={script.id}
                                    onClick={() => { setSelectedScript(script); setTerminalLines([]); }}
                                    className={`px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest transition-all shrink-0 touch-manipulation ${selectedScript.id === script.id
                                        ? 'bg-primary/10 text-primary border-b-2 border-primary'
                                        : 'text-gray-600 hover:text-gray-400'}`}
                                >
                                    {script.name}
                                </button>
                            ))}
                        </div>

                        {/* Code Display */}
                        <div className="p-4 sm:p-8 flex-grow font-mono text-xs sm:text-sm leading-relaxed overflow-auto">
                            <pre className="text-gray-400 whitespace-pre-wrap">
                                {selectedScript.code.split('\n').map((line, i) => (
                                    <div key={i} className="flex gap-4 sm:gap-6">
                                        <span className="text-gray-700 w-4 text-right select-none shrink-0">{i + 1}</span>
                                        <span>{line}</span>
                                    </div>
                                ))}
                            </pre>
                        </div>

                        {/* Run Button */}
                        <div className="p-4 sm:p-6 bg-white/5 border-t border-white/5">
                            <button
                                onClick={executeScript}
                                disabled={isExecuting}
                                className="btn-primary w-full py-3 sm:py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                aria-label="Execute security script"
                            >
                                {isExecuting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        <span>EXECUTING_UPLINK...</span>
                                    </>
                                ) : (
                                    <>
                                        <HiPlay className="text-lg sm:text-xl group-hover:scale-125 transition-transform" />
                                        <span>RUN_SECURITY_SCRIPT</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Terminal Output */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="glass-card p-0 border-primary/10 flex flex-col overflow-hidden bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <HiTerminal className="text-accent text-sm sm:text-base shrink-0" />
                                <span className="font-mono text-[9px] sm:text-[10px] text-accent font-bold tracking-widest uppercase">
                                    System_Output
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/30" />
                                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500/30" />
                                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500/30" />
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={terminalRef}
                            className="p-4 sm:p-8 flex-grow font-mono text-xs sm:text-sm overflow-auto min-h-[200px] sm:min-h-[300px] md:min-h-[400px]"
                        >
                            {!isExecuting && terminalLines.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-700 text-center gap-3 sm:gap-4 py-12">
                                    <HiShieldExclamation className="text-4xl sm:text-5xl opacity-20" />
                                    <p className="uppercase tracking-[0.3em] text-[9px] sm:text-[10px]">Awaiting Commands...</p>
                                </div>
                            )}
                            <AnimatePresence>
                                {terminalLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`mb-1.5 sm:mb-2 ${line?.startsWith?.('[+]') ? 'text-accent' :
                                            line?.startsWith?.('[!]') ? 'text-primary' :
                                                'text-gray-400'}`}
                                    >
                                        <span className="text-gray-800 mr-2 sm:mr-4 tracking-tighter">&gt;</span>
                                        {line || ""}
                                    </motion.div>
                                ))}
                                {isExecuting && (
                                    <motion.div
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="w-2 h-4 sm:h-5 bg-primary inline-block"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CyberLab;
