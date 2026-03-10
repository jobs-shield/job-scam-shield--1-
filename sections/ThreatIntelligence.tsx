"use client";

import React from "react";
import { motion } from "framer-motion";
import ThreatDashboard from "@/components/ThreatDashboard";

const ThreatIntelligence = () => {
    return (
        <section id="threat-intelligence" className="py-24 relative overflow-hidden">
            <div className="section-container">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase">Sec_Ops_Center</span>
                            <div className="h-px bg-primary/20 flex-grow" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            THREAT <span className="text-primary">INTELLIGENCE</span> DASHBOARD
                        </h2>
                        <p className="text-gray-500 max-w-2xl leading-relaxed font-light text-lg">
                            Visualizing simulated global cyber threat activity and network telemetry. Accessing real-time handshake protocols and anomaly detection logs.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <ThreatDashboard />
                </motion.div>
            </div>

            {/* Background elements to integrate with other sections */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-black/0 to-transparent pointer-events-none" />
            <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] -z-10" />
        </section>
    );
};

export default ThreatIntelligence;
