"use client";

import { Icon } from "@iconify/react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type {
  ChangeEventHandler,
  FormEventHandler,
  InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export interface SearchBoxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "size"
> {
  value?: string;
  defaultValue?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
  onValueChange?: (value: string) => void;
  buttonLabel?: string;
  buttonText?: string;
  showButton?: boolean;
  debounceTime?: number;
  size?: "sm" | "md" | "lg";
  inputClassName?: string;
}

const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      value,
      defaultValue,
      initialValue,
      onChange,
      onValueChange,
      onSearch,
      buttonLabel,
      buttonText,
      showButton = true,
      debounceTime = 300,
      size = "md",
      placeholder = "Search for anything...",
      className,
      inputClassName,
      disabled,
      ...inputProps
    },
    ref,
  ) => {
    const inputId = useId();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [internalValue, setInternalValue] = useState(
      value ?? initialValue ?? defaultValue ?? "",
    );
    const currentValue = value ?? internalValue;

    useEffect(
      () => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      },
      [],
    );

    const scheduleSearch = (query: string) => {
      if (!onSearch || debounceTime <= 0) return;
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        onSearch(query);
        timerRef.current = null;
      }, debounceTime);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const nextValue = event.target.value;
      if (value === undefined) setInternalValue(nextValue);
      onChange?.(event);
      onValueChange?.(nextValue);
      scheduleSearch(nextValue);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      onSearch?.(currentValue.trim());
    };

    const handleClear = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      if (value === undefined) setInternalValue("");
      onValueChange?.("");
      onSearch?.("");
    };

    const sizeClasses = {
      sm: "gap-2 px-3 py-1",
      md: "gap-3 px-4 py-2",
      lg: "gap-4 px-5 py-3",
    };
    const iconSizes = { sm: "size-4", md: "size-6", lg: "size-7" };
    const buttonSizes = {
      sm: "px-4 py-1 text-xs",
      md: "px-5 py-2 text-sm",
      lg: "px-6 py-2.5 text-base",
    };

    return (
      <form
        role="search"
        onSubmit={handleSubmit}
        className={cn(
          "flex w-full items-center rounded-xl border border-slate-400 bg-white shadow-sm transition-colors focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100",
          sizeClasses[size],
          disabled && "cursor-not-allowed bg-gray-100 opacity-70",
          className,
        )}
      >
        <label htmlFor={inputId} className="sr-only">
          Search
        </label>
        <Icon
          icon="material-symbols:search"
          aria-hidden="true"
          className={cn(iconSizes[size], "shrink-0 text-primary-900")}
        />
        <input
          {...inputProps}
          id={inputId}
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent text-sm text-primary-900 outline-none placeholder:text-primary-600 focus:ring-0 disabled:cursor-not-allowed",
            size === "sm" && "text-xs",
            size === "lg" && "text-base",
            inputClassName,
          )}
        />
        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-1 text-slate-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon
              icon="material-symbols:close"
              aria-hidden="true"
              className="size-4"
            />
          </button>
        )}
        {showButton && (
          <button
            type="submit"
            disabled={disabled}
            className={cn(
              "shrink-0 rounded-full bg-primary-600 font-semibold text-white shadow-md transition-colors hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              buttonSizes[size],
            )}
          >
            {buttonText ?? buttonLabel ?? "Search"}
          </button>
        )}
      </form>
    );
  },
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
