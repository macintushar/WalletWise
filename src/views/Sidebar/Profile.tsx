import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    }
    getUserData();
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: `Something went wrong - ${error.code}`,
        description: error.message,
      });
    }

    toast({
      description: "Successfully signed out.",
    });
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-full bg-zinc-900/50 h-12 p-2 flex rounded-lg items-center">
          {user ? (
            <img
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.name}
              className="rounded-full h-8 w-8"
            />
          ) : (
            <Skeleton className="rounded-full h-8 w-8" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit px-1 py-2">
        <Button
          className="flex gap-1 bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/90"
          onClick={handleSignOut}
        >
          <LogOutIcon className="h-4 text-red-600" />
          <h2 className="text-red-600 font-semibold">Sign Out</h2>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default Profile;
