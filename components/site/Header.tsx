"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/business-opportunity", label: "Business Opportunity" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings?: any } = {}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <Container className="flex h-20 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all group-hover:scale-105 group-hover:shadow-emerald-600/30">
            <ShoppingBag size={22} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
              Smile <span className="text-emerald-600">Mart</span>
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-tight mt-1">
              Happiness in Every Home
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-0.5"
                    : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/admin/login"
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
              <User size={16} />
            </div>
            Admin Login
          </Link>
          <Link
            href="/business-opportunity"
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg active:scale-98"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/business-opportunity"
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-600"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-6 lg:hidden shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-1.5 transition-colors ${
                    isActive ? "text-emerald-600" : "text-slate-800 hover:text-emerald-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <hr className="my-2 border-slate-100" />
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <User size={15} />
              </div>
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

