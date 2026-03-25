import { apiClient } from "@/api/axios";
import type {
  ListingDetailResponse,
  ListingsQueryParams,
  ListingsResponse,
} from "@/types/listings.types";
import { cleanQueryParams } from "@/utils/query-params";
import axios from "axios";

export async function getListingsApi(
  params: ListingsQueryParams
): Promise<ListingsResponse> {
  try {
    const response = await apiClient.get<ListingsResponse>("/listings", {
      params: cleanQueryParams(params as Record<string, unknown>),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        "Failed to fetch listings";

      throw new Error(message);
    }

    throw error;
  }
}

export async function getListingByIdApi(
  id: string
): Promise<ListingDetailResponse> {
  try {
    const response = await apiClient.get<ListingDetailResponse>(`/listings/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        "Failed to fetch listing";

      throw new Error(message);
    }

    throw error;
  }
}