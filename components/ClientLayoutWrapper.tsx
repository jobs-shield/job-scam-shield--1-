"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import SystemBootIntro from "@/components/SystemBootIntro";

// Optimization: Lazy load heavy components
const CyberBackground = dynamic(() => import("@/components/CyberBackground"), { ssr: false });
const CyberTerminal = dynamic(() => import("@/components/CyberTerminal"), { ssr: false });
const CyberCursor = dynamic(() => import("@/components/CyberCursor"), { ssr: false });
const CyberAudio = dynamic(() => import("@/components/CyberAudio"), { ssr: false });
const CyberCommandPanel = dynamic(() => import("@/components/CyberCommandPanel"), { ssr: false });
const HackEasterEgg = dynamic(() => import("@/components/HackEasterEgg").then(mod => mod.HackEasterEgg), { ssr: false });
const ActiveDefenseTicker = dynamic(() => import("@/components/ActiveDefenseTicker"), { ssr: false });
const SidelineStream = dynamic(() => import("@/components/SidelineStream").then(mod => mod.SidelineStream), { ssr: false });
const AIAuditor = dynamic(() => import("@/components/AIAuditor").then(mod => mod.AIAuditor), { ssr: false });

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <SystemBootIntro onComplete={() => setIsLoaded(true)} />
            {isLoaded && (
                <>
                    <CyberCursor />
                    <CyberAudio />
                    <CyberBackground />
                    <ActiveDefenseTicker />
                    <SidelineStream />
                    <div className="pt-8">
                        {children}
                    </div>
                    <CyberTerminal />
                    <CyberCommandPanel />
                    <HackEasterEgg />
                    <AIAuditor />
                </>
            )}
        </>
    );
}
