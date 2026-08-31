import { businessNetworkRepo } from "@/lib/data/businessNetwork";
import { businessNetworkSchema } from "@/lib/validation/admin";
import { itemHandlers } from "@/lib/api/entityRoutes";

export const { PATCH, DELETE } = itemHandlers(businessNetworkRepo, businessNetworkSchema);
