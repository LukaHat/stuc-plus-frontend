import { Navigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hydrateFromStorage } = useAuthStore();
  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
