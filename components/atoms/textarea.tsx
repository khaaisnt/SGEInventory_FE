"use client";

import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholderIcon?: string;
  error?: string;
  fullWidth?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      placeholderIcon,
      error,
      fullWidth = false,
      labelClassName,
      wrapperClassName,
      className,
      id,
      disabled,
      required,
      rows = 3,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div
        className={cn("flex flex-col", fullWidth && "w-full", wrapperClassName)}
      >
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-2 text-sm font-bold",
              disabled ? "text-gray-400" : "text-primary-900",
              error && "text-red-500",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className={cn("relative", fullWidth && "w-full")}>
          {placeholderIcon && (
            <Icon
              icon={placeholderIcon}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-3.5 top-3 text-xl",
                disabled ? "text-gray-300" : "text-gray-500",
                error && "text-red-500",
              )}
            />
          )}
          <textarea
            {...props}
            id={textareaId}
            ref={ref}
            disabled={disabled}
            required={required}
            rows={rows}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={
              error ? `${textareaId}-error` : props["aria-describedby"]
            }
            className={cn(
              "w-full resize-none rounded-2xl bg-[#efefef] px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-sm placeholder:text-gray-400",
              placeholderIcon && "pl-11",
              !disabled
                ? "text-gray-800 focus:ring-2 focus:ring-primary-600"
                : "text-gray-400",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
          />
        </div>

        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
