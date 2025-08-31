import React from "react";
import { createPortal } from "react-dom";
type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};
export default function Modal({ open, onClose, children, size = "md" }: Props) {
  if (!open) return null;
  const width =
    size === "sm" ? "max-w-md" : size === "lg" ? "max-w-3xl" : "max-w-2xl";
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative w-full ${width} mx-4`}>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
