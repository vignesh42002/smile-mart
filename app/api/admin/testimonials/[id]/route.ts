import { testimonialsRepo } from "@/lib/data/testimonials";
import { testimonialSchema } from "@/lib/validation/admin";
import { itemHandlers } from "@/lib/api/entityRoutes";

export const { PATCH, DELETE } = itemHandlers(testimonialsRepo, testimonialSchema);
