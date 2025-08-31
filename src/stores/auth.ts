import { create } from "zustand";
import { setCookie, getCookie, deleteCookie } from "../utils/cookies";

type AuthState = {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, email?: string | null) => void;
  clearAuth: () => void;
  hydrateFromStorage: () => void;
};

const TOKEN_KEY = "auth_token";
const EMAIL_KEY = "auth_email";

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  email: null,
  isAuthenticated: false,
  setAuth: (token, email = null) => {
    setCookie(TOKEN_KEY, token, 30);
    if (email) {
      setCookie(EMAIL_KEY, email, 30);
    }
    set({ token, email: email ?? get().email, isAuthenticated: true });
  },
  clearAuth: () => {
    deleteCookie(TOKEN_KEY);
    deleteCookie(EMAIL_KEY);
    set({ token: null, email: null, isAuthenticated: false });
  },
  hydrateFromStorage: () => {
    const token = getCookie(TOKEN_KEY);
    const email = getCookie(EMAIL_KEY);
    set({ token, email, isAuthenticated: Boolean(token) });
  },
}));
