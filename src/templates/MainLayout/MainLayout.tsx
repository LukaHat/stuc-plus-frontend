import { Outlet, useLocation } from "react-router";
import Navbar from "../../components/organisms/Navbar/Navbar";

export default function MainLayout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/auth/login") ||
    location.pathname.startsWith("/auth/register");

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 w-full py-6 sm:py-8 md:py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-content mx-auto">
            <div className="space-y-section">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-auto py-6 bg-white border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-content mx-auto">
            <div className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} STUC+. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
