"use client";

import Input from "@/components/atoms/input";
import Textarea from "@/components/atoms/textarea";
import Header from "@/components/layout/header";
import { useState } from "react";
import type { FormEvent } from "react";
import { Icon } from "@iconify/react";
import Dropdown from "@/components/atoms/dropdown";
import Button from "@/components/atoms/button";
import { useRequestBorrow } from "./services/requestBorrow.service";
import type { DataReqBorrow } from "./types/borrow.type";
import { useGetInstitutions } from "@/app/administrator/items/services/getInstitutions.service";
import { useGetItems } from "@/app/administrator/items/services/getItems.service";

const BorrowPage = () => {
  const [lembagaId, setLembagaId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [borrowItems, setBorrowItems] = useState([
    { id: 1, value: "", quantity: 1 },
  ]);
  const {
    data: institutionsResponse,
    isLoading: isInstitutionsLoading,
    isError: isInstitutionsError,
    error: institutionsError,
    refetch: refetchInstitutions,
    isFetching: isInstitutionsFetching,
  } = useGetInstitutions(1, 100);
  const {
    data: itemsResponse,
    isLoading: isItemsLoading,
    isError: isItemsError,
    error: itemsError,
    refetch: refetchItems,
    isFetching: isItemsFetching,
  } = useGetItems(1, 100, "");
  const { mutate, isPending } = useRequestBorrow();
  const institutions = institutionsResponse?.data ?? [];
  const availableItems = itemsResponse?.data ?? [];

  const addBorrowItem = () => {
    setBorrowItems((items) => [
      ...items,
      { id: items.length + 1, value: "", quantity: 1 },
    ]);
  };

  const updateQuantity = (id: number, change: number) => {
    setBorrowItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const updateItem = (id: number, value: string) => {
    setBorrowItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, value, quantity: 1 } : item,
      ),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request: DataReqBorrow = {
      purpose: purpose.trim(),
      lembagaId: Number(lembagaId),
      pickUpDate,
      returnDate,
      items: borrowItems.map((item) => ({
        itemId: Number(item.value),
        quantity: item.quantity,
      })),
    };

    mutate(request, {
      onSuccess: () => {
        setLembagaId("");
        setPurpose("");
        setPickUpDate("");
        setReturnDate("");
        setBorrowItems([{ id: 1, value: "", quantity: 1 }]);
      },
    });
  };

  const getAvailableQuantity = (itemId: string) =>
    availableItems.find((item) => item.id === Number(itemId))
      ?.availableQuantity ?? 0;

  return (
    <main>
      <Header
        title="Borrow"
        subtitle="Complete the form below to request the items you need!"
      />
      <form onSubmit={handleSubmit}>
        <div className="mt-8 flex flex-col gap-5">
          <section
            aria-labelledby="institution-heading"
            className="w-full rounded-2xl bg-white p-4 shadow-md"
          >
            <div className="mb-2 flex items-center gap-2">
              <div aria-hidden="true" className="rounded-xl bg-primary-100 p-2">
                <Icon
                  icon="ri:team-fill"
                  className="text-xl text-primary-900"
                />
              </div>
              <h2
                id="institution-heading"
                className="text-xl font-bold text-primary-900"
              >
                Applicant Institution
              </h2>
            </div>
            <Dropdown
              placeholder="Select your institution"
              options={institutions.map((institution) => ({
                label: institution.name,
                value: String(institution.id),
              }))}
              value={lembagaId}
              onChange={(event) => setLembagaId(event.target.value)}
              disabled={
                isInstitutionsLoading || isInstitutionsError || isPending
              }
              required
              fullWidth
            />
            {isInstitutionsError && (
              <div
                className="mt-2 flex items-center justify-between gap-3 text-sm text-red-600"
                role="alert"
              >
                <span>
                  {institutionsError instanceof Error
                    ? institutionsError.message
                    : "Failed to Load Institutions."}
                </span>
                <button
                  type="button"
                  onClick={() => refetchInstitutions()}
                  disabled={isInstitutionsFetching}
                  className="shrink-0 font-semibold underline disabled:opacity-50"
                >
                  {isInstitutionsFetching ? "Loading..." : "Try Again"}
                </button>
              </div>
            )}
          </section>

          <section
            aria-labelledby="borrow-items-heading"
            className="w-full rounded-2xl bg-white p-4 shadow-md"
          >
            <div className="mb-2 flex items-center gap-2">
              <div aria-hidden="true" className="rounded-xl bg-primary-100 p-2">
                <Icon
                  icon="lucide-extended:package-open-duotone"
                  className="text-xl text-primary-900"
                />
              </div>
              <h2
                id="borrow-items-heading"
                className="text-xl font-bold text-primary-900"
              >
                Items to Borrow
              </h2>
            </div>
            <ul className="mb-2 space-y-3">
              {borrowItems.map((item, index) => (
                <li key={item.id} className="flex items-center gap-2">
                  <Dropdown
                    aria-label={`Item ${index + 1}`}
                    placeholder={
                      isItemsLoading ? "Loading items..." : "Select an item"
                    }
                    options={availableItems.map((availableItem) => ({
                      label: `${availableItem.name} (${availableItem.availableQuantity} available)`,
                      value: String(availableItem.id),
                      disabled:
                        availableItem.availableQuantity < 1 ||
                        borrowItems.some(
                          (selectedItem) =>
                            selectedItem.id !== item.id &&
                            selectedItem.value === String(availableItem.id),
                        ),
                    }))}
                    value={item.value}
                    onChange={(event) =>
                      updateItem(item.id, event.target.value)
                    }
                    disabled={isItemsLoading || isItemsError || isPending}
                    required
                    fullWidth
                    wrapperClassName="mb-0 min-w-0 flex-1"
                  />
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity === 1 || isPending}
                      aria-label={`Kurangi jumlah item ${index + 1}`}
                      className="flex size-6 cursor-pointer items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Icon
                        aria-hidden="true"
                        icon="material-symbols:remove"
                        className="size-5"
                      />
                    </button>
                    <span
                      aria-live="polite"
                      aria-label={`Jumlah ${item.quantity}`}
                      className="w-6 text-center font-semibold text-primary-900"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Tambah jumlah item ${index + 1}`}
                      disabled={
                        Boolean(item.value) &&
                        (item.quantity >= getAvailableQuantity(item.value) ||
                          isPending)
                      }
                      className="flex size-6 cursor-pointer items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Icon
                        aria-hidden="true"
                        icon="material-symbols:add"
                        className="size-5"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {isItemsError && (
              <div
                className="mb-3 flex items-center justify-between gap-3 text-sm text-red-600"
                role="alert"
              >
                <span>
                  {itemsError instanceof Error
                    ? itemsError.message
                    : "Failed to Load Items."}
                </span>
                <button
                  type="button"
                  onClick={() => refetchItems()}
                  disabled={isItemsFetching}
                  className="shrink-0 font-semibold underline disabled:opacity-50"
                >
                  {isItemsFetching ? "Loading..." : "Try Again"}
                </button>
              </div>
            )}
            <Button
              type="button"
              fullWidth
              onClick={addBorrowItem}
              disabled={isItemsLoading || isItemsError || isPending}
            >
              Add more Items
            </Button>
          </section>

          <section
            aria-labelledby="borrow-detail-heading"
            className="w-full rounded-2xl bg-white p-4 shadow-md"
          >
            <div className="mb-2 flex items-center gap-2">
              <div aria-hidden="true" className="rounded-xl bg-primary-100 p-2">
                <Icon
                  icon="coolicons:clipboard-list"
                  className="text-xl text-primary-900"
                />
              </div>
              <h2
                id="borrow-detail-heading"
                className="text-xl font-bold text-primary-900"
              >
                Borrow Detail
              </h2>
            </div>
            <Textarea
              label="Borrowing Purpose"
              placeholder="e.g. for a seminar event, workshop, or project..."
              fullWidth
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              disabled={isPending}
            />
            <div className="flex flex-col gap-2 md:flex-row">
              <Input
                label="Pick up date"
                type="date"
                placeholderIcon="cuida:calendar-outline"
                fullWidth
                value={pickUpDate}
                onChange={(event) => setPickUpDate(event.target.value)}
                disabled={isPending}
              />
              <Input
                label="Return date"
                type="date"
                placeholderIcon="cuida:calendar-outline"
                fullWidth
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
                disabled={isPending}
              />
            </div>
          </section>
        </div>
        <div className="mt-5 flex w-full justify-end">
          <Button
            type="submit"
            disabled={
              isPending ||
              isItemsLoading ||
              isInstitutionsLoading ||
              isItemsError ||
              isInstitutionsError
            }
          >
            {isPending ? "Submitting..." : "Submit request"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default BorrowPage;
