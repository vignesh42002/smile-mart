import { NextResponse } from "next/server";
import { getAdmins } from "@/lib/data/admins";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admins = await getAdmins();
  const safeAdmins = admins.map(({ passwordHash, ...admin }) => admin);
  return NextResponse.json(safeAdmins);
}
