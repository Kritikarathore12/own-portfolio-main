import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Preload, Float, Html } from '@react-three/drei';
import { FaReact, FaJs, FaPython, FaHtml5, FaCss3, FaGithub, FaNodeJs, FaJava, FaDocker, FaDatabase, FaAws, FaGitAlt, FaNpm, FaLinux, FaPhp, FaAngular, FaVuejs, FaSass, FaBootstrap } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs, SiRedux, SiGraphql, SiMysql, SiPostgresql, SiVercel, SiFirebase, SiFigma, SiGitlab, SiJest, SiWebpack, SiPostman, SiKotlin, SiSwift, SiRust, SiGo } from 'react-icons/si';

const StarField = () => {
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
        </group>
    );
};

const FloatingIconWrapper = ({ position, children }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <Html position={position} transform style={{ pointerEvents: 'none' }}>
                <div style={{
                    color: 'rgba(255, 255, 255, 0.2)',
                    fontSize: '28px',
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
                }}>
                    {children}
                </div>
            </Html>
        </Float>
    );
};

const FloatingIcons = () => {
    const baseIcons = [
        FaReact, FaJs, FaPython, FaHtml5, FaCss3, FaGithub, FaNodeJs, FaJava, FaDocker, FaDatabase,
        FaAws, FaGitAlt, FaNpm, FaLinux, FaPhp, FaAngular, FaVuejs, FaSass, FaBootstrap,
        SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs, SiRedux, SiGraphql,
        SiMysql, SiPostgresql, SiVercel, SiFirebase, SiFigma, SiGitlab, SiJest, SiWebpack,
        SiPostman, SiKotlin, SiSwift, SiRust, SiGo
    ];

    // Duplicate icons to have more spread across the screen
    const icons = [];
    for (let i = 0; i < 120; i++) {
        icons.push({
            Component: baseIcons[i % baseIcons.length],
            id: i + 1
        });
    }

    const positionedIcons = useMemo(() => {
        const positions = [];
        const minDistance = 3;
        const maxRetries = 150;

        return icons.map((icon) => {
            let position;
            let valid = false;
            let retries = 0;

            while (!valid && retries < maxRetries) {
                position = [
                    (Math.random() - 0.5) * 50, // Wider x spread
                    (Math.random() - 0.5) * 35, // Wider y spread
                    (Math.random() - 0.5) * 15 - 5 // z spread
                ];

                valid = true;
                for (const pos of positions) {
                    const dx = pos[0] - position[0];
                    const dy = pos[1] - position[1];
                    const dz = pos[2] - position[2];
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < minDistance) {
                        valid = false;
                        break;
                    }
                }
                retries++;
            }

            positions.push(position);
            return { ...icon, position };
        });
    }, []);

    return (
        <group>
            {positionedIcons.map(({ Component, id, position }) => (
                <FloatingIconWrapper key={id} position={position}>
                    <Component />
                </FloatingIconWrapper>
            ))}
        </group>
    );
};

const StarBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)'

        }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Suspense fallback={null}>
                    <StarField />
                    <FloatingIcons />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default StarBackground;
