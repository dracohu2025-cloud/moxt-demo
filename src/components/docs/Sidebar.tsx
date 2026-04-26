"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, isGroup } from "@/lib/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-4 pb-8">
        {navigation.map((entry) =>
          isGroup(entry) ? (
            <div key={entry.label} className="mb-6">
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
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          active
                            ? "text-[var(--color-primary-500)] bg-[rgba(41,193,106,0.1)] font-medium"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-hover)]"
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
            <div key={entry.label} className="mb-6">
              <Link
                href={entry.href}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  pathname === entry.href
                    ? "text-[var(--color-primary-500)] bg-[rgba(41,193,106,0.1)] font-medium"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface-hover)]"
                }`}
              >
                {entry.label}
              </Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
}
