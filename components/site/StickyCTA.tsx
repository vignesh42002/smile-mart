"use client";

import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics-client";
import { waLink } from "@/lib/utils";

export function StickyCTA({
  phone,
  whatsappNumber,
  whatsappMessage,
}: {
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden">
      <a
        href={`tel:${phone}`}
        onClick={() => track("phone_click", { source: "sticky_cta" })}
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-slate-700"
      >
        <Phone size={18} className="text-brand-700" />
        Call
      </a>
      <a
        href={waLink(whatsappNumber, whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { source: "sticky_cta" })}
        className="flex flex-1 flex-col items-center gap-0.5 border-x border-slate-200 py-2.5 text-xs font-medium text-slate-700"
      >
        <MessageCircle size={18} className="text-emerald-600" />
        WhatsApp
      </a>
      <Link
        href="/business-opportunity"
        onClick={() => track("business_model_apply", { source: "sticky_cta" })}
        className="flex flex-1 flex-col items-center gap-0.5 bg-brand-700 py-2.5 text-xs font-semibold text-white"
      >
        <ArrowRight size={18} />
        Apply Now
      </Link>
    </div>
  );
}
