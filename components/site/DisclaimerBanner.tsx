import { Info } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function DisclaimerBanner({ text }: { text: string }) {
  return (
    <div className="border-y border-amber-100 bg-amber-50/60 py-6">
      <Container>
        <div className="flex items-start gap-3 text-xs leading-relaxed text-amber-900 sm:text-sm">
          <Info size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <p>{text}</p>
        </div>
      </Container>
    </div>
  );
}
