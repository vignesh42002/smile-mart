import { createCrudRepo } from "./crud";
import type { Product } from "@/lib/types";

export const productsRepo = createCrudRepo<Product>("products.json");

export async function getAllPublishedProducts() {
  const products = await productsRepo.getAll();
  return products
    .filter((product) => product.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getFeaturedProducts() {
  const products = await productsRepo.getAll();
  return products
    .filter((product) => product.published && product.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPublishedProductsByCategory(categoryId: string) {
  const products = await productsRepo.getAll();
  return products
    .filter((product) => product.published && product.categoryId === categoryId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

