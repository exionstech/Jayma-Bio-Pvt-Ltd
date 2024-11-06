import { Orders } from "@/types/products-related-types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface OrderListItemProps {
  order: Orders;
}

const OrderListItem = ({ order }: OrderListItemProps) => {
  const orderIems = order.orderItems;

  const firstOrderItemName = orderIems[0].name;
  const firstOrderItemImage = orderIems[0].images[0].url;
  const orderId = order.id;

  return (
    <div className="w-full  py-4 flex items-center border-b-[1px] border-separator justify-between">
      <div className="flex items-center gap-3 justify-start">
        <img
          src={firstOrderItemImage}
          alt={firstOrderItemName}
          className="w-10 md:w-20 aspect-square rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-sm md:text-lg font-medium text-green w-40 md:w-56">
            {firstOrderItemName}
          </h1>
        </div>
      </div>
      <Link href={`/orders/${orderId}`}>
        <div className="flex items-center justify-end gap-2 group">
          <h1 className="text-xs md:text-sm font-medium text-green flex items-center gap-2 cursor-pointer">
            View status
            <ChevronRight className="size-4 md:size-5 shrink-0 text-green group-hover:translate-x-2 transition duration-300" />
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default OrderListItem;
