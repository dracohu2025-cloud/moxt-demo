import Link from "next/link";
import { ExternalLink } from "lucide-react";

const footerLinks = [
  {
    title: "快速开始",
    links: [
      { label: "momo 使用指南", href: "/guide/momo" },
      { label: "AI 同事", href: "/guide/ai-teammates" },
      { label: "技巧与快捷键", href: "/guide/tips" },
    ],
  },
  {
    title: "设置与集成",
    links: [
      { label: "导入数据", href: "/setup/import" },
      { label: "外部工具", href: "/setup/integrations" },
      { label: "邀请同事", href: "/setup/invite" },
    ],
  },
  {
    title: "进阶玩法",
    links: [
      { label: "熵减官", href: "/advanced/entropy-officer" },
      { label: "Skill 系统", href: "/advanced/skills" },
      { label: "可视化一切", href: "/advanced/showcase" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Top gradient line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #29C16A, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.svg`}
                alt="Moxt"
                className="h-6 w-6"
              />
              <span className="text-base font-semibold text-[var(--color-text-primary)]">
                Moxt
              </span>
            </div>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              AI-native workspace for teams
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-primary-500)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; 2025 Moxt. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dracohu2025-cloud/moxt-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-500)] transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a
              href="https://moxt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-primary-500)] transition-colors duration-200"
              aria-label="Moxt"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
