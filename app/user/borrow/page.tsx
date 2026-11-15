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
      <section>
        <Header
          title="Borrow"
          subtitle="Complete the form below to request the items you need!"
        />
        <div className="mt-8 flex flex-col gap-5">
          <div className="w-full bg-white shadow-md rounded-2xl p-4">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Icon
                  icon={"ri:team-fill"}
                  className="text-xl text-primary-900"
                />
              </div>
              <p className="text-xl font-bold text-primary-900">
                Applicant Institution
              </p>
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
          </div>
          <div className="w-full bg-white shadow-md rounded-2xl p-4">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Icon
                  icon={"lucide-extended:package-open-duotone"}
                  className="text-xl text-primary-900"
                />
              </div>
              <p className="text-xl font-bold text-primary-900">
                Items to Borrow
              </p>
            </div>
            <div className="mb-2 space-y-3">
              {borrowItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Dropdown
                    aria-label={`Item ${index + 1}`}
                    placeholder="Input items"
                    options={[
                      { label: "BEM", value: "BEM" },
                      { label: "BCC", value: "BCC" },
                    ]}
                    value={item.value}
                    onChange={(event) =>
                      updateItem(item.id, event.target.value)
                    }
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
                      className="flex size-6 items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Icon icon="material-symbols:remove" className="size-5" />
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
                      className="flex size-6 items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-900 cursor-pointer"
                    >
                      <Icon icon="material-symbols:add" className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" fullWidth onClick={addBorrowItem}>
              Add more Items
            </Button>
          </div>
          <div className="w-full bg-white shadow-md rounded-2xl p-4">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Icon
                  icon={"coolicons:clipboard-list"}
                  className="text-xl text-primary-900"
                />
              </div>
              <p className="text-xl font-bold text-primary-900">
                Borrow Detail
              </p>
            </div>
            <Input
              type="text"
              label="Borrowing Purpose"
              placeholder="e.g. for a seminar event, workshop,  or project..."
              fullWidth
              multiline
            />
            <div className="flex flex-col md:flex-row gap-2">
              <Input label="Pick up date" type="date" fullWidth />
              <Input label="Return date" type="date" fullWidth />
            </div>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-end">
          <Button>Submit request</Button>
        </div>
      </section>
    </main>
  );
};

export default BorrowPage;
