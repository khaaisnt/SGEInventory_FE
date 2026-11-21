import Header from "@/components/layout/header";
import React from "react";
import Items from "./components/items";

const ItemsPage = () => {
  return (
    <main>
      <section>
        <Header
          title="Manage Storage"
          subtitle="Check what each organization wants to store and decide."
        />
      </section>

      <section className="mt-8">
        <Items />
      </section>
    </main>
  );
};

export default ItemsPage;
