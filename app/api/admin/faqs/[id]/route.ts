import { faqsRepo } from "@/lib/data/faqs";
import { faqSchema } from "@/lib/validation/admin";
import { itemHandlers } from "@/lib/api/entityRoutes";

export const { PATCH, DELETE } = itemHandlers(faqsRepo, faqSchema);
