"use client";

import Image from "next/image";
import { forwardRef, useEffect, useId, useState } from "react";
import type { ChangeEventHandler, InputHTMLAttributes } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface InputImageProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      };
    }, [previewUrl]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const file = event.target.files?.[0];
      setPreviewUrl(
        file?.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      );
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
            "relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary-600 bg-[#efefef] px-4 py-4 text-center text-primary-900 transition-colors",
            previewUrl ? "min-h-56" : "min-h-22",
            !disabled && "hover:bg-primary-100/60",
            disabled && "cursor-not-allowed opacity-60",
            error && "border-red-500",
            fullWidth && "w-full",
            dropzoneClassName,
          )}
        >
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Selected photo preview"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain p-2"
              />
              <span className="absolute inset-x-0 bottom-0 z-1 bg-black/55 px-3 py-2 text-sm font-semibold text-white">
                Click to change photo
              </span>
            </>
          ) : (
            <>
              <Icon
                icon="material-symbols:photo-camera-outline"
                aria-hidden="true"
                className="mb-1 size-6"
              />
              <span className="text-sm font-semibold">
                Click to upload a photo
              </span>
            </>
          )}
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
