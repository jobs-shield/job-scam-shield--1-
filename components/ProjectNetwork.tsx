"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Text, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import ProjectCaseStudy from "./ProjectCaseStudy";

const PROJECTS_DATA = [
    {
        id: 1,
        title: "DVWA Exploitation Lab",
        pos: [-4.5, 2.5, 0],
        color: "#00f0ff",
        objective: "Investigation of web vulnerabilities and privilege escalation pathways within a controlled environment.",
        environment: "DVWA Lab Instance running on Kali Linux ARM64",
        tools: ["Kali Linux", "Burp Suite", "Nmap", "Linux CLI", "Python"],
        methodology: [
            "Network reconnaissance and service mapping",
            "Command Injection vulnerability discovery in web fields",
            "Payload crafting for reverse shell execution",
            "Local enumeration for privilege escalation vectors",
            "Exploiting CVE-2021-4034 (PwnKit) for root access"
        ],
        findings: "Critical Command Injection vulnerability allowed for complete takeover of the web server. Furthermore, unpatched kernel vulnerabilities enabled a direct path from www-data to Root user.",
        remediation: "Implement strict input sanitization on all web forms. Patch system kernels to mitigate PwnKit and similar local privilege escalation vulnerabilities. Apply the principle of least privilege."
    },
    {
        id: 2,
        title: "OpenVAS Vulnerability Assessment",
        pos: [5, 1.5, -2.5],
        color: "#7000ff",
        objective: "Simulated network-wide vulnerability assessment to identify system weaknesses and prioritize remediation based on CVSS scores.",
        environment: "Enterprise Network Simulation (Hybrid Cloud)",
        tools: ["OpenVAS (GVM)", "Kali Linux", "Wireshark", "Nmap"],
        methodology: [
            "Automated network asset discovery and classification",
            "Multi-stage vulnerability scanning across active nodes",
            "CVSS score analysis and risk prioritization",
            "False positive filtering through manual verification",
            "Generation of remediation planning reports"
        ],
        findings: "Multiple high-risk services were found running outdated versions. Specifically, an SMB vulnerability was identified that could lead to unauthorized network lateral movement.",
        remediation: "Establish a periodic patching schedule. Disable unnecessary services and legacy protocols. Implement network segmentation to contain potential breaches."
    },
    {
        id: 3,
        title: "Burp Suite Web Security Testing",
        pos: [1.5, -3, 3],
        color: "#00ff9f",
        objective: "Manual penetration testing of web application security filters and access control mechanisms.",
        environment: "Staging Web Environment (React/Node.js Stack)",
        tools: ["Burp Suite Professional", "Browser DevTools", "OWASP ZAP"],
        methodology: [
            "Interception and modification of HTTP/S traffic",
            "Testing for Insecure Direct Object References (IDOR)",
            "Discovering bypasses for client-side security filters",
            "Cross-Site Scripting (XSS) payload injection testing",
            "Session management and cookie security analysis"
        ],
        findings: "Discovered several IDOR vulnerabilities that allowed viewing unauthorized user profiles. Found a specific filter bypass that enabled stored XSS on the dashboard.",
        remediation: "Implement server-side object-level access controls. Improve input validation and use secure output encoding for all user-generated content."
    },
    {
        id: 4,
        title: "ESP32 Bluetooth Deauther Project",
        pos: [-3.5, -3.5, -1.5],
        color: "#ff00ff",
        objective: "Hardware-based security research into Bluetooth Low Energy (BLE) protocol weaknesses and deauthentication vulnerabilities.",
        environment: "Hardware Lab (ESP32-WROOM-32)",
        tools: ["ESP32 Microcontroller", "Arduino IDE / C++", "Python BLE Libs", "BLE Sniffer"],
        methodology: [
            "Firmware development for custom BLE packet injection",
            "Monitoring and capturing BLE handshake frames",
            "Crafting and broadcasting spoofed deauthentication frames",
            "Analyzing protocol response to unexpected disconnection commands",
            "Analyzing hardware power consumption during attack loops"
        ],
        findings: "The BLE stack on targeted devices was found susceptible to frame spoofing, allowing an attacker to force-disconnect established Bluetooth pairings without credentials.",
        remediation: "Implement BLE 4.2+ secure connections with numeric comparison. Devices should implement time-outs for repeated deauthentication requests at the firmware level."
    },
];

const OCT_GEO = new THREE.OctahedronGeometry(1.0, 0);

function Node({ project, onSelect, onHover, isMobile }: { project: any; onSelect: (p: any) => void; onHover: (h: boolean) => void; isMobile: boolean }) {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.008;
        const baseScale = isMobile ? 1.5 : 1;
        const targetScale = hovered ? baseScale * 1.4 : baseScale;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={project.pos as [number, number, number]}>
                <mesh
                    ref={meshRef}
                    geometry={OCT_GEO}
                    onPointerOver={() => { setHovered(true); onHover(true); }}
                    onPointerOut={() => { setHovered(false); onHover(false); }}
                    onClick={() => onSelect(project)}
                >
                    <meshStandardMaterial
                        color={project.color}
                        wireframe={!hovered}
                        emissive={project.color}
                        emissiveIntensity={hovered ? 4 : 1}
                        transparent
                        opacity={0.8}
                        depthWrite={true}
                    />
                </mesh>
                <Text
                    position={[0, isMobile ? 1.8 : 1.4, 0]}
                    fontSize={isMobile ? 0.4 : 0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={hovered ? 1 : 0.6}
                >
                    {project.title}
                </Text>
                {hovered && <pointLight color={project.color} intensity={3} distance={6} />}
            </group>
        </Float>
    );
}

function Connections() {
    const linePoints = useMemo(() => {
        const lines = [];
        for (let i = 0; i < PROJECTS_DATA.length; i++) {
            for (let j = i + 0 + 1; j < PROJECTS_DATA.length; j++) {
                lines.push({
                    points: [PROJECTS_DATA[i].pos as [number, number, number], PROJECTS_DATA[j].pos as [number, number, number]],
                    color: PROJECTS_DATA[i].color
                });
            }
        }
        return lines;
    }, []);

    return (
        <group>
            {linePoints.map((l, i) => (
                <Line
                    key={i}
                    points={l.points}
                    color="#ffffff"
                    opacity={0.08}
                    transparent
                    lineWidth={0.5}
                />
            ))}
        </group>
    );
}

const ProjectNetwork = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="h-[500px] md:h-[600px] w-full relative group">
            <Canvas
                shadows={false}
                dpr={[1, 1.5]}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 14 : 10]} fov={50} />
                <ambientLight intensity={1.5} />
                <Stars radius={15} depth={50} count={isMobile ? 1000 : 2000} factor={4} saturation={0} fade speed={1} />
                <group scale={isMobile ? 0.7 : 1}>
                    {PROJECTS_DATA.map((p) => (
                        <Node key={p.id} project={p} onSelect={setSelectedProject} onHover={setIsHovering} isMobile={isMobile} />
                    ))}
                    <Connections />
                </group>
            </Canvas>

            <ProjectCaseStudy
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default ProjectNetwork;
