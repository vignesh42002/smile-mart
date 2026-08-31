"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { LEAD_STATUSES, type Lead } from "@/lib/types";

export default function AdminLeadDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/leads/${params.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setLead)
      .finally(() => setLoading(false));
  }, [params.id]);

  async function updateLead(patch: Record<string, unknown>) {
    const response = await fetch(`/api/admin/leads/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (response.ok) setLead(await response.json());
  }

  async function handleAddNote() {
    if (!noteText.trim()) return;
    setSavingNote(true);
    const response = await fetch(`/api/admin/leads/${params.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: noteText.trim() }),
    });
    if (response.ok) {
      setLead(await response.json());
      setNoteText("");
    }
    setSavingNote(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="py-16 text-center text-slate-500">
        Lead not found.
        <div className="mt-4">
          <Button variant="secondary" onClick={() => router.push("/admin/leads")}>
            Back to Leads
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline">
        <ArrowLeft size={16} />
        Back to Leads
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-brand-950">{lead.fullName}</h1>
            <p className="mt-1 text-sm text-slate-500">Enquiry received {formatDate(lead.createdAt)}</p>
          </div>
          <LeadStatusBadge status={lead.status} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={15} className="text-slate-400" />
            {lead.mobile}
          </div>
          {lead.email ? (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail size={15} className="text-slate-400" />
              {lead.email}
            </div>
          ) : null}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={15} className="text-slate-400" />
            {lead.city}
          </div>
        </div>

        {lead.message ? <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{lead.message}</p> : null}

        <dl className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
          <div>
            <dt className="inline font-medium">Interested Model: </dt>
            <dd className="inline capitalize">{lead.interestedModel}</dd>
          </div>
          {lead.source ? (
            <div>
              <dt className="inline font-medium">Source: </dt>
              <dd className="inline">{lead.source}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-950">Status</h2>
          <select
            value={lead.status}
            onChange={(event) => updateLead({ status: event.target.value })}
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status[0].toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-950">Follow-up Date</h2>
          <input
            type="date"
            value={lead.followUpDate ?? ""}
            onChange={(event) => updateLead({ followUpDate: event.target.value || null })}
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">Notes</h2>
        <div className="mt-4 space-y-3">
          {lead.notes.length === 0 ? <p className="text-sm text-slate-400">No notes yet.</p> : null}
          {lead.notes.map((note) => (
            <div key={note.id} className="rounded-lg bg-slate-50 p-3">
              <p className="text-sm text-slate-700">{note.text}</p>
              <p className="mt-1 text-xs text-slate-400">{formatDate(note.createdAt)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            placeholder="Add a note about this lead"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <Button onClick={handleAddNote} disabled={savingNote || !noteText.trim()}>
            {savingNote ? <Loader2 size={16} className="animate-spin" /> : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
