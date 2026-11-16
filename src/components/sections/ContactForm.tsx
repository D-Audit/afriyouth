"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { contactPage, roles } from "@/content/contact";
import { programs } from "@/content/programs";
import { contactSchema, type ContactField } from "@/lib/contact-schema";

type Errors = Partial<Record<ContactField, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const form = contactPage.form;
const fieldOrder: ContactField[] = ["role", "name", "email", "organization", "message"];

export function ContactForm({
  fallbackEmail,
}: {
  fallbackEmail: { display: string; href: string };
}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // Program links identify the audience and add a useful starting point to the message.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");
    const select = roleRef.current;
    if (select && !select.value && roles.some((option) => option.value === role)) {
      select.value = role as string;
    }

    const slug = params.get("program");
    const program = programs.find((item) => item.slug === slug);
    if (program) setMessage(`I have a question about ${program.name}.`);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") summaryRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as ContactField;
        next[field] ??= issue.message;
      }
      setErrors(next);
      const first = fieldOrder.find((field) => next[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card-lg border border-line bg-white p-8 shadow-soft sm:p-10"
      >
        <h2
          ref={successRef}
          tabIndex={-1}
          className="font-display text-h2 text-ink focus:outline-none"
        >
          {form.success.heading}
        </h2>
        <p className="mt-4 text-lead text-ink">{form.success.body}</p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
          {form.success.again}
        </Button>
      </div>
    );
  }

  const fieldIds = (name: ContactField) => `${id}-${name}`;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-6"
      aria-describedby={`${id}-required`}
    >
      <div>
        <h2 className="font-display text-h2">{form.heading}</h2>
        <p id={`${id}-required`} className="mt-2 text-sm text-muted">
          {form.requiredNote}
        </p>
      </div>

      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {hasErrors && (
          <p className="rounded-2xl bg-danger-tint px-4 py-3 font-medium text-danger">
            {form.errorSummary}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-2xl bg-danger-tint px-4 py-3 font-medium text-danger">
            {form.failure}{" "}
            <a href={fallbackEmail.href} className="underline underline-offset-4">
              {fallbackEmail.display}
            </a>
          </p>
        )}
      </div>

      <Select
        id={fieldIds("role")}
        selectRef={roleRef}
        name="role"
        label={form.fields.role.label}
        required
        requiredMark={form.required}
        error={errors.role}
        defaultValue=""
      >
        <option value="" disabled>
          {form.fields.role.placeholder}
        </option>
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </Select>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id={fieldIds("name")}
          name="name"
          label={form.fields.name.label}
          autoComplete={form.fields.name.autoComplete}
          required
          requiredMark={form.required}
          error={errors.name}
        />
        <Input
          id={fieldIds("email")}
          name="email"
          type="email"
          inputMode="email"
          label={form.fields.email.label}
          autoComplete={form.fields.email.autoComplete}
          required
          requiredMark={form.required}
          error={errors.email}
        />
      </div>

      <Input
        id={fieldIds("organization")}
        name="organization"
        label={form.fields.organization.label}
        hint={form.fields.organization.hint}
        autoComplete={form.fields.organization.autoComplete}
        error={errors.organization}
      />

      <Textarea
        id={fieldIds("message")}
        name="message"
        label={form.fields.message.label}
        hint={form.fields.message.hint}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        requiredMark={form.required}
        maxLength={2000}
        error={errors.message}
      />

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={`${id}-website`}>{form.fields.honeypot.label}</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" icon="arrow" disabled={status === "submitting"}>
        {status === "submitting" ? form.submitting : form.submit}
      </Button>
    </form>
  );
}
