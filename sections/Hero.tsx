"use client";

import React from "react";
import { motion } from "framer-motion";
import MissionResume from "@/components/MissionResume";

const STATS = [
    { label: "LEARNING_PATH", val: "MSc_STUDENT", color: "text-primary" },
    { label: "LAB_REPORTS", val: "15+", color: "text-accent" },
    { label: "TOOLS_TAUGHT", val: "12+", color: "text-primary" },
    { label: "CERTIFICATIONS", val: "10+", color: "text-secondary" }
];

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 relative overflow-hidden bg-transparent">
            {/* Dynamic Lighting Atmos */}
            <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-primary/8 rounded-full blur-[120px] animate-pulse-slow -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-secondary/8 rounded-full blur-[120px] animate-pulse-slow -z-10 delay-1000" />

            <div className="section-container relative z-10 w-full">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-2xl border border-primary/20 bg-primary/5 text-primary text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-8 sm:mb-10 backdrop-blur-xl animate-float">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            Identity_Verified // Session_Secure
                        </div>

                        {/* Main Name */}
                        <h1 className="text-responsive-hero font-black tracking-tighter mb-6 sm:mb-8 leading-[1.1] sm:leading-[0.85] mix-blend-lighten">
                            <span className="opacity-80 block sm:inline">VIJAY BHAGWAT</span>{" "}
                            <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-glow-pulse">
                                UKANDE
                            </span>
                        </h1>

                        {/* Role Descriptors */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-x-6 sm:gap-y-2 mb-8 sm:mb-10 text-base sm:text-xl md:text-2xl font-medium text-gray-500/80"
                        >
                            <span className="hover:text-primary transition-colors cursor-default">Cybersecurity Analyst</span>
                            <span className="text-primary/30 hidden sm:inline">•</span>
                            <span className="hover:text-primary transition-colors cursor-default">Security Researcher</span>
                            <span className="text-primary/30 hidden sm:inline">•</span>
                            <span className="hover:text-primary transition-colors cursor-default">Founder – TrustLayer</span>
                        </motion.div>

                        {/* Description */}
                        <p className="text-gray-500 max-w-xl sm:max-w-3xl mx-auto mb-10 sm:mb-14 text-base sm:text-lg md:text-xl leading-relaxed font-light px-2">
                            Developing secure defense mechanisms for the modern web.
                            Focused on{" "}
                            <span className="text-primary/60">Vulnerability Research</span>,{" "}
                            <span className="text-primary/60">Network Security</span>, and{" "}
                            <span className="text-primary/60">Practical Lab Testing</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-4 sm:px-0">
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-full sm:w-auto px-8 sm:px-12 group"
                                aria-label="View security projects"
                            >
                                INITIATE_SCAN
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </motion.a>
                            <div className="w-full sm:w-auto">
                                <MissionResume />
                            </div>
                        </div>
                    </motion.div>

                    {/* Stat Panels */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                        className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-0"
                    >
                        {STATS.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`glass-card p-4 sm:p-5 md:p-6 group hover:-translate-y-2 transition-all duration-300 ${i % 2 === 0 ? "animate-float" : "animate-float-delayed"}`}
                            >
                                <p className="text-[9px] sm:text-[10px] font-mono text-gray-500 mb-2 group-hover:text-primary transition-colors tracking-[0.15em] sm:tracking-[0.2em] truncate">
                                    {stat.label}
                                </p>
                                <p className={`text-lg sm:text-xl md:text-2xl font-black ${stat.color} tracking-widest`}>
                                    {stat.val}
                                </p>
                                <div className="mt-3 sm:mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-current opacity-30" style={{ width: `${[75, 85, 70, 90][i]}%` }} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="cyber-grid-overlay opacity-[0.04]" />
        </section>
    );
};

export default Hero;
