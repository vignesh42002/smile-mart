import { promises as fs } from "fs";
import path from "path";
import type { AnalyticsEvent } from "@/lib/types";

const LOG_FILE = path.join(process.cwd(), "data", "events.log");

// Stub for a real analytics provider (GA4, etc. — doc §16). Every tracked
// event name the doc calls out is funneled through this one function so
// swapping in a real provider later is a one-function change.
export async function trackEvent(
  event: AnalyticsEvent,
  meta: Record<string, string | number | undefined> = {}
): Promise<void> {
  const line = JSON.stringify({ event, meta, at: new Date().toISOString() });
  try {
    await fs.appendFile(LOG_FILE, line + "\n", "utf-8");
  } catch {
    // Best-effort logging only — never block the request on analytics.
  }
}
