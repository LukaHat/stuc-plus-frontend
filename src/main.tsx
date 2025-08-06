import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage/Homepage.tsx";
import AuthLayout from "./templates/AuthLayout/AuthLayout.tsx";
import { LoginPage } from "./pages/Login/index.ts";
import { RegisterPage } from "./pages/Register/index.ts";
import { CookiesProvider } from "react-cookie";
import { AuthGuard } from "./wrappers/AdminGuard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Homepage />
                </AuthGuard>
              }
            />
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
);
