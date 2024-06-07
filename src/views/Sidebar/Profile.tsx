import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
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

  return (
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
  );
}

export default Profile;
