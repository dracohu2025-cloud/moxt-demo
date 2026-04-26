"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import {
  FloatingOrbs,
  LightStreaks,
  NoiseTexture,
  GlowDivider,
} from "./SectionBackground";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      {/* Immersive background layers */}
      <GlowDivider position="top" />

      {/* Primary radial glow — larger and more vivid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(41,193,106,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Secondary pulsing glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(41,193,106,0.10) 0%, rgba(14,165,233,0.05) 50%, transparent 70%)",
        }}
      />

      <FloatingOrbs
        count={4}
        colors={[
          "rgba(41,193,106,0.10)",
          "rgba(14,165,233,0.08)",
          "rgba(41,193,106,0.06)",
          "rgba(14,165,233,0.04)",
        ]}
      />
      <LightStreaks count={4} />
      <NoiseTexture opacity={0.02} />

      {/* Decorative corner rings */}
      <div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full border border-[rgba(41,193,106,0.08)] pointer-events-none animate-float-orb"
      />
      <div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full border border-[rgba(14,165,233,0.06)] pointer-events-none animate-float-orb-reverse"
      />

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
