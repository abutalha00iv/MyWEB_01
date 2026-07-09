"use client";

import { useState, type FormEvent } from "react";
import {
  budgetRanges,
  contactSchema,
  serviceOptions,
  timelines,
} from "@/lib/validation/contact";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";

type FieldErrors = Partial<Record<keyof typeof initialValues, string>>;

const initialValues = {
  name: "",
  email: "",
  company: "",
  service: "" as string,
  budget: "" as string,
  timeline: "" as string,
  description: "",
  website: "",
};

const inputClasses =
  "mt-1.5 w-full rounded-sm border border-ink/20 bg-ivory px-3.5 py-2.5 text-[15px] text-ink transition-colors duration-200 placeholder:text-ink/35 focus:border-plum focus-visible:outline-2 focus-visible:outline-plum";

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof typeof initialValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof initialValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-plum/30 bg-warmgray p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-plum/40">
          <CheckIcon className="h-5 w-5 text-plum" />
        </div>
        <h2 className="mt-5 font-display text-2xl text-ink">Message received.</h2>
        <p className="measure mx-auto mt-3 text-[15px] leading-relaxed text-ink/65">
          Thank you — we&rsquo;ve received your project brief and will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot — hidden from sighted and AT users, left empty by humans */}
      <div className="h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name <span className="text-plum">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-plum">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email <span className="text-plum">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-plum">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="text-sm font-medium text-ink">
          Company <span className="text-ink/40">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          className={inputClasses}
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="service" className="text-sm font-medium text-ink">
            Service <span className="text-plum">*</span>
          </label>
          <select
            id="service"
            className={inputClasses}
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={!!errors.service}
          >
            <option value="" disabled>
              Select one
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1.5 text-xs text-plum">{errors.service}</p>}
        </div>

        <div>
          <label htmlFor="budget" className="text-sm font-medium text-ink">
            Budget <span className="text-plum">*</span>
          </label>
          <select
            id="budget"
            className={inputClasses}
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            aria-invalid={!!errors.budget}
          >
            <option value="" disabled>
              Select one
            </option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.budget && <p className="mt-1.5 text-xs text-plum">{errors.budget}</p>}
        </div>

        <div>
          <label htmlFor="timeline" className="text-sm font-medium text-ink">
            Timeline <span className="text-plum">*</span>
          </label>
          <select
            id="timeline"
            className={inputClasses}
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            aria-invalid={!!errors.timeline}
          >
            <option value="" disabled>
              Select one
            </option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.timeline && <p className="mt-1.5 text-xs text-plum">{errors.timeline}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-ink">
          Project description <span className="text-plum">*</span>
        </label>
        <textarea
          id="description"
          rows={6}
          className={inputClasses}
          placeholder="Tell us about your business, what the site needs to do, and anything you'd like us to know."
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && (
          <p id="description-error" className="mt-1.5 text-xs text-plum">
            {errors.description}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-sm border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" showArrow disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending…" : "Send Project Brief"}
      </Button>
    </form>
  );
}
