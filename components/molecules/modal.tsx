"use client";

import { Icon } from "@iconify/react";
import { useEffect, useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  className,
  contentClassName,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: ModalProps) {
  const titleId = useId();
  const eyebrowId = useId();

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={eyebrow ? eyebrowId : undefined}
        className={cn(
          "flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-xl sm:p-8",
          className,
        )}
      >
        <header className="mb-5 flex shrink-0 items-start justify-between gap-4 border-b border-primary-900 pb-4">
          <div>
            {eyebrow && (
              <p
                id={eyebrowId}
                className="mb-2 inline-flex justify-center text-center max-w-32 rounded-md bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-900"
              >
                {eyebrow}
              </p>
            )}
            <h2 id={titleId} className="text-2xl font-bold text-primary-900">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-900 cursor-pointer"
          >
            <Icon
              icon="material-symbols:close"
              aria-hidden="true"
              className="size-5"
            />
          </button>
        </header>

        <div className={cn("min-h-0 flex-1 overflow-y-auto", contentClassName)}>
          {children}
        </div>

        {footer && (
          <footer className="mt-5 shrink-0 border-t border-primary-900 pt-4">
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
