import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { AccountTable } from "./AccountTable";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import AddAccount from "./AddAccount";
import Loader from "@/components/Loader";

function Accounts() {
  const { data, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("walletwise_accounts")
        .select();

      if (error) {
        toast({
          title: "An error occured.",
          description: error.message,
          variant: "destructive",
        });
      }
      return data;
    },
    refetchOnMount: false,
  });

  if (!data || isLoading) return <Loader />;

  return (
    <div className="w-full">
      <h1 className="text-white text-center font-semibold text-3xl pb-4">
        Accounts
      </h1>
      <div className="flex justify-center sm:justify-end mt-2 mb-4">
        <AddAccount />
      </div>
      <AccountTable columns={columns} data={data} />
    </div>
  );
}

export default Accounts;
