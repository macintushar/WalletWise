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

const formSchema = z.object({
  account_name: z.string().min(3, {
    message: "Account name must be at least 3 characters.",
  }),
  account_number: z.string().min(3, {
    message: "Account number must be at least 3 characters.",
  }),
  account_balance: z.string().min(1, {
    message: "Account name must be at least 1 character.",
  }),
});

async function handleAccountCreate(values: z.infer<typeof formSchema>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("walletwise_accounts").insert({
    account_balance: values?.account_balance,
    account_name: values?.account_name,
    account_number: values?.account_number,
    user_id: user?.id,
  });

  if (error) {
    toast({
      title: "An error occured while adding the account.",
      description: error.message,
      variant: "destructive",
    });
  }

  toast({
    title: `Successfully created account - ${values.account_name}`,
  });
}

function AddAccount() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_name: "",
      account_number: "0",
      account_balance: "0",
    },
  });
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="lg" className="flex flex-row space-x-2 items-center">
          <PlusIcon className="text-md h-4 w-4" />
          <h1 className="align-center">Add Account</h1>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-2">
          <SheetTitle>Add an account</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAccountCreate)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Big Money Bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Balance</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
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

export default AddAccount;
