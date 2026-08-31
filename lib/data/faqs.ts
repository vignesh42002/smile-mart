import { createCrudRepo } from "./crud";
import type { Faq } from "@/lib/types";

export const faqsRepo = createCrudRepo<Faq>("faqs.json");

export async function getPublishedFaqs() {
  const faqs = await faqsRepo.getAll();
  return faqs
    .filter((faq) => faq.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
