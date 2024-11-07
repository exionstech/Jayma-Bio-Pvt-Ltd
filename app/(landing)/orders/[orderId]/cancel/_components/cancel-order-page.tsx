import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Orders } from "@/types/products-related-types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface OrderCancelPageProps {
  order: Orders;
}
const CancelOrderPage = ({ order }: OrderCancelPageProps) => {
  return (
    <section className="w-full min-h-screen h-full flex flex-col max-w-screen-2xl mx-auto gap-3 md:gap-5 px-5 md:px-10 lg:px-14 mt-5 md:mt-8 py-4 md:py-6">
      <div className="w-full flex flex-col gap-2 md:gap-4">
        <div className="w-full flex items-center justify-start mt-2 md:mt-4">
          <Link href="/orders">
            <Button
              className="flex items-center gap-2 text-green"
              variant="outline"
            >
              <ChevronLeft className="size-5 shrink-0 text-green" />
              Back
            </Button>
          </Link>
        </div>
        <div className="w-full flex items-center justify-start mt-2 md:mt-5">
          <h1 className="text-xl md:text-4xl font-medium">
            Order Cancel Request
          </h1>
        </div>
        <Separator className="w-full h-[1px] bg-separator" />
        <div className="w-full h-full flex flex-col gap-3">

        </div>
      </div>
    </section>
  );
};

export default CancelOrderPage;
