"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import ParticleField from "./ParticleField";
import CentralIcosahedron from "./CentralIcosahedron";

function SceneContent({ particleCount }: { particleCount: number }) {
  return (
    <>
      <fog attach="fog" args={["#030712", 10, 30]} />
      <ambientLight intensity={0.3} color="#1a1a2e" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#29C16A" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#0EA5E9" />

      <CentralIcosahedron />
      <ParticleField count={particleCount} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          intensity={0.8}
        />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  const [particleCount, setParticleCount] = useState(2000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Adjust particle count based on viewport width
    const width = window.innerWidth;
    if (width < 768) {
      setParticleCount(800);
    } else if (width < 1024) {
      setParticleCount(1200);
    } else {
      setParticleCount(2500);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-base)] to-[var(--color-bg-elevated)]" />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-base)] to-[var(--color-bg-elevated)]" />
        }
      >
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "#030712" }}
        >
          <SceneContent particleCount={particleCount} />
        </Canvas>
      </Suspense>
    </div>
  );
}
