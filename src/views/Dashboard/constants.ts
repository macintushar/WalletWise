import { Landmark, ReceiptIndianRupee } from "lucide-react";

export type DashboardCardData = {
  icon: typeof Landmark;
  name: string;
  description?: string;
  value: string | number;
};

export const dashboardCardData: DashboardCardData[] = [
  {
    icon: ReceiptIndianRupee,
    name: "Total Spent",
    description: "Total amount spent in the calendar month",
    value: 0,
  },
  {
    icon: Landmark,
    name: "Accounts",
    description: "The bank accounts you have added",
    value: 0,
  },
  {
    icon: ReceiptIndianRupee,
    name: "Total Spent",
    description: "Total amount spent in the calendar month",
    value: 0,
  },
];