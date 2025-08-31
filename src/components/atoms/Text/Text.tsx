import { type TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export default function Text({ className, error, ...props }: TextProps) {
  const baseClasses =
    "input w-full min-h-[100px] px-3 py-2 bg-white text-gray-900 placeholder-gray-400 resize-y transition-all duration-150";
  const errorClasses = error
    ? "border-error-500 focus:border-error-500 focus:ring-error-500/20"
    : "";

  const classes = twMerge(baseClasses, errorClasses, className);

  return <textarea className={classes} {...props} />;
}
