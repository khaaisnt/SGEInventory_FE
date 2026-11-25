"use client";

import Button from "@/components/atoms/button";
import Dropdown from "@/components/atoms/dropdown";
import Input from "@/components/atoms/input";
import InputImage from "@/components/atoms/inputImage";
import Textarea from "@/components/atoms/textarea";
import Header from "@/components/layout/header";
import { Icon } from "@iconify/react";
import { useState, type FormEvent } from "react";
import { useGetInstitutions } from "@/app/administrator/items/services/getInstitutions.service";
import { showErrorToast } from "@/lib/toast";
import { useRequestStore } from "./services/requestStore.service";
import type { DataReqStorage } from "./types/storage.type";

const StoragePage = () => {
  const [lembagaId, setLembagaId] = useState("");
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoInputKey, setPhotoInputKey] = useState(0);
  const [notes, setNotes] = useState("");
  const [storageItems, setStorageItems] = useState([
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
  const { mutate, isPending } = useRequestStore();
  const institutions = institutionsResponse?.data ?? [];

  const addStorageItem = () => {
    setStorageItems((items) => [
      ...items,
      { id: items.length + 1, value: "", quantity: 1 },
    ]);
  };

  const updateQuantity = (id: number, change: number) => {
    setStorageItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const updateItem = (id: number, value: string) => {
    setStorageItems((items) =>
      items.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!photo) {
      showErrorToast("Silakan pilih foto barang.");
      return;
    }

    const request: DataReqStorage = {
      lembagaId: Number(lembagaId),
      eventName: eventName.trim(),
      items: storageItems.map((item) => ({
        name: item.value,
        quantity: item.quantity,
      })),
      startDate,
      endDate,
      photo,
      notes: notes.trim(),
    };

    mutate(request, {
      onSuccess: () => {
        setLembagaId("");
        setEventName("");
        setStartDate("");
        setEndDate("");
        setPhoto(null);
        setPhotoInputKey((key) => key + 1);
        setNotes("");
        setStorageItems([{ id: 1, value: "", quantity: 1 }]);
      },
    });
  };

  return (
    <main>
      <Header
        title="Storage"
        subtitle="Complete the form below to request the items you need!"
      />

      <form onSubmit={handleSubmit}>
        <div className="mt-8 flex flex-col gap-5">
          <section
            aria-labelledby="applicant-detail-heading"
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
                id="applicant-detail-heading"
                className="text-xl font-bold text-primary-900"
              >
                Applicant Detail
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <Dropdown
                label="Applicant Institution"
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
                      : "Gagal memuat daftar lembaga."}
                  </span>
                  <button
                    type="button"
                    onClick={() => refetchInstitutions()}
                    disabled={isInstitutionsFetching}
                    className="shrink-0 font-semibold underline disabled:opacity-50"
                  >
                    {isInstitutionsFetching ? "Memuat..." : "Coba lagi"}
                  </button>
                </div>
              )}
              <Input
                type="text"
                label="Program Name"
                placeholder="Name of the program or event"
                fullWidth
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                disabled={isPending}
              />
            </div>
          </section>

          <section
            aria-labelledby="store-items-heading"
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
                id="store-items-heading"
                className="text-xl font-bold text-primary-900"
              >
                Items to Store
              </h2>
            </div>
            <ul className="mb-2 space-y-3">
              {storageItems.map((item, index) => (
                <li key={item.id} className="flex items-center gap-2">
                  <Input
                    type="text"
                    aria-label={`Item ${index + 1}`}
                    placeholder="Enter item name"
                    value={item.value}
                    onChange={(event) =>
                      updateItem(item.id, event.target.value)
                    }
                    disabled={isPending}
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
                      disabled={isPending}
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
            <Button
              type="button"
              fullWidth
              onClick={addStorageItem}
              disabled={isPending}
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
                Storage Detail
              </h2>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Input
                label="Start date"
                type="date"
                placeholderIcon="cuida:calendar-outline"
                fullWidth
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                disabled={isPending}
              />
              <Input
                label="End date"
                type="date"
                placeholderIcon="cuida:calendar-outline"
                fullWidth
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                disabled={isPending}
              />
            </div>
            <InputImage
              key={photoInputKey}
              name="itemPhoto"
              label="Item Photo"
              accept="image/png,image/jpeg"
              fullWidth
              disabled={isPending}
              onChange={(event) => {
                setPhoto(event.target.files?.[0] ?? null);
              }}
            />
            <Textarea
              label="Notes"
              placeholder="Anything we should know about these items?"
              fullWidth
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              disabled={isPending}
            />
          </section>
        </div>
        <div className="mt-5 flex w-full justify-end">
          <Button
            type="submit"
            disabled={isPending || isInstitutionsLoading || isInstitutionsError}
          >
            {isPending ? "Submitting..." : "Submit request"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default StoragePage;
