import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "@/components/site/TrackedLink";
import { getBusinessModelIcon } from "@/lib/businessModelIcons";
import { formatInr } from "@/lib/utils";
import type { BusinessModel } from "@/lib/types";

export function BusinessModelCard({
  model,
  highlight = false,
}: {
  model: BusinessModel;
  highlight?: boolean;
}) {
  const Icon = getBusinessModelIcon(model.slug);

  return (
    <Card
      className={
        highlight
          ? "flex flex-col border-gold-500 p-8 shadow-lg shadow-gold-600/10 ring-1 ring-gold-400"
          : "flex flex-col p-8"
      }
    >
      <IconTile icon={Icon} tone={highlight ? "gold" : "brand"} size="lg" />
      <h3 className="mt-6 text-xl font-bold text-brand-950">{model.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{model.tagline}</p>
      <p className="mt-5 text-3xl font-bold text-brand-950">{formatInr(model.investmentAmount)}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {model.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
            <Check size={17} className="mt-0.5 shrink-0 text-emerald-600" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-2.5">
        <Button href={`/business-opportunity/${model.slug}`} variant="secondary">
          Explore Model
        </Button>
        <TrackedLink
          href={`/business-opportunity/${model.slug}#enquiry`}
          event="business_model_apply"
          meta={{ model: model.slug }}
          className="inline-flex items-center justify-center rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800"
        >
          {model.ctaLabel}
        </TrackedLink>
      </div>
    </Card>
  );
}
