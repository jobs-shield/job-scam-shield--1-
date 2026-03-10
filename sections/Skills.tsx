"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    SiKalilinux, SiWireshark, SiLinux, SiPython, SiBurpsuite
} from "react-icons/si";
import { FaShieldAlt, FaNetworkWired } from "react-icons/fa";

import SkillRadar from "@/components/SkillRadar";

const skillCategories = [
    {
        title: "Cyber Defense",
        icon: <FaShieldAlt className="text-5xl" />,
        color: "from-cyan-500/20 to-blue-600/20",
        glow: "rgba(0, 240, 255, 0.4)",
        stats: [
            { label: "VULN_ASSESS", value: 85 },
            { label: "PEN_TEST", value: 78 },
            { label: "NET_SEC", value: 92 },
            { label: "INC_RESPONSE", value: 65 },
            { label: "ARCH_DESIGN", value: 70 },
            { label: "THREAT_HUNT", value: 60 }
        ],
        skills: [
            "Vulnerability Assessment",
            "Penetration Testing",
            "Network Security",
            "Incident Response",
        ],
    },
    {
        title: "Operations & Tools",
        icon: <SiKalilinux className="text-5xl" />,
        color: "from-purple-500/20 to-indigo-600/20",
        glow: "rgba(112, 0, 255, 0.4)",
        stats: [
            { label: "KALI_LINUX", value: 95 },
            { label: "BURP_SUITE", value: 82 },
            { label: "WIRESHARK", value: 88 },
            { label: "OPENVAS", value: 75 },
            { label: "SCRIPTING", value: 80 },
            { label: "AUTOMATION", value: 70 }
        ],
        skills: [
            "Kali Linux Architecture",
            "OpenVAS Security Scanning",
            "Burp Suite Professional",
            "Wireshark Protocol Analysis",
            "Linux CLI Automation",
        ],
    },
    {
        title: "Intelligence & Research",
        icon: <FaNetworkWired className="text-5xl" />,
        color: "from-emerald-500/20 to-teal-600/20",
        glow: "rgba(0, 255, 159, 0.4)",
        stats: [
            { label: "PYTHON_RSCH", value: 85 },
            { label: "OSINT", value: 78 },
            { label: "NET_PROTO", value: 90 },
            { label: "SQL_INJECT", value: 82 },
            { label: "MALWARE_AN", value: 65 },
            { label: "REVERSING", value: 55 }
        ],
        skills: [
            "Python Research Tools",
            "SQL Injections & Defense",
            "Networking Protocols",
            "Dark Web Intelligence",
        ],
    },
];

const Skills = () => {
    return (
        <section id="skills" className="py-48 relative overflow-hidden">
            <div className="section-container">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-primary font-mono text-xs tracking-[0.5em] mb-4 uppercase">Capabilities_Matrix</p>
                        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none">
                            TECHNICAL <br /><span className="text-primary-glow">ARSENAL</span>
                        </h2>
                        <div className="h-1.5 w-32 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-10 rounded-full" />
                        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                            A multi-layered ecosystem of offensive and defensive weaponry engineered for digital equilibrium.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            className="group relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                        >
                            {/* Dynamic Aura */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 blur-[80px] transition-all duration-700 -z-10`}
                            />

                            <div className="glass-card p-10 h-full flex flex-col group-hover:border-primary/40 group-hover:-translate-y-4 bg-black/40 relative overflow-hidden">
                                {/* Vulnerability Scan Overlay */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/30 shadow-[0_0_15px_#00f0ff] opacity-0 group-hover:opacity-100 animate-scan pointer-events-none" />

                                <div className="mb-10 flex justify-between items-start">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary/20 transition-colors shadow-inner">
                                        <div className="text-primary group-hover:text-white transition-colors">
                                            {category.icon}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono tracking-[0.3em] bg-white/5 px-3 py-1 rounded-full text-gray-500 uppercase">
                                        Mod_0{index + 1}
                                    </span>
                                </div>

                                <h3 className="text-3xl font-black mb-8 text-white tracking-tight">
                                    {category.title}
                                </h3>

                                {/* Skill Radar Visualization */}
                                <div className="mb-10 py-4 scale-90 group-hover:scale-100 transition-transform duration-500">
                                    <SkillRadar skills={category.stats} color={index === 1 ? '#7000ff' : index === 2 ? '#00ffaa' : '#00f0ff'} />
                                </div>

                                <ul className="space-y-4 flex-grow relative z-10">
                                    {category.skills.map((skill) => (
                                        <li key={skill} className="flex items-center gap-4 group/item">
                                            <div className="relative flex h-1.5 w-1.5">
                                                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                                                <div className="relative h-1.5 w-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                                            </div>
                                            <span className="text-base text-gray-400 font-light group-hover/item:text-white transition-colors">{skill}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-10 pt-6 border-t border-white/5">
                                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-2">
                                        <span>SYSTEM_SYNC</span>
                                        <span className="text-primary">COMPLETE</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 2, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-primary to-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 cyber-grid-overlay opacity-[0.03] -z-20" />
        </section>
    );
};

export default Skills;
