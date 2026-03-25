import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Pagination } from "@/components/common/Pagination";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { ListingsFilters } from "@/components/listings/ListingsFilters";
import { ListingsGrid } from "@/components/listings/ListingsGrid";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_LISTINGS_LIMIT,
  DEFAULT_LISTINGS_PAGE,
} from "@/constants/listings";
import { useListings } from "@/hooks/useListings";
import type {
  ListingType,
  ListingsQueryParams,
} from "@/types/listings.types";
import { cleanQueryParams, parseNumberParam } from "@/utils/query-params";
import { RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo<ListingsQueryParams>(() => {
    return {
      page: parseNumberParam(searchParams.get("page")) ?? DEFAULT_LISTINGS_PAGE,
      limit:
        parseNumberParam(searchParams.get("limit")) ?? DEFAULT_LISTINGS_LIMIT,
      keyword: searchParams.get("keyword") ?? undefined,
      suburb: searchParams.get("suburb") ?? undefined,
      property_type:
        (searchParams.get("property_type") as ListingType | null) ?? undefined,
      price_min: parseNumberParam(searchParams.get("price_min")),
      price_max: parseNumberParam(searchParams.get("price_max")),
      bedrooms_min: parseNumberParam(searchParams.get("bedrooms_min")),
      bathrooms_min: parseNumberParam(searchParams.get("bathrooms_min")),
    };
  }, [searchParams]);

  const filterInitialValues = useMemo<ListingsQueryParams>(
    () => ({
      keyword: queryParams.keyword,
      suburb: queryParams.suburb,
      property_type: queryParams.property_type,
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
      bedrooms_min: queryParams.bedrooms_min,
      bathrooms_min: queryParams.bathrooms_min,
    }),
    [
      queryParams.keyword,
      queryParams.suburb,
      queryParams.property_type,
      queryParams.price_min,
      queryParams.price_max,
      queryParams.bedrooms_min,
      queryParams.bathrooms_min,
    ]
  );

  const filtersKey = useMemo(
    () =>
      JSON.stringify({
        keyword: filterInitialValues.keyword ?? null,
        suburb: filterInitialValues.suburb ?? null,
        property_type: filterInitialValues.property_type ?? null,
        price_min: filterInitialValues.price_min ?? null,
        price_max: filterInitialValues.price_max ?? null,
        bedrooms_min: filterInitialValues.bedrooms_min ?? null,
        bathrooms_min: filterInitialValues.bathrooms_min ?? null,
      }),
    [filterInitialValues]
  );

  const listingsQuery = useListings(queryParams);

  function updateSearchParams(nextValues: ListingsQueryParams) {
    const merged = cleanQueryParams({
      ...queryParams,
      ...nextValues,
    });

    const params = new URLSearchParams();

    Object.entries(merged).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  }

  function handleApplyFilters(values: ListingsQueryParams) {
    updateSearchParams({
      ...values,
      page: DEFAULT_LISTINGS_PAGE,
      limit: DEFAULT_LISTINGS_LIMIT,
    });
  }

  function handleClearFilters() {
    setSearchParams({
      page: String(DEFAULT_LISTINGS_PAGE),
      limit: String(DEFAULT_LISTINGS_LIMIT),
    });
  }

  function handlePageChange(nextPage: number) {
    updateSearchParams({
      page: nextPage,
    });
  }

  const items = listingsQuery.data?.data.items ?? [];
  const pagination = listingsQuery.data?.data.pagination;

  return (
    <AppLayout>
      <PageContainer className="space-y-8">
        <section className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">Property Listings</h1>
          <p className="text-muted-foreground">
            Browse active real estate listings, filter by criteria, and inspect
            role-based listing detail behavior.
          </p>
        </section>

        <ListingsFilters
          key={filtersKey}
          initialValues={filterInitialValues}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />

        {listingsQuery.isLoading ? (
          <LoadingSpinner label="Loading listings..." />
        ) : listingsQuery.isError ? (
          <ErrorState
            title="Failed to load listings"
            description="Please try again or adjust your filters."
            action={
              <Button variant="outline" onClick={() => listingsQuery.refetch()}>
                Retry
              </Button>
            }
          />
        ) : items.length === 0 ? (
          <EmptyState
            title="No listings found"
            description="Try adjusting your filters to see more results."
            action={
              <Button variant="outline" onClick={handleClearFilters}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <section className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold tracking-tight">
                  Available Listings
                </h2>

                {pagination ? (
                  <p className="text-sm text-muted-foreground">
                    Showing page {pagination.page} of {pagination.totalPages} • {pagination.total} total
                  </p>
                ) : null}
              </div>

              <ListingsGrid items={items} />
            </section>

            {pagination ? (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                // hasNextPage={pagination.page < pagination.totalPages}
                // hasPreviousPage={pagination.page > 1}
                onPageChange={handlePageChange}
              />
            ) : null}
          </>
        )}
      </PageContainer>
    </AppLayout>
  );
}