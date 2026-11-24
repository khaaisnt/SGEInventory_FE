import Header from "@/components/layout/header";
import React from "react";

const HistoryPage = () => {
  return (
    <main>
      <section>
        <Header
          title="History"
          subtitle="Browse the equipment you can borrow and see how many are left."
        />
      </section>

      <section className="mt-8"></section>
    </main>
  );
};

export default HistoryPage;
