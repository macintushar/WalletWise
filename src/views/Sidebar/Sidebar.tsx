import { ModeToggle } from "@/components/mode-toggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/auth-js";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function Sidebar(): JSX.Element {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    }
    getUserData();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg text-gray-900 dark:text-white"
    >
      <ResizablePanel defaultSize={10} minSize={5} maxSize={15}>
        <div className="flex h-full p-6 flex-col justify-between text-white">
          <div>
            <nav>
              <div className="flex w-full justify-center">
                <img
                  alt="WalletWise Logo"
                  className="h-8"
                  src="https://bzortqhjphsocjbvbxdq.supabase.co/storage/v1/object/public/public-assets/logos/WalletWise-Text.png?t=2024-05-26T19%3A36%3A29.801Z"
                />
              </div>
              <ul>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <nav>
              <ul>
                <li>
                  <a href="/settings">Settings</a>
                </li>
                <li>
                  <ModeToggle />
                </li>
                <li>
                  <div className="w-full bg-gray-900 h-12 p-2 flex rounded-lg items-center">
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="profile"
                      className="rounded-full h-8 w-8 mr-2"
                    />
                    <h2 className="truncate w-full">
                      {user.user_metadata.name}
                    </h2>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <Outlet />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Sidebar;
