"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { serviceSchema, type ServiceFormValues } from "@/lib/validation/admin";
import { adminInputClasses, adminLabelClasses } from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/icons";

type Props = {
  serviceId?: string;
  initialValues?: Partial<ServiceFormValues>;
};

const defaults: ServiceFormValues = {
  title: "",
  slug: "",
  summary: "",
  included: [""],
  process: [{ title: "", description: "" }],
  timeline: "",
  startingPrice: "",
  faq: [],
  order: 0,
  metaTitle: "",
  metaDescription: "",
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 shrink-0 items-center justify-center text-ink/40 transition-colors duration-200 hover:text-plum"
    >
      <CloseIcon className="h-4 w-4" />
    </button>
  );
}

export function ServiceForm({ serviceId, initialValues }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<ServiceFormValues>({ ...defaults, ...initialValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "deleting">("idle");
  const [formError, setFormError] = useState("");
  const isEdit = Boolean(serviceId);

  function update<K extends keyof ServiceFormValues>(key: K, value: ServiceFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cleaned = {
      ...values,
      included: values.included.map((i) => i.trim()).filter(Boolean),
      process: values.process.filter((p) => p.title.trim() || p.description.trim()),
      faq: values.faq.filter((f) => f.question.trim() || f.answer.trim()),
    };

    const parsed = serviceSchema.safeParse(cleaned);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path.join(".")] = issue.message;
      }
      setErrors(fieldErrors);
      setFormError("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    const url = isEdit ? `/api/admin/services/${serviceId}` : "/api/admin/services";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setFormError(data?.error || "Something went wrong.");
        setStatus("idle");
        return;
      }

      router.push("/admin/services");
      router.refresh();
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
      setStatus("idle");
    }
  }

  async function handleDelete() {
    if (!serviceId) return;
    if (!confirm("Delete this service? This can't be undone.")) return;

    setStatus("deleting");
    const res = await fetch(`/api/admin/services/${serviceId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/services");
      router.refresh();
    } else {
      setFormError("Couldn't delete this service.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-8 p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className={adminLabelClasses}>
            Title
          </label>
          <input
            id="title"
            className={adminInputClasses}
            value={values.title}
            onChange={(e) => {
              update("title", e.target.value);
              if (!isEdit) update("slug", slugify(e.target.value));
            }}
          />
        </div>
        <div>
          <label htmlFor="slug" className={adminLabelClasses}>
            Slug
          </label>
          <input
            id="slug"
            className={adminInputClasses}
            value={values.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={adminLabelClasses}>
          Summary
        </label>
        <textarea
          id="summary"
          rows={2}
          className={adminInputClasses}
          value={values.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="timeline" className={adminLabelClasses}>
            Timeline
          </label>
          <input
            id="timeline"
            className={adminInputClasses}
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startingPrice" className={adminLabelClasses}>
            Starting price
          </label>
          <input
            id="startingPrice"
            className={adminInputClasses}
            value={values.startingPrice}
            onChange={(e) => update("startingPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Included */}
      <div>
        <p className={adminLabelClasses}>What&rsquo;s Included</p>
        <div className="mt-2 flex flex-col gap-2.5">
          {values.included.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={adminInputClasses + " mt-0"}
                value={item}
                onChange={(e) => {
                  const next = [...values.included];
                  next[i] = e.target.value;
                  update("included", next);
                }}
                placeholder="Included item"
              />
              <RemoveButton
                label="Remove item"
                onClick={() => update("included", values.included.filter((_, idx) => idx !== i))}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update("included", [...values.included, ""])}
          className="mt-3 text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
        >
          + Add item
        </button>
        {errors.included && <p className="mt-1.5 text-xs text-plum">{errors.included}</p>}
      </div>

      {/* Process */}
      <div>
        <p className={adminLabelClasses}>Process Steps</p>
        <div className="mt-2 flex flex-col gap-4">
          {values.process.map((step, i) => (
            <div key={i} className="flex items-start gap-2 rounded-sm border border-ink/12 p-4">
              <div className="flex-1 space-y-2.5">
                <input
                  className={adminInputClasses + " mt-0"}
                  value={step.title}
                  placeholder="Step title"
                  onChange={(e) => {
                    const next = [...values.process];
                    next[i] = { ...next[i], title: e.target.value };
                    update("process", next);
                  }}
                />
                <textarea
                  rows={2}
                  className={adminInputClasses + " mt-0"}
                  value={step.description}
                  placeholder="Step description"
                  onChange={(e) => {
                    const next = [...values.process];
                    next[i] = { ...next[i], description: e.target.value };
                    update("process", next);
                  }}
                />
              </div>
              <RemoveButton
                label="Remove step"
                onClick={() => update("process", values.process.filter((_, idx) => idx !== i))}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update("process", [...values.process, { title: "", description: "" }])}
          className="mt-3 text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
        >
          + Add step
        </button>
        {errors.process && <p className="mt-1.5 text-xs text-plum">{errors.process}</p>}
      </div>

      {/* FAQ */}
      <div>
        <p className={adminLabelClasses}>FAQ</p>
        <div className="mt-2 flex flex-col gap-4">
          {values.faq.map((item, i) => (
            <div key={i} className="flex items-start gap-2 rounded-sm border border-ink/12 p-4">
              <div className="flex-1 space-y-2.5">
                <input
                  className={adminInputClasses + " mt-0"}
                  value={item.question}
                  placeholder="Question"
                  onChange={(e) => {
                    const next = [...values.faq];
                    next[i] = { ...next[i], question: e.target.value };
                    update("faq", next);
                  }}
                />
                <textarea
                  rows={2}
                  className={adminInputClasses + " mt-0"}
                  value={item.answer}
                  placeholder="Answer"
                  onChange={(e) => {
                    const next = [...values.faq];
                    next[i] = { ...next[i], answer: e.target.value };
                    update("faq", next);
                  }}
                />
              </div>
              <RemoveButton
                label="Remove FAQ item"
                onClick={() => update("faq", values.faq.filter((_, idx) => idx !== i))}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => update("faq", [...values.faq, { question: "", answer: "" }])}
          className="mt-3 text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
        >
          + Add FAQ item
        </button>
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
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="metaTitle" className={adminLabelClasses}>
            SEO title <span className="text-ink/40">(optional)</span>
          </label>
          <input
            id="metaTitle"
            className={adminInputClasses}
            value={values.metaTitle}
            onChange={(e) => update("metaTitle", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="metaDescription" className={adminLabelClasses}>
            SEO description <span className="text-ink/40">(optional)</span>
          </label>
          <input
            id="metaDescription"
            className={adminInputClasses}
            value={values.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
          />
        </div>
      </div>

      {formError && (
        <p role="alert" className="rounded-sm border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
          {formError}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" disabled={status !== "idle"}>
          {status === "submitting" ? "Saving…" : isEdit ? "Save Changes" : "Create Service"}
        </Button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={status !== "idle"}
            className="text-sm text-ink/50 transition-colors duration-200 hover:text-plum"
          >
            {status === "deleting" ? "Deleting…" : "Delete service"}
          </button>
        )}
      </div>
    </form>
  );
}
