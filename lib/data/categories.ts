import { createCrudRepo } from "./crud";
import type { ProductCategory } from "@/lib/types";

export const categoriesRepo = createCrudRepo<ProductCategory>("categories.json");

export async function getPublishedCategories() {
  const categories = await categoriesRepo.getAll();
  return categories
    .filter((category) => category.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getCategoryBySlug(slug: string) {
  const categories = await categoriesRepo.getAll();
  return categories.find((category) => category.slug === slug) ?? null;
}
