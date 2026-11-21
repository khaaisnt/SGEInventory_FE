"use client";

import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholderIcon?: string;
  error?: string;
  fullWidth?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      type = "text",
      placeholder,
      defaultValue,
      value,
      ...props
    },
    ref,
  ) => {
    const inputId = id;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === "password";

    const fieldClassName = cn(
      "bg-[#efefef] rounded-[16px] px-4 py-2.5 outline-none transition-all duration-200",
      placeholderIcon && "pl-11",
      isPassword && "pr-11",
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
                "top-1/2 -translate-y-1/2",
                disabled ? "text-gray-300" : "text-gray-500",
                error && "text-red-500",
              )}
            />
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            type={isPassword && isPasswordVisible ? "text" : type}
            className={fieldClassName}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              disabled={disabled}
              aria-label={
                isPasswordVisible
                  ? "Sembunyikan password"
                  : "Tampilkan password"
              }
              aria-pressed={isPasswordVisible}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon
                icon={
                  isPasswordVisible
                    ? "material-symbols:visibility-off-outline"
                    : "material-symbols:visibility-outline"
                }
                aria-hidden="true"
                className="size-5"
              />
            </button>
          )}
        </div>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
