import { categoriesRepo } from "@/lib/data/categories";
import { categorySchema } from "@/lib/validation/admin";
import { listAndCreateHandlers } from "@/lib/api/entityRoutes";

export const { GET, POST } = listAndCreateHandlers(categoriesRepo, categorySchema);
