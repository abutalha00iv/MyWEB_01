"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteSubmissionButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this submission? This can't be undone.")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/submissions");
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-sm text-ink/50 transition-colors duration-200 hover:text-plum"
    >
      {deleting ? "Deleting…" : "Delete submission"}
    </button>
  );
}
