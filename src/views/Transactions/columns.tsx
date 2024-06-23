import { ColumnDef } from "@tanstack/react-table";

type Transactions = {
  trxn_uuid: string;
  walletwise_accounts: Record<string, any>;
  value: string;
  description: string;
};

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "walletwise_accounts.account_name",
    header: "Account",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
