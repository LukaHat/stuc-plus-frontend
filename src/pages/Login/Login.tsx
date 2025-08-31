import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../api/auth";
import { useAuthStore } from "../../stores/auth";
import { Button } from "../../components/atoms/Button";
import Input from "../../components/atoms/Input/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login({ email, password });

      setAuth(res.token, res.email ?? null);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message ?? "Login failed")
          : "Login failed";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-fulls gap-10 bg-white text-[#23243a] transition-colors px-2">
      <h1 className="text-3xl font-bold text-[#1A2BC8]">Stuc+</h1>
      <h2 className="text-2xl mb-2">Login</h2>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-4 w-[30%]"
      >
        <div className="flex flex-col items-start justify-center gap-1 w-full ">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-[0.5rem]"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-1 w-full">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-[0.5rem] rounded-md"
          />
        </div>
        {error ? <p className="text-red-400 text-sm">{error}</p> : null}
        <Button type="submit" disabled={loading} className="w-full text-black">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
