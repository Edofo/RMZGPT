import api from "@/http/api";
import type { AuthUser } from "@/types/auth";

export const GetMe = async () => {
  return await api.get<AuthUser>("/auth/me");
};
