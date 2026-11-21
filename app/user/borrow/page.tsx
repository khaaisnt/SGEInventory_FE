"use client";

import Input from "@/components/atoms/input";
import Header from "@/components/layout/header";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Dropdown from "@/components/atoms/dropdown";
import Button from "@/components/atoms/button";

const BorrowPage = () => {
  const [borrowItems, setBorrowItems] = useState([
    { id: 1, value: "", quantity: 1 },
  ]);

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
      items.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  };

  return (
    <main>
      <Header
        title="Borrow"
        subtitle="Complete the form below to request the items you need!"
      />
      <div className="mt-8 flex flex-col gap-5">
        <section
          aria-labelledby="institution-heading"
          className="w-full rounded-2xl bg-white p-4 shadow-md"
        >
          <div className="mb-2 flex items-center gap-2">
            <div aria-hidden="true" className="rounded-xl bg-primary-100 p-2">
              <Icon icon="ri:team-fill" className="text-xl text-primary-900" />
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
            options={[
              { label: "BEM", value: "BEM" },
              { label: "BCC", value: "BCC" },
            ]}
            required
            fullWidth
          />
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
          <Button type="button" fullWidth onClick={addBorrowItem}>
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
          <Input
            type="text"
            label="Borrowing Purpose"
            placeholder="e.g. for a seminar event, workshop, or project..."
            fullWidth
            multiline
          />
          <div className="flex flex-col gap-2 md:flex-row">
            <Input
              label="Pick up date"
              type="date"
              placeholderIcon="cuida:calendar-outline"
              fullWidth
            />
            <Input
              label="Return date"
              type="date"
              placeholderIcon="cuida:calendar-outline"
              fullWidth
            />
          </div>
        </section>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Button type="button">Submit request</Button>
      </div>
    </main>
  );
};

export default BorrowPage;
