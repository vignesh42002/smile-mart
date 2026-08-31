import { Rocket, TrendingUp, Crown, Briefcase, type LucideIcon } from "lucide-react";

const MODEL_ICONS: Record<string, LucideIcon> = {
  basic: Rocket,
  standard: TrendingUp,
  premium: Crown,
};

export function getBusinessModelIcon(slug: string): LucideIcon {
  return MODEL_ICONS[slug] ?? Briefcase;
}
