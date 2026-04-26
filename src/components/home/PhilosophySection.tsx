"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

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
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(41,193,106,0.08) 0%, transparent 70%)",
        }}
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
