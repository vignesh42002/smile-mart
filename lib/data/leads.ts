import { randomUUID } from "crypto";
import { readCollection, mutateCollection } from "./store";
import type { Lead, LeadInput, LeadStatus } from "@/lib/types";

const FILE = "leads.json";

export function getLeads(): Promise<Lead[]> {
  return readCollection<Lead>(FILE);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const leads = await getLeads();
  return leads.find((lead) => lead.id === id) ?? null;
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: randomUUID(),
    fullName: input.fullName,
    mobile: input.mobile,
    email: input.email,
    city: input.city,
    interestedModel: input.interestedModel,
    source: input.source,
    message: input.message,
    status: "new",
    notes: [],
    followUpDate: null,
    assignedTo: null,
    createdAt: now,
    updatedAt: now,
  };
  await mutateCollection<Lead>(FILE, (leads) => [lead, ...leads]);
  return lead;
}

interface LeadUpdate {
  status?: LeadStatus;
  followUpDate?: string | null;
  assignedTo?: string | null;
}

export async function updateLead(id: string, patch: LeadUpdate): Promise<Lead | null> {
  let updated: Lead | null = null;
  await mutateCollection<Lead>(FILE, (leads) =>
    leads.map((lead) => {
      if (lead.id !== id) return lead;
      updated = { ...lead, ...patch, updatedAt: new Date().toISOString() };
      return updated;
    })
  );
  return updated;
}

export async function addLeadNote(id: string, text: string): Promise<Lead | null> {
  let updated: Lead | null = null;
  await mutateCollection<Lead>(FILE, (leads) =>
    leads.map((lead) => {
      if (lead.id !== id) return lead;
      updated = {
        ...lead,
        notes: [...lead.notes, { id: randomUUID(), text, createdAt: new Date().toISOString() }],
        updatedAt: new Date().toISOString(),
      };
      return updated;
    })
  );
  return updated;
}
