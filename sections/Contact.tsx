"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { FaLinkedin, FaTwitter, FaGithub, FaPaperPlane, FaLock } from "react-icons/fa";

const Contact = () => {
    return (
        <section id="contact" className="py-24 sm:py-32 md:py-48 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/4 w-[60%] h-[50%] bg-primary/5 rounded-full blur-[160px] sm:blur-[200px] -z-10" />

            <div className="section-container">
                <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-32">

                    {/* Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full lg:flex-1"
                    >
                        <div className="flex items-center gap-2 text-primary font-mono text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6">
                            <FaLock className="animate-pulse shrink-0" />
                            Secure_Uplink_Channel
                        </div>
                        <h2 className="text-responsive-lg font-black mb-6 sm:mb-10 leading-[0.9]">
                            ESTABLISH{" "}
                            <br />
                            <span className="text-primary-glow">CONNECTION</span>
                        </h2>
                        <div className="h-1 sm:h-1.5 w-20 sm:w-24 bg-primary mb-8 sm:mb-12 rounded-full" />

                        <p className="text-gray-400 mb-10 sm:mb-16 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-md">
                            Available for{" "}
                            <span className="text-white">Security Consultation</span>,{" "}
                            <span className="text-white">Research Collaboration</span>, or{" "}
                            <span className="text-white">Enterprise Defense</span> inquiries.
                        </p>

                        {/* Contact Links */}
                        <div className="space-y-8 sm:space-y-12">
                            <motion.a
                                href="mailto:yashukande1443@gmail.com"
                                whileHover={{ x: 8 }}
                                className="group flex items-center gap-5 sm:gap-8 touch-manipulation"
                                aria-label="Email Vijay Ukande"
                            >
                                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500 shadow-xl backdrop-blur-xl shrink-0">
                                    <HiOutlineMail className="text-2xl sm:text-3xl text-primary animate-float" />
                                </div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-mono tracking-[0.25em] sm:tracking-[0.3em] mb-1 sm:mb-2">
                                        Protocol_Email
                                    </p>
                                    <p className="text-base sm:text-lg md:text-2xl font-black group-hover:text-primary transition-colors tracking-tight break-all">
                                        yashukande1443@gmail.com
                                    </p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://www.linkedin.com/in/vijay-ukande-017415225"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 8 }}
                                className="group flex items-center gap-5 sm:gap-8 touch-manipulation"
                                aria-label="Connect with Vijay Ukande on LinkedIn"
                            >
                                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-secondary/50 transition-all duration-500 shadow-xl backdrop-blur-xl shrink-0">
                                    <FaLinkedin className="text-2xl sm:text-3xl text-secondary animate-float-delayed" />
                                </div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-mono tracking-[0.25em] sm:tracking-[0.3em] mb-1 sm:mb-2">
                                        Network_LinkedIn
                                    </p>
                                    <p className="text-base sm:text-lg md:text-2xl font-black group-hover:text-secondary transition-colors tracking-tight">
                                        Vijay Ukande
                                    </p>
                                </div>
                            </motion.a>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-12 sm:mt-20 flex gap-6 sm:gap-10">
                            {[
                                { Icon: FaGithub, href: "#", label: "Github Profile" },
                                { Icon: FaTwitter, href: "#", label: "Twitter Profile" },
                                { Icon: FaLinkedin, href: "https://www.linkedin.com/in/vijay-ukande-017415225", label: "LinkedIn Profile" }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    whileHover={{ y: -8, color: "#00f0ff", scale: 1.2 }}
                                    className="text-2xl sm:text-3xl text-gray-600 transition-all touch-manipulation p-2"
                                    aria-label={item.label}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                    <item.Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full lg:flex-[1.3] relative"
                    >
                        <div className="absolute inset-0 bg-primary/5 blur-[80px] sm:blur-[120px] rounded-full -z-10" />
                        <div className="glass-card p-6 sm:p-10 md:p-16 lg:p-20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[60px] sm:blur-[80px]" />
                            <div className="cyber-grid-overlay opacity-5 pointer-events-none" />

                            <form className="space-y-6 sm:space-y-10 relative z-10" aria-label="Secure Transmission Form">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                                    <div className="space-y-2 sm:space-y-3">
                                        <label htmlFor="operator-id" className="text-[9px] sm:text-[10px] font-mono text-primary/60 uppercase tracking-[0.25em] sm:tracking-[0.3em] ml-1 sm:ml-2">
                                            Operator_ID
                                        </label>
                                        <input
                                            id="operator-id"
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10 text-sm sm:text-base"
                                            placeholder="Anonymous"
                                            aria-required="true"
                                        />
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <label htmlFor="email-endpoint" className="text-[9px] sm:text-[10px] font-mono text-primary/60 uppercase tracking-[0.25em] sm:tracking-[0.3em] ml-1 sm:ml-2">
                                            Email_Endpoint
                                        </label>
                                        <input
                                            id="email-endpoint"
                                            type="email"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10 text-sm sm:text-base"
                                            placeholder="alias@gateway.com"
                                            aria-required="true"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <label htmlFor="mission-subject" className="text-[9px] sm:text-[10px] font-mono text-primary/60 uppercase tracking-[0.25em] sm:tracking-[0.3em] ml-1 sm:ml-2">
                                        Mission_Subject
                                    </label>
                                    <input
                                        id="mission-subject"
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10 text-sm sm:text-base"
                                        placeholder="Security Audit / Pentest / Collab"
                                    />
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <label htmlFor="encrypted-payload" className="text-[9px] sm:text-[10px] font-mono text-primary/60 uppercase tracking-[0.25em] sm:tracking-[0.3em] ml-1 sm:ml-2">
                                        Encrypted_Payload
                                    </label>
                                    <textarea
                                        id="encrypted-payload"
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-5 focus:outline-none focus:border-primary/50 transition-all backdrop-blur-xl hover:bg-white/10 resize-none text-sm sm:text-base"
                                        placeholder="Describe your transmission..."
                                        aria-required="true"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn-primary w-full group py-4 sm:py-6 rounded-2xl sm:rounded-[2rem]"
                                    aria-label="Send Encrypted Transmission"
                                >
                                    SEND_TRANSMISSION
                                    <FaPaperPlane className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform text-lg sm:text-xl" aria-hidden="true" />
                                </button>

                                <div className="flex items-center justify-center gap-3 text-gray-700">
                                    <div className="h-[1px] w-6 sm:w-8 bg-current" />
                                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-mono">End-to-End Encrypted</span>
                                    <div className="h-[1px] w-6 sm:w-8 bg-current" />
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
