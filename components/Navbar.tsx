"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
    { name: "Archive", href: "#about", code: "01" },
    { name: "Arsenal", href: "#skills", code: "02" },
    { name: "Network", href: "#projects", code: "03" },
    { name: "Vault", href: "#certifications", code: "04" },
    { name: "Link", href: "#contact", code: "05" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className={`relative flex justify-between items-center px-8 py-3 rounded-2xl transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-xl border border-white/5 shadow-2xl" : "bg-transparent"
                    }`}>
                    {/* Logo */}
                    <Link href="#home" className="group flex items-center gap-2" aria-label="UKANDE Portfolio Home">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform" aria-hidden="true">
                            V
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white">UKANDE<span className="text-primary font-mono text-[10px] ml-1">v.1.0</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10" role="menubar">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                role="menuitem"
                                aria-label={`Navigate to ${link.name}`}
                                className="relative group text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
                            >
                                <span className="text-primary/50 mr-1.5" aria-hidden="true">{link.code}</span>
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        <a href="#contact" className="btn-primary text-[10px] py-2.5 px-6 rounded-full" aria-label="Establish Connection - Contact Section">
                            ESTABLISH_CONNECTION
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-2xl text-white hover:text-primary transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-50 md:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile Navigation Menu"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-12 p-10">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-10 right-10 text-3xl text-gray-500 hover:text-white p-2"
                                aria-label="Close menu"
                            >
                                <HiX aria-hidden="true" />
                            </button>

                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        aria-label={`Jump to ${link.name}`}
                                        className="text-4xl font-black hover:text-primary transition-colors flex items-center gap-4"
                                    >
                                        <span className="text-sm font-mono text-primary/40" aria-hidden="true">{link.code}</span>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="btn-primary mt-8 w-full py-5 text-center"
                            >
                                ESTABLISH_CONNECTION
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
