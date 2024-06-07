import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="bg-gray-100 dark:bg-zinc-950 h-screen w-screen">
      <Outlet />
    </div>
  );
}

export default Layout;
