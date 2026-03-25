import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed p-8 text-center">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>

      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}