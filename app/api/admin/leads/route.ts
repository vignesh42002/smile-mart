import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/lib/data/leads";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const model = searchParams.get("model");
  const city = searchParams.get("city");
  const query = searchParams.get("q")?.toLowerCase();

  let leads = await getLeads();

  if (status) leads = leads.filter((lead) => lead.status === status);
  if (model) leads = leads.filter((lead) => lead.interestedModel === model);
  if (city) leads = leads.filter((lead) => lead.city.toLowerCase() === city.toLowerCase());
  if (query) {
    leads = leads.filter(
      (lead) =>
        lead.fullName.toLowerCase().includes(query) ||
        lead.mobile.includes(query) ||
        lead.city.toLowerCase().includes(query)
    );
  }

  return NextResponse.json(leads);
}
