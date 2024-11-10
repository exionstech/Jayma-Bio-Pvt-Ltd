export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  cancel_reason?: string;
  category: string;
  size: string;
  qty: number;
}

export interface Category {
  id: string;
  billboardId: string;
  billboardLabel: string;
  name: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Orders {
  id: string;
  userId: string;
  name: string;
  email: string;
  isPaid: boolean;
  phone: string;
  orderItems: Products[];
  address: string;
  order_status: string;
  session_id: string;
  amount: number;
  isCancelled: boolean;
  cancelled_items: Products[];
  refundableamount: number;
  sent_email: boolean;
  paymentId: string;
}

export interface OrderReturnTypes {
  id: string;
  images: string[];
  reason: string;
  orderId: string;
  product: Products[];
  status: string;
  category: string;
}
