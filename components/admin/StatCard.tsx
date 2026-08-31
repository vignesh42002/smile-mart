import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: LucideIcon }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-bold text-brand-950">{value}</p>
        <p className="text-xs font-medium text-slate-500">{label}</p>
      </div>
    </Card>
  );
}
