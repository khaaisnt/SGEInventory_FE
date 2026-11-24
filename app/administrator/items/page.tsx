import Header from "@/components/layout/header";
import React from "react";
import Items from "./components/items";

const ItemsPage = () => {
  return (
    <main>
      <section>
        <Header
          title="Manage Inventory"
          subtitle="Add, edit, or remove the items in the system."
        />
      </section>

      <section className="mt-8">
        <Items />
      </section>
    </main>
  );
};

export default ItemsPage;
