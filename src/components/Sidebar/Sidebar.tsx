"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { usePathname, useRouter } from "next/navigation";
import { sidebarRoutes } from "./sidebar-routes";
import Icon from "@/components/Icon";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  function handleNavOnClick(url: string) {
    router.push(url);
  }
  return (
    <div className="flex flex-row">
      <div className={"h-screen w-fit border-r bg-white dark:bg-gray-950"}>
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 border-b px-2 text-lg font-semibold tracking-tight">
              WalletWise
            </h2>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-3">
                {sidebarRoutes.map((link) => (
                  <div
                    className="flex w-[200px] items-center justify-start gap-2 rounded-lg bg-gray-100 px-3 py-1.5 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700"
                    onClick={() => handleNavOnClick(link.href)}
                    key={link.href}
                  >
                    <Icon
                      name={link.icon ?? ""}
                      color={
                        pathname === link.href
                          ? "text-blue-800"
                          : "text-blue-500"
                      }
                    />
                    {link.title}
                  </div>
                ))}
              </div>
              <div>
                <SidebarFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
