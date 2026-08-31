"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Faq } from "@/lib/types";

const EMPTY_FORM = { question: "", answer: "", displayOrder: 0, published: true };

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function loadFaqs() {
    fetch("/api/admin/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(loadFaqs, []);

  function startEdit(faq: Faq) {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, displayOrder: faq.displayOrder, published: faq.published });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/admin/faqs/${editingId}` : "/api/admin/faqs";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      resetForm();
      loadFaqs();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    loadFaqs();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">FAQs</h1>
        <p className="mt-1 text-sm text-slate-500">Answers must reflect only officially approved information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">{editingId ? "Edit FAQ" : "Add New FAQ"}</h2>
        <Input label="Question" required value={form.question} onChange={(event) => setForm((f) => ({ ...f, question: event.target.value }))} />
        <Textarea label="Answer" required value={form.answer} onChange={(event) => setForm((f) => ({ ...f, answer: event.target.value }))} />
        <div className="flex flex-wrap gap-6">
          <Input
            label="Display Order"
            type="number"
            value={form.displayOrder}
            onChange={(event) => setForm((f) => ({ ...f, displayOrder: Number(event.target.value) }))}
            className="max-w-[140px]"
          />
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-slate-700">
            <input type="checkbox" checked={form.published} onChange={(event) => setForm((f) => ({ ...f, published: event.target.checked }))} />
            Published
          </label>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : editingId ? "Save Changes" : <><Plus size={16} /> Add FAQ</>}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="space-y-3">
        {faqs
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((faq) => (
            <div key={faq.id} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-brand-950">{faq.question}</h3>
                  <Badge tone={faq.published ? "green" : "slate"}>{faq.published ? "Published" : "Draft"}</Badge>
                </div>
                <p className="mt-1.5 text-sm text-slate-600">{faq.answer}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => startEdit(faq)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(faq.id)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        {!loading && faqs.length === 0 ? <p className="text-sm text-slate-400">No FAQs yet.</p> : null}
      </div>
    </div>
  );
}
