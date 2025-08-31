import axios, { type AxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/auth";

const baseAPIClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/",
});

baseAPIClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers = config.headers ?? {};
  config.headers["accept"] = "application/json";
  return config;
});

baseAPIClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuth();
      }
      return Promise.reject(error.response?.data ?? error);
    }
    return Promise.reject(error);
  }
);

export enum Method {
  GET = "get",
  PATCH = "patch",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

interface RequestProps {
  method?: Method;
  url: string;
  id?: string;
  data?: unknown;
  axiosConfig?: AxiosRequestConfig;

  responseType?: ResponseType;
}

export const request = async <T>(params: RequestProps): Promise<T> => {
  const { url, method, id, data, axiosConfig, responseType } = params;

  const res = await baseAPIClient.request<T>({
    method: method || "get",
    url: id ? `${url}/${id}` : url,
    data,
    responseType,
    ...axiosConfig,
  });

  return res.data;
};
