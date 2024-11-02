"use client";

import useCart from "@/hooks/products/use-carts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import CartItem from "./cart-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartDetailsProps {
  userId?: string;
}
const CartDetails = ({ userId }: CartDetailsProps) => {
  const router = useRouter();
  const cart = useCart();
  const searchParams = useSearchParams();

  const totalPrice = cart.items.reduce((total: number, item) => {
    return total + Number(item.price) * Number(item.qty);
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment Completed");
    }

    if (searchParams.get("canceld")) {
      toast.error("Something went wrong. Try agian later !");
    }
  }, [searchParams, cart.removeAll]);

  const clearCart = () => {
    cart.removeAll();
  };

  return (
    <section className="min-h-screen mt-8 md:mt-12 px-5 md:px-10 lg:px-14 flex flex-col gap-5">
      <div className="w-full pt-8">
        <Link href="/products">
          <Button variant="ghost" className="flex items-center gap-1">
            <ChevronLeft className="size-6 shrink-0 text-green" />
            Back
          </Button>
        </Link>
      </div>
      {cart.items.length === 0 ? (
        <div className="w-full flex pt-5 min-h-svh md:min-h-[50vh] items-center justify-center">
          <div className="w-full flex flex-col gap-8">
            <div className="w-full flex items-center justify-center gap-6">
              <h1 className="text-4xl font-medium text-green">
                Your Cart Is Emplty
              </h1>
              <img
                src="/cart/empty-cart.svg"
                alt="cart"
                className="w-64 select-none -mt-4"
              />
            </div>
            <div className="w-fill flex items-center justify-center mt-7">
              <Link href="/products">
                <Button
                  className="w-[200px] flex items-center gap-2"
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
        <div className="w-full flex flex-col gap-4 pt-5">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-3xl font-medium text-green">Your Cart</h1>
            <Button
              onClick={clearCart}
              className="rounded-lg flex items-center gap-2 text-medium text-white"
            >
              Clear Cart
              <Trash2 className="size-6 shrink-0 text-white" />
            </Button>
          </div>
          <div className="w-full md:w-3/5 flex flex-col gap-4 pt-4">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CartDetails;
