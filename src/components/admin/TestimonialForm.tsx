"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { testimonialSchema, type TestimonialFormValues } from "@/lib/validation/admin";
import { adminInputClasses, adminLabelClasses } from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";

type Props = {
  testimonialId?: string;
  initialValues?: Partial<TestimonialFormValues>;
};

const defaults: TestimonialFormValues = {
  quote: "",
  clientName: "",
  role: "",
  visible: true,
  order: 0,
};

export function TestimonialForm({ testimonialId, initialValues }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<TestimonialFormValues>({ ...defaults, ...initialValues });
  const [errors, setErrors] = useState<Partial<Record<keyof TestimonialFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "deleting">("idle");
  const [formError, setFormError] = useState("");
  const isEdit = Boolean(testimonialId);

  function update<K extends keyof TestimonialFormValues>(key: K, value: TestimonialFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = testimonialSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof TestimonialFormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    const url = isEdit ? `/api/admin/testimonials/${testimonialId}` : "/api/admin/testimonials";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setFormError(data?.error || "Something went wrong.");
        setStatus("idle");
        return;
      }
      router.push("/admin/testimonials");
      router.refresh();
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
      setStatus("idle");
    }
  }

  async function handleDelete() {
    if (!testimonialId) return;
    if (!confirm("Delete this testimonial? This can't be undone.")) return;
    setStatus("deleting");
    const res = await fetch(`/api/admin/testimonials/${testimonialId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/testimonials");
      router.refresh();
    } else {
      setFormError("Couldn't delete this testimonial.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6 p-8">
      <div>
        <label htmlFor="quote" className={adminLabelClasses}>
          Quote
        </label>
        <textarea
          id="quote"
          rows={4}
          className={adminInputClasses}
          value={values.quote}
          onChange={(e) => update("quote", e.target.value)}
        />
        {errors.quote && <p className="mt-1.5 text-xs text-plum">{errors.quote}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="clientName" className={adminLabelClasses}>
            Client name
          </label>
          <input
            id="clientName"
            className={adminInputClasses}
            value={values.clientName}
            onChange={(e) => update("clientName", e.target.value)}
          />
          {errors.clientName && <p className="mt-1.5 text-xs text-plum">{errors.clientName}</p>}
        </div>
        <div>
          <label htmlFor="role" className={adminLabelClasses}>
            Role / company
          </label>
          <input
            id="role"
            className={adminInputClasses}
            value={values.role}
            onChange={(e) => update("role", e.target.value)}
          />
          {errors.role && <p className="mt-1.5 text-xs text-plum">{errors.role}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="order" className={adminLabelClasses}>
            Display order
          </label>
          <input
            id="order"
            type="number"
            min={0}
            className={adminInputClasses}
            value={values.order}
            onChange={(e) => update("order", Number(e.target.value))}
          />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 accent-plum"
              checked={values.visible}
              onChange={(e) => update("visible", e.target.checked)}
            />
            Visible on homepage
          </label>
        </div>
      </div>

      {formError && (
        <p role="alert" className="rounded-sm border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
          {formError}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" disabled={status !== "idle"}>
          {status === "submitting" ? "Saving…" : isEdit ? "Save Changes" : "Create Testimonial"}
        </Button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={status !== "idle"}
            className="text-sm text-ink/50 transition-colors duration-200 hover:text-plum"
          >
            {status === "deleting" ? "Deleting…" : "Delete testimonial"}
          </button>
        )}
      </div>
    </form>
  );
}
