"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Icon } from "@iconify/react";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Modal from "@/components/molecules/modal";
import Textarea from "@/components/atoms/textarea";
import type { DataCreateItem } from "../types/items.type";
import { useCreateItem } from "../services/createItem.service";
import { createItemSchema } from "../validations/items.schema";
import Dropdown from "@/components/atoms/dropdown";
import { useGetInstitutions } from "../services/getInstitutions.service";

export default function CreateItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useCreateItem();
  const {
    data: institutionsResponse,
    isLoading: isInstitutionsLoading,
    isError: isInstitutionsError,
    error: institutionsError,
  } = useGetInstitutions(1, 100);
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
      name: "",
      totalQuantity: 1,
      description: "",
      lembagaId: 0,
    },
  });

  const totalQuantity = useWatch({
    control,
    name: "totalQuantity",
  });

  const closeModal = () => {
    if (isPending) return;
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (values: DataCreateItem) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        setIsModalOpen(false);
      },
    });
  };

  const updateQuantity = (change: number) => {
    setValue(
      "totalQuantity",
      Math.max(1, getValues("totalQuantity") + change),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  return (
    <>
      <Button
        type="button"
        className="min-w-28"
        onClick={() => setIsModalOpen(true)}
      >
        Add Item
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add More Item"
        eyebrow="Admin Verification"
        closeOnBackdrop={!isPending}
        closeOnEscape={!isPending}
        footer={
          <div className="flex justify-end">
            <Button type="submit" form="create-item-form" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        }
      >
        <form
          id="create-item-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-1"
        >
          <div className="flex items-end gap-2">
            <Input
              label="Item name"
              placeholder="Input item name"
              fullWidth
              wrapperClassName="mb-0 min-w-0 flex-1"
              {...register("name")}
              error={errors.name?.message}
            />
            <div className="gap-2 mb-3">
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
          <Dropdown
            label="Institution"
            placeholder={"Select an institution"}
            options={(institutionsResponse?.data ?? []).map((institution) => ({
              label: institution.name,
              value: String(institution.id),
            }))}
            disabled={isInstitutionsLoading || isInstitutionsError}
            {...register("lembagaId", {
              setValueAs: (value: string) => (value === "" ? 0 : Number(value)),
            })}
            error={errors.lembagaId?.message}
          />
          {isInstitutionsError && (
            <div
              className="-mt-3 flex items-center justify-between gap-3 text-xs text-red-600"
              role="alert"
            >
              <span>
                {institutionsError instanceof Error
                  ? institutionsError.message
                  : "Gagal memuat daftar lembaga."}
              </span>
            </div>
          )}
          <Textarea
            label="Notes"
            placeholder="Anything we should know about these items?"
            rows={3}
            {...register("description")}
            error={errors.description?.message}
          />
        </form>
      </Modal>
    </>
  );
}
