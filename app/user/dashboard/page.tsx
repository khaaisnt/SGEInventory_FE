import Header from "@/components/layout/header";
import { Icon } from "@iconify/react";
import React from "react";

const DashboardUser = () => {
  return (
    <main>
      <section>
        <Header title="Hello, there!" subtitle="Here's your request overview" />

        <div className="flex flex-col md:flex-row gap-2 md:gap-10 mt-8">
          <div className="bg-white w-full p-4 rounded-2xl shadow-md">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Icon
                  icon={"coolicons:clipboard-list"}
                  className="text-xl text-primary-900"
                />
              </div>
              <p className="text-xl font-bold text-primary-900">
                Borrow Request
              </p>
            </div>
            <hr className="border-t-2 border-primary-900 rounded-full " />
          </div>

          <div className="bg-white w-full p-4 rounded-2xl shadow-md">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Icon
                  icon={"keyline-icons:package-plus"}
                  className="text-xl text-primary-900"
                />
              </div>
              <p className="text-xl font-bold text-primary-900">
                Storage Request
              </p>
            </div>
            <hr className="border-t-2 border-primary-900 rounded-full " />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardUser;
