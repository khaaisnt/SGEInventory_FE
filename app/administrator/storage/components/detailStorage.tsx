"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import Badge from "@/components/atoms/badge";
import Button from "@/components/atoms/button";
import Modal from "@/components/molecules/modal";
import { formatDateWIB } from "@/lib/utils";
import { useApproveStorage } from "../services/approveStorage.service";
import { useGetStorage } from "../services/getStorage.service";
import { useRejectStorage } from "../services/rejectStorage.service";
import type { Storage } from "../types/storage.type";
import Image from "next/image";

interface DetailStorageProps {
  storage: Storage;
}

export default function DetailStorage({ storage }: DetailStorageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetStorage(storage.id, isModalOpen);
  const { mutate: approveStorage, isPending: isApproving } =
    useApproveStorage();
  const { mutate: rejectStorage, isPending: isRejecting } = useRejectStorage();
  const isPending = isApproving || isRejecting;
  const detail = response?.data ?? storage;
  const canReview = detail.status.trim().toUpperCase() === "PENDING";
  const photoName =
    detail.photoUrl?.split(/[?#]/)[0].split("/").pop() || "View uploaded photo";
  const backendBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "");
  const photoUrl = detail.photoUrl
    ? /^https?:\/\//i.test(detail.photoUrl)
      ? detail.photoUrl
      : backendBaseUrl
        ? `${backendBaseUrl}/${detail.photoUrl.replace(/^\/+/, "")}`
        : null
    : null;

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
        title="Storage Review"
        eyebrow="Admin Verification"
        className="max-w-xl"
        closeOnBackdrop={!isPending}
        closeOnEscape={!isPending}
        footer={
          !isLoading && !isError && canReview ? (
            <div className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="danger"
                onClick={() =>
                  rejectStorage(detail.id, {
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
                  approveStorage(detail.id, {
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
            Loading storage details...
          </p>
        ) : isError ? (
          <div className="py-6 text-center" role="alert">
            <p className="mb-4 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Failed to load storage details."}
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
                label="Start Date"
                value={formatDateWIB(detail.startDate)}
              />
              <DetailField
                label="End Date"
                value={formatDateWIB(detail.endDate)}
              />
            </div>

            <section aria-labelledby={`storage-items-${detail.id}`}>
              <h3
                id={`storage-items-${detail.id}`}
                className="mb-2 text-left text-sm text-slate-500"
              >
                Items to Store
              </h3>
              <ul className="space-y-2">
                {detail.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 shadow-sm"
                  >
                    <span className="font-semibold text-primary-900">
                      {item.name}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-2xl bg-primary-900 font-bold text-white">
                      {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-left text-sm text-slate-500">
                Item Photo
              </h3>
              {photoUrl ? (
                <a
                  href={photoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-2xl border-2 border-dashed border-primary-600 bg-slate-100 p-2 transition-colors hover:bg-primary-100/60"
                >
                  <Image
                    src={photoUrl}
                    alt={`Uploaded item: ${photoName}`}
                    loading="lazy"
                    className="max-h-64 w-full rounded-xl object-contain"
                    width={300}
                    height={300}
                  />
                  <span className="flex items-center justify-between gap-2 px-2 py-2 text-sm text-primary-900">
                    <span className="truncate font-semibold">{photoName}</span>
                    <Icon
                      icon="material-symbols:open-in-new"
                      aria-hidden="true"
                      className="size-5 shrink-0 text-primary-600"
                    />
                  </span>
                </a>
              ) : detail.photoUrl ? (
                <p className="rounded-2xl bg-slate-100 p-4 text-sm text-red-600">
                  Backend photo URL is unavailable. Check NEXT_PUBLIC_BASE_URL.
                </p>
              ) : (
                <p className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-500">
                  No photo provided.
                </p>
              )}
            </section>

            <section>
              <h3 className="mb-2 text-left text-sm text-slate-500">Notes</h3>
              <p className="min-h-20 rounded-2xl border border-slate-200 bg-slate-100 p-4 text-left text-sm text-primary-900 shadow-sm">
                {detail.notes || "-"}
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
