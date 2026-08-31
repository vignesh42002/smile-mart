import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/site/LeadForm";
import { TrackedLink } from "@/components/site/TrackedLink";
import { getSettings } from "@/lib/data/settings";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Smile Mart India by phone, WhatsApp or email, or submit an enquiry directly.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSettings();

  const details = [
    { icon: MapPin, label: "Address", value: settings.contact.address },
    { icon: Phone, label: "Phone", value: settings.contact.phone, href: `tel:${settings.contact.phone}`, event: "phone_click" as const },
    { icon: Mail, label: "Email", value: settings.contact.email, href: `mailto:${settings.contact.email}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.contact.whatsappNumber,
      href: waLink(settings.contact.whatsappNumber, settings.whatsappMessage),
      event: "whatsapp_click" as const,
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Contact Us</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">We&apos;d love to hear from you</h1>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-brand-950">Reach Us Directly</h2>
              <ul className="mt-6 space-y-5">
                {details.map((detail) => (
                  <li key={detail.label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <detail.icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{detail.label}</p>
                      {detail.href ? (
                        detail.event ? (
                          <TrackedLink href={detail.href} event={detail.event} className="text-sm font-medium text-brand-800 hover:underline">
                            {detail.value}
                          </TrackedLink>
                        ) : (
                          <a href={detail.href} className="text-sm font-medium text-brand-800 hover:underline">
                            {detail.value}
                          </a>
                        )
                      ) : (
                        <p className="text-sm font-medium text-slate-700">{detail.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-slate-400">
                A map will be added once the exact business location is confirmed and verified (doc §9).
              </p>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <LeadForm title="Send Us a Message" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
