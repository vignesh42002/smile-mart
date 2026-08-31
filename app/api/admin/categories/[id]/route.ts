import { categoriesRepo } from "@/lib/data/categories";
import { categorySchema } from "@/lib/validation/admin";
import { itemHandlers } from "@/lib/api/entityRoutes";

export const { PATCH, DELETE } = itemHandlers(categoriesRepo, categorySchema);
