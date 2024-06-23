import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PlusIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useState } from "react";

const formSchema = z.object({
  account_name: z.string().min(3, {
    message: "Transaction name must be at least 3 characters.",
  }),
  transaction_amount: z.coerce
    .number()
    .min(1)
    .gt(1, { message: "Amount must be greater than 1." }),
  transaction_description: z.string().min(1, {
    message: "Transaction name must be at least 1 character.",
  }),
});

type AddTransactionProps = {
  refetchTransactionsFn: () => void;
};

function AddTransaction({ refetchTransactionsFn }: AddTransactionProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_name: "",
      transaction_amount: 0,
      transaction_description: "",
    },
  });

  async function handleTransactionCreate(values: z.infer<typeof formSchema>) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("walletwise_transactions").insert({
      account_uuid: values.account_name,
      description: values?.transaction_description,
      value: values?.transaction_amount,
      user_id: user?.id,
    });

    if (error) {
      toast({
        title: "An error occured while adding the transaction.",
        description: error.message,
        variant: "destructive",
      });
    }

    toast({
      title: `Successfully added transaction of - ${values.transaction_amount}`,
    });
    refetchTransactionsFn();
    setOpen(false);
  }

  if (isLoading) return <Loader />;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="flex flex-row space-x-2 items-center bg-white text-black border-2 px-3 py-2 rounded-lg text-sm">
          <PlusIcon className="text-md h-4 w-4" />
          <h1 className="align-center">Add Transaction</h1>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-2">
          <SheetTitle>Add a Transaction</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleTransactionCreate)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem className="text-white">
                  <FormLabel>Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your bank account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((account) => (
                        <SelectItem value={account.account_uuid}>
                          {account.account_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transaction_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="1000" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transaction_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Paid for XYZ" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AddTransaction;
