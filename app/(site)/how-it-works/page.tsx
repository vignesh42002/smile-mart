import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HowItWorks } from "@/components/site/HowItWorks";
import { LeadCTASection } from "@/components/site/LeadCTASection";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Five simple steps to start your business with Smile Mart India, from choosing a model to growing your business.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">How It Works</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">
            From enquiry to a running business, in five steps
          </h1>
        </Container>
      </section>
      <HowItWorks />
      <LeadCTASection />
    </>
  );
}
