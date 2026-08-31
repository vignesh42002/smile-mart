import Link from "next/link";
import { Users, Inbox, PhoneCall, CalendarClock, Heart, CheckCircle2, XCircle } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { getLeads } from "@/lib/data/leads";
import { formatDate } from "@/lib/utils";
import { LEAD_STATUSES } from "@/lib/types";

const STATUS_ICON = {
  new: Inbox,
  contacted: PhoneCall,
  followup: CalendarClock,
  interested: Heart,
  converted: CheckCircle2,
  closed: XCircle,
} as const;

export default async function AdminDashboardPage() {
  const leads = await getLeads();
  const recentLeads = leads.slice(0, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">An overview of enquiries coming through the website.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Leads" value={leads.length} icon={Users} />
        {LEAD_STATUSES.map((status) => (
          <StatCard
            key={status}
            label={status[0].toUpperCase() + status.slice(1)}
            value={leads.filter((lead) => lead.status === status).length}
            icon={STATUS_ICON[status]}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-brand-950">Recent Enquiries</h2>
          <Link href="/admin/leads" className="text-xs font-semibold text-brand-700 hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">Model</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium text-brand-900 hover:underline">
                      {lead.fullName}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{lead.city}</td>
                  <td className="px-5 py-3 capitalize text-slate-600">{lead.interestedModel}</td>
                  <td className="px-5 py-3">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                    No enquiries yet. New leads submitted from the website will appear here.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
