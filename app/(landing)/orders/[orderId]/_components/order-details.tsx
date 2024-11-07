"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Orders } from "@/types/products-related-types";
import { CheckCircle, ChevronLeft, XCircle } from "lucide-react";
import OrderDetailsItem from "./order-details-item";
import { usePaymentManagement } from "@/hooks/use-payment-management";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import OrderStatusProgressBar from "./order-status-bar";
import Link from "next/link";


interface OrderDetailsPageProps {
  order: Orders;
}
const OrderDetails = ({ order }: OrderDetailsPageProps) => {
  const { shipping, tax } = usePaymentManagement();
  const priceAfterDiscount = useMemo(() => {
    return order.orderItems.reduce((total: number, item) => {
      const price = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + price * Number(item.qty);
    }, 0);
  }, [order.orderItems]);

  const finalPrice = useMemo(() => {
    return priceAfterDiscount + priceAfterDiscount * (tax / 100) + shipping;
  }, [priceAfterDiscount, tax, shipping]);

  return (
    <section className="w-full min-h-screen h-full flex flex-col max-w-screen-2xl mx-auto gap-3 md:gap-5 px-5 md:px-10 lg:px-14 mt-5 md:mt-8 py-4 md:py-6">
      <div className="w-full flex flex-col gap-2 md:gap-4">
        <div className="w-full flex items-center justify-start mt-2 md:mt-4">
          <Link href="/products">
            <Button
              className="flex items-center gap-2 text-green"
              variant="outline"
            >
              <ChevronLeft className="size-5 shrink-0 text-green" />
              Back
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-3/5 flex flex-col gap-4 pt-3 md:pt-5 md:px-3">
          <h1 className="text-2xl md:text-3xl font-medium text-green">
            Your Ordered Items
          </h1>
          <Separator className="h-[1px] w-full bg-separator" />
          <div className="w-full flex flex-col gap-2">
            {order.orderItems.map((orderItem) => (
              <OrderDetailsItem key={orderItem.id} item={orderItem} />
            ))}
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="min-h-[300px] h-full w-[1px] bg-separator hidden md:block"
        />
        <div className="w-full md:w-2/5 flex flex-col gap-4 pt-3 md:pt-5 md:px-3">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-medium text-green">
              Order Summary
            </h1>
            <Separator className="h-[1px] w-full bg-separator" />
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
                <h1 className="text-medium text-green">
                  {shipping && shipping !== 0 ? `Rs. ${shipping} /-` : "Free"}
                </h1>
              </div>
              <div className="w-full flex items-center justify-between">
                <h1 className="text-lg text-green/50">Tax</h1>
                <h1 className="text-medium text-green">
                  {tax ? `Rs. ${tax} %` : "Free"}
                </h1>
              </div>
            </div>
            <Separator className="h-[1px] w-full bg-separator" />
            <div className="w-full flex items-center justify-between">
              <h1 className="text-lg text-green">TotalPaid Amount</h1>
              <h1 className="text-lg text-green">{finalPrice.toFixed(2)}</h1>
            </div>
            <Button
              className={cn(
                "flex items-center gap-2 mt-2 md:mt-3 cursor-default pointer-events-none select-none",
                order?.order_status === "Payment Failed" ||
                  order?.order_status === "Order Cancelled"
                  ? "bg-red-600"
                  : "bg-emerald-600"
              )}
            >
              {order?.order_status}
              {order?.order_status === "Payment Failed" ||
              order?.order_status === "Order Cancelled" ? (
                <>
                  <XCircle className="size-4 md:size-5 shrink-0 text-white" />
                </>
              ) : (
                <>
                  <CheckCircle className="size-4 md:size-5 shrink-0 text-white" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      {order.order_status == "Payment Failed" ||
      order?.order_status === "Order Cancelled" ? (
        ""
      ) : (
        <>
          <>
            <Separator className="w-full h-[1px] bg-separator mt-2 md:mt-4" />
            <div className="w-full flex flex-col gap-5 mt-4">
              <div className="w-full flex items-center justify-start">
                <h1 className="text-2xl md:text-3xl font-medium text-green">
                  Order Status
                </h1>
              </div>
              <OrderStatusProgressBar order_status={order.order_status} />

              <div className="w-full flex items-center justify-end md:mt-4">
                <Button className="w-[160px] md:w-[200px] bg-green hover:bg-green/90 text-medium text-white h-8 md:h-12">
                  Cancel Order
                </Button>
              </div>
            </div>
          </>
        </>
      )}
      <div className="w-full flex items-center justify-center mt-6 md:mt-14">
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
    </section>
  );
};

export default OrderDetails;
