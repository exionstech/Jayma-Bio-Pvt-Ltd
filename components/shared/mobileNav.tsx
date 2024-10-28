import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuItem } from "@/constants/landing/menuItem";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

export const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger className="p-2 border-none">
          <AlignJustify className="size-7 shrink-0 text-green" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col h-full py-1 gap-4">
            <div className="flex w-full items-start justify-center shrink-0">
              <Link href="/">
                <Image
                  src="/logos/site-logo.svg"
                  alt="logo"
                  height={60}
                  width={60}
                  className="shrink-0"
                />
              </Link>
            </div>

            <div className="flex flex-col h-[90%] justify-between">
              <div className="flex flex-col space-y-2 mt-2">
                {MenuItem.map((item, index) => {
                  const active =
                    pathname === item.href && pathname.includes(item.href);
                  return (
                    <Link key={index} href={item.href}>
                      <div
                        className={cn(
                          "px-4 py-1 bg-white border border-green flex items-center justify-between rounded-xl w-full",
                          active && "bg-lightGreen",
                          item.label === "Products" && "w-full",
                          item.label === "Contact" && "w-full"
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
              <div className="flex flex-col gap-3">
                <Link href={"/"}>
                  <Button className="px-4 py-1 bg-white border border-green flex items-center justify-between rounded-xl w-full">
                    <span className="text-green text-medium">Profile</span>
                    <Image
                      src="/landing/nav/user.svg"
                      alt="Profile Picture"
                      width={20}
                      height={20}
                      className="shrink-0"
                    />
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button className="px-4 py-1 bg-green flex items-center justify-between rounded-xl w-full border-none">
                    <span className="text-white text-medium">Logout</span>
                    <Image
                      src="/landing/nav/logout.svg"
                      alt="Profile Picture"
                      width={20}
                      height={20}
                      className="shrink-0 text-white"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
