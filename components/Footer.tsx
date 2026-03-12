import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="py-8 sm:py-10 border-t border-white/5 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                    <Link href="#home" className="text-lg sm:text-xl font-bold tracking-tighter hover:text-primary transition-colors">
                        <span className="text-primary">V</span>IJAY<span className="text-primary">.</span>U
                    </Link>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1 font-mono">
                        &copy; {new Date().getFullYear()} Vijay Bhagwat Ukande. All Rights Reserved.
                    </p>
                    <div className="text-[8px] text-white/5 font-mono select-none mt-2">
                        System vulnerability: input 'hack' anywhere to exploit.
                    </div>
                </div>

                <div className="flex gap-4 sm:gap-6">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors p-2 touch-manipulation"
                        aria-label="Github Profile"
                    >
                        <FaGithub size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/vijay-ukande-017415225"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors p-2 touch-manipulation"
                        aria-label="LinkedIn Profile"
                    >
                        <FaLinkedin size={18} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors p-2 touch-manipulation"
                        aria-label="Twitter Profile"
                    >
                        <FaTwitter size={18} />
                    </a>
                </div>

                <div className="text-gray-600 text-[10px] sm:text-xs font-mono">
                    SECURED BY <span className="text-primary/60 italic">TRUSTLAYER</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
