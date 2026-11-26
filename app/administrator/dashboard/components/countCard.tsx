"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useGetCountBorrows } from "../services/getCountBorrows.service";
import { useGetCountConsignments } from "../services/getCountConsignments.service";

export default function CountCard() {
  const borrowingQuery = useGetCountBorrows();
  const storageQuery = useGetCountConsignments();

  const borrowingCount = borrowingQuery.data?.data.total;
  const storageCount = storageQuery.data?.data.total;
  const allCountsLoaded = borrowingQuery.isSuccess && storageQuery.isSuccess;

  return (
    <section
      aria-label="Request summary"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.75fr]"
    >
      <RequestCountCard
        title="Borrowing Request"
        icon="material-symbols:assignment-outline"
        count={borrowingQuery.isSuccess ? borrowingCount : undefined}
        isLoading={borrowingQuery.isPending}
        hasError={borrowingQuery.isError}
        onRetry={() => void borrowingQuery.refetch()}
        href="/administrator/borrow"
      />
      <RequestCountCard
        title="Storage Request"
        icon="material-symbols:inventory-2-outline"
        count={storageQuery.isSuccess ? storageCount : undefined}
        isLoading={storageQuery.isPending}
        hasError={storageQuery.isError}
        onRetry={() => void storageQuery.refetch()}
        href="/administrator/storage"
      />
      <RequestCountCard
        title="Total Request"
        icon="material-symbols:inventory-2-outline"
        count={
          allCountsLoaded &&
          borrowingCount !== undefined &&
          storageCount !== undefined
            ? borrowingCount + storageCount
            : undefined
        }
        isLoading={borrowingQuery.isPending || storageQuery.isPending}
        hasError={borrowingQuery.isError || storageQuery.isError}
        onRetry={() => {
          void Promise.all([borrowingQuery.refetch(), storageQuery.refetch()]);
        }}
      />
    </section>
  );
}

interface RequestCountCardProps {
  title: string;
  icon: string;
  count?: number;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
  href?: string;
}

function RequestCountCard({
  title,
  icon,
  count,
  isLoading,
  hasError,
  onRetry,
  href,
}: RequestCountCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 border-b border-primary-900 pb-2 text-primary-900">
        <span className="flex size-8 items-center justify-center rounded-full bg-sky-100 text-xl">
          <Icon icon={icon} aria-hidden="true" />
        </span>
        <h2 className="font-semibold">{title}</h2>
      </div>

      <div
        aria-live="polite"
        className="my-3 flex min-h-20 w-fit min-w-24 items-center justify-center rounded-2xl border border-slate-200 bg-lime-50 px-5 text-4xl font-semibold text-primary-900 shadow-sm"
      >
        {isLoading ? (
          <span className="text-2xl text-slate-400">...</span>
        ) : hasError ? (
          <span className="text-sm text-red-700">Unavailable</span>
        ) : (
          String(count ?? 0).padStart(2, "0")
        )}
      </div>

      {hasError ? (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-semibold text-primary-700 underline cursor-pointer hover:text-primary-900"
        >
          Could not load. Retry
        </button>
      ) : (
        href && (
          <Link
            href={href}
            className="inline-flex rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            Manage requests
          </Link>
        )
      )}
    </article>
  );
}
