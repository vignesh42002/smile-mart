import { NextResponse } from "next/server";
import { getLeads } from "@/lib/data/leads";
import { getAdmins } from "@/lib/data/admins";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [leads, admins] = await Promise.all([getLeads(), getAdmins()]);
  const adminMap = new Map(admins.map((a) => [a.id, a.name || a.username]));

  const todayStr = new Date().toISOString().split("T")[0];

  // Filter leads that have followUpDate set and are not closed/converted
  const reminders = leads
    .filter((lead) => lead.followUpDate && lead.status !== "closed" && lead.status !== "converted")
    .map((lead) => {
      const isDueToday = lead.followUpDate === todayStr;
      const isOverdue = !!(lead.followUpDate && lead.followUpDate < todayStr);
      const assignedName = lead.assignedTo ? adminMap.get(lead.assignedTo) || lead.assignedTo : "Unassigned";

      return {
        id: lead.id,
        fullName: lead.fullName,
        mobile: lead.mobile,
        city: lead.city,
        interestedModel: lead.interestedModel,
        status: lead.status,
        followUpDate: lead.followUpDate,
        assignedTo: lead.assignedTo,
        assignedName,
        isDueToday,
        isOverdue,
        latestNote: lead.notes[lead.notes.length - 1]?.text || null,
      };
    })
    .sort((a, b) => (a.followUpDate || "").localeCompare(b.followUpDate || ""));

  return NextResponse.json({
    reminders,
    dueTodayCount: reminders.filter((r) => r.isDueToday || r.isOverdue).length,
    totalCount: reminders.length,
  });
}
