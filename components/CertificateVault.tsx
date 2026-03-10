"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, PerspectiveCamera, Grid, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiLockClosed, HiLockOpen } from "react-icons/hi";

const CERTIFICATES = [
    { title: "Google Cybersecurity Professional", org: "Google", desc: "Foundations, networking, and security tools.", color: "#00f0ff" },
    { title: "Cisco Networking Academy", org: "Cisco", desc: "Network security and threat protection.", color: "#7000ff" },
    { title: "IBM SkillsBuild Certification", org: "IBM", desc: "Cyber threats and risk mitigation.", color: "#00ff9f" },
    { title: "Microsoft Student SOC Program", org: "Microsoft", desc: "Security Operations and incident response.", color: "#ff00ff" },
    { title: "NASSCOM FutureSkills", org: "NASSCOM", desc: "Industry-aligned cybersecurity skills.", color: "#00f0ff" },
    { title: "Forage Security Simulations", org: "Forage", desc: "Real-world vulnerability analysis.", color: "#7000ff" },
    { title: "Python for Absolute Beginners", org: "EC-Council", desc: "Practical Python for security automation.", color: "#00ff9f" },
    { title: "Dark Web & Cryptocurrency", org: "EC-Council", desc: "Darknet structures and blockchain security.", color: "#ff00ff" },
    { title: "AI for Everyone", org: "DeepLearning.AI", desc: "Secure AI implementation fundamentals.", color: "#00f0ff" },
    { title: "Digit Defence Internship", org: "Digit Defence", desc: "Hands-on vulnerability research.", color: "#7000ff" },
    { title: "AI Cyber Security Associate", org: "Associate", desc: "Specialized AI-driven security systems.", color: "#00ff9f" }
];

function DataPackets({ count = 50 }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
            spd[i] = Math.random() * 0.05 + 0.02;
        }
        return [pos, spd];
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;
        const posAttr = pointsRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            let z = posAttr.getZ(i) + speeds[i];
            if (z > 15) z = -15;
            posAttr.setZ(i, z);
        }
        posAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#00f0ff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </points>
    );
}

function ScanLine({ color }: { color: string }) {
    const lineRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 1.1;
        }
    });

    return (
        <mesh ref={lineRef} position={[0, 0, 0.02]}>
            <planeGeometry args={[3.8, 0.05]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
    );
}

function CertCard({ cert, index, total, onSelect, onHover }: { cert: any; index: number; total: number; onSelect: (c: any) => void; onHover: (h: boolean) => void }) {
    const meshRef = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = useState(false);
    const radius = 6;
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.lookAt(0, 0, 0);
        const focusScale = hovered ? 1.3 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(focusScale, focusScale, focusScale), 0.1);
    });

    return (
        <group
            ref={meshRef}
            position={[x, 0, z]}
            onPointerOver={() => { setHovered(true); onHover(true); }}
            onPointerOut={() => { setHovered(false); onHover(false); }}
            onClick={(e) => { e.stopPropagation(); onSelect(cert); }}
        >
            <mesh>
                <planeGeometry args={[4, 2.5]} />
                <meshStandardMaterial
                    color={cert.color}
                    transparent
                    opacity={hovered ? 0.9 : 0.4}
                    emissive={cert.color}
                    emissiveIntensity={hovered ? 3 : 0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <group>
                <Text position={[-1.8, 1.1, 0.05]} fontSize={0.3} color={cert.color}>[</Text>
                <Text position={[1.8, 1.1, 0.05]} fontSize={0.3} color={cert.color}>]</Text>
                <Text position={[-1.8, -1.1, 0.05]} fontSize={0.3} color={cert.color}>[</Text>
                <Text position={[1.8, -1.1, 0.05]} fontSize={0.3} color={cert.color}>]</Text>
            </group>

            {hovered && <ScanLine color={cert.color} />}

            <Text
                position={[0, -0.9, 0.05]}
                fontSize={0.1}
                color={cert.color}
                fillOpacity={0.6}
            >
                SEC_ID: {index.toString().padStart(4, '0')} // ARCHIVE_01
            </Text>

            <Text
                position={[0, 0.2, 0.1]}
                fontSize={0.22}
                maxWidth={3.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
            >
                {cert.title}
            </Text>

            <Text
                position={[0, -0.3, 0.1]}
                fontSize={0.15}
                color={cert.color}
                fillOpacity={0.8}
            >
                {cert.org}
            </Text>

            <Html position={[1.5, -0.8, 0.1]} center>
                <div className={`text-xl transition-all duration-300 ${hovered ? "text-accent scale-125" : "text-primary/40"}`}>
                    {hovered ? <HiLockOpen /> : <HiLockClosed />}
                </div>
            </Html>
            {hovered && <pointLight color={cert.color} intensity={5} distance={8} />}
        </group>
    );
}

function VaultScene({ setSelectedCert, setIsHovering }: { setSelectedCert: (c: any) => void; setIsHovering: (h: boolean) => void }) {
    const groupRef = useRef<THREE.Group>(null!);
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0015;
        }
    });

    return (
        <group ref={groupRef}>
            {CERTIFICATES.map((cert, i) => (
                <CertCard key={i} cert={cert} index={i} total={CERTIFICATES.length} onSelect={setSelectedCert} onHover={setIsHovering} />
            ))}
            <group position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <Grid
                    infiniteGrid
                    fadeDistance={25}
                    fadeStrength={5}
                    cellSize={1}
                    cellThickness={0.5}
                    cellColor="#00f0ff"
                    sectionSize={5}
                    sectionThickness={1}
                    sectionColor="#7000ff"
                />
            </group>
            <DataPackets count={isMobile ? 30 : 60} />
            <group>
                {Array.from({ length: 15 }).map((_, i) => (
                    <Text
                        key={i}
                        position={[Math.random() * 20 - 10, Math.random() * 10 - 5, -10]}
                        fontSize={0.2}
                        color="#00f0ff"
                        fillOpacity={0.05}
                    >
                        {Math.floor(Math.random() * 1000000).toString(16).toUpperCase()}
                    </Text>
                ))}
            </group>
        </group>
    );
}

