"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "@/components/atoms/button";
import Confirmation from "@/components/molecules/confirmation";
import { useDeleteItem } from "../services/deleteItem.service";

interface DeleteItemProps {
  itemId: number;
  itemName: string;
}

export default function DeleteItem({ itemId, itemName }: DeleteItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useDeleteItem();

  const closeModal = () => {
    if (!isPending) setIsModalOpen(false);
  };

  const handleDelete = () => {
    mutate(
      { id: itemId },
      {
        onSuccess: () => setIsModalOpen(false),
      },
    );
  };

  return (
    <>
      <Button
        type="button"
        variant="danger"
        aria-label={`Hapus ${itemName}`}
        onClick={() => setIsModalOpen(true)}
      >
        <Icon icon="bx:trash" aria-hidden="true" className="text-xl" />
      </Button>

      <Confirmation
        isOpen={isModalOpen}
        onClose={closeModal}
        ariaLabel="Konfirmasi hapus item"
      >
        <div className="space-y-5 flex flex-col justify-center items-center mx-auto">
          <div className="bg-accent-red p-2 rounded-2xl text-white">
            <Icon icon="bx:trash" aria-hidden="true" className="text-2xl" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary-900">
              Delete this item?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This action cannot be undone. <br /> Are you sure want to delete
              this item?
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </div>
      </Confirmation>
    </>
  );
}
