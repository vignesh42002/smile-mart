import { readCollection } from "./store";
import type { AdminUser } from "@/lib/types";

const FILE = "admins.json";

export async function getAdmins(): Promise<AdminUser[]> {
  return readCollection<AdminUser>(FILE);
}

export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const admins = await getAdmins();
  return admins.find((admin) => admin.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  const admins = await getAdmins();
  return admins.find((admin) => admin.id === id) ?? null;
}
