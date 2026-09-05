import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { getPublishedFaqs } from "@/lib/data/faqs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Smile Mart India's business models, products and how to apply.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-20 text-center sm:py-24">
        <Container className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">FAQ</p>
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl">Frequently Asked Questions</h1>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </Container>
      </section>

      <LeadCTASection title="Still have questions?" />
    </>
  );
}
