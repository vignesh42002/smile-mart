"use client";

import { useEffect, useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { formatInr } from "@/lib/utils";
import type { BusinessModel } from "@/lib/types";

const EMPTY_FORM = {
  slug: "basic" as "basic" | "standard" | "premium",
  name: "",
  investmentAmount: 0,
  tagline: "",
  description: "",
  features: "",
  benefits: "",
  image: "",
  ctaLabel: "Apply Now",
  published: true,
  displayOrder: 0,
};

export default function AdminBusinessModelsPage() {
  const [models, setModels] = useState<BusinessModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function loadModels() {
    fetch("/api/admin/business-models")
      .then((res) => res.json())
      .then((data) => setModels(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(loadModels, []);

  function startEdit(model: BusinessModel) {
    setEditingId(model.id);
    setForm({
      slug: model.slug,
      name: model.name,
      investmentAmount: model.investmentAmount,
      tagline: model.tagline,
      description: model.description,
      features: model.features.join("\n"),
      benefits: model.benefits.join("\n"),
      image: model.image,
      ctaLabel: model.ctaLabel,
      published: model.published,
      displayOrder: model.displayOrder,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      features: form.features.split("\n").map((line) => line.trim()).filter(Boolean),
      benefits: form.benefits.split("\n").map((line) => line.trim()).filter(Boolean),
    };
    const url = editingId ? `/api/admin/business-models/${editingId}` : "/api/admin/business-models";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      resetForm();
      loadModels();
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Business Models</h1>
        <p className="mt-1 text-sm text-slate-500">Edit the Basic, Standard and Premium business models — no code changes required.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">{editingId ? "Edit Business Model" : "Add Business Model"}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Select
            label="Model"
            required
            value={form.slug}
            onChange={(event) => setForm((f) => ({ ...f, slug: event.target.value as typeof f.slug }))}
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </Select>
          <Input label="Name" required value={form.name} onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))} />
          <Input
            label="Investment Amount (₹)"
            type="number"
            required
            value={form.investmentAmount}
            onChange={(event) => setForm((f) => ({ ...f, investmentAmount: Number(event.target.value) }))}
          />
        </div>
        <Input label="Tagline" value={form.tagline} onChange={(event) => setForm((f) => ({ ...f, tagline: event.target.value }))} />
        <Textarea label="Description" value={form.description} onChange={(event) => setForm((f) => ({ ...f, description: event.target.value }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea
            label="Features (one per line)"
            value={form.features}
            onChange={(event) => setForm((f) => ({ ...f, features: event.target.value }))}
          />
          <Textarea
            label="Benefits (one per line)"
            value={form.benefits}
            onChange={(event) => setForm((f) => ({ ...f, benefits: event.target.value }))}
          />
        </div>
        <ImageUploadField label="Image" value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
        <div className="flex flex-wrap gap-6">
          <Input label="CTA Label" value={form.ctaLabel} onChange={(event) => setForm((f) => ({ ...f, ctaLabel: event.target.value }))} />
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
            {saving ? <Loader2 size={16} className="animate-spin" /> : editingId ? "Save Changes" : "Add Model"}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-3">
        {models.map((model) => (
          <div key={model.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-brand-950">{model.name}</h3>
              <button onClick={() => startEdit(model)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                <Pencil size={14} />
              </button>
            </div>
            <p className="mt-1 text-lg font-bold text-brand-900">{formatInr(model.investmentAmount)}</p>
            <Badge tone={model.published ? "green" : "slate"} className="mt-2">
              {model.published ? "Published" : "Draft"}
            </Badge>
          </div>
        ))}
        {!loading && models.length === 0 ? <p className="text-sm text-slate-400">No business models yet.</p> : null}
      </div>
    </div>
  );
}
