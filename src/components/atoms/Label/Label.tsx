import { type LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

export default function Label({
  children,
  className,
  error,
  ...props
}: React.PropsWithChildren<LabelProps>) {
  const baseClasses =
    "label block text-sm font-medium transition-colors duration-150";
  const colorClasses = error ? "text-error-500" : "text-gray-700";

  const classes = twMerge(baseClasses, colorClasses, className);

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
}
