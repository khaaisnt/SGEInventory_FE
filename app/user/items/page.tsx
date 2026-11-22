import Header from "@/components/layout/header";
import React from "react";
import Items from "./components/items";

const ItemsPage = () => {
  return (
    <main>
      <section>
        <Header
          title="Storage Items"
          subtitle="Browse the equipment you can borrow and see how many are left."
        />
      </section>

      <section className="mt-8">
        <Items />
      </section>
    </main>
  );
};

export default ItemsPage;
