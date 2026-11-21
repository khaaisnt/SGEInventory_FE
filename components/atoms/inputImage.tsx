"use client";

import { forwardRef, useId } from "react";
import type { ChangeEventHandler, InputHTMLAttributes } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface InputImageProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
  dropzoneClassName?: string;
}

const InputImage = forwardRef<HTMLInputElement, InputImageProps>(
  (
    {
      label = "Item Photo",
      error,
      fullWidth = false,
      wrapperClassName,
      dropzoneClassName,
      id,
      accept = "image/*",
      disabled,
      required,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event);
    };

    return (
      <div
        className={cn(
          "mb-4 flex flex-col",
          fullWidth && "w-full",
          wrapperClassName,
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            "mb-2 text-sm font-bold",
            disabled ? "text-gray-400" : "text-primary-900",
            error && "text-red-500",
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        <div
          className={cn(
            "relative flex min-h-[88px] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary-600 bg-[#efefef] px-4 py-4 text-center text-primary-900 transition-colors",
            !disabled && "hover:bg-primary-100/60",
            disabled && "cursor-not-allowed opacity-60",
            error && "border-red-500",
            fullWidth && "w-full",
            dropzoneClassName,
          )}
        >
          <Icon
            icon="material-symbols:photo-camera-outline"
            aria-hidden="true"
            className="mb-1 size-6"
          />
          <span className="text-sm font-semibold">
            Click to upload a photo
          </span>
          <input
            {...props}
            id={inputId}
            ref={ref}
            type="file"
            accept={accept}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputImage.displayName = "InputImage";

export default InputImage;