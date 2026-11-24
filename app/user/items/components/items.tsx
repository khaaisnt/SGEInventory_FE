"use client";

import { useGetItems } from "@/app/administrator/items/services/getItems.service";
import Pagination from "@/components/layout/pagination";
import SearchBox from "@/components/molecules/searchbox";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

export default function Items() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 750);
  const { data, isLoading, isError, error, refetch, isFetching } = useGetItems(
    page,
    limit,
    debouncedSearch,
  );
  const items = data?.data ?? [];
  const totalPages = data?.meta?.totalPages || 0;

  const handleSearch = (term: string) => {
    const nextSearch = term.trim();
    setPage(1);
    setSearch(nextSearch);
  };

  return (
    <div>
      <div className="mb-4 sm:mb-8 bg-white rounded-2xl shadow-md p-4 md:p-6">
        <div className="flex gap-2 items-center mb-4 sm:mb-2">
          <div className="bg-primary-100 p-2 rounded-xl">
            <Icon
              icon={"majesticons:checkbox-list-detail"}
              className="text-xl text-primary-900"
            />
          </div>
          <p className="text-xl font-bold text-primary-900">Available Items</p>
        </div>

        <SearchBox
          onValueChange={handleSearch}
          onSearch={handleSearch}
          placeholder="Search for anything..."
          debounceTime={0}
          showButton={false}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="overflow-x-auto pb-4">
          <table className="min-w-full">
            <thead className="bg-primary-600 font-semibold text-white">
              <tr>
                <th
                  scope="col"
                  className="rounded-tl-2xl p-3 text-left whitespace-nowrap"
                >
                  Item Name
                </th>
                <th scope="col" className="p-3 text-left whitespace-nowrap">
                  Stock
                </th>
                <th
                  scope="col"
                  className="p-3 text-left min-w-50 rounded-tr-2xl"
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    Loading items...
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
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    {search
                      ? `There are no matching items "${search}".`
                      : "No items yet."}
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="border border-primary-900 text-primary-900"
                  >
                    <td className="p-3 font-medium whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="p-3 border text-center whitespace-nowrap">
                      {item.totalQuantity}
                    </td>
                    <td className="max-w-xs p-3 border-r min-w-50">
                      {item.description || "-"}
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
