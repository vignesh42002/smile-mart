import { productsRepo } from "@/lib/data/products";
import { productSchema } from "@/lib/validation/admin";
import { itemHandlers } from "@/lib/api/entityRoutes";

export const { PATCH, DELETE } = itemHandlers(productsRepo, productSchema);
