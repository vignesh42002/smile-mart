import { PartyPopper } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OPPORTUNITY_OCCASIONS } from "@/lib/types";

export function OpportunityCalendar() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="365-Day Business Opportunities"
          title="A reason to sell, every season of the year"
          description="From festivals to school seasons, Smile Mart's categories map onto occasions that keep demand active year-round."
        />
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {OPPORTUNITY_OCCASIONS.map((occasion) => (
            <span
              key={occasion}
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2.5 text-sm font-medium text-brand-800 shadow-sm"
            >
              <PartyPopper size={15} className="text-gold-600" />
              {occasion}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
