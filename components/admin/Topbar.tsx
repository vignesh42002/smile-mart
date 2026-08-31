"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function Topbar({ username }: { username: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
      <p className="text-sm text-slate-500">
        Signed in as <span className="font-semibold text-brand-900">{username}</span>
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </header>
  );
}
