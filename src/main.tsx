import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./templates/AuthLayout/AuthLayout.tsx";
import { LoginPage } from "./pages/Login/index.ts";
import { RegisterPage } from "./pages/Register/index.ts";
import { AuthGuard } from "./wrappers/AdminGuard";
import { DashboardPage } from "./pages/Dashboard";
import JobsList from "./pages/Jobs/JobsList";
import JobDetail from "./pages/Jobs/JobDetail";
import JobCreate from "./pages/Jobs/JobCreate";
import { CvPage } from "./pages/Cv";
import { GoalsPage } from "./pages/Goals";
import { ProfilePage } from "./pages/Profile";
import { LogoutPage } from "./pages/Logout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/molecules/ToastContext";
import { useAuthStore } from "./stores/auth";

const queryClient = new QueryClient();

useAuthStore.getState().hydrateFromStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route
                path="/"
                element={
                  <AuthGuard>
                    <DashboardPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <DashboardPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/jobs"
                element={
                  <AuthGuard>
                    <JobsList />
                  </AuthGuard>
                }
              />
              <Route
                path="/jobs/new"
                element={
                  <AuthGuard>
                    <JobCreate />
                  </AuthGuard>
                }
              />
              <Route
                path="/jobs/:id"
                element={
                  <AuthGuard>
                    <JobDetail />
                  </AuthGuard>
                }
              />
              <Route
                path="/cv"
                element={
                  <AuthGuard>
                    <CvPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/goals"
                element={
                  <AuthGuard>
                    <GoalsPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <ProfilePage />
                  </AuthGuard>
                }
              />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>
);
