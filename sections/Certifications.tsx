"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CertificateVault = dynamic(() => import("@/components/CertificateVault"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center bg-black/20 font-mono gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-primary text-[11px] tracking-widest animate-pulse uppercase">
                Decrypting_Credentials_Archive...
            </span>
        </div>
    )
});

const Certifications = () => {
    return (
        <section id="certifications" className="py-24 sm:py-32 md:py-48 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-primary/5 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none -z-10" />

            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 sm:mb-20"
                >
                    <p className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] mb-4 uppercase">
                        Credential_Archive
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-0 justify-between">
                        <div>
                            <h2 className="text-responsive-md sm:text-responsive-lg font-black leading-none">
                                DIGITAL <br />
                                <span className="text-primary-glow">VAULT</span>
                            </h2>
                        </div>
                        <div className="max-w-sm sm:max-w-xs">
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-light">
                                Verified credentials and professional achievements. Click any card to decrypt its details.
                            </p>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-white/5 mt-8" />
                </motion.div>

                <CertificateVault />
            </div>
        </section>
    );
};

export default Certifications;
