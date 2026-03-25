import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}