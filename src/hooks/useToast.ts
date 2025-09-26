import { useContext } from "react";
import { ToastContext } from "../components/molecules/ToastContextDef";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
