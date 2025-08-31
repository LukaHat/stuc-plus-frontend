import { Method, request } from "./base";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponse = {
  token: string;
  email: string;
};

export const login = async (payload: LoginPayload) => {
  return await request<AuthResponse>({
    method: Method.POST,
    url: "auth/login",
    data: payload,
  });
};

export const register = async (payload: RegisterPayload) => {
  return await request<AuthResponse>({
    method: Method.POST,
    url: "auth/register",
    data: payload,
  });
};
