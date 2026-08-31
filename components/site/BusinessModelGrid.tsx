import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessModelCard } from "@/components/site/BusinessModelCard";
import type { BusinessModel } from "@/lib/types";

export function BusinessModelGrid({
  models,
  showHeading = true,
}: {
  models: BusinessModel[];
  showHeading?: boolean;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Business Opportunity"
            title="Choose the model that fits your ambition"
            description="Three structured ways to start — pick the level of investment and product access that suits you."
          />
        ) : null}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {models.map((model) => (
            <BusinessModelCard key={model.id} model={model} highlight={model.slug === "standard"} />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
          Investment amounts and features shown above are indicative and subject to Smile Mart&apos;s applicable
          terms and conditions. No income or return is guaranteed.
        </p>
      </Container>
    </section>
  );
}
