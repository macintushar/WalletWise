import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/lib/supabase";

type AccountDataType = {
  account_id: string;
  account_number: string;
  account_name: string;
  account_balance: number;
};

export default async function Accounts() {
  const { data, error } = await supabase.from("walletwise_accounts").select();
  console.log(data, error);
  const accountsData = data as AccountDataType[];
  return (
    <div>
      <div>Accounts</div>
      <Button>Click me</Button>
      <Table>
        <TableCaption>{data ? data[0]?.id : ""}</TableCaption>
        <TableHeader>
          <TableRow className="text-white">
            <TableHead className="text-white dark:text-gray-900">
              Account Number
            </TableHead>
            <TableHead className="text-white dark:text-gray-900">
              Account Name
            </TableHead>
            <TableHead className="text-white dark:text-gray-900">
              Account Balance
            </TableHead>
            <TableHead className="text-right text-white dark:text-gray-900">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accountsData?.map((account) => (
            <TableRow>
              <TableCell className="font-medium">
                {account.account_id}
              </TableCell>
              <TableCell>{account.account_name}</TableCell>
              <TableCell>{account.account_number}</TableCell>
              <TableCell className="text-right">
                {account.account_balance}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
