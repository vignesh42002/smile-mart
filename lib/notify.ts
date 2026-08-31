import type { Lead } from "@/lib/types";

// Stub for the real transactional email service (doc §13, §18). Wiring in a
// provider (Resend, SES, SMTP...) later means implementing the body of this
// function only — every call site (POST /api/leads) stays unchanged.
export async function notifyAdminOfNewLead(lead: Lead): Promise<void> {
  console.log(
    `[notify] New lead received: ${lead.fullName} (${lead.mobile}) — interested in ${lead.interestedModel}. ` +
      `TODO: send this via the configured email service once credentials are available.`
  );
}
