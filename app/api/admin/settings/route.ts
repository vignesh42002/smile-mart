import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/data/settings";
import { settingsSchema } from "@/lib/validation/admin";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getSettings());
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const result = settingsSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const updated = await updateSettings(result.data);
  return NextResponse.json(updated);
}
