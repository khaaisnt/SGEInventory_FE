"use client";

import { Icon } from "@iconify/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

type PageItem = number | "ellipsis";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, "ellipsis", totalPages - 1, totalPages];
  }

  return [
    1,
    ...(currentPage > 3 ? (["ellipsis"] as const) : []),
    currentPage - 1,
    currentPage,
    currentPage + 1,
    ...(currentPage < totalPages - 2 ? (["ellipsis"] as const) : []),
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex items-center justify-center gap-3"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage <= 1}
        aria-label="Halaman sebelumnya"
        className="flex size-11 cursor-pointer items-center justify-center rounded-xl bg-primary-600 text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon
          aria-hidden="true"
          icon="material-symbols:chevron-left"
          className="size-7"
        />
      </button>

      <div className="flex min-h-11 items-center gap-1 rounded-xl bg-white px-3 shadow-md">
        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="flex size-10 items-center justify-center font-semibold text-primary-900"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              disabled={disabled}
              aria-current={currentPage === item ? "page" : undefined}
              aria-label={`Halaman ${item}`}
              className={`flex size-10 cursor-pointer items-center justify-center rounded-xl border-2 font-semibold transition-colors disabled:cursor-not-allowed ${
                currentPage === item
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-primary-900 hover:border-primary-200"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages}
        aria-label="Halaman berikutnya"
        className="flex size-11 cursor-pointer items-center justify-center rounded-xl bg-primary-600 text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon
          aria-hidden="true"
          icon="material-symbols:chevron-right"
          className="size-7"
        />
      </button>
    </nav>
  );
}
