"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-48 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -z-10" />

            <div className="section-container">
                <div className="flex flex-col lg:flex-row gap-24 items-center">
                    {/* Perspective Interactive Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -100, rotateY: -20 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="flex-1 perspective-1000"
                    >
                        <div className="relative w-full max-w-lg aspect-square mx-auto animate-float">
                            {/* Orbital Frames */}
                            <div className="absolute inset-0 border-2 border-primary/10 rounded-[3rem] animate-[spin_20s_linear_infinite] opacity-30" />
                            <div className="absolute inset-8 border-2 border-secondary/10 rounded-[3rem] animate-[spin_15s_linear_infinite_reverse] opacity-20" />

                            {/* Main Profile Card */}
                            <div className="absolute inset-4 glass-card p-12 flex flex-col items-center justify-center text-center overflow-hidden">
                                <div className="absolute inset-0 cyber-grid-overlay opacity-10 pointer-events-none" />

                                <div className="relative z-10 w-full">
                                    <div className="relative w-48 h-48 mx-auto mb-8 group">
                                        {/* Image Glow Background */}
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors duration-500" />

                                        {/* Image Container */}
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                                            <img
                                                src="/profile.png"
                                                alt="Vijay Ukande"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Scanline overlay on image */}
                                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
                                        </div>

                                        {/* Corner Accents */}
                                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
                                    </div>

                                    <h4 className="text-primary font-mono text-[10px] mb-2 tracking-[0.5em] uppercase font-bold">OPERATIVE_ID // STATUS: ACTIVE</h4>
                                    <p className="text-4xl font-black text-white mb-4 tracking-tight">VIJAY UKANDE</p>
                                    <div className="h-1 w-20 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-6" />

                                    <p className="text-gray-400 text-base leading-relaxed font-light px-4">
                                        Passionate Cybersecurity Student & Founder at <span className="text-primary/60">TrustLayer</span>.
                                        Exploring the art of digital defense and cyber resilience.
                                    </p>
                                </div>
                                <div className="mt-10 flex justify-center gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="flex-1"
                    >
                        <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-[10px] text-primary font-mono mb-8 tracking-[0.3em]">
                            ENTITY_LOG_01443
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black mb-10 leading-none">
                            DECODING THE <br />
                            <span className="text-primary-glow">MISSION</span>
                        </h2>

                        <div className="space-y-8 text-gray-400 text-xl leading-relaxed font-light">
                            <p>
                                I am an <span className="text-white font-bold">Aspiring Cybersecurity Professional</span> driven by the pursuit of digital equilibrium.
                                My focus lies at the intersection of offensive security concepts and defensive architectural design.
                            </p>
                            <p>
                                After completing my studies at <span className="text-white">Rajmata Jijau Mahavidyalaya</span>,
                                I am currently expanding my knowledge in the <span className="text-white">MSc Cybersecurity</span> program at <span className="text-white">MIT ACSC, Pune (Alandi)</span>.
                            </p>
                            <p className="relative pl-8 border-l-2 border-primary/20 italic text-gray-300">
                                "The best defense is an intimate understanding of the attack."
                            </p>
                        </div>

                        {/* Operative Data Points */}
                        <div className="mt-16 grid grid-cols-3 gap-8">
                            {[
                                { val: "Dharur", label: "BASE_COORD", color: "text-primary" },
                                { val: "MSc CS", label: "INTEL_LEVEL", color: "text-white" },
                                { val: "SEC_X", label: "SPECIAL_OPS", color: "text-accent" }
                            ].map((item, i) => (
                                <div key={i} className="group cursor-default">
                                    <p className={`text-4xl font-black ${item.color} group-hover:scale-110 transition-transform`}>{item.val}</p>
                                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em] mt-3 group-hover:text-primary transition-colors">{item.label}</p>
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
