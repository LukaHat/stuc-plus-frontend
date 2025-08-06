import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <main className="w-screen h-screen">
      <Outlet />
    </main>
  );
}
