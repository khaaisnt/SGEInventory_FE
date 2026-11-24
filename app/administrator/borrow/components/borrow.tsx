"use client";

import { useDebounce } from "@/hooks/useDebounce";
import React, { useState } from "react";
import { useGetBorrows } from "../services/getBorrows.service";
import { formatDateWIB } from "@/lib/utils";
import Pagination from "@/components/layout/pagination";

export default function Borrow() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 750);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetBorrows(page, limit, debouncedSearch);
  const borrow = data?.data ?? [];
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
                  Date
                </th>
                <th scope="col" className="p-3 text-left whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="p-3 text-left whitespace-nowrap">
                  Institution
                </th>
                <th scope="col" className="p-3 text-center whitespace-nowrap">
                  Action
                </th>
                <th
                  scope="col"
                  className="p-3 text-center min-w-50 rounded-tr-2xl"
                >
                  Status Requests
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    Loading borrow request...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 sm:p-6 text-center"
                    role="alert"
                  >
                    <p className="mb-3 text-red-600">
                      {error instanceof Error
                        ? error.message
                        : "Failed to load the list of borrow request."}
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
              ) : borrow.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    {search
                      ? `There are no matching borrow request "${search}".`
                      : "No borrow request yet."}
                  </td>
                </tr>
              ) : (
                borrow.map((borrow) => (
                  <tr
                    key={borrow.id}
                    className="border border-primary-900 text-primary-900"
                  >
                    <td className="p-3 whitespace-nowrap">
                      {formatDateWIB(borrow.createdAt)}
                    </td>
                    <td className="p-3 border whitespace-nowrap">
                      {borrow.user.fullName}
                    </td>
                    <td className="p-3 border whitespace-nowrap">
                      {borrow.lembaga.name}
                    </td>
                    <td className="p-3 border whitespace-nowrap">tes</td>
                    <td className="p-3 border whitespace-nowrap">tes</td>
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
