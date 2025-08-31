import { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({ className, error, ...props }: InputProps) {
  const baseClasses = twMerge(
    "w-full px-3 py-2 rounded-lg border bg-white text-gray-900",
    "placeholder:text-gray-400 placeholder:text-sm",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
    error
      ? "border-error-500 focus:border-error-500 focus:ring-error-500/20 animate-shake"
      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 hover:border-gray-400"
  );

  const classes = twMerge(baseClasses, className);

  return <input className={classes} {...props} />;
}
