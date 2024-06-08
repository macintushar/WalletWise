import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router";
import routes from "../../constants/routes";
import Profile from "./Profile";
import { Bars3Icon } from "@heroicons/react/24/outline";
import NavButton from "./NavButton";

function Sidebar(): JSX.Element {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex h-full p-6 flex-col max-sm:hidden justify-between text-white w-24 max-w-[256px] bg-black">
        <div>
          <nav>
            <div className="flex w-full justify-center">
              <img
                alt="WalletWise Logo"
                className="h-8"
                src="https://bzortqhjphsocjbvbxdq.supabase.co/storage/v1/object/public/public-assets/logos/WalletWise-Text.png?t=2024-05-26T19%3A36%3A29.801Z"
              />
            </div>
            <ul className="border-t mt-1 pt-2 gap-2 flex flex-col">
              {routes.map((route) => (
                <li key={route.url}>
                  <NavButton {...route} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t-2 w-full pt-20">
          <nav className=" flex flex-col gap-2">
            <a href="/settings">Settings</a>
            <ModeToggle />
            <Profile />
          </nav>
        </div>
      </div>
      <div className="text-white">
        <div className="dark:bg-zinc-900">
          <Bars3Icon />
        </div>
      </div>
      <div className="flex flex-col text-white">
        <div className="flex h-full items-center justify-center p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
