import {
  Tag,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  User,
  User2,
  Cog,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname.includes("/admin") && pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "/admin/endpoint",
          label: "Endpoint",
          active: pathname.includes("/admin/endpoint"),
          icon: Cog,
          submenus: [],
        },
        {
          href: "/admin/events",
          label: "Events",
          active: pathname.includes("/admin/events"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/admin/blogs",
          label: "Blogs",
          active: pathname.includes("/admin/blogs"),
          icon: Tag,
          submenus: [],
        },
        {
          href: "/admin/users",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: User2,
          submenus: [],
        },
        {
          href: "/admin/payment-management",
          label: "Payment Management",
          active: pathname.includes("/admin/payment-management"),
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/admin/payment-gateway",
          label: "Payment Gateway",
          active: pathname.includes("/admin/payment-gateway"),
          icon: SquarePen,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Account",
      menus: [
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: User,
          submenus: [],
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
