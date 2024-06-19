import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router";
import routes from "../../constants/constants";
import Profile from "./Profile";
import NavButton from "./NavButton";

function Sidebar(): JSX.Element {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex h-full p-6 flex-col max-sm:hidden justify-between text-white w-24 max-w-[256px] bg-black">
        <div>
          <nav>
            <div className="flex w-full justify-center mb-3">
              <img
                alt="WalletWise Logo"
                className="h-12"
                src="/WalletWise-logo.svg"
              />
            </div>
            <ul className="border-t mt-1 pt-2 gap-2 flex flex-col">
              {routes
                .filter((route) => route.position === "main")
                .map((route) => (
                  <li key={route.url}>
                    <NavButton {...route} />
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <div className="border-t-2 w-full pt-20">
          <nav>
            <ul className="flex flex-col gap-2">
              {routes
                .filter((route) => route.position === "bottom")
                .map((route) => (
                  <li key={route.url}>
                    <NavButton {...route} />
                  </li>
                ))}
              <ModeToggle />
              <Profile />
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex flex-col w-full text-white">
        <div className="flex h-full p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
