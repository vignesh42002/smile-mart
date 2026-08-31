import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { WhySmileMart } from "@/components/site/WhySmileMart";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { BusinessModelGrid } from "@/components/site/BusinessModelGrid";
import { HowItWorks } from "@/components/site/HowItWorks";
import { OpportunityCalendar } from "@/components/site/OpportunityCalendar";
import { SocialMediaMarketing } from "@/components/site/SocialMediaMarketing";
import { BusinessNetwork } from "@/components/site/BusinessNetwork";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { DisclaimerBanner } from "@/components/site/DisclaimerBanner";
import { getPublishedCategories } from "@/lib/data/categories";
import { getPublishedBusinessModels } from "@/lib/data/businessModels";
import { getPublishedTestimonials } from "@/lib/data/testimonials";
import { getOrderedBusinessNetwork } from "@/lib/data/businessNetwork";
import { getSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [categories, models, testimonials, settings, networkEntries] = await Promise.all([
    getPublishedCategories(),
    getPublishedBusinessModels(),
    getPublishedTestimonials(),
    getSettings(),
    getOrderedBusinessNetwork(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Smile Mart India",
    slogan: "Happiness in Every Home",
    email: settings.contact.email,
    telephone: settings.contact.phone,
    address: settings.contact.address,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <WhySmileMart />
      <CategoryGrid categories={categories} />
      <BusinessModelGrid models={models} />
      <HowItWorks />
      <OpportunityCalendar />
      <SocialMediaMarketing />
      {settings.businessNetworkPublished ? <BusinessNetwork entries={networkEntries} /> : null}
      <TestimonialsSection testimonials={testimonials} />
      <LeadCTASection />
      <DisclaimerBanner text={settings.legalDisclaimer} />
    </>
  );
}
