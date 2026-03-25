import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "@/types/auth.types";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      await login(payload);
    },
    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
  });
}