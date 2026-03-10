"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiLockClosed, HiLockOpen, HiX, HiShieldCheck } from "react-icons/hi";
import { FaGoogle, FaAws } from "react-icons/fa";

const CERTIFICATES = [
    {
        id: "GCP",
        title: "Google Cybersecurity Professional",
        org: "Google",
        badge: "G",
        desc: "Foundations of cybersecurity, networking essentials, Linux, SQL, Python, and security tools. Comprehensive 8-course curriculum covering threat analysis and defense mechanisms.",
        color: "#00f0ff",
        accent: "from-cyan-500/20 to-blue-600/10",
        border: "border-cyan-500/30",
        level: "PROFESSIONAL",
        year: "2024",
        credId: "GCP-SEC-0001"
    },
    {
        id: "CISCO",
        title: "Cisco Networking Academy",
        org: "Cisco",
        badge: "C",
        desc: "Network security fundamentals, threat protection, and enterprise-grade security architecture. Cisco's industry-standard methodology for secure network design.",
        color: "#7000ff",
        accent: "from-purple-500/20 to-indigo-600/10",
        border: "border-purple-500/30",
        level: "ASSOCIATE",
        year: "2024",
        credId: "CISCO-NET-0201"
    },
    {
        id: "IBM",
        title: "IBM SkillsBuild Certification",
        org: "IBM",
        badge: "I",
        desc: "Comprehensive training in cyber threats, risk mitigation strategies, and incident response frameworks. IBM's enterprise security best practices and tooling.",
        color: "#00ff9f",
        accent: "from-emerald-500/20 to-teal-600/10",
        border: "border-emerald-500/30",
        level: "CERTIFIED",
        year: "2024",
        credId: "IBM-SB-0403"
    },
    {
        id: "MSFT",
        title: "Microsoft Student SOC Program",
        org: "Microsoft",
        badge: "M",
        desc: "Security Operations Center analyst training with real-world SIEM usage, incident triage, threat hunting, and Azure Sentinel integration.",
        color: "#ff6b6b",
        accent: "from-red-500/20 to-pink-600/10",
        border: "border-red-500/30",
        level: "SOC ANALYST",
        year: "2024",
        credId: "MSFT-SOC-0502"
    },
    {
        id: "NASSCOM",
        title: "NASSCOM FutureSkills",
        org: "NASSCOM",
        badge: "N",
        desc: "Industry-aligned cybersecurity skills program by India's premier tech body. Covers threat intelligence, risk frameworks, and national cybersecurity policies.",
        color: "#ff9f43",
        accent: "from-orange-500/20 to-yellow-600/10",
        border: "border-orange-500/30",
        level: "SPECIALIST",
        year: "2023",
        credId: "NASSCOM-FS-0301"
    },
    {
        id: "FORAGE",
        title: "Forage Security Simulations",
        org: "Forage",
        badge: "F",
        desc: "Real-world vulnerability analysis simulations from leading cybersecurity firms. Hands-on penetration testing, security audit, and reporting exercises.",
        color: "#a29bfe",
        accent: "from-violet-500/20 to-purple-600/10",
        border: "border-violet-500/30",
        level: "SIMULATION",
        year: "2024",
        credId: "FORAGE-SEC-0701"
    },
    {
        id: "ECPY",
        title: "Python for Absolute Beginners",
        org: "EC-Council",
        badge: "EC",
        desc: "Practical Python programming for security automation. Building port scanners, packet analyzers, and exploit frameworks using Python scripting.",
        color: "#00ff9f",
        accent: "from-green-500/20 to-emerald-600/10",
        border: "border-green-500/30",
        level: "BEGINNER+",
        year: "2023",
        credId: "EC-PY-0102"
    },
    {
        id: "ECDW",
        title: "Dark Web & Cryptocurrency",
        org: "EC-Council",
        badge: "EC",
        desc: "Deep dive into darknet structures, Tor network analysis, cryptocurrency tracing, and blockchain security for cyber investigators.",
        color: "#ff00ff",
        accent: "from-pink-500/20 to-fuchsia-600/10",
        border: "border-pink-500/30",
        level: "ADVANCED",
        year: "2024",
        credId: "EC-DW-0601"
    },
    {
        id: "DLAI",
        title: "AI for Everyone",
        org: "DeepLearning.AI",
        badge: "DL",
        desc: "Secure AI implementation fundamentals, understanding AI risks, ethical considerations, and defending AI systems against adversarial attacks.",
        color: "#00f0ff",
        accent: "from-cyan-500/20 to-sky-600/10",
        border: "border-cyan-400/30",
        level: "FOUNDATIONAL",
        year: "2023",
        credId: "DLAI-AIE-0901"
    },
    {
        id: "DD",
        title: "Digit Defence Internship",
        org: "Digit Defence",
        badge: "DD",
        desc: "Hands-on vulnerability research internship. Conducted real security assessments, wrote CVE reports, and collaborated with professional security teams.",
        color: "#7000ff",
        accent: "from-purple-600/20 to-violet-700/10",
        border: "border-purple-600/30",
        level: "INTERNSHIP",
        year: "2024",
        credId: "DD-INT-0801"
    },
    {
        id: "AICS",
        title: "AI Cyber Security Associate",
        org: "AI Security Institute",
        badge: "AI",
        desc: "Specialized certification in AI-driven security systems, machine learning for threat detection, and automated incident response pipelines.",
        color: "#00ff9f",
        accent: "from-teal-500/20 to-green-600/10",
        border: "border-teal-500/30",
        level: "ASSOCIATE",
        year: "2024",
        credId: "AICS-CSA-1101"
    }
];

