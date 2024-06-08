import Dashboard from "@/views/Dashboard";
import { Landmark, Home } from "lucide-react";

export type Icon = React.ComponentType<React.ComponentProps<'svg'>>;

export type RouteItem = {
    url: string;
    name: string;
    icon: typeof Home;
    page: React.ComponentType;
}

const routes: RouteItem[] = [
    {
        url: '/',
        name: 'Dashboard',
        icon: Home,
        page: Dashboard,
    },
    {
        url: '/accounts',
        name: 'Accounts',
        icon: Landmark,
        page: Dashboard
    }
]

export default routes;
