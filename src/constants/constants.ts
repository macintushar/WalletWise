import Accounts from "@/views/Accounts";
import Dashboard from "@/views/Dashboard";
import Transactions from "@/views/Transactions";
import { Landmark, Home, Cog, ArrowLeftRight } from "lucide-react";

export type Icon = React.ComponentType<React.ComponentProps<'svg'>>;

export type RouteItem = {
    url: string;
    name: string;
    icon: typeof Home;
    page: React.ComponentType;
    position?: 'main' | 'bottom'
}

const routes: RouteItem[] = [
    {
        url: '/',
        name: 'Dashboard',
        icon: Home,
        page: Dashboard,
        position: "main"
    },
    {
        url: '/accounts',
        name: 'Accounts',
        icon: Landmark,
        page: Accounts,
        position: "main"
    },
    {
        url: '/transactions',
        name: 'Transactions',
        icon: ArrowLeftRight,
        page: Transactions,
        position: "main"
    },
    {
        url: '/settings',
        name: 'Settings',
        icon: Cog,
        page: Dashboard,
        position: 'bottom'
    },
]

export default routes;
