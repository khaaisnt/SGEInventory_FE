"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/atoms/button";
import InputImage from "@/components/atoms/inputImage";
import Modal from "@/components/molecules/modal";
import { showErrorToast } from "@/lib/toast";
import { useReturnBorrow } from "@/app/user/borrow/services/returnBorrow.service";

interface ReturnBorrowProps {
  borrowingId: number;
}

export default function ReturnBorrow({ borrowingId }: ReturnBorrowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const { mutate, isPending } = useReturnBorrow();
  const formId = `return-borrow-${borrowingId}`;

  const closeModal = () => {
    if (isPending) return;
    setIsOpen(false);
    setPhoto(null);
    setInputKey((key) => key + 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!photo) {
      showErrorToast("Silakan unggah foto barang yang dikembalikan.");
      return;
    }

    mutate(
      { borrowingId, photo },
      {
        onSuccess: () => {
          setIsOpen(false);
          setPhoto(null);
          setInputKey((key) => key + 1);
        },
      },
    );
  };

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Return Items
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Return Borrowed Items"
        eyebrow="Item Return"
        closeOnBackdrop={!isPending}
        closeOnEscape={!isPending}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={formId}
              disabled={isPending}
              loading={isPending}
            >
              Submit return
            </Button>
          </div>
        }
      >
        <form id={formId} onSubmit={handleSubmit}>
          <p className="mb-4 text-sm text-slate-600">
            Upload a photo of the returned items as proof.
          </p>
          <InputImage
            key={inputKey}
            label="Return photo"
            accept="image/*"
            disabled={isPending}
            onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
          />
        </form>
      </Modal>
    </>
  );
}
