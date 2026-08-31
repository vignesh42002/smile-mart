"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics-client";
import type { AnalyticsEvent } from "@/lib/types";

export function ViewTracker({ event, meta }: { event: AnalyticsEvent; meta?: Record<string, string | number> }) {
  useEffect(() => {
    track(event, meta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
