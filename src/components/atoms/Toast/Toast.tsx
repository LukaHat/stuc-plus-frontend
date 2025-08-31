import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  type?: "success" | "error" | "warning" | "info";
}

export default function Toast({
  message,
  onClose,
  duration = 3000,
  type = "info",
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeClasses = {
    success: "bg-success-500 text-white",
    error: "bg-error-500 text-white",
    warning: "bg-warning-500 text-white",
    info: "bg-primary-500 text-white",
  };

  const classes = twMerge(
    "fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out",
    typeClasses[type]
  );

  return (
    <div className={classes} role="alert">
      {message}
    </div>
  );
}
