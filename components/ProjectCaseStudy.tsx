"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronRight, HiTerminal } from "react-icons/hi";

interface CaseStudyProps {
    project: {
        title: string;
        objective: string;
        environment: string;
        tools: string[];
        methodology: string[];
        findings: string;
        remediation: string;
        color: string;
    } | null;
    onClose: () => void;
}

const ProjectCaseStudy = ({ project, onClose }: CaseStudyProps) => {
    if (!project) return null;

    const containerVariants: any = {
        hidden: { opacity: 0, x: "100%" },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 100,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0, x: "100%", transition: { duration: 0.4 } }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Accessibility: Support Escape key to close
    React.useEffect(() => {
        if (!project) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    key="case-study-overlay"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Project Case Study: ${project.title}`}
                    className="fixed inset-y-0 right-0 w-full md:w-[600px] z-[2000] p-6 pointer-events-none"
                >
                    <div className="glass-card h-full pointer-events-auto overflow-hidden flex flex-col relative border-l border-primary/20">
                        {/* Background scanline & noise */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(0,240,255,0.01),rgba(0,0,0,0),rgba(0,240,255,0.01))] z-0 bg-[length:100%_4px,100%_100%]" />

                        {/* Header */}
                        <div className="p-8 border-b border-white/5 relative z-10 bg-black/40 backdrop-blur-md">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <HiTerminal className="text-primary text-xl" />
                                    <span className="text-[10px] font-mono text-primary/60 tracking-[0.4em] uppercase">Security_Operation_Report</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-primary/40 hover:text-white"
                                >
                                    <HiX className="text-2xl" />
                                </button>
                            </div>
                            <motion.h2 variants={itemVariants} className="text-3xl font-black text-white tracking-tight leading-tight">
                                {project.title}
                            </motion.h2>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-12 relative z-10 scrollbar-hide pb-24">

                            {/* Objective Section */}
                            <motion.section variants={itemVariants}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                    <h3 className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase">01. Objective</h3>
                                </div>
                                <p className="text-gray-400 font-light leading-relaxed">{project.objective}</p>
                            </motion.section>

                            {/* Environment & Tools Section */}
                            <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase mb-4">02. Environment</h3>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg font-mono text-xs text-primary/80">
                                        {project.environment}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase mb-4">03. Stack_Manifest</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tools.map((tool, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] text-primary">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.section>

                            {/* Methodology Section */}
                            <motion.section variants={itemVariants}>
                                <h3 className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase mb-6">04. Attack_Methodology</h3>
                                <div className="space-y-4">
                                    {project.methodology.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <span className="text-primary font-bold text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                                            <div className="h-px bg-primary/20 flex-grow self-center" />
                                            <span className="text-gray-300 text-sm font-light">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Findings Section */}
                            <motion.section variants={itemVariants} className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <HiFire className="text-red-500 text-4xl" />
                                </div>
                                <h3 className="text-[10px] font-mono text-red-500 tracking-[0.3em] uppercase mb-4">05. Key_Findings</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{project.findings}</p>
                            </motion.section>

                            {/* Remediation Section */}
                            <motion.section variants={itemVariants} className="p-6 bg-accent/5 border border-accent/20 rounded-xl relative overflow-hidden group">
                                <h3 className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase mb-4">06. Security_Remediation</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{project.remediation}</p>
                            </motion.section>

                        </div>

                        {/* Footer Status */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-black/60 backdrop-blur-xl border-t border-white/5 flex justify-between items-center z-20">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-gray-500 font-mono tracking-widest">ENCRYPTION_LAYER</span>
                                    <span className="text-[10px] text-primary font-mono">RSA_4096_APPROVED</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-[10px] text-primary tracking-[0.3em] uppercase transition-all"
                            >
                                CLOSE_LINK
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const HiFire = ({ className }: { className?: string }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1014 0c0-1.187-.249-2.315-.697-3.333a1.24 1.24 0 00-.51-.558c-.282-.16-.583-.22-.863-.212a4.417 4.417 0 01-2.545-4.344zM10.874 15.29c-.19.064-.4.1-.624.1a2.1 2.1 0 01-2.1-2.1c0-.493.18-.934.475-1.275.05-.058.106-.112.167-.162.138-.113.25-.262.33-.432.08-.17.11-.36.11-.555V10.7a.5.5 0 011 0c0 .32.185.6.45.748.266.147.45.42.45.727v.7c0 .19-.03.37-.11.54a1.731 1.731 0 01-.188.375z" clipRule="evenodd"></path></svg>
);

export default ProjectCaseStudy;
