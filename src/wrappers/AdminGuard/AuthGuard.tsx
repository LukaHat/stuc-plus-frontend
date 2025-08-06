import { useCookies } from "react-cookie";
import { Navigate } from "react-router";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(["token"]);

  console.log(cookies);
  if (!cookies.token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
