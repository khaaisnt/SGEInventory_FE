"use client";

import { Icon } from "@iconify/react";
import Header from "@/components/layout/header";
import InfoCard from "./components/infoCard";
import { useGetHistoryMe } from "@/app/user/history/services/getHistoryMe.service";

const DashboardUser = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetHistoryMe(1, 20, "");
  const history = data?.data ?? [];
  const borrowingRequests = history.filter(
    (request) => request.type === "BORROWING",
  );
  const consignmentRequests = history.filter(
    (request) => request.type === "CONSIGNMENT",
  );

  return (
    <main>
      <section>
        <Header title="Hello, there!" subtitle="Here's your request overview" />

        {isError ? (
          <div
            className="mt-8 rounded-2xl bg-white p-6 text-center shadow-md"
            role="alert"
          >
            <p className="mb-3 text-red-600">
              {error instanceof Error
                ? error.message
                : "Failed to load request history."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900 disabled:opacity-50"
            >
              {isFetching ? "Loading..." : "Try again"}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-8">
            <section className="min-w-0 rounded-2xl bg-white p-4 shadow-md sm:p-5">
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-xl bg-primary-100 p-2">
                  <Icon
                    icon="coolicons:clipboard-list"
                    className="text-xl text-primary-900"
                  />
                </div>
                <p className="text-xl font-bold text-primary-900">
                  Borrow Request
                </p>
              </div>
              <hr className="rounded-full border-t-2 border-primary-900" />
              <div className="mt-4 space-y-3">
                {isLoading ? (
                  <p className="py-4 text-center text-sm text-slate-500">
                    Loading requests...
                  </p>
                ) : borrowingRequests.length ? (
                  borrowingRequests.map((request) => (
                    <InfoCard
                      key={`${request.type}-${request.borrowing.id}`}
                      request={request}
                    />
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-slate-500">
                    No borrowing requests yet.
                  </p>
                )}
              </div>
            </section>

            <section className="min-w-0 rounded-2xl bg-white p-4 shadow-md sm:p-5">
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-xl bg-primary-100 p-2">
                  <Icon
                    icon="keyline-icons:package-plus"
                    className="text-xl text-primary-900"
                  />
                </div>
                <p className="text-xl font-bold text-primary-900">
                  Storage Request
                </p>
              </div>
              <hr className="rounded-full border-t-2 border-primary-900" />
              <div className="mt-4 space-y-3">
                {isLoading ? (
                  <p className="py-4 text-center text-sm text-slate-500">
                    Loading requests...
                  </p>
                ) : consignmentRequests.length ? (
                  consignmentRequests.map((request) => (
                    <InfoCard
                      key={`${request.type}-${request.consignment.id}`}
                      request={request}
                    />
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-slate-500">
                    No storage requests yet.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
};

export default DashboardUser;
