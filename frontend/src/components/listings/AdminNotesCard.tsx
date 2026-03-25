import { ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminNotesCardProps {
  notes?: string | null;
}

export function AdminNotesCard({ notes }: AdminNotesCardProps) {
  if (!notes) {
    return null;
  }

  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center-safe gap-2 text-lg">
          <ShieldAlert className="h-5 w-5 text-amber-600" />
          Internal Status Notes
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="leading-7 text-muted-foreground">{notes}</p>
      </CardContent>
    </Card>
  );
}