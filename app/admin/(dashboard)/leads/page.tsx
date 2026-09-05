"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Search, Calendar, UserCheck } from "lucide-react";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { formatDate } from "@/lib/utils";
import { LEAD_STATUSES, type Lead } from "@/lib/types";

const MODEL_OPTIONS = ["basic", "standard", "premium", "guidance"];

interface AdminOption {
  id: string;
  name: string;
  username: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [admins, setAdmins] = useState<AdminOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [model, setModel] = useState("");
  const [query, setQuery] = useState("");
  const [todayStr, setTodayStr] = useState("");

  useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);

    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (model) params.set("model", model);
    if (query) params.set("q", query);

    Promise.all([
      fetch(`/api/admin/leads?${params.toString()}`).then((res) => (res.ok ? res.json() : [])),
      fetch("/api/admin/admins").then((res) => (res.ok ? res.json() : [])),
    ])
      .then(([leadsData, adminsData]) => {
        setLeads(Array.isArray(leadsData) ? leadsData : []);
        setAdmins(Array.isArray(adminsData) ? adminsData : []);
      })
      .finally(() => setLoading(false));
  }, [status, model, query]);

  const adminMap = new Map(admins.map((a) => [a.id, a.name || a.username]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Leads & Follow-ups</h1>
          <p className="mt-1 text-sm text-slate-500">Manage, assign and track follow-up reminders for website enquiries.</p>
        </div>
        <Link
          href="/api/admin/leads/export"
          className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Download size={16} />
          Export CSV
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, mobile or city"
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((option) => (
            <option key={option} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={model}
          onChange={(event) => setModel(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="">All models</option>
          {MODEL_OPTIONS.map((option) => (
            <option key={option} value={option} className="capitalize">
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Mobile</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Follow-up Date</th>
              <th className="px-5 py-3 font-medium">Assigned To</th>
              <th className="px-5 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const isOverdue = lead.followUpDate && todayStr && lead.followUpDate < todayStr && lead.status !== "closed" && lead.status !== "converted";
              const isDueToday = lead.followUpDate === todayStr && lead.status !== "closed" && lead.status !== "converted";

              return (
                <tr key={lead.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-brand-900 hover:underline">
                      {lead.fullName}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{lead.mobile}</td>
                  <td className="px-5 py-3 text-slate-600">{lead.city}</td>
                  <td className="px-5 py-3">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-3">
                    {lead.followUpDate ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
                          isOverdue
                            ? "bg-rose-100 text-rose-700"
                            : isDueToday
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Calendar size={12} />
                        {lead.followUpDate}
                        {isOverdue ? " (Overdue)" : isDueToday ? " (Today)" : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Not set</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {lead.assignedTo ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-800 bg-brand-50 px-2 py-0.5 rounded-md">
                        <UserCheck size={12} />
                        {adminMap.get(lead.assignedTo) || lead.assignedTo}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(lead.createdAt)}</td>
                </tr>
              );
            })}
            {!loading && leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">
                  No leads match these filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
