import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className || undefined
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-gold-300" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-balance text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-brand-950"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-white/80" : "text-slate-600")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
