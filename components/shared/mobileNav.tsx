import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuItem } from "@/constants/landing/menuItem";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MobileNavbar = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="p-2 border-none">
        <AlignJustify className="size-7 shrink-0 text-green"/>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col space-y-4 mt-8">
            {MenuItem.map((item) => (
              <Link key={item.id} href={item.href}>
                <div className="p-2 bg-[#F1F1F1] flex items-center gap-4 rounded-xl">
                  <p className="text-green">{item.label}</p>
                  <div className="rounded-full items-center flex p-1 bg-white">
                    <Image src={item.icon} alt="icon" height={20} width={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
