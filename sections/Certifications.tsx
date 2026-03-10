"use client";

import React from "react";
import dynamic from "next/dynamic";

const CertificateVault = dynamic(() => import("@/components/CertificateVault"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-black/20 font-mono text-primary animate-pulse">Decrypting_Credentials_Archive...</div>
});

const Certifications = () => {
    return (
        <section id="certifications" className="py-20 relative">
            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />

            <div className="section-container">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-primary font-mono">04.</span> Digital Archive
                    <div className="h-[1px] bg-white/10 flex-grow" />
                </h2>

                <div className="mb-10 text-center md:text-left">
                    <p className="text-gray-500 max-w-2xl leading-relaxed italic">
                        "Continuous learning is the cornerstone of effective security. Access my digital vault of verified credentials and professional achievements."
                    </p>
                </div>

                <div className="glass-card border border-white/5 overflow-hidden shadow-2xl relative min-h-[500px]">
                    {/* Scanline effect for the vault */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />
                    <CertificateVault />
                </div>
            </div>
        </section>
    );
};

export default Certifications;
