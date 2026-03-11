"use client";

import React, { useState, useEffect } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

// High-quality futuristic UI sound URLs
const SOUNDS = {
    boot: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Tech startup
    hover: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Soft blip
    click: "https://assets.mixkit.co/active_storage/sfx/2564/2564-preview.mp3", // Mechanical click
    scroll: "https://assets.mixkit.co/active_storage/sfx/2552/2552-preview.mp3", // Data whoosh
};

const CyberAudio = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});

    useEffect(() => {
        // Initialize audio elements on client side
        const loadedSounds: Record<string, HTMLAudioElement> = {};
        Object.entries(SOUNDS).forEach(([key, url]) => {
            const audio = new Audio(url);
            audio.volume = 0.1; // Very subtle
            loadedSounds[key] = audio;
        });
        setAudioElements(loadedSounds);

        // Global click listener
        const handleClick = () => {
            if (!isMuted && loadedSounds.click) {
                loadedSounds.click.currentTime = 0;
                loadedSounds.click.play().catch(() => { });
            }
        };

        // Attach event listeners to all buttons and links for hover
        const attachHovers = () => {
            const elements = document.querySelectorAll('button, a, .cursor-pointer');
            elements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (!isMuted && loadedSounds.hover) {
                        loadedSounds.hover.currentTime = 0;
                        loadedSounds.hover.play().catch(() => { });
                    }
                });
            });
        };

        window.addEventListener('mousedown', handleClick);

        // Use MutationObserver to watch for new elements (like modals)
        const observer = new MutationObserver(attachHovers);
        observer.observe(document.body, { childList: true, subtree: true });

        attachHovers();

        return () => {
            window.removeEventListener('mousedown', handleClick);
            observer.disconnect();
        };
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (isMuted && audioElements.boot) {
            audioElements.boot.currentTime = 0;
            audioElements.boot.play().catch(() => { });
        }
    };

    return (
        <button
            onClick={toggleMute}
            className={`fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[6000] p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-500 backdrop-blur-xl flex items-center gap-3 group ${isMuted ? 'border-white/5 bg-white/5 text-gray-500' : 'border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                }`}
            aria-label={isMuted ? "Unmute tactical audio" : "Mute tactical audio"}
        >
            <div className="relative">
                {isMuted ? <HiVolumeOff className="text-xl" /> : <HiVolumeUp className="text-xl animate-pulse" />}
                {!isMuted && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                )}
            </div>
            <span className="hidden md:inline-flex font-mono text-[9px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {isMuted ? 'Audio_Off' : 'Audio_Live'}
            </span>
        </button>
    );
};

export default CyberAudio;
