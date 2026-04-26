"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  href,
  icon,
  className = "",
}: FeatureCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`feature-card group relative block rounded-2xl p-8 transition-all duration-300 ${className}`}
      style={{
        background: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top glow bar on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-[var(--color-primary-500)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="w-12 h-12 flex items-center justify-center text-[var(--color-primary-500)]" style={{ filter: "drop-shadow(0 0 10px rgba(41,193,106,0.3))" }}>
          {icon}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "0 0 20px rgba(41,193,106,0.15), inset 0 0 20px rgba(41,193,106,0.03)",
          border: "1px solid rgba(41,193,106,0.2)",
        }}
      />
    </Link>
  );
}
