import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="w-screen h-screen">
      <Outlet />
    </main>
  );
}
