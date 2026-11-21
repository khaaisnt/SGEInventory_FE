"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Confirmation({
  isOpen,
  onClose,
  children,
  className,
  ariaLabel = "Confirmation",
}: ConfirmationProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={cn(
          "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
