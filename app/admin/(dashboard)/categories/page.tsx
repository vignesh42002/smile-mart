"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { slugify } from "@/lib/utils";
import type { ProductCategory } from "@/lib/types";

const EMPTY_FORM = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  image: "",
  published: true,
  featured: false,
  displayOrder: 0,
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function loadCategories() {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(loadCategories, []);

  function startEdit(category: ProductCategory) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      shortDescription: category.shortDescription,
      description: category.description,
      image: category.image,
      published: category.published,
      featured: category.featured,
      displayOrder: category.displayOrder,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      resetForm();
      loadCategories();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? This cannot be undone.")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    loadCategories();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Categories</h1>
        <p className="mt-1 text-sm text-slate-500">Manage the product categories shown across the website.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">{editingId ? "Edit Category" : "Add New Category"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Name"
            required
            value={form.name}
            onChange={(event) => {
              const name = event.target.value;
              setForm((f) => ({ ...f, name, slug: editingId ? f.slug : slugify(name) }));
            }}
          />
          <Input label="Slug" required value={form.slug} onChange={(event) => setForm((f) => ({ ...f, slug: event.target.value }))} />
        </div>
        <Input
          label="Short Description"
          required
          value={form.shortDescription}
          onChange={(event) => setForm((f) => ({ ...f, shortDescription: event.target.value }))}
        />
        <Textarea
          label="Full Description"
          value={form.description}
          onChange={(event) => setForm((f) => ({ ...f, description: event.target.value }))}
        />
        <ImageUploadField label="Image" value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
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
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-slate-700">
            <input type="checkbox" checked={form.featured} onChange={(event) => setForm((f) => ({ ...f, featured: event.target.checked }))} />
            Featured
          </label>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : editingId ? "Save Changes" : <><Plus size={16} /> Add Category</>}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Slug</th>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .slice()
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((category) => (
                <tr key={category.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-brand-900">{category.name}</td>
                  <td className="px-5 py-3 text-slate-500">{category.slug}</td>
                  <td className="px-5 py-3 text-slate-500">{category.displayOrder}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <Badge tone={category.published ? "green" : "slate"}>{category.published ? "Published" : "Draft"}</Badge>
                      {category.featured ? <Badge tone="gold">Featured</Badge> : null}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(category)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!loading && categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                  No categories yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
