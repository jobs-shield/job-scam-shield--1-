"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface SkillData {
    label: string;
    value: number; // 0 to 100
}

interface SkillRadarProps {
    skills: SkillData[];
    color?: string;
}

const SkillRadar = ({ skills, color = "#00f0ff" }: SkillRadarProps) => {
    const size = 300;
    const center = size / 2;
    const radius = size * 0.4;
    const angleStep = (Math.PI * 2) / skills.length;

    const points = useMemo(() => {
        return skills.map((skill, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (skill.value / 100) * radius;
            return {
                x: center + r * Math.cos(angle),
                y: center + r * Math.sin(angle),
                label: skill.label
            };
        });
    }, [skills, radius, center, angleStep]);

    const polygonPath = points.map(p => `${p.x},${p.y}`).join(" ");

    return (
        <div className="relative flex items-center justify-center group">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                {/* Background Web */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => {
                    const webPoints = skills.map((_, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        const r = radius * scale;
                        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                    }).join(" ");
                    return (
                        <polygon
                            key={scale}
                            points={webPoints}
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Axis Lines */}
                {skills.map((_, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={center + radius * Math.cos(angle)}
                            y2={center + radius * Math.sin(angle)}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Skill Area */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    points={polygonPath}
                    fill={`${color}33`}
                    stroke={color}
                    strokeWidth="2"
                    className="origin-center"
                />

                {/* Data Points */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill={color}
                        className="animate-pulse"
                    />
                ))}
            </svg>

            {/* Labels */}
            {points.map((p, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const tx = center + (radius + 30) * Math.cos(angle);
                const ty = center + (radius + 20) * Math.sin(angle);
                return (
                    <div
                        key={i}
                        className="absolute font-mono text-[9px] text-gray-400 uppercase tracking-tighter"
                        style={{
                            left: `${(tx / size) * 100}%`,
                            top: `${(ty / size) * 100}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {p.label}
                    </div>
                );
            })}
        </div>
    );
};

export default SkillRadar;
