import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { supabase } from "@/lib/supabase";
import { Landmark, ReceiptIndianRupee } from "lucide-react";
import Loader from "@/components/Loader";
import { DashboardCardData } from "./types";
import { toast } from "@/components/ui/use-toast";
import Header from "../Header";

function Dashboard(): JSX.Element {
  const now = new Date();

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toISOString();

  // Get the first day of the next month
  const startOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  ).toISOString();

  const { data: transactionData, isLoading: transactionIsLoading } = useQuery({
    queryKey: ["transactions", "dashboard", "current-month"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("walletwise_transactions")
        .select("value")
        .gte("created_at", startOfMonth)
        .lt("created_at", startOfNextMonth);

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
    queryKey: ["accounts", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("walletwise_accounts")
        .select("*", { count: "exact", head: true });

      if (error) {
        toast({
          title: "An error occured.",
          description: error.message,
          variant: "destructive",
        });
      }
      return count;
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
      value: accountsData || 0,
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
      <Header title="Dashboard" />
      <div className="flex flex-row flex-wrap w-4/5 md:w-full gap-12 mx-auto justify-center">
        {dashboardCardData.map((data) => (
          <DashboardCard {...data} key={data.name} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
