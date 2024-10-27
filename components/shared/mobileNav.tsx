import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuItem } from "@/constants/landing/menuItem";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger className="p-2 border-none">
        <AlignJustify className="size-7 shrink-0 text-green"/>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col space-y-5 mt-8 px-4">
          {MenuItem.map((item, index) => {
              const active =
                pathname === item.href && pathname.includes(item.href);
              return (
                <Link key={index} href={item.href}>
                  <div
                    className={cn(
                      "px-2 py-1 bg-[#F1F1F1] flex items-center gap-4 rounded-full w-full justify-center",
                      active && "bg-lightGreen", item.label === "Products" && "w-full",
                      item.label === "Contact" && "w-full"
                    )}
                  >
                    <p className="text-green text-medium">{item.label}</p>
                    <div className="w-8 h-8 p-1 object-contain rounded-full items-center flex bg-white shrink-0 justify-center">
                      <img
                        src={item.icon}
                        alt="icon"
                        className={cn("size-6",
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
        </SheetContent>
      </Sheet>
    </div>
  );
};
