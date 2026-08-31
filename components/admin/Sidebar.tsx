"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LayoutGrid,
  Package,
  Briefcase,
  HelpCircle,
  Star,
  Network,
  Settings,
  Smile,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/categories", label: "Categories", icon: LayoutGrid },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/business-models", label: "Business Models", icon: Briefcase },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/business-network", label: "Business Network", icon: Network },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <Link href="/admin" className="flex h-16 items-center gap-2 border-b border-slate-100 px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white">
          <Smile size={16} />
        </span>
        <span className="text-sm font-bold text-brand-950">Smile Mart Admin</span>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-brand-700 text-white" : "text-slate-600 hover:bg-brand-50 hover:text-brand-800"
              )}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2 border-t border-slate-100 px-6 py-4 text-xs font-medium text-slate-500 hover:text-brand-700"
      >
        <ExternalLink size={14} />
        View Website
      </Link>
    </aside>
  );
}
