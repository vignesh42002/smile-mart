import { businessNetworkRepo } from "@/lib/data/businessNetwork";
import { businessNetworkSchema } from "@/lib/validation/admin";
import { listAndCreateHandlers } from "@/lib/api/entityRoutes";

export const { GET, POST } = listAndCreateHandlers(businessNetworkRepo, businessNetworkSchema);
