import type { Metadata } from "next";
import { Camera, Users, Play, MessageCircle, Store } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconTile } from "@/components/ui/IconTile";
import { LeadCTASection } from "@/components/site/LeadCTASection";

export const metadata: Metadata = {
  title: "Social Media Marketing",
  description: "How Smile Mart partners promote and sell products through WhatsApp, Instagram, Facebook, YouTube and online marketplaces.",
  alternates: { canonical: "/social-media-marketing" },
};

const CHANNELS = [
  { icon: MessageCircle, name: "WhatsApp", description: "Reach customers directly and take orders through WhatsApp chats, broadcasts and status updates." },
  { icon: Camera, name: "Instagram", description: "Showcase products visually through posts, reels and stories to build a local following." },
  { icon: Users, name: "Facebook", description: "Use Facebook pages and local groups to reach customers in your community." },
  { icon: Play, name: "YouTube", description: "Share product videos and demonstrations to build trust with potential customers." },
  { icon: Store, name: "Online Marketplaces", description: "Extend your reach beyond your immediate area by listing on online marketplaces." },
];

export default function SocialMediaMarketingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Digital Selling</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">
            Sell beyond your counter
          </h1>
          <p className="mx-auto mt-6 text-lg text-white/80">
            Smile Mart guides partners on promoting and selling products through the channels shoppers already use
            every day.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Channels We Guide You On" title="Modern selling, made approachable" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((channel) => (
              <div key={channel.name} className="flex flex-col items-start">
                <IconTile icon={channel.icon} />
                <h3 className="mt-5 text-lg font-semibold text-brand-950">{channel.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{channel.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <LeadCTASection title="Want guidance on digital selling?" />
    </>
  );
}
