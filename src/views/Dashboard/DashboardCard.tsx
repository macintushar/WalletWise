import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { DashboardCardData } from "./types";

function DashboardCard(data: DashboardCardData) {
  return (
    <Card className="w-[320px] h-32 flex flex-col px-4 py-2">
      <CardHeader className="flex flex-row align-top justify-space p-0">
        <div className="flex align-middle gap-2 text-green-500 hover:text-green-400 hover:underline">
          <data.icon className="my-auto" />
          <h2 className="font-bold text-2xl">{data.name}</h2>
        </div>
      </CardHeader>
      {data.description ? (
        <CardDescription className="p-0">{data.description}</CardDescription>
      ) : (
        <></>
      )}
      <CardContent className="mt-auto p-0">
        <h2 className="text-4xl font-medium text-right">{data.value}</h2>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
