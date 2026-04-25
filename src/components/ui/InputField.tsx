import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  hint?: string;
};

export function InputField({ label, id, hint, className = "", ...props }: InputFieldProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-sm font-medium text-[var(--ink-800)]">
      {label}
      <input
        id={id}
        className={`h-11 rounded-xl border border-[var(--sand-300)] bg-[var(--sand-50)] px-3 text-sm text-[var(--ink-900)] outline-none transition placeholder:text-[var(--ink-500)] focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] ${className}`}
        {...props}
      />
      {hint ? <span className="text-xs font-normal text-[var(--ink-500)]">{hint}</span> : null}
    </label>
  );
}
