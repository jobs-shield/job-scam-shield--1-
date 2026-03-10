"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { FaLinkedin, FaTwitter, FaGithub, FaPaperPlane, FaLock } from "react-icons/fa";

const Contact = () => {
    return (
        <section id="contact" className="py-48 relative overflow-hidden">
            {/* Global Background Light */}
            <div className="absolute bottom-0 left-1/4 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[200px] -z-10" />

            <div className="section-container">
                <div className="flex flex-col lg:flex-row gap-32">
                    {/* Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex-1"
                    >
                        <div className="flex items-center gap-2 text-primary font-mono text-[10px] tracking-[0.4em] uppercase mb-6">
                            <FaLock className="animate-pulse" />
                            Secure_Uplink_Channel
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9]">
                            ESTABLISH <br />
                            <span className="text-primary-glow">CONNECTION</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-primary mb-12 rounded-full" />

                        <p className="text-gray-400 mb-16 text-xl leading-relaxed font-light max-w-md">
                            Available for <span className="text-white">Security Consultation</span>,
                            <span className="text-white">Research Collaboration</span>, or
                            <span className="text-white">Enterprise Defense</span> inquiries.
                        </p>

                        <div className="space-y-12">
                            <motion.a
                                href="mailto:yashukande1443@gmail.com"
                                whileHover={{ x: 10 }}
                                className="group flex items-center gap-8"
                            >
                                <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500 shadow-xl backdrop-blur-xl">
                                    <HiOutlineMail className="text-3xl text-primary animate-float" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-[0.3em] mb-2">Protocol_Email</p>
                                    <p className="text-2xl font-black group-hover:text-primary transition-colors tracking-tight">yashukande1443@gmail.com</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://www.linkedin.com/in/vijay-ukande-017415225"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 10 }}
                                className="group flex items-center gap-8"
                                aria-label="Connect with Vijay Ukande on LinkedIn"
                            >
                                <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-secondary/50 transition-all duration-500 shadow-xl backdrop-blur-xl">
                                    <FaLinkedin className="text-3xl text-secondary animate-float-delayed" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-[0.3em] mb-2">Network_LinkedIn</p>
                                    <p className="text-2xl font-black group-hover:text-secondary transition-colors tracking-tight">Vijay Ukande</p>
                                </div>
                            </motion.a>
                        </div>

                        <div className="mt-20 flex gap-10">
                            {[
                                { Icon: FaGithub, href: "#", label: "Github Profile" },
                                { Icon: FaTwitter, href: "#", label: "Twitter Profile" },
                                { Icon: FaLinkedin, href: "https://www.linkedin.com/in/vijay-ukande-017415225", label: "LinkedIn Profile" }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    whileHover={{ y: -10, color: "#00f0ff", scale: 1.2 }}
                                    className="text-3xl text-gray-600 transition-all"
                                    aria-label={item.label}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                >
                                    <item.Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex-[1.3] relative"
                    >
                        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
                        <div className="glass-card p-12 md:p-20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
                            <div className="cyber-grid-overlay opacity-5 pointer-events-none" />

                            <form className="space-y-10 relative z-10" aria-label="Secure Transmission Form">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label htmlFor="operator-id" className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.3em] ml-2">Operator_ID</label>
                                        <input
                                            id="operator-id"
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10"
                                            placeholder="Anonymous"
                                            aria-required="true"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label htmlFor="email-endpoint" className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.3em] ml-2">Email_Endpoint</label>
                                        <input
                                            id="email-endpoint"
                                            type="email"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10"
                                            placeholder="alias@gateway.com"
                                            aria-required="true"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="mission-subject" className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.3em] ml-2">Mission_Subject</label>
                                    <input
                                        id="mission-subject"
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10"
                                        placeholder="Security Audit / Pentest / Collab"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="encrypted-payload" className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.3em] ml-2">Encrypted_Payload</label>
                                    <textarea
                                        id="encrypted-payload"
                                        rows={6}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10 resize-none"
                                        placeholder="Describe your transmission..."
                                        aria-required="true"
                                    />
                                </div>

                                <button type="button" className="btn-primary w-full group py-6 rounded-[2rem]" aria-label="Send Encrypted Transmission">
                                    SEND_TRANSMISSION
                                    <FaPaperPlane className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform text-xl" aria-hidden="true" />
                                </button>

                                <div className="flex items-center justify-center gap-3 text-gray-700">
                                    <div className="h-[1px] w-8 bg-current" />
                                    <span className="text-[9px] uppercase tracking-[0.5em] font-mono">End-to-End Encrypted</span>
                                    <div className="h-[1px] w-8 bg-current" />
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
