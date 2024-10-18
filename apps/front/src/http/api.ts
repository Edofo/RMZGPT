import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export const UNKNOWN_ERROR = "An error occurred";

// create a new axios instance with a custom config for the backoffice app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// interceptors are functions that will be executed before the request is sent
api.interceptors.request.use(async (config) => {
  console.log(config, import.meta.env.VITE_API_URL);
  return config;
});

// interceptors are functions that will be executed before the response is returned
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return error.response ?? { status: 500, data: { message: UNKNOWN_ERROR } };
  },
);

// export the api instance
export default api;
