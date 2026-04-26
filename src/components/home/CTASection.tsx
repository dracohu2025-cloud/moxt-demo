"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4">
      <div className="cta-content mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.625rem,4vw,2.25rem)] font-bold text-[var(--color-text-primary)]">
          准备好了吗？
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          让 AI 成为你的同事，从今天开始
        </p>
        <a
          href="https://moxt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 px-10 py-4 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)] text-white text-lg font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(41,193,106,0.4)]"
        >
          免费开始使用
          <ExternalLink size={18} />
        </a>
      </div>
    </section>
  );
}
