"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight 2D Canvas particle network background.
 * Draws moving particles with connection lines — looks techy and immersive.
 */
export function ParticleNetwork({
  particleCount = 60,
  connectionDistance = 120,
  color = "41,193,106",
  secondaryColor = "14,165,233",
  speed = 0.3,
}: {
  particleCount?: number;
  connectionDistance?: number;
  color?: string;
  secondaryColor?: string;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      isSecondary: boolean;
    }

    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 1.5 + 0.5,
          isSecondary: Math.random() > 0.7,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            const c = particles[i].isSecondary ? secondaryColor : color;
            ctx.strokeStyle = `rgba(${c},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const c = p.isSecondary ? secondaryColor : color;
        ctx.fillStyle = `rgba(${c},0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, connectionDistance, color, secondaryColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/**
 * Animated gradient mesh background — multiple layered gradients that shift.
 */
export function GradientMesh({
  variant = "green",
}: {
  variant?: "green" | "blue" | "mixed";
}) {
  const configs = {
    green: {
      orbs: [
        { cx: "20%", cy: "30%", color: "rgba(41,193,106,0.18)", size: 500 },
        { cx: "80%", cy: "60%", color: "rgba(41,193,106,0.12)", size: 400 },
        { cx: "50%", cy: "80%", color: "rgba(14,165,233,0.08)", size: 350 },
      ],
    },
    blue: {
      orbs: [
        { cx: "70%", cy: "20%", color: "rgba(14,165,233,0.18)", size: 500 },
        { cx: "30%", cy: "70%", color: "rgba(41,193,106,0.10)", size: 400 },
        { cx: "60%", cy: "50%", color: "rgba(14,165,233,0.12)", size: 350 },
      ],
    },
    mixed: {
      orbs: [
        { cx: "25%", cy: "25%", color: "rgba(41,193,106,0.20)", size: 550 },
        { cx: "75%", cy: "40%", color: "rgba(14,165,233,0.15)", size: 450 },
        { cx: "40%", cy: "75%", color: "rgba(41,193,106,0.10)", size: 400 },
        { cx: "85%", cy: "80%", color: "rgba(14,165,233,0.08)", size: 300 },
      ],
    },
  };

  const { orbs } = configs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => {
        const reverse = i % 2 === 1;
        return (
          <div
            key={i}
            className={reverse ? "animate-float-orb-reverse" : "animate-float-orb"}
            style={{
              position: "absolute",
              left: orb.cx,
              top: orb.cy,
              width: orb.size,
              height: orb.size,
              marginLeft: -orb.size / 2,
              marginTop: -orb.size / 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: "blur(40px)",
              animationDelay: `${i * 3}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Animated horizontal grid lines that create depth.
 */
export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.08 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(41,193,106,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(41,193,106,0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)",
      }} />
    </div>
  );
}

/**
 * Glowing separator line between sections.
 */
export function GlowDivider({ position = "top" }: { position?: "top" | "bottom" }) {
  const isTop = position === "top";
  return (
    <div
      className={`absolute left-0 right-0 ${isTop ? "top-0" : "bottom-0"}`}
      style={{ height: 2 }}
    >
      <div
        className="h-full animate-shimmer"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(41,193,106,0.5) 25%, rgba(14,165,233,0.4) 50%, rgba(41,193,106,0.5) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />
      {/* Glow halo below/above the line */}
      <div
        className={`absolute left-0 right-0 ${isTop ? "top-0" : "bottom-0"}`}
        style={{
          height: 30,
          background:
            "linear-gradient(90deg, transparent, rgba(41,193,106,0.15) 30%, rgba(14,165,233,0.10) 70%, transparent)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

/**
 * Floating geometric ring decorations.
 */
export function FloatingRings({ count = 3 }: { count?: number }) {
  const rings = Array.from({ length: count }, (_, i) => {
    const size = 100 + i * 80;
    const top = `${10 + ((i * 40) % 80)}%`;
    const left = `${5 + ((i * 55) % 90)}%`;
    const isBlue = i % 2 === 1;
    const borderColor = isBlue ? "rgba(14,165,233,0.12)" : "rgba(41,193,106,0.10)";

    return (
      <div
        key={i}
        className={i % 2 === 0 ? "animate-float-orb" : "animate-float-orb-reverse"}
        style={{
          position: "absolute",
          top,
          left,
          width: size,
          height: size,
          borderRadius: "50%",
          border: `1px solid ${borderColor}`,
          animationDelay: `${i * 2}s`,
          pointerEvents: "none",
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {rings}
    </div>
  );
}
