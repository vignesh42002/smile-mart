import { faqsRepo } from "@/lib/data/faqs";
import { faqSchema } from "@/lib/validation/admin";
import { listAndCreateHandlers } from "@/lib/api/entityRoutes";

export const { GET, POST } = listAndCreateHandlers(faqsRepo, faqSchema);
