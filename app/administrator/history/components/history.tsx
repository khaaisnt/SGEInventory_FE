"use client";

import { useDebounce } from "@/hooks/useDebounce";
import React, { useState } from "react";
import { useGetHistory } from "../services/getHistory.service";
import { formatDateWIB } from "@/lib/utils";
import Pagination from "@/components/layout/pagination";

const History = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 750);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetHistory(page, limit, debouncedSearch);
  const history = data?.data ?? [];
  const totalPages = data?.meta?.totalPages || 0;

  const handleSearch = (term: string) => {
    const nextSearch = term.trim();
    setPage(1);
    setSearch(nextSearch);
  };

  return (
    <div>
      <div></div>

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="overflow-x-auto pb-4">
          <table className="min-w-full">
            <thead className="bg-primary-600 font-semibold text-white">
              <tr>
                <th
                  scope="col"
                  className="rounded-tl-2xl p-3 text-left whitespace-nowrap"
                >
                  Name
                </th>
                <th scope="col" className="p-3 text-left whitespace-nowrap">
                  Time Activity
                </th>
                <th
                  scope="col"
                  className="p-3 text-left min-w-50 rounded-tr-2xl"
                >
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
                        : "Failed to load the list of items."}
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
                    key={history.id}
                    className="border border-primary-900 text-primary-900"
                  >
                    <td className="p-3 whitespace-nowrap">
                      {history.actor.fullName}
                    </td>
                    <td className="p-3 border whitespace-nowrap">
                      {formatDateWIB(history.createdAt)}
                    </td>
                    <td className="p-3 border-r">{history.requestType}</td>
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
};

export default History;
