import { apiClient } from "@/api/axios";
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
} from "@/types/auth.types";
import axios from "axios";

export async function loginApi(payload: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        "Login failed";

      throw new Error(message);
    }

    throw error;
  }
}

export async function getMeApi(): Promise<MeResponse> {
  try {
    const response = await apiClient.get<MeResponse>("/auth/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        "Unable to fetch current user";

      throw new Error(message);
    }

    throw error;
  }
}