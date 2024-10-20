import { JWT_COOKIE_NAME } from "@/constants/cookies";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export const UNKNOWN_ERROR = "An error occurred";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = document.cookie
    .split(";")
    .find((cookie) => cookie.includes(JWT_COOKIE_NAME))
    ?.split("=")[1];
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers = new axios.AxiosHeaders();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return error.response ?? { status: 500, data: { message: UNKNOWN_ERROR } };
  },
);

export default api;
