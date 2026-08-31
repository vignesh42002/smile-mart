import { productsRepo } from "@/lib/data/products";
import { productSchema } from "@/lib/validation/admin";
import { listAndCreateHandlers } from "@/lib/api/entityRoutes";

export const { GET, POST } = listAndCreateHandlers(productsRepo, productSchema);
