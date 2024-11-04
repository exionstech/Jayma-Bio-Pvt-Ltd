"use client";

import { getUrl } from "@/actions/get-url";
import axios from "axios";
import React, { useEffect } from "react";

const Page = () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id");

  useEffect(() => {
    if (!orderId) {
      return;
    }
  }, [orderId]);

  const handleWebhook = async () => {
    const URL = await getUrl().then((data) => {
      if (data.data) {
        // return `${data.data.baseUrl}/${data.data.storeId}`;
        return `${data.data.storeId}`;
      }
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_WEBHOOK_STORE_URL}/${URL}/webhook`,
      {
        orderId: orderId,
      }
    );

    if (response.data.status === 200) {
      console.log("Webhook sent");
      localStorage.removeItem("url");
    }
  };

  useEffect(() => {
    handleWebhook();
  }, []);

  return <div className="mt-40">Success</div>;
};

export default Page;
