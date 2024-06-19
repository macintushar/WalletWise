import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { supabase } from "@/lib/supabase";
import { Landmark, ReceiptIndianRupee } from "lucide-react";
import Loader from "@/components/Loader";
import { DashboardCardData } from "./types";
import { toast } from "@/components/ui/use-toast";

function Dashboard(): JSX.Element {
  const { data: transactionData, isLoading: transactionIsLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("walletwise_transactions")
        .select("value");

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
  const { data: accountsData, isLoading: accountsIsLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("walletwise_accounts")
        .select("account_uuid");

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

  if (transactionIsLoading || accountsIsLoading) return <Loader />;

  let trxnTotal = 0;
  transactionData?.map(
    (transactionValue) => (trxnTotal = trxnTotal + transactionValue.value)
  );

  const dashboardCardData: DashboardCardData[] = [
    {
      icon: ReceiptIndianRupee,
      name: "Total Spent",
      description: "Total amount spent in the calendar month",
      value: trxnTotal,
    },
    {
      icon: Landmark,
      name: "Accounts",
      description: "The bank accounts you have added",
      value: accountsData?.length || 0,
    },
    {
      icon: ReceiptIndianRupee,
      name: "Total",
      description: "Total amount spent in the calendar month",
      value: 0,
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-white text-center font-semibold text-3xl pb-4">
        Dashboard
      </h1>
      <div className="flex flex-row flex-wrap w-4/5 md:w-full gap-12 mx-auto justify-center">
        {dashboardCardData.map((data) => (
          <DashboardCard {...data} key={data.name} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
