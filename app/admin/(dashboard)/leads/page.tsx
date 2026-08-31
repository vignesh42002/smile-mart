"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Search } from "lucide-react";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { formatDate } from "@/lib/utils";
import { LEAD_STATUSES, type Lead } from "@/lib/types";

const MODEL_OPTIONS = ["basic", "standard", "premium", "guidance"];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [model, setModel] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (model) params.set("model", model);
    if (query) params.set("q", query);

    fetch(`/api/admin/leads?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setLeads(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [status, model, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Leads</h1>
          <p className="mt-1 text-sm text-slate-500">Manage and follow up on enquiries submitted through the website.</p>
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
              <th className="px-5 py-3 font-medium">Model</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-medium text-brand-900 hover:underline">
                    {lead.fullName}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{lead.mobile}</td>
                <td className="px-5 py-3 text-slate-600">{lead.city}</td>
                <td className="px-5 py-3 capitalize text-slate-600">{lead.interestedModel}</td>
                <td className="px-5 py-3">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="px-5 py-3 text-slate-500">{formatDate(lead.createdAt)}</td>
              </tr>
            ))}
            {!loading && leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">
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
