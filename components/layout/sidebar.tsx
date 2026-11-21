"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { removeAllFromCookie } from "@/helpers/cookies";

type SidebarRole = "user" | "admin";

interface SidebarItem {
  name: string;
  path: string;
  icon: string;
}

interface SidebarProps {
  role: SidebarRole;
  className?: string;
}

const menuItems: Record<SidebarRole, SidebarItem[]> = {
  user: [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: "material-symbols:dashboard-outline",
    },
    {
      name: "Borrow Request",
      path: "/user/borrow",
      icon: "coolicons:clipboard-list",
    },
    {
      name: "Storage Request",
      path: "/user/storage",
      icon: "keyline-icons:package-plus",
    },
    {
      name: "Storage Items",
      path: "/user/items",
      icon: "majesticons:checkbox-list-detail",
    },
    {
      name: "History",
      path: "/user/history",
      icon: "andrsrxn:clock-hour-three",
    },
  ],
  admin: [
    {
      name: "Dashboard",
      path: "/administrator/dashboard",
      icon: "material-symbols:dashboard-outline",
    },
    {
      name: "Manage Borrow",
      path: "/administrator/borrow",
      icon: "coolicons:clipboard-list",
    },
    {
      name: "Manage Storage",
      path: "/administrator/storage",
      icon: "keyline-icons:package-plus",
    },
    {
      name: "Manage Inventory",
      path: "/administrator/items",
      icon: "majesticons:checkbox-list-detail",
    },
    {
      name: "Log Users",
      path: "/administrator/history",
      icon: "andrsrxn:clock-hour-three",
    },
  ],
};

const Sidebar = ({ role, className }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    removeAllFromCookie();
    setIsMobileOpen(false);
    router.push("/login");
  };

  return (
    <>
      {!isMobileOpen && (
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="fixed left-4 top-4 z-30 rounded-lg bg-white p-2 text-primary-900 shadow-md md:hidden"
          aria-label="Open sidebar"
          aria-expanded={false}
        >
          <Icon icon="material-symbols:menu" className="size-6" />
        </button>
      )}

      {isMobileOpen && (
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      <div className="p-4">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex h-full max-h-screen w-64 flex-col shadow-md rounded-2xl bg-linear-to-b from-apricot-white to-primary-100 px-4 py-8 transition-all duration-300 md:sticky md:top-0 md:z-auto md:translate-x-0",
            isMobileOpen ? "translate-x-0" : "-translate-x-full",
            isCollapsed ? "md:w-20" : "md:w-64",
            className,
          )}
        >
          <div
            className={cn(
              "mb-5 flex h-12 items-center pb-4",
              isCollapsed ? "justify-center" : "justify-between",
            )}
          >
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 text-primary-900",
                isCollapsed && "md:hidden",
              )}
              aria-label="Rack IT home"
            >
              <Image
                src={"/assets/logo.png"}
                alt="Logo RactIT"
                width={36}
                height={36}
              />
              <p
                className="text-2xl font-bold tracking-tight
             [-webkit-text-stroke:2px_white] 
             [paint-order:stroke_fill] 
             drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
              >
                <span className="text-primary-600">Rack</span>
                <span className="text-primary-900">IT</span>
              </p>
            </Link>
            <button
              type="button"
              onClick={() => setIsCollapsed((collapsed) => !collapsed)}
              className="hidden rounded-lg p-2 text-primary-900 md:block cursor-pointer"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed}
            >
              <Icon
                icon={
                  isCollapsed
                    ? "lucide:panel-left-open"
                    : "lucide:panel-left-close"
                }
                className="size-5"
              />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
              aria-label="Close sidebar"
            >
              <Icon icon="material-symbols:close" className="size-5" />
            </button>
          </div>

          <nav aria-label="Main navigation" className="flex-1">
            <p
              className={cn(
                "mb-3 px-3 text-sm font-semibold tracking-wide text-primary-600",
                isCollapsed && "md:hidden",
              )}
            >
              Menu
            </p>
            <ul className="space-y-1">
              {menuItems[role].map((item) => {
                const isActive =
                  pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      title={isCollapsed ? item.name : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                        isActive
                          ? "bg-primary-600 font-semibold text-white"
                          : "text-primary-900 font-medium hover:bg-primary-100 hover:text-primary-900",
                        isCollapsed && "md:justify-center md:px-2",
                      )}
                    >
                      <Icon icon={item.icon} className="size-5 shrink-0" />
                      <span className={cn(isCollapsed && "md:hidden")}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto pt-4">
            <hr className="mb-2 text-primary-600" />
            <button
              type="button"
              onClick={handleLogout}
              title={isCollapsed ? "Log out" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-primary-900 cursor-pointer transition-colors",
                isCollapsed && "md:justify-center md:px-2",
              )}
            >
              <Icon
                icon="material-symbols:logout"
                className="size-5 shrink-0"
              />
              <span className={cn(isCollapsed && "md:hidden")}>Log out</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
