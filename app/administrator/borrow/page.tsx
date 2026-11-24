import Header from "@/components/layout/header";
import React from "react";
import Borrow from "./components/borrow";

const BorrowPage = () => {
  return (
    <main>
      <section>
        <Header
          title="Manage Borrowing"
          subtitle="Review, approve, or reject equipment borrowing requests."
        />
      </section>

      <section className="mt-8">
        <Borrow />
      </section>
    </main>
  );
};

export default BorrowPage;
