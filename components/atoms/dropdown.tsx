"use client";

import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  (
    {
      options,
      label,
      placeholder = "Pilih opsi",
      error,
      fullWidth = false,
      labelClassName,
      wrapperClassName,
      className,
      id,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div
        className={cn(
          "flex flex-col",
          fullWidth && "w-full",
          wrapperClassName,
        )}
      >
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "mb-2 text-sm",
              disabled ? "text-gray-400" : "text-gray-700",
              error && "text-red-500",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className={cn("relative", fullWidth && "w-full")}>
          <select
            {...props}
            id={selectId}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${selectId}-error` : undefined}
            className={cn(
              "w-full appearance-none rounded-2xl bg-[#efefef] px-4 py-2.5 pr-10 outline-none transition-all duration-200",
              !disabled
                ? "text-gray-800 focus:ring-2 focus:ring-primary-600"
                : "text-gray-400",
              error && "focus:ring-red-500",
              className,
            )}
          >
            <option value="" disabled={required}>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <Icon
            icon="material-symbols:keyboard-arrow-down-rounded"
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2",
              disabled ? "text-gray-400" : "text-gray-600",
            )}
          />
        </div>

        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export default Dropdown;