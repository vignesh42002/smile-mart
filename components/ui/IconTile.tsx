import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const toneClasses = {
  brand: "bg-gradient-to-br from-brand-600 to-brand-900 text-white",
  gold: "bg-gradient-to-br from-gold-400 to-gold-600 text-brand-950",
  soft: "bg-brand-50 text-brand-700",
} as const;

export function IconTile({
  icon: Icon,
  tone = "brand",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof toneClasses;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-16 w-16" }[size];
  const iconSize = { sm: 18, md: 24, lg: 28 }[size];
  return (
    <div className={cn("flex items-center justify-center rounded-2xl", sizeClasses, toneClasses[tone], className || undefined)}>
      <Icon size={iconSize} strokeWidth={1.75} />
    </div>
  );
}
