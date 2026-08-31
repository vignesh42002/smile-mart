import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-dvh bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar username={session.username} />
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
