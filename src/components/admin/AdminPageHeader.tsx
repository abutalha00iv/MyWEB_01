import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-ink/10 px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink/55">{description}</p>}
      </div>
      {action}
    </div>
  );
}
