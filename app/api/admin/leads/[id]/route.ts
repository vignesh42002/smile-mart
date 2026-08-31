import { NextRequest, NextResponse } from "next/server";
import { getLeadById, updateLead } from "@/lib/data/leads";
import { leadUpdateSchema } from "@/lib/validation/admin";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import type { LeadStatus } from "@/lib/types";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const lead = await getLeadById(id);
  if (!lead) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const result = leadUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const updated = await updateLead(id, { ...result.data, status: result.data.status as LeadStatus | undefined });
  if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}
