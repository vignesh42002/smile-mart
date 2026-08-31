"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Smile, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.message ?? "Login failed.");
      setLoading(false);
      return;
    }

    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-brand-950 px-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-white">
            <Smile size={24} />
          </span>
          <h1 className="mt-4 text-lg font-bold text-brand-950">Smile Mart Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input label="Username" name="username" required autoComplete="username" />
          <Input label="Password" name="password" type="password" required autoComplete="current-password" />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
