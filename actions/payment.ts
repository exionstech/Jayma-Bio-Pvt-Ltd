"use server";

const xClientId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID!;
const xClientSecret = process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY!;

export async function createOrder({
  products,
  paymentPrice,
  userId,
}: {
  products?: any;
  paymentPrice?: number;
  userId?: string;
}) {
  const oder = {
    customer_details: {
      customer_id: userId,
      customer_phone: "6291240981",
    },
    order_id: products[0].id,
    order_amount: paymentPrice,
    order_currency: "INR",
  };

  const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": xClientId,
      "x-client-secret": xClientSecret,
      "x-api-version": "2023-08-01",
    },
    body: JSON.stringify(oder),
  });

  const data = await response.json();

  return data;
}
