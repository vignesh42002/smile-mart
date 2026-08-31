import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/site/LeadForm";
import type { BusinessModelInterest } from "@/lib/types";

export function LeadCTASection({
  id = "enquiry",
  defaultModel,
  title = "Ready to build your business with Smile Mart?",
}: {
  id?: string;
  defaultModel?: BusinessModelInterest;
  title?: string;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Get Started" title={title} description="Share your details and our team will reach out with the next steps." />
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <LeadForm defaultModel={defaultModel} title="Submit Your Enquiry" />
        </div>
      </Container>
    </section>
  );
}
