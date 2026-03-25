import type { ReactNode } from "react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load the data right now. Please try again.",
  action,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
      <h3 className="text-lg font-semibold tracking-tight text-destructive">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}