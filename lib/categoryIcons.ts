import {
  Gift,
  Gamepad2,
  Shirt,
  Plug,
  Sparkles,
  Droplet,
  Gem,
  ShoppingBag,
  Flower2,
  PenLine,
  Store,
  type LucideIcon,
} from "lucide-react";

// No real product photography exists yet (doc §3 warns against cheap stock
// graphics), so each category renders as a consistent icon tile until real
// images are uploaded via Admin → Categories.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "gift-items": Gift,
  "toys-sports-items": Gamepad2,
  garments: Shirt,
  "home-appliances": Plug,
  "fancy-items": Sparkles,
  "cosmetics-beauty": Droplet,
  "imitation-jewellery": Gem,
  "bags-accessories": ShoppingBag,
  "flowers-decoration": Flower2,
  "stationery-items": PenLine,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Store;
}
