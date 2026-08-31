import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-50 disabled:text-slate-400";

function Wrapper({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-rose-500"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };
export function Input({ label, error, required, className, ...rest }: InputProps) {
  return (
    <Wrapper label={label} required={required} error={error}>
      <input
        {...rest}
        required={required}
        className={cn(fieldClasses, error ? "border-rose-400" : undefined, className)}
      />
    </Wrapper>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string };
export function Textarea({ label, error, required, className, ...rest }: TextareaProps) {
  return (
    <Wrapper label={label} required={required} error={error}>
      <textarea
        {...rest}
        required={required}
        className={cn(fieldClasses, "min-h-28 resize-y", error ? "border-rose-400" : undefined, className)}
      />
    </Wrapper>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string };
export function Select({ label, error, required, className, children, ...rest }: SelectProps) {
  return (
    <Wrapper label={label} required={required} error={error}>
      <select
        {...rest}
        required={required}
        className={cn(fieldClasses, error ? "border-rose-400" : undefined, className)}
      >
        {children}
      </select>
    </Wrapper>
  );
}
