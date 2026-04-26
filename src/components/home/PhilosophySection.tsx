"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import {
  ParticleNetwork,
  GradientMesh,
  GlowDivider,
  FloatingRings,
} from "./SectionBackground";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Safety fallback
      setTimeout(() => {
        if (quoteRef.current) {
          const el = quoteRef.current;
          if (getComputedStyle(el).opacity === "0") {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.5 });
          }
        }
      }, 2500);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      {/* === Immersive background === */}
      <GlowDivider position="top" />

      {/* Strong mixed gradient mesh */}
      <GradientMesh variant="mixed" />

      {/* Canvas particle network — denser, slower for contemplative feel */}
      <ParticleNetwork
        particleCount={70}
        connectionDistance={150}
        speed={0.15}
      />

      {/* Floating decorative rings */}
      <FloatingRings count={5} />

      {/* Central pulsing glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(41,193,106,0.15) 0%, rgba(14,165,233,0.06) 40%, transparent 70%)",
        }}
      />

      {/* === Content === */}
      <div ref={quoteRef} className="relative z-10 text-center max-w-3xl mx-auto">
        <blockquote className="text-[clamp(1.5rem,5vw,3rem)] font-bold leading-tight text-[var(--color-text-primary)]">
          &ldquo;AI 不只是工具——<br />
          <span className="gradient-text-hero">它是新的杠杆</span>&rdquo;
        </blockquote>
        <p className="mt-6 text-[var(--color-text-tertiary)] text-lg">
          — Moxt 产品理念
        </p>
        <Link
          href="/philosophy"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 text-[var(--color-primary-500)] hover:text-[var(--color-primary-400)] font-medium transition-colors duration-200 group"
        >
          了解我们的思考
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
