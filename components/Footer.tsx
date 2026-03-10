import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="py-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <Link href="#home" className="text-xl font-bold tracking-tighter">
                        <span className="text-primary">V</span>IJAY<span className="text-primary">.</span>U
                    </Link>
                    <p className="text-gray-500 text-xs mt-2 font-mono">
                        &copy; {new Date().getFullYear()} Vijay Bhagwat Ukande. All Rights Reserved.
                    </p>
                </div>

                <div className="flex gap-6">
                    <Link href="https://github.com" target="_blank" className="text-gray-500 hover:text-white transition-colors">
                        <FaGithub size={20} />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="text-gray-500 hover:text-white transition-colors">
                        <FaLinkedin size={20} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" className="text-gray-500 hover:text-white transition-colors">
                        <FaTwitter size={20} />
                    </Link>
                </div>

                <div className="text-gray-500 text-xs font-mono">
                    SECURED BY <span className="text-primary italic">TRUSTLAYER</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
