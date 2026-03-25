import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <AppLayout>
      <PageContainer className="max-w-2xl">
        <div className="rounded-xl border p-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">404</h1>
          <p className="mt-3 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild className="mt-6">
            <Link to={ROUTES.HOME}>Back to listings</Link>
          </Button>
        </div>
      </PageContainer>
    </AppLayout>
  );
}