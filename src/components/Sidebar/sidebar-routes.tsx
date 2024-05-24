type NavLinkType = {
  title: string;
  href: string;
  icon?: string;
};

export const sidebarRoutes: NavLinkType[] = [
  {
    title: "Home",
    href: "/",
    icon: "PieChart",
  },
  {
    title: "Accounts",
    href: "/accounts",
    icon: "Landmark",
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: "ArrowRightLeft",
  },
];
