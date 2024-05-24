import Link from "next/link";

import { api } from "@/trpc/server";

export default async function Home() {
  return <div className="w-full bg-white p-2">Homepage</div>;
}
