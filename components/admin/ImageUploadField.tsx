"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import Image from "next/image";

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (response.ok) {
      const { url } = await response.json();
      onChange(url);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
            <Image src={value} alt="" fill className="object-cover" unoptimized />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-400">
            <UploadCloud size={20} />
          </div>
        )}
        <label className="cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : value ? "Replace" : "Upload"}
          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      <p className="mt-1.5 text-xs text-slate-400">Leave empty to use the default icon tile.</p>
    </div>
  );
}
