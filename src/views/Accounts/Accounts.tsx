import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { AccountTable } from "./AccountTable";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import AddAccount from "./AddAccount";
import Loader from "@/components/Loader";
import Header from "../Header";

function Accounts() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-accounts"],
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
      <Header title="Accounts" />
      <div className="flex justify-center sm:justify-end mt-2 mb-4">
        <AddAccount refetchAccountsFn={refetch} />
      </div>
      <AccountTable columns={columns} data={data} />
    </div>
  );
}

export default Accounts;
