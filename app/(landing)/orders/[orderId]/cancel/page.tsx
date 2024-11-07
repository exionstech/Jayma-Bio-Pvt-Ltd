import { MaxWrapper } from "@/components/shared/max-wrapper";
import { Metadata } from "next";
import getOrder from "@/actions/orders/get-order";
import CancelOrderPage from "./_components/cancel-order-page";

export const metadata: Metadata = {
  title: "Cancel Order | Jayma Bio Innovations",
};

interface OrderCancelPageProps {
  params: {
    orderId: string;
  };
}

const OrderCancelPage = async ({ params }: OrderCancelPageProps) => {
  const order = await getOrder(params.orderId);
  return (
    <MaxWrapper>
      <CancelOrderPage order={order} />
    </MaxWrapper>
  );
};

export default OrderCancelPage;
