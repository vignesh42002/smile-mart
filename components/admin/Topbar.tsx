"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { NotificationCenter } from "@/components/admin/NotificationCenter";

export function Topbar({ username }: { username: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-800">
          <User size={16} />
        </div>
        <p className="text-sm text-slate-600">
          Signed in as <span className="font-semibold text-brand-950">{username}</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <NotificationCenter />
        <div className="h-4 w-px bg-slate-200" />
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-rose-600 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </header>
  );
}
