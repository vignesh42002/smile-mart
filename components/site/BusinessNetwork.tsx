import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BusinessNetworkEntry } from "@/lib/types";

export function BusinessNetwork({ entries }: { entries: BusinessNetworkEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Business Network"
          title="Part of a growing business community"
          description="Businesses connected with Smile Mart's network."
        />
        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-6 text-center"
            >
              <Building2 size={22} className="text-brand-700" />
              <span className="text-xs font-medium leading-snug text-slate-700">{entry.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
