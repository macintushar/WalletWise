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

const FormSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export function SignUp() {
  const [signingUp, setSigningUp] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setSigningUp(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          avatar_url: import.meta.env.VITE_DEFAULT_PROFILE_URL,
        },
      },
    });

    if (error) {
      setSigningUp(false);
      toast({
        title: "Error",
        description: error.message,
      });
    } else if (!data.session) {
      setSigningUp(false);
      toast({
        title: "Error",
        description: "An error occured, please try again later.",
      });
    } else {
      setSigningUp(false);
      navigate("/");
      toast({
        title: "Success",
        description: "You have successfully signed up!",
      });
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] bg-zinc-200/30 dark:bg-zinc-900/30 px-8 py-4 rounded-lg border-zinc-200/70 dark:border-zinc-900/70 border-2">
        <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900 dark:text-white">
          Sign up for an account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="name" placeholder="Mac" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <HiddenInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              isLoading={signingUp}
              loadingText="Signing Up..."
            >
              Sign Up
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
