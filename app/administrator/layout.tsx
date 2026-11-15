import type { Metadata } from "next";
import Sidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "RackIT - Admin",
  description: "Inventory Management System for SGE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="admin" className="shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="max-w-full flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
