"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import SystemBootIntro from "@/components/SystemBootIntro";

// Optimization: Lazy load heavy components
const CyberBackground = dynamic(() => import("@/components/CyberBackground"), { ssr: false });
const CyberTerminal = dynamic(() => import("@/components/CyberTerminal"), { ssr: false });
const CyberCursor = dynamic(() => import("@/components/CyberCursor"), { ssr: false });
const CyberAudio = dynamic(() => import("@/components/CyberAudio"), { ssr: false });
const StealthToggle = dynamic(() => import("@/components/StealthToggle"), { ssr: false });
const CyberCommandPanel = dynamic(() => import("@/components/CyberCommandPanel"), { ssr: false });

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
                    <StealthToggle />
                    <CyberBackground />
                    {children}
                    <CyberTerminal />
                    <CyberCommandPanel />
                </>
            )}
        </>
    );
}