/* ---- Individual Vault Card ---- */
function VaultCard({
    cert,
    index,
    onSelect
}: {
    cert: typeof CERTIFICATES[0];
    index: number;
    onSelect: (c: typeof CERTIFICATES[0]) => void;
}) {
    const [hovered, setHovered] = useState(false);
    const [scanPos, setScanPos] = useState(0);
    const animRef = useRef<number>(0);

    useEffect(() => {
        if (hovered) {
            let pos = 0;
            const step = () => {
                pos = (pos + 1) % 100;
                setScanPos(pos);
                animRef.current = requestAnimationFrame(step);
            };
            animRef.current = requestAnimationFrame(step);
        } else {
            cancelAnimationFrame(animRef.current);
        }
        return () => cancelAnimationFrame(animRef.current);
    }, [hovered]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.06, duration: 0.6, ease: "easeOut" }}
            className="relative cursor-pointer group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onSelect(cert)}
        >
            {/* Card Background */}
            <div
                className={`relative overflow-hidden rounded-2xl border ${cert.border} bg-gradient-to-br ${cert.accent} bg-black/60 backdrop-blur-xl p-5 sm:p-6 h-full transition-all duration-500 ${hovered ? "shadow-[0_0_30px_rgba(0,240,255,0.15)] -translate-y-1 scale-[1.02]" : ""}`}
                style={{ boxShadow: hovered ? `0 0 30px ${cert.color}20, inset 0 0 20px ${cert.color}05` : "" }}
            >
                {/* Scanline effect on hover */}
                {hovered && (
                    <div
                        className="absolute inset-x-0 h-[2px] pointer-events-none z-20 transition-all"
                        style={{
                            top: `${scanPos}%`,
                            background: `linear-gradient(90deg, transparent, ${cert.color}80, transparent)`
                        }}
                    />
                )}

                {/* Cyber corner brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l pointer-events-none" style={{ borderColor: `${cert.color}60` }} />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r pointer-events-none" style={{ borderColor: `${cert.color}60` }} />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l pointer-events-none" style={{ borderColor: `${cert.color}60` }} />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r pointer-events-none" style={{ borderColor: `${cert.color}60` }} />

                {/* Background grid */}
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${cert.color}40 1px, transparent 1px), linear-gradient(90deg, ${cert.color}40 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Header row */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                    {/* Badge */}
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-black shrink-0"
                        style={{ backgroundColor: cert.color }}
                    >
                        {cert.badge}
                    </div>

                    {/* Lock icon */}
                    <div className="text-lg transition-all duration-300" style={{ color: hovered ? cert.color : `${cert.color}40` }}>
                        {hovered ? <HiLockOpen /> : <HiLockClosed />}
                    </div>
                </div>

                {/* SEC ID */}
                <div className="font-mono text-[9px] tracking-[0.3em] mb-2 relative z-10" style={{ color: `${cert.color}60` }}>
                    SEC_ID: {cert.credId}
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-black text-white mb-1 leading-tight relative z-10">
                    {cert.title}
                </h3>

                {/* Org */}
                <p className="font-mono text-[10px] tracking-widest uppercase mb-3 relative z-10" style={{ color: cert.color }}>
                    {cert.org}
                </p>

                {/* Level badge */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t relative z-10" style={{ borderColor: `${cert.color}20` }}>
                    <span
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full border tracking-widest uppercase"
                        style={{
                            color: cert.color,
                            borderColor: `${cert.color}40`,
                            backgroundColor: `${cert.color}10`
                        }}
                    >
                        {cert.level}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600">{cert.year}</span>
                </div>
            </div>
        </motion.div>
    );
}

