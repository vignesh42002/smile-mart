import { businessModelsRepo } from "@/lib/data/businessModels";
import { businessModelSchema } from "@/lib/validation/admin";
import { listAndCreateHandlers } from "@/lib/api/entityRoutes";

export const { GET, POST } = listAndCreateHandlers(businessModelsRepo, businessModelSchema);