const CertificateVault = () => {
    const [selectedCert, setSelectedCert] = useState<any>(null);
    const [isHovering, setIsHovering] = useState(false);
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    React.useEffect(() => {
        if (!selectedCert) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedCert(null);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [selectedCert]);

    return (
        <div className="h-[800px] w-full relative transition-all duration-500" role="region" aria-label="Digital Credential Archive">
            <div className="absolute top-8 left-8 z-20 flex gap-6 font-mono" aria-hidden="true">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] text-primary/60 tracking-widest">ARCHIVE_STATUS: ONLINE</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] text-accent/60 tracking-widest">ENCRYPTION: AES_256</span>
                </div>
            </div>

            <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: !isMobile }}>
                <PerspectiveCamera makeDefault position={[0, 1, 15]} fov={45} />
                <ambientLight intensity={1.5} />
                <pointLight position={[0, 10, 10]} intensity={2} color="#00f0ff" />
                <fog attach="fog" args={["#020202", 12, 22]} />
                <VaultScene setSelectedCert={setSelectedCert} setIsHovering={setIsHovering} />
            </Canvas>

            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Security Report: ${selectedCert.title}`}
                        className="fixed inset-0 flex items-center justify-center z-[5000] p-6"
                        onClick={() => setSelectedCert(null)}
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl pointer-events-none" />
                        <motion.div
                            initial={{ scale: 0.9, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 100, opacity: 0 }}
                            className="glass-card p-12 max-w-2xl w-full pointer-events-auto relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 cyber-grid-overlay opacity-5 pointer-events-none" />
                            <button
                                className="absolute top-10 right-10 text-2xl text-primary/40 hover:text-white transition-colors z-50 p-2"
                                onClick={() => setSelectedCert(null)}
                                aria-label="Close credentials"
                            >
                                <HiX />
                            </button>

                            <div className="flex flex-col gap-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <HiLockOpen className="text-accent animate-bounce" />
                                    <span className="text-[10px] font-mono text-accent uppercase tracking-[0.4em]">Decryption_Complete</span>
                                </div>
                                <h3 className="text-4xl font-black text-white tracking-tight">{selectedCert.title}</h3>
                                <p className="text-primary font-mono text-lg font-bold uppercase tracking-widest">{selectedCert.org}</p>
                                <div className="h-1.5 w-20 bg-primary" />
                                <p className="text-gray-400 leading-relaxed text-lg font-light">{selectedCert.desc}</p>
                                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono">TIMESTAMP: {new Date().toLocaleDateString()}</div>
                                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono">SEC_LEVEL: 05</div>
                                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono">HASH: SHA_256_VERIFIED</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-[scan_4s_linear_infinite]" />
        </div>
    );
};

export default CertificateVault;
