"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation, isGroup } from "@/lib/navigation";

export default function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-surface)] transition-colors"
      >
        <Menu size={18} />
        <span>导航</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 glass-heavy overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">导航</span>
              <button onClick={() => setOpen(false)} className="text-[var(--color-text-muted)]">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {navigation.map((entry) =>
                isGroup(entry) ? (
                  <div key={entry.label} className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2 px-3">
                      {entry.label}
                    </p>
                    <ul className="space-y-0.5">
                      {entry.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                active
                                  ? "text-[var(--color-primary-500)] bg-[rgba(41,193,106,0.1)] font-medium"
                                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 mb-2 rounded-lg text-sm transition-colors ${
                      pathname === entry.href
                        ? "text-[var(--color-primary-500)] bg-[rgba(41,193,106,0.1)] font-medium"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {entry.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
