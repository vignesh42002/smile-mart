"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-brand-950 sm:text-base">{faq.question}</span>
              <ChevronDown
                size={18}
                className={cn("shrink-0 text-slate-400 transition-transform", isOpen ? "rotate-180" : undefined)}
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600 sm:px-6">{faq.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
