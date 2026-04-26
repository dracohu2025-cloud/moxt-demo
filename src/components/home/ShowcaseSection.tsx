"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FloatingOrbs,
  LightStreaks,
  NoiseTexture,
  GlowDivider,
} from "./SectionBackground";

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: "交互式仪表盘",
    description: "数据分析能力",
    tag: "数据分析",
    src: "/multi-format/dashboard.html",
  },
  {
    title: "知识图谱",
    description: "信息结构化能力",
    tag: "知识管理",
    src: "/showcase/evidence-map.html",
  },
  {
    title: "演示文稿",
    description: "汇报输出能力",
    tag: "汇报展示",
    src: "/showcase/deck.html",
  },
  {
    title: "内容日历",
    description: "项目管理能力",
    tag: "项目管理",
    src: "/showcase/content-calendar.html",
  },
];

function ShowcaseCard({
  item,
  onExpand,
}: {
  item: (typeof showcaseItems)[0];
  onExpand: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
      className="showcase-card group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        background: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Preview area */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <iframe
          src={`${basePath}${item.src}`}
          title={item.title}
          className="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none border-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-surface)] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="p-2 rounded-lg glass-light">
            <Maximize2 size={14} className="text-[var(--color-primary-500)]" />
          </div>
        </div>
      </div>

      {/* Info area */}
      <div className="p-5">
        <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-[rgba(41,193,106,0.1)] text-[var(--color-primary-400)] mb-2">
          {item.tag}
        </span>
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {item.description}
        </p>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: "1px solid rgba(41,193,106,0.3)",
          boxShadow: "0 0 20px rgba(41,193,106,0.1)",
        }}
      />
    </div>
  );
}

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".showcase-card");
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedIdx(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-4 overflow-hidden">
      {/* Immersive background layers */}
      <GlowDivider position="top" />
      <FloatingOrbs
        count={3}
        colors={[
          "rgba(14,165,233,0.12)",
          "rgba(41,193,106,0.08)",
          "rgba(14,165,233,0.06)",
        ]}
      />
      <LightStreaks count={2} />
      <NoiseTexture opacity={0.02} />

      {/* Radial accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="text-center text-[clamp(1.625rem,4vw,2.25rem)] font-bold text-[var(--color-text-primary)] mb-4">
          看看 momo 能做什么
        </h2>
        <p className="text-center text-[var(--color-text-secondary)] mb-16 max-w-2xl mx-auto">
          这些全部由 momo 生成，无需编码
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item, idx) => (
            <ShowcaseCard
              key={item.src}
              item={item}
              onExpand={() => setExpandedIdx(idx)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {expandedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setExpandedIdx(null)}
          >
            <div className="absolute inset-0 bg-black/90" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
              className="relative w-[95vw] max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="text-lg font-semibold text-white">
                  {showcaseItems[expandedIdx].title}
                </h3>
                <button
                  onClick={() => setExpandedIdx(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              <iframe
                src={`${basePath}${showcaseItems[expandedIdx].src}`}
                title={showcaseItems[expandedIdx].title}
                className="w-full h-[85vh] rounded-xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
