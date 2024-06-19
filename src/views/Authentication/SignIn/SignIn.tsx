import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HiddenInput, Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignIn() {
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setSigningIn(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
      setSigningIn(false);
    } else if (!data.session) {
      toast({
        title: "Error",
        description: "An error occured, please try again later.",
      });
      setSigningIn(false);
    } else {
      navigate("/");
      toast({
        title: "Success",
        description: "You have successfully signed in.",
      });
      setSigningIn(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] bg-zinc-200/30 dark:bg-zinc-900/30 px-8 py-4 rounded-lg border-zinc-200/70 dark:border-zinc-900/70 border-2">
        <div className="flex flex-col mb-6 mt-3">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900 dark:text-white">
            Sign in to your account
          </h2>

          {/* <ModeToggle /> */}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="mac@macintushar.xyz"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h2 className="font-semibold text-sm text-end text-zinc-600 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-200">
                Forgot password?
              </h2>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <HiddenInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-8"
              isLoading={signingIn}
              loadingText="Signing In..."
            >
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-200">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
