"use client";

import React from "react";
import dynamic from "next/dynamic";

const ProjectNetwork = dynamic(() => import("@/components/ProjectNetwork"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-black/20 font-mono text-primary animate-pulse">Scanning_Network_Nodes...</div>
});

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-card/10">
            <div className="section-container">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
                        <span className="text-primary font-mono">03.</span> Security Network
                        <div className="h-[1px] bg-white/10 flex-grow" />
                    </h2>
                    <p className="text-gray-500 max-w-2xl leading-relaxed">
                        Explore the interconnected landscape of my cybersecurity research. Each node represents a distinct security project, from web exploitation labs to dedicated hardware research.
                        <span className="text-primary/70 italic text-sm ml-2 font-mono">Interact with the nodes to decode project objectives.</span>
                    </p>
                </div>

                <div className="glass-card overflow-hidden border border-white/5 shadow-2xl relative min-h-[500px]">
                    {/* Visual scanline effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />

                    <ProjectNetwork />
                </div>
            </div>
        </section>
    );
};

export default Projects;
