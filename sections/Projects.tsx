"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ProjectNetwork = dynamic(() => import("@/components/ProjectNetwork"), {
    ssr: false,
    loading: () => (
        <div className="h-[400px] sm:h-[500px] md:h-[600px] w-full flex flex-col items-center justify-center bg-black/20 font-mono gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-primary text-[11px] tracking-widest animate-pulse uppercase">
                Scanning_Network_Nodes...
            </span>
        </div>
    )
});

const Projects = () => {
    return (
        <section id="projects" className="py-24 sm:py-32 md:py-48 relative overflow-hidden bg-black/10">
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 sm:mb-20"
                >
                    <p className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] mb-4 uppercase">
                        Ops_Network_Map
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
                        <div>
                            <h2 className="text-responsive-md sm:text-responsive-lg font-black leading-none">
                                SECURITY <br />
                                <span className="text-primary-glow">NETWORK</span>
                            </h2>
                        </div>
                        <div className="max-w-xs sm:max-w-sm">
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-light">
                                Explore the interconnected landscape of my cybersecurity research.{" "}
                                <span className="text-primary/70 italic text-xs font-mono">
                                    Interact with the nodes to decode project objectives.
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-white/5 mt-8" />
                </motion.div>

                {/* Network Canvas */}
                <div className="glass-card overflow-hidden border border-white/5 shadow-2xl relative min-h-[400px] sm:min-h-[500px]">
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] z-10 bg-[length:100%_2px,3px_100%]" />
                    <ProjectNetwork />
                </div>
            </div>
        </section>
    );
};

export default Projects;
