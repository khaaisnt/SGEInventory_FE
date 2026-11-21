import Header from "@/components/layout/header";
import React from "react";

const DashboardAdmin = () => {
  return (
    <main>
      <section>
        <Header
          title="Today’s Overview"
          subtitle="Here’s a summary of requests that need your attention"
        />
      </section>
    </main>
  );
};

export default DashboardAdmin;
