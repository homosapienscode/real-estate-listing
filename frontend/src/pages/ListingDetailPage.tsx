import { Link, useParams } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { ListingSummary } from "@/components/listings/ListingSummary";
import { AdminNotesCard } from "@/components/listings/AdminNotesCard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useListingDetail } from "@/hooks/useListingDetail";

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();
  const listingQuery = useListingDetail(id);

  if (!id) {
    return (
      <AppLayout>
        <PageContainer className="max-w-3xl">
          <EmptyState
            title="Invalid listing URL"
            description="The listing identifier is missing or malformed."
            action={
              <Button asChild>
                <Link to={ROUTES.HOME}>Back to listings</Link>
              </Button>
            }
          />
        </PageContainer>
      </AppLayout>
    );
  }

  const listing = listingQuery.data?.data.listing;

  return (
    <AppLayout>
      <PageContainer className="space-y-6">
        <div>
          <Button asChild variant="ghost" className="pl-0">
            <Link to={ROUTES.HOME}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to listings
            </Link>
          </Button>
        </div>

        {listingQuery.isLoading ? (
          <LoadingSpinner label="Loading listing details..." />
        ) : listingQuery.isError ? (
          <ErrorState
            title="Unable to load listing"
            description={
              isAdmin
                ? "This listing may not exist, or you may have navigated to an invalid listing ID."
                : "This listing may be unavailable, non-public, or the URL may be invalid."
            }
            action={
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button variant="outline" onClick={() => listingQuery.refetch()}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retry
                </Button>

                <Button asChild>
                  <Link to={ROUTES.HOME}>Back to listings</Link>
                </Button>
              </div>
            }
          />
        ) : !listing ? (
          <EmptyState
            title="Listing not found"
            description="We couldn't find this property listing."
            action={
              <Button asChild>
                <Link to={ROUTES.HOME}>Back to listings</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-8">
            <section className="overflow-hidden rounded-2xl border bg-card">
              <div className="aspect-[16/9] bg-muted">
                {listing.heroImageUrl ? (
                  <img
                    src={listing.heroImageUrl}
                    alt={listing.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-8">
                <ListingSummary listing={listing} />
              </div>

              <aside className="space-y-6">
                {isAdmin ? (
                  <AdminNotesCard notes={listing.internalStatusNotes} />
                ) : null}
              </aside>
            </section>
          </div>
        )}
      </PageContainer>
    </AppLayout>
  );
}