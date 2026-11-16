import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  requiredMark?: string;
  children: ReactNode;
};

const control =
  "block w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted transition-colors duration-200 hover:border-ink/40 focus-visible:border-ink aria-[invalid=true]:border-danger";

export function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

function FieldShell({ id, label, hint, error, required, requiredMark, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium">
        {label}
        {required && requiredMark && (
          <span aria-hidden="true" className="ml-1 text-accent-ink">
            {requiredMark}
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type SharedProps = Omit<FieldShellProps, "children">;

export function Input({
  id,
  label,
  hint,
  error,
  required,
  requiredMark,
  className,
  ...rest
}: SharedProps & ComponentPropsWithoutRef<"input">) {
  return (
    <FieldShell {...{ id, label, hint, error, required, requiredMark }}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(control, "min-h-12 border-line", className)}
        {...rest}
      />
    </FieldShell>
  );
}

export function Textarea({
  id,
  label,
  hint,
  error,
  required,
  requiredMark,
  className,
  ...rest
}: SharedProps & ComponentPropsWithoutRef<"textarea">) {
  return (
    <FieldShell {...{ id, label, hint, error, required, requiredMark }}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(control, "min-h-40 resize-y border-line", className)}
        {...rest}
      />
    </FieldShell>
  );
}

export function Select({
  id,
  label,
  hint,
  error,
  required,
  requiredMark,
  className,
  selectRef,
  children,
  ...rest
}: SharedProps & ComponentPropsWithoutRef<"select"> & { selectRef?: Ref<HTMLSelectElement> }) {
  return (
    <FieldShell {...{ id, label, hint, error, required, requiredMark }}>
      <select
        id={id}
        ref={selectRef}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          control,
          "min-h-12 appearance-none border-line bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12",
          "bg-[image:var(--select-chevron)]",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  );
}
