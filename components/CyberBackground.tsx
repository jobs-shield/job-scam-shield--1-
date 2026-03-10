"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Grid, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Optimization: Use separate component for individual elements to isolate updates
function DataStreams({ count = 2000 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null!);

    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = Math.random() * 30 - 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
            spd[i] = Math.random() * 0.04 + 0.01;
        }
        return [pos, spd];
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const posAttr = ref.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            let y = posAttr.getY(i) - speeds[i];
            if (y < -15) y = 15;
            posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={true}>
            <PointMaterial
                transparent
                color="#00f0ff"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.4}
            />
        </Points>
    );
}

// Optimization: Use InstancedMesh for cables to reduce draw calls
function InstancedCables({ count = 20 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const tempObject = new THREE.Object3D();

    const cables = useMemo(() => {
        return Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 40,
            z: (Math.random() - 0.5) * 40,
            h: Math.random() * 10 + 5,
            color: Math.random() > 0.5 ? "#00f0ff" : "#7000ff"
        }));
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        cables.forEach((c, i) => {
            tempObject.position.set(c.x, c.h / 2, c.z);
            tempObject.scale.set(1, 1 + Math.sin(time + i) * 0.05, 1);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
            <boxGeometry args={[0.01, 1, 0.01]} />
            <meshStandardMaterial transparent opacity={0.15} emissive="#00fbff" emissiveIntensity={0.5} />
        </instancedMesh>
    );
}

function SceneController() {
    const { camera, mouse } = useThree();
    const targetPos = useRef(new THREE.Vector3(0, 5, 15));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Reduced sensitivity for smoother performance
        targetPos.current.x = mouse.x * 2;
        targetPos.current.y = 5 + mouse.y * 1 + Math.sin(time * 0.2) * 0.2;
        camera.position.lerp(targetPos.current, 0.02);
        camera.lookAt(0, 2, 0);
    });

    return null;
}

const CyberBackground = () => {
    // Optimization: Detect mobile to reduce density
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    return (
        <div className="fixed inset-0 -z-10 bg-[#020202] overflow-hidden pointer-events-none">
            <Canvas
                camera={{ position: [0, 5, 15], fov: 60 }}
                dpr={[1, 1.5]} // Performance: Cap pixel ratio
                gl={{
                    antialias: !isMobile,
                    powerPreference: "high-performance",
                    alpha: false,
                    stencil: false,
                    depth: true
                }}
            >
                <color attach="background" args={["#020202"]} />
                <fog attach="fog" args={["#020202", 15, 30]} />

                <ambientLight intensity={0.5} />

                <Grid
                    infiniteGrid
                    fadeDistance={30}
                    fadeStrength={5}
                    cellSize={2}
                    cellThickness={0.5}
                    cellColor="#00f0ff"
                    sectionSize={10}
                    sectionThickness={1}
                    sectionColor="#7000ff"
                    position={[0, 0, 0]}
                />

                <DataStreams count={isMobile ? 800 : 1500} />
                <InstancedCables count={isMobile ? 10 : 25} />
                <Stars radius={20} depth={50} count={isMobile ? 1000 : 2000} factor={4} saturation={0} fade speed={1} />

                <SceneController />
            </Canvas>

            {/* Static gradient overlays for atmosphere (cheaper than dynamic lights) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#020202_100%)]" />
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-soft-light" />
        </div>
    );
};

export default CyberBackground;
