import Header from "@/components/layout/header";
import CountCard from "./components/countCard";

const DashboardAdmin = () => {
  return (
    <main className="space-y-6">
      <section>
        <Header
          title="Today’s Overview"
          subtitle="Here’s a summary of requests that need your attention"
        />
      </section>
      <CountCard />
    </main>
  );
};

export default DashboardAdmin;
