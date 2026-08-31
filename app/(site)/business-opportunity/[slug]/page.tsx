import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { ViewTracker } from "@/components/site/ViewTracker";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { DisclaimerBanner } from "@/components/site/DisclaimerBanner";
import { getBusinessModelBySlug, getPublishedBusinessModels } from "@/lib/data/businessModels";
import { getSettings } from "@/lib/data/settings";
import { getBusinessModelIcon } from "@/lib/businessModelIcons";
import { formatInr } from "@/lib/utils";
import type { BusinessModelInterest } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await getBusinessModelBySlug(slug);
  if (!model) return {};
  return {
    title: model.name,
    description: model.tagline,
    alternates: { canonical: `/business-opportunity/${model.slug}` },
  };
}

export async function generateStaticParams() {
  const models = await getPublishedBusinessModels();
  return models.map((model) => ({ slug: model.slug }));
}

export default async function BusinessModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [model, settings] = await Promise.all([getBusinessModelBySlug(slug), getSettings()]);
  if (!model || !model.published) notFound();

  const Icon = getBusinessModelIcon(model.slug);

  return (
    <>
      <ViewTracker event="business_model_view" meta={{ model: model.slug }} />
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 py-16 sm:py-20">
        <Container className="max-w-2xl text-center">
          <div className="mx-auto w-fit">
            <IconTile icon={Icon} tone="gold" size="lg" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">{model.name}</h1>
          <p className="mt-3 text-white/80">{model.tagline}</p>
          <p className="mt-6 text-4xl font-bold text-gold-300">{formatInr(model.investmentAmount)}</p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-base leading-relaxed text-slate-600">{model.description}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold text-brand-950">What&apos;s Included</h2>
              <ul className="mt-4 space-y-3">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-950">Benefits</h2>
              <ul className="mt-4 space-y-3">
                {model.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check size={17} className="mt-0.5 shrink-0 text-gold-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <LeadCTASection
        defaultModel={model.slug as BusinessModelInterest}
        title={`Ready to apply for the ${model.name}?`}
      />
      <DisclaimerBanner text={settings.legalDisclaimer} />
    </>
  );
}
