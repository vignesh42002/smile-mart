"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics-client";
import type { AnalyticsEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TrackedLink({
  href,
  event,
  meta,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  meta?: Record<string, string | number>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} onClick={() => track(event, meta)} className={cn(className)}>
      {children}
    </Link>
  );
}
