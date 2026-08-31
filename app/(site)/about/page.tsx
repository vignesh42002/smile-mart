import type { Metadata } from "next";
import { Target, Eye, LayoutGrid, Smartphone, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconTile } from "@/components/ui/IconTile";
import { LeadCTASection } from "@/components/site/LeadCTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Smile Mart India is a multi-category product and business-opportunity platform helping entrepreneurs start and grow a business.",
  alternates: { canonical: "/about" },
};

const PILLARS = [
  { icon: LayoutGrid, title: "Multiple Product Categories", description: "Ten product categories spanning gifting, fashion, home, beauty and more — one platform instead of one product line." },
  { icon: Smartphone, title: "Digital Selling Approach", description: "Guidance on selling through WhatsApp, Instagram, Facebook and online marketplaces, alongside offline selling." },
  { icon: Compass, title: "Business Support", description: "Structured guidance from choosing a model through to growing your business." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">About Smile Mart</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">
            A multi-category business opportunity, built for modern entrepreneurs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Smile Mart India helps aspiring and existing business owners start and grow a business across multiple
            product categories, with structured guidance and modern selling channels.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-base leading-relaxed text-slate-600">
            Smile Mart India positions itself as more than a single-category retail store — it is a platform for
            entrepreneurs to build a business across gift items, garments, home appliances, beauty, jewellery and
            more, supported by flexible business models and guidance on both offline and digital selling. We work
            with entrepreneurs at every stage, from first-time business owners to existing retailers looking for an
            additional opportunity.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            [Final company history, milestones and facts to be confirmed by Smile Mart before publication — doc §6.]
          </p>
        </Container>
      </section>

      <section className="bg-brand-50/50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <IconTile icon={Target} />
              <h2 className="mt-5 text-xl font-bold text-brand-950">Our Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                To make starting and growing a business accessible — offering multiple product categories, flexible
                business models and practical guidance so more entrepreneurs can build something of their own.
                [Final wording pending Smile Mart approval.]
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <IconTile icon={Eye} tone="gold" />
              <h2 className="mt-5 text-xl font-bold text-brand-950">Our Vision</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                To be a trusted platform that connects everyday entrepreneurs with year-round business opportunities
                across India. [Final wording pending Smile Mart approval.]
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What We Offer" title="Products, opportunity, guidance — together" />
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="flex flex-col items-start">
                <IconTile icon={pillar.icon} />
                <h3 className="mt-5 text-lg font-semibold text-brand-950">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <LeadCTASection title="Want to know more about Smile Mart?" />
    </>
  );
}
