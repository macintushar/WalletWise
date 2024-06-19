import { ColumnDef } from "@tanstack/react-table";

type Accounts = {
  account_balance: number;
  account_name: string;
  account_number: number | null;
  account_uuid: string;
  created_at: string;
  user_id: string;
};

export const columns: ColumnDef<Accounts>[] = [
  {
    accessorKey: "account_name",
    header: "Name",
  },
  {
    accessorKey: "account_number",
    header: "Account Number",
  },
  {
    accessorKey: "account_balance",
    header: "Balance",
  },
];
