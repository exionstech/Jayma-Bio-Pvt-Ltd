"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Orders } from "@/types/products-related-types";
import { toast } from "sonner";

interface CencelOrderPageProps {
  order: Orders;
}

const formSchema = z.object({
  itemName: z.string().min(1, {
    message: "Please select the product you want to cancel",
  }),
  reason: z.string().min(1, {
    message: "Please select the reason for cancelling the order",
  }),
});

const REASON_LIST = [
  "Found a better price elsewhere",
  "Ordered the wrong item by mistake",
  "Issue with payment or checkout process",
  "Taking too long to ship",
] as const;

const CencelOrderPage = ({ order }: CencelOrderPageProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      reason: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success(`
        ${values.itemName} has been successfully cancelled due to ${values.reason}`);
  };

  return (
    <section className="w-full h-full flex flex-col max-w-screen-2xl mx-auto gap-3 md:gap-5 px-5 md:px-10 lg:px-14 mt-5 md:mt-8 py-4 md:py-6 md:min-h-screen">
      <div className="w-full flex flex-col gap-2 md:gap-4">
        <div className="w-full flex items-center justify-start mt-2 md:mt-4">
          <Link href={`/orders/${order?.id}`}>
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
            Cancel Order Request
          </h1>
        </div>

        <Separator className="w-full h-[1px] bg-separator" />

        <div className="w-full h-full flex flex-col md:flex-row gap-3 mt-6 min-h-[60vh]">
          <div className="w-full md:w-1/2 flex flex-col gap-3 items-start justify-normal">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Select The Product You Want To Cancel
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 border-green/60">
                            <SelectValue placeholder="Select Product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {order.orderItems.map((item) => (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Select The Reason For Cancelling The Order
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 border-green/60">
                            <SelectValue placeholder="Select Reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {REASON_LIST.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="h-8 md:h-12 w-[150px] md:w-[170px] text-white mt-5"
                  disabled={!form.formState.isValid}
                >
                  Proceed
                </Button>
              </form>
            </Form>
          </div>

          <div className="w-full md:w-1/2 items-center justify-center hidden md:flex">
            <Image
              src="/checkout/cancelled.svg"
              alt="cart"
              width={288}
              height={288}
              className="w-44 md:w-72 select-none mt-5 md:mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CencelOrderPage;
