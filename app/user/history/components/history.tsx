"use client";

import { useDebounce } from "@/hooks/useDebounce";
import React, { useState } from "react";
import { useGetHistoryMe } from "../services/getHistoryMe.service";
import { Icon } from "@iconify/react";
import { formatDateWIB } from "@/lib/utils";
import Pagination from "@/components/layout/pagination";

export default function HistoryMe() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 750);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetHistoryMe(page, limit, debouncedSearch);
  const history = data?.data ?? [];
  const totalPages = data?.meta?.totalPages || 0;

  return (
    <div>
      <div></div>
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="flex gap-2 items-center mb-2">
          <div className="bg-primary-100 p-2 rounded-xl">
            <Icon
              icon={"majesticons:checkbox-list-detail"}
              className="text-xl text-primary-900"
            />
          </div>
          <p className="text-xl font-bold text-primary-900">
            Borrowing and Storage Activity Log
          </p>
        </div>
        <div className="overflow-x-auto pb-4">
          <table className="min-w-full">
            <thead className="bg-primary-600 font-semibold text-white">
              <tr>
                <th
                  scope="col"
                  className="rounded-tl-2xl p-3 text-left whitespace-nowrap"
                >
                  Time Activity
                </th>
                <th scope="col" className="p-3 text-left">
                  Request Type
                </th>
                <th scope="col" className="p-3 text-left rounded-tr-2xl">
                  Requests Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    Loading history...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={3}
                    className="p-4 sm:p-6 text-center"
                    role="alert"
                  >
                    <p className="mb-3 text-red-600">
                      {error instanceof Error
                        ? error.message
                        : "Failed to load the list of history."}
                    </p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      disabled={isFetching}
                      className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900 disabled:opacity-50"
                    >
                      {isFetching ? "Loading..." : "Try Again"}
                    </button>
                  </td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    {search
                      ? `There are no matching history "${search}".`
                      : "No history yet."}
                  </td>
                </tr>
              ) : (
                history.map((history) => (
                  <tr
                    key={`${history.type}-${history.createdAt}`}
                    className="border border-primary-900 text-primary-900"
                  >
                    <td className="p-3 border whitespace-nowrap">
                      {formatDateWIB(history.createdAt)}
                    </td>
                    <td className="p-3 border-r">{history.type}</td>
                    <td className="p-3 border">
                      {history.type === "BORROWING"
                        ? history.borrowing.status
                        : history.consignment.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && !isError && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            disabled={isFetching}
          />
        )}
      </div>
    </div>
  );
}
