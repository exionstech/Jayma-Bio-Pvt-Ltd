"use client";

import { getUrl } from "@/actions/get-url";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/products/use-carts";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id");
  const paymentId = params.get("payment_id");
  const status = params.get("status");
  const router = useRouter();

  if (!orderId) {
    router.replace("/products");
  }
  
  const cart = useCart();
  
  useEffect(() => {
    if (!orderId) {
      return;
    }
  }, [orderId]);

  const handleWebhook = async () => {
    const URL = await getUrl().then((data) => {
      if (data.data) {
        return `${data.data.storeId}`;
      }
    });
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_WEBHOOK_STORE_URL}/${URL}/webhook`,
      {
        orderId: orderId,
        paymentId: paymentId,
        status: status
      }
    );
    
    if (response.data.status === 200) {
      // sendSuccessMail();
      localStorage.removeItem("url");
      cart.removeAllAfterPurchase();
    }
  };

  useEffect(() => {
    handleWebhook();
  }, []);

  return (
    <MaxWrapper>
      <div className="w-full flex pt-5 md:pt-20 h-full min-h-[70vh] md:min-h-[80vh] items-center justify-center">
        <div className="w-full flex flex-col gap-5 md:gap-8 pt-10 md:pt-0">
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl md:text-4xl font-medium text-center text-green">
              Your order has been placed successfully !
            </h1>
            <img
              src="/checkout/success.svg"
              alt="cart"
              className="w-44 md:w-72 select-none mt-5 md:mt-8"
            />
          </div>
          <div className="w-fill flex items-center justify-center mt-7">
            <Link href="/products">
              <Button
                className="w-[240px] md:w-[280px] flex items-center gap-2 border-none"
                variant="ghost"
              >
                <ChevronLeft className="size-6 shrink-0 text-green" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MaxWrapper>
  );
};

export default Page;
