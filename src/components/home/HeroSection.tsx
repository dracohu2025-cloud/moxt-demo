"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ExternalLink } from "lucide-react";
import gsap from "gsap";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-base)] to-[var(--color-bg-elevated)]" />
  ),
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.7,
      });
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      {/* Text overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="gradient-text-hero text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-[1.0] tracking-tight"
        >
          AI 原生的工作空间
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto"
        >
          人与 AI 同事的协作从这里开始
        </p>
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://moxt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)] text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(41,193,106,0.4)]"
          >
            开始使用 Moxt
            <ExternalLink size={16} />
          </a>
          <button
            onClick={scrollToFeatures}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            看看能做什么
            <ArrowDown size={16} />
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown size={24} className="text-white/40" />
      </div>
    </section>
  );
}
