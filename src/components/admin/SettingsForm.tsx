"use client";

import { useState, type FormEvent } from "react";
import { settingsSchema, type SettingsFormValues } from "@/lib/validation/admin";
import { adminInputClasses, adminLabelClasses } from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";

export function SettingsForm({ initialValues }: { initialValues: SettingsFormValues }) {
  const [values, setValues] = useState<SettingsFormValues>(initialValues);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  function update<K extends keyof SettingsFormValues>(key: K, value: SettingsFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  function updateSocial(key: keyof SettingsFormValues["socialLinks"], value: string) {
    setValues((v) => ({ ...v, socialLinks: { ...v.socialLinks, [key]: value } }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = settingsSchema.safeParse(values);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message || "Please check the form.");
      return;
    }

    setFormError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setFormError(data?.error || "Something went wrong.");
        setStatus("idle");
        return;
      }
      setSaved(true);
      setStatus("idle");
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-8 p-8">
      <div>
        <label htmlFor="contactEmail" className={adminLabelClasses}>
          Contact email
        </label>
        <input
          id="contactEmail"
          type="email"
          className={adminInputClasses}
          value={values.contactEmail}
          onChange={(e) => update("contactEmail", e.target.value)}
        />
        <p className="mt-1.5 text-xs text-ink/45">Used in the footer, contact page, and as the notification inbox.</p>
      </div>

      <div>
        <p className={adminLabelClasses}>Announcement bar</p>
        <div className="mt-2 flex flex-col gap-3">
          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 accent-plum"
              checked={values.announcementActive}
              onChange={(e) => update("announcementActive", e.target.checked)}
            />
            Show announcement bar
          </label>
          <input
            className={adminInputClasses + " mt-0"}
            placeholder="e.g. Booking two new projects for August"
            value={values.announcementText}
            onChange={(e) => update("announcementText", e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className={adminLabelClasses}>Social links (optional)</p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            className={adminInputClasses + " mt-0"}
            placeholder="Instagram URL"
            value={values.socialLinks.instagram}
            onChange={(e) => updateSocial("instagram", e.target.value)}
          />
          <input
            className={adminInputClasses + " mt-0"}
            placeholder="LinkedIn URL"
            value={values.socialLinks.linkedin}
            onChange={(e) => updateSocial("linkedin", e.target.value)}
          />
          <input
            className={adminInputClasses + " mt-0"}
            placeholder="Twitter / X URL"
            value={values.socialLinks.twitter}
            onChange={(e) => updateSocial("twitter", e.target.value)}
          />
          <input
            className={adminInputClasses + " mt-0"}
            placeholder="Facebook URL"
            value={values.socialLinks.facebook}
            onChange={(e) => updateSocial("facebook", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="privacyPolicy" className={adminLabelClasses}>
          Privacy Policy content
        </label>
        <p className="mt-1 text-xs text-ink/45">
          Use blank lines between paragraphs. A line starting with <code>## </code> becomes a heading.
        </p>
        <textarea
          id="privacyPolicy"
          rows={10}
          className={adminInputClasses}
          value={values.privacyPolicy}
          onChange={(e) => update("privacyPolicy", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="termsOfService" className={adminLabelClasses}>
          Terms of Service content
        </label>
        <textarea
          id="termsOfService"
          rows={10}
          className={adminInputClasses}
          value={values.termsOfService}
          onChange={(e) => update("termsOfService", e.target.value)}
        />
      </div>

      {formError && (
        <p role="alert" className="rounded-sm border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
          {formError}
        </p>
      )}

      {saved && (
        <p className="rounded-sm border border-plum/20 bg-warmgray px-4 py-3 text-sm text-ink">
          Settings saved.
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status !== "idle"} className="self-start">
        {status === "submitting" ? "Saving…" : "Save Settings"}
      </Button>
    </form>
  );
}
