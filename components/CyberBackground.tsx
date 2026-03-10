"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- Network Nodes: Glowing points connected by lines ---
function NetworkNodes({ count = 80 }: { count?: number }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);

    const { positions, velocities, linePositions } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
            vel[i * 3] = (Math.random() - 0.5) * 0.01;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
        }

        // Build connection lines between nearby nodes
        const linePos: number[] = [];
        const maxDist = 10;
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < maxDist) {
                    linePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
                    linePos.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
                }
            }
        }
        return { positions: pos, velocities: vel, linePositions: new Float32Array(linePos) };
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;
        const posAttr = pointsRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            let x = posAttr.getX(i) + velocities[i * 3];
            let y = posAttr.getY(i) + velocities[i * 3 + 1];
            let z = posAttr.getZ(i) + velocities[i * 3 + 2];
            if (x > 30) x = -30; if (x < -30) x = 30;
            if (y > 15) y = -15; if (y < -15) y = 15;
            if (z > 20) z = -20; if (z < -20) z = 20;
            posAttr.setXYZ(i, x, y, z);
        }
        posAttr.needsUpdate = true;
    });

    return (
        <>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
                <PointMaterial
                    transparent
                    color="#00f0ff"
                    size={0.12}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>

            {/* Static connection lines rendered once */}
            {linePositions.length > 0 && (
                <lineSegments ref={linesRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={linePositions.length / 3}
                            array={linePositions}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        color="#00f0ff"
                        transparent
                        opacity={0.06}
                        blending={THREE.AdditiveBlending}
                    />
                </lineSegments>
            )}
        </>
    );
}

// --- Data Stream Particles: Flowing vertically like matrix rain ---
function DataStream({ count = 600 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null!);

    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 80;
            pos[i * 3 + 1] = Math.random() * 35 - 17;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20;
            spd[i] = Math.random() * 0.03 + 0.008;
        }
        return [pos, spd];
    }, [count]);

    useFrame(() => {
        if (!ref.current) return;
        const posAttr = ref.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            let y = posAttr.getY(i) - speeds[i];
            if (y < -17) y = 17;
            posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#7000ff"
                size={0.04}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.5}
            />
        </Points>
    );
}

// --- Camera gently drifts for atmosphere ---
function SceneController() {
    const { camera } = useThree();
    const t = useRef(0);

    useFrame((_, delta) => {
        t.current += delta * 0.15;
        camera.position.x = Math.sin(t.current) * 1.5;
        camera.position.y = 5 + Math.cos(t.current * 0.7) * 0.8;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// --- Horizontal grid plane for ground reference ---
function GridPlane() {
    return (
        <gridHelper
            args={[80, 30, "#00f0ff", "#7000ff"]}
            position={[0, -8, 0]}
            // @ts-ignore
            material-opacity={0.04}
            // @ts-ignore
            material-transparent={true}
        />
    );
}

const CyberBackground = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-[#020202] overflow-hidden pointer-events-none">
            <Canvas
                camera={{ position: [0, 5, 18], fov: 55 }}
                dpr={[1, isMobile ? 1 : 1.5]}
                gl={{
                    antialias: !isMobile,
                    powerPreference: "high-performance",
                    alpha: false,
                    stencil: false,
                    depth: true,
                }}
            >
                <color attach="background" args={["#020202"]} />
                <fog attach="fog" args={["#020202", 20, 40]} />
                <ambientLight intensity={0.3} />

                <NetworkNodes count={isMobile ? 40 : 80} />
                <DataStream count={isMobile ? 300 : 600} />
                <GridPlane />
                <SceneController />
            </Canvas>

            {/* Subtle radial vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020202_80%)] opacity-70" />
            {/* Top gradient for navbar readability */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#020202]/60 to-transparent" />
        </div>
    );
};

export default CyberBackground;
