import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth";

export default function LogoutPage() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();
  useEffect(() => {
    clearAuth();
    navigate("/auth/login", { replace: true });
  }, [clearAuth, navigate]);
  return null;
}
