"use client";

import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <TRPCReactProvider>
              <div className="flex flex-row">
                <Sidebar />
                <div className="w-full bg-gray-100 p-[32px] dark:bg-gray-900">
                  {children}
                </div>
              </div>
            </TRPCReactProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
