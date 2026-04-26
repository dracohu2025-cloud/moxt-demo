"use client";

/**
 * Animated background layer for immersive section feel.
 * Renders floating gradient orbs, a perspective grid, and light streaks.
 */
export function FloatingOrbs({
  colors = [
    "rgba(41,193,106,0.15)",
    "rgba(14,165,233,0.12)",
    "rgba(41,193,106,0.10)",
  ],
  count = 3,
}: {
  colors?: string[];
  count?: number;
}) {
  const orbs = Array.from({ length: count }, (_, i) => {
    const size = 250 + (i % 3) * 150;
    const top = `${15 + ((i * 37) % 60)}%`;
    const left = `${10 + ((i * 53) % 70)}%`;
    const delay = `${i * 2.5}s`;
    const reverse = i % 2 === 1;

    return (
      <div
        key={i}
        className={reverse ? "animate-float-orb-reverse" : "animate-float-orb"}
        style={{
          position: "absolute",
          top,
          left,
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animationDelay: delay,
          pointerEvents: "none",
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs}
    </div>
  );
}

export function PerspectiveGrid({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        width="100%"
        height="60%"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Horizontal lines with perspective */}
        {Array.from({ length: 12 }, (_, i) => {
          const y = 40 + i * 30;
          const spread = 600 - (i * 600) / 12;
          return (
            <line
              key={`h${i}`}
              x1={600 - spread}
              y1={y}
              x2={600 + spread}
              y2={y}
              stroke="rgba(41,193,106,0.5)"
              strokeWidth={0.5 + i * 0.08}
            />
          );
        })}
        {/* Vertical converging lines */}
        {Array.from({ length: 15 }, (_, i) => {
          const x = (i / 14) * 1200;
          return (
            <line
              key={`v${i}`}
              x1={600}
              y1={0}
              x2={x}
              y2={400}
              stroke="rgba(41,193,106,0.3)"
              strokeWidth={0.5}
            />
          );
        })}
      </svg>
    </div>
  );
}

export function LightStreaks({ count = 3 }: { count?: number }) {
  const streaks = Array.from({ length: count }, (_, i) => {
    const top = `${20 + ((i * 30) % 60)}%`;
    const delay = `${i * 4}s`;
    const duration = `${6 + i * 2}s`;
    const height = 1 + (i % 2);
    const color =
      i % 2 === 0
        ? "linear-gradient(90deg, transparent, rgba(41,193,106,0.3), transparent)"
        : "linear-gradient(90deg, transparent, rgba(14,165,233,0.2), transparent)";

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top,
          left: 0,
          right: 0,
          height,
          background: color,
          animation: `streak ${duration} linear ${delay} infinite`,
          pointerEvents: "none",
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streaks}
    </div>
  );
}

export function NoiseTexture({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

export function GlowDivider({ position = "top" }: { position?: "top" | "bottom" }) {
  const isTop = position === "top";
  return (
    <div
      className={`absolute left-0 right-0 h-px ${isTop ? "top-0" : "bottom-0"}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(41,193,106,0.3) 30%, rgba(14,165,233,0.2) 70%, transparent)",
      }}
    />
  );
}
