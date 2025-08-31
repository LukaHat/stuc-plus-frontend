import { Button } from "../../components/atoms/Button";
import Input from "../../components/atoms/Input/Input";
import { type FormEvent, useState } from "react";
import { register } from "../../api/auth";
import { useAuthStore } from "../../stores/auth";
import { useNavigate } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await register({ email, password, confirmPassword });

      setAuth(res.token, res.email ?? null);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err && typeof err === "object" && "message" in err
          ? String(
              (err as { message?: unknown }).message ?? "Registration failed"
            )
          : "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-10 bg-white text-[#23243a] transition-colors px-2">
      <h1 className="text-3xl font-bold text-[#1A2BC8]">Stuc+ Logo</h1>
      <h2 className="text-2xl mb-2">Register</h2>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col items-start justify-center gap-1 w-full">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-1 w-full">
          <label htmlFor="confirmPassword">Confirm password</label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error ? <p className="text-red-400 text-sm">{error}</p> : null}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
