import { Badge } from "@/components/ui/Badge";
import type { LeadStatus } from "@/lib/types";

const STATUS_TONE: Record<LeadStatus, "slate" | "brand" | "amber" | "gold" | "green" | "red"> = {
  new: "brand",
  contacted: "amber",
  followup: "gold",
  interested: "green",
  converted: "green",
  closed: "red",
};

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  followup: "Follow-up",
  interested: "Interested",
  converted: "Converted",
  closed: "Closed",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>;
}
