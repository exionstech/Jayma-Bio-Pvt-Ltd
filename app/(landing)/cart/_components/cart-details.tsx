"use client";

import useCart from "@/hooks/products/use-carts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CartItem from "./cart-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { getUrl } from "@/actions/get-url";

interface CartDetailsProps {
  userId?: string;
}
const CartDetails = ({ userId }: CartDetailsProps) => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();
  const cart = useCart();
  const searchParams = useSearchParams();

  if (!userId) {
    router.replace("/products");
  }

  const totalPrice = cart.items.reduce((total: number, item) => {
    const price = item.discount
      ? Math.floor(item.price - (item.price * item.discount) / 100)
      : Math.floor(item.price);
    return total + price * Number(item.qty);
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

  const onCheckOut = async () => {
    setCheckoutLoading(true);
    const URL = await getUrl().then((data) => {
      if (data.data) {
        return `${data.data.baseUrl}/${data.data.storeId}`;
      }
    });

    const response = await axios.post(`${URL}/checkout`, {
      products: cart.items,
      userId,
    });

    router.push(response.data.url);
    setCheckoutLoading(false);
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
          <div className="w-full flex gap-3">
            <div className="w-full md:w-3/5 flex flex-col gap-4 pt-4 px-6">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <Separator
              orientation="vertical"
              className="min-h-[300px] h-full w-[1px] bg-green"
            />
            <div className="w-full md:w-2/5 flex flex-col gap-5 pt-5 px-3">
              <h1 className="text-3xl font-medium text-green">Order Summary</h1>
              <Separator className="h-[1px] w-full bg-green" />
              <div className="w-full flex flex-col gap-5">
                <div className="w-full flex  items-center justify-between">
                  <h1 className="text-lg text-green/50">Subtotal</h1>
                  <h1 className="text-medium text-green font-medium">
                    <span className="mr-2">Rs</span>
                    {totalPrice.toFixed(2)}
                  </h1>
                </div>
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-lg text-green/50">Shipping</h1>
                  <h1 className="text-lg text-green">Free</h1>
                </div>
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-lg text-green/50">Tax</h1>
                  <h1 className="text-lg text-green">Rs. 15</h1>
                </div>
              </div>
              <Separator className="h-[1px] w-full bg-green" />

              <div className="w-full flex flex-col gap-6 mt-3 py-2">
                <Button
                  className="rounded-lg"
                  onClick={onCheckOut}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Processing" : "Proceed to checkout"}
                  {checkoutLoading && (
                    <Loader2 className="size-6 shrink-0 text-white" />
                  )}
                </Button>
                <Link href="/products">
                  <Button
                    className="w-full flex items-center gap-2"
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
