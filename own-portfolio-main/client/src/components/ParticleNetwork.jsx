import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = () => {
    const count = 70; // Number of particles
    const connectionDistance = 3.5; // Max distance to connect
    const mouseDistance = 4; // Interaction radius

    // Initial random particles
    const [particles] = useState(() => {
        return new Array(count).fill().map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                0
            )
        }));
    });

    const linesGeometryRef = useRef();
    const pointsRef = useRef();
    const mouse = useRef(new THREE.Vector3(1000, 1000, 0)); // Start far away

    useFrame(({ pointer, viewport }) => {
        // Update mouse position in 3D space (mapped to viewport size roughly at z=0)
        mouse.current.set(
            (pointer.x * viewport.width) / 2,
            (pointer.y * viewport.height) / 2,
            0
        );

        const positions = particles.map(p => p.position);
        const linePositions = [];

        // Update particles
        particles.forEach(p => {
            p.position.add(p.velocity);

            // Bounce off boundaries (rough screen limits)
            if (p.position.x > viewport.width / 2 || p.position.x < -viewport.width / 2) p.velocity.x *= -1;
            if (p.position.y > viewport.height / 2 || p.position.y < -viewport.height / 2) p.velocity.y *= -1;

            // Mouse Interaction: Subtle attraction
            const distToMouse = p.position.distanceTo(mouse.current);
            if (distToMouse < mouseDistance) {
                const dir = new THREE.Vector3().subVectors(mouse.current, p.position).normalize();
                p.position.add(dir.multiplyScalar(0.01));
            }
        });

        // Find connections
        for (let i = 0; i < count; i++) {
            // Connected to other particles
            for (let j = i + 1; j < count; j++) {
                const dist = particles[i].position.distanceTo(particles[j].position);
                if (dist < connectionDistance) {
                    linePositions.push(
                        particles[i].position.x, particles[i].position.y, particles[i].position.z,
                        particles[j].position.x, particles[j].position.y, particles[j].position.z
                    );
                }
            }

            // Connect to mouse (The "User Click/Hover" effect)
            const distToMouse = particles[i].position.distanceTo(mouse.current);
            if (distToMouse < connectionDistance) {
                linePositions.push(
                    particles[i].position.x, particles[i].position.y, particles[i].position.z,
                    mouse.current.x, mouse.current.y, mouse.current.z
                );
            }
        }

        // Update Lines Buffer
        if (linesGeometryRef.current) {
            linesGeometryRef.current.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(linePositions, 3)
            );
        }

        // Update Points Buffer
        if (pointsRef.current) {
            const pointPositions = positions.flatMap(p => [p.x, p.y, p.z]);
            pointsRef.current.geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(pointPositions, 3)
            );
        }
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry />
                <pointsMaterial size={0.15} color="#4ecdc4" transparent opacity={0.8} />
            </points>
            <lineSegments>
                <bufferGeometry ref={linesGeometryRef} />
                <lineBasicMaterial color="#4ecdc4" transparent opacity={0.15} />
            </lineSegments>
        </>
    );
};

const ThreeBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            background: 'linear-gradient(to bottom, #000000, #130f40, #000000)' // Deep Space Black/Blue
        }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ParticleNetwork />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
