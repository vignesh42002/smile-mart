import { readCollection, mutateCollection } from "./store";
import type { AdminUser } from "@/lib/types";

const FILE = "admins.json";

// Default admin credentials: username = admin, password = ChangeMe123!
const DEFAULT_ADMIN_USER: AdminUser = {
  id: "admin-1",
  username: "admin",
  passwordHash: "$2b$10$3sz0Cg8UMfT.3xjIfwSs5OWxFDqaMGPcScUMrk/6MgFMwyyv0B7Ha",
  name: "Smile Mart Admin",
  role: "admin",
  createdAt: "2026-08-29T00:00:00.000Z",
};

export async function getAdmins(): Promise<AdminUser[]> {
  const admins = await readCollection<AdminUser>(FILE);
  if (admins.length === 0) {
    await mutateCollection<AdminUser>(FILE, () => [DEFAULT_ADMIN_USER]);
    return [DEFAULT_ADMIN_USER];
  }
  return admins;
}

export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const admins = await getAdmins();
  return admins.find((admin) => admin.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  const admins = await getAdmins();
  return admins.find((admin) => admin.id === id) ?? null;
}

