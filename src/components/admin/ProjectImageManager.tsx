"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/icons";

type ProjectImage = {
  id: string;
  url: string;
  alt: string;
  order: number;
};

export function ProjectImageManager({ projectId, initialImages }: { projectId: string; initialImages: ProjectImage[] }) {
  const [images, setImages] = useState<ProjectImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json().catch(() => null);

      if (!uploadRes.ok) {
        setError(uploadData?.error || "Upload failed.");
        setUploading(false);
        return;
      }

      const imageRes = await fetch(`/api/admin/projects/${projectId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: uploadData.url, alt: "" }),
      });
      const imageData = await imageRes.json().catch(() => null);

      if (!imageRes.ok) {
        setError(imageData?.error || "Couldn't attach the image.");
        setUploading(false);
        return;
      }

      setImages((prev) => [...prev, imageData.image]);
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function updateAlt(imageId: string, alt: string) {
    setImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, alt } : img)));
    await fetch(`/api/admin/projects/${projectId}/images/${imageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt }),
    });
  }

  async function removeImage(imageId: string) {
    if (!confirm("Remove this image?")) return;
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    await fetch(`/api/admin/projects/${projectId}/images/${imageId}`, { method: "DELETE" });
  }

  async function moveImage(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const next = [...images];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setImages(next);

    await Promise.all([
      fetch(`/api/admin/projects/${projectId}/images/${next[index].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: index }),
      }),
      fetch(`/api/admin/projects/${projectId}/images/${next[targetIndex].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: targetIndex }),
      }),
    ]);
  }

  return (
    <div className="max-w-3xl p-8">
      <p className="text-sm font-medium text-ink">Project Images</p>
      <p className="mt-1 text-xs text-ink/45">
        JPEG, PNG, or WebP, up to 5MB. The first image is used as the card thumbnail.
      </p>

      {images.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((img, i) => (
            <div key={img.id} className="rounded-md border border-ink/12 p-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-warmgray">
                <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
              </div>
              <input
                className="mt-3 w-full rounded-sm border border-ink/20 bg-ivory px-3 py-2 text-sm text-ink placeholder:text-ink/35 focus:border-plum focus-visible:outline-2 focus-visible:outline-plum"
                placeholder="Alt text (describe the image)"
                value={img.alt}
                onChange={(e) => updateAlt(img.id, e.target.value)}
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-2 text-xs text-ink/50">
                  <button type="button" onClick={() => moveImage(i, -1)} disabled={i === 0} className="hover:text-plum disabled:opacity-30">
                    Move up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1}
                    className="hover:text-plum disabled:opacity-30"
                  >
                    Move down
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  aria-label="Remove image"
                  className="flex h-7 w-7 items-center justify-center text-ink/40 transition-colors duration-200 hover:text-plum"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          disabled={uploading}
          className="text-sm text-ink/70 file:mr-4 file:rounded-sm file:border file:border-ink/20 file:bg-ivory file:px-4 file:py-2 file:text-sm file:text-ink file:transition-colors file:duration-200 hover:file:border-plum"
        />
        {uploading && <p className="mt-2 text-xs text-ink/50">Uploading…</p>}
        {error && <p className="mt-2 text-xs text-plum">{error}</p>}
      </div>
    </div>
  );
}
