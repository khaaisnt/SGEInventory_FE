import Header from "@/components/layout/header";
import React from "react";
import Storage from "./components/storage";

const BorrowPage = () => {
  return (
    <main>
      <section>
        <Header
          title="Manage Storage"
          subtitle="Check what each organization wants to store and decide."
        />
      </section>

      <section className="mt-8">
        <Storage />
      </section>
    </main>
  );
};

export default BorrowPage;
