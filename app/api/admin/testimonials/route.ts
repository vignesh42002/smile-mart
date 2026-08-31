import { testimonialsRepo } from "@/lib/data/testimonials";
import { testimonialSchema } from "@/lib/validation/admin";
import { listAndCreateHandlers } from "@/lib/api/entityRoutes";

export const { GET, POST } = listAndCreateHandlers(testimonialsRepo, testimonialSchema);
