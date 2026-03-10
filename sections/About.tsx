"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-24 sm:py-32 md:py-48 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-[120px] sm:blur-[150px] -z-10" />

            <div className="section-container">
                <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24 items-center">

                    {/* Profile Card Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="w-full lg:flex-1"
                    >
                        <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-square animate-float">
                            {/* Orbital Frames */}
                            <div className="absolute inset-0 border-2 border-primary/10 rounded-[3rem] animate-[spin_20s_linear_infinite] opacity-30" />
                            <div className="absolute inset-6 sm:inset-8 border-2 border-secondary/10 rounded-[3rem] animate-[spin_15s_linear_infinite_reverse] opacity-20" />

                            {/* Main Profile Card */}
                            <div className="absolute inset-3 sm:inset-4 glass-card p-6 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center overflow-hidden">
                                <div className="absolute inset-0 cyber-grid-overlay opacity-10 pointer-events-none" />

                                <div className="relative z-10 w-full">
                                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 sm:mb-8 group">
                                        {/* Image Glow */}
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors duration-500" />

                                        {/* Profile Image */}
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                                            <img
                                                src="/profile.png"
                                                alt="Vijay Ukande – Cybersecurity Professional"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Scanline overlay */}
                                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
                                        </div>

                                        {/* Corner Accents */}
                                        <div className="absolute -top-2 -left-2 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-primary" />
                                        <div className="absolute -bottom-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-primary" />
                                    </div>

                                    <h4 className="text-primary font-mono text-[8px] sm:text-[10px] mb-2 tracking-[0.4em] sm:tracking-[0.5em] uppercase font-bold">
                                        OPERATIVE_ID // STATUS: ACTIVE
                                    </h4>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                                        VIJAY UKANDE
                                    </p>
                                    <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-4 sm:mb-6" />

                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light px-2">
                                        Passionate Cybersecurity Student & Founder at{" "}
                                        <span className="text-primary/60">TrustLayer</span>.
                                        Exploring the art of digital defense and cyber resilience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="w-full lg:flex-1"
                    >
                        <div className="inline-block px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-[9px] sm:text-[10px] text-primary font-mono mb-6 sm:mb-8 tracking-[0.25em] sm:tracking-[0.3em]">
                            ENTITY_LOG_01443
                        </div>
                        <h2 className="text-responsive-lg font-black mb-6 sm:mb-10 leading-none">
                            DECODING THE{" "}
                            <br />
                            <span className="text-primary-glow">MISSION</span>
                        </h2>

                        <div className="space-y-6 sm:space-y-8 text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                            <p>
                                I am an{" "}
                                <span className="text-white font-bold">Aspiring Cybersecurity Professional</span>{" "}
                                driven by the pursuit of digital equilibrium. My focus lies at the intersection of offensive security concepts and defensive architectural design.
                            </p>
                            <p>
                                After completing my studies at{" "}
                                <span className="text-white">Rajmata Jijau Mahavidyalaya</span>,
                                I am currently expanding my knowledge in the{" "}
                                <span className="text-white">MSc Cybersecurity</span> program at{" "}
                                <span className="text-white">MIT ACSC, Pune (Alandi)</span>.
                            </p>
                            <p className="relative pl-6 sm:pl-8 border-l-2 border-primary/20 italic text-gray-300 text-sm sm:text-base md:text-lg">
                                "The best defense is an intimate understanding of the attack."
                            </p>
                        </div>

                        {/* Operative Data Points */}
                        <div className="mt-10 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8">
                            {[
                                { val: "Dharur", label: "BASE_COORD", color: "text-primary" },
                                { val: "MSc CS", label: "INTEL_LEVEL", color: "text-white" },
                                { val: "SEC_X", label: "SPECIAL_OPS", color: "text-accent" }
                            ].map((item, i) => (
                                <div key={i} className="group cursor-default">
                                    <p className={`text-xl sm:text-2xl md:text-4xl font-black ${item.color} group-hover:scale-110 transition-transform`}>
                                        {item.val}
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] font-mono text-gray-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-2 sm:mt-3 group-hover:text-primary transition-colors">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
