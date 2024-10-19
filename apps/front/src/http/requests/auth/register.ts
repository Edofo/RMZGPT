import api from "@/http/api";
import type { RegisterRequest, RegisterResponse } from "@/types/auth";

export const Register = async (data: RegisterRequest) => {
  return await api.post<RegisterResponse>("/auth/register", data);
};
