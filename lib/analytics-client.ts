"use client";

import type { AnalyticsEvent } from "@/lib/types";

// Fire-and-forget client-side event tracking, used by WhatsApp/phone/CTA
// buttons and business-model views. Posts to /api/events, which forwards to
// the trackEvent() stub in lib/analytics.ts.
export function track(event: AnalyticsEvent, meta: Record<string, string | number> = {}): void {
  try {
    const body = JSON.stringify({ event, meta });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
      return;
    }
    fetch("/api/events", { method: "POST", body, keepalive: true }).catch(() => undefined);
  } catch {
    // Analytics must never break the UI.
  }
}
