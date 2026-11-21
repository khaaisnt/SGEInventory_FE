"use client";

import Button from "@/components/atoms/button";
import Dropdown from "@/components/atoms/dropdown";
import Input from "@/components/atoms/input";
import InputImage from "@/components/atoms/inputImage";
import Textarea from "@/components/atoms/textarea";
import Header from "@/components/layout/header";
import { Icon } from "@iconify/react";
import { useState } from "react";

const StoragePage = () => {
  const [storageItems, setStorageItems] = useState([
    { id: 1, value: "", quantity: 1 },
  ]);

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

  return (
    <main>
      <Header
        title="Storage"
        subtitle="Complete the form below to request the items you need!"
      />

      <div className="mt-8 flex flex-col gap-5">
        <section
          aria-labelledby="applicant-detail-heading"
          className="w-full rounded-2xl bg-white p-4 shadow-md"
        >
          <div className="mb-2 flex items-center gap-2">
            <div aria-hidden="true" className="rounded-xl bg-primary-100 p-2">
              <Icon icon="ri:team-fill" className="text-xl text-primary-900" />
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
              options={[
                { label: "BEM", value: "BEM" },
                { label: "BCC", value: "BCC" },
              ]}
              fullWidth
            />
            <Input
              type="text"
              label="Program Name"
              placeholder="Name of the program or event"
              fullWidth
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
                <Dropdown
                  aria-label={`Item ${index + 1}`}
                  placeholder="Input items"
                  options={[
                    { label: "BEM", value: "BEM" },
                    { label: "BCC", value: "BCC" },
                  ]}
                  value={item.value}
                  onChange={(event) => updateItem(item.id, event.target.value)}
                  required
                  fullWidth
                  wrapperClassName="mb-0 min-w-0 flex-1"
                />
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                    aria-label={`Kurangi jumlah item ${index + 1}`}
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
                    aria-label={`Jumlah ${item.quantity}`}
                    className="w-6 text-center font-semibold text-primary-900"
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label={`Tambah jumlah item ${index + 1}`}
                    className="flex size-6 cursor-pointer items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-900"
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
          <Button type="button" fullWidth onClick={addStorageItem}>
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
            />
            <Input
              label="End date"
              type="date"
              placeholderIcon="cuida:calendar-outline"
              fullWidth
            />
          </div>
          <InputImage
            name="itemPhoto"
            label="Item Photo"
            accept="image/png,image/jpeg"
            fullWidth
            onChange={(event) => {
              const file = event.target.files?.[0];
            }}
          />
          <Textarea
            label="Notes"
            placeholder="Anything we should know about these items?"
            fullWidth
          />
        </section>
      </div>
    </main>
  );
};

export default StoragePage;
