"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (response.ok) {
      setSettings(await response.json());
      setSaved(true);
    }
    setSaving(false);
  }

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Contact details, WhatsApp number and legal wording shown across the website. To manage the Business Network
          section, see <Link href="/admin/business-network" className="text-brand-700 hover:underline">Business Network</Link>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-950">Contact Details</h2>
          <Input
            label="Business Address"
            value={settings.contact.address}
            onChange={(event) => setSettings({ ...settings, contact: { ...settings.contact, address: event.target.value } })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Phone Number"
              value={settings.contact.phone}
              onChange={(event) => setSettings({ ...settings, contact: { ...settings.contact, phone: event.target.value } })}
            />
            <Input
              label="Email Address"
              type="email"
              value={settings.contact.email}
              onChange={(event) => setSettings({ ...settings, contact: { ...settings.contact, email: event.target.value } })}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-950">WhatsApp</h2>
          <Input
            label="WhatsApp Number (digits only, with country code — e.g. 91XXXXXXXXXX)"
            value={settings.contact.whatsappNumber}
            onChange={(event) => setSettings({ ...settings, contact: { ...settings.contact, whatsappNumber: event.target.value } })}
          />
          <Textarea
            label="Pre-filled WhatsApp Message"
            value={settings.whatsappMessage}
            onChange={(event) => setSettings({ ...settings, whatsappMessage: event.target.value })}
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-950">Social Links</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Instagram URL"
              value={settings.social.instagram}
              onChange={(event) => setSettings({ ...settings, social: { ...settings.social, instagram: event.target.value } })}
            />
            <Input
              label="Facebook URL"
              value={settings.social.facebook}
              onChange={(event) => setSettings({ ...settings, social: { ...settings.social, facebook: event.target.value } })}
            />
            <Input
              label="YouTube URL"
              value={settings.social.youtube}
              onChange={(event) => setSettings({ ...settings, social: { ...settings.social, youtube: event.target.value } })}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-950">Legal Disclaimer</h2>
          <Textarea
            label="Disclaimer text shown in the footer and near business-model pricing"
            value={settings.legalDisclaimer}
            onChange={(event) => setSettings({ ...settings, legalDisclaimer: event.target.value })}
            className="min-h-40"
          />
          <p className="text-xs text-slate-400">Final wording must be reviewed and approved by Smile Mart&apos;s legal/advisory team (doc §19).</p>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-950">SEO Defaults</h2>
          <Input
            label="Default Page Title"
            value={settings.seo.defaultTitle}
            onChange={(event) => setSettings({ ...settings, seo: { ...settings.seo, defaultTitle: event.target.value } })}
          />
          <Textarea
            label="Default Meta Description"
            value={settings.seo.defaultDescription}
            onChange={(event) => setSettings({ ...settings, seo: { ...settings.seo, defaultDescription: event.target.value } })}
          />
        </section>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : "Save Settings"}
          </Button>
          {saved ? (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600">
              <CheckCircle2 size={16} /> Saved
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
