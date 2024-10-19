import api from "@/http/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const Login = async (data: LoginRequest) => {
  return await api.post<LoginResponse>("/auth/login", data);
};
