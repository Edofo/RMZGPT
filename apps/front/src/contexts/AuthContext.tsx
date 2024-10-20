import type React from "react";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";

import { JWT_COOKIE_NAME } from "@/constants/cookies";

import { GetMe } from "@/http/requests/auth/getMe";
import { Login } from "@/http/requests/auth/login";
import { Register } from "@/http/requests/auth/register";
import type { AuthUser, LoginRequest, RegisterRequest } from "@/types/auth";
import { useToast } from "./ToastContext";

interface AuthContextType {
  user: AuthUser | undefined;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  register: (data: RegisterRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cookie, setCookie, removeCookie] = useCookies([JWT_COOKIE_NAME]);
  const { addToast } = useToast();

  const [user, setUser] = useState<AuthUser | undefined>(undefined);

  const handleGetMe = useCallback(async () => {
    const response = await GetMe();
    if (response.status === 200) {
      setUser(response.data);
      return;
    }
    if (cookie[JWT_COOKIE_NAME]) {
      removeCookie(JWT_COOKIE_NAME);
    }
  }, [cookie, removeCookie]);

  useEffect(() => {
    handleGetMe();
  }, [handleGetMe]);

  const handleLogin = useCallback(
    async (data: LoginRequest) => {
      const response = await Login(data);
      if (response.status === 401) {
        addToast("Invalid credentials", "error");
        return;
      }
      setCookie(JWT_COOKIE_NAME, response.data.token);
      setUser(response.data.user);
    },
    [setCookie, addToast],
  );

  const handleLogout = useCallback(() => {
    setUser(undefined);
    removeCookie(JWT_COOKIE_NAME);
  }, [removeCookie]);

  const handleRegister = useCallback(
    async (data: RegisterRequest) => {
      const response = await Register(data);
      if (response.status === 409) {
        addToast("User already exists", "error");
        return;
      }
      if (response.status !== 201) {
        addToast("An error occurred", "error");
        return;
      }
      setCookie(JWT_COOKIE_NAME, response.data);
      setUser(response.data.user);
    },
    [addToast, setCookie],
  );

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login: async (data) => await handleLogin(data),
      logout: async () => handleLogout(),
      register: async (data) => await handleRegister(data),
    }),
    [user, handleLogin, handleLogout, handleRegister],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
