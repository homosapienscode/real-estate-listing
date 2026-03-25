import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  // hasNextPage: boolean;
  // hasPreviousPage: boolean;
  onPageChange: (nextPage: number) => void;
}

export function Pagination({
  page,
  totalPages,
  // hasNextPage,
  // hasPreviousPage,
  onPageChange,
}: PaginationProps) {
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border p-4 sm:flex-row">
      <Button
        variant="outline"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
      >
        Previous
      </Button>

      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>

      <Button
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </div>
  );
}