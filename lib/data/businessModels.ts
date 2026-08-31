import { createCrudRepo } from "./crud";
import type { BusinessModel } from "@/lib/types";

export const businessModelsRepo = createCrudRepo<BusinessModel>("businessModels.json");

export async function getPublishedBusinessModels() {
  const models = await businessModelsRepo.getAll();
  return models
    .filter((model) => model.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getBusinessModelBySlug(slug: string) {
  const models = await businessModelsRepo.getAll();
  return models.find((model) => model.slug === slug) ?? null;
}
