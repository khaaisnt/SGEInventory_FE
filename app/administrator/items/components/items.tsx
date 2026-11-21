"use client";

import { Icon } from "@iconify/react";
import { useGetItems } from "../services/getItems.service";
import CreateItem from "./create-item";

export default function Items() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetItems();
  const items = data?.data ?? [];

  return (
    <div>
      <div className="mb-8 bg-white rounded-2xl shadow-md p-6">
        <div className="flex gap-2 items-center mb-2">
          <div className="bg-primary-100 p-2 rounded-xl">
            <Icon
              icon={"majesticons:checkbox-list-detail"}
              className="text-xl text-primary-900"
            />
          </div>
          <p className="text-xl font-bold text-primary-900">Available Items</p>
        </div>

        <div>
            <CreateItem />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-primary-600 font-semibold text-white">
              <tr>
                <th scope="col" className="rounded-tl-2xl p-3 text-left">
                  Item Name
                </th>
                <th scope="col" className="p-3 text-left">
                  Origin
                </th>
                <th scope="col" className="p-3 text-left">
                  Notes
                </th>
                <th scope="col" className="p-3 text-center">
                  Quantity
                </th>
                <th scope="col" className="rounded-tr-2xl p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    Loading items...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center" role="alert">
                    <p className="mb-3 text-red-600">
                      {error instanceof Error
                        ? error.message
                        : "Gagal memuat daftar barang."}
                    </p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      disabled={isFetching}
                      className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900 disabled:opacity-50"
                    >
                      {isFetching ? "Memuat..." : "Coba lagi"}
                    </button>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    Belum ada barang.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="border border-primary-900  text-primary-900"
                  >
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 border-l">-</td>
                    <td className="max-w-xs p-3 border">
                      {item.description || "-"}
                    </td>
                    <td className="p-3 border-r text-center">
                      {item.totalQuantity}
                    </td>
                    <td className="p-3">-</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
