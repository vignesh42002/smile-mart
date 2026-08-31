import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneClasses = {
  brand: "bg-brand-100 text-brand-800",
  gold: "bg-gold-300/40 text-gold-600",
  slate: "bg-slate-100 text-slate-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-rose-100 text-rose-700",
} as const;

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className || undefined
      )}
    >
      {children}
    </span>
  );
}
