"use client";
import { MenuItem } from "@/constants/landing/menuItem";
import { MobileNavbar } from "./mobileNav";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/user-data";
import { UserNav } from "./user-nav";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUserData();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full py-3 px-5 lg:px-12 z-30 bg-white/90 border-b border-gray-200 backdrop-blur-lg">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="lg:flex items-center shrink-0 hidden">
          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="logo"
              height={75}
              width={75}
              className="shrink-0"
            />
          </Link>
        </div>
        <div className="flex items-center shrink-0 lg:hidden">
          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="logo"
              height={50}
              width={50}
              className="shrink-0"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-between ml-4">
          <div className="flex space-x-5">
            {MenuItem.map((item, index) => {
              const active =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== "/");
              return (
                <Link key={index} href={item.href}>
                  <div
                    className={cn(
                      "px-2 py-1 bg-[#F1F1F1] flex items-center gap-4 rounded-full w-[120px] justify-end",
                      active && "bg-lightGreen",
                      item.label === "Products" && "w-[140px]",
                      item.label === "Contact" && "w-[140px]"
                    )}
                  >
                    <p className="text-green text-medium">{item.label}</p>
                    <div className="w-8 h-8 p-1 object-contain rounded-full items-center flex bg-white shrink-0 justify-center">
                      <img
                        src={item.icon}
                        alt="icon"
                        className={cn(
                          "size-6",
                          item.icon === "/navIcon/contact.svg" &&
                            "!size-4 m-0.5 shrink-0"
                        )}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {user ? (
          <UserNav user={user} />
        ) : (
          <Link href="/auth/login" className="hidden lg:block">
            <Button className="w-[140px] h-[40px] rounded-full bg-green hover:bg-green/90">
              Login
            </Button>
          </Link>
        )}
        <MobileNavbar user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
