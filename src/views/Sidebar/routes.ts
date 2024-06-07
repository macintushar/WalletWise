import { HomeIcon } from "@heroicons/react/24/outline";

export type Icon = React.ComponentType<React.ComponentProps<'svg'>>;

export type RouteItem = {
    url: string;
    name: string;
    icon: typeof HomeIcon;
}

const routes: RouteItem[] = [
    {
        url: '/',
        name: 'Dashboard',
        icon: HomeIcon
    }
]

export default routes;