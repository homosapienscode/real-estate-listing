export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthResponse;
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}