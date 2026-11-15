"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, Ref, TextareaHTMLAttributes } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholderIcon?: string;
  error?: string;
  fullWidth?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
  multiline?: boolean;
  rows?: number;
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof InputHTMLAttributes<HTMLInputElement>
  >;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      placeholderIcon,
      error,
      fullWidth = false,
      className,
      labelClassName,
      wrapperClassName,
      id,
      disabled,
      required,
      multiline = false,
      rows = 3,
      textareaProps,
      placeholder,
      defaultValue,
      value,
      ...props
    },
    ref,
  ) => {
    const inputId = id;

    const fieldClassName = cn(
      "bg-[#efefef] rounded-[16px] px-4 py-2.5 outline-none transition-all duration-200",
      placeholderIcon && "pl-11",
      "placeholder:text-gray-400 placeholder:text-sm",
      !disabled
        ? "text-gray-800 focus:ring-2 focus:ring-primary-600"
        : "text-gray-400",
      error && "border-red-500 focus:ring-red-500",
      fullWidth && "w-full",
      className,
    );

    return (
      <div
        className={cn(
          "flex flex-col mb-4",
          fullWidth && "w-full",
          wrapperClassName,
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
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

        {/* wrapper relative untuk posisi ikon */}
        <div className={cn("relative", fullWidth && "w-full")}>
          {placeholderIcon && (
            <Icon
              icon={placeholderIcon}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-3.5 text-xl",
                multiline ? "top-3" : "top-1/2 -translate-y-1/2",
                disabled ? "text-gray-300" : "text-gray-500",
                error && "text-red-500",
              )}
            />
          )}

          {multiline ? (
            <textarea
              id={inputId}
              ref={ref as Ref<HTMLTextAreaElement>}
              disabled={disabled}
              required={required}
              rows={rows}
              placeholder={placeholder}
              defaultValue={defaultValue}
              value={value}
              className={cn(fieldClassName, "resize-none")}
              {...textareaProps}
            />
          ) : (
            <input
              id={inputId}
              ref={ref as Ref<HTMLInputElement>}
              disabled={disabled}
              required={required}
              placeholder={placeholder}
              defaultValue={defaultValue}
              value={value}
              className={fieldClassName}
              {...props}
            />
          )}
        </div>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
