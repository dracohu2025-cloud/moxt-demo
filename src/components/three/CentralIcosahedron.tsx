"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CentralIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
      // Breathing scale
      const breathe = 1 + Math.sin(t * 1.5) * 0.025;
      meshRef.current.scale.setScalar(breathe);
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.1;
      wireRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
      const breathe = 1 + Math.sin(t * 1.5) * 0.025;
      wireRef.current.scale.setScalar(breathe * 1.02);
    }

    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(t * 1.5) * 0.5;
    }
  });

  return (
    <group>
      {/* Inner glowing icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshPhysicalMaterial
          color="#29C16A"
          transmission={0.6}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          transparent
          opacity={0.4}
          emissive="#29C16A"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial
          color="#29C16A"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Core glow */}
      <pointLight
        ref={glowRef}
        color="#29C16A"
        intensity={2}
        distance={10}
        decay={2}
      />
    </group>
  );
}
