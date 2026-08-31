"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Pricing Plans" },
  { href: "/business-opportunity", label: "Product" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings?: any } = {}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-xs">
      <Container className="flex h-20 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm transition-transform group-hover:scale-105">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-black leading-none">
              WeDu
            </span>
            <span className="text-[11px] font-medium text-slate-600 tracking-tight mt-1">
              Communicate. Collaborate. Create.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base transition-colors ${
                  isActive
                    ? "font-bold text-black border-b-2 border-black pb-0.5"
                    : "font-medium text-slate-700 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/admin/login"
            className="flex items-center gap-2 font-semibold text-slate-800 hover:text-black transition-colors text-base"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
              <User size={15} />
            </div>
            Log In
          </Link>
          <Link
            href="/business-opportunity"
            className="rounded-lg border border-black/80 bg-[#F4B41A] px-5 py-2.5 text-base font-semibold text-black shadow-xs transition-all hover:bg-[#e0a410] hover:shadow-md active:scale-98"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/business-opportunity"
            className="rounded-md border border-black/80 bg-[#F4B41A] px-3 py-1.5 text-xs font-semibold text-black"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-black"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-800 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-slate-100" />
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-lg font-semibold text-slate-800"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <User size={15} />
              </div>
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
