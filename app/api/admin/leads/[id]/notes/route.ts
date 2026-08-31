import { NextRequest, NextResponse } from "next/server";
import { addLeadNote } from "@/lib/data/leads";
import { leadNoteSchema } from "@/lib/validation/admin";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const result = leadNoteSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: "Note cannot be empty" }, { status: 400 });
  }

  const updated = await addLeadNote(id, result.data.text);
  if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}