/* ---- Detail Modal ---- */
function CertModal({
    cert,
    onClose
}: {
    cert: typeof CERTIFICATES[0] | null;
    onClose: () => void;
}) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {cert && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[5000] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

                    <motion.div
                        initial={{ scale: 0.85, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.85, y: 40, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="glass-card relative p-6 sm:p-10 w-full max-w-lg z-10 overflow-hidden"
                        style={{ boxShadow: `0 0 60px ${cert.color}25, 0 30px 60px rgba(0,0,0,0.8)` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Animated scan line */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{ y: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="h-[2px] w-full absolute opacity-40"
                                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                            />
                        </div>

                        {/* Corner brackets */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: cert.color }} />
                        <div className="absolute top-4 right-14 w-6 h-6 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: cert.color }} />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: cert.color }} />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: cert.color }} />

                        {/* Grid overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(${cert.color} 1px, transparent 1px), linear-gradient(90deg, ${cert.color} 1px, transparent 1px)`,
                                backgroundSize: '30px 30px'
                            }}
                        />

                        {/* Close button */}
                        <button
                            className="absolute top-5 right-5 p-2 text-gray-500 hover:text-white transition-colors z-50 rounded-lg hover:bg-white/5"
                            onClick={onClose}
                            aria-label="Close credential detail"
                        >
                            <HiX size={20} />
                        </button>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <HiLockOpen className="animate-pulse" style={{ color: cert.color }} />
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em]" style={{ color: cert.color }}>
                                    Decryption_Complete
                                </span>
                            </div>

                            {/* Badge + Title */}
                            <div className="flex items-start gap-4 mb-6">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-black shrink-0"
                                    style={{ backgroundColor: cert.color }}
                                >
                                    {cert.badge}
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                                        {cert.title}
                                    </h3>
                                    <p className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: cert.color }}>
                                        {cert.org}
                                    </p>
                                </div>
                            </div>

                            <div className="h-0.5 w-16 mb-6 rounded-full" style={{ backgroundColor: cert.color }} />

                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-light mb-8">
                                {cert.desc}
                            </p>

                            {/* Metadata chips */}
                            <div className="flex flex-wrap gap-2 pt-6 border-t" style={{ borderColor: `${cert.color}20` }}>
                                <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono">
                                    ID: {cert.credId}
                                </div>
                                <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono">
                                    YEAR: {cert.year}
                                </div>
                                <div
                                    className="px-3 py-1.5 rounded-lg border text-[10px] font-mono"
                                    style={{ backgroundColor: `${cert.color}10`, borderColor: `${cert.color}40`, color: cert.color }}
                                >
                                    {cert.level}
                                </div>
                                <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono">
                                    HASH: SHA_256 ✓
                                </div>
                            </div>

                            {/* Verified badge */}
                            <div className="mt-6 flex items-center gap-2">
                                <HiShieldCheck size={16} style={{ color: cert.color }} />
                                <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: `${cert.color}80` }}>
                                    Blockchain_Verified • Tamper_Proof
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ---- Main CertificateVault Component ---- */
const CertificateVault = () => {
    const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[0] | null>(null);
    const [filter, setFilter] = useState<string>("ALL");

    const levels = ["ALL", "PROFESSIONAL", "ASSOCIATE", "CERTIFIED", "ADVANCED", "INTERNSHIP"];

    const filtered = filter === "ALL"
        ? CERTIFICATES
        : CERTIFICATES.filter(c => c.level === filter);

    return (
        <div className="w-full" role="region" aria-label="Digital Credential Vault">
            {/* Status Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8 font-mono" aria-hidden="true">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] text-primary/60 tracking-widest">VAULT_STATUS: ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] text-accent/60 tracking-widest">ENCRYPTION: AES_256</span>
                </div>
                <div className="ml-auto text-[10px] text-gray-700 tracking-widest hidden sm:block">
                    TOTAL_RECORDS: {CERTIFICATES.length}
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {levels.map(level => (
                    <button
                        key={level}
                        onClick={() => setFilter(level)}
                        className={`px-3 py-1.5 rounded-xl border text-[9px] sm:text-[10px] font-mono uppercase tracking-widest transition-all duration-300 touch-manipulation min-h-[36px] ${filter === level
                            ? "bg-primary/20 border-primary/50 text-primary"
                            : "bg-white/5 border-white/5 text-gray-600 hover:text-gray-300 hover:border-white/20"}`}
                    >
                        {level}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
            >
                <AnimatePresence>
                    {filtered.map((cert, i) => (
                        <VaultCard
                            key={cert.id}
                            cert={cert}
                            index={i}
                            onSelect={setSelectedCert}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Bottom indicator */}
            <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-700 tracking-widest">
                    <div className="h-[1px] w-12 bg-primary/20" />
                    ARCHIVE_END // {filtered.length} RECORDS DISPLAYED
                    <div className="h-[1px] w-12 bg-primary/20" />
                </div>
            </div>

            {/* Detail Modal */}
            <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        </div>
    );
};

export default CertificateVault;
