"use client";

import { getUrl } from "@/actions/get-url";
import Loader from "@/components/shared/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id");

  const router = useRouter();

  useEffect(() => {
    if (!orderId) {
      return;
    }
  }, [orderId]);

  const handleWebhook = async () => {
    const URL = await getUrl().then((data) => {
      if (data.data) {
        return `${data.data.baseUrl}/${data.data.storeId}`;
        // return `${data.data.storeId}`;
      }
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_WEBHOOK_STORE_URL}/${URL}/status`,
      {
        orderId: orderId,
      }
    );

    if (response.data.status === 200) {
      localStorage.removeItem("url");
      console.log(response.data.data);

      if (response.data.data[0].payment_status === "SUCCESS") {
        router.push("/checkout-success?orderId=" + orderId);
      } else {
        router.push("/checkout-failed?orderId=" + orderId);
      }
    }
  };

  useEffect(() => {
    handleWebhook();
  }, []);

  return <Loader />;
};

export default Page;
