"use client";

import { useState } from "react";
import { Maximize2, X } from "lucide-react";

export default function ShowcaseEmbed({
  src,
  title,
  description,
  height = "500px",
}: {
  src: string;
  title: string;
  description?: string;
  height?: string;
}) {
  const [fullscreen, setFullscreen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <>
      <div className="my-6 rounded-xl overflow-hidden border border-white/10 bg-[var(--color-bg-surface)]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div>
            <h4 className="text-sm font-medium text-[var(--color-text-primary)]">{title}</h4>
            {description && (
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={() => setFullscreen(true)}
            className="p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-hover)] transition-colors"
            title="全屏查看"
          >
            <Maximize2 size={16} />
          </button>
        </div>
        <iframe
          src={`${basePath}${src}`}
          title={title}
          className="w-full border-0"
          style={{ height }}
          loading="lazy"
        />
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <button
              onClick={() => setFullscreen(false)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <iframe
            src={`${basePath}${src}`}
            title={title}
            className="flex-1 w-full border-0"
          />
        </div>
      )}
    </>
  );
}
