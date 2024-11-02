"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/products/use-carts";
import { Products } from "@/types/products-related-types";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartItemProps {
  item: Products;
}

const CartItem = ({ item }: CartItemProps) => {
  const [productPrice, setProductPrice] = useState<number>(
    Math.floor(item.price)
  );
  const [qty, setQty] = useState(item.qty ?? 1);

  const cart = useCart();

  const increaseQuantity = () => {
    setQty(qty + 1);
    cart.updateItemQuantity(item.id, qty + 1);
    toast.success("Quanity increased");
  };
  const decreaseQuantity = () => {
    setQty(qty - 1);
    cart.updateItemQuantity(item.id, qty - 1);
    toast.success("Quanity decreased");
  };

  const handleRemove = (id: string) => {
    if (id) {
      cart.removeItem(item.id);
      toast.success("Item removed from cart");
    } else {
      toast.error("Item not found");
    }
  };

  const calculatePriceWithDiscount = (product: Products) => {
    const price = product.price;
    const discount = product.discount;
    const finalPrice = discount ? price - (price * discount) / 100 : price;
    return Math.floor(finalPrice);
  };

  useEffect(() => {
    const finalPrice = calculatePriceWithDiscount(item);
    setProductPrice(finalPrice);
  }, [item.id, item.price, item.discount]);

  return (
    <div className="w-full h-full flex items-start justify-between gap-3 border-b-[1px] border-green/40 pb-3 pt-2">
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger>
            <RxCross1
              className="size-5 shrink-0 fill-green/60 cursor-pointer"
              onClick={() => {
                handleRemove(item.id);
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove Item</p>
          </TooltipContent>
        </Tooltip>
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-20 h-20 rounded-md ml-4"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-medium text-green font-medium w-60 -mt-3">
            {item.name}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size={"icon"} variant={"ghost"} onClick={decreaseQuantity}>
          <MinusCircle className="size-6 shrink-0 text-green" />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="text-lg font-medium cursor-pointer pointer-events-none"
        >
          {qty}
        </Button>
        <Button size={"icon"} variant={"ghost"} onClick={increaseQuantity}>
          <PlusCircle className="size-6 shrink-0 text-green" />
        </Button>
        <div className="flex items-center flex-col gap-1 mt-3">
          <h1 className="text-lg font-medium">
            Rs: <span className="text-xl">{productPrice}</span>
          </h1>
          <h1 className="text-xs font-medium text-lightText">
            Total: <span className="text-xs">{productPrice * qty}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
