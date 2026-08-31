"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { Product, ProductCategory } from "@/lib/types";

const EMPTY_FORM = {
  name: "",
  categoryId: "",
  description: "",
  image: "",
  published: true,
  featured: false,
  displayOrder: 0,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function loadData() {
    Promise.all([
      fetch("/api/admin/products").then((res) => res.json()),
      fetch("/api/admin/categories").then((res) => res.json()),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadData, []);

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      categoryId: product.categoryId,
      description: product.description,
      image: product.image,
      published: product.published,
      featured: product.featured,
      displayOrder: product.displayOrder,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
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
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadData();
  }

  const categoryName = (id: string) => categories.find((category) => category.id === id)?.name ?? "—";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Products</h1>
        <p className="mt-1 text-sm text-slate-500">Manage individual items shown within each category page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-brand-950">{editingId ? "Edit Product" : "Add New Product"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" required value={form.name} onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))} />
          <Select
            label="Category"
            required
            value={form.categoryId}
            onChange={(event) => setForm((f) => ({ ...f, categoryId: event.target.value }))}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <Textarea label="Description" value={form.description} onChange={(event) => setForm((f) => ({ ...f, description: event.target.value }))} />
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
          <Button type="submit" disabled={saving || !form.categoryId}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : editingId ? "Save Changes" : <><Plus size={16} /> Add Product</>}
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
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-brand-900">{product.name}</td>
                <td className="px-5 py-3 text-slate-500">{categoryName(product.categoryId)}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1.5">
                    <Badge tone={product.published ? "green" : "slate"}>{product.published ? "Published" : "Draft"}</Badge>
                    {product.featured ? <Badge tone="gold">Featured</Badge> : null}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(product)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-400">
                  No products yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
