"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { projectSchema, type ProjectFormValues } from "@/lib/validation/admin";
import { adminInputClasses, adminLabelClasses } from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";

type Props = {
  projectId?: string;
  initialValues?: Partial<ProjectFormValues>;
};

const defaults: ProjectFormValues = {
  title: "",
  slug: "",
  summary: "",
  brief: "",
  approach: "",
  result: "",
  body: "",
  liveUrl: "",
  tags: "",
  featured: false,
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

export function ProjectForm({ projectId, initialValues }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>({ ...defaults, ...initialValues });
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "deleting">("idle");
  const [formError, setFormError] = useState("");
  const isEdit = Boolean(projectId);

  function update<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = projectSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ProjectFormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    const url = isEdit ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data?.error || "Something went wrong.");
        setStatus("idle");
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
      setStatus("idle");
    }
  }

  async function handleDelete() {
    if (!projectId) return;
    if (!confirm("Delete this project? This can't be undone.")) return;

    setStatus("deleting");
    const res = await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setFormError("Couldn't delete this project.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6 p-8">
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
              const title = e.target.value;
              update("title", title);
              if (!isEdit) update("slug", slugify(title));
            }}
          />
          {errors.title && <p className="mt-1.5 text-xs text-plum">{errors.title}</p>}
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
          {errors.slug && <p className="mt-1.5 text-xs text-plum">{errors.slug}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={adminLabelClasses}>
          Summary <span className="text-ink/40">(shown on cards)</span>
        </label>
        <textarea
          id="summary"
          rows={2}
          className={adminInputClasses}
          value={values.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
        {errors.summary && <p className="mt-1.5 text-xs text-plum">{errors.summary}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="brief" className={adminLabelClasses}>
            The Brief
          </label>
          <textarea
            id="brief"
            rows={4}
            className={adminInputClasses}
            value={values.brief}
            onChange={(e) => update("brief", e.target.value)}
          />
          {errors.brief && <p className="mt-1.5 text-xs text-plum">{errors.brief}</p>}
        </div>
        <div>
          <label htmlFor="approach" className={adminLabelClasses}>
            The Approach
          </label>
          <textarea
            id="approach"
            rows={4}
            className={adminInputClasses}
            value={values.approach}
            onChange={(e) => update("approach", e.target.value)}
          />
          {errors.approach && <p className="mt-1.5 text-xs text-plum">{errors.approach}</p>}
        </div>
        <div>
          <label htmlFor="result" className={adminLabelClasses}>
            The Result
          </label>
          <textarea
            id="result"
            rows={4}
            className={adminInputClasses}
            value={values.result}
            onChange={(e) => update("result", e.target.value)}
          />
          {errors.result && <p className="mt-1.5 text-xs text-plum">{errors.result}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="body" className={adminLabelClasses}>
          Extended case study body <span className="text-ink/40">(optional, markdown)</span>
        </label>
        <textarea
          id="body"
          rows={6}
          className={adminInputClasses}
          value={values.body}
          onChange={(e) => update("body", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="liveUrl" className={adminLabelClasses}>
            Live URL <span className="text-ink/40">(optional)</span>
          </label>
          <input
            id="liveUrl"
            type="url"
            placeholder="https://"
            className={adminInputClasses}
            value={values.liveUrl}
            onChange={(e) => update("liveUrl", e.target.value)}
          />
          {errors.liveUrl && <p className="mt-1.5 text-xs text-plum">{errors.liveUrl}</p>}
        </div>
        <div>
          <label htmlFor="tags" className={adminLabelClasses}>
            Tags <span className="text-ink/40">(comma-separated)</span>
          </label>
          <input
            id="tags"
            placeholder="Website Design & Build, Portfolio"
            className={adminInputClasses}
            value={values.tags}
            onChange={(e) => update("tags", e.target.value)}
          />
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
              checked={values.featured}
              onChange={(e) => update("featured", e.target.checked)}
            />
            Featured on homepage
          </label>
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
          {status === "submitting" ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
        </Button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={status !== "idle"}
            className="text-sm text-ink/50 transition-colors duration-200 hover:text-plum"
          >
            {status === "deleting" ? "Deleting…" : "Delete project"}
          </button>
        )}
      </div>
    </form>
  );
}
