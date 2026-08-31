import { Star, UserCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/lib/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-brand-50/50 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="What our business partners say" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    className={index < testimonial.rating ? "fill-gold-500 text-gold-500" : "text-slate-200"}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">&ldquo;{testimonial.testimonial}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <UserCircle2 size={36} className="text-brand-300" />
                <div>
                  <p className="text-sm font-semibold text-brand-950">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">
                    {[testimonial.designation, testimonial.location].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
