import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/lead";
import { createLead } from "@/lib/data/leads";
import { notifyAdminOfNewLead } from "@/lib/notify";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`lead:${ip}`)) {
    return NextResponse.json({ message: "Too many submissions. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Please check the form and try again.", errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot: a filled "website" field means a bot submitted the form.
  // Return success so the bot doesn't learn anything, but drop the record.
  if (result.data.website) {
    return NextResponse.json({ message: "Thank you." }, { status: 200 });
  }

  const lead = await createLead(result.data);
  await notifyAdminOfNewLead(lead);

  return NextResponse.json({ message: "Enquiry received.", id: lead.id }, { status: 201 });
}
