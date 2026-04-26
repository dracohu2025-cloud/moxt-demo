import { type ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, XCircle } from "lucide-react";

type CalloutType = "tip" | "info" | "warning" | "danger";

const config: Record<CalloutType, { icon: ReactNode; border: string; bg: string; title: string }> = {
  tip: {
    icon: <Lightbulb size={18} />,
    border: "border-[var(--color-primary-500)]",
    bg: "bg-[rgba(41,193,106,0.08)]",
    title: "提示",
  },
  info: {
    icon: <Info size={18} />,
    border: "border-[var(--color-info)]",
    bg: "bg-[rgba(14,165,233,0.08)]",
    title: "信息",
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    border: "border-[var(--color-warning)]",
    bg: "bg-[rgba(245,158,11,0.08)]",
    title: "注意",
  },
  danger: {
    icon: <XCircle size={18} />,
    border: "border-[var(--color-error)]",
    bg: "bg-[rgba(239,68,68,0.08)]",
    title: "警告",
  },
};

export default function Callout({
  type = "tip",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const c = config[type];
  return (
    <div className={`my-6 rounded-lg border-l-4 ${c.border} ${c.bg} p-4`}>
      <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-[var(--color-text-primary)]">
        {c.icon}
        {title || c.title}
      </div>
      <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}
