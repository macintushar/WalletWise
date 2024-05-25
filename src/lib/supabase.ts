import { createClient } from "@supabase/supabase-js";

const SUPABASE_DATABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(
  SUPABASE_DATABASE_URL as string,
  SUPABASE_ANON_KEY as string,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  },
);

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") console.log("SIGNED_IN", session);
});

export default supabase;
