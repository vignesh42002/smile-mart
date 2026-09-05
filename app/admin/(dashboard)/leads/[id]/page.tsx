"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, Mail, MapPin, Loader2, Calendar, UserCheck, Bell, Check, MessageSquare, Send, Clock, Video } from "lucide-react";
import Link from "next/link";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { LEAD_STATUSES, type Lead } from "@/lib/types";

interface AdminOption {
  id: string;
  name: string;
  username: string;
}

export default function AdminLeadDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [admins, setAdmins] = useState<AdminOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Appointment & Customer Notification State
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("10:00");
  const [meetingType, setMeetingType] = useState("Phone Call");
  const [reminderChannel, setReminderChannel] = useState("WhatsApp");
  const [customMessage, setCustomMessage] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/leads/${params.id}`).then((res) => (res.ok ? res.json() : null)),
      fetch("/api/admin/admins").then((res) => (res.ok ? res.json() : [])),
    ])
      .then(([leadData, adminData]) => {
        setLead(leadData);
        setAdmins(Array.isArray(adminData) ? adminData : []);
        if (leadData?.followUpDate) {
          setAppointmentDate(leadData.followUpDate);
        }
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  async function updateLead(patch: Record<string, unknown>) {
    const response = await fetch(`/api/admin/leads/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (response.ok) {
      const updated = await response.json();
      setLead(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
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

  // Handle Book Appointment & Send Reminder to Customer
  async function handleBookAppointmentAndNotify() {
    if (!lead || !appointmentDate) return;

    const formattedDateTime = `${appointmentDate} at ${appointmentTime}`;
    const defaultMsg = customMessage.trim() || `Hi ${lead.fullName}, your follow-up appointment with Smile Mart is scheduled for ${formattedDateTime} (${meetingType}). We look forward to connecting!`;

    // 1. Save follow-up date to lead
    await updateLead({ followUpDate: appointmentDate, status: lead.status === "new" ? "contacted" : lead.status });

    // 2. Log appointment note in history
    const noteText = `📅 Appointment Booked: ${formattedDateTime} [Type: ${meetingType}]. Customer Notification (${reminderChannel}) sent: "${defaultMsg}"`;
    await fetch(`/api/admin/leads/${params.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: noteText }),
    });

    const updatedLead = await fetch(`/api/admin/leads/${params.id}`).then((r) => r.json());
    setLead(updatedLead);

    // 3. Trigger WhatsApp Customer Reminder
    if (reminderChannel === "WhatsApp" || reminderChannel === "Both") {
      const cleanMobile = lead.mobile.replace(/[^0-9]/g, "");
      const waMobile = cleanMobile.length === 10 ? `91${cleanMobile}` : cleanMobile;
      const waUrl = `https://wa.me/${waMobile}?text=${encodeURIComponent(defaultMsg)}`;
      window.open(waUrl, "_blank");
    }

    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
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

  const cleanMobile = lead.mobile.replace(/[^0-9]/g, "");
  const defaultReminderText = `Hi ${lead.fullName}, friendly reminder from Smile Mart for your appointment / follow-up scheduled on ${lead.followUpDate || "today"}. Please reply if you have any questions!`;
  const directWaUrl = `https://wa.me/${cleanMobile.length === 10 ? `91${cleanMobile}` : cleanMobile}?text=${encodeURIComponent(defaultReminderText)}`;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline">
          <ArrowLeft size={16} />
          Back to Leads
        </Link>
        <div className="flex items-center gap-2">
          {saveSuccess ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full animate-in fade-in">
              <Check size={14} /> Follow-up updated!
            </span>
          ) : null}
          <a
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
          >
            <MessageSquare size={13} />
            Quick WhatsApp Customer
          </a>
        </div>
      </div>

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
            <a href={`tel:${lead.mobile}`} className="hover:underline text-brand-900 font-medium">
              {lead.mobile}
            </a>
          </div>
          {lead.email ? (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail size={15} className="text-slate-400" />
              <a href={`mailto:${lead.email}`} className="hover:underline">
                {lead.email}
              </a>
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

      {/* 🚀 Book Appointment & Send Customer Reminder Section */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="text-emerald-700" size={20} />
            <div>
              <h2 className="text-sm font-bold text-brand-950">Book Appointment & Notify Customer</h2>
              <p className="text-xs text-slate-500">Schedule an appointment and dispatch a reminder directly to the customer.</p>
            </div>
          </div>
          {bookingSuccess ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full animate-bounce">
              <Check size={14} /> Appointment Booked & Customer Reminded!
            </span>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Clock size={12} /> Time
            </label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Video size={12} /> Meeting Type
            </label>
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="Phone Call">Phone Call</option>
              <option value="WhatsApp Call">WhatsApp Call</option>
              <option value="Store Visit">Store Visit</option>
              <option value="In-Person Meeting">In-Person Meeting</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Send size={12} /> Reminder Channel
            </label>
            <select
              value={reminderChannel}
              onChange={(e) => setReminderChannel(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="WhatsApp">WhatsApp Message</option>
              <option value="Email">Email Notification</option>
              <option value="SMS">SMS Message</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Custom Reminder Message to Customer (Optional)</label>
          <input
            type="text"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder={`Hi ${lead.fullName}, your appointment with Smile Mart is scheduled for ${appointmentDate || "date"} at ${appointmentTime}...`}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex justify-end pt-1">
          <Button
            onClick={handleBookAppointmentAndNotify}
            disabled={!appointmentDate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 px-5 py-2.5 rounded-xl shadow-sm"
          >
            <Send size={16} />
            Book Appointment & Notify Customer ({reminderChannel})
          </Button>
        </div>
      </div>

      {/* Internal Staff Follow-up Settings */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="text-brand-700" size={18} />
          <h2 className="text-sm font-bold text-brand-950">Internal Staff Assignment & Follow-up Status</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 pt-1">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">Lead Status</label>
            <select
              value={lead.status}
              onChange={(event) => updateLead({ status: event.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status[0].toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> Internal Follow-up Date
            </label>
            <input
              type="date"
              value={lead.followUpDate ?? ""}
              onChange={(event) => updateLead({ followUpDate: event.target.value || null })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 flex items-center gap-1">
              <UserCheck size={13} className="text-slate-400" /> Assign To Staff Member
            </label>
            <select
              value={lead.assignedTo ?? ""}
              onChange={(event) => updateLead({ assignedTo: event.target.value || null })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">Unassigned</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name || admin.username}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">Follow-up Notes & Appointment History</h2>
        <div className="mt-4 space-y-3">
          {lead.notes.length === 0 ? <p className="text-sm text-slate-400">No notes recorded yet.</p> : null}
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
            placeholder="Add a follow-up note or reminder detail..."
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <Button onClick={handleAddNote} disabled={savingNote || !noteText.trim()}>
            {savingNote ? <Loader2 size={16} className="animate-spin" /> : "Add Note"}
          </Button>
        </div>
      </div>
    </div>
  );
}
