import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS_STEPS } from "@/lib/types";

export function HowItWorks() {
  return (
    <section className="bg-brand-950 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="How It Works" title="Five simple steps to get started" light />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_WORKS_STEPS.map((item) => (
            <div key={item.step} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="text-3xl font-bold text-gold-400">{String(item.step).padStart(2, "0")}</span>
              <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
