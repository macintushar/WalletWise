import { Landmark } from "lucide-react";

export type DashboardCardData = {
  icon: typeof Landmark;
  name: string;
  description?: string;
  value: string | number;
};