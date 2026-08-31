"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Testimonial } from "@/lib/types";

const EMPTY_FORM = {
  name: "",
  designation: "",
  location: "",
  testimonial: "",
  photo: "",
  rating: 5,
  published: false,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function loadTestimonials() {
    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(loadTestimonials, []);

  function startEdit(testimonial: Testimonial) {
    setEditingId(testimonial.id);
    setForm({
      name: testimonial.name,
      designation: testimonial.designation,
      location: testimonial.location,
      testimonial: testimonial.testimonial,
      photo: testimonial.photo,
      rating: testimonial.rating,
      published: testimonial.published,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      resetForm();
      loadTestimonials();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    loadTestimonials();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Testimonials</h1>
        <p className="mt-1 text-sm text-slate-500">Only add genuine, approved testimonials. Never create fake reviews.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Name" required value={form.name} onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))} />
          <Input label="Designation" value={form.designation} onChange={(event) => setForm((f) => ({ ...f, designation: event.target.value }))} />
          <Input label="Location" value={form.location} onChange={(event) => setForm((f) => ({ ...f, location: event.target.value }))} />
        </div>
        <Textarea
          label="Testimonial"
          required
          value={form.testimonial}
          onChange={(event) => setForm((f) => ({ ...f, testimonial: event.target.value }))}
        />
        <ImageUploadField label="Photo" value={form.photo} onChange={(url) => setForm((f) => ({ ...f, photo: url }))} />
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" onClick={() => setForm((f) => ({ ...f, rating: value }))}>
                  <Star size={20} className={value <= form.rating ? "fill-gold-500 text-gold-500" : "text-slate-300"} />
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-slate-700">
            <input type="checkbox" checked={form.published} onChange={(event) => setForm((f) => ({ ...f, published: event.target.checked }))} />
            Published (visible on website)
          </label>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : editingId ? "Save Changes" : <><Plus size={16} /> Add Testimonial</>}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-brand-950">{testimonial.name}</h3>
                <p className="text-xs text-slate-500">{[testimonial.designation, testimonial.location].filter(Boolean).join(" · ")}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(testimonial)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(testimonial.id)} className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{testimonial.testimonial}</p>
            <Badge tone={testimonial.published ? "green" : "slate"} className="mt-3">
              {testimonial.published ? "Published" : "Draft"}
            </Badge>
          </div>
        ))}
        {!loading && testimonials.length === 0 ? <p className="text-sm text-slate-400">No testimonials yet.</p> : null}
      </div>
    </div>
  );
}
