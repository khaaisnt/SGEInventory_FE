"use client";

import Button from "@/components/atoms/button";
import { useState } from "react";
import Modal from "@/components/molecules/modal";
import Badge from "@/components/atoms/badge";
import type { Borrow } from "../types/borrow.type";
import { useGetborrow } from "../services/getBorrow.service";
import { useApproveBorrow } from "../services/approveBorrow.service";
import { useRejectBorrow } from "../services/rejectBorrow.service";
import { formatDateWIB } from "@/lib/utils";

interface DetailBorrowProps {
  borrow: Borrow;
}

export default function DetailBorrow({ borrow }: DetailBorrowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetborrow(borrow.id, isModalOpen);
  const { mutate: approveBorrow, isPending: isApproving } = useApproveBorrow();
  const { mutate: rejectBorrow, isPending: isRejecting } = useRejectBorrow();
  const isPending = isApproving || isRejecting;
  const detail = response?.data ?? borrow;
  const canReview = detail.status.trim().toUpperCase() === "PENDING";

  const closeModal = () => {
    if (!isPending) setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Detail
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Borrowing Review"
        eyebrow="Admin Verification"
        closeOnBackdrop={!isPending}
        closeOnEscape={!isPending}
        footer={
          !isLoading && !isError && canReview ? (
            <div className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="danger"
                onClick={() =>
                  rejectBorrow(detail.id, {
                    onSuccess: () => setIsModalOpen(false),
                  })
                }
                disabled={isPending}
                loading={isRejecting}
                className="min-w-24 rounded-full"
              >
                Reject
              </Button>
              <Button
                type="button"
                variant="success"
                onClick={() =>
                  approveBorrow(detail.id, {
                    onSuccess: () => setIsModalOpen(false),
                  })
                }
                disabled={isPending}
                loading={isApproving}
                className="min-w-24 rounded-full"
              >
                Approve
              </Button>
            </div>
          ) : null
        }
      >
        {isLoading ? (
          <p className="py-8 text-center text-slate-500">
            Loading borrow details...
          </p>
        ) : isError ? (
          <div className="py-6 text-center" role="alert">
            <p className="mb-4 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Failed to load borrow details."}
            </p>
            <Button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Try again"}
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailField label="Name" value={detail.user.fullName} />
              <DetailField label="Institution" value={detail.lembaga.name} />
              <DetailField label="Contact" value={detail.user.contact} />
              <DetailField label="Student ID" value={detail.user.nim} />
              <DetailField
                label="Pick Up Date"
                value={formatDateWIB(detail.pickUpDate)}
              />
              <DetailField
                label="Return Date"
                value={formatDateWIB(detail.returnDate)}
              />
            </div>

            <section aria-labelledby={`borrow-items-${detail.id}`}>
              <h3
                id={`borrow-items-${detail.id}`}
                className="mb-2 text-sm text-slate-500 text-left"
              >
                Items to Borrow
              </h3>
              <ul className="space-y-2">
                {detail.items.map((item) => (
                  <li
                    key={item.itemId}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 shadow-sm"
                  >
                    <span className="font-semibold text-primary-900">
                      {item.itemName}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-2xl bg-primary-900 font-bold text-white">
                      {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-sm text-slate-500 text-left">Purpose</h3>
              <p className="min-h-20 text-left rounded-2xl border border-slate-200 bg-slate-100 p-4 text-sm text-primary-900 shadow-sm">
                {detail.purpose || "-"}
              </p>
            </section>

            {!canReview && (
              <div className="flex justify-center">
                <Badge status={detail.status} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

function DetailField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="text-left">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-primary-900">{value || "-"}</p>
    </div>
  );
}
