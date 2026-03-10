"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ThreatDashboard = dynamic(() => import("@/components/ThreatDashboard"), {
    ssr: false,
    loading: () => (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4 font-mono">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-primary text-[11px] tracking-widest animate-pulse uppercase">
                Connecting_Threat_Feed...
            </span>
        </div>
    )
});

const ThreatIntelligence = () => {
    return (
        <section id="threat-intelligence" className="py-24 sm:py-32 md:py-48 relative overflow-hidden">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] mb-4 uppercase">
                        Sec_Ops_Center
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between mb-6">
                        <h2 className="text-responsive-md sm:text-responsive-lg font-black leading-none tracking-tight">
                            THREAT{" "}
                            <span className="text-primary-glow">INTELLIGENCE</span>
                            <br className="sm:hidden" />
                            <span className="text-white"> DASHBOARD</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-xl sm:max-w-2xl leading-relaxed font-light text-base sm:text-lg">
                        Visualizing simulated global cyber threat activity and network telemetry.
                        Real-time handshake protocols and anomaly detection logs.
                    </p>
                    <div className="h-[1px] w-full bg-white/5 mt-8" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <ThreatDashboard />
                </motion.div>
            </div>

            <div className="absolute top-[20%] left-[−10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] sm:blur-[150px] -z-10" />
        </section>
    );
};

export default ThreatIntelligence;
