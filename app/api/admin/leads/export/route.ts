import { NextResponse } from "next/server";
import { getLeads } from "@/lib/data/leads";
import { requireAdmin } from "@/lib/auth/requireAdmin";

const COLUMNS = ["fullName", "mobile", "email", "city", "interestedModel", "status", "source", "createdAt"] as const;

function toCsvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const leads = await getLeads();
  const rows = [
    COLUMNS.join(","),
    ...leads.map((lead) => COLUMNS.map((column) => toCsvCell(String(lead[column] ?? ""))).join(",")),
  ];

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="smile-mart-leads.csv"`,
    },
  });
}
