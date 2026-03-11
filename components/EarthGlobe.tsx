"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float, Points, PointMaterial, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface AttackPath {
    id: number;
    from: THREE.Vector3;
    to: THREE.Vector3;
    color: string;
}

const AttackArc = ({ from, to, color }: { from: THREE.Vector3, to: THREE.Vector3, color: string }) => {
    const lineRef = useRef<any>(null);

    const { curve, linePoints } = useMemo(() => {
        const start = from.clone().normalize().multiplyScalar(2.1);
        const end = to.clone().normalize().multiplyScalar(2.1);
        const distance = start.distanceTo(end);
        const mid = new THREE.Vector3()
            .addVectors(start, end)
            .normalize()
            .multiplyScalar(2.1 + distance * 0.5);

        const c = new THREE.QuadraticBezierCurve3(start, mid, end);
        return { curve: c, linePoints: c.getPoints(50) };
    }, [from, to]);

    useFrame(({ clock }) => {
        if (lineRef.current) {
            const t = (clock.getElapsedTime() * 0.5) % 1;
            lineRef.current.geometry.setDrawRange(0, Math.floor(t * 100));
        }
    });

    return (
        <line ref={lineRef}>
            <bufferGeometry>
                <float32BufferAttribute
                    attach="attributes-position"
                    count={linePoints.length}
                    array={new Float32Array(linePoints.flatMap(p => [p.x, p.y, p.z]))}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color={color} transparent opacity={0.8} linewidth={2} />
        </line>
    );
};

const CyberGlobe = () => {
    const groupRef = useRef<THREE.Group>(null);
    const [attacks, setAttacks] = useState<AttackPath[]>([]);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
            groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    useEffect(() => {
        const getRandomPoint = () => {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            return new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta),
                Math.sin(phi) * Math.sin(theta),
                Math.cos(phi)
            );
        };

        const interval = setInterval(() => {
            const colors = ["#00f0ff", "#ff4d4d", "#00ffaa", "#7000ff"];
            const newAttack = {
                id: Math.random(),
                from: getRandomPoint(),
                to: getRandomPoint(),
                color: colors[Math.floor(Math.random() * colors.length)]
            };
            setAttacks(prev => [...prev, newAttack].slice(-6));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <group ref={groupRef}>
            {/* Core - Dark Glass */}
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#020617"
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#001d3d"
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* Inner Glow Mesh */}
            <Sphere args={[2.01, 32, 32]}>
                <meshBasicMaterial
                    color="#00f0ff"
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </Sphere>

            {/* Outer Holographic Shell */}
            <Sphere args={[2.15, 64, 64]}>
                <MeshDistortMaterial
                    color="#00f0ff"
                    speed={2}
                    distort={0.1}
                    radius={1}
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </Sphere>

            {/* Pulsing Scan Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.2, 2.22, 64]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>

            {/* Attack Arcs */}
            {attacks.map(attack => (
                <AttackArc key={attack.id} {...attack} />
            ))}

            {/* Data Points */}
            <Points limit={500}>
                <PointMaterial
                    transparent
                    color="#00f0ff"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
};

const EarthGlobe = () => {
    return (
        <div className="w-full h-full min-h-[350px] sm:min-h-[500px] flex items-center justify-center relative overflow-hidden bg-black/40 rounded-3xl">
            {/* Background Cinematic Lighting */}
            <div className="absolute inset-0 bg-radial-at-c from-primary/5 via-transparent to-transparent opacity-30" />

            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
                <pointLight position={[-10, -5, -10]} intensity={1} color="#7000ff" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <CyberGlobe />
                </Float>

                <gridHelper args={[20, 20, 0x00f0ff, 0x001d3d]} position={[0, -4, 0]} />
            </Canvas>

            {/* Overlay UI elements */}
            <div className="absolute top-6 right-6 font-mono text-[8px] text-primary/40 text-right leading-relaxed uppercase tracking-widest">
                System_Status: Optimal<br />
                Encryption: AES_256_LIVE<br />
                Neural_Sync: 88%
            </div>
        </div>
    );
};

export default EarthGlobe;
