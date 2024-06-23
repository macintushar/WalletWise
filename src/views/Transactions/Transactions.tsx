import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { TransactionTable } from "./TransactionsTable";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import AddTransaction from "./AddTransaction";
import Loader from "@/components/Loader";
import Header from "../Header";

function Transactions() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-transactions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("walletwise_transactions")
        .select(`
      trxn_uuid,
      created_at,
      value,
      description,
      user_id,
      walletwise_accounts (account_name)
    `);

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
  console.log(data);

  return (
    <div className="w-full">
      <Header title="Transactions" />
      <div className="flex justify-center sm:justify-end mt-2 mb-4">
        <AddTransaction refetchTransactionsFn={refetch} />
      </div>
      <TransactionTable columns={columns} data={data} />
    </div>
  );
}

export default Transactions;
