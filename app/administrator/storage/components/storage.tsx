"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { useGetStorages } from "../services/getStorages.service";
import { formatDateWIB } from "@/lib/utils";
import Badge from "@/components/atoms/badge";
import Pagination from "@/components/layout/pagination";

export default function Storage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 750);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetStorages(page, limit, debouncedSearch);
  const storage = data?.data ?? [];
  const totalPages = data?.meta?.totalPages || 0;

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
                <th scope="col" className="p-3 text-center">
                  Status Requests
                </th>
                <th
                  scope="col"
                  className="p-3 text-center whitespace-nowrap rounded-tr-2xl"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
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
              ) : storage.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    {search
                      ? `There are no matching storage request "${search}".`
                      : "No storage request yet."}
                  </td>
                </tr>
              ) : (
                storage.map((storage) => (
                  <tr
                    key={storage.id}
                    className="border border-primary-900 text-primary-900"
                  >
                    <td className="p-3 whitespace-nowrap">
                      {formatDateWIB(storage.createdAt)}
                    </td>
                    <td className="p-3 border whitespace-nowrap">
                      {storage.user.fullName}
                    </td>
                    <td className="p-3 border whitespace-nowrap">
                      {storage.lembaga.name}
                    </td>
                    <td className="p-3 border text-center whitespace-nowrap">
                      <Badge status={storage.status} />
                    </td>
                    <td className="p-3 border text-center whitespace-nowrap">
                      {/* <DetailStorage storage={storage} /> */}
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
