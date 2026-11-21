"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Textarea from "@/components/atoms/textarea";
import Confirmation from "@/components/molecules/confirmation";
import Modal from "@/components/molecules/modal";
import type { Item, DataCreateItem } from "../types/items.type";
import { useUpdateItem } from "../services/updateItem.service";
import { createItemSchema } from "../validations/items.schema";

interface UpdateItemProps {
  item: Item;
}

export default function UpdateItem({ item }: UpdateItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { mutate, isPending } = useUpdateItem();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<DataCreateItem>({
    resolver: yupResolver(createItemSchema),
    defaultValues: {
      name: item.name,
      description: item.description ?? "",
      totalQuantity: item.totalQuantity,
    },
  });
  const totalQuantity = useWatch({
    control,
    name: "totalQuantity",
  });

  const openModal = () => {
    reset({
      name: item.name,
      description: item.description ?? "",
      totalQuantity: item.totalQuantity,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isPending) return;
    setIsConfirmationOpen(false);
    setIsModalOpen(false);
  };

  const updateQuantity = (change: number) => {
    setValue(
      "totalQuantity",
      Math.max(1, getValues("totalQuantity") + change),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const confirmUpdate = () => {
    mutate(
      { id: item.id, ...getValues() },
      {
        onSuccess: () => {
          setIsConfirmationOpen(false);
          setIsModalOpen(false);
        },
      },
    );
  };

  return (
    <>
      <Button
        type="button"
        variant="primary"
        aria-label={`Edit ${item.name}`}
        onClick={openModal}
      >
        <Icon
          icon="material-symbols:edit-outline"
          aria-hidden="true"
          className="text-xl"
        />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Edit Item"
        eyebrow="Admin Verification"
        closeOnBackdrop={!isPending && !isConfirmationOpen}
        closeOnEscape={!isPending && !isConfirmationOpen}
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
              form={`update-item-form-${item.id}`}
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        }
      >
        <form
          id={`update-item-form-${item.id}`}
          onSubmit={handleSubmit(() => setIsConfirmationOpen(true))}
          className="space-y-4"
        >
          <div className="flex items-end gap-2">
            <Input
              label="Item name"
              placeholder="Input item name"
              fullWidth
              required
              wrapperClassName="mb-0 min-w-0 flex-1"
              {...register("name")}
              error={errors.name?.message}
            />
            <div className="mb-3 flex shrink-0 flex-col gap-2">
              <div
                role="group"
                aria-label="Total quantity"
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => updateQuantity(-1)}
                  disabled={totalQuantity <= 1}
                  aria-label="Kurangi total quantity"
                  className="flex size-6 cursor-pointer items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed"
                >
                  <Icon
                    aria-hidden="true"
                    icon="material-symbols:remove"
                    className="size-5"
                  />
                </button>
                <span
                  aria-live="polite"
                  aria-label={`Total quantity ${totalQuantity}`}
                  className="w-6 text-center font-semibold text-primary-900"
                >
                  {totalQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(1)}
                  aria-label="Tambah total quantity"
                  className="flex size-6 cursor-pointer items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-900"
                >
                  <Icon
                    aria-hidden="true"
                    icon="material-symbols:add"
                    className="size-5"
                  />
                </button>
              </div>
            </div>
          </div>
          {errors.totalQuantity?.message && (
            <p className="-mt-3 text-xs text-red-500" role="alert">
              {errors.totalQuantity.message}
            </p>
          )}
          <Textarea
            label="Description"
            placeholder="Add item description"
            rows={4}
            {...register("description")}
            error={errors.description?.message}
          />
        </form>
      </Modal>

      <Confirmation
        isOpen={isConfirmationOpen}
        onClose={() => {
          if (!isPending) setIsConfirmationOpen(false);
        }}
        ariaLabel="Konfirmasi perubahan item"
      >
        <div className="space-y-5 flex flex-col justify-center items-center mx-auto">
          <div className="bg-primary-600 p-2 rounded-2xl text-white">
            <Icon
              icon="material-symbols:edit-outline"
              aria-hidden="true"
              className="text-2xl"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary-900">
              Save these changes?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You are updating the item detail. <br />
              The new detail will shown to all users right away
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsConfirmationOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="button" onClick={confirmUpdate} disabled={isPending}>
              {isPending ? "Saving..." : "Confirm"}
            </Button>
          </div>
        </div>
      </Confirmation>
    </>
  );
}
