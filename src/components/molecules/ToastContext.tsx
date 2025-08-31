import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import Toast from "../atoms/Toast/Toast";
import { ToastContext } from "./ToastContextDef";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    duration?: number;
  } | null>(null);

  const showToast = useCallback((message: string, duration?: number) => {
    setToast({ message, duration });
  }, []);

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          onClose={handleClose}
          duration={toast.duration}
        />
      )}
    </ToastContext.Provider>
  );
}
