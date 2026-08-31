import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BusinessModelGrid } from "@/components/site/BusinessModelGrid";
import { HowItWorks } from "@/components/site/HowItWorks";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { DisclaimerBanner } from "@/components/site/DisclaimerBanner";
import { getPublishedBusinessModels } from "@/lib/data/businessModels";
import { getSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Business Opportunity",
  description: "Compare the Basic, Standard and Premium business models and find the right fit to start your business with Smile Mart India.",
  alternates: { canonical: "/business-opportunity" },
};

export default async function BusinessOpportunityPage() {
  const [models, settings] = await Promise.all([getPublishedBusinessModels(), getSettings()]);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Business Opportunity</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">
            Three business models. One growing opportunity.
          </h1>
          <p className="mx-auto mt-6 text-lg text-white/80">
            Compare Basic, Standard and Premium to find the level of investment and product access that fits you.
          </p>
        </Container>
      </section>
      <BusinessModelGrid models={models} showHeading={false} />
      <HowItWorks />
      <LeadCTASection />
      <DisclaimerBanner text={settings.legalDisclaimer} />
    </>
  );
}
