import Header from "@/components/layout/header";
import React from "react";

const DashboardUser = () => {
  return (
    <main>
      <section>
        <Header />
        <div className="my-10 flex gap-3">
          <div className="w-1 bg-primary-600 rounded-full"></div>
          <h5 className="font-bold text-lg text-primary-900">Status Request</h5>
        </div>
      </section>
    </main>
  );
};

export default DashboardUser;
