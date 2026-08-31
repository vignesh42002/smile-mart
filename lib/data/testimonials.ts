import { createCrudRepo } from "./crud";
import type { Testimonial } from "@/lib/types";

export const testimonialsRepo = createCrudRepo<Testimonial>("testimonials.json");

export async function getPublishedTestimonials() {
  const testimonials = await testimonialsRepo.getAll();
  return testimonials
    .filter((testimonial) => testimonial.published)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
