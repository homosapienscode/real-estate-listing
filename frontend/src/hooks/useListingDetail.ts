import { useQuery } from "@tanstack/react-query";
import { getListingByIdApi } from "@/api/listings.api";

export function useListingDetail(id?: string) {
  return useQuery({
    queryKey: ["listing-detail", id],
    queryFn: () => getListingByIdApi(id as string),
    enabled: !!id,
  });
}