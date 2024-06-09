import DashboardCard from "./DashboardCard";
import { dashboardCardData } from "./constants";

function Dashboard(): JSX.Element {
  return (
    <div className="w-full">
      <h1 className="text-white text-center font-semibold text-3xl pb-4">
        Dashboard
      </h1>
      <div className="flex flex-row flex-wrap w-4/5 md:w-full gap-12 mx-auto justify-center">
        {dashboardCardData.map((data) => (
          <DashboardCard {...data} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
