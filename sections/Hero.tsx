"use client";

import React from "react";
import { motion } from "framer-motion";
import MissionResume from "@/components/MissionResume";

const Hero = () => {
    return (
        <section id="home" className="min-h-[110vh] flex items-center justify-center pt-20 relative overflow-hidden bg-transparent">
            {/* Dynamic Lighting Atmos */}
            <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow -z-10 delay-1000" />

            <div className="section-container relative z-10">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono tracking-[0.3em] uppercase mb-10 backdrop-blur-xl animate-float">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Identity_Verified // Session_Secure
                        </div>

                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] mix-blend-lighten">
                            <span className="opacity-80">VIJAY BHAGWAT</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-glow-pulse">UKANDE</span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-xl md:text-2xl font-medium text-gray-500/80"
                        >
                            <span className="hover:text-primary transition-colors cursor-default">Cybersecurity Analyst</span>
                            <span className="text-primary/30">•</span>
                            <span className="hover:text-primary transition-colors cursor-default">Security Researcher</span>
                            <span className="text-primary/30">•</span>
                            <span className="hover:text-primary transition-colors cursor-default">Founder – TrustLayer</span>
                        </motion.div>

                        <p className="text-gray-500 max-w-3xl mx-auto mb-14 text-lg md:text-xl leading-relaxed font-light">
                            Developing secure defense mechanisms for the modern web.
                            Focused on <span className="text-primary/60">Vulnerability Research</span>,
                            <span className="text-primary/60">Network Security</span>, and
                            <span className="text-primary/60">Practical Lab Testing</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-full sm:w-auto px-12 group"
                            >
                                INITIATE_SCAN
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </motion.a>
                            <MissionResume />
                        </div>
                    </motion.div>

                    {/* Cinematic Stat Panels */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                        className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-6 px-4"
                    >
                        {[
                            { label: "LEARNING_PATH", val: "MSc_STUDENT", color: "text-primary" },
                            { label: "LAB_REPORTS", val: "15+", color: "text-accent" },
                            { label: "TOOLS_TAUGHT", val: "12+", color: "text-primary" },
                            { label: "CERTIFICATIONS", val: "10+", color: "text-secondary" }
                        ].map((stat, i) => (
                            <div key={stat.label} className={`glass-card p-6 group hover:-translate-y-2 animate-float-${i % 2 === 0 ? 'delayed' : ''}`}>
                                <p className="text-[10px] font-mono text-gray-500 mb-2 group-hover:text-primary transition-colors tracking-[0.2em]">{stat.label}</p>
                                <p className={`text-2xl font-black ${stat.color} tracking-widest`}>{stat.val}</p>
                                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-current opacity-30" style={{ width: `${Math.round(Math.random() * 60 + 40)}%` }} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Modern Grid Overlay */}
            <div className="cyber-grid-overlay opacity-[0.05]" />
        </section>
    );
};

export default Hero;
