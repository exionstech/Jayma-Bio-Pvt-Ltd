"use client";

import useCart from "@/hooks/products/use-carts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import CartItem from "./cart-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { getUrl } from "@/actions/get-url";
import { usePaymentManagement } from "@/hooks/use-payment-management";
import { PiContactlessPaymentBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CartDetailsProps {
  userId?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

const CartDetails = ({ userId }: CartDetailsProps) => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();
  const cart = useCart();
  const { shipping, tax, isLoading } = usePaymentManagement();
  const searchParams = useSearchParams();
  const [hasHandledSuccess, setHasHandledSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const priceAfterDiscount = useMemo(() => {
    return cart.items.reduce((total: number, item) => {
      const price = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + price * Number(item.qty);
    }, 0);
  }, [cart.items]);

  const finalPrice = useMemo(() => {
    return priceAfterDiscount + priceAfterDiscount * (tax / 100) + shipping;
  }, [priceAfterDiscount, tax, shipping]);

  useEffect(() => {
    if (searchParams.get("success") && !hasHandledSuccess) {
      setHasHandledSuccess(true);
      cart.removeAll();
      toast.success("Order Checkout Successful!");
    }
    if (searchParams.get("canceld")) {
      toast.error("Something went wrong. Try again later!");
    }
  }, [searchParams, cart, hasHandledSuccess]);

  const onCheckOut = async (formData: z.infer<typeof formSchema>) => {
    try {
      setCheckoutLoading(true);
      const URL = await getUrl().then((data) => {
        if (data.data) {
          return `${data.data.baseUrl}/${data.data.storeId}`;
        }
      });

      const response = await axios.post(`${URL}/checkout`, {
        userId,
        products: cart.items,
        paymentPrice: finalPrice.toFixed(2),
        ...formData,
      });

      router.push(response.data.url);
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await onCheckOut(values);
  };

  return (
    <section className="min-h-screen mt-8 md:mt-12 px-5 md:px-10 lg:px-14 flex flex-col gap-5">
      <div className="w-full pt-4 md:pt-8">
        <Link href="/products">
          <Button variant="ghost" className="flex items-center gap-1">
            <ChevronLeft className="size-6 shrink-0 text-green" />
            Back
          </Button>
        </Link>
      </div>
      {cart.items.length === 0 ? (
        <div className="w-full flex pt-3 md:pt-5 h-full md:min-h-[50vh] items-center justify-center">
          <div className="w-full flex flex-col gap-5 md:gap-8 pt-10 md:pt-0">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
              <h1 className="text-3xl md:text-4xl font-medium text-green">
                Your Cart Is Empty
              </h1>
              <img
                src="/cart/empty-cart.svg"
                alt="cart"
                className="w-64 select-none md:-mt-4"
              />
            </div>
            <div className="w-fill flex items-center justify-center mt-7">
              <Link href="/products">
                <Button
                  className="w-[140px] md:w-[200px] flex items-center gap-2"
                  variant="ghost"
                >
                  <ChevronLeft className="size-6 shrink-0 text-green" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 pt-2 md:pt-5">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-medium text-green">
              Your Cart
            </h1>
            <Button
              onClick={() => cart.removeAll()}
              className="rounded-lg flex items-center gap-2 text-medium text-white"
            >
              Clear Cart
              <Trash2 className="size-6 shrink-0 text-white" />
            </Button>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-3/5 flex flex-col gap-4 pt-4 md:px-6">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <Separator
              orientation="vertical"
              className="min-h-[300px] h-full w-[1px] bg-green hidden md:block"
            />
            <div className="w-full md:w-2/5 flex flex-col gap-4 pt-3 md:pt-5 md:px-3">
              <div className="w-full flex flex-col gap-4">
                <h1 className="text-2xl md:text-3xl font-medium text-green">
                  Order Summary
                </h1>
                <Separator className="h-[1px] w-full bg-green" />
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-green/50">Subtotal</h1>
                    <h1 className="text-medium text-green font-medium">
                      <span className="mr-2">Rs</span>
                      {priceAfterDiscount.toFixed(2)}
                    </h1>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-green/50">Shipping</h1>
                    <h1 className="text-lg text-green">
                      {shipping && shipping !== 0
                        ? `Rs. ${shipping} /-`
                        : "Free"}
                    </h1>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-green/50">Tax</h1>
                    <h1 className="text-lg text-green">
                      {tax ? `Rs. ${tax} %` : "Free"}
                    </h1>
                  </div>
                </div>
                <Separator className="h-[1px] w-full bg-green" />
                <div className="w-full flex items-center justify-between -mt-1">
                  <h1 className="text-lg text-green">Total</h1>
                  <h1 className="text-lg text-green">
                    {finalPrice.toFixed(2)}
                  </h1>
                </div>

                <div className="w-full flex flex-col gap-4">
                  <h1 className="text-2xl md:text-3xl font-medium text-green">
                    Billing Information
                  </h1>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea
                                className="h-[80px] resize-none"
                                placeholder="Enter your address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full rounded-lg"
                        disabled={checkoutLoading}
                      >
                        {checkoutLoading ? "Processing" : "Proceed to checkout"}
                        {checkoutLoading ? (
                          <Loader2 className="ml-2 size-6 shrink-0 text-white animate-spin" />
                        ) : (
                          <PiContactlessPaymentBold className="ml-2 size-6 shrink-0 text-white" />
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>

                <Link href="/products">
                  <Button
                    className="w-full flex items-center gap-2 border-none"
                    variant="ghost"
                  >
                    <ChevronLeft className="size-6 shrink-0 text-green" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartDetails;
