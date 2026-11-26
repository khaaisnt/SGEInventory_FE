"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Badge from "@/components/atoms/badge";
import Button from "@/components/atoms/button";
import Modal from "@/components/molecules/modal";
import type { HistoryMe } from "@/app/user/history/types/history.type";
import { formatDateWIB } from "@/lib/utils";

interface DetailModalProps {
  request: HistoryMe;
}

export default function DetailModal({ request }: DetailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isBorrowing = request.type === "BORROWING";
  const detail = isBorrowing ? request.borrowing : request.consignment;
  const items = isBorrowing
    ? request.borrowing.items.map((item) => ({
        id: item.itemId,
        name: item.itemName,
        quantity: item.quantity,
      }))
    : request.consignment.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      }));

  return (
    <>
      <Button type="button" size="sm" onClick={() => setIsOpen(true)}>
        Detail
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          isBorrowing ? "Borrow Request Details" : "Storage Request Details"
        }
        eyebrow={isBorrowing ? "Borrow" : "Storage"}
        className="max-w-lg"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailField label="Institution" value={detail.lembaga.name} />
            <DetailField label="Status">
              <Badge status={detail.status} />
            </DetailField>
            {isBorrowing ? (
              <>
                <DetailField
                  label="Pick Up Date"
                  value={formatDateWIB(request.borrowing.pickUpDate)}
                />
                <DetailField
                  label="Return Date"
                  value={formatDateWIB(request.borrowing.returnDate)}
                />
              </>
            ) : (
              <>
                <DetailField
                  label="Program Name"
                  value={request.consignment.eventName}
                />
                <DetailField
                  label="Start Date"
                  value={formatDateWIB(request.consignment.startDate)}
                />
                <DetailField
                  label="End Date"
                  value={formatDateWIB(request.consignment.endDate)}
                />
              </>
            )}
          </div>

          <section>
            <h3 className="mb-2 text-sm text-slate-500">
              {isBorrowing ? "Items to Borrow" : "Items to Store"}
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3"
                >
                  <span className="font-semibold text-primary-900">
                    {item.name}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary-900 font-bold text-white">
                    {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {isBorrowing ? (
            <DetailField label="Purpose" value={request.borrowing.purpose} />
          ) : (
            <>
              {request.consignment.photoUrl && (
                <section>
                  <h3 className="mb-2 text-sm text-slate-500">Item Photo</h3>
                  <Image
                    src={request.consignment.photoUrl}
                    alt={`Uploaded photo for ${request.consignment.eventName}`}
                    width={640}
                    height={480}
                    className="h-64 w-full rounded-xl bg-slate-100 object-contain"
                  />
                </section>
              )}
              <DetailField label="Notes" value={request.consignment.notes} />
            </>
          )}

          {isBorrowing && request.borrowing.returnPhotoUrl && (
            <section>
              <h3 className="mb-2 text-sm text-slate-500">Return Photo</h3>
              <Image
                src={request.borrowing.returnPhotoUrl}
                alt="Photo of returned items"
                width={640}
                height={480}
                className="h-64 w-full rounded-xl bg-slate-100 object-contain"
              />
            </section>
          )}
        </div>
      </Modal>
    </>
  );
}

function DetailField({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="mb-1 text-sm text-slate-500">{label}</p>
      {children ?? (
        <p className="font-medium text-primary-900">{value || "-"}</p>
      )}
    </div>
  );
}
