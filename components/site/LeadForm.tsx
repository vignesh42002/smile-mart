"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { leadSchema } from "@/lib/validation/lead";
import { track } from "@/lib/analytics-client";
import type { BusinessModelInterest } from "@/lib/types";

const MODEL_OPTIONS: { value: BusinessModelInterest; label: string }[] = [
  { value: "basic", label: "Basic (₹25,000)" },
  { value: "standard", label: "Standard (₹50,000)" },
  { value: "premium", label: "Premium (₹1,00,000)" },
  { value: "guidance", label: "Need Guidance" },
];

const SOURCE_OPTIONS = [
  "Instagram",
  "Facebook",
  "WhatsApp",
  "Google Search",
  "Friend / Family Referral",
  "Existing Business Network",
  "Other",
];

export function LeadForm({
  defaultModel,
  title = "Submit Your Enquiry",
}: {
  defaultModel?: BusinessModelInterest;
  title?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const hasStartedRef = useRef(false);

  function handleFocusOnce() {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    track("lead_form_start");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const values = {
      fullName: String(formData.get("fullName") || ""),
      mobile: String(formData.get("mobile") || ""),
      email: String(formData.get("email") || ""),
      city: String(formData.get("city") || ""),
      interestedModel: String(formData.get("interestedModel") || ""),
      source: String(formData.get("source") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    const result = leadSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setErrorMessage(payload?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      track("lead_form_submit", { interestedModel: result.data.interestedModel });
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center">
        <CheckCircle2 size={40} className="text-emerald-600" />
        <h3 className="mt-4 text-xl font-bold text-emerald-900">Thank you for your enquiry!</h3>
        <p className="mt-2 max-w-sm text-sm text-emerald-800">
          Our team has received your details and will get in touch with you shortly.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={handleFocusOnce} noValidate className="space-y-4">
      <h3 className="text-xl font-bold text-brand-950">{title}</h3>

      {/* Honeypot — hidden from real users, catches bots that fill every field */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full Name" name="fullName" required autoComplete="name" error={errors.fullName} />
        <Input label="Mobile Number" name="mobile" required autoComplete="tel" error={errors.mobile} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email Address" type="email" name="email" autoComplete="email" error={errors.email} />
        <Input label="City" name="city" required autoComplete="address-level2" error={errors.city} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Interested Business Model" name="interestedModel" required defaultValue={defaultModel ?? ""} error={errors.interestedModel}>
          <option value="" disabled>
            Select a model
          </option>
          {MODEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select label="How did you hear about us?" name="source" error={errors.source}>
          <option value="">Select an option</option>
          {SOURCE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <Textarea label="Message" name="message" placeholder="Tell us a little about what you're looking for" error={errors.message} />

      {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Enquiry"
        )}
      </Button>
    </form>
  );
}
