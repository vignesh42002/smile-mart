import { z } from "zod";

// Shared by the public LeadForm (client-side check before submit) and the
// POST /api/leads route (authoritative server-side check) — never trust the client alone.
export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/, "Please enter a valid mobile number"),
  email: z.union([z.string().trim().email("Please enter a valid email"), z.literal("")]).optional(),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  interestedModel: z.enum(["basic", "standard", "premium", "guidance"]),
  source: z.string().trim().max(120).optional(),
  message: z.string().trim().max(2000).optional(),
  // Honeypot field: real users never fill this in; bots that auto-fill every
  // input do. Any non-empty value here silently drops the submission.
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
