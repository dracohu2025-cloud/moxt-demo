"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageCircle,
  Bot,
  Link2,
  Brain,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import FeatureCard from "./FeatureCard";
import {
  ParticleNetwork,
  GradientMesh,
  AnimatedGrid,
  GlowDivider,
} from "./SectionBackground";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "你的 AI 伙伴 momo",
    description: "记住你的一切，帮你处理一切。完全了解你的业务上下文，阅读你所有文档，记住每一次决策。越用越懂你。",
    href: "/guide/momo",
    icon: <MessageCircle size={32} />,
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "AI 同事",
    description: "定义角色，分配任务。创建专职 AI 同事，设定目标和规则，让它定时执行、主动响应。",
    href: "/guide/ai-teammates",
    icon: <Bot size={32} />,
    gridClass: "",
  },
  {
    title: "无缝集成",
    description: "Slack · GitHub · 自定义 API · MCP。接入你已有的工具栈，AI 同事在你的工作流里直接干活。",
    href: "/setup/integrations",
    icon: <Link2 size={32} />,
    gridClass: "",
  },
  {
    title: "可视化一切",
    description: "交互式看板、热力图、翻页报告、演示文稿——同一数据，多种呈现，一句话生成，无需写代码。",
    href: "/advanced/showcase",
    icon: <BarChart3 size={32} />,
    gridClass: "",
  },
  {
    title: "思维模型即 Skill",
    description: "你的标准、偏好、工作方式，通过 Skill 放大成团队的标准化输出。把经验变成可复用的能力。",
    href: "/advanced/skills",
    icon: <Brain size={32} />,
    gridClass: "",
  },
  {
    title: "信息熵减，自动维护",
    description: "AI 自动发现矛盾、标记过期、统一术语。让信息始终保持精简和真实。",
    href: "/advanced/entropy-officer",
    icon: <RefreshCw size={32} />,
    gridClass: "md:col-span-2",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use fromTo instead of from to ensure end state is always applied
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      const cards = gridRef.current?.querySelectorAll(".feature-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.7)",
          }
        );

        // Safety fallback: ensure cards are visible after 2s no matter what
        setTimeout(() => {
          cards.forEach((card) => {
            const el = card as HTMLElement;
            if (el.style.opacity === "0" || getComputedStyle(el).opacity === "0") {
              gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
            }
          });
        }, 2000);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
    >
      {/* === Immersive background === */}
      <GlowDivider position="top" />

      {/* Gradient mesh — strong glowing orbs */}
      <GradientMesh variant="green" />

      {/* Canvas particle network */}
      <ParticleNetwork
        particleCount={50}
        connectionDistance={130}
        speed={0.25}
      />

      {/* Grid overlay for tech feel */}
      <AnimatedGrid />

      {/* Top fade from Hero section */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--color-bg-base), transparent)",
        }}
      />

      <GlowDivider position="bottom" />

      {/* === Content === */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <h2
          ref={titleRef}
          className="text-center text-[clamp(1.625rem,4vw,2.25rem)] font-bold text-[var(--color-text-primary)] mb-4"
        >
          为什么选择 Moxt
        </h2>
        <p className="text-center text-[var(--color-text-secondary)] mb-16 max-w-2xl mx-auto">
          不只是工具，而是你的 AI 原生工作空间
        </p>

        <div
          ref={gridRef}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f) => (
            <FeatureCard
              key={f.href}
              title={f.title}
              description={f.description}
              href={f.href}
              icon={f.icon}
              className={f.gridClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
