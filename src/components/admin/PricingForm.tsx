"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { pricingPackageSchema, type PricingPackageFormValues } from "@/lib/validation/admin";
import { adminInputClasses, adminLabelClasses } from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/icons";

type Props = {
  packageId?: string;
  initialValues?: Partial<PricingPackageFormValues>;
};

const defaults: PricingPackageFormValues = {
  serviceArea: "",
  name: "",
  price: "",
  description: "",
  features: [""],
  excluded: [],
  order: 0,
  highlighted: false,
};

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <p className={adminLabelClasses}>{label}</p>
      <div className="mt-2 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className={adminInputClasses + " mt-0"}
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              aria-label="Remove item"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-ink/40 transition-colors duration-200 hover:text-plum"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-3 text-sm font-medium text-plum transition-colors duration-200 hover:text-plum-dark"
      >
        + Add item
      </button>
    </div>
  );
}

export function PricingForm({ packageId, initialValues }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<PricingPackageFormValues>({ ...defaults, ...initialValues });
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "deleting">("idle");
  const isEdit = Boolean(packageId);

  function update<K extends keyof PricingPackageFormValues>(key: K, value: PricingPackageFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cleaned = {
      ...values,
      features: values.features.map((f) => f.trim()).filter(Boolean),
      excluded: values.excluded.map((f) => f.trim()).filter(Boolean),
    };
    const parsed = pricingPackageSchema.safeParse(cleaned);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message || "Please check the form.");
      return;
    }

    setFormError("");
    setStatus("submitting");

    const url = isEdit ? `/api/admin/pricing/${packageId}` : "/api/admin/pricing";
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
      router.push("/admin/pricing");
      router.refresh();
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
      setStatus("idle");
    }
  }

  async function handleDelete() {
    if (!packageId) return;
    if (!confirm("Delete this package? This can't be undone.")) return;
    setStatus("deleting");
    const res = await fetch(`/api/admin/pricing/${packageId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/pricing");
      router.refresh();
    } else {
      setFormError("Couldn't delete this package.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6 p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="serviceArea" className={adminLabelClasses}>
            Service area
          </label>
          <input
            id="serviceArea"
            className={adminInputClasses}
            placeholder="e.g. Website Design & Build"
            value={values.serviceArea}
            onChange={(e) => update("serviceArea", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name" className={adminLabelClasses}>
            Package name
          </label>
          <input
            id="name"
            className={adminInputClasses}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className={adminLabelClasses}>
            Price
          </label>
          <input
            id="price"
            className={adminInputClasses}
            placeholder="$75 or From $70"
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
          />
        </div>
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

      <div>
        <label htmlFor="description" className={adminLabelClasses}>
          Description
        </label>
        <textarea
          id="description"
          rows={2}
          className={adminInputClasses}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <ListEditor label="Included features" items={values.features} onChange={(v) => update("features", v)} />
      <ListEditor label="Excluded (shown muted)" items={values.excluded} onChange={(v) => update("excluded", v)} />

      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          className="h-4 w-4 accent-plum"
          checked={values.highlighted}
          onChange={(e) => update("highlighted", e.target.checked)}
        />
        Highlight as &ldquo;Most Popular&rdquo;
      </label>

      {formError && (
        <p role="alert" className="rounded-sm border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
          {formError}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" disabled={status !== "idle"}>
          {status === "submitting" ? "Saving…" : isEdit ? "Save Changes" : "Create Package"}
        </Button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={status !== "idle"}
            className="text-sm text-ink/50 transition-colors duration-200 hover:text-plum"
          >
            {status === "deleting" ? "Deleting…" : "Delete package"}
          </button>
        )}
      </div>
    </form>
  );
}
