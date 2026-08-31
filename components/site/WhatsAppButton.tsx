"use client";

import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics-client";
import { waLink } from "@/lib/utils";

export function WhatsAppButton({
  whatsappNumber,
  whatsappMessage,
}: {
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  return (
    <a
      href={waLink(whatsappNumber, whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { source: "floating_button" })}
      aria-label="Chat with Smile Mart on WhatsApp"
      className="fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105 lg:bottom-6"
    >
      <MessageCircle size={26} fill="white" className="text-emerald-500" />
    </a>
  );
}
