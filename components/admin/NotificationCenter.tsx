"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Bell, Calendar, User, Phone, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ReminderItem {
  id: string;
  fullName: string;
  mobile: string;
  city: string;
  interestedModel: string;
  status: string;
  followUpDate: string;
  assignedTo: string | null;
  assignedName: string;
  isDueToday: boolean;
  isOverdue: boolean;
  latestNote: string | null;
}

export function NotificationCenter() {
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);

  function fetchReminders() {
    fetch("/api/admin/reminders")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setReminders(data.reminders || []);
          setDueTodayCount(data.dueTodayCount || 0);
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchReminders();
    const interval = setInterval(fetchReminders, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 focus:outline-none"
        aria-label="Follow-up Notifications"
      >
        <Bell size={19} />
        {dueTodayCount > 0 ? (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
            {dueTodayCount > 9 ? "9+" : dueTodayCount}
          </span>
        ) : reminders.length > 0 ? (
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-brand-950">Follow-up Reminders</h3>
              <p className="text-xs text-slate-500">Assigned follow-up notifications & tasks</p>
            </div>
            {dueTodayCount > 0 ? (
              <Badge tone="red">{dueTodayCount} Due Today</Badge>
            ) : (
              <Badge tone="slate">{reminders.length} Scheduled</Badge>
            )}
          </div>

          <div className="mt-3 max-h-80 space-y-2.5 overflow-y-auto pr-1">
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading reminders...</div>
            ) : reminders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400">
                <CheckCircle2 size={32} className="text-emerald-500/80 mb-2" />
                <p className="text-sm font-medium text-slate-700">All caught up!</p>
                <p className="text-xs text-slate-400 mt-0.5">No pending follow-up reminders.</p>
              </div>
            ) : (
              reminders.map((item) => (
                <div
                  key={item.id}
                  className={`group rounded-xl border p-3 text-xs transition-colors ${
                    item.isOverdue
                      ? "border-rose-200 bg-rose-50/50 hover:bg-rose-50"
                      : item.isDueToday
                      ? "border-amber-200 bg-amber-50/50 hover:bg-amber-50"
                      : "border-slate-100 bg-slate-50/50 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-brand-950 text-sm">{item.fullName}</h4>
                      <div className="mt-1 flex items-center gap-2 text-slate-500">
                        <span className="flex items-center gap-1">
                          <Phone size={11} /> {item.mobile}
                        </span>
                        <span>•</span>
                        <span>{item.city}</span>
                      </div>
                    </div>
                    {item.isOverdue ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                        <AlertCircle size={10} /> Overdue
                      </span>
                    ) : item.isDueToday ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        Due Today
                      </span>
                    ) : (
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                        {item.followUpDate}
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 text-brand-800 font-medium">
                      <User size={12} /> {item.assignedName}
                    </span>
                    <Link
                      href={`/admin/leads/${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
                    >
                      View & Follow-up <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 border-t border-slate-100 pt-2.5 text-center">
            <Link
              href="/admin/leads"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-brand-700 hover:underline"
            >
              View All Leads & Calendar
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
