"use client";

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: process.env.NEXT_PUBLIC_BOT_ID,
        hostUrl: process.env.NEXT_PUBLIC_HOST_URL,
        messagingUrl: process.env.NEXT_PUBLIC_MESSAGING_URL,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
