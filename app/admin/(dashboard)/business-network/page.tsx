"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { BusinessNetworkEntry, SiteSettings } from "@/lib/types";

const EMPTY_FORM = { name: "", description: "", logo: "", displayOrder: 0 };

export default function AdminBusinessNetworkPage() {
  const [entries, setEntries] = useState<BusinessNetworkEntry[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [togglingPublish, setTogglingPublish] = useState(false);

  function loadData() {
    Promise.all([
      fetch("/api/admin/business-network").then((res) => res.json()),
      fetch("/api/admin/settings").then((res) => res.json()),
    ])
      .then(([entriesData, settingsData]) => {
        setEntries(Array.isArray(entriesData) ? entriesData : []);
        setSettings(settingsData);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadData, []);

  async function togglePublished() {
    if (!settings) return;
    setTogglingPublish(true);
    const nextSettings = { ...settings, businessNetworkPublished: !settings.businessNetworkPublished };
    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextSettings),
    });
    if (response.ok) setSettings(await response.json());
    setTogglingPublish(false);
  }

  function startEdit(entry: BusinessNetworkEntry) {
    setEditingId(entry.id);
    setForm({ name: entry.name, description: entry.description, logo: entry.logo, displayOrder: entry.displayOrder });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/admin/business-network/${editingId}` : "/api/admin/business-network";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      resetForm();
      loadData();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this entry from the business network?")) return;
    await fetch(`/api/admin/business-network/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Business Network</h1>
        <p className="mt-1 text-sm text-slate-500">
          Only publish this section once every listed business relationship has been officially verified (doc §5.9).
        </p>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div>
          <p className="text-sm font-semibold text-amber-900">Show Business Network section on website</p>
          <p className="mt-1 text-xs text-amber-800">Currently {settings?.businessNetworkPublished ? "visible" : "hidden"} on the homepage.</p>
        </div>
        <Button variant={settings?.businessNetworkPublished ? "secondary" : "primary"} onClick={togglePublished} disabled={!settings || togglingPublish}>
          {togglingPublish ? <Loader2 size={16} className="animate-spin" /> : settings?.businessNetworkPublished ? "Hide Section" : "Publish Section"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">{editingId ? "Edit Entry" : "Add Network Entry"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Business Name" required value={form.name} onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))} />
          <Input
            label="Display Order"
            type="number"
            value={form.displayOrder}
            onChange={(event) => setForm((f) => ({ ...f, displayOrder: Number(event.target.value) }))}
          />
        </div>
        <Textarea label="Description (optional)" value={form.description} onChange={(event) => setForm((f) => ({ ...f, description: event.target.value }))} />
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : editingId ? "Save Changes" : <><Plus size={16} /> Add Entry</>}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((entry) => (
            <div key={entry.id} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-brand-950">{entry.name}</p>
                {entry.description ? <p className="mt-1 text-xs text-slate-500">{entry.description}</p> : null}
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => startEdit(entry)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(entry.id)} className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        {!loading && entries.length === 0 ? <p className="text-sm text-slate-400">No entries yet.</p> : null}
      </div>
    </div>
  );
}
