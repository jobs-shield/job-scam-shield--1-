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
        <div className="relative flex items-center justify-center group w-full max-w-[350px] mx-auto">
            <svg 
                role="img" 
                aria-label="Radar chart showing technical skill proficiencies"
                width="100%" 
                height="auto" 
                viewBox={`0 0 ${size} ${size}`} 
                className="drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] overflow-visible"
            >
                {/* Background Web */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => {
                    const webPoints = skills.map((_, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        const r = radius * scale;
                        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                    }).join(" ");
                    return (
                        <polygon
                            key={`web-${scale}`}
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
                            key={`axis-${i}`}
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
                    style={{ transformOrigin: `${center}px ${center}px` }}
                />

                {/* Data Points */}
                {points.map((p, i) => (
                    <circle
                        key={`point-${i}`}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill={color}
                        className="animate-pulse"
                    />
                ))}

                {/* Labels */}
                {points.map((p, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    const rText = radius + 25; // Push label a bit outside
                    const tx = center + rText * Math.cos(angle);
                    const ty = center + rText * Math.sin(angle);

                    // Determine text anchor based on angle to avoid overlap
                    let anchor: "start" | "middle" | "end" = "middle";
                    if (Math.abs(Math.cos(angle)) > 0.1) {
                        anchor = Math.cos(angle) > 0 ? "start" : "end";
                    }

                    return (
                        <text
                            key={`label-${i}`}
                            x={tx}
                            y={ty}
                            textAnchor={anchor}
                            alignmentBaseline="middle"
                            fill="#9ca3af"
                            className="text-[9px] md:text-[10px] uppercase font-mono tracking-tighter"
                        >
                            {p.label}
                        </text>
                    );
                })}
            </svg>

            {/* Screen Reader Optimized Table */}
            <div className="sr-only">
                <h3>Technical Skill Proficiencies</h3>
                <ul>
                    {skills.map((skill, i) => (
                        <li key={`sr-skill-${i}`}>
                            {skill.label}: {skill.value} percent
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SkillRadar;
