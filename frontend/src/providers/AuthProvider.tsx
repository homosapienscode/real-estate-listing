import { getMeApi, loginApi } from "@/api/auth.api";
import { AuthContext, type AuthContextValue } from "@/contexts/AuthContext";
import type { LoginRequest, User } from "@/types/auth.types";
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
} from "@/utils/auth-storage";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(getAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    removeAccessToken();
    setTokenState(null);
    setUser(null);
  }, []);

  const refreshMe = useCallback(async () => {
    const existingToken = getAccessToken();

    if (!existingToken) {
      setUser(null);
      setTokenState(null);
      return;
    }

    try {
      const response = await getMeApi();
      setUser(response.data.user);
      setTokenState(existingToken);
    } catch {
      logout();
    }
  }, [logout]);

  const login = useCallback(
    async (payload: LoginRequest) => {
      const response = await loginApi(payload);

      const accessToken = response.data.accessToken;
      const nextUser = response.data.user;

      setAccessToken(accessToken);
      setTokenState(accessToken);
      setUser(nextUser);
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        const existingToken = getAccessToken();

        if (!existingToken) {
          if (isMounted) {
            setIsLoading(false);
          }
          return;
        }

        await refreshMe();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [refreshMe]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isAdmin: !!user?.isAdmin,
      isLoading,
      login,
      logout,
      refreshMe,
    }),
    [user, token, isLoading, login, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}