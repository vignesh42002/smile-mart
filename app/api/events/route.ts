import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/analytics";
import type { AnalyticsEvent } from "@/lib/types";

const VALID_EVENTS: AnalyticsEvent[] = [
  "business_model_view",
  "business_model_apply",
  "lead_form_start",
  "lead_form_submit",
  "whatsapp_click",
  "phone_click",
  "product_view",
];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const event = body?.event;

  if (typeof event !== "string" || !VALID_EVENTS.includes(event as AnalyticsEvent)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await trackEvent(event as AnalyticsEvent, body?.meta ?? {});
  return NextResponse.json({ ok: true });
}
