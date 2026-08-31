import { createCrudRepo } from "./crud";
import type { BusinessNetworkEntry } from "@/lib/types";

export const businessNetworkRepo = createCrudRepo<BusinessNetworkEntry>("businessNetwork.json");

export async function getOrderedBusinessNetwork() {
  const entries = await businessNetworkRepo.getAll();
  return entries.sort((a, b) => a.displayOrder - b.displayOrder);
}
