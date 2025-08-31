import { createElement, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  weight?: "normal" | "medium" | "semibold" | "bold";
}

export default function Heading({
  children,
  className,
  level = 1,
  weight = "bold",
  ...props
}: React.PropsWithChildren<HeadingProps>) {
  const sizeClasses = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const baseClasses = "font-display text-gray-900";
  const classes = twMerge(
    baseClasses,
    sizeClasses[level],
    weightClasses[weight],
    className
  );

  return createElement(`h${level}`, { className: classes, ...props }, children);
}
