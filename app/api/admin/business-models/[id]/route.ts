import { businessModelsRepo } from "@/lib/data/businessModels";
import { businessModelSchema } from "@/lib/validation/admin";
import { itemHandlers } from "@/lib/api/entityRoutes";

export const { PATCH, DELETE } = itemHandlers(businessModelsRepo, businessModelSchema);
