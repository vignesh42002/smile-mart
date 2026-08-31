import { Rocket, LayoutGrid, Smartphone, Compass, CalendarClock, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconTile } from "@/components/ui/IconTile";

const REASONS = [
  { icon: Rocket, title: "Easy to Start", description: "A clear, structured path to launch your business without guesswork." },
  { icon: LayoutGrid, title: "Multiple Product Categories", description: "Ten product categories to choose from, so you're never limited to one range." },
  { icon: Smartphone, title: "Digital Selling", description: "Guidance on selling through WhatsApp, Instagram, Facebook and online marketplaces." },
  { icon: Compass, title: "Business Guidance", description: "Structured support to help you get started and keep growing." },
  { icon: CalendarClock, title: "Year-Round Opportunities", description: "Demand across festivals, seasons and everyday occasions, all year long." },
  { icon: TrendingUp, title: "Growth Focused", description: "A model designed to scale with you as your business grows." },
];

export function WhySmileMart() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Why Smile Mart" title="A smarter way to start your own business" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <div key={reason.title} className="flex flex-col items-start">
              <IconTile icon={reason.icon} />
              <h3 className="mt-5 text-lg font-semibold text-brand-950">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
