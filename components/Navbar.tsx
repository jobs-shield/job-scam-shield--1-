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
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-2 sm:py-4" : "py-4 sm:py-8"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div
                        className={`relative flex justify-between items-center px-4 sm:px-8 py-3 rounded-2xl transition-all duration-500 ${scrolled
                            ? "bg-black/70 backdrop-blur-2xl border border-white/5 shadow-2xl"
                            : "bg-transparent"}`}
                    >
                        {/* Logo */}
                        <Link
                            href="#home"
                            className="group flex items-center gap-2"
                            aria-label="UKANDE Portfolio Home"
                            onClick={closeMenu}
                        >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform text-sm sm:text-base">
                                V
                            </div>
                            <span className="text-lg sm:text-xl font-black tracking-tighter text-white">
                                UKANDE
                                <span className="text-primary font-mono text-[9px] sm:text-[10px] ml-1">v.1.0</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-10" role="menubar">
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

                            <a
                                href="#contact"
                                className="btn-primary text-[10px] py-2.5 px-5 lg:px-6 rounded-full"
                                aria-label="Establish Connection - Contact Section"
                            >
                                ESTABLISH_CONNECTION
                            </a>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden w-10 h-10 flex items-center justify-center text-xl text-white hover:text-primary transition-colors touch-manipulation rounded-xl hover:bg-white/5"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            {isOpen ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 220 }}
                        className="fixed inset-0 bg-[#020202]/98 backdrop-blur-2xl z-[99] md:hidden flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile Navigation Menu"
                    >
                        {/* Scan line decoration */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 cyber-grid-overlay opacity-[0.03]" />
                        </div>

                        {/* Close Button */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10">
                            <Link href="#home" onClick={closeMenu} className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center font-black text-black text-sm">V</div>
                                <span className="text-lg font-black tracking-tighter text-white">UKANDE<span className="text-primary font-mono text-[9px] ml-1">v.1.0</span></span>
                            </Link>
                            <button
                                onClick={closeMenu}
                                className="w-10 h-10 flex items-center justify-center text-xl text-gray-500 hover:text-white transition-colors rounded-xl hover:bg-white/5 touch-manipulation"
                                aria-label="Close menu"
                            >
                                <HiX aria-hidden="true" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col flex-1 justify-center px-8 gap-2 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08, ease: "easeOut" }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={closeMenu}
                                        aria-label={`Jump to ${link.name}`}
                                        className="group flex items-center gap-4 py-3 sm:py-4 border-b border-white/5 hover:border-primary/20 transition-all touch-manipulation"
                                    >
                                        <span className="text-xs font-mono text-primary/30 w-8 group-hover:text-primary/60 transition-colors">
                                            {link.code}
                                        </span>
                                        <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
                                            {link.name}
                                        </span>
                                        <span className="ml-auto text-primary/0 group-hover:text-primary/40 transition-colors text-sm">→</span>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile CTA */}
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                href="#contact"
                                onClick={closeMenu}
                                className="btn-primary mt-6 py-4 rounded-2xl text-center w-full"
                            >
                                ESTABLISH_CONNECTION
                            </motion.a>
                        </div>

                        {/* Footer */}
                        <div className="p-6 text-center text-[10px] font-mono text-gray-700 relative z-10">
                            SECURED BY <span className="text-primary/50">TRUSTLAYER</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
