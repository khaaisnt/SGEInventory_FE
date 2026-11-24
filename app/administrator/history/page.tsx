import Header from "@/components/layout/header";
import React from "react";
import History from "./components/history";

const HistoryPage = () => {
  return (
    <main>
      <section>
        <Header
          title="Log Users"
          subtitle="Everything users did in RackIT, newest first."
        />
      </section>

      <section className="mt-8">
        <History />
      </section>
    </main>
  );
};

export default HistoryPage;
