"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { track } from "@/lib/analytics-client";
import { waLink } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
}

export function MobileMenu({
  navItems,
  whatsappNumber,
  whatsappMessage,
}: {
  navItems: NavItem[];
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-40 border-t border-slate-100 bg-white px-5 pb-6 pt-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={waLink(whatsappNumber, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "mobile_menu" })}
            className="mt-4 flex items-center justify-center rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white"
          >
            WhatsApp Us
          </a>
        </div>
      ) : null}
    </div>
  );
}
