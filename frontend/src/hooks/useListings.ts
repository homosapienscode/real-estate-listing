import { useQuery } from "@tanstack/react-query";
import { getListingsApi } from "@/api/listings.api";
import type { ListingsQueryParams } from "@/types/listings.types";

export function useListings(params: ListingsQueryParams) {
  return useQuery({
    queryKey: ["listings", params],
    queryFn: () => getListingsApi(params),
  });
}